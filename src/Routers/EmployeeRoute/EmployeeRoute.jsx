import useAuth from "../../hooks/useAuth";
import { Navigate } from "react-router";
import useRole from "../../hooks/useRole";
import PageLoader from "../../Components/PageLoader";

const EmployeeRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  const { role, roleLoading } = useRole();

  if (isLoading || roleLoading) {
    return <PageLoader />;
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
