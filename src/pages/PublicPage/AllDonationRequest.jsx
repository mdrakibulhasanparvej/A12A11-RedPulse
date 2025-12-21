import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Container from "../../components/ui/Container";
import { useState } from "react";
import Pagination from "../../components/Shared/Pagination";
import useTitle from "../../hooks/useTitle";

const AllDonationRequest = () => {
  useTitle("Donation Request");

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  // ================= Pagination =================
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 10;
  const skip = currentPage * limit;

  // ================= Fetch Data =================
  const { data, isLoading } = useQuery({
    queryKey: ["pending-donation-requests", skip, limit],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donation-request-all?status=pending&limit=${limit}&skip=${skip}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const requests = data?.requests || [];
  const totalRequests = data?.totalRequests || 0;
  const totalPage = Math.ceil(totalRequests / limit);

  const handleView = (id) => {
    if (!user) {
      navigate("/login", {
        state: { from: `/donation-request/${id}` },
      });
    } else {
      navigate(`/donation-request/${id}`);
    }
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <Container>
      <div className="w-full mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-8">
          Blood Donation Requests ({totalRequests})
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm"
            >
              <div className="flex justify-between">
                <p>
                  <b>Recipient:</b> {req.recipientName}
                </p>
                <p className="bg-linear-to-r from-[#6A0B37]/90 to-[#B32346]/90 text-white px-3 text-sm py-1 rounded-xl">
                  {req.status}
                </p>
              </div>

              <div className="grid grid-cols-2 mt-2 text-sm">
                <p>
                  <b>Blood:</b> {req.bloodGroup}
                </p>
                <p>
                  <b>Location:</b> {req.recipientDistrict}
                </p>
                <p>
                  <b>Date:</b> {req.donationDate}
                </p>
                <p>
                  <b>Time:</b> {req.donationTime}
                </p>
              </div>

              <button
                onClick={() => handleView(req._id)}
                className="btn btn-sm bg-linear-to-r from-[#6A0B37] to-[#B32346] text-white mt-3"
              >
                View
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          totalPage={totalPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </Container>
  );
};

export default AllDonationRequest;
