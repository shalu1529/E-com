import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext'; // Import useWishlist from WishlistContext


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { setWishlist } = useWishlist(); // Correctly destructure setWishlist


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Include cookies
      });

      const data = await response.json();
      console.log("Login API Response:", data); // Debug response

      if (data.success) {
        // Save token and wishlist
        localStorage.setItem('authToken', data.token);
        if (Array.isArray(data.wishlist)) {
          localStorage.setItem('wishlist', JSON.stringify(data.wishlist));



          setWishlist(data.wishlist);  // Make sure this function is available from context
          console.log("Wishlist saved:", data.wishlist); // Debug wishlist
        }

        // Redirect to the home page
        navigate('/');
      } else {
        setError(data.message); // Show error from backend
      }
    } catch (error) {
      console.error("Login error:", error);
      setError('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4 sm:px-8">
    <h1 className="text-white text-2xl sm:text-3xl font-bold mb-6 text-center">
      Login to your account
    </h1>
    {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
    <form className="w-full max-w-xs sm:max-w-sm" onSubmit={handleLogin}>
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
        Login
      </button>
      <p className="mt-4 text-center text-white text-sm">
        Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
      </p>
    </form>
  </div>
  
  );
}

export default Login;
