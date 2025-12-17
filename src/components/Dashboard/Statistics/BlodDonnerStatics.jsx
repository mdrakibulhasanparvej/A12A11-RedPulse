import React from "react";
import useAuth from "../../../hooks/useAuth";
import Card from "../../ui/Card";
import Welcome from "../../../pages/Dashboard/Donner/Welcome";
import RecentDonationRequests from "../../../pages/Dashboard/Donner/RecentDonationRequests";

const BlodDonnerStatics = () => {
  const { user } = useAuth();

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
      {user && <RecentDonationRequests />}
    </>
  );
};

export default BlodDonnerStatics;
