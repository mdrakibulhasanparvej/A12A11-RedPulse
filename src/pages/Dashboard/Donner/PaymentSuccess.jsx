import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";

const PaymentSuccess = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <FaCheckCircle className="text-green-500 text-6xl" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-green-600 mb-2">
          🎉 Payment Successful!
        </h2>

        {/* Message */}
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Thank you for your donation. Your contribution helps save lives ❤️
        </p>

        {/* Action Button */}
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
