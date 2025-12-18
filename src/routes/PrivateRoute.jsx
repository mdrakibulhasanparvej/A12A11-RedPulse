import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import LoadingSpinner from "../components/ui/Loading/LoadingSpinner";

// skeleton loader fallback if no custom skeleton is provided

const PrivateRoute = ({ children, skeleton }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // show skeleton while loading
  if (loading) return skeleton || <LoadingSpinner />;

  // render page if authenticated
  if (user) return children;

  // redirect to login if not authenticated
  return <Navigate to="/login" state={location.pathname} replace />;
};

export default PrivateRoute;
