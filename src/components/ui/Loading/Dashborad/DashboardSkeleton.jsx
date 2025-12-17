import React from "react";

const DashboardSkeleton = () => {
  return (
    <div className="relative min-h-screen md:flex bg-white dark:bg-gray-900 animate-pulse">
      {/* Sidebar Skeleton */}
      <div className="hidden md:flex md:flex-col justify-between bg-gray-100 dark:bg-gray-800 w-64 p-4 space-y-6">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-gray-300 dark:bg-gray-700 mx-auto mb-4" />
        {/* Name & Email */}
        <div className="space-y-2">
          <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 mx-auto rounded" />
          <div className="h-3 w-32 bg-gray-200 dark:bg-gray-600 mx-auto rounded" />
        </div>
        {/* Menu Items */}
        <div className="flex-1 mt-6 space-y-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded mx-auto"
            />
          ))}
        </div>
        {/* Bottom Theme + Logout */}
        <div className="space-y-3">
          <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded mx-auto" />
          <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded" />
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex flex-col min-h-screen w-full p-5 space-y-6">
        {/* Table Skeleton */}
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                {[...Array(6)].map((_, i) => (
                  <th key={i}>
                    <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded mx-auto"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(9)].map((_, i) => (
                <tr key={i}>
                  {[...Array(6)].map((_, j) => (
                    <td key={j}>
                      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Skeleton */}
        <div className="flex gap-5 justify-center items-center">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
