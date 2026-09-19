"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useSession } from "@/lib/auth-client";
import { Card } from "@heroui/react";
import {
  Copy,
  Bookmark,
  MessageSquare,
  LayoutGrid,
} from "lucide-react";
import CreatorChart from "@/components/CreatorChart/page";

const CreatorHomePage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const { resolvedTheme } = useTheme();
  const { data: session, isPending: sessionLoading } = useSession();

  const userId = session?.user?.id;

  // Client hydration check
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  // Fetch analytics
  useEffect(() => {
    if (!userId) {
      if (!sessionLoading) setLoading(false);
      return;
    }

    const fetchAnalytics = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/creator/analytics?userId=${userId}`
        );

        const result = await res.json();
        setData(result?.data || null);
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [userId, sessionLoading]);

  // 1. Theme Flash / Hydration mismatch বন্ধ করার জন্য সেফ কনটেইনার
  if (!mounted) {
    return <div className="min-h-screen w-full opacity-0" />;
  }

  // 2. Loading state
  if (sessionLoading || loading || !data) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
          isDark ? "bg-[#050505]" : "bg-zinc-50"
        }`}
      >
        <div className="flex flex-col items-center justify-center">
          {/* LOADING ICON */}
          <div
            className={`relative flex items-center justify-center w-16 h-16 rounded-2xl border ${
              isDark
                ? "bg-[#0a0a0a] border-white/10"
                : "bg-white border-zinc-200 shadow-sm"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full border-4 border-t-transparent animate-spin ${
                isDark
                  ? "border-violet-500 border-t-transparent"
                  : "border-violet-600 border-t-transparent"
              }`}
            />
          </div>

          {/* LOADING TEXT */}
          <h2
            className={`mt-5 text-lg font-semibold ${
              isDark ? "text-white" : "text-zinc-900"
            }`}
          >
            Loading Analytics
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Preparing your dashboard...
          </p>

          {/* DOTS */}
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

  const stats = [
    {
      label: "Total Prompts",
      value: data?.totalPrompts ?? 0,
      icon: <LayoutGrid size={20} />,
      color: "text-blue-500",
    },
    {
      label: "Total Copies",
      value: data?.totalCopies ?? 0,
      icon: <Copy size={20} />,
      color: "text-emerald-500",
    },
    {
      label: "Total Bookmarks",
      value: data?.totalBookmarks ?? 0,
      icon: <Bookmark size={20} />,
      color: "text-violet-500",
    },
    {
      label: "Total Reviews",
      value: data?.totalReviews ?? 0,
      icon: <MessageSquare size={20} />,
      color: "text-yellow-500",
    },
  ];

  return (
    <div
      className={`p-8 space-y-8 min-h-screen transition-colors duration-300 ${
        isDark ? "bg-[#050505]" : "bg-zinc-50"
      }`}
    >
      {/* HEADER */}
      <h1
        className={`text-3xl font-black tracking-tight ${
          isDark ? "text-white" : "text-violet-600"
        }`}
      >
        Creator Dashboard
      </h1>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card
            key={idx}
            className={`p-6 rounded-[32px] flex flex-col gap-3 transition-colors duration-300 ${
              isDark
                ? "bg-[#0a0a0a] border border-white/5 shadow-none"
                : "bg-white border border-zinc-200 shadow-sm"
            }`}
          >
            <div
              className={`p-3 rounded-full w-fit ${
                isDark ? "bg-white/5" : "bg-zinc-100"
              } ${stat.color}`}
            >
              {stat.icon}
            </div>

            <div>
              <h3
                className={`text-sm font-bold uppercase tracking-wider ${
                  isDark ? "text-zinc-400" : "text-zinc-500"
                }`}
              >
                {stat.label}
              </h3>

              <p
                className={`text-4xl font-black mt-1 ${
                  isDark ? "text-white" : "text-zinc-900"
                }`}
              >
                {stat.value}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* CHART */}
      <div
        className={`border rounded-[32px] p-8 transition-colors duration-300 ${
          isDark
            ? "bg-[#0a0a0a] border-white/5"
            : "bg-white border-zinc-200"
        }`}
      >
        <CreatorChart
          promptGrowth={data?.promptGrowth}
          copyTrend={data?.copyTrend}
          data={data}
        />
      </div>
    </div>
  );
};

export default CreatorHomePage;