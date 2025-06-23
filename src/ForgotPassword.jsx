import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";

  const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Here you would normally send reset password data to backend
    // For demo, we assume reset password is successful
    setMessage("Password reset successful!");
    navigate("/code-verification");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 px-4">
        <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl">
          <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-900 tracking-wide">
            Forgot Password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
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
                placeholder="you@example.com"
              />
            </div>

            {/* Message */}
            {message && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md">
                {message}
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              className="w-full royal-blue-button text-white py-3 rounded-lg font-semibold shadow-md transition duration-300"
            >
              Send Code
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
