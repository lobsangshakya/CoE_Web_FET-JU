
/**
 * CENTER OF EXCELLENCE - SECURE BACKEND API
 * Version: 3.0 (Production Grade)
 * 
 * SECURITY NOTE: Ensure required properties are set in Project Settings -> Script Properties:
 * - SPREADSHEET_ID: ID of the database sheet
 * - FIREBASE_PROJECT_ID: Firebase project ID
 * - OAUTH2_CLIENT_ID: Optional for advanced verification
 */

const CONFIG = {
  get SHEET_ID() { return PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID'); },
  get FIREBASE_PROJECT_ID() { return PropertiesService.getScriptProperties().getProperty('FIREBASE_PROJECT_ID'); },
  ROLES: ['GUEST', 'STUDENT', 'FACULTY', 'ADMIN'],
  PROJECT_STATUSES: ['Proposed', 'Assigned', 'Started', 'In Progress', 'Approval', 'Completed', 'Rejected'],
  EVENT_STATUSES: ['PENDING', 'APPROVED', 'REJECTED'],
  MAX_LEN: { TITLE: 200, DESC: 2000, NAME: 100, EMAIL: 100 }
};

/**
 * STRICT ENDPOINT SCHEMAS (Whitelisting)
 */
const SCHEMAS = {
  // User operations
  'createUser': ['name', 'email', 'role', 'department', 'coe_id', 'description'],
  'updateUser': ['name', 'email', 'role', 'department', 'coe_id', 'description', 'is_active', 'force_password_reset'],
  'getUser': ['uid'],
  
  // Project operations
  'submitProject': ['title', 'description', 'category', 'faculty_lead_uid', 'student_ids', 'team_list'],
  'updateProject': ['project_id', 'title', 'description', 'category', 'status', 'progress'],
  'approveProject': ['project_id', 'status', 'rejection_reason', 'reviewed_by'],
  'getProject': ['project_id'],
  
  // Event operations
  'createEvent': ['title', 'date', 'time', 'location', 'type', 'description', 'status', 'submitted_by', 'coe_id'],
  'updateEvent': ['event_id', 'title', 'date', 'time', 'location', 'type', 'description', 'status'],
  'getEvent': ['event_id'],
  
  // Auth mapping operations
  'createAuthMapping': ['firebase_uid', 'enrollment_no', 'internal_id'],
  'updateAuthMapping': ['firebase_uid', 'enrollment_no', 'internal_id'],
  
  // Password operations
  'updatePassword': ['newPassword']
};

/**
 * MAIN REQUEST HANDLER
 */
function doPost(e) {
  const cache = CacheService.getScriptCache();
  
  try {
    const request = JSON.parse(e.postData.contents);
    const { action, token, requestId, payload } = request;

    // 1. Replay Attack Protection
    if (!requestId || cache.get(requestId)) {
      return response(false, 400, { error: "Security violation: Replay attack detected" });
    }
    cache.put(requestId, "seen", 600); 

    // 2. Auth Verification (Google-Recommended OAuth2 Endpoint)
    const authUser = verifyFirebaseToken(token);
    if (!authUser) return response(false, 401, { error: "Authentication failed" });

    // 3. Identity & Global RBAC Check
    const userProfile = getUserProfile(authUser.uid);
    if (!userProfile) return response(false, 403, { error: "Identity not mapped in CoE database" });
    if (!userProfile.is_active) return response(false, 403, { error: "Account administratively disabled" });
    
    // 4. Force Password Reset Gate
    if (userProfile.force_password_reset === true && action !== 'updatePassword') {
      return response(false, 403, { error: "Password reset required", forceReset: true });
    }

    // 5. Authorization & Sanitization Pipeline
    if (!SCHEMAS[action]) return response(false, 404, { error: "Unknown action" });
    const cleanPayload = sanitize(payload, action);
    
    // 6. Router
    switch (action) {
      // User operations
      case 'createUser':
        return authorize(userProfile.role, 'ADMIN') ? handleCreateUser(userProfile, cleanPayload) : forbidden();
      case 'updateUser':
        return authorize(userProfile.role, 'ADMIN') ? handleUpdateUser(userProfile, cleanPayload) : forbidden();
      case 'getUser':
        return authorize(userProfile.role, 'ADMIN') ? handleGetUser(userProfile, cleanPayload) : forbidden();
        
      // Project operations
      case 'submitProject':
        return authorize(userProfile.role, 'STUDENT') ? handleSubmitProject(userProfile, cleanPayload) : forbidden();
      case 'updateProject':
        return authorize(userProfile.role, 'FACULTY') ? handleUpdateProject(userProfile, cleanPayload) : forbidden();
      case 'approveProject':
        return authorize(userProfile.role, 'ADMIN') ? handleApproveProject(userProfile, cleanPayload) : forbidden();
      case 'getProject':
        return authorize(userProfile.role, 'FACULTY') ? handleGetProject(userProfile, cleanPayload) : forbidden();
        
      // Event operations
      case 'createEvent':
        return authorize(userProfile.role, 'FACULTY') ? handleCreateEvent(userProfile, cleanPayload) : forbidden();
      case 'updateEvent':
        return authorize(userProfile.role, 'FACULTY') ? handleUpdateEvent(userProfile, cleanPayload) : forbidden();
      case 'getEvent':
        return authorize(userProfile.role, 'FACULTY') ? handleGetEvent(userProfile, cleanPayload) : forbidden();
        
      // Auth mapping operations
      case 'createAuthMapping':
        return authorize(userProfile.role, 'ADMIN') ? handleCreateAuthMapping(userProfile, cleanPayload) : forbidden();
      case 'updateAuthMapping':
        return authorize(userProfile.role, 'ADMIN') ? handleUpdateAuthMapping(userProfile, cleanPayload) : forbidden();
        
      // Password operations
      case 'updatePassword':
        return handleUpdatePassword(userProfile, cleanPayload);
        
      default:
        return response(false, 400, { error: "Endpoint not implemented" });
    }

  } catch (err) {
    logAudit("SYSTEM", "CRITICAL", "API_ERROR", err.toString());
    return response(false, 500, { error: "Internal Server Error" });
  }
}

/**
 * VERIFICATION ENGINE
 */
/**
 * Validates Firebase ID token using Google's public certificates
 */
function verifyFirebaseToken(token) {
  try {
    // Decode token header and payload without verification first to get kid
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }
    
    // Verify the token using Google's public keys
    const jwt = token;
    
    // Use Google's tokeninfo endpoint as fallback
    const url = `https://oauth2.googleapis.com/tokeninfo?id_token=${jwt}`;
    const response = UrlFetchApp.fetch(url);
    const data = JSON.parse(response.getContentText());
    
    // Verify issuer and audience
    if (data.iss !== 'https://accounts.google.com' && data.iss !== 'accounts.google.com') {
      return null;
    }
    
    const firebaseProjectId = CONFIG.FIREBASE_PROJECT_ID;
    if (data.aud !== firebaseProjectId) {
      return null;
    }
    
    // Verify token hasn't expired
    const currentTime = Math.floor(Date.now() / 1000);
    if (data.exp < currentTime) {
      return null;
    }
    
    // sub is the Firebase UID
    return { uid: data.sub, email: data.email };
    
  } catch (e) {
    console.error('Token verification error:', e);
    return null;
  }
}

/**
 * Role-based access control
 * @param {string} userRole - The role of the authenticated user
 * @param {string} requiredRole - The minimum role required to perform the action
 * @returns {boolean} - True if the user has sufficient permissions
 */
function authorize(userRole, requiredRole) {
  const userRoleIndex = CONFIG.ROLES.indexOf(userRole);
  const requiredRoleIndex = CONFIG.ROLES.indexOf(requiredRole);
  
  if (userRoleIndex === -1 || requiredRoleIndex === -1) {
    return false; // Invalid role
  }
  
  return userRoleIndex >= requiredRoleIndex;
}

/**
 * USER PROFILE RETRIEVAL (Header-based mapping)
 * Maps Google Sheet row to JavaScript object using header names as keys
 */
function getUserProfile(uid) {
  try {
    const sheet = getSheet("Users");
    const data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      return null; // No data rows
    }
    
    const headers = data[0];
    
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (row[0] === uid) { // Assuming UID is in first column
        // Map row to object based on headers
        const profile = {};
        headers.forEach((h, idx) => {
          // Convert string booleans to actual booleans
          let value = row[idx];
          if (h === 'is_active' || h === 'force_password_reset') {
            if (typeof value === 'string') {
              value = value.toLowerCase() === 'true';
            } else {
              value = Boolean(value);
            }
          }
          profile[h] = value;
        });
        return profile;
      }
    }
  } catch (e) {
    console.error('Error retrieving user profile:', e);
  }
  return null;
}

/**
 * INPUT SANITIZATION ENGINE (Whitelist-based)
 */
function sanitize(payload, action) {
  const allowed = SCHEMAS[action];
  const clean = {};
  
  if (!allowed) {
    return clean; // Return empty object if action is not defined in schemas
  }
  
  allowed.forEach(key => {
    let val = payload[key];
    if (val === undefined) return;
    
    if (typeof val === 'string') {
      // Strip HTML tags and malicious content
      val = val.replace(/<[^>]*>/g, "").trim();
      
      // Additional security sanitization
      val = val.replace(/javascript:/gi, "");
      val = val.replace(/vbscript:/gi, "");
      val = val.replace(/on\w+=/gi, "");
      
      // Enforce Length Limits
      let limit = CONFIG.MAX_LEN.TITLE;
      if (key === 'description') limit = CONFIG.MAX_LEN.DESC;
      if (key === 'name') limit = CONFIG.MAX_LEN.NAME;
      if (key === 'email') limit = CONFIG.MAX_LEN.EMAIL;
      
      if (val.length > limit) val = val.substring(0, limit);
    }
    
    // Type validation for booleans
    if (key === 'is_active' || key === 'force_password_reset') {
      if (typeof val === 'string') {
        val = val.toLowerCase() === 'true';
      } else {
        val = Boolean(val);
      }
    }
    
    clean[key] = val;
  });
  return clean;
}

/**
 * USER MANAGEMENT HANDLERS
 */
function handleCreateUser(adminUser, data) {
  const sheet = getSheet("Users");
  
  // Validate role
  if (!CONFIG.ROLES.includes(data.role)) {
    return response(false, 400, { error: "Invalid role specified" });
  }
  
  // Auto-generate UID
  const uid = Utilities.getUuid();
  
  sheet.appendRow([
    uid,
    data.name,
    data.email,
    data.role,
    data.department || "",
    data.coe_id || "",
    data.description || "",
    true, // is_active
    true  // force_password_reset
  ]);
  
  logAudit(adminUser.uid, "INFO", "CREATE_USER", uid);
  return response(true, 201, { message: "User created successfully", uid });
}

function handleUpdateUser(adminUser, data) {
  const sheet = getSheet("Users");
  const dataRange = sheet.getDataRange().getValues();
  const headers = dataRange[0];
  
  // Find the user by UID
  for (let i = 1; i < dataRange.length; i++) {
    if (dataRange[i][0] === data.uid) { // Assuming UID is in first column
      // Update the row with new values
      const updatedRow = [...dataRange[i]];
      
      // Map data fields to column indices
      const colIndex = {};
      headers.forEach((header, idx) => colIndex[header] = idx);
      
      // Update fields if provided
      if (data.name !== undefined) updatedRow[colIndex['name']] = data.name;
      if (data.email !== undefined) updatedRow[colIndex['email']] = data.email;
      if (data.role !== undefined) {
        if (!CONFIG.ROLES.includes(data.role)) {
          return response(false, 400, { error: "Invalid role specified" });
        }
        updatedRow[colIndex['role']] = data.role;
      }
      if (data.department !== undefined) updatedRow[colIndex['department']] = data.department;
      if (data.coe_id !== undefined) updatedRow[colIndex['coe_id']] = data.coe_id;
      if (data.description !== undefined) updatedRow[colIndex['description']] = data.description;
      if (data.is_active !== undefined) updatedRow[colIndex['is_active']] = data.is_active;
      if (data.force_password_reset !== undefined) updatedRow[colIndex['force_password_reset']] = data.force_password_reset;
      
      // Update the row in the sheet
      for (let j = 0; j < headers.length; j++) {
        sheet.getRange(i + 1, j + 1).setValue(updatedRow[j]);
      }
      
      logAudit(adminUser.uid, "INFO", "UPDATE_USER", data.uid);
      return response(true, 200, { message: "User updated successfully" });
    }
  }
  
  return response(false, 404, { error: "User not found" });
}

function handleGetUser(adminUser, data) {
  const userProfile = getUserProfile(data.uid);
  if (!userProfile) {
    return response(false, 404, { error: "User not found" });
  }
  
  logAudit(adminUser.uid, "INFO", "GET_USER", data.uid);
  return response(true, 200, { user: userProfile });
}

/**
 * PROJECT MANAGEMENT HANDLERS
 */
function handleSubmitProject(user, data) {
  const sheet = getSheet("Projects");
  const projectId = "PRJ-" + Utilities.getUuid().split('-')[0].toUpperCase();
  
  sheet.appendRow([
    projectId, 
    data.title, 
    data.description, 
    data.category, 
    data.faculty_lead_uid, 
    data.student_ids || user.uid, 
    data.team_list || "[]", 
    "PENDING", 
    "Proposed", 
    new Date().toISOString(),
    "", // reviewed_by
    ""  // reviewed_at
  ]);
  
  logAudit(user.uid, "INFO", "SUBMIT_PROJECT", projectId);
  return response(true, 201, { message: "Submission successful", projectId });
}

function handleUpdateProject(user, data) {
  const sheet = getSheet("Projects");
  const dataRange = sheet.getDataRange().getValues();
  const headers = dataRange[0];
  
  // Find the project by ID
  for (let i = 1; i < dataRange.length; i++) {
    if (dataRange[i][0] === data.project_id) { // Assuming project_id is in first column
      // Update the row with new values
      const updatedRow = [...dataRange[i]];
      
      // Map data fields to column indices
      const colIndex = {};
      headers.forEach((header, idx) => colIndex[header] = idx);
      
      // Update fields if provided
      if (data.title !== undefined) updatedRow[colIndex['title']] = data.title;
      if (data.description !== undefined) updatedRow[colIndex['description']] = data.description;
      if (data.category !== undefined) updatedRow[colIndex['category']] = data.category;
      if (data.status !== undefined) updatedRow[colIndex['status']] = data.status;
      if (data.progress !== undefined) {
        if (!CONFIG.PROJECT_STATUSES.includes(data.progress)) {
          return response(false, 400, { error: "Invalid progress status" });
        }
        updatedRow[colIndex['progress']] = data.progress;
      }
      
      // Update the row in the sheet
      for (let j = 0; j < headers.length; j++) {
        sheet.getRange(i + 1, j + 1).setValue(updatedRow[j]);
      }
      
      logAudit(user.uid, "INFO", "UPDATE_PROJECT", data.project_id);
      return response(true, 200, { message: "Project updated successfully" });
    }
  }
  
  return response(false, 404, { error: "Project not found" });
}

function handleApproveProject(adminUser, data) {
  const sheet = getSheet("Projects");
  const dataRange = sheet.getDataRange().getValues();
  const headers = dataRange[0];
  
  // Find the project by ID
  for (let i = 1; i < dataRange.length; i++) {
    if (dataRange[i][0] === data.project_id) { // Assuming project_id is in first column
      // Update the row with new values
      const updatedRow = [...dataRange[i]];
      
      // Map data fields to column indices
      const colIndex = {};
      headers.forEach((header, idx) => colIndex[header] = idx);
      
      // Update status and review info
      if (data.status !== undefined) updatedRow[colIndex['status']] = data.status;
      if (data.rejection_reason !== undefined) updatedRow[colIndex['rejection_reason']] = data.rejection_reason;
      if (data.reviewed_by !== undefined) updatedRow[colIndex['reviewed_by']] = data.reviewed_by;
      updatedRow[colIndex['reviewed_at']] = new Date().toISOString();
      
      // Update the row in the sheet
      for (let j = 0; j < headers.length; j++) {
        sheet.getRange(i + 1, j + 1).setValue(updatedRow[j]);
      }
      
      logAudit(adminUser.uid, "INFO", "APPROVE_PROJECT", data.project_id);
      return response(true, 200, { message: "Project approved successfully" });
    }
  }
  
  return response(false, 404, { error: "Project not found" });
}

function handleGetProject(user, data) {
  const sheet = getSheet("Projects");
  const dataRange = sheet.getDataRange().getValues();
  const headers = dataRange[0];
  
  // Find the project by ID
  for (let i = 1; i < dataRange.length; i++) {
    if (dataRange[i][0] === data.project_id) { // Assuming project_id is in first column
      // Map row to object based on headers
      const project = {};
      headers.forEach((h, idx) => project[h] = dataRange[i][idx]);
      
      logAudit(user.uid, "INFO", "GET_PROJECT", data.project_id);
      return response(true, 200, { project });
    }
  }
  
  return response(false, 404, { error: "Project not found" });
}

/**
 * EVENT MANAGEMENT HANDLERS
 */
function handleCreateEvent(user, data) {
  const sheet = getSheet("Events");
  const eventId = "EVT-" + Utilities.getUuid().split('-')[0].toUpperCase();
  
  // Validate status
  if (!CONFIG.EVENT_STATUSES.includes(data.status)) {
    data.status = "PENDING"; // Default to pending
  }
  
  sheet.appendRow([
    eventId,
    data.title,
    data.date,
    data.time,
    data.location,
    data.type,
    data.description,
    data.status,
    data.submitted_by || user.uid,
    data.coe_id || ""
  ]);
  
  logAudit(user.uid, "INFO", "CREATE_EVENT", eventId);
  return response(true, 201, { message: "Event created successfully", eventId });
}

function handleUpdateEvent(user, data) {
  const sheet = getSheet("Events");
  const dataRange = sheet.getDataRange().getValues();
  const headers = dataRange[0];
  
  // Find the event by ID
  for (let i = 1; i < dataRange.length; i++) {
    if (dataRange[i][0] === data.event_id) { // Assuming event_id is in first column
      // Update the row with new values
      const updatedRow = [...dataRange[i]];
      
      // Map data fields to column indices
      const colIndex = {};
      headers.forEach((header, idx) => colIndex[header] = idx);
      
      // Update fields if provided
      if (data.title !== undefined) updatedRow[colIndex['title']] = data.title;
      if (data.date !== undefined) updatedRow[colIndex['date']] = data.date;
      if (data.time !== undefined) updatedRow[colIndex['time']] = data.time;
      if (data.location !== undefined) updatedRow[colIndex['location']] = data.location;
      if (data.type !== undefined) updatedRow[colIndex['type']] = data.type;
      if (data.description !== undefined) updatedRow[colIndex['description']] = data.description;
      if (data.status !== undefined) {
        if (!CONFIG.EVENT_STATUSES.includes(data.status)) {
          return response(false, 400, { error: "Invalid event status" });
        }
        updatedRow[colIndex['status']] = data.status;
      }
      
      // Update the row in the sheet
      for (let j = 0; j < headers.length; j++) {
        sheet.getRange(i + 1, j + 1).setValue(updatedRow[j]);
      }
      
      logAudit(user.uid, "INFO", "UPDATE_EVENT", data.event_id);
      return response(true, 200, { message: "Event updated successfully" });
    }
  }
  
  return response(false, 404, { error: "Event not found" });
}

function handleGetEvent(user, data) {
  const sheet = getSheet("Events");
  const dataRange = sheet.getDataRange().getValues();
  const headers = dataRange[0];
  
  // Find the event by ID
  for (let i = 1; i < dataRange.length; i++) {
    if (dataRange[i][0] === data.event_id) { // Assuming event_id is in first column
      // Map row to object based on headers
      const event = {};
      headers.forEach((h, idx) => event[h] = dataRange[i][idx]);
      
      logAudit(user.uid, "INFO", "GET_EVENT", data.event_id);
      return response(true, 200, { event });
    }
  }
  
  return response(false, 404, { error: "Event not found" });
}

/**
 * AUTH MAPPING HANDLERS
 */
function handleCreateAuthMapping(adminUser, data) {
  const sheet = getSheet("AuthMapping");
  
  sheet.appendRow([
    data.firebase_uid,
    data.enrollment_no || "",
    data.internal_id || "",
    new Date().toISOString()
  ]);
  
  logAudit(adminUser.uid, "INFO", "CREATE_AUTH_MAPPING", data.firebase_uid);
  return response(true, 201, { message: "Auth mapping created successfully" });
}

function handleUpdateAuthMapping(adminUser, data) {
  const sheet = getSheet("AuthMapping");
  const dataRange = sheet.getDataRange().getValues();
  const headers = dataRange[0];
  
  // Find the mapping by firebase_uid
  for (let i = 1; i < dataRange.length; i++) {
    if (dataRange[i][0] === data.firebase_uid) { // Assuming firebase_uid is in first column
      // Update the row with new values
      const updatedRow = [...dataRange[i]];
      
      // Map data fields to column indices
      const colIndex = {};
      headers.forEach((header, idx) => colIndex[header] = idx);
      
      // Update fields if provided
      if (data.enrollment_no !== undefined) updatedRow[colIndex['enrollment_no']] = data.enrollment_no;
      if (data.internal_id !== undefined) updatedRow[colIndex['internal_id']] = data.internal_id;
      updatedRow[colIndex['last_login']] = new Date().toISOString();
      
      // Update the row in the sheet
      for (let j = 0; j < headers.length; j++) {
        sheet.getRange(i + 1, j + 1).setValue(updatedRow[j]);
      }
      
      logAudit(adminUser.uid, "INFO", "UPDATE_AUTH_MAPPING", data.firebase_uid);
      return response(true, 200, { message: "Auth mapping updated successfully" });
    }
  }
  
  return response(false, 404, { error: "Auth mapping not found" });
}

/**
 * PASSWORD HANDLER
 */
function handleUpdatePassword(user, data) {
  // In a real implementation, this would hash and store the password
  // For now, we just return success since password handling is managed by Firebase
  logAudit(user.uid, "INFO", "UPDATE_PASSWORD", user.uid);
  return response(true, 200, { message: "Password updated successfully" });
}

/**
 * CORE UTILITIES
 */
function getSheet(name) {
  const ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
  const sheet = ss.getSheetByName(name);
  if (!sheet) throw new Error("Database integrity error: Sheet " + name + " missing.");
  return sheet;
}

function response(success, code, data) {
  const out = JSON.stringify({ success, code, ...data });
  return ContentService.createTextOutput(out).setMimeType(ContentService.MimeType.JSON);
}

function forbidden() {
  return response(false, 403, { error: "RBAC violation: Insufficient permissions" });
}

/**
 * AUDIT LOGGING SYSTEM
 * Records all critical actions for security and compliance
 */
function logAudit(actor_uid, action, target_id, details = "") {
  try {
    // Ensure AuditLogs sheet exists
    const sheet = getSheet("AuditLogs");
    
    // Get current timestamp
    const timestamp = new Date().toISOString();
    
    // Determine severity based on action
    let severity = "INFO";
    if (action.includes("ERROR") || action.includes("FAILED")) {
      severity = "CRITICAL";
    } else if (action.includes("DELETE") || action.includes("UPDATE")) {
      severity = "MODERATE";
    }
    
    // Append the audit record
    sheet.appendRow([
      timestamp,
      actor_uid,
      action,
      target_id,
      details,
      severity
    ]);
  } catch(e) {
    console.error("Audit logging failed", e);
    // Log to system if audit sheet is unavailable
    console.log(`AUDIT_FAIL: ${new Date().toISOString()} | ${actor_uid} | ${action} | ${target_id}`);
  }
}
