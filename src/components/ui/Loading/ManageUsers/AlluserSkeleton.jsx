import React from "react";

const AlluserSkeleton = ({ rows = 5 }) => {
  return (
    <div className="overflow-x-auto min-h-[70vh] max-w-[880px]">
      <table className="table table-zebra table-md table-pin-rows table-pin-cols">
        {/* TABLE HEAD */}
        <thead className="bg-base-200 dark:bg-gray-800">
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Blood Info</th>
            <th>Status</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        {/* TABLE BODY */}
        <tbody>
          {[...Array(rows)].map((_, i) => (
            <tr key={i} className="animate-pulse">
              {/* # */}
              <td>
                <div className="h-4 w-6 rounded bg-gray-300 dark:bg-gray-700" />
              </td>

              {/* USER */}
              <td>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-700" />
                  <div className="space-y-2">
                    <div className="h-4 w-28 rounded bg-gray-300 dark:bg-gray-700" />
                    <div className="h-3 w-36 rounded bg-gray-200 dark:bg-gray-600" />
                  </div>
                </div>
              </td>

              {/* BLOOD INFO */}
              <td>
                <div className="space-y-2">
                  <div className="h-5 w-12 rounded-full bg-gray-300 dark:bg-gray-700" />
                  <div className="h-3 w-32 rounded bg-gray-200 dark:bg-gray-600" />
                </div>
              </td>

              {/* STATUS */}
              <td>
                <div className="h-6 w-20 rounded-full bg-gray-300 dark:bg-gray-700" />
              </td>

              {/* ROLE */}
              <td>
                <div className="h-4 w-20 rounded bg-gray-300 dark:bg-gray-700" />
              </td>

              {/* ACTION */}
              <td>
                <div className="flex flex-col gap-2">
                  <div className="h-7 w-full rounded bg-gray-300 dark:bg-gray-700" />
                  <div className="h-7 w-full rounded bg-gray-300 dark:bg-gray-700" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION SKELETON */}
      <div className="flex justify-center py-10">
        <div className="h-10 w-10 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
      </div>
    </div>
  );
};

export default AlluserSkeleton;
