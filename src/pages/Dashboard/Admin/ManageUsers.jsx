import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SkeletonRow from "../../../components/ui/Loading/ManageUsers/ManageUsers";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 10;

  const { refetch, data, isLoading, error } = useQuery({
    queryKey: ["users", currentPage, limit],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?limit=${limit}&skip=${currentPage * limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const users = data?.users || [];
  const totalUsers = data?.totalUsers || 0;
  const totalPage = Math.ceil(totalUsers / limit);

  const handleRoleChange = (user, newRole) => {
    // Prevent unnecessary API call
    if (user.role === newRole) return;

    // Show confirmation first
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Call API only after confirmation
        axiosSecure
          .patch(`/users/${user._id}`, { role: newRole })
          .then((res) => {
            if (res.data.modifiedCount) {
              refetch();

              // Show success alert
              Swal.fire({
                icon: "success",
                title: `${user.name} is now ${newRole}`,
                showConfirmButton: false,
                timer: 1200,
              });
            }
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Failed to update role",
              text: err.response?.data?.message || err.message,
            });
          });
      }
    });
  };

  return (
    <div className="overflow-x-auto min-h-70vh max-w-[880px]">
      <table className="table-zebra table table-md table-pin-rows table-pin-cols">
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

        <tbody>
          {isLoading
            ? [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
            : users.map((user, index) => (
                <tr key={user._id} className="hover">
                  <td>{currentPage * limit + index + 1}</td>

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

                  <td>{user.role}</td>

                  <th className="flex flex-col items-center space-y-1">
                    {/* DONOR → ADMIN */}
                    {user.role === "donor" && (
                      <button
                        className="btn w-full h-full btn-info text-white btn-xs"
                        onClick={() => handleRoleChange(user, "admin")}
                      >
                        Make Admin
                      </button>
                    )}

                    {/* ADMIN → VOLUNTEER */}
                    {user.role === "admin" && (
                      <button
                        className="btn w-full h-full btn-warning text-white btn-xs"
                        onClick={() => handleRoleChange(user, "volunteer")}
                      >
                        Make Volunteer
                      </button>
                    )}

                    {/* VOLUNTEER → ADMIN */}
                    {user.role === "volunteer" && (
                      <button
                        className="btn w-full h-full btn-info text-white btn-xs"
                        onClick={() => handleRoleChange(user, "admin")}
                      >
                        Make Admin
                      </button>
                    )}

                    {user.role === "active" ? (
                      <button className="btn h-full w-full btn-error text-white btn-xs">
                        Unblock
                      </button>
                    ) : (
                      <button className="btn h-full w-full btn-error text-white btn-xs">
                        Block
                      </button>
                    )}
                  </th>
                </tr>
              ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="flex justify-center flex-wrap gap-3 py-10">
        {currentPage > 0 && (
          <button onClick={() => setCurrentPage((p) => p - 1)} className="btn">
            Prev
          </button>
        )}

        {[...Array(totalPage).keys()].map((i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`btn ${i === currentPage ? "btn" : ""}`}
          >
            {i + 1}
          </button>
        ))}

        {currentPage < totalPage - 1 && (
          <button onClick={() => setCurrentPage((p) => p + 1)} className="btn">
            Next
          </button>
        )}
      </div>

      {error && (
        <p className="text-center text-red-500 mt-4">Failed to load users ❌</p>
      )}
    </div>
  );
};

export default ManageUsers;
