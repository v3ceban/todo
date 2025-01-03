"use client";

import React from "react";
import { Input } from "~/components/ui/input";
import { LuSearch } from "react-icons/lu";
import { FaCircleXmark } from "react-icons/fa6";
import { cn } from "~/lib/utils";

const SearchBar = ({
  query,
  setQuery,
  className,
  ...props
}: {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
}) => {
  return (
    <form
      {...props}
      className={cn(`my-4 sm:max-w-xs`, className)}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      {query.length > 0 ? (
        <FaCircleXmark
          className="absolute right-4 top-1/2 opacity-50 -translate-y-1/2 cursor-pointer hover:opacity-90"
          onClick={() => setQuery("")}
        />
      ) : (
        <LuSearch className="absolute right-4 top-1/2 opacity-50 -translate-y-1/2" />
      )}
      <Input
        type="text"
        placeholder="Search"
        accessKey="f"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setQuery("");
          }
        }}
      />
    </form>
  );
};

export default SearchBar;
