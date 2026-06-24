"use client";

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
    Legend
} from "recharts";

const CreatorChart = ({ promptGrowth = [], data }) => {
    return (
        <div className="mt-6 space-y-6">

            {/* ================= GROWTH ================= */}
            <div className="p-5 sm:p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-sm">

                <div className="mb-4">
                    <h2 className="text-lg sm:text-xl font-bold text-white">
                        📈 Prompt Creation Growth
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                        Track how your prompts are increasing over time
                    </p>
                </div>

                <div className="w-full h-[260px] sm:h-[320px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={promptGrowth}>

                            <defs>
                                <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                </linearGradient>
                            </defs>

                            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                            <XAxis dataKey="_id" stroke="#94a3b8" fontSize={12} />
                            <YAxis stroke="#94a3b8" fontSize={12} />

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#0f172a",
                                    border: "1px solid #334155",
                                    color: "#fff"
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

                {/* SUMMARY */}
                <div className="grid grid-cols-2 gap-3 mt-5">

                    <div className="p-4 rounded-xl bg-slate-800 border border-slate-700">
                        <p className="text-xs text-slate-400">Total Prompts</p>
                        <p className="text-lg font-bold text-white">
                            {data?.totalPrompts || 0}
                        </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-800 border border-slate-700">
                        <p className="text-xs text-slate-400">Total Copies</p>
                        <p className="text-lg font-bold text-white">
                            {data?.totalCopies || 0}
                        </p>
                    </div>

                </div>
            </div>

            {/* ================= ENGAGEMENT ================= */}
            <div className="p-5 sm:p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-sm">

                <div className="mb-4">
                    <h2 className="text-lg sm:text-xl font-bold text-white">
                        📊 Engagement Overview
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                        Copies vs Bookmarks vs Reviews performance
                    </p>
                </div>

                <div className="w-full h-[260px] sm:h-[320px]">
                    <ResponsiveContainer width="100%" height="100%">

                        <BarChart
                            data={[
                                {
                                    name: "Copies",
                                    value: data?.totalCopies || 0
                                },
                                {
                                    name: "Bookmarks",
                                    value: data?.totalBookmarks || 0
                                },
                                {
                                    name: "Reviews",
                                    value: data?.totalReviews || 0
                                }
                            ]}
                        >

                            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />

                            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                            <YAxis stroke="#94a3b8" fontSize={12} />

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#0f172a",
                                    border: "1px solid #334155",
                                    color: "#fff"
                                }}
                            />

                            <Legend />

                            <Bar dataKey="value" fill="#22c55e" radius={[6, 6, 0, 0]} />

                        </BarChart>

                    </ResponsiveContainer>
                </div>

            </div>

        </div>
    );
};

export default CreatorChart;