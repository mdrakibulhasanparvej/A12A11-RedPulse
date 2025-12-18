import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AllusersTableRow from "../../../components/ui/Loading/ManageUsers/AllusersTableRow";
import Swal from "sweetalert2";
import { FaFilter } from "react-icons/fa";
import usePagination from "../../../hooks/usePagination";

const Allusers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState("");

  const limit = 10;

  // ==================== Fetch Users ====================
  const { data, isLoading, error } = useQuery({
    queryKey: ["users", statusFilter],
    queryFn: async ({ queryKey }) => {
      const [_key] = queryKey;
      let url = `/users?limit=${limit}&skip=${currentPage * limit}`;
      if (statusFilter) url += `&status=${statusFilter}`;
      const res = await axiosSecure.get(url);
      return res.data;
    },
    keepPreviousData: true,
  });

  const users = data?.users || [];
  const totalUsers = data?.totalUsers || 0;

  // ==================== Use Pagination Hook ====================
  const {
    currentPage,
    totalPages,
    goToNextPage,
    goToPrevPage,
    goToPage,
    setCurrentPage,
  } = usePagination({
    totalItems: totalUsers,
    itemsPerPage: limit,
  });

  // ==================== Mutation for Role/Status ====================
  const mutation = useMutation({
    mutationFn: async ({ userId, updates }) =>
      axiosSecure.patch(`/users/${userId}`, updates),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  // ==================== Handle Update ====================
  const handleUserUpdate = (user, updates) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(
          { userId: user._id, updates },
          {
            onSuccess: () => {
              Swal.fire({
                icon: "success",
                title: `${user.name} updated successfully`,
                showConfirmButton: false,
                timer: 1200,
              });
            },
            onError: (err) => {
              Swal.fire({
                icon: "error",
                title: "Failed to update user",
                text: err.response?.data?.message || err.message,
              });
            },
          }
        );
      }
    });
  };

  return (
    <div className="overflow-x-auto min-h-70vh md:w-[880px] lg:w-[1000px]">
      {/* Table */}
      <table className="table-zebra table table-md table-pin-rows table-pin-cols">
        <thead className="bg-base-200 dark:bg-gray-800">
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Blood Info</th>
            <th>
              Status{" "}
              <div className="dropdown mt-1">
                <label
                  tabIndex={0}
                  className="btn btn-xs m-1 flex items-center gap-1"
                >
                  <FaFilter />
                  {statusFilter && (
                    <span className="ml-1 px-2 py-0.5 rounded text-xs font-semibold ">
                      {statusFilter.charAt(0).toUpperCase() +
                        statusFilter.slice(1)}
                    </span>
                  )}
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32"
                >
                  <li>
                    <button
                      className={
                        statusFilter === "active"
                          ? "font-bold text-blue-600"
                          : ""
                      }
                      onClick={() => {
                        setCurrentPage(0);
                        setStatusFilter("active");
                      }}
                    >
                      Active
                    </button>
                  </li>
                  <li>
                    <button
                      className={
                        statusFilter === "blocked"
                          ? "font-bold text-red-600"
                          : ""
                      }
                      onClick={() => {
                        setCurrentPage(0);
                        setStatusFilter("blocked");
                      }}
                    >
                      Blocked
                    </button>
                  </li>
                  <li>
                    <button
                      className={
                        statusFilter === "" ? "font-bold text-gray-700" : ""
                      }
                      onClick={() => {
                        setCurrentPage(0);
                        setStatusFilter("");
                      }}
                    >
                      All
                    </button>
                  </li>
                </ul>
              </div>
            </th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {isLoading
            ? [...Array(5)].map((_, i) => <AllusersTableRow key={i} />)
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
                    <span className="badge badge-warning badge-sm text-white">
                      {user.bloodGroup}
                    </span>
                    <br />
                    <span className="text-sm opacity-70">
                      {user.upazila}, {user.district}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`badge ${user.status === "active" ? "badge-success text-white" : "badge-error text-white"}`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td>{user.role}</td>

                  <th className="flex flex-col items-center space-y-1">
                    {user.role === "donor" && (
                      <button
                        className="btn h-full w-full btn-info text-white btn-xs"
                        onClick={() =>
                          handleUserUpdate(user, {
                            role: "admin",
                            updated_at: new Date(),
                          })
                        }
                        disabled={user.status === "blocked"}
                      >
                        Make Admin
                      </button>
                    )}

                    {user.role === "admin" && (
                      <button
                        className="btn h-full w-full btn-warning text-white btn-xs"
                        onClick={() =>
                          handleUserUpdate(user, {
                            role: "volunteer",
                            updated_at: new Date(),
                          })
                        }
                        disabled={user.status === "blocked"}
                      >
                        Make Volunteer
                      </button>
                    )}

                    {user.role === "volunteer" && (
                      <button
                        className="btn h-full w-full btn-info text-white btn-xs"
                        onClick={() =>
                          handleUserUpdate(user, {
                            role: "admin",
                            updated_at: new Date(),
                          })
                        }
                        disabled={user.status === "blocked"}
                      >
                        Make Admin
                      </button>
                    )}

                    {user.status === "active" ? (
                      <button
                        className="btn h-full w-full btn-error text-white btn-xs"
                        onClick={() =>
                          handleUserUpdate(user, {
                            status: "blocked",
                            updated_at: new Date(),
                          })
                        }
                      >
                        Block
                      </button>
                    ) : (
                      <button
                        className="btn h-full w-full btn-success text-white btn-xs"
                        onClick={() =>
                          handleUserUpdate(user, {
                            status: "active",
                            updated_at: new Date(),
                          })
                        }
                      >
                        Unblock
                      </button>
                    )}
                  </th>
                </tr>
              ))}
        </tbody>
      </table>

      {/* ===== Pagination using Hook ===== */}
      <div className="flex justify-center flex-wrap gap-3 py-10">
        {currentPage > 0 && (
          <button onClick={goToPrevPage} className="btn">
            Prev
          </button>
        )}

        {[...Array(totalPages).keys()].map((i) => (
          <button
            key={i}
            onClick={() => goToPage(i)}
            className={`btn ${i === currentPage ? "btn-active" : ""}`}
          >
            {i + 1}
          </button>
        ))}

        {currentPage < totalPages - 1 && (
          <button onClick={goToNextPage} className="btn">
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

export default Allusers;
