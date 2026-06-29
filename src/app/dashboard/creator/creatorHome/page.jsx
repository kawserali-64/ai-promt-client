"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { Card } from "@heroui/react";
import { BarChart3, Copy, Bookmark, MessageSquare, LayoutGrid } from "lucide-react";
import CreatorChart from "@/components/CreatorChart/page";

const CreatorHomePage = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { data: session } = useSession();

    const userId = session?.user?.id;

    useEffect(() => {
        if (!userId) return;

        const fetchAnalytics = async () => {
            try {
                setLoading(true);
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/creator/analytics?userId=${userId}`
                );
                const result = await res.json();
                setData(result.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, [userId]);

    if (loading || !data) {
        return (
            <div className="min-h-screen flex items-center justify-center text-zinc-500 font-bold">
                Loading analytics...
            </div>
        );
    }

    // এনালিটিক্স কার্ডের কনফিগ
    const stats = [
        { label: "Total Prompts", value: data.totalPrompts, icon: <LayoutGrid size={20} />, color: "text-blue-500" },
        { label: "Total Copies", value: data.totalCopies, icon: <Copy size={20} />, color: "text-emerald-500" },
        { label: "Total Bookmarks", value: data.totalBookmarks, icon: <Bookmark size={20} />, color: "text-violet-500" },
        { label: "Total Reviews", value: data.totalReviews, icon: <MessageSquare size={20} />, color: "text-yellow-500" },
    ];

    return (
        <div className="p-8 space-y-8 bg-[#050505] min-h-screen">
            <h1 className="text-3xl font-black text-white tracking-tight">Creator Dashboard</h1>

            {/* CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <Card key={idx} className="p-6 bg-[#0a0a0a] border border-white/5 rounded-[32px] shadow-none flex flex-col gap-3">
                        <div className={`p-3 rounded-full w-fit bg-white/5 ${stat.color}`}>
                            {stat.icon}
                        </div>
                        <div>
                            <h3 className="text-zinc-500 text-sm font-bold uppercase tracking-wider">{stat.label}</h3>
                            <p className="text-4xl font-black text-white mt-1">{stat.value}</p>
                        </div>
                    </Card>
                ))}
            </div>

            {/* CHART */}
            <div className="bg-[#0a0a0a] border border-white/5 rounded-[32px] p-8">
                <CreatorChart
                    promptGrowth={data.promptGrowth}
                    copyTrend={data.copyTrend}
                    data={data}
                />
            </div>
        </div>
    );
};

export default CreatorHomePage;