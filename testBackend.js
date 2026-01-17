/**
 * Test script to verify backend connectivity
 * This can be run in the browser to test the connection to the Apps Script backend
 */

async function testBackendConnection() {
  console.log('Testing backend connection...');
  
  // Replace with your actual deployed Apps Script URL
  const APPS_SCRIPT_URL = 'YOUR_DEPLOYED_WEB_APP_URL';
  
  if (APPS_SCRIPT_URL === 'YOUR_DEPLOYED_WEB_APP_URL') {
    console.error('❌ Please update APPS_SCRIPT_URL with your actual deployed Apps Script URL');
    return;
  }

  // You'll need a valid Firebase ID token for this test
  // For testing purposes, you can temporarily use a dummy token to test the connection flow
  const dummyToken = 'dummy_token_for_connection_test';

  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'testConnection',
        token: dummyToken,
        requestId: `TEST-${Date.now()}`,
        payload: {}
      })
    });

    console.log('Response status:', response.status);
    
    const responseText = await response.text();
    console.log('Raw response:', responseText);

    // Even if authentication fails, we should get a response from the server
    if (responseText) {
      console.log('✅ Backend is responding');
      
      try {
        const jsonData = JSON.parse(responseText);
        console.log('Parsed response:', jsonData);
        
        if (jsonData.error && jsonData.error.includes('Authentication failed')) {
          console.log('ℹ️  Backend responded with authentication error (expected with dummy token)');
          console.log('✅ Backend is properly rejecting invalid tokens');
        }
      } catch (parseError) {
        console.log('⚠️  Response is not valid JSON, but server is responding');
      }
    } else {
      console.log('❌ Backend is not responding');
    }
  } catch (error) {
    console.error('❌ Error connecting to backend:', error);
  }
}

// Also create a function to test with a real token when available
async function testWithRealToken(firebaseToken) {
  console.log('Testing with real Firebase token...');
  
  // Replace with your actual deployed Apps Script URL
  const APPS_SCRIPT_URL = 'YOUR_DEPLOYED_WEB_APP_URL';
  
  if (APPS_SCRIPT_URL === 'YOUR_DEPLOYED_WEB_APP_URL') {
    console.error('❌ Please update APPS_SCRIPT_URL with your actual deployed Apps Script URL');
    return;
  }

  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'testConnection',
        token: firebaseToken,
        requestId: `REAL-TOKEN-TEST-${Date.now()}`,
        payload: {}
      })
    });

    console.log('Response status:', response.status);
    
    const responseText = await response.text();
    console.log('Raw response:', responseText);

    try {
      const jsonData = JSON.parse(responseText);
      console.log('Parsed response:', jsonData);
      
      if (jsonData.success) {
        console.log('✅ Successfully connected to backend with real token!');
        return jsonData;
      } else {
        console.log('❌ Backend returned error:', jsonData.error);
        return jsonData;
      }
    } catch (parseError) {
      console.error('❌ Could not parse response as JSON:', parseError);
      console.log('Raw response was:', responseText);
    }
  } catch (error) {
    console.error('❌ Error connecting to backend:', error);
  }
}

// Export functions for use in browser
if (typeof window !== 'undefined') {
  window.testBackendConnection = testBackendConnection;
  window.testWithRealToken = testWithRealToken;
}

console.log('Backend test functions loaded. Use testBackendConnection() to test the connection.');