
"use client";

import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const CreatorChart = ({ promptGrowth = [], data }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="mt-6 space-y-6">
      {/* ================= GROWTH ================= */}
      <div
        className={`p-5 sm:p-6 border rounded-2xl shadow-sm transition-colors duration-300 ${
          isDark
            ? "bg-slate-900 border-slate-800"
            : "bg-zinc-50 border-zinc-200"
        }`}
      >
        <div className="mb-4">
          <h2
            className={`text-lg sm:text-xl font-bold ${
              isDark ? "text-white" : "text-zinc-900"
            }`}
          >
            📈 Prompt Creation Growth
          </h2>

          <p
            className={`text-xs mt-1 ${
              isDark ? "text-slate-400" : "text-zinc-500"
            }`}
          >
            Track how your prompts are increasing over time
          </p>
        </div>

        <div className="w-full h-[260px] sm:h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={promptGrowth}>
              <defs>
                <linearGradient
                  id="growthFill"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#8b5cf6"
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="95%"
                    stopColor="#8b5cf6"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke={isDark ? "#1e293b" : "#e4e4e7"}
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="_id"
                stroke={isDark ? "#94a3b8" : "#52525b"}
                fontSize={12}
              />

              <YAxis
                stroke={isDark ? "#94a3b8" : "#52525b"}
                fontSize={12}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#0f172a" : "#ffffff",
                  border: isDark
                    ? "1px solid #334155"
                    : "1px solid #e4e4e7",
                  color: isDark ? "#ffffff" : "#18181b",
                  borderRadius: "8px",
                }}
                labelStyle={{
                  color: isDark ? "#ffffff" : "#18181b",
                }}
                itemStyle={{
                  color: isDark ? "#ffffff" : "#18181b",
                }}
              />

              <Area
                type="monotone"
                dataKey="count"
                stroke="#8b5cf6"
                fill="url(#growthFill)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* ================= SUMMARY ================= */}
        <div className="grid grid-cols-2 gap-3 mt-5">
          <div
            className={`p-4 rounded-xl border transition-colors duration-300 ${
              isDark
                ? "bg-slate-800 border-slate-700"
                : "bg-zinc-100 border-zinc-200"
            }`}
          >
            <p
              className={`text-xs ${
                isDark ? "text-slate-400" : "text-zinc-500"
              }`}
            >
              Total Prompts
            </p>

            <p
              className={`text-lg font-bold ${
                isDark ? "text-white" : "text-zinc-900"
              }`}
            >
              {data?.totalPrompts || 0}
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border transition-colors duration-300 ${
              isDark
                ? "bg-slate-800 border-slate-700"
                : "bg-zinc-100 border-zinc-200"
            }`}
          >
            <p
              className={`text-xs ${
                isDark ? "text-slate-400" : "text-zinc-500"
              }`}
            >
              Total Copies
            </p>

            <p
              className={`text-lg font-bold ${
                isDark ? "text-white" : "text-zinc-900"
              }`}
            >
              {data?.totalCopies || 0}
            </p>
          </div>
        </div>
      </div>

      {/* ================= ENGAGEMENT ================= */}
      <div
        className={`p-5 sm:p-6 border rounded-2xl shadow-sm transition-colors duration-300 ${
          isDark
            ? "bg-slate-900 border-slate-800"
            : "bg-zinc-50 border-zinc-200"
        }`}
      >
        <div className="mb-4">
          <h2
            className={`text-lg sm:text-xl font-bold ${
              isDark ? "text-white" : "text-zinc-900"
            }`}
          >
            📊 Engagement Overview
          </h2>

          <p
            className={`text-xs mt-1 ${
              isDark ? "text-slate-400" : "text-zinc-500"
            }`}
          >
            Copies vs Bookmarks vs Reviews performance
          </p>
        </div>

        <div className="w-full h-[260px] sm:h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                {
                  name: "Copies",
                  value: data?.totalCopies || 0,
                },
                {
                  name: "Bookmarks",
                  value: data?.totalBookmarks || 0,
                },
                {
                  name: "Reviews",
                  value: data?.totalReviews || 0,
                },
              ]}
            >
              <CartesianGrid
                stroke={isDark ? "#1e293b" : "#e4e4e7"}
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="name"
                stroke={isDark ? "#94a3b8" : "#52525b"}
                fontSize={12}
              />

              <YAxis
                stroke={isDark ? "#94a3b8" : "#52525b"}
                fontSize={12}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#0f172a" : "#ffffff",
                  border: isDark
                    ? "1px solid #334155"
                    : "1px solid #e4e4e7",
                  color: isDark ? "#ffffff" : "#18181b",
                  borderRadius: "8px",
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
                dataKey="value"
                fill="#22c55e"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CreatorChart;
