import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useaxiosPublic from "./useAxiosPublic";

const useRole = () => {
  const { user } = useAuth();
  const axiosPublic = useaxiosPublic();
  const { data: role = null, isLoading: roleLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${user?.email}`);
      return res.data?.role || "employee";
    },
  });

  return { role, roleLoading };
};

export default useRole;
