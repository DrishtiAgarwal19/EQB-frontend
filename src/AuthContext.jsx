import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // On initial load, check localStorage for user data
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser && storedUser !== 'undefined') {
        const parsedUser = JSON.parse(storedUser);
        // Ensure consistent user object structure for frontend
        const processedUser = {
          ...parsedUser,
          name: parsedUser.Name || parsedUser.name, // Prefer 'Name' from backend, fallback to 'name'
        };
        setUser(processedUser);
        const userIsAdmin = !!(processedUser && processedUser.admin_id);
        setIsAdmin(userIsAdmin);
        console.log('AuthContext: Loaded user from localStorage:', processedUser, 'isAdmin:', userIsAdmin);
      } else {
        console.log('AuthContext: No user found in localStorage or it was "undefined".');
      }
    } catch (error) {
      console.error("AuthContext: Failed to parse user from localStorage:", error);
      localStorage.removeItem('user'); // Clear invalid data
      setUser(null);
      setIsAdmin(false);
    }
  }, []); // Empty dependency array means this runs once on mount

  const login = (userData) => {
    console.log('AuthContext: Attempting login with userData:', userData);
    if (!userData) {
      console.error("AuthContext: login called with undefined or null userData.");
      return; // Prevent further errors
    }
    // Ensure consistent user object structure for frontend
    const processedUser = {
      ...userData,
      name: userData.Name || userData.name, // Prefer 'Name' from backend, fallback to 'name'
    };
    localStorage.setItem('user', JSON.stringify(processedUser));
    setUser(processedUser);
    const userIsAdmin = !!(processedUser && processedUser.admin_id); // Check if the logged-in user is an admin
    setIsAdmin(userIsAdmin);
    console.log('AuthContext: User logged in, state updated. isAdmin:', userIsAdmin, 'user:', processedUser);
  };

  const signup = (userData) => {
    console.log('AuthContext: Attempting signup with userData:', userData);
    if (!userData) {
      console.error("AuthContext: signup called with undefined or null userData.");
      return; // Prevent further errors
    }
    // Ensure consistent user object structure for frontend
    const processedUser = {
      ...userData,
      name: userData.Name || userData.name, // Prefer 'Name' from backend, fallback to 'name'
    };
    localStorage.setItem('user', JSON.stringify(processedUser));
    setUser(processedUser);
    const userIsAdmin = !!(processedUser && processedUser.admin_id); // Check if the signed-up user is an admin
    setIsAdmin(userIsAdmin);
    console.log('AuthContext: User signed up, state updated. isAdmin:', userIsAdmin, 'user:', processedUser);
    navigate('/'); // Always navigate to home page after signup
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, signup, logout, setUser, setIsAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
