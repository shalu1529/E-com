import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
  
    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }
  
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:4000/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: username, email, password }),
      });
  
      const data = await response.json();
      if (data.success) {
        navigate('/login');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Something went wrong');
    }
  };
  
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  };
  
  const validatePassword = (password) => {
    return password.length >= 8;
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4 sm:px-8">
    <h1 className="text-white text-2xl sm:text-3xl font-bold mb-6 text-center">
      Sign up to start listening
    </h1>
    {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
    <form className="w-full max-w-xs sm:max-w-sm" onSubmit={handleSignUp}>
      <div className="mb-4">
        <label className="block text-white mb-2" htmlFor="username">Username</label>
        <input
          className="w-full bg-gray-800 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          id="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2" htmlFor="email">Email address</label>
        <input
          className="w-full bg-gray-800 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          id="email"
          placeholder="name@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-white mb-2" htmlFor="password">Password</label>
        <input
          className="w-full bg-gray-800 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded font-bold hover:opacity-90"
      >
        Sign Up
      </button>
      <p className="mt-4 text-center text-white text-sm">
        Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
      </p>
    </form>
  </div>
  
  );
}

export default SignUp;
