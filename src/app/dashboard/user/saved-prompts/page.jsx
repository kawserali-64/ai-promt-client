"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Button } from "@heroui/react";
import { getBookmarks, toggleBookmark } from "@/lib/api/prompt";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { Trash2, ExternalLink, Bookmark } from "lucide-react";
import { useTheme } from "next-themes";

const SavedPromptsPage = () => {
  const router = useRouter();
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: session, isPending } = useSession();
  const userId = session?.user?.id;

  // Client-side hydration নিশ্চিত করার জন্য mount check
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  const fetchSaved = async () => {
    try {
      setLoading(true);

      const res = await getBookmarks(userId);

      setData(
        Array.isArray(res) ? res : res?.data || []
      );
    } catch (error) {
      toast.error("Failed to load saved prompts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isPending && userId) {
      fetchSaved();
    }

    if (!isPending && !userId) {
      setLoading(false);
    }
  }, [userId, isPending]);

  const handleRemove = (promptId) => {
    const backup = data;

    setData((prev) =>
      prev.filter((item) => item.prompt?._id !== promptId)
    );

    toast.success("Removed from saved library");

    toggleBookmark({
      userId,
      promptId,
    }).catch(() => {
      setData(backup);
      toast.error("Action failed. Reverting...");
    });
  };

  // Theme mismatch / flash রোধ করার জন্য হাইড্রেশন না হওয়া পর্যন্ত একটি ফাকা ডিভ রিটার্ন করবে
  if (!mounted) {
    return <div className="min-h-screen w-full" />;
  }

  /* =========================
      LOADING STATE
  ========================= */

  if (isPending || loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
          isDark ? "bg-[#050505]" : "bg-zinc-50"
        }`}
      >
        <div className="flex flex-col items-center justify-center">
          <div
            className={`relative flex items-center justify-center w-16 h-16 rounded-2xl border ${
              isDark
                ? "bg-[#0a0a0a] border-white/10"
                : "bg-white border-zinc-200 shadow-sm"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full border-4 border-t-transparent animate-spin ${
                isDark ? "border-violet-500" : "border-violet-600"
              }`}
            />
          </div>

          <h2
            className={`mt-5 text-lg font-semibold ${
              isDark ? "text-white" : "text-zinc-900"
            }`}
          >
            Loading Saved Library
          </h2>

          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Fetching your bookmarked prompts...
          </p>

          <div className="flex gap-1.5 mt-4">
            <span
              className={`w-1.5 h-1.5 rounded-full animate-bounce ${
                isDark ? "bg-violet-500" : "bg-violet-600"
              }`}
            />
            <span
              className={`w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:150ms] ${
                isDark ? "bg-violet-500" : "bg-violet-600"
              }`}
            />
            <span
              className={`w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:300ms] ${
                isDark ? "bg-violet-500" : "bg-violet-600"
              }`}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`p-4 md:p-8 min-h-screen transition-colors duration-300 ${
        isDark ? "bg-[#050505] text-white" : "bg-zinc-50 text-zinc-900"
      }`}
    >
      <div className="max-w-5xl mx-auto">
        {/* =========================
            HEADER
        ========================= */}

        <div className="mb-10">
          <h1
            className={`text-4xl font-black tracking-tight mb-2 ${
              isDark ? "text-white" : "text-violet-600"
            }`}
          >
            Saved Library
          </h1>

          <p
            className={
              isDark ? "text-zinc-400" : "text-zinc-500"
            }
          >
            Curated prompts you&apos;ve saved for later use.
          </p>
        </div>

        {/* =========================
            EMPTY STATE
        ========================= */}

        {data.length === 0 ? (
          <div
            className={`flex flex-col items-center justify-center py-20 rounded-[32px] border transition-colors duration-300 ${
              isDark
                ? "bg-[#0a0a0a] border-white/5"
                : "bg-white border-zinc-200"
            }`}
          >
            <div className="w-20 h-20 bg-violet-500/10 rounded-full flex items-center justify-center mb-6">
              <Bookmark
                size={32}
                className="text-violet-500"
              />
            </div>

            <h2
              className={`text-xl font-bold ${
                isDark ? "text-white" : "text-zinc-900"
              }`}
            >
              No Saved Prompts
            </h2>

            <p
              className={`mt-2 ${
                isDark ? "text-zinc-400" : "text-zinc-500"
              }`}
            >
              Explore and bookmark your favorites.
            </p>
          </div>
        ) : (
          /* =========================
              SAVED PROMPTS
          ========================= */

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.map((item) => (
              <Card
                key={item._id}
                className={`p-6 border hover:border-violet-500/30 transition-all rounded-[24px] ${
                  isDark
                    ? "bg-[#0a0a0a] border-white/5 shadow-none"
                    : "bg-white border-zinc-200 shadow-sm"
                }`}
              >
                {/* Card Header */}

                <div className="flex justify-between items-start mb-4">
                  <div className="min-w-0">
                    <h2
                      className={`text-lg font-bold truncate ${
                        isDark ? "text-white" : "text-zinc-900"
                      }`}
                    >
                      {item.prompt?.title}
                    </h2>

                    <span className="text-[11px] uppercase tracking-wider font-bold text-violet-600 dark:text-violet-400 mt-1 block">
                      {item.prompt?.category} •{" "}
                      {item.prompt?.tool}
                    </span>
                  </div>

                  {/* Copy Count */}

                  <div
                    className={`shrink-0 px-2 py-1 rounded-lg text-[10px] font-bold ${
                      isDark
                        ? "bg-white/5 text-zinc-400"
                        : "bg-zinc-100 text-zinc-500"
                    }`}
                  >
                    {item.prompt?.copyCount || 0} COPIES
                  </div>
                </div>

                {/* Card Actions */}

                <div
                  className={`flex gap-3 mt-auto pt-4 border-t ${
                    isDark ? "border-white/5" : "border-zinc-200"
                  }`}
                >
                  {/* View */}

                  <Button
                    variant="flat"
                    className="flex-1 font-bold bg-gradient-to-r from-violet-600 to-purple-600 text-white border-0 shadow-md shadow-violet-500/20 hover:from-violet-700 hover:to-purple-700 hover:shadow-violet-500/30 transition-all duration-200"
                    onClick={() =>
                      router.push(
                        `/all-promt/${item.prompt?._id}`
                      )
                    }
                    startContent={
                      <ExternalLink size={16} />
                    }
                  >
                    View
                  </Button>

                  {/* Remove */}

                  <Button
                    variant="bordered"
                    className={`border hover:border-red-500/50 hover:text-red-500 ${
                      isDark
                        ? "border-white/10 text-zinc-300"
                        : "border-zinc-300 text-zinc-700"
                    }`}
                    onClick={() =>
                      handleRemove(item.prompt?._id)
                    }
                    startContent={
                      <Trash2 size={16} />
                    }
                  >
                    Remove
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedPromptsPage;