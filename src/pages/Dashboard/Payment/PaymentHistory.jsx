import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import PaymentHistoryTable from "../../../components/Shared/PaymentHistoryTable";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();

  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 10;
  const skip = currentPage * limit;

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["payment-history", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donation-payment-info?skip=${skip}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const handleDelete = async (payment) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This payment record will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#B32346",
      cancelButtonColor: "#6A0B37",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`/donation-payment-info/${payment._id}`);
      toast.success("Payment record deleted successfully");
      refetch();
    } catch {
      toast.error("Failed to delete payment record");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  if (isError)
    return (
      <p className="text-center text-red-500">Failed to load payment history</p>
    );

  const payments = data?.donations || [];
  const totalPage = Math.ceil((data?.totalPayment || 0) / limit);

  return (
    <div className="px-2 mr-4 md:px-4 py-4">
      <PaymentHistoryTable
        title="Donation Payment History"
        payments={payments}
        totalPage={totalPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default PaymentHistory;
