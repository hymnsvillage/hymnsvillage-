// components/SearchSection.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchSection() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="bg-white py-8 px-4 w-full">
      <div className="max-w-4xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="flex w-full border border-gray-300 rounded-full overflow-hidden shadow-sm"
        >
          <div className="flex items-center px-4 flex-grow">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search articles"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full py-2 outline-none text-sm placeholder-gray-500 bg-transparent"
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 text-sm font-medium rounded-full"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
}
