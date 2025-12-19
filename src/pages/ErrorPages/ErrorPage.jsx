import React from "react";
import { Link } from "react-router";
import { FiAlertTriangle } from "react-icons/fi";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center p-8 sm:p-10">
        {/* Title */}
        <h1 className="text-9xl font-bold text-gray-800 dark:text-white mb-2">
          404
        </h1>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Oops! PAGE NOT FOUND
        </h1>

        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Something went wrong
        </h2>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The page you’re looking for doesn’t exist or an unexpected error
          occurred. Please try again or go back home.
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
            onClick={() => window.location.reload()}
            className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
