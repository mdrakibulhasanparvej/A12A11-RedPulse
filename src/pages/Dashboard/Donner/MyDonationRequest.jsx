import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const MyDonationRequest = ({ limit = 3 }) => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["my-donation-requests", user?.email, limit],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donation-requests?email=${user.email}&limit=${limit}`
      );
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
    <div className="overflow-x-auto max-w-6xl mx-auto p-6 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-semibold mb-6">
        My Recent Donation Requests
      </h2>

      <table className="table table-zebra">
        <thead>
          <tr>
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
            <tr key={request._id}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={
                          request.avatar ||
                          "https://img.daisyui.com/images/profile/demo/2@94.webp"
                        }
                        alt="avatar"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{request.recipientName}</div>
                    <div className="text-sm opacity-50">
                      {request.requesterEmail}
                    </div>
                  </div>
                </div>
              </td>

              <td className="text-sm">
                <div>Div: {request.recipientDivision}</div>
                <div>Dist: {request.recipientDistrict}</div>
                <div>Upo: {request.recipientUpazila}</div>
                <div>Uni: {request.recipientUnion}</div>
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
              <td>
                <button className="btn btn-ghost btn-xs">Details</button>
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
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
  );
};

export default MyDonationRequest;
