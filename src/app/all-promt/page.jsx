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
  const resolvedParams = await searchParams;
  const params = resolvedParams || {};

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
    <div className="p-6 sm:p-10 bg-zinc-50 dark:bg-[#050505] min-h-screen text-zinc-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto">

        {/* SearchFilter Component */}
        <SearchFilter />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 mt-8 gap-4">
          {/* ব্রাউজ প্রম্পট হেডিং: লাইট মোডে গাঢ় কালো, ডার্ক মোডে সাদা */}
          <h2 className="text-2xl font-black tracking-tight">
            <span className="!text-zinc-900 dark:!text-white">Browse </span>
            <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
              Prompts
            </span>
          </h2>

          {/* SORT TABS: সার্চ বাটনের স্টাইলের সাথে মিলিয়ে ভায়োলেট করা হলো */}
          <div className="flex gap-1.5 bg-zinc-200/70 dark:bg-[#0f0f0f] p-1.5 rounded-2xl border border-zinc-300/60 dark:border-white/5">
            {sortOptions.map((item) => (
              <Link
                key={item.value}
                href={createSortLink(item.value, params)}
                className={`px-5 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${sort === item.value
                    ? "bg-violet-600 text-white font-semibold shadow-[0_0_15px_rgba(124,58,237,0.4)]"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* GRID */}
        {prompts.length === 0 ? (
          <div className="text-center text-zinc-500 py-16 bg-white dark:bg-[#0f0f0f] rounded-3xl border border-zinc-200 dark:border-white/5">
            No prompts found matching your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {prompts.map((p) => (
              <PromptCard key={p._id} prompt={p} />
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex gap-2 mt-16 justify-center">
            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNum = i + 1;
              return (
                <Link
                  key={pageNum}
                  href={createPageLink(pageNum, params)}
                  className={`w-11 h-11 flex items-center justify-center rounded-xl border transition-all duration-300 font-bold ${pageNum === page
                      ? "bg-violet-600 text-white border-violet-600 shadow-[0_0_15px_rgba(124,58,237,0.4)]"
                      : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400 hover:text-zinc-900 dark:border-white/5 dark:bg-[#0f0f0f] dark:text-zinc-400 dark:hover:border-white/20 dark:hover:text-white"
                    }`}
                >
                  {pageNum}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPromptPage;