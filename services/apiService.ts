
/**
 * PHASE 4: FRONTEND INTEGRATION & API CLIENT
 * Manages secure communication with the Apps Script backend.
 */

// Deployment URL from Apps Script
const APPS_SCRIPT_URL = "YOUR_DEPLOYED_WEB_APP_URL";

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
        "Content-Type": "text/plain;charset=utf-8", // Avoid pre-flight CORS issues with GAS
      },
      body: JSON.stringify({
        action,
        token,
        requestId,
        payload
      })
    });

    // Handle Google Apps Script's specific redirect behavior if not using 'no-cors'
    // Note: If using 'no-cors', the response is opaque and we can't see 'success'.
    // For this implementation, we assume a CORS-enabled or Proxied environment.
    const result: ApiResponse<T> = await response.json();

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
