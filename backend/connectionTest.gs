/**
 * CONNECTION TEST SCRIPT
 * Used to verify that the Apps Script backend is properly connected to the Google Sheet
 */

/**
 * Test the basic connection to the backend
 */
function testConnection() {
  try {
    Logger.log("=== Starting Connection Test ===");
    
    // Test if spreadsheet ID is configured
    const sheetId = CONFIG.SHEET_ID;
    if (!sheetId) {
      Logger.log("❌ ERROR: SPREADSHEET_ID is not configured in Script Properties");
      return { success: false, message: "SPREADSHEET_ID not configured" };
    }
    
    Logger.log("✅ SPREADSHEET_ID is configured: " + sheetId.substring(0, 10) + "...");
    
    // Test if we can access the spreadsheet
    try {
      const ss = SpreadsheetApp.openById(sheetId);
      Logger.log("✅ Successfully accessed spreadsheet");
    } catch (e) {
      Logger.log("❌ Error accessing spreadsheet: " + e.toString());
      return { success: false, message: "Cannot access spreadsheet: " + e.toString() };
    }
    
    // Test creating/getting a sheet
    try {
      const testSheet = getSheet("TestConnection");
      Logger.log("✅ Successfully accessed/created TestConnection sheet");
    } catch (e) {
      Logger.log("❌ Error with TestConnection sheet: " + e.toString());
      return { success: false, message: "Cannot access TestConnection sheet: " + e.toString() };
    }
    
    // Test basic functionality
    try {
      // Test the sanitize function
      const testPayload = { test: "value" };
      const sanitized = sanitize(testPayload, 'testConnection');
      Logger.log("✅ Sanitize function working");
    } catch (e) {
      Logger.log("❌ Error with sanitize function: " + e.toString());
      return { success: false, message: "Sanitize function error: " + e.toString() };
    }
    
    Logger.log("✅ All basic connection tests passed");
    return { success: true, message: "All connection tests passed" };
    
  } catch (error) {
    Logger.log("❌ Unexpected error during connection test: " + error.toString());
    return { success: false, message: "Unexpected error: " + error.toString() };
  }
}

/**
 * Test the audit logging functionality
 */
function testAuditLogging() {
  try {
    Logger.log("=== Testing Audit Logging ===");
    
    // Test audit logging
    logAudit("TEST_USER", "CONNECTION_TEST", "Test audit entry");
    Logger.log("✅ Audit log entry created");
    
    return { success: true, message: "Audit logging test passed" };
  } catch (error) {
    Logger.log("❌ Error testing audit logging: " + error.toString());
    return { success: false, message: "Audit logging error: " + error.toString() };
  }
}

/**
 * Test the user profile functionality
 */
function testUserProfile() {
  try {
    Logger.log("=== Testing User Profile Retrieval ===");
    
    // Try to get a test user profile (this will fail if no user exists, which is expected)
    const testUser = getUserProfile("test_user_id");
    Logger.log("✅ User profile function executed (result may be null if user doesn't exist)");
    
    return { success: true, message: "User profile function test passed" };
  } catch (error) {
    Logger.log("❌ Error testing user profile: " + error.toString());
    return { success: false, message: "User profile error: " + error.toString() };
  }
}

/**
 * Run all tests
 */
function runAllTests() {
  Logger.log("🚀 Running All Backend Tests");
  
  const connectionTest = testConnection();
  Logger.log("📋 Connection Test Result: ", connectionTest);
  
  const auditTest = testAuditLogging();
  Logger.log("📋 Audit Test Result: ", auditTest);
  
  const userTest = testUserProfile();
  Logger.log("📋 User Profile Test Result: ", userTest);
  
  const allTests = [connectionTest, auditTest, userTest];
  const allPassed = allTests.every(test => test.success);
  
  Logger.log("🏁 All Tests Complete - Passed: " + allPassed);
  
  if (allPassed) {
    Logger.log("🎉 ALL TESTS PASSED - Backend is ready for use!");
  } else {
    Logger.log("⚠️ Some tests failed - Check logs above for details");
  }
  
  return {
    allPassed,
    results: {
      connectionTest,
      auditTest,
      userTest
    }
  };
}