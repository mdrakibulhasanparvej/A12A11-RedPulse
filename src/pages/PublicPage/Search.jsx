import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Container from "../../components/ui/Container";
import useDistrictUpazila from "../../hooks/useDistrictUpazila";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const Search = () => {
  const axiosPublic = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  // ================= Pagination =================
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 10;
  const skip = currentPage * limit;

  // =================  SEARCH STATE =================
  const [bloodGroup, setBloodGroup] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);

  // =================  LOCATION HOOK =================
  const {
    districts,
    filteredUpazilas,
    selectedDistrict,
    selectedUpazila,
    setSelectedDistrict,
    setSelectedUpazila,
  } = useDistrictUpazila();

  // =================   DATA FETCH =================
  const { data, isLoading } = useQuery({
    queryKey: [
      "public-search",
      bloodGroup,
      selectedDistrict?.name,
      selectedUpazila?.name,
      skip,
    ],
    enabled: searchTriggered,
    queryFn: async () => {
      const res = await axiosPublic.get("/donation-request-all", {
        params: {
          status: "pending",
          bloodGroup,
          district: selectedDistrict?.name,
          upazila: selectedUpazila?.name,
          skip,
          limit,
        },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const requests = data?.requests || [];
  const totalRequests = data?.totalRequests || 0;
  const totalPage = Math.ceil(totalRequests / limit);

  // =================   HANDLERS =================
  const handleSearch = (e) => {
    e.preventDefault();
    if (!bloodGroup || !selectedDistrict || !selectedUpazila) return;
    setSearchTriggered(true);
  };

  const handleReset = () => {
    setBloodGroup("");
    setSelectedDistrict(null);
    setSelectedUpazila(null);
    setSearchTriggered(false);
  };

  const handleView = (id) => {
    if (!user) {
      navigate("/login", {
        state: { from: `/donation-request/${id}` },
      });
    } else {
      navigate(`/donation-request/${id}`);
    }
  };

  /* =======================
     LOADING SKELETON
  ======================= */
  const SkeletonCard = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow animate-pulse">
      <div className="h-4 bg-gray-300 dark:bg-gray-700 w-1/2 mb-3 rounded"></div>
      <div className="h-3 bg-gray-300 dark:bg-gray-700 w-full mb-2 rounded"></div>
      <div className="h-3 bg-gray-300 dark:bg-gray-700 w-3/4 mb-2 rounded"></div>
      <div className="h-8 bg-gray-300 dark:bg-gray-700 w-24 mt-4 rounded"></div>
    </div>
  );

  return (
    <Container>
      <div className="w-full mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-8">
          Search Blood Donation Requests
        </h2>

        {/* ================= SEARCH FORM ================= */}
        <form
          onSubmit={handleSearch}
          className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10 bg-white dark:bg-gray-800 p-5 rounded-xl shadow"
        >
          {/* Blood Group */}
          <select
            className="select select-bordered w-full"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
          >
            <option value="">Blood Group</option>
            {bloodGroups.map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>

          {/* District */}
          <select
            className="select select-bordered w-full"
            value={selectedDistrict?.id || ""}
            onChange={(e) =>
              setSelectedDistrict(districts.find((d) => d.id == e.target.value))
            }
          >
            <option value="">District</option>
            {districts.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          {/* Upazila */}
          <select
            className="select select-bordered w-full"
            value={selectedUpazila?.id || ""}
            onChange={(e) =>
              setSelectedUpazila(
                filteredUpazilas.find((u) => u.id == e.target.value)
              )
            }
            disabled={!selectedDistrict}
          >
            <option value="">Upazila</option>
            {filteredUpazilas.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>

          {/* Search */}
          <button
            type="submit"
            className="btn bg-linear-to-r from-[#6A0B37] to-[#B32346] text-white"
          >
            Search
          </button>

          {/* Reset */}
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-outline"
          >
            Reset
          </button>
        </form>

        <div className="min-h-screen">
          {/* ================= RESULT ================= */}
          {!searchTriggered && (
            <p className="text-center text-gray-500">
              Please search to see donation requests
            </p>
          )}

          {searchTriggered && isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {searchTriggered && !isLoading && requests.length === 0 && (
            <p className="text-center text-gray-500">
              No donation requests found
            </p>
          )}

          {searchTriggered && !isLoading && requests.length > 0 && (
            <>
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

                    <div className="grid grid-cols-2">
                      <p>
                        <b>Blood Group:</b> {req.bloodGroup}
                      </p>
                      <p>
                        <b>District:</b> {req.recipientDistrict}
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

              {/* ================= PAGINATION ================= */}
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
            </>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center flex-wrap gap-3 py-10">
        {currentPage > 0 && (
          <button onClick={() => setCurrentPage((p) => p - 1)} className="btn">
            Prev
          </button>
        )}

        {Array.from({ length: totalPage }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`btn ${i === currentPage ? "btn-primary" : ""}`}
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
    </Container>
  );
};

export default Search;
