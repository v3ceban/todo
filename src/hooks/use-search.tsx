import React from "react";
import SearchBar from "~/components/search-bar";

export const useSearch = <T,>({
  data,
  query,
  field,
  caseSensitive = false,
}: {
  data: T[];
  query: string;
  field?: keyof T;
  caseSensitive?: boolean;
}) => {
  const [searchResults, setSearchResults] = React.useState(data);

  React.useEffect(() => {
    if (!query) {
      setSearchResults(data);
      return;
    }
    setSearchResults(
      data.filter((item) => {
        const searchObject = (() => {
          if (typeof item === "object" && item !== null) {
            const value =
              field && item[field] ? item[field] : JSON.stringify(item);
            return caseSensitive
              ? String(value).trim()
              : String(value).trim().toLowerCase();
          }
          return caseSensitive
            ? String(item).trim()
            : String(item).trim().toLowerCase();
        })();
        const searchQuery = caseSensitive
          ? query.trim()
          : query.trim().toLowerCase();
        return searchObject.includes(searchQuery);
      }),
    );
  }, [query, data, field, caseSensitive]);

  return {
    searchResults,
    SearchBar,
  };
};
