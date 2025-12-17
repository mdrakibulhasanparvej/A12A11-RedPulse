import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const MyDonationRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: request,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-donation-request", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axiosSecure.get(`/donation-requests/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
    onError: (err) => {
      console.error(err);
      toast.error("Failed to fetch your donation request");
    },
  });

  if (isLoading) return <p>Loading your donation request...</p>;
  if (!request) return <p>No donation request found for your email.</p>;

  return (
    <div className="overflow-x-auto max-w-6xl mx-auto p-6 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-semibold mb-6">My Donation Request</h2>

      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Receipient address</th>
            <th>Hospital</th>
            <th>Blood Group</th>
            <th>Donation Date</th>
            <th>Donation Time</th>
            <th>Status</th>
            <th>Message</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                      alt="Avatar"
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
            <td>
              <div className="flex items-center gap-3">
                <div>
                  <div className="font-bold">
                    Div: {request.recipientDivision}
                  </div>
                  <div className="font-sm">
                    Dist: {request.recipientDistrict}
                  </div>
                  <div className="font-sm">Upo: {request.recipientUpazila}</div>
                  <div className="font-sm">Uni: {request.recipientUnion}</div>
                </div>
              </div>
            </td>
            <td>{request.hospitalName}</td>
            <td>{request.bloodGroup}</td>
            <td>{request.donationDate}</td>
            <td>{request.donationTime}</td>
            <td>{request.status}</td>
            <td>{request.requestMessage}</td>
            <td>
              <button className="btn btn-ghost btn-xs">details</button>
            </td>
          </tr>
        </tbody>

        {/* foot */}
        <tfoot>
          <tr>
            <th>Name</th>
            <th>Receipient address</th>
            <th>Hospital</th>
            <th>Blood Group</th>
            <th>Donation Date</th>
            <th>Donation Time</th>
            <th>Status</th>
            <th>Message</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default MyDonationRequest;
