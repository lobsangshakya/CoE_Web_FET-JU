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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (login(email.toLowerCase())) {
      navigate('/');
    } else {
      setError('Invalid credentials. Please try again.');
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
                        onClick={() => handleQuickLogin('student@jain.com')}
                        className="w-full py-2.5 px-4 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                    >
                        Login as Student
                    </button>
                    <button
                        type="button"
                        onClick={() => handleQuickLogin('faculty@jain.com')}
                        className="w-full py-2.5 px-4 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                    >
                        Login as Faculty
                    </button>
                    <button
                        type="button"
                        onClick={() => handleQuickLogin('admin@jain.com')}
                        className="w-full py-2.5 px-4 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                    >
                        Login as Admin
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