import React from "react";
import Pagination from "~/components/pagination";

export const usePagination = <T,>({
  current = 1,
  itemsPerPage = 9,
  items,
}: {
  current: number;
  itemsPerPage: number;
  items: T[];
}) => {
  const [currentPage, setCurrentPage] = React.useState(current);
  const maxPages = Math.ceil(items.length / itemsPerPage) || 1;

  React.useEffect(() => {
    if (currentPage > maxPages) {
      setCurrentPage(maxPages);
    }
  }, [currentPage, maxPages]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const itemsToShow = items.slice(indexOfFirstItem, indexOfLastItem);

  return {
    currentPage,
    setCurrentPage,
    maxPages,
    itemsToShow,
    Pagination,
  };
};
