"use client"

import { useSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";


const DashboardHomePage = () => {
    const { data: session, isPending } = useSession()
    const user = session?.user;

    if (isPending) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="w-8 h-8 border-2 border-white/10 rounded-full animate-spin border-t-white"></div>
                <p className="text-zinc-500 text-sm font-medium tracking-wide">Loading...</p>
            </div>
        );
    }
    if (user?.role === 'User') {
        redirect('/dashboard/user/profile');
    }

    if (user?.role === 'Creator') {
        redirect('/dashboard/creator/my-prompt')
    }

    if (user?.role === 'Admin') {
        redirect('/dashboard/admin')
    }

    return (
        <div>
            <h1>Dashboard Home</h1>
        </div>
    );
};

export default DashboardHomePage;