import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import DonationRequestTable from "../../../components/Shared/DonationRequestTable";
import DonationDetailsModal from "../../../components/Modal/DonationDetailsModal";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useTitle from "../../../hooks/useTitle";

const AllBloodDonationRequest = () => {
  useTitle("All Blood Donation Request");

  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // ================= Donation Details Modal =================
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ================= Pagination =================
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 10;
  const skip = currentPage * limit;

  // ================= filtering accorfing to status =================
  const [statusFilter, setStatusFilter] = useState("");

  // ================= Fetch Data =================
  const { data, isLoading } = useQuery({
    queryKey: [
      "pending-donation-requests",
      user?.email,
      skip,
      limit,
      statusFilter,
    ],

    enabled: !!user?.email && !loading,
    queryFn: async ({ queryKey }) => {
      const [_key] = queryKey;
      let url = `/donation-request-all?limit=${limit}&skip=${skip}`;
      if (statusFilter) url += `&status=${statusFilter}`;
      const res = await axiosSecure.get(url);
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

  // ================= Update status =================
  const updateMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/donation-request-all/${id}`, {
        status,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Donation request updated");
      queryClient.invalidateQueries(["pending-donation-requests"]);
    },
    onError: () => {
      toast.error("Failed to update donation request");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/donation-request-all/${id}`);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const handleUpdate = (request) => {
    Swal.fire({
      title: "Update Donation Status",
      text: "What do you want to do with this request?",
      icon: "question",
      showCancelButton: true,
      showDenyButton: true,

      confirmButtonText: "Done",
      denyButtonText: "Cancel Request",
      cancelButtonText: "Close",

      confirmButtonColor: "#16a34a", // green
      denyButtonColor: "#dc2626", // red
      cancelButtonColor: "#6b7280",
    }).then((result) => {
      if (result.isConfirmed) {
        //  Mark as DONE
        updateMutation.mutate({
          id: request._id,
          status: "done",
        });
      } else if (result.isDenied) {
        //  Mark as CANCEL
        updateMutation.mutate({
          id: request._id,
          status: "cancel",
        });
      }
    });
  };

  if (loading || isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <p className="text-center text-gray-500">
          Loading your donation requests...
        </p>
      </div>
    );
  }

  // ================= Delete request =================

  const handleDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(user._id, {
          onSuccess: () => {
            Swal.fire({
              icon: "success",
              title: `${user.name} deleted successfully`,
              showConfirmButton: false,
              timer: 1200,
            });
          },
          onError: (err) => {
            Swal.fire({
              icon: "error",
              title: "Failed to delete donation request",
              text: err.response?.data?.message || err.message,
            });
          },
        });
      }
    });
  };

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
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onView={(request) => {
          setSelectedRequest(request);
          setIsModalOpen(true);
        }}
        onUpdate={(request) => handleUpdate(request)}
        onDelete={(request) => handleDelete(request)}
      />

      <DonationDetailsModal
        isOpen={isModalOpen}
        request={selectedRequest}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default AllBloodDonationRequest;
