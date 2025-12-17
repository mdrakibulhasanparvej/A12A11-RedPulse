import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DonationTable from "./DonationTable";

const RecentDonationRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data = [], isLoading } = useQuery({
    queryKey: ["recent-donations", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donation-requests?email=${user.email}&limit=3`
      );
      return res.data;
    },
  });

  const donations = Array.isArray(data.requests) ? data.requests : [];

  if (isLoading) return null;
  if (data.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-900 my-6 p-6 rounded-2xl border dark:border-gray-800">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Recent Donation Requests
      </h2>

      <DonationTable donations={donations} />

      <div className="mt-4 text-right">
        <Link
          to="/dashboard/my-donation-requests"
          className="btn btn-sm btn-outline"
        >
          View My All Requests
        </Link>
      </div>
    </div>
  );
};

export default RecentDonationRequests;
