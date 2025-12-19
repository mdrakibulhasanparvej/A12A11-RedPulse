import React from "react";
import { Link } from "react-router";
import { FiAlertTriangle } from "react-icons/fi";

const AccessRestricted = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full text-center p-8 sm:p-10">
        <div className="w-full mx-auto p-6 rounded-2xl shadow bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <FiAlertTriangle className="text-4xl text-red-600 dark:text-red-400" />
          </div>

          <h2 className="text-2xl font-semibold text-red-600 dark:text-red-400 mb-3">
            Access Restricted 🚫
          </h2>

          <p className="text-gray-700 dark:text-gray-300">
            Your account is currently{" "}
            <span className="font-semibold">blocked</span>. You are not allowed
            to create donation requests.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Link
            to="/dashboard"
            className="px-6 py-2 rounded-lg bg-linear-to-r from-[#6A0B37] to-[#B32346] text-white font-medium transition hover:opacity-90"
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

export default AccessRestricted;
