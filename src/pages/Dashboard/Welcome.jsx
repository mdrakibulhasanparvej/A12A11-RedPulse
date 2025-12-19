import React from "react";
import useAuth from "../../hooks/useAuth";

const Welcome = () => {
  const { user } = useAuth();

  return (
    <div className="bg-linear-to-br from-[#6A0B37] to-[#B32346] text-gray-200  mb-5 dark:bg-gray-900 p-6 rounded-2xl shadow-sm border dark:border-gray-800">
      <h1 className="text-2xl md:text-3xl font-bold dark:text-white">
        Welcome back, {user?.displayName || "Donor"} 👋
      </h1>

      <p className="mt-2 text-gray-300 dark:text-gray-400">
        Manage your blood donation requests and help save lives.
      </p>
    </div>
  );
};

export default Welcome;
