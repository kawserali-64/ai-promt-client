"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { Card, Button } from "@heroui/react";
import {
  Star,
  Eye,
  MessageSquare,
  Calendar,
  Bot,
} from "lucide-react";
import { getReviews } from "@/lib/api/prompt";
import Link from "next/link";
import { useTheme } from "next-themes";

const MyReviewPage = () => {
  const { data: session, isPending } = useSession();
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Client hydration check
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  useEffect(() => {
    const loadReviews = async () => {
      if (!session?.user?.id) return;

      try {
        setLoading(true);
        const data = await getReviews({
          userId: session.user.id,
        });

        // API response থেকে reviews array নেওয়া
        setReviews(
          Array.isArray(data)
            ? data
            : data?.reviews || []
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (!isPending && session?.user?.id) {
      loadReviews();
    }

    if (!isPending && !session?.user?.id) {
      setLoading(false);
    }
  }, [session, isPending]);

  // Theme flash / Hydration mismatch এড়ানোর জন্য
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
            Loading Your Reviews
          </h2>

          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Fetching your feedback history...
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
      className={`min-h-screen p-4 md:p-8 transition-colors duration-300 ${
        isDark ? "bg-[#050505]" : "bg-zinc-50"
      }`}
    >
      {/* =========================
          HEADER
      ========================= */}

      <div className="mb-10">
        <h1
          className={`text-4xl font-black tracking-tight ${
            isDark ? "text-white" : "text-violet-600"
          }`}
        >
          My Reviews
        </h1>

        <p
          className={`mt-2 ${
            isDark ? "text-zinc-400" : "text-zinc-500"
          }`}
        >
          Manage and track all your feedback history.
        </p>
      </div>

      {/* =========================
          EMPTY STATE
      ========================= */}

      {reviews.length === 0 ? (
        <Card
          className={`p-16 text-center border rounded-[32px] transition-colors duration-300 ${
            isDark
              ? "bg-[#0a0a0a] border-white/5 shadow-none"
              : "bg-white border-zinc-200 shadow-sm"
          }`}
        >
          <MessageSquare
            className={`mx-auto mb-4 ${
              isDark ? "text-zinc-700" : "text-zinc-300"
            }`}
            size={48}
          />

          <p
            className={`font-medium ${
              isDark ? "text-zinc-400" : "text-zinc-500"
            }`}
          >
            No reviews submitted yet
          </p>
        </Card>
      ) : (
        /* =========================
            REVIEWS
        ========================= */

        <div className="grid gap-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className={`group border p-6 rounded-[24px] transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                isDark
                  ? "bg-[#0a0a0a] border-white/5 hover:border-violet-500/30"
                  : "bg-white border-zinc-200 hover:border-violet-500/30"
              }`}
            >
              {/* =========================
                  INFO SECTION
              ========================= */}

              <div className="flex-1">
                <h3
                  className={`text-lg font-bold transition-colors ${
                    isDark
                      ? "text-white group-hover:text-violet-400"
                      : "text-zinc-900 group-hover:text-violet-600"
                  }`}
                >
                  {review.promptTitle}
                </h3>

                <div
                  className={`flex items-center gap-4 mt-3 text-xs font-bold uppercase tracking-wider ${
                    isDark ? "text-zinc-500" : "text-zinc-500"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Bot size={14} />
                    {review.aiTool}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    {review.createdAt
                      ? new Date(review.createdAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              </div>

              {/* =========================
                  COMMENT
              ========================= */}

              <div
                className={`md:max-w-[300px] text-sm italic ${
                  isDark ? "text-zinc-400" : "text-zinc-500"
                }`}
              >
                &quot;{review.comment}&quot;
              </div>

              {/* =========================
                  RATING + ACTION
              ========================= */}

              <div className="flex items-center gap-6">
                {/* Rating */}

                <div className="flex items-center gap-1.5 text-yellow-500 font-black">
                  <Star
                    size={16}
                    fill="currentColor"
                  />

                  <span>
                    {review.rating}.0
                  </span>
                </div>

                {/* View Prompt */}

                <Link
                  href={`/all-promt/${review.promptId}`}
                >
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold border-0 shadow-md shadow-violet-500/20 hover:from-violet-700 hover:to-purple-700 hover:shadow-violet-500/30 transition-all duration-200"
                    startContent={<Eye size={14} />}
                  >
                    View Prompt
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviewPage;