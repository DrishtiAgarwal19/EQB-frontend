import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // User is not authenticated, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
