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
    </div>
  );
};

export default AdminStatics;
