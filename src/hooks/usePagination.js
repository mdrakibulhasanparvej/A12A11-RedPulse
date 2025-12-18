import { useState, useMemo } from "react";

/**
 * usePagination Hook
 * @param {Array} data - The full array of items to paginate
 * @param {number} itemsPerPage - Number of items per page
 * @param {number} initialPage - Starting page index
 */
const usePagination = ({
  totalItems = 0,
  itemsPerPage = 10,
  initialPage = 0,
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = useMemo(
    () => Math.ceil(totalItems / itemsPerPage),
    [totalItems, itemsPerPage]
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
  };
};

export default usePagination;
