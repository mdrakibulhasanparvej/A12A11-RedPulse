import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Container from "../../../components/ui/Container";

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
    <Container>
      <div className="w-full mx-auto py-10 px-4">
        <h2 className="text-3xl font-bold mb-8 bg-linear-to-r from-[#6A0B37] to-[#B32346] bg-clip-text text-transparent ">
          Blood Donation Request Details
        </h2>

        <div className="overflow-x-auto border border-gray-300 rounded-xl shadow-sm">
          <table className="table w-full ">
            {/* head */}
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th>Title</th>
                <th>Details</th>
                <th>Title</th>
                <th>Details</th>
              </tr>
            </thead>

            <tbody>
              {/* Row 1 */}
              <tr className="bg-base-200 dark:bg-gray-900">
                <td className="font-bold text-gray-800 dark:text-gray-200">
                  Recipient Name
                </td>
                <td className="text-gray-700 dark:text-gray-300">
                  {request.recipientName}
                </td>
                <td className="font-bold text-gray-800 dark:text-gray-200">
                  Division
                </td>
                <td className="text-gray-700 dark:text-gray-300">
                  {request.recipientDivision}
                </td>
              </tr>

              {/* Row 2 */}
              <tr>
                <td className="font-bold text-gray-800 dark:text-gray-200">
                  Blood Group
                </td>
                <td className="font-bold text-lg text-red-700 dark:text-red-400">
                  {request.bloodGroup}
                </td>
                <td className="font-bold text-gray-800 dark:text-gray-200">
                  District
                </td>
                <td className="text-gray-700 dark:text-gray-300">
                  {request.recipientDistrict}
                </td>
              </tr>

              {/* Row 3 */}
              <tr className="bg-base-200 dark:bg-gray-900">
                <td className="font-bold text-gray-800 dark:text-gray-200">
                  Hospital
                </td>
                <td className="text-gray-700 dark:text-gray-300">
                  {request.hospitalName}
                </td>
                <td className="font-bold text-gray-800 dark:text-gray-200">
                  Upazila
                </td>
                <td className="text-gray-700 dark:text-gray-300">
                  {request.recipientUpazila}
                </td>
              </tr>

              {/* Row 4 */}
              <tr>
                <td className="font-bold text-gray-800 dark:text-gray-200">
                  Full Address
                </td>
                <td className="text-gray-700 dark:text-gray-300">
                  {request.fullAddress}
                </td>
                <td className="font-bold text-gray-800 dark:text-gray-200">
                  Union
                </td>
                <td className="text-gray-700 dark:text-gray-300">
                  {request.recipientUnion}
                </td>
              </tr>

              {/* Row 5 */}
              <tr className="bg-base-200 dark:bg-gray-900">
                <td className="font-bold text-gray-800 dark:text-gray-200">
                  Date
                </td>
                <td className="text-gray-700 dark:text-gray-300">
                  {request.donationDate}
                </td>
                <td className="font-bold text-gray-800 dark:text-gray-200">
                  Time
                </td>
                <td className="text-gray-700 dark:text-gray-300">
                  {request.donationTime}
                </td>
              </tr>

              {/* Row 6 */}
              <tr>
                <td className="font-bold text-gray-800 dark:text-gray-200">
                  Message
                </td>
                <td className="text-gray-700 dark:text-gray-300" colSpan={3}>
                  {request.requestMessage}
                </td>
              </tr>

              {/* Row 7 */}
              <tr className="bg-base-200 dark:bg-gray-900">
                <td className="font-bold text-gray-800 dark:text-gray-200">
                  Status
                </td>
                <td colSpan={3}>
                  <span
                    className={`px-2 py-1 rounded-lg font-semibold ${
                      request.status === "pending"
                        ? "bg-yellow-200 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-100"
                        : "bg-green-200 text-green-800 dark:bg-green-600 dark:text-green-100"
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
              </tr>

              {/* Bottom rows */}
              <tr>
                <td className="font-bold text-gray-800 dark:text-gray-200">
                  Requester Name
                </td>
                <td className="text-gray-700 dark:text-gray-300">
                  {request.requesterName}
                </td>
                <td className="font-bold text-gray-800 dark:text-gray-200">
                  Requester Email
                </td>
                <td className="text-gray-700 dark:text-gray-300">
                  {request.requesterEmail}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Donate Button */}
        {request.status === "pending" && (
          <div className="mt-6 text-center">
            <button
              className="btn bg-linear-to-r from-[#6A0B37]/90 to-[#B32346]/90 hover:bg-red-800 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition-all duration-300"
              onClick={() => setIsModalOpen(true)}
            >
              Donate
            </button>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-md w-full shadow-2xl relative">
              <h3 className="text-2xl font-bold mb-4 text-red-600">
                Confirm Donation
              </h3>

              <form onSubmit={handleDonate} className="space-y-4">
                <div>
                  <label className="block font-semibold mb-1">Donor Name</label>
                  <input
                    type="text"
                    value={user?.displayName || ""}
                    readOnly
                    className="input input-bordered w-full bg-gray-100 dark:bg-gray-800"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">
                    Donor Email
                  </label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    className="input input-bordered w-full bg-gray-100 dark:bg-gray-800"
                  />
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn btn-outline border-red-600 text-red-600 hover:bg-red-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn bg-red-600 hover:bg-red-700 text-white font-semibold"
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
    </Container>
  );
};

export default DonationRequestDetails;
