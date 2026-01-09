import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Loading from "../Components/Loading";

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const { roleLoading } = useRole();
  if (isLoading || roleLoading) {
    return <Loading />;
  }
  if (!user) return <Navigate state={location.pathname} to="/login"></Navigate>;

  return children;
};

export default PrivateRoute;
