import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useState } from "react";
import Pagination from "../../../components/Shared/Pagination";
import DonationRequestTable from "../../../components/Shared/DonationRequestTable";
import { useNavigate } from "react-router";

const AllBloodDonationRequest = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // ================= Pagination =================
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 10;
  const skip = currentPage * limit;

  // ================= Fetch Data =================
  const { data, isLoading } = useQuery({
    queryKey: ["pending-donation-requests", user?.email, skip, limit],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donation-request-all?limit=${limit}&skip=${skip}`
      );
      return res.data;
    },
    onError: () => {
      toast.error("Failed to load donation requests");
    },
    keepPreviousData: true,
  });

  const requests = data?.requests || [];
  const totalRequests = data?.totalRequests || 0;
  const totalPage = Math.ceil(totalRequests / limit);

  if (loading || isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <p className="text-center text-gray-500">
          Loading your donation requests...
        </p>
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
      <DonationRequestTable
        title="All Recent Donation Requests"
        requests={requests}
        totalPage={totalPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onView={(request) => navigate(`/donation/${request._id}`)}
        onUpdate={(request) => navigate(`/dashboard/update/${request._id}`)}
        onDelete={(request) => handleDelete(request._id)}
      />
    </>
  );
};

export default AllBloodDonationRequest;
