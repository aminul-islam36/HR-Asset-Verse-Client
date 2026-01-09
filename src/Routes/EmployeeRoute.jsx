import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router";
import useRole from "../hooks/useRole";
import Loading from "../Components/Loading";

const EmployeeRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  const { role, roleLoading } = useRole();

  if (isLoading || roleLoading) {
    return <Loading />;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role !== "employee") {
    return <Navigate to="/" />;
  }

  return children;
};

export default EmployeeRoute;
