import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";
import useTitle from "../../../hooks/useTitle";

const Funding = () => {
  useTitle("Funding");

  const { email } = useParams();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${email}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return <p className="text-red-500 text-center">User not found</p>;

  // donate submit
  const handleDonate = async (data) => {
    const amount = Number(data.amount);

    Swal.fire({
      title: "Confirm Donation?",
      text: `You are donating ৳${amount}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Proceed to Payment",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.post("/create-checkout-session", {
          amount,
          email: user.email,
          name: user.name || user.displayName,
        });

        // Redirect to Stripe checkout
        window.location.href = res.data.url;
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-red-700">
          Donate Funding
        </h2>

        {/* User Info */}
        <div className="space-y-2 mb-5 text-sm">
          <p>
            <span className="font-semibold">My Name:</span>{" "}
            {user?.name || user?.displayName || "N/A"}
          </p>
          <p>
            <span className="font-semibold">My Email:</span> {user?.email}
          </p>
        </div>

        {/* Donation Form */}
        <form onSubmit={handleSubmit(handleDonate)} className="space-y-4">
          <input
            type="number"
            placeholder="Enter Amount"
            className="input input-bordered w-full"
            {...register("amount", { required: true, min: 1 })}
          />

          <button
            type="submit"
            className="btn w-full bg-linear-to-r from-[#6A0B37] to-[#B32346] text-white"
          >
            Donate
          </button>
        </form>
      </div>
    </div>
  );
};

export default Funding;
