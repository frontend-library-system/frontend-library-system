


import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext.jsx";

const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();

  if (!user || user.role !== 'admin') {
    // Redirect to login page if not authenticated or not an admin
    return <Navigate to="/signin" />;
  }

  return element;
};

export default ProtectedRoute;
