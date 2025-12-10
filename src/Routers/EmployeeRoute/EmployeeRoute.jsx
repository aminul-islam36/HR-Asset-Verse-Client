import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { Navigate } from "react-router";

const EmployeeRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const axiosURL = useAxios();

  const { data: userInfo, isLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      const res = await axiosURL.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  if (loading) {
    return <p>Loading...</p>;
  }
  if (isLoading) {
    return <p>Checking permission...</p>;
  }

  if (!user) {
    return <Navigate to="/auth/login" />;
  }
  if (userInfo.role !== "employee") {
    return <Navigate to="/" />;
  }
  return children;
};

export default EmployeeRoute;
