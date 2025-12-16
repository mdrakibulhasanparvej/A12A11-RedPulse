import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUser = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email, // only run if user is logged in
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  return { userData: data, isLoading, error, refetch };
};

export default useUser;
