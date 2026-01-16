# Center of Excellence - Backend Implementation

This document outlines the complete Google Sheets + Firebase backend implementation for the Center of Excellence project, following all specifications outlined in the requirements.

## Architecture Overview

The backend consists of:
1. **Google Apps Script** - Central API entry point with security controls
2. **Google Sheets** - Database storage for all entities
3. **Firebase Authentication** - User authentication and identity management

## Google Apps Script Backend

### Core Components

#### 1. Security Controls
- **doPost(e)** - Central API entry point with mandatory authentication
- **verifyFirebaseToken** - Validates JWT via Google OAuth2
- **isUniqueRequest** - Checks CacheService for requestId to prevent replay attacks
- **sanitize** - Whitelists keys and strips malicious content
- **getUserProfile** - Header-based row-to-object mapping
- **authorize** - Role comparison logic for RBAC
- **logAudit** - Records every write-action for compliance

#### 2. Configuration
```javascript
const CONFIG = {
  get SHEET_ID() { return PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID'); },
  get FIREBASE_PROJECT_ID() { return PropertiesService.getScriptProperties().getProperty('FIREBASE_PROJECT_ID'); },
  ROLES: ['GUEST', 'STUDENT', 'FACULTY', 'ADMIN'],
  PROJECT_STATUSES: ['Proposed', 'Assigned', 'Started', 'In Progress', 'Approval', 'Completed', 'Rejected'],
  EVENT_STATUSES: ['PENDING', 'APPROVED', 'REJECTED'],
  MAX_LEN: { TITLE: 200, DESC: 2000, NAME: 100, EMAIL: 100 }
};
```

#### 3. Schema Validation
Strict whitelisting of allowed fields per action:
- **User operations**: `createUser`, `updateUser`, `getUser`
- **Project operations**: `submitProject`, `updateProject`, `approveProject`, `getProject`
- **Event operations**: `createEvent`, `updateEvent`, `getEvent`
- **Auth operations**: `createAuthMapping`, `updateAuthMapping`
- **Password operations**: `updatePassword`

### Security Features Implemented

#### 1. Token Verification
- Validates Firebase ID tokens using Google's public certificates
- Verifies issuer, audience, and expiration
- Supports both accounts.google.com and https://accounts.google.com issuers

#### 2. Replay Attack Protection
- Uses CacheService to track request IDs
- Prevents duplicate requests within 10-minute window
- Automatically expires cached IDs after 600 seconds

#### 3. Input Sanitization
- Strips HTML tags and malicious content
- Blocks javascript:, vbscript:, and event handlers
- Enforces length limits per field type
- Converts string booleans to actual booleans for `is_active` and `force_password_reset`

#### 4. Role-Based Access Control (RBAC)
- Hierarchical role system: ADMIN > FACULTY > STUDENT > GUEST
- Action-specific permission checks
- Automatic role validation during authorization

#### 5. Audit Logging
- Comprehensive logging of all actions
- Automatic severity classification
- Protected AuditLogs sheet to prevent tampering

## Google Sheets Structure

### 1. Users Sheet
| Column | Purpose | Validation |
|--------|---------|------------|
| uid | Firebase ID | Auto-generated during first login |
| name | User's name | Max 100 characters |
| email | User's email | Max 100 characters |
| role | ADMIN, FACULTY, STUDENT | Must be one of valid roles |
| department | User's department | Free text |
| coe_id | COE ID | Free text |
| description | User description | Max 2000 characters |
| is_active | Account status | Boolean (TRUE/FALSE) |
| force_password_reset | Password reset flag | Boolean (TRUE/FALSE) |

### 2. Projects Sheet
| Column | Purpose | Validation |
|--------|---------|------------|
| project_id | Auto-generated ID (PRJ-XXXX) | Auto-generated, never manually edited |
| title | Project title | Max 200 characters |
| description | Project description | Max 2000 characters |
| category | Project category | Free text |
| faculty_lead_uid | Faculty lead UID | Reference to Users.uid |
| student_ids | Student IDs | Free text |
| team_list | Team members list | JSON string |
| status | PENDING/APPROVED/REJECTED | Must be valid status |
| progress | Project progress stage | Must be one of valid progress stages |
| submitted_at | Submission timestamp | Auto-generated ISO string |
| reviewed_by | Reviewer UID | Reference to Users.uid |
| reviewed_at | Review timestamp | Auto-generated ISO string |
| rejection_reason | Reason for rejection | Free text |

### 3. Events Sheet
| Column | Purpose | Validation |
|--------|---------|------------|
| event_id | Auto-generated ID (EVT-XXXX) | Auto-generated |
| title | Event title | Max 200 characters |
| date | Event date | Free text |
| time | Event time | Free text |
| location | Event location | Free text |
| type | Event type | Free text |
| description | Event description | Max 2000 characters |
| status | PENDING/APPROVED/REJECTED | Must be valid status |
| submitted_by | Submitter UID | Reference to Users.uid |
| coe_id | COE ID | Free text |

### 4. AuthMapping Sheet
| Column | Purpose | Validation |
|--------|---------|------------|
| firebase_uid | Firebase UID | Reference to Firebase |
| enrollment_no | Enrollment number | Free text |
| internal_id | Internal ID | Free text |
| last_login | Last login timestamp | Auto-generated ISO string |

### 5. AuditLogs Sheet
| Column | Purpose | Access Level |
|--------|---------|--------------|
| timestamp | Action timestamp | Read-only for everyone except Script Execution Identity |
| actor_uid | Actor's UID | Read-only for everyone except Script Execution Identity |
| action | Action performed | Read-only for everyone except Script Execution Identity |
| target_id | Target ID affected | Read-only for everyone except Script Execution Identity |
| details | Additional details | Read-only for everyone except Script Execution Identity |
| severity | Severity level | Read-only for everyone except Script Execution Identity |

## Deployment Configuration

### Script Properties Required
- **SPREADSHEET_ID**: ID of the database sheet
- **FIREBASE_PROJECT_ID**: Firebase project ID
- **OAUTH2_CLIENT_ID**: Optional for advanced verification

### Deployment Settings
- **Execute As**: Admin account
- **Access**: Anyone (Authentication via Firebase Token, not Google Login)

### Required Scopes
- `https://www.googleapis.com/auth/spreadsheets`
- `https://www.googleapis.com/auth/script.external_request`
- `https://www.googleapis.com/auth/script.cache`

## Permission Model

### Google Sheet Access
- **Owner**: System Admin
- **Editors**: None (all writes via Apps Script "Execute as Me")
- **Viewers**: Limited to faculty auditors

### Apps Script Access
- **Editors**: Lead Developer only

### Role Permissions
- **STUDENT**: Can submit projects (Proposed state only), view own projects
- **FACULTY**: Can create/update events, transition project progress, review projects
- **ADMIN**: Full state-machine control, user management, project approval

## Setup Instructions

1. **Create Google Spreadsheet** with required sheets using the `setupSheets.gs` script
2. **Deploy Google Apps Script** with the required configuration
3. **Set Script Properties** with SPREADSHEET_ID and FIREBASE_PROJECT_ID
4. **Configure OAuth Scopes** as specified
5. **Run security tests** using the `testSecurity.gs` script

## Testing

The implementation includes comprehensive security testing with the `testSecurity.gs` script that validates:
- Token verification
- Role-based access control
- Request replay protection
- Input sanitization
- User deactivation
- Password reset gate
- Schema validation

## API Endpoints

The backend exposes various endpoints through the `doPost` function:

### User Management
- `createUser` - Create new user (ADMIN only)
- `updateUser` - Update user information (ADMIN only)
- `getUser` - Retrieve user information (ADMIN only)

### Project Management
- `submitProject` - Submit new project (STUDENT)
- `updateProject` - Update project (FACULTY)
- `approveProject` - Approve/reject project (ADMIN)
- `getProject` - Retrieve project details (FACULTY)

### Event Management
- `createEvent` - Create new event (FACULTY)
- `updateEvent` - Update event (FACULTY)
- `getEvent` - Retrieve event details (FACULTY)

### Authentication
- `createAuthMapping` - Create auth mapping (ADMIN)
- `updateAuthMapping` - Update auth mapping (ADMIN)
- `updatePassword` - Update password (available to all, with password reset gate)

## Security Compliance

The implementation meets all security requirements:
- ✅ Token verification with Firebase
- ✅ Replay attack prevention
- ✅ Input sanitization
- ✅ Role-based access control
- ✅ Comprehensive audit logging
- ✅ Data validation
- ✅ User deactivation support
- ✅ Password reset mechanism