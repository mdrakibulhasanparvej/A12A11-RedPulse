import { Link } from "react-router";
import DonationTable from "./DonationTable";

const RecentDonationRequests = ({ donations }) => {
  return (
    <div className="bg-white dark:bg-gray-800 my-6 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
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
