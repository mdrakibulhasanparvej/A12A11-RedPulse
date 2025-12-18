import React from "react";

const ProfileSkeleton = () => {
  return (
    <div className="p-6 animate-pulse">
      {/* Title */}
      <div className="mb-6">
        <div className="h-6 w-40 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>

      {/* Main Card */}
      <div className="p-6 rounded-2xl max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 border border-gray-300 dark:border-gray-700 rounded-2xl p-5">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="w-28 h-28 rounded-full bg-gray-300 dark:bg-gray-700"></div>

            {/* Name & Email */}
            <div className="space-y-2 text-center lg:text-left">
              <div className="h-5 w-40 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="h-4 w-56 bg-gray-200 dark:bg-gray-600 rounded"></div>
            </div>
          </div>

          {/* Edit Button */}
          <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        </div>

        {/* Profile Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 border border-gray-300 dark:border-gray-700 rounded-2xl p-5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 w-24 bg-gray-200 dark:bg-gray-600 rounded"></div>
              <div className="h-4 w-40 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
