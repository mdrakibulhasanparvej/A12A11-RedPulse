import { MdCancel } from "react-icons/md";
import { FaRedoAlt } from "react-icons/fa";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useTitle from "../../../hooks/useTitle";

const PaymentCancel = () => {
  useTitle("Payment Cancel");
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <MdCancel className="text-red-500 text-6xl" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-red-600 mb-2">
          Payment Canceled
        </h2>

        {/* Message */}
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Your payment was not completed. Please try again to support the cause.
        </p>

        {/* Button */}
        {user && (
          <Link
            to={`/funding/${user.email}`}
            className="btn w-full bg-linear-to-r from-[#6A0B37] to-[#B32346] text-white flex items-center justify-center gap-2"
          >
            <FaRedoAlt />
            Try Again
          </Link>
        )}
      </div>
    </div>
  );
};

export default PaymentCancel;
