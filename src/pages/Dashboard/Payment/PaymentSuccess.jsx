import { FaCheckCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const { user } = useAuth();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const sessionId = new URLSearchParams(location.search).get("session_id");

  const [loading, setLoading] = useState(true);
  const [donation, setDonation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sessionId) return;

    const confirmDonation = async () => {
      try {
        const res = await axiosSecure.post("donation-payment-info", {
          sessionId,
        });
        setDonation(res.data.donation);
        // console.log(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    confirmDonation();
  }, [sessionId, axiosSecure]);

  if (loading)
    return <p className="text-center mt-10">Confirming your donation...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
        <div className="flex justify-center mb-4">
          <FaCheckCircle className="text-green-500 text-6xl" />
        </div>

        <h2 className="text-2xl font-bold text-green-600 mb-2">
          🎉 Payment Successful!
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {donation && (
          <div className="text-left text-gray-700 dark:text-gray-300 mb-6 space-y-2">
            <p>
              <span className="font-semibold">Name:</span> {donation.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {donation.email}
            </p>
            <p>
              <span className="font-semibold">Amount:</span> {donation.amount}৳
            </p>
            <p>
              <span className="font-semibold">Transition Id:</span>{" "}
              {donation.transition_id}
            </p>

            <p className="capitalize">
              <span className="font-semibold ">Payment Status:</span>{" "}
              <span
                className={`${donation.status === "paid" && "bg-green-400 px-4 rounded-xl text-white"}`}
              >
                {donation.status}
              </span>
            </p>
          </div>
        )}

        {user && (
          <Link
            to="/dashboard"
            className="btn w-full bg-linear-to-r from-[#6A0B37] to-[#B32346] text-white"
          >
            Go to Dashboard
          </Link>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
