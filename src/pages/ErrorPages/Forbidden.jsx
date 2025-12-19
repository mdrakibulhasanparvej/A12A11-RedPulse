import React from "react";
import { Link } from "react-router";
import { FiLock } from "react-icons/fi";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center  p-8 sm:p-10">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <FiLock className="text-3xl text-red-600 dark:text-red-400" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
          403
        </h1>

        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Access Forbidden
        </h2>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          You don’t have permission to access this page. Please contact the
          administrator or go back to safety.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-2 rounded-lg bg-linear-to-r from-[#6A0B37] to-[#B32346] hover:bg-red-700 text-white font-medium transition"
          >
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
