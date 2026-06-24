"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import CreatorChart from "@/components/CreatorChart/page";

const CreatorHomePage = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const { data: session } = useSession();

    // ✅ REAL USER ID (FIXED)
    const userId = session?.user?.id;

    useEffect(() => {
        if (!userId) return;

        const fetchAnalytics = async () => {
            try {
                setLoading(true);

                const res = await fetch(
                    `http://localhost:5000/api/creator/analytics?userId=${userId}`
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
            <div className="p-6">
                <h2>Loading analytics...</h2>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">

            <h1 className="text-2xl font-bold">
                Creator Dashboard Analytics
            </h1>

            {/* CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                <div className="p-4 shadow rounded">
                    <h3>Total Prompts</h3>
                    <p className="text-2xl font-bold">{data.totalPrompts}</p>
                </div>

                <div className="p-4 shadow rounded">
                    <h3>Total Copies</h3>
                    <p className="text-2xl font-bold">{data.totalCopies}</p>
                </div>

                <div className="p-4 shadow rounded">
                    <h3>Total Bookmarks</h3>
                    <p className="text-2xl font-bold">{data.totalBookmarks}</p>
                </div>

                <div className="p-4 shadow rounded">
                    <h3>Total Reviews</h3>
                    <p className="text-2xl font-bold">{data.totalReviews}</p>
                </div>

            </div>
            <CreatorChart
                promptGrowth={data.promptGrowth}
                copyTrend={data.copyTrend}
                data={data}
            />
        </div>

    );
};

export default CreatorHomePage;