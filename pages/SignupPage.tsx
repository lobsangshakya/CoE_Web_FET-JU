import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    
    // In a real app, you would handle user creation here.
    console.log("New user signup:", { name, email });
    navigate('/login'); // Redirect to login after successful signup
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
                <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">Create your account</h1>
                <form className="space-y-4" onSubmit={handleSignup}>
                    <div>
                        <label htmlFor="name" className="sr-only">Full Name</label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Full Name"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-accent focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label htmlFor="email-signup" className="sr-only">Email address</label>
                        <input
                          id="email-signup"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email address"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-accent focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label htmlFor="password-signup" className="sr-only">Password</label>
                        <input
                          id="password-signup"
                          name="password"
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-accent focus:border-transparent"
                        />
                    </div>
                     <div>
                        <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                        <input
                          id="confirm-password"
                          name="confirmPassword"
                          type="password"
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm Password"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-accent focus:border-transparent"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    
                    <div>
                        <button
                          type="submit"
                          className="w-full py-3 mt-2 rounded-lg bg-orange-accent text-white font-bold transition-opacity hover:opacity-90"
                        >
                          Create Account
                        </button>
                    </div>
                </form>
                
                 <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                      Already have an account?{' '}
                      <NavLink to="/login" className="font-semibold text-orange-accent hover:underline">
                        Sign in
                      </NavLink>
                    </p>
                </div>
            </main>
        </div>
    </div>
  );
};

export default SignupPage;