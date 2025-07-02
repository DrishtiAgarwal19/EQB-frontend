import React, { useState } from "react";
import { useAuth } from "./AuthContext.jsx";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth(); // Removed loading as it's not used for fake login

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    // Simulate a successful login
    const userData = { email: email, name: "Test User" }; // Example user data
    login(userData); // This will handle setting user, storing in localStorage, and navigation to /dashboard
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundImage: `url("/download.jpeg")`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl">
            <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-900 tracking-wide">
              Login
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email  */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com or phone number"
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="********"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">
                  {error}
                </div>
              )}

              {/*  Button */}
              <button
                type="submit"
                className={`w-full text-white py-3 rounded-lg font-semibold shadow-md transition duration-300 royal-blue-button`}
              >
                Login
              </button>
              <p className="mt-6 text-center text-gray-700">
                <Link to="/forgot-password" className="text-blue-600 font-semibold hover:underline">
                  Forgot Password? 
                </Link>
              </p>
              <p className="mt-6 text-center text-gray-700">
                New user?{" "}
                <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
                  Signup
                </Link>
              </p>
            </form>
          </div>
        </div>
    </>
  );
};

export default Login;
