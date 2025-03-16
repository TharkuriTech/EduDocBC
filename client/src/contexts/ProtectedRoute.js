import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./EthContext/AuthContext";

const ProtectedRoute = ({ children }) => {
  debugger
  const { user } = useAuth();

  // if (!user) {
  //   return children;// <Navigate to="/login" replace />;
  // }

  return children;
};

export default ProtectedRoute;
