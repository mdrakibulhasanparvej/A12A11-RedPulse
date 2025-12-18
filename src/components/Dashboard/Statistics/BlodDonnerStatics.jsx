import React from "react";
import useAuth from "../../../hooks/useAuth";
import Card from "../../ui/Card";
import Welcome from "../../../pages/Dashboard/Donner/Welcome";
import RecentDonationRequests from "../../../pages/Dashboard/Donner/RecentDonationRequests";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useUser from "../../../hooks/useUser";

const BlodDonnerStatics = () => {
  const { user } = useAuth();
  const {dbuser} = useUser()
  const axiosSecure = useAxiosSecure();

  const { data = [], isLoading } = useQuery({
    queryKey: ["recent-donations", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donation-requests?email=${user.email}&limit=3`
      );
      return res.data;
    },
  });

  const donations = Array.isArray(data.requests) ? data.requests : [];

  if (isLoading) return null;

  const donorStats = [
    { label: "Total Requests", value: 0, bg: "bg-red-50" },
    { label: "Pending", value: 0, bg: "bg-yellow-50" },
    { label: "In Progress", value: 0, bg: "bg-blue-50" },
    { label: "Completed", value: 0, bg: "bg-green-50" },
  ];

  return (
    <>
      <div className="space-y-8">
        {/* Welcome Section */}
        <Welcome />
      </div>
      {/* <Card
        title="Donor Statistics"
        userName={user?.displayName || "Donor"}
        stats={donorStats}
      /> */}
      {/* Recent Requests */}
      {donations.length === 0 ||
        (dbuser.role === 'donors' && <RecentDonationRequests donations={donations} />)}
    </>
  );
};

export default BlodDonnerStatics;
