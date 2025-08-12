import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Individual error states
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [apiError, setApiError] = useState(""); // For general API errors
  const [successMessage, setSuccessMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const { signup } = useAuth(); // Use the signup function from AuthContext
  const navigate = useNavigate();

  // Validation functions for individual fields
  const validateName = (value) => {
    if (!value) {
      setNameError("Name is required.");
      return false;
    }
    setNameError("");
    return true;
  };

  const validateEmail = (value) => {
    if (!value) {
      setEmailError("Email is required.");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      setEmailError("Email is invalid.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePhone = (value) => {
    if (!value) {
      setPhoneError("Phone number is required.");
      return false;
    } else if (!/^\d{10}$/.test(value)) {
      setPhoneError("Phone number must be 10 digits.");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const validatePassword = (value) => {
    if (!value) {
      setPasswordError("Password is required.");
      return false;
    } else if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validateConfirmPassword = (value) => {
    if (!value) {
      setConfirmPasswordError("Confirm password is required.");
      return false;
    } else if (password !== value) {
      setConfirmPasswordError("Passwords do not match.");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(""); // Clear API error on new submission attempt

    // Validate all fields on submit
    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPhoneValid = validatePhone(phone);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);

    if (!isNameValid || !isEmailValid || !isPhoneValid || !isPasswordValid || !isConfirmPasswordValid) {
      return; // Stop submission if any validation fails
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/auth/signup", {
        Name: name,
        Email: email,
        phone_no: phone,
        password,
      });
      console.log("Signup successful, API response:", response.data);
      console.log("response.data.user:", response.data.user);
      // Check if response.data.message exists before passing
      if (response.data && response.data.message) {
        setUser(null);
        setIsAdmin(false);
        setSuccessMessage("Signup successful!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        console.error("Signup: API response did not contain user data:", response.data);
      }
    } catch (err) {
      console.error("Signup error:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setApiError(err.response.data.message);
      } else {
        setApiError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundImage: `url("/download.jpeg")`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-900 tracking-wide">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {apiError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{apiError}</span>
            </div>
          )}
          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{successMessage}</span>
            </div>
          )}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                validateName(e.target.value); // Validate on change
              }}
              className={`mt-2 p-3 w-full border ${nameError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition`}
              placeholder="Your full name"
            />
            {nameError && <p className="text-red-500 text-xs mt-1">{nameError}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                validatePhone(e.target.value); // Validate on change
              }}
              className={`mt-2 p-3 w-full border ${phoneError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition`}
              placeholder="Your phone number"
            />
            {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value); // Validate on change
              }}
              className={`mt-2 p-3 w-full border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition`}
              placeholder="you@example.com"
            />
            {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value); // Validate on change
                validateConfirmPassword(confirmPassword); // Re-validate confirm password
              }}
              className={`mt-2 p-3 w-full border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition`}
              placeholder="********"
            />
            {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                validateConfirmPassword(e.target.value); // Validate on change
              }}
              className={`mt-2 p-3 w-full border ${confirmPasswordError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition`}
              placeholder="********"
            />
            {confirmPasswordError && <p className="text-red-500 text-xs mt-1">{confirmPasswordError}</p>}
          </div>
          <button
            type="submit"
            className={`w-full royal-blue-button text-white py-3 rounded-lg font-semibold transition-shadow shadow-md ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
