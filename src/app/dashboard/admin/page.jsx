"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  FaUsers,
  FaRobot,
  FaCopy,
  FaStar,
  FaDollarSign,
} from "react-icons/fa";

const COLORS = [
  "#6366f1",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#06b6d4",
  "#8b5cf6",
];

const AdminHomePage = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const { resolvedTheme } = useTheme();

  // Client hydration check
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/analytics`)
      .then((res) => res.json())
      .then((data) => {
        setAnalytics(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // 1. Hydration Mismatch & Theme Flash প্রতিরোধ
  if (!mounted) {
    return <div className="min-h-screen w-full opacity-0" />;
  }

  // 2. Loading State
  if (loading) {
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

          <p
            className={`mt-1 text-sm ${
              isDark ? "text-zinc-500" : "text-zinc-500"
            }`}
          >
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

  const overview = analytics?.overview || {};
  const engineStats = analytics?.engineStats || [];

  const cards = [
    {
      title: "Total Users",
      val: overview.totalUsers,
      icon: FaUsers,
      color: "text-indigo-500",
    },
    {
      title: "Total Prompts",
      val: overview.totalPrompts,
      icon: FaRobot,
      color: "text-cyan-500",
    },
    {
      title: "Total Reviews",
      val: overview.totalReviews,
      icon: FaStar,
      color: "text-yellow-500",
    },
    {
      title: "Total Copies",
      val: overview.totalCopies,
      icon: FaCopy,
      color: "text-emerald-500",
    },
    {
      title: "Total Revenue",
      val: `$ ${(overview.totalRevenue || 0).toFixed(2)}`,
      icon: FaDollarSign,
      color: "text-green-500",
    },
  ];

  return (
    <div
      className={`space-y-8 p-6 min-h-screen transition-colors duration-300 ${
        isDark ? "bg-[#050505]" : "bg-zinc-50"
      }`}
    >
      {/* HEADER */}
      <div>
        <h1
          className={`text-4xl font-bold tracking-tight ${
            isDark ? "text-white" : "text-violet-600"
          }`}
        >
          Administrative System Analytics
        </h1>

        <p
          className={`mt-2 ${
            isDark ? "text-zinc-400" : "text-zinc-500"
          }`}
        >
          Aggregate metrics and engine distribution breakdowns.
        </p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">
        {cards.map((item, idx) => (
          <div
            key={idx}
            className={`border rounded-2xl p-6 transition-colors duration-300 ${
              isDark
                ? "bg-[#0a0a0a] border-white/5 shadow-xl"
                : "bg-white border-zinc-200 shadow-sm"
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p
                  className={`text-sm ${
                    isDark ? "text-zinc-400" : "text-zinc-500"
                  }`}
                >
                  {item.title}
                </p>

                <h2
                  className={`text-3xl font-bold mt-2 ${
                    isDark ? "text-white" : "text-zinc-900"
                  }`}
                >
                  {item.val || 0}
                </h2>
              </div>

              <item.icon className={item.color} size={24} />
            </div>
          </div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* BAR CHART */}
        <div
          className={`border rounded-2xl p-6 transition-colors duration-300 ${
            isDark
              ? "bg-[#0a0a0a] border-white/5 shadow-xl"
              : "bg-white border-zinc-200 shadow-sm"
          }`}
        >
          <h2
            className={`text-lg font-semibold mb-6 ${
              isDark ? "text-white" : "text-zinc-900"
            }`}
          >
            Engine Density vs Copies
          </h2>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engineStats}>
                <XAxis
                  dataKey="engine"
                  stroke={isDark ? "#94a3b8" : "#52525b"}
                  fontSize={12}
                />

                <YAxis
                  stroke={isDark ? "#94a3b8" : "#52525b"}
                  fontSize={12}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? "#0a0a0a" : "#ffffff",
                    borderRadius: "12px",
                    border: isDark
                      ? "1px solid #ffffff10"
                      : "1px solid #e4e4e7",
                    color: isDark ? "#ffffff" : "#18181b",
                  }}
                  labelStyle={{
                    color: isDark ? "#ffffff" : "#18181b",
                  }}
                  itemStyle={{
                    color: isDark ? "#ffffff" : "#18181b",
                  }}
                />

                <Legend
                  wrapperStyle={{
                    color: isDark ? "#ffffff" : "#18181b",
                  }}
                />

                <Bar
                  dataKey="promptCount"
                  name="Prompts"
                  fill="#6366f1"
                  radius={[4, 4, 0, 0]}
                />

                <Bar
                  dataKey="totalCopies"
                  name="Copies"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PIE CHART */}
        <div
          className={`border rounded-2xl p-6 transition-colors duration-300 ${
            isDark
              ? "bg-[#0a0a0a] border-white/5 shadow-xl"
              : "bg-white border-zinc-200 shadow-sm"
          }`}
        >
          <h2
            className={`text-lg font-semibold mb-6 ${
              isDark ? "text-white" : "text-zinc-900"
            }`}
          >
            Prompt Distribution Share
          </h2>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={engineStats}
                  dataKey="promptCount"
                  nameKey="engine"
                  outerRadius={100}
                  label
                >
                  {engineStats.map((_, i) => (
                    <Cell
                      key={i}
                      fill={COLORS[i % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? "#0a0a0a" : "#ffffff",
                    borderRadius: "12px",
                    border: isDark
                      ? "1px solid #ffffff10"
                      : "1px solid #e4e4e7",
                    color: isDark ? "#ffffff" : "#18181b",
                  }}
                  labelStyle={{
                    color: isDark ? "#ffffff" : "#18181b",
                  }}
                  itemStyle={{
                    color: isDark ? "#ffffff" : "#18181b",
                  }}
                />

                <Legend
                  wrapperStyle={{
                    color: isDark ? "#ffffff" : "#18181b",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;