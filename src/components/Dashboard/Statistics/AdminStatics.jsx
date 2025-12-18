import React from "react";
import Card from "../../ui/Card";
import useAuth from "../../../hooks/useAuth";

const AdminStatics = () => {
  const { user } = useAuth();

  const donorStats = [
    { label: "Total Requests", value: 0, bg: "bg-red-50" },
    { label: "Pending", value: 0, bg: "bg-yellow-50" },
    { label: "In Progress", value: 0, bg: "bg-blue-50" },
    { label: "Completed", value: 0, bg: "bg-green-50" },
  ];
  return (
    <div>
      <Card
        title="Admin Statistics"
        userName={user?.displayName || "Admin"}
        stats={donorStats}
      />
      {/* 3 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          {
            title: "Total Sales",
            amount: "$65,024",
            change: "+81%",
            positive: true,
          },
          {
            title: "Site Visit",
            amount: "24,981",
            change: "-48%",
            positive: false,
          },
          {
            title: "Search",
            amount: "14,147",
            change: "+21%",
            positive: true,
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.title}</p>
                <p className="text-3xl font-bold text-white mt-2">
                  {stat.amount}
                </p>
              </div>
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center relative ${
                  stat.positive ? "bg-green-500/20" : "bg-red-500/20"
                }`}
              >
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="34"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-700"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="34"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray="213"
                    strokeDashoffset={stat.positive ? "40" : "110"}
                    className={
                      stat.positive
                        ? "text-green-500"
                        : stat.change === "-48%"
                          ? "text-red-500"
                          : "text-blue-500"
                    }
                  />
                </svg>
                <p
                  className={`absolute text-sm font-bold ${stat.positive ? "text-green-400" : "text-red-400"}`}
                >
                  {stat.change}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* New Users + Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* New Users */}
        <div className="bg-gray-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">New User</h2>
          <div className="grid grid-cols-4 gap-4">
            {[
              { name: "Rakibul", time: "54 Min Ago" },
              { name: "Nayem", time: "44 Min Ago", highlight: true },
              { name: "Rabiul", time: "24 Min Ago" },
              { name: "More", time: "New User", add: true },
            ].map((user, i) => (
              <div key={i} className="text-center">
                <div
                  className={`w-16 h-16 mx-auto rounded-full overflow-hidden mb-3 relative ${
                    user.highlight ? "ring-4 ring-green-500" : ""
                  }`}
                >
                  {user.add ? (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center text-3xl text-gray-500">
                      +
                    </div>
                  ) : (
                    <img
                      src="/api/placeholder/64/64"
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <p className="text-white font-medium">{user.name}</p>
                <p className="text-xs text-gray-400">{user.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-gray-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">
            Recent Order
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 text-sm border-b border-gray-700">
                  <th className="pb-3">Course Name</th>
                  <th className="pb-3">Course Number</th>
                  <th className="pb-3">Payment</th>
                  <th className="pb-3">Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-500">
                    No recent orders yet
                  </td>
                </tr>
              </tbody>
            </table>
            <a
              href="#"
              className="block text-center mt-6 text-purple-400 hover:text-purple-300"
            >
              Show All
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStatics;
