import React, { useState } from 'react';

const FirebaseLoginTest: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [response, setResponse] = useState<string>('System ready. Enter credentials or use demo buttons.');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<'ready' | 'processing' | 'success' | 'error'>('ready');

  // Demo credentials
  const demoAccounts = {
    admin: {
      email: 'dummyfirebase12@gmail.com',
      password: 'Admin@123'
    }
  };

  const quickLogin = (role: keyof typeof demoAccounts) => {
    const account = demoAccounts[role];
    setEmail(account.email);
    setPassword(account.password);
    handleLogin(account.email, account.password);
  };

  const handleLogin = async (emailValue: string, passwordValue: string) => {
    // Validate credentials before proceeding
    const validCredentials = {
      email: 'dummyfirebase12@gmail.com',
      password: 'Admin@123'
    };
    
    if (emailValue !== validCredentials.email || passwordValue !== validCredentials.password) {
      setResponse(JSON.stringify({
        error: "❌ Invalid credentials",
        message: "Please use the correct email and password",
        expected: {
          email: validCredentials.email,
          password: "Admin@123"
        },
        provided: {
          email: emailValue,
          password: "***" + passwordValue.slice(-3) // Hide most of password
        },
        timestamp: new Date().toISOString()
      }, null, 2));
      setStatus('error');
      return;
    }
    
    setIsLoading(true);
    setStatus('processing');
    setResponse('✅ Credentials validated. Initiating authentication process...');

    try {
      // Import Firebase dynamically
      const { initializeApp } = await import('firebase/app');
      const { getAuth, signInWithEmailAndPassword } = await import('firebase/auth');

      // Firebase Configuration
      const firebaseConfig = {
        apiKey: "AIzaSyAeihSJVvJ1PvJCn89G1AR49ZzKbgAc8go",
        authDomain: "coe-fetju.firebaseapp.com",
        projectId: "coe-fetju",
        storageBucket: "coe-fetju.appspot.com",
        messagingSenderId: "346865125555",
        appId: "1:346865125555:web:b6dbe6ab297016934048c6"
      };

      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);

      setResponse('Connecting to Firebase authentication...');
      const userCredential = await signInWithEmailAndPassword(auth, emailValue, passwordValue);
      
      setResponse('✅ Authentication successful! Retrieving ID token...');
      const idToken = await userCredential.user.getIdToken();
      
      setResponse('🔐 ID token obtained. Connecting to backend server...');
      
      // Prepare request payload
      const payload = {
        action: "getProfile",
        token: idToken,
        requestId: "req_" + Date.now()
      };
      
      setResponse(JSON.stringify({
        message: "📡 Sending request to Apps Script backend...",
        endpoint: "[PROTECTED]",
        payload: {
          action: payload.action,
          requestId: payload.requestId,
          token_length: payload.token.length
        }
      }, null, 2));
      
      // Send to Apps Script backend
      const response = await fetch("https://script.google.com/macros/s/AKfycbwm27kxyZBB7o1iyV09tNNd5nxWnxIyjoMkuD2LLFAqQa6T7fYxcw2yFzblU4NfVJLY/exec", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      setResponse(JSON.stringify({
        message: "✅ SUCCESS: Response received from backend",
        timestamp: new Date().toISOString(),
        response: result
      }, null, 2));
      setStatus('success');
      
    } catch (error: any) {
      let errorMessage = "❌ Authentication failed";
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = "❌ User not found. Please check your email address.";
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = "❌ Invalid password. Please try again.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "❌ Invalid email format.";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "❌ Too many failed attempts. Please try again later.";
      } else if (error.message.includes('Failed to fetch')) {
        errorMessage = "❌ Network error. Please check your connection.";
      }
      
      setResponse(JSON.stringify({
        error: errorMessage,
        details: error.message,
        code: error.code || 'UNKNOWN',
        timestamp: new Date().toISOString()
      }, null, 2));
      setStatus('error');
      
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        padding: '40px',
        width: '100%',
        maxWidth: '450px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ fontSize: '42px', marginBottom: '10px' }}>🎓</div>
          <h1 style={{ color: '#0c4a6e', fontSize: '24px', fontWeight: '700', margin: '0 0 8px 0' }}>
            Jain University
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', margin: '0' }}>
            Center of Excellence Portal
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#334155', fontWeight: '500', fontSize: '14px' }}>
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@jainuniversity.ac.in"
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                border: '2px solid #e2e8f0',
                borderRadius: '10px',
                fontSize: '16px'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#334155', fontWeight: '500', fontSize: '14px' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                border: '2px solid #e2e8f0',
                borderRadius: '10px',
                fontSize: '16px'
              }}
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '16px',
              background: isLoading ? '#94a3b8' : '#0ea5e9',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            {isLoading ? (
              <>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderRadius: '50%',
                  borderTopColor: 'white',
                  animation: 'spin 1s linear infinite'
                }}></div>
                Authenticating
              </>
            ) : 'Sign In'}
          </button>
        </form>
        
        <div style={{
          textAlign: 'center',
          margin: '25px 0',
          position: 'relative',
          color: '#94a3b8',
          fontSize: '14px'
        }}>
          <span style={{ background: 'white', padding: '0 16px', position: 'relative', zIndex: '2' }}>
            Quick Login (Demo)
          </span>
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '25px 0'
        }}>
          <button
            type="button"
            onClick={() => quickLogin('admin')}
            style={{
              padding: '12px 24px',
              background: '#f0f9ff',
              border: '1px solid #bae6fd',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              textAlign: 'center'
            }}
          >
            🔐 Use Test Credentials
          </button>
        </div>
        
        <div style={{
          marginTop: '30px',
          background: '#f8fafc',
          borderRadius: '12px',
          padding: '20px',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <div style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: status === 'success' ? '#10b981' : status === 'error' ? '#ef4444' : '#94a3b8'
            }}></div>
            <h3 style={{ margin: '0', color: '#0c4a6e', fontSize: '18px' }}>
              System Status
            </h3>
          </div>
          <pre style={{
            background: '#0f172a',
            color: '#f1f5f9',
            padding: '16px',
            borderRadius: '8px',
            overflowX: 'auto',
            fontSize: '13px',
            lineHeight: '1.5',
            margin: '0',
            maxHeight: '300px',
            overflowY: 'auto'
          }}>
            {response}
          </pre>
        </div>
      </div>
      
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default FirebaseLoginTest;