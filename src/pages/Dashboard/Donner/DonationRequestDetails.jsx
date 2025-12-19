import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch donation request details
  const { data, isLoading } = useQuery({
    queryKey: ["donation-request", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-request-all?id=${id}`);
      return res.data; // { requests: [...], totalRequests: number }
    },
  });

  const request = data?.requests?.[0] || {};

  // Mutation to update status to inprogress
  const donationMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosSecure.patch(`/donation-request-status/${id}`, {
        status: "inprogress",
        donorName: user?.displayName,
        donorEmail: user?.email,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["donation-request", id]);
      setIsModalOpen(false);
      alert("Donation confirmed! Status updated to inprogress.");
    },
    onError: (err) => {
      console.error(err);
      alert("Failed to confirm donation.");
    },
  });

  const handleDonate = (e) => {
    e.preventDefault();
    donationMutation.mutate();
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (!request._id)
    return <div className="text-center py-10">Request not found.</div>;

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-4">
        Blood Donation Request Details
      </h2>

      <div className="space-y-2 border p-5 rounded-xl shadow">
        <p>
          <strong>Requester Name:</strong> {request.requesterName}
        </p>
        <p>
          <strong>Requester Email:</strong> {request.requesterEmail}
        </p>
        <p>
          <strong>Recipient Name:</strong> {request.recipientName}
        </p>
        <p>
          <strong>Division:</strong> {request.recipientDivision}
        </p>
        <p>
          <strong>District:</strong> {request.recipientDistrict}
        </p>
        <p>
          <strong>Upazila:</strong> {request.recipientUpazila}
        </p>
        <p>
          <strong>Union:</strong> {request.recipientUnion}
        </p>
        <p>
          <strong>Hospital Name:</strong> {request.hospitalName}
        </p>
        <p>
          <strong>Full Address:</strong> {request.fullAddress}
        </p>
        <p>
          <strong>Blood Group:</strong> {request.bloodGroup}
        </p>
        <p>
          <strong>Date:</strong> {request.donationDate}
        </p>
        <p>
          <strong>Time:</strong> {request.donationTime}
        </p>
        <p>
          <strong>Message:</strong> {request.requestMessage}
        </p>
        <p>
          <strong>Status:</strong> {request.status}
        </p>
      </div>

      {/* Donate Button */}
      {request.status === "pending" && (
        <div className="mt-6 text-center">
          <button
            className="btn btn-primary"
            onClick={() => setIsModalOpen(true)}
          >
            Donate
          </button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full relative">
            <h3 className="text-xl font-bold mb-4">Confirm Donation</h3>

            <form onSubmit={handleDonate} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Donor Name</label>
                <input
                  type="text"
                  value={user?.displayName || ""}
                  readOnly
                  className="input input-bordered w-full bg-gray-100"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Donor Email</label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="input input-bordered w-full bg-gray-100"
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={donationMutation.isLoading}
                >
                  {donationMutation.isLoading ? "Processing..." : "Confirm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationRequestDetails;
