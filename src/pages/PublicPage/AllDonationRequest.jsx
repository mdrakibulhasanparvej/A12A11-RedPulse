import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import usePagination from "../../hooks/usePagination";
import Container from "../../components/ui/Container";

const AllDonationRequest = () => {
  const axiosPublic = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch data
  const { data, isLoading } = useQuery({
    queryKey: ["pending-donation-requests"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/donation-request-all?status=pending&skip=0&limit=10`
      );
      return res.data;
    },
  });

  const requests = data?.requests || [];
  const totalRequests = data?.totalRequests || 0;

  // pagination MUST use totalRequests
  const {
    currentPage,
    totalPages,
    goToNextPage,
    goToPrevPage,
    goToPage,
    skip,
    limit,
  } = usePagination({
    totalItems: data?.totalRequests ?? 0,
    itemsPerPage: 10,
  });

  // refetch when page changes
  const { data: paginatedData } = useQuery({
    queryKey: ["pending-donation-requests", skip],
    enabled: totalRequests > 0,
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/donation-request-all?status=pending&skip=${skip}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const finalRequests = paginatedData?.requests || requests;

  const handleView = (id) => {
    if (!user) {
      navigate("/login", {
        state: { from: `/donation-request/${id}` },
      });
    } else {
      navigate(`/donation-request/${id}`);
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <Container>
      <div className="w-full  mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-8">Blood Donation Requests</h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {finalRequests.map((req) => (
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
              <div className="grid grid-cols-2">
                <p>
                  <b>Blood Group:</b> {req.bloodGroup}
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
                className="btn btn-sm bg-linear-to-r from-[#6A0B37] to-[#B32346] hover:bg-red-800 text-white mt-3"
              >
                View
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            <button
              className="btn"
              onClick={goToPrevPage}
              disabled={currentPage === 0}
            >
              Prev
            </button>

            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={
                  page === currentPage
                    ? "font-bold btn bg-linear-to-r from-[#6A0B37]/90 to-[#B32346]/90 text-white"
                    : "btn"
                }
              >
                {page + 1}
              </button>
            ))}

            <button
              className="btn"
              onClick={goToNextPage}
              disabled={currentPage === totalPages - 1}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default AllDonationRequest;
