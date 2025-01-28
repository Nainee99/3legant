import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, role }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // If role does not match, redirect to login or home
  if (user && user.role !== role) {
    return (
      <Navigate to={role === "admin" ? "/admin/dashboard" : "/"} replace />
    );
  }

  // Render children if authenticated and role matches
  return children;
};

export default ProtectedRoute;
