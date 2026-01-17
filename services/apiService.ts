
/**
 * PHASE 4: FRONTEND INTEGRATION & API CLIENT
 * Manages secure communication with the Apps Script backend.
 */

// Deployment URL from Apps Script
// This should be replaced with your actual deployed Apps Script URL
const APPS_SCRIPT_URL = process.env.VITE_APPS_SCRIPT_URL || "YOUR_DEPLOYED_WEB_APP_URL";

export interface ApiResponse<T = any> {
  success: boolean;
  code: number;
  error?: string;
  message?: string;
  payload?: T;
  [key: string]: any;
}

/**
 * Securely calls the Apps Script backend.
 * In production with Apps Script, 'no-cors' prevents reading the body.
 * To read responses, Apps Script must be called via a proxy or using 
 * the 'follow' redirect method with proper CORS headers on the GS side.
 */
export const secureFetch = async <T = any>(
  action: string, 
  payload: any, 
  token: string
): Promise<ApiResponse<T>> => {
  try {
    // Generate a unique Request ID for replay protection (Phase 3 requirement)
    const requestId = `REQ-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Changed to JSON content type
      },
      body: JSON.stringify({
        action,
        token,
        requestId,
        payload
      })
    });

    // Google Apps Script sometimes redirects, so we need to handle the response properly
    let responseText;
    try {
      // Get the redirected URL content
      responseText = await response.text();
      console.log('Raw response from Apps Script:', responseText);
    } catch (textError) {
      console.error('Error getting response text:', textError);
      throw new Error('Unable to read response from server');
    }

    // Parse the response text
    let result: ApiResponse<T>;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Error parsing JSON response:', parseError);
      console.log('Response text was:', responseText);
      throw new Error('Invalid JSON response from server');
    }

    if (!result.success) {
      throw new Error(result.error || `Server returned error ${result.code}`);
    }

    return result;
  } catch (error: any) {
    console.error(`API Error [${action}]:`, error);
    return {
      success: false,
      code: error.status || 500,
      error: error.message || "Network request failed"
    };
  }
};
