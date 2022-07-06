import React from "react";
import { FaSearch } from "react-icons/fa";

type Props = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchBar({ query, setQuery }: Props) {
  return (
    <div className="w-full border border-gray-400 rounded-xl flex justify-between items-center p-2">
      <FaSearch className="text-gray-400 ml-1" />
      <input
        type="text"
        name="Search"
        id="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full ml-4"
        placeholder="Search photos by topic or keyword"
      />
    </div>
  );
}
