import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { GoogleIcon } from '../components/icons';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate credentials before proceeding
    const validCredentials = {
      email: 'dummyfirebase12@gmail.com',
      password: 'Admin@123'
    };
    
    if (email !== validCredentials.email || password !== validCredentials.password) {
      setError('Invalid credentials. Please use:\nEmail: dummyfirebase12@gmail.com\nPassword: Admin@123');
      return;
    }
    
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
      
      // Authenticate with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      
      // If Firebase auth succeeds, proceed with app login
      if (login(email.toLowerCase())) {
        navigate('/');
      } else {
        setError('Authentication successful but user not found in system.');
      }
      
    } catch (error: any) {
      console.error('Firebase authentication error:', error);
      setError(`Authentication failed: ${error.message}`);
    }
  };

  const handleQuickLogin = (quickLoginEmail: string) => {
    setError('');
    if (login(quickLoginEmail)) {
        navigate('/');
    } else {
        setError(`Could not log in as ${quickLoginEmail}. User not found.`);
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md">
            <header className="text-center mb-2">
                <img 
                  src="https://i.postimg.cc/rs8nTBx4/logo-jain-white.png"
                  alt="Jain University Logo" 
                  className="h-[20rem] w-auto mx-auto" 
                />
            </header>

            <main className="bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">Sign in to your account</h1>
                <form className="space-y-4" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email" className="sr-only">Email address</label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email address"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-accent focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-accent focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    
                    <div>
                        <button
                          type="submit"
                          className="w-full py-3 mt-2 rounded-lg bg-orange-accent text-white font-bold transition-opacity hover:opacity-90"
                        >
                          Sign In
                        </button>
                    </div>
                </form>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                </div>

                <div>
                    <button className="w-full flex items-center justify-center gap-3 py-2.5 bg-white text-gray-700 font-semibold border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <GoogleIcon className="h-5 w-5" />
                        Sign in with Google
                    </button>
                </div>

                {/* --- Quick Login Links --- */}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Quick login (Demo)</span>
                    </div>
                </div>
                
                <div className="space-y-3">
                    <button
                        type="button"
                        onClick={() => {
                            setEmail('student@jain.com');
                            setPassword('student123');
                        }}
                        className="w-full py-2.5 px-4 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                    >
                        Log in as Student
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setEmail('faculty@jain.com');
                            setPassword('faculty123');
                        }}
                        className="w-full py-2.5 px-4 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                    >
                        Log in as Faculty
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setEmail('dummyfirebase12@gmail.com');
                            setPassword('Admin@123');
                        }}
                        className="w-full py-2.5 px-4 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                    >
                        Log in as Admin
                    </button>
                </div>
                 <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                      Don't have an account?{' '}
                      <NavLink to="/signup" className="font-semibold text-orange-accent hover:underline">
                        Sign up
                      </NavLink>
                    </p>
                </div>
            </main>
        </div>
    </div>
  );
};

export default LoginPage;