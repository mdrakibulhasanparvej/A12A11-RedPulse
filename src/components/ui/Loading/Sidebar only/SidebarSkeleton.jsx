import React from "react";

const SidebarSkeleton = () => {
  return (
    <aside
      className="fixed min-h-screen lg:static inset-y-0 left-0 z-50 w-64
      bg-white dark:bg-gray-800
      border-r border-gray-200 dark:border-gray-700
      flex flex-col animate-pulse"
    >
      {/* Logo Skeleton */}
      <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-gray-300 dark:bg-gray-700" />
          <div className="h-5 w-24 rounded bg-gray-300 dark:bg-gray-700" />
        </div>
        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded lg:hidden" />
      </div>

      {/* Menu Skeleton */}
      <div className="flex flex-col justify-between gap-50 h-vh">
        {/* Top menu */}
        <div>
          <div className="mt-6 px-3">
            <div className="h-10 w-[50%] rounded-lg bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="mt-6 px-3">
            <div className="h-10 w-[70%] rounded-lg bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="mt-6 px-3">
            <div className="h-10 w-[50%] rounded-lg bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="mt-6 px-3">
            <div className="h-10 w-[70%] rounded-lg bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>

        {/* Logout Skeleton */}
        <div className="px-3 mb-4">
          <div className="h-10 w-[60%] rounded-lg bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
