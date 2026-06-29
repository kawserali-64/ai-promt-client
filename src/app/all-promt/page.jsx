import PromptCard from "@/components/allpromt/PromptCard";
import SearchFilter from "@/components/allpromt/SearchFilter";
import { getPrompt } from "@/lib/api/prompt";
import Link from "next/link";

const sortOptions = [
  { label: "Latest", value: "latest" },
  { label: "Most Popular", value: "popular" },
  { label: "Most Copied", value: "copied" },
];

const createSortLink = (value, params) => {
  const query = new URLSearchParams(params);
  query.set("sort", value);
  query.delete("page");
  return `/all-promt?${query.toString()}`;
};

const createPageLink = (page, params) => {
  const query = new URLSearchParams(params);
  query.set("page", page);
  return `/all-promt?${query.toString()}`;
};

const AllPromptPage = async ({ searchParams }) => {
  const params = (await searchParams) || {};
  const page = Number(params.page || 1);
  const sort = params.sort || "latest";

  const cleanParams = {
    ...params,
    page,
    sort,
    limit: 9,
  };

  const data = await getPrompt(cleanParams);
  const prompts = data?.prompts || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className="p-6 bg-[#050505] min-h-screen text-white">
      <div className="max-w-7xl mx-auto">
        <SearchFilter />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 mt-6 gap-4">
          <h2 className="text-2xl font-black text-white/90">Browse Prompts</h2>

          {/* SORT */}
          <div className="flex gap-1.5 bg-[#0f0f0f] p-1.5 rounded-2xl border border-white/5">
            {sortOptions.map((item) => (
              <Link
                key={item.value}
                href={createSortLink(item.value, params)}
                className={`px-5 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                  sort === item.value
                    ? "bg-white text-black font-bold shadow-lg"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {prompts.map((p) => (
            <PromptCard key={p._id} prompt={p} />
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex gap-2 mt-16 justify-center">
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1;
            return (
              <Link
                key={pageNum}
                href={createPageLink(pageNum, params)}
                className={`w-11 h-11 flex items-center justify-center rounded-xl border transition-all duration-300 font-bold ${
                  pageNum === page
                    ? "bg-white text-black border-white"
                    : "border-white/5 bg-[#0f0f0f] text-zinc-500 hover:border-white/20 hover:text-white"
                }`}
              >
                {pageNum}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllPromptPage;