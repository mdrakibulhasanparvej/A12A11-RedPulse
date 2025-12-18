import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const MyDonationRequest = ({ limit = 10 }) => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["my-donation-requests", user?.email, limit],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donation-request-all?email=${user.email}&limit=${limit}`
      );
      return res.data;
    },
    onError: () => {
      toast.error("Failed to load donation requests");
    },
  });

  // console.log(data);
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
      <h2 className="text-2xl font-semibold mb-6">
        My Recent Donation Requests
      </h2>
      <div className="overflow-x-auto min-h-70vh md:w-[880px] lg:w-[1000px] p-6 bg-white rounded-2xl shadow">
        <table className="table table-xs table-pin-rows table-pin-cols table-zebra">
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
                <td className="whitespace-nowrap text-sm text-gray-700 font-bold space-x-2">
                  {request.recipientName}
                </td>

                <td className="whitespace-nowrap space-x-2 text-xs">
                  <div> {request.recipientDistrict}</div>
                  <div> {request.recipientUpazila}</div>
                </td>

                <td className="whitespace-nowrap space-x-2 text-sm">
                  {request.hospitalName}
                </td>
                <td className="whitespace-nowrap space-x-2 text-sm">
                  {request.bloodGroup}
                </td>
                <td className="whitespace-nowrap space-x-2 text-sm">
                  {request.donationDate}
                </td>
                <td className="whitespace-nowrap space-x-2 text-sm">
                  {request.donationTime}
                </td>

                <td className="whitespace-nowrap space-x-2 text-sm">
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
                <th className="whitespace-nowrap space-x-2 text-sm">
                  <button className="btn btn-ghost btn-xs">Details</button>
                </th>
              </tr>
            ))}
          </tbody>

          {/* <tfoot>
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
          </tfoot> */}
        </table>
      </div>
    </>
  );
};

export default MyDonationRequest;
