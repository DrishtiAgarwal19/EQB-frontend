import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // On initial load, check localStorage for user data
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser && storedUser !== 'undefined') {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      localStorage.removeItem('user'); // Clear invalid data
    }
  }, []); // Empty dependency array means this runs once on mount

  const login = (userData) => {
    // Simulate successful login by storing user data
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    navigate('/dashboard'); // Navigate to dashboard after login
  };

  const signup = (userData) => {
    // Simulate successful signup by storing user data
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    navigate('/dashboard'); // Navigate to dashboard after signup
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/'); // Navigate to home page after logout
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
