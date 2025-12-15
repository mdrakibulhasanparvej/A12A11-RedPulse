import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SkeletonRow from "../../../components/ui/Loading/ManageUsers/ManageUsers";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-users");
      return res.data;
    },
  });

  return (
    <div className="overflow-x-auto w-full">
      <table className="table table-zebra">
        {/* head */}
        <thead className="bg-base-200 dark:bg-gray-800">
          <tr>
            <th>User</th>
            <th>Blood Info</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {isLoading
            ? [...Array(5)].map((_, i) => <SkeletonRow key={i} />) // 5 skeleton rows
            : users.map((user, index) => (
                <tr key={index} className="hover">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={user.avatar} alt={user.name} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.name}</div>
                        <div className="text-sm opacity-60">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-error badge-sm">
                      {user.bloodGroup}
                    </span>
                    <br />
                    <span className="text-sm opacity-70">
                      {user.upazila}, {user.district}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        user.status === "active"
                          ? "badge-success"
                          : "badge-ghost"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-ghost btn-xs">Details</button>
                  </td>
                </tr>
              ))}
        </tbody>

        {/* foot */}
        <tfoot className="bg-base-200 dark:bg-gray-800">
          <tr>
            <th>User</th>
            <th>Blood Info</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </tfoot>
      </table>

      {/* Error message */}
      {error && (
        <p className="text-center text-red-500 mt-4">Failed to load users ❌</p>
      )}
    </div>
  );
};

export default ManageUsers;
