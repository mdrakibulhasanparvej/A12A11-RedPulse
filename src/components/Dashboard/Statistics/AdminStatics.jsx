import React from "react";
import { useQuery } from "@tanstack/react-query";
import Card from "../../ui/Card";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Link } from "react-router";
import Button from "../../ui/Button";
import Welcome from "../../../pages/Dashboard/Welcome";

const AdminStatics = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch Donation Requests
  const {
    data: donationData,
    isLoading: donationsLoading,
    isError: donationsError,
  } = useQuery({
    queryKey: ["donation-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/donation-request-all?skip=0&limit=1000"
      );
      return res.data;
    },
    onError: () => toast.error("Failed to fetch donation requests"),
  });

  // Fetch Users
  const {
    data: usersData,
    isLoading: usersLoading,
    isError: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users?status=active&skip=0&limit=8");
      return res.data;
    },
    onError: () => toast.error("Failed to fetch users"),
  });
  // console.log(donationData);

  // Compute Stats
  const donorStats = React.useMemo(() => {
    if (!donationData)
      return [
        { label: "Total Requests", value: 0, bg: "bg-red-50" },
        { label: "Pending", value: 0, bg: "bg-yellow-50" },
        { label: "In Progress", value: 0, bg: "bg-blue-50" },
        { label: "Completed", value: 0, bg: "bg-green-50" },
      ];

    const total = donationData.totalRequests || 0;
    const pending = donationData.requests.filter(
      (r) => r.status === "pending"
    ).length;
    const inProgress = donationData.requests.filter(
      (r) => r.status === "in-progress"
    ).length;
    const completed = donationData.requests.filter(
      (r) => r.status === "completed"
    ).length;

    const totalUser = usersData?.users?.length || 0;

    return [
      { label: "Total Users", value: totalUser, bg: "bg-green-50" },
      { label: "Total Requests", value: total, bg: "bg-red-50" },
      { label: "Pending", value: pending, bg: "bg-yellow-50" },
      { label: "In Progress", value: inProgress, bg: "bg-blue-50" },
      { label: "Completed", value: completed, bg: "bg-green-50" },
    ];
  }, [donationData, usersData]);

  const recentDonor = React.useMemo(() => {
    if (!donationData) return [];
    return donationData.requests
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 3);
  }, [donationData]);

  const newUsers = React.useMemo(() => {
    if (!usersData) return [];
    return usersData.users
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 4);
  }, [usersData]);

  // Loading state
  if (donationsLoading || usersLoading) {
    return <p className="text-center text-gray-500 mt-6">Loading...</p>;
  }

  // Error state
  if (donationsError || usersError) {
    return <p className="text-center text-red-500 mt-6">Failed to load data</p>;
  }

  return (
    <div>
      {/* welcome  */}

      <Welcome />
      {/* Admin Stats */}
      <Card
        title="Admin Statistics"
        userName={user?.displayName || "Admin"}
        stats={donorStats}
      />

      {/* New Users + Recent Orders */}
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-6">
        Recent Users
      </h2>
      <div className="flex flex-col gap-6 mt-6">
        {/* New Users */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-semibold text-white mb-6">New Users</h2>
          <div className="grid grid-cols-4 gap-4">
            {newUsers.map((userItem, i) => (
              <div key={i} className="text-center">
                <div
                  className={`w-16 h-16 mx-auto rounded-full overflow-hidden mb-3 relative ${i === 0 ? "ring-4 ring-green-500" : ""}`}
                >
                  <img
                    src="/api/placeholder/64/64"
                    alt={userItem.name || userItem.displayName || "User"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-white font-medium">
                  {userItem.name || userItem.displayName}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(userItem.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/*  Recent Donation Requests*/}
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-6">
          Recent Donation Requests
        </h2>
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-800 dark:text-white text-sm border-b border-gray-700">
                  <th className="pb-3">Recipient Name</th>
                  <th className="pb-3">Blood Group</th>
                  <th className="pb-3">Donation Date</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-800 dark:text-white ">
                {recentDonor.length > 0 ? (
                  recentDonor.map((order, i) => (
                    <tr key={i} className="border-b border-gray-700">
                      <td className="py-2">{order.recipientName}</td>
                      <td className="py-2">{order.bloodGroup}</td>
                      <td className="py-2">
                        {new Date(order.donationDate).toLocaleDateString()}
                      </td>
                      <td className="py-2 capitalize">{order.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-8 text-gray-500 dark:text-white "
                    >
                      No recent donations yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <Button label=" Show All" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStatics;
