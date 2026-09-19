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
      {/* হেডিং */}
      <h2 className="text-2xl md:text-4xl font-black tracking-tight">
        <span className="!text-zinc-900 dark:!text-white">Search </span>
        <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
          Prompts
        </span>
      </h2>

      <p className="mb-5 text-sm text-zinc-500 dark:text-zinc-400">
        Search prompt by title.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="relative">
          {/* Search Icon */}
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
          />

          {/* Input: text-zinc-950 light মোডের জন্য, dark:text-white dark মোডের জন্য জোরপূর্বক সেট করা হলো */}
          <input
            type="text"
            placeholder="Search prompt title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ color: 'inherit' }}
            className="w-full rounded-2xl border border-zinc-200 bg-white py-4 pl-12 pr-36 text-zinc-950 placeholder:text-zinc-400 shadow-sm outline-none transition-all duration-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-white/10 dark:bg-[#0f0f0f] dark:text-white dark:placeholder:text-zinc-500"
          />

          {/* Clear Button */}
          {search && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-28 top-1/2 -translate-y-1/2 rounded-lg p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <X size={18} />
            </button>
          )}

          {/* Search Button */}
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-violet-700"
          >
            Search
          </button>
        </div>
      </form>

      {/* Current Search */}
      {searchParams.get("search") && (
        <div className="mt-4 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <span>Searching for:</span>

          <span className="rounded-full bg-violet-100 dark:bg-violet-600/20 px-3 py-1 text-violet-700 dark:text-violet-300 font-medium">
            {searchParams.get("search")}
          </span>
        </div>
      )}
    </div>
  );
}