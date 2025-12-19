import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import usePagination from "../../../hooks/usePagination";

const MyDonationRequest = ({ limit = 10 }) => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  // ==================== Fetch Donation Requests ====================
  const { data, isLoading, isError } = useQuery({
    queryKey: ["my-donation-requests", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donation-request-all?email=${user.email}&limit=${limit}&skip=${skip}`
      );
      return res.data;
    },
    onError: () => {
      toast.error("Failed to load donation requests");
    },
  });

  // ==================== Prepare data & pagination ====================
  const requests = Array.isArray(data?.requests) ? data.requests : [];
  const totalRequests = data?.totalRequests || 0;

  const {
    currentPage,
    totalPages,
    goToNextPage,
    goToPrevPage,
    goToPage,
    skip,
  } = usePagination({
    totalItems: totalRequests,
    itemsPerPage: limit,
  });

  // ==================== Loading / Error States ====================
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

  // ==================== Render ====================
  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">
        My Recent Donation Requests
      </h2>

      <div className="overflow-x-auto min-h-70vh md:w-[880px] lg:w-[1000px] p-6 bg-white dark:bg-gray-800 rounded-2xl shadow">
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
                <td className="whitespace-nowrap text-sm font-bold">
                  {request.recipientName}
                </td>
                <td className="whitespace-nowrap text-xs">
                  <div>{request.recipientDistrict}</div>
                  <div>{request.recipientUpazila}</div>
                </td>
                <td className="whitespace-nowrap text-sm">
                  {request.hospitalName}
                </td>
                <td className="whitespace-nowrap text-sm">
                  {request.bloodGroup}
                </td>
                <td className="whitespace-nowrap text-sm">
                  {request.donationDate}
                </td>
                <td className="whitespace-nowrap text-sm">
                  {request.donationTime}
                </td>
                <td className="whitespace-nowrap text-sm">
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
                <th className="whitespace-nowrap text-sm">
                  <button className="btn btn-ghost btn-xs">Details</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ===== Pagination Controls ===== */}
        <div className="flex justify-center flex-wrap gap-3 py-6">
          {currentPage > 0 && (
            <button onClick={goToPrevPage} className="btn">
              Prev
            </button>
          )}

          {[...Array(totalPages).keys()].map((i) => (
            <button
              key={i}
              onClick={() => goToPage(i)}
              className={`btn ${i === currentPage ? "btn-active" : ""}`}
            >
              {i + 1}
            </button>
          ))}

          {currentPage < totalPages - 1 && (
            <button onClick={goToNextPage} className="btn">
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default MyDonationRequest;
