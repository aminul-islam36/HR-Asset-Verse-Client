import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router";
import useRole from "../hooks/useRole";
import Loading from "../Components/Loading";

const AdminRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  const { role, roleLoading } = useRole();

  if (!user) return <Navigate to="/login" />;
  if (isLoading || roleLoading) return <Loading />;

  if (role !== "Hr") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
