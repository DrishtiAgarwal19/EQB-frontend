import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";


const CodeVerification = () => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Here you would normally send code verification data to backend
    // For demo, we assume code verification is successful
    // TODO: Add backend integration for code verification
    setMessage("Code verification successful!");
    navigate("/new-password");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 px-4">
        <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl">
          <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-900 tracking-wide">
            Code Verification
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Code */}
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                Code
              </label>
              <input
                id="code"
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="123456"
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
              Verify Code
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CodeVerification;
