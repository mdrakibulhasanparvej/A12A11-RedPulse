import React from "react";

const Card = ({ title, userName, stats }) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border dark:border-gray-800">
      {/* Title */}
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white mb-2">
        {title}
      </h2>

      {/* Subtitle */}
      {userName && (
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Hello <span className="font-medium">{userName}</span>, here is a quick
          overview of your activity.
        </p>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl ${item.bg} dark:bg-gray-800`}
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {item.label}
            </p>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              {item.value}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
