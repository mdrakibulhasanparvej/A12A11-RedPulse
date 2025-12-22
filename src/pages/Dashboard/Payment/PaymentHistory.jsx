import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import PaymentHistoryTable from "../../../components/Shared/PaymentHistoryTable";
import useAuth from "../../../hooks/useAuth";
import useUser from "../../../hooks/useUser";
import useTitle from "../../../hooks/useTitle";

const PaymentHistory = () => {
  useTitle("Payment History");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { userData: dbUser } = useUser();

  // console.log(dbUser);

  // Query Conditionally
  const isAdmin = dbUser?.role === "admin" || dbUser?.role === "volunteer";

  const queryEmail = isAdmin ? "" : user?.email;

  // console.log(queryEmail);

  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 10;
  const skip = currentPage * limit;

  // API Based on Role
  const { data, isLoading, refetch, isError } = useQuery({
    queryKey: ["payment-history", queryEmail, currentPage],
    enabled: !!dbUser,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donation-payment-info?skip=${skip}&limit=${limit}&email=${queryEmail}`
      );
      return res.data;
    },
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
