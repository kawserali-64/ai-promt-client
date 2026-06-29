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

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#06b6d4", "#8b5cf6"];

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

    // কার্ডের স্টাইল একই রাখার জন্য একটি ভেরিয়েবল
    const cardStyle = "bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 shadow-xl";

    return (
        <div className="space-y-8 p-6 bg-[#050505] min-h-screen">
            <div>
                <h1 className="text-4xl font-bold text-white tracking-tight">Administrative System Analytics</h1>
                <p className="text-zinc-500 mt-2">Aggregate metrics and engine distribution breakdowns.</p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">
                {[
                    { title: "Total Users", val: overview.totalUsers, icon: FaUsers, color: "text-indigo-400" },
                    { title: "Total Prompts", val: overview.totalPrompts, icon: FaRobot, color: "text-cyan-400" },
                    { title: "Total Reviews", val: overview.totalReviews, icon: FaStar, color: "text-yellow-400" },
                    { title: "Total Copies", val: overview.totalCopies, icon: FaCopy, color: "text-emerald-400" },
                    { title: "Total Revenue", val: `$ ${(overview.totalRevenue || 0).toFixed(2)}`, icon: FaDollarSign, color: "text-green-400" },
                ].map((item, idx) => (
                    <div key={idx} className={cardStyle}>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-zinc-400 text-sm">{item.title}</p>
                                <h2 className="text-3xl font-bold text-white mt-2">{item.val || 0}</h2>
                            </div>
                            <item.icon className={item.color} size={24} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className={cardStyle}>
                    <h2 className="text-lg font-semibold text-white mb-6">Engine Density vs Copies</h2>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={engineStats}>
                                <XAxis dataKey="engine" stroke="#52525b" fontSize={12} />
                                <YAxis stroke="#52525b" fontSize={12} />
                                <Tooltip contentStyle={{ backgroundColor: "#0a0a0a", borderRadius: "12px", border: "1px solid #ffffff10" }} />
                                <Legend />
                                <Bar dataKey="promptCount" name="Prompts" fill="#6366f1" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="totalCopies" name="Copies" fill="#10b981" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className={cardStyle}>
                    <h2 className="text-lg font-semibold text-white mb-6">Prompt Distribution Share</h2>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={engineStats} dataKey="promptCount" nameKey="engine" outerRadius={100} label>
                                    {engineStats.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: "#0a0a0a", borderRadius: "12px", border: "1px solid #ffffff10" }} />
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