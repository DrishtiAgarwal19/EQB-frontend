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
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError("Authentication token not found. Please log in again.");
          return;
        }
        const response = await axios.get("http://localhost:3000/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const profileData = response.data;
        setFullName(profileData.Name || profileData.name || "");
        setEmail(profileData.Email || profileData.email || "");
        setPhoneNumber(profileData.phone_no || profileData.phone_number || "");
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to load user profile. Please try again.");
      }
    };

    fetchUserProfile();
  }, []); // Empty dependency array to run once on mount

  useEffect(() => {
    // This useEffect will now primarily handle updates if the user object in AuthContext changes
    // after the initial fetch, or if the user logs in/out.
    if (user) {
      setFullName(user.name || user.Name || "");
      setEmail(user.email || user.Email || "");
      setPhoneNumber(user.phone_number || user.phone_no || "");
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
        "http://localhost:3000L/user/profile",
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
        <h2 className="text-4xl font-extrabold mb-8 text-gray-900">
          Profile
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

          <div className="flex justify-between items-center">
            <Link to="/forgot-password" className="text-blue-600 font-semibold hover:underline text-lg">
              Reset Password
            </Link>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => {
                  // Reset form fields to initial fetched values
                  if (user) {
                    setFullName(user.name || user.Name || "");
                    setEmail(user.email || user.Email || "");
                    setPhoneNumber(user.phone_number || user.phone_no || "");
                  }
                  setMessage("");
                  setError("");
                }}
                className="px-6 py-3 rounded-lg font-semibold shadow-md transition duration-300 bg-gray-200 text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 text-lg"
              >
                Discard
              </button>
              <button
                type="submit"
                className={`px-6 py-3 rounded-lg font-semibold shadow-md transition duration-300 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-lg ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Saving..." : "Change"}
              </button>
            </div>
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

        </form>
      </div>
    </div>
  );
};

export default UserProfile;
