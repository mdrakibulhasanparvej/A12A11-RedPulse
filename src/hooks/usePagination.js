import { useState, useMemo, useEffect } from "react";

/**
 * usePagination Hook
 * Handles dynamic totalItems and page navigation
 */
const usePagination = ({
  totalItems = 0,
  itemsPerPage = 10,
  initialPage = 0,
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalCount, setTotalCount] = useState(totalItems);

  // Update totalCount if totalItems changes dynamically
  useEffect(() => {
    setTotalCount(totalItems);
  }, [totalItems]);

  const totalPages = useMemo(
    () => Math.ceil(totalCount / itemsPerPage),
    [totalCount, itemsPerPage]
  );

  const goToNextPage = () =>
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  const goToPrevPage = () =>
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  const goToPage = (page) =>
    page >= 0 && page < totalPages && setCurrentPage(page);

  const skip = currentPage * itemsPerPage;

  return {
    currentPage,
    totalPages,
    goToNextPage,
    goToPrevPage,
    goToPage,
    setCurrentPage,
    skip,
    limit: itemsPerPage,
    totalCount, // optional: for reference
  };
};

export default usePagination;
