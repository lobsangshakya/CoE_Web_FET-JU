/**
 * SETUP SCRIPT FOR GOOGLE SHEETS DATABASE
 * Creates all required sheets with proper column headers as per specification
 */

/**
 * Main setup function - creates all required sheets with correct headers
 */
function setupDatabase() {
  const ssId = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
  if (!ssId) {
    throw new Error("SPREADSHEET_ID property not set. Please configure in Script Properties.");
  }
  
  const ss = SpreadsheetApp.openById(ssId);
  
  // Create Users sheet if it doesn't exist
  createUsersSheet(ss);
  
  // Create Projects sheet if it doesn't exist
  createProjectsSheet(ss);
  
  // Create Events sheet if it doesn't exist
  createEventsSheet(ss);
  
  // Create AuthMapping sheet if it doesn't exist
  createAuthMappingSheet(ss);
  
  // Create AuditLogs sheet if it doesn't exist
  createAuditLogsSheet(ss);
  
  console.log("All sheets have been created/verified successfully!");
}

/**
 * Creates the Users sheet with required columns
 */
function createUsersSheet(ss) {
  let sheet = ss.getSheetByName("Users");
  if (!sheet) {
    sheet = ss.insertSheet("Users");
    console.log("Created Users sheet");
  }
  
  // Define headers as per specification
  const headers = [
    "uid",                    // Firebase ID
    "name",                   // User's name
    "email",                  // User's email
    "role",                   // ADMIN, FACULTY, STUDENT
    "department",             // User's department
    "coe_id",                 // COE ID
    "description",            // User description
    "is_active",              // Boolean (TRUE/FALSE)
    "force_password_reset"    // Boolean (TRUE/FALSE)
  ];
  
  // Clear existing content and set headers
  sheet.clear();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Set column widths for better readability
  sheet.setColumnWidths(1, headers.length, 150);
  
  console.log("Users sheet configured with required headers");
}

/**
 * Creates the Projects sheet with required columns
 */
function createProjectsSheet(ss) {
  let sheet = ss.getSheetByName("Projects");
  if (!sheet) {
    sheet = ss.insertSheet("Projects");
    console.log("Created Projects sheet");
  }
  
  // Define headers as per specification
  const headers = [
    "project_id",             // Auto-generated: PRJ-XXXX
    "title",                  // Project title
    "description",            // Project description
    "category",               // Project category
    "faculty_lead_uid",       // Faculty lead UID
    "student_ids",            // Student IDs
    "team_list",              // Team members list
    "status",                 // PENDING, APPROVED, REJECTED
    "progress",               // Proposed, Assigned, Started, In Progress, Approval, Completed, Rejected
    "submitted_at",           // Submission timestamp
    "reviewed_by",            // Reviewer UID
    "reviewed_at",            // Review timestamp
    "rejection_reason"        // Reason for rejection (if applicable)
  ];
  
  // Clear existing content and set headers
  sheet.clear();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Set column widths for better readability
  sheet.setColumnWidths(1, headers.length, 150);
  
  console.log("Projects sheet configured with required headers");
}

/**
 * Creates the Events sheet with required columns
 */
function createEventsSheet(ss) {
  let sheet = ss.getSheetByName("Events");
  if (!sheet) {
    sheet = ss.insertSheet("Events");
    console.log("Created Events sheet");
  }
  
  // Define headers as per specification
  const headers = [
    "event_id",               // Auto-generated: EVT-XXXX
    "title",                  // Event title
    "date",                   // Event date
    "time",                   // Event time
    "location",               // Event location
    "type",                   // Event type
    "description",            // Event description
    "status",                 // PENDING, APPROVED, REJECTED
    "submitted_by",           // Submitter UID
    "coe_id"                 // COE ID
  ];
  
  // Clear existing content and set headers
  sheet.clear();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Set column widths for better readability
  sheet.setColumnWidths(1, headers.length, 150);
  
  console.log("Events sheet configured with required headers");
}

/**
 * Creates the AuthMapping sheet with required columns
 */
function createAuthMappingSheet(ss) {
  let sheet = ss.getSheetByName("AuthMapping");
  if (!sheet) {
    sheet = ss.insertSheet("AuthMapping");
    console.log("Created AuthMapping sheet");
  }
  
  // Define headers as per specification
  const headers = [
    "firebase_uid",           // Firebase UID
    "enrollment_no",          // Enrollment number
    "internal_id",            // Internal ID
    "last_login"              // Last login timestamp
  ];
  
  // Clear existing content and set headers
  sheet.clear();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Set column widths for better readability
  sheet.setColumnWidths(1, headers.length, 150);
  
  console.log("AuthMapping sheet configured with required headers");
}

/**
 * Creates the AuditLogs sheet with required columns
 */
function createAuditLogsSheet(ss) {
  let sheet = ss.getSheetByName("AuditLogs");
  if (!sheet) {
    sheet = ss.insertSheet("AuditLogs");
    console.log("Created AuditLogs sheet");
  }
  
  // Define headers as per specification
  const headers = [
    "timestamp",              // Action timestamp
    "actor_uid",              // Actor's UID
    "action",                 // Action performed
    "target_id",              // Target ID affected
    "details",                // Additional details
    "severity"                // Severity level
  ];
  
  // Clear existing content and set headers
  sheet.clear();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Set column widths for better readability
  sheet.setColumnWidths(1, headers.length, 150);
  
  // Protect the sheet from direct editing (only Apps Script can write)
  const protection = sheet.protect().setDescription("Audit logs are protected - only Apps Script can write");
  protection.setWarningOnly(true); // Warning only, doesn't prevent all changes
  
  console.log("AuditLogs sheet configured with required headers and protection");
}

/**
 * Helper function to validate sheet structure
 */
function validateSheetStructure() {
  const ssId = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
  if (!ssId) {
    throw new Error("SPREADSHEET_ID property not set. Please configure in Script Properties.");
  }
  
  const ss = SpreadsheetApp.openById(ssId);
  const requiredSheets = ["Users", "Projects", "Events", "AuthMapping", "AuditLogs"];
  
  let allValid = true;
  
  for (const sheetName of requiredSheets) {
    const sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      console.error(`Missing sheet: ${sheetName}`);
      allValid = false;
      continue;
    }
    
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    console.log(`${sheetName} headers:`, headers);
  }
  
  if (allValid) {
    console.log("All required sheets exist and have headers defined.");
  }
  
  return allValid;
}