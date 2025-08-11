import React, { useState } from "react";
import { useAuth } from "./AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [identifier, setIdentifier] = useState(""); // Can be email or phone number
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser, setIsAdmin, login } = useAuth(); // Added 'login' from useAuth
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!identifier || !password) {
      setError("Please enter both email/phone number and password");
      return;
    }

    setLoading(true);
    try {
      console.log("Login: Sending request with identifier:", identifier, "and password:", password);
      const response = await axios.post("http://localhost:3000/auth/login", {
        identifier,
        password,
      });
      console.log("Login successful, API response:", response.data);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        // Assuming the API response for login directly contains user data or we fetch it immediately
        // and then pass it to the login function from AuthContext
        const token = response.data.token;
        try {
          const userResponse = await axios.get("http://localhost:3000/user/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("User data fetch successful:", userResponse.data);
          console.log("User object from API:", userResponse.data.user); // Add this line for debugging
          login(userResponse.data.user); // Use the login function from AuthContext
          navigate("/"); // Navigate to home page after successful login and context update
        } catch (userErr) {
          console.error("Error fetching user data:", userErr);
          setError("Login successful, but failed to fetch user data.");
          // Even if user data fetch fails, we might still want to navigate to home
          // or handle this case specifically (e.g., redirect to a generic dashboard)
          navigate("/");
        }
      }
    } catch (err) {
      console.error("Login error:", err);
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
    <>
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundImage: `url("/download.jpeg")`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl">
            <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-900 tracking-wide">
              Login
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email  */}
              <div>
                <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 mb-1">
                  Email/Phone Number 
                </label>
                <input
                  id="identifier"
                  type="text" // Changed to text as it can be email or phone
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
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
                className={`w-full text-white py-3 rounded-lg font-semibold shadow-md transition duration-300 royal-blue-button ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Logging In..." : "Login"}
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
