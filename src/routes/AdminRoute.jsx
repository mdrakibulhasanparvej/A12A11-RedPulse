import React from "react";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/ui/Loading/LoadingSpinner";
import useUser from "../hooks/useUser";
import Forbidden from "../pages/ErrorPages/Forbidden";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { userData: dbUser, isLoading } = useUser();

  if (loading || isLoading) {
    return <LoadingSpinner />;
  }

  // Proper admin check
  if (dbUser?.role !== "admin") {
    return <Forbidden />;
  }

  return children;
};

export default AdminRoute;
