import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext.jsx";
import { Link } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
  const { user, setUser } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFullName(user.name || "");
      setEmail(user.email || "");
      setPhoneNumber(user.phone_number || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("Authentication token not found. Please log in again.");
        setLoading(false);
        return;
      }

      const response = await axios.put(
        "http://localhost:3000/auth/user/profile",
        {
          name: fullName,
          email: email,
          phone_number: phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(response.data.message || "Profile updated successfully!");
      // Update user context with new data
      setUser(prevUser => ({
        ...prevUser,
        name: fullName,
        email: email,
        phone_number: phoneNumber,
      }));
    } catch (err) {
      console.error("Error updating profile:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-10">
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-900">
          Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-lg font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              placeholder="Your Full Name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              placeholder="your@example.com"
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-lg font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              placeholder="e.g., +1234567890"
            />
          </div>

          <div className="text-left">
            <Link to="/forgot-password" className="text-blue-600 font-semibold hover:underline text-lg">
              Reset Password
            </Link>
          </div>

          {message && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md text-lg">
              {message}
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md text-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md transition duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-lg ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Saving..." : "Change Information"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
