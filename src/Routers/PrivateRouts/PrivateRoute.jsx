import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import Loading from "../../Components/Loading";
import useRole from "../../hooks/useRole";
import PageLoader from "../../Components/PageLoader";

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const { roleLoading } = useRole();
  if (isLoading || roleLoading) {
    return <PageLoader />;
  }
  if (!user) return <Navigate state={location.pathname} to="/login"></Navigate>;

  return children;
};

export default PrivateRoute;
