import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SkeletonRow from "../../../components/ui/Loading/ManageUsers/ManageUsers";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 10;

  const { data, isLoading, error } = useQuery({
    queryKey: ["users", currentPage, limit],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/all-users?limit=${limit}&skip=${currentPage * limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const users = data?.users || [];
  const totalUsers = data?.totalUsers || 0;
  const totalPage = Math.ceil(totalUsers / limit);

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

                  <td>
                    <button className="btn btn-ghost btn-xs">Details</button>
                  </td>
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
