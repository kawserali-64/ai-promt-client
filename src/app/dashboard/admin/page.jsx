"use client";

import { useEffect, useState } from "react";
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

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/analytics`)
            .then((res) => res.json())
            .then((data) => {
                setAnalytics(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    const overview = analytics?.overview || {};
    const engineStats = analytics?.engineStats || [];

    return (
        <div className="space-y-8">

            {/* Header */}
            <div>
                <h1 className="text-4xl font-black text-white">
                    Administrative System Analytics
                </h1>

                <p className="text-slate-400 mt-2">
                    Aggregate metrics and engine distribution breakdowns.
                </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">

                <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-slate-400 text-sm">
                                Total Users
                            </p>
                            <h2 className="text-4xl font-black text-white mt-2">
                                {overview.totalUsers || 0}
                            </h2>
                        </div>

                        <FaUsers
                            className="text-indigo-400"
                            size={28}
                        />
                    </div>
                </div>

                <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-slate-400 text-sm">
                                Total Prompts
                            </p>
                            <h2 className="text-4xl font-black text-white mt-2">
                                {overview.totalPrompts || 0}
                            </h2>
                        </div>

                        <FaRobot
                            className="text-cyan-400"
                            size={28}
                        />
                    </div>
                </div>

                <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-slate-400 text-sm">
                                Total Reviews
                            </p>
                            <h2 className="text-4xl font-black text-white mt-2">
                                {overview.totalReviews || 0}
                            </h2>
                        </div>

                        <FaStar
                            className="text-yellow-400"
                            size={28}
                        />
                    </div>
                </div>

                <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-slate-400 text-sm">
                                Total Copies
                            </p>
                            <h2 className="text-4xl font-black text-white mt-2">
                                {overview.totalCopies || 0}
                            </h2>
                        </div>

                        <FaCopy
                            className="text-emerald-400"
                            size={28}
                        />
                    </div>
                </div>

                <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-slate-400 text-sm">
                                Total Revenue
                            </p>
                            <h2 className="text-4xl font-black text-emerald-400 mt-2">
                                $
                                {(
                                    overview.totalRevenue || 0
                                ).toFixed(2)}
                            </h2>
                        </div>

                        <FaDollarSign
                            className="text-green-400"
                            size={28}
                        />
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                {/* Bar Chart */}
                <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-6">

                    <h2 className="text-xl font-bold text-white mb-6">
                        Engine Prompts Density vs Total Copies
                    </h2>

                    <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={engineStats}>
                                <XAxis dataKey="engine" />
                                <YAxis />
                                <Tooltip />
                                <Legend />

                                <Bar
                                    dataKey="promptCount"
                                    name="Prompts"
                                    fill="#6366f1"
                                />

                                <Bar
                                    dataKey="totalCopies"
                                    name="Copies"
                                    fill="#10b981"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart */}
                <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-6">

                    <h2 className="text-xl font-bold text-white mb-6">
                        Prompt Distribution Share
                    </h2>

                    <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>

                                <Pie
                                    data={engineStats}
                                    dataKey="promptCount"
                                    nameKey="engine"
                                    outerRadius={120}
                                    label
                                >
                                    {engineStats.map((entry, index) => (
                                        <Cell
                                            key={index}
                                            fill={
                                                COLORS[
                                                index % COLORS.length
                                                ]
                                            }
                                        />
                                    ))}
                                </Pie>

                                <Tooltip />
                                <Legend />

                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHomePage;