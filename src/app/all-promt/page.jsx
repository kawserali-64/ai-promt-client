import PromptCard from "@/components/allpromt/PromptCard";
import SearchFilter from "@/components/allpromt/SearchFilter";
import { getPrompt } from "@/lib/api/prompt";
import Link from "next/link";

const sortOptions = [
  { label: "Latest", value: "latest" },
  { label: "Most Popular", value: "popular" },
  { label: "Most Copied", value: "copied" },
];

// ================= LINK BUILDER =================
const createSortLink = (value, params) => {
  const query = new URLSearchParams(params);

  query.set("sort", value);
  query.delete("page"); // sort change করলে page reset

  return `/all-promt?${query.toString()}`;
};

// ================= PAGINATION LINK =================
const createPageLink = (page, params) => {
  const query = new URLSearchParams(params);

  query.set("page", page);

  return `/all-promt?${query.toString()}`;
};

// ================= PAGE =================
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
    <div className="p-6 bg-[#0a0a0a] min-h-screen text-white">
      <SearchFilter />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">

        {/* SORT */}
        <div className="flex gap-2 flex-wrap bg-white/5 p-2 rounded-xl border border-white/10">

          {sortOptions.map((item) => (
            <Link
              key={item.value}
              href={createSortLink(item.value, params)}
              className={`px-3 py-1.5 text-sm rounded-md border transition ${
                sort === item.value
                  ? "bg-violet-600 border-violet-400"
                  : "bg-transparent border-white/10 hover:bg-white/10"
              }`}
            >
              {item.label}
            </Link>
          ))}

        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prompts.map((p) => (
          <PromptCard key={p._id} prompt={p} />
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex gap-2 mt-10 justify-center">

        {Array.from({ length: totalPages }).map((_, i) => {
          const pageNum = i + 1;

          return (
            <Link
              key={pageNum}
              href={createPageLink(pageNum, params)}
              className={`px-3 py-1 rounded border ${
                pageNum === page
                  ? "bg-violet-600 border-violet-400"
                  : "border-white/20 hover:bg-white/10"
              }`}
            >
              {pageNum}
            </Link>
          );
        })}

      </div>

    </div>
  );
};

export default AllPromptPage;