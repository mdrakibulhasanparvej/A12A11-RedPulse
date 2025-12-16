import React from "react";

const DefaultSkeleton = () => {
  return (
    <div className="relative min-h-screen md:flex bg-white dark:bg-gray-900 animate-pulse">
      {/* Sidebar Skeleton */}
      <div className="md:ml-64"></div>

      {/* Main Content Skeleton */}
      <div className="flex-1 p-5 space-y-6">
        {/* Page Header */}
        <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded"></div>

        {/* Table Skeleton */}
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                {[...Array(6)].map((_, i) => (
                  <th key={i}>
                    <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i}>
                  {[...Array(6)].map((_, j) => (
                    <td key={j}>
                      <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-3 py-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DefaultSkeleton;
