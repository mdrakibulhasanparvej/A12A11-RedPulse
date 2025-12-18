import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const AllBloodDonationRequest = ({ limit = 3 }) => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["my-donation-requests", user?.email, limit],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-request-all?limit=${limit}`);
      return res.data;
    },
    onError: () => {
      toast.error("Failed to load donation requests");
    },
  });

  console.log(data);
  // Ensure requests is always an array
  const requests = Array.isArray(data?.requests) ? data.requests : [];

  if (loading || isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <p className="text-center text-gray-500">
          Loading your donation requests...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center text-red-500">
        Something went wrong while loading data.
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center">
        <h2 className="text-xl font-semibold">No Donation Request Found</h2>
        <p className="text-gray-500 mt-2">
          You have not created any donation request yet.
        </p>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
        All Recent Donation Requests
      </h2>
      <div className="overflow-x-auto min-h-70vh w-[930px] p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-colors">
        <table className="table table-zebra table-pin-rows table-pin-cols w-full text-gray-900 dark:text-gray-100">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
              <th>Recipient</th>
              <th>Address</th>
              <th>Hospital</th>
              <th>Blood</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((request) => (
              <tr
                key={request._id}
                className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">{request.recipientName}</div>
                    </div>
                  </div>
                </td>

                <td className="text-sm">
                  <div>{request.recipientDistrict}</div>
                  <div>{request.recipientUpazila}</div>
                </td>

                <td>{request.hospitalName}</td>
                <td>{request.bloodGroup}</td>
                <td>{request.donationDate}</td>
                <td>{request.donationTime}</td>

                <td>
                  <span
                    className={`badge ${
                      request.status === "pending"
                        ? "badge-warning"
                        : request.status === "inprogress"
                          ? "badge-info"
                          : "badge-success"
                    }`}
                  >
                    {request.status}
                  </span>
                </td>

                <td className="max-w-xs truncate">{request.requestMessage}</td>

                {/* Actions */}
                <th className="flex flex-col items-center justify-center space-y-1">
                  <button className="btn w-full btn-info text-white btn-xs">
                    View
                  </button>

                  <button className="btn w-full btn-warning text-white btn-xs">
                    Update
                  </button>

                  <button className="btn w-full btn-error text-white btn-xs">
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
              <th>Recipient</th>
              <th>Address</th>
              <th>Hospital</th>
              <th>Blood</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default AllBloodDonationRequest;
