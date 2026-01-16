# Deployment Guide for Center of Excellence Backend

This guide provides step-by-step instructions to deploy the Google Sheets + Firebase backend for the Center of Excellence project.

## Prerequisites

Before starting the deployment, ensure you have:

1. **Google Account** with access to Google Sheets and Google Apps Script
2. **Firebase Project** with authentication configured
3. **Access rights** to create and configure Google Apps Script projects
4. **Developer access** to set up script properties and scopes

## Step 1: Create the Google Spreadsheet Database

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Note the spreadsheet ID from the URL (the long string between `/d/` and `/edit`)
4. Keep this spreadsheet open for the next step

## Step 2: Create and Configure Google Apps Script Project

1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Replace the default `Code.gs` content with the content from `/Users/lobsangtseten/Desktop/jain-university-center-of-excellence (7)/backend/Code.gs`
4. Create a new file named `setupSheets.gs` and add the content from `/Users/lobsangtseten/Desktop/jain-university-center-of-excellence (7)/backend/setupSheets.gs`
5. Create a new file named `testSecurity.gs` and add the content from `/Users/lobsangtseten/Desktop/jain-university-center-of-excellence (7)/backend/testSecurity.gs`

## Step 3: Configure Script Properties

1. In the Apps Script editor, go to **Project Settings** (gear icon)
2. Scroll down to **Script Properties**
3. Click **Add Property** and add the following:
   - Key: `SPREADSHEET_ID`, Value: Your Google Spreadsheet ID from Step 1
   - Key: `FIREBASE_PROJECT_ID`, Value: Your Firebase Project ID

## Step 4: Set Up Required Scopes

1. In the Apps Script editor, click on the **Project Settings** (gear icon)
2. Under "Scopes," ensure the following scopes are granted:
   - `https://www.googleapis.com/auth/spreadsheets`
   - `https://www.googleapis.com/auth/script.external_request`
   - `https://www.googleapis.com/auth/script.cache`

## Step 5: Deploy the Script

1. In the Apps Script editor, click **Deploy** > **New Deployment**
2. Click **+ New Deployment**
3. Fill in the details:
   - **Description**: "COE Backend Production"
   - **Type**: Web Application
4. Click **Manifests & Scopes** and verify all required scopes are listed
5. Click **Deploy**
6. In the popup, click **Review Permissions** and authenticate as the admin account
7. Select the admin account that will execute the script
8. Click **Allow** to grant the required permissions
9. Copy the **Web App URL** - you'll need this for frontend integration

## Step 6: Initialize Database Structure

1. In the Apps Script editor, run the `setupDatabase()` function:
   - Select `setupSheets.gs` file
   - Choose `setupDatabase` from the dropdown
   - Click the ▶️ (play) button
   - Check the execution log to confirm all sheets were created

## Step 7: Verify Setup

1. Run the security test suite:
   - Select `testSecurity.gs` file
   - Choose `runAllSecurityTests` from the dropdown
   - Click the ▶️ (play) button
   - Check the execution log for test results

2. You can also run individual tests:
   - `quickValidateSetup()` - Quick configuration check
   - `testTokenVerification()` - Token validation test
   - `testRBAC()` - Role-based access control test
   - etc.

## Step 8: Frontend Integration

1. Update the frontend `apiService.ts` file with your deployed URL:
   ```typescript
   const APPS_SCRIPT_URL = "YOUR_DEPLOYED_WEB_APP_URL"; // Replace with actual URL from Step 5
   ```

## Step 9: Security Verification Checklist

Run through these manual checks to ensure everything is working:

### ✅ Token Verification
- [ ] Invalid tokens are rejected with 401
- [ ] Valid tokens are accepted
- [ ] Expired tokens are rejected

### ✅ RBAC Enforcement
- [ ] Students cannot call admin functions
- [ ] Faculty cannot call admin-only functions
- [ ] Admins can access all functions
- [ ] Guest users have limited access

### ✅ Replay Protection
- [ ] Duplicate request IDs are rejected
- [ ] Unique request IDs are accepted

### ✅ Input Sanitization
- [ ] HTML tags are stripped from inputs
- [ ] Length limits are enforced
- [ ] Boolean values are properly converted

### ✅ Audit Logging
- [ ] Actions are logged to AuditLogs sheet
- [ ] Log entries contain proper timestamps and user IDs

### ✅ User Management
- [ ] Deactivated users (is_active = FALSE) are blocked
- [ ] Users with force_password_reset = TRUE can only update passwords

## Troubleshooting

### Common Issues and Solutions

**Issue**: "Spreadsheet ID not found" error
- Solution: Verify SPREADSHEET_ID in Script Properties matches the actual spreadsheet ID

**Issue**: "Authorization required" error
- Solution: Re-run the deployment and ensure you selected the correct account

**Issue**: Functions returning 403 errors
- Solution: Check user roles in the Users sheet and ensure they match the required permissions

**Issue**: Audit logs not appearing
- Solution: Verify the AuditLogs sheet exists and the script has write permissions

### Testing Individual Components

You can test individual components by running the test functions in the Apps Script editor:

1. Open the script editor
2. Select the `testSecurity.gs` file
3. Choose the specific test function from the dropdown
4. Click run and check the execution logs

## Maintenance

### Regular Monitoring
- Monitor the AuditLogs sheet for security events
- Check for any failed API calls in execution logs
- Periodically verify user accounts are properly maintained

### Updates
- When updating the script, increment the version number in deployments
- Test changes in a separate script project before updating production
- Maintain backup copies of working versions

## Security Best Practices

- Never share the Apps Script project with unauthorized users
- Regularly rotate service account keys if used
- Monitor the execution logs for unusual activity
- Keep the spreadsheet access limited to necessary personnel only
- Regularly review and clean up inactive user accounts

## Support

For issues with the deployment:
1. Check the Apps Script execution logs first
2. Run the security test suite to identify specific problems
3. Verify all configuration settings match the requirements
4. Consult the main implementation documentation for reference