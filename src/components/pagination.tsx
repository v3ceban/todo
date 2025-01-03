"use client";

import React from "react";

import {
  Pagination as PaginationContainer,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";

const Pagination = ({
  currentPage,
  setCurrentPage,
  maxPage,
}: {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  maxPage: number;
  usesLink?: boolean;
}) => {
  return (
    <PaginationContainer className="my-8">
      <PaginationContent className="grid grid-cols-3 w-full max-w-sm sm:w-fit place-items-stretch">
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              const newPage = Math.max(1, currentPage - 1);
              setCurrentPage(newPage);
              window.history.pushState({}, "", `/page/${newPage}`);
            }}
            aria-disabled={currentPage === 1}
            className={`w-full ${currentPage === 1 ? "cursor-not-allowed opacity-50 hover:bg-transparent" : ""}`}
          />
        </PaginationItem>
        <span className="text-center">
          {currentPage}/{maxPage}
        </span>
        <PaginationItem>
          <PaginationNext
            onClick={() => {
              const newPage = Math.min(maxPage, currentPage + 1);
              setCurrentPage(newPage);
              window.history.pushState({}, "", `/page/${newPage}`);
            }}
            aria-disabled={currentPage === maxPage}
            className={`w-full ${currentPage === maxPage ? "cursor-not-allowed opacity-50 hover:bg-transparent" : ""}`}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationContainer>
  );
};

export default Pagination;
