import React from "react";
import useAuth from "../../../hooks/useAuth";

const Welcome = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white my-5 dark:bg-gray-900 p-6 rounded-2xl shadow-sm border dark:border-gray-800">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
        Welcome back, {user?.displayName || "Donor"} 👋
      </h1>

      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Manage your blood donation requests and help save lives.
      </p>
    </div>
  );
};

export default Welcome;
