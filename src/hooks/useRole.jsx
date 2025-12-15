import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useRole = () => {
  const { user } = useAuth();
  const axiosURL = useAxios();
  const { data: role = null, isLoading: roleLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      const res = await axiosURL.get(`/users/${user?.email}`);
      return res.data?.role;
    },
  });
  return { role, roleLoading };
};

export default useRole;
