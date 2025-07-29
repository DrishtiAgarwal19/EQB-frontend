import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:3000/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Password reset code sent successfully!");
        navigate("/code-verification");
      } else {
        setError(data.message || "Failed to send password reset code.");
      }
    } catch (error) {
      console.error("Error sending password reset request:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
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
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">
                {error}
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
