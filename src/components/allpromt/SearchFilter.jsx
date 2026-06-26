"use client";

import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);

    if (search.trim()) {
      params.set("search", search.trim());
    } else {
      params.delete("search");
    }

    // নতুন search দিলে page reset হবে
    params.delete("page");

    router.push(`/all-promt?${params.toString()}`);
  };

  const clearSearch = () => {
    setSearch("");

    const params = new URLSearchParams(searchParams);
    params.delete("search");
    params.delete("page");

    router.push(`/all-promt?${params.toString()}`);
  };

  return (
    <div className="mb-8">
      <h2 className="mb-2 text-2xl font-bold text-white">
        Search Prompts
      </h2>

      <p className="mb-5 text-sm text-zinc-400">
        Search prompt by title.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="relative">
          {/* Search Icon */}
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          {/* Input */}
          <input
            type="text"
            placeholder="Search prompt title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-zinc-900 py-4 pl-12 pr-36 text-white outline-none transition-all duration-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
          />

          {/* Clear Button */}
          {search && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-28 top-1/2 -translate-y-1/2 rounded-lg p-2 text-zinc-400 hover:bg-white/10 hover:text-white"
            >
              <X size={18} />
            </button>
          )}

          {/* Search Button */}
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-violet-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-violet-700"
          >
            Search
          </button>
        </div>
      </form>

      {/* Current Search */}
      {searchParams.get("search") && (
        <div className="mt-4 flex items-center gap-2 text-sm text-zinc-400">
          <span>Searching for:</span>

          <span className="rounded-full bg-violet-600/20 px-3 py-1 text-violet-300">
            {searchParams.get("search")}
          </span>
        </div>
      )}
    </div>
  );
}