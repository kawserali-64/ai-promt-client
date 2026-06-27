"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
    Search,
    CheckCircle2,
    XCircle,
    Trash2,
    Star,
    FileText,
    Clock3,
    ShieldCheck,
    Sparkles,
    Eye,
} from "lucide-react";

const AllAdminPromptPage = () => {
    const router = useRouter();

    const [prompts, setPrompts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const fetchPrompts = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/prompts`
            );

            const data = await res.json();
            setPrompts(data);
        } catch {
            toast.error("Failed to load prompts");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPrompts();
    }, []);

    const handleApprove = async (id) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/prompts/${id}/approve`,
                { method: "PATCH" }
            );
            const data = await res.json();
            if (data.success) {
                toast.success("Prompt Approved");
                fetchPrompts();
            }
        } catch {
            toast.error("Approval Failed");
        }
    };

    const handleReject = async (id) => {
        const feedback = prompt("Enter rejection reason");
        if (!feedback) return;

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/prompts/${id}/reject`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ feedback }),
                }
            );

            const data = await res.json();
            if (data.success) {
                toast.success("Prompt Rejected");
                fetchPrompts();
            }
        } catch {
            toast.error("Reject Failed");
        }
    };

    const handleFeature = async (id, featured) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/prompts/${id}/feature`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ featured: !featured }),
                }
            );

            const data = await res.json();
            if (data.success) {
                toast.success(!featured ? "Added To Featured" : "Removed From Featured");
                fetchPrompts();
            }
        } catch {
            toast.error("Feature Update Failed");
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = confirm("Are you sure you want to delete this prompt?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/prompts/${id}`,
                { method: "DELETE" }
            );

            const data = await res.json();
            if (data.success) {
                toast.success("Prompt Deleted");
                fetchPrompts();
            }
        } catch {
            toast.error("Delete Failed");
        }
    };

    const filteredPrompts = useMemo(() => {
        return prompts.filter((prompt) => {
            const matchSearch =
                prompt.title?.toLowerCase().includes(search.toLowerCase()) ||
                prompt.category?.toLowerCase().includes(search.toLowerCase()) ||
                prompt.tool?.toLowerCase().includes(search.toLowerCase());

            const matchStatus =
                statusFilter === "all" ? true : prompt.status === statusFilter;

            return matchSearch && matchStatus;
        });
    }, [prompts, search, statusFilter]);

    const totalPrompts = prompts.length;
    const approved = prompts.filter((p) => p.status === "approved").length;
    const pending = prompts.filter((p) => p.status === "pending").length;
    const featured = prompts.filter((p) => p.featured).length;

    return (
        <div className="space-y-6 text-slate-200">

            {/* HEADER */}
            <div className="mb-8">
                <h1 className="text-3xl font-black text-white">
                    Prompt Template Submissions Moderation
                </h1>
                <p className="mt-2 text-slate-400">
                    Approve templates, reject with feedback, or tag featured highlights.
                </p>
            </div>

            {/* STATS */}
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {[
                    { title: "Total Prompts", val: totalPrompts, icon: <FileText /> },
                    { title: "Pending Review", val: pending, icon: <Clock3 />, color: "text-amber-400" },
                    { title: "Approved", val: approved, icon: <ShieldCheck />, color: "text-emerald-400" },
                    { title: "Featured", val: featured, icon: <Sparkles />, color: "text-blue-400" },
                ].map((item, i) => (
                    <div key={i} className="bg-[#0f172a] border border-slate-800 p-6 rounded-2xl">
                        <div className={`mb-2 ${item.color || "text-slate-400"}`}>{item.icon}</div>
                        <h2 className="text-3xl font-black">{item.val}</h2>
                        <p className="text-sm text-slate-500 uppercase tracking-wider">
                            {item.title}
                        </p>
                    </div>
                ))}
            </div>

            {/* FILTER */}
            <div className="bg-[#0f172a] border border-slate-800 p-4 rounded-2xl flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-3.5 text-slate-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search title, category or tool..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-[#0a0f1d] border border-slate-700 rounded-xl py-3 pl-11 text-sm outline-none focus:border-indigo-500"
                    />
                </div>

                <select
                    className="bg-[#0a0f1d] border border-slate-700 rounded-xl px-4 py-3 text-sm outline-none cursor-pointer"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            {/* TABLE */}
            <div className="bg-[#0f172a] border border-slate-800 rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">

                        <thead>
                            <tr className="border-b border-slate-800 text-slate-500 text-xs uppercase tracking-widest">
                                <th className="px-6 py-5">Template Title</th>
                                <th className="px-6 py-5">Creator</th>
                                <th className="px-6 py-5">AI Engine</th>
                                <th className="px-6 py-5">Visibility</th>
                                <th className="px-6 py-5">Featured</th>
                                <th className="px-6 py-5">Status</th>
                                <th className="px-6 py-5 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-800/50">
                            {loading ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-20">
                                        Loading...
                                    </td>
                                </tr>
                            ) : filteredPrompts.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-20">
                                        No Prompt Found
                                    </td>
                                </tr>
                            ) : (
                                filteredPrompts.map((prompt) => (
                                    <tr key={prompt._id} className="hover:bg-slate-900/30 transition-all">

                                        <td className="px-6 py-4">
                                            <h2 className="font-semibold text-white">{prompt.title}</h2>
                                            <p className="text-[10px] text-slate-500 uppercase">
                                                Category: {prompt.category}
                                            </p>
                                        </td>

                                        <td className="px-6 py-4">
                                            <p className="text-sm font-medium">{prompt.userName}</p>
                                            <p className="text-[10px] text-slate-500">
                                                {prompt.userEmail}
                                            </p>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className="bg-indigo-900/30 text-indigo-300 text-[10px] px-3 py-1 rounded-full border border-indigo-500/20 font-bold uppercase">
                                                {prompt.tool || "CHATGPT"}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-bold uppercase ${(prompt.visibility || "public") === "private"
                                                        ? "border-red-500/20 bg-red-900/20 text-red-400"
                                                        : "border-emerald-500/20 bg-emerald-900/20 text-emerald-400"
                                                    }`}
                                            >
                                                {(prompt.visibility || "public").charAt(0).toUpperCase() +
                                                    (prompt.visibility || "public").slice(1)}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleFeature(prompt._id, prompt.featured)}
                                                className={prompt.featured ? "text-amber-400" : "text-slate-600"}
                                            >
                                                <Star size={18} fill={prompt.featured ? "currentColor" : "none"} />
                                            </button>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span
                                                className={`text-[10px] font-bold px-3 py-1 rounded-full border uppercase ${prompt.status === "approved"
                                                    ? "bg-emerald-900/20 text-emerald-500 border-emerald-500/20"
                                                    : prompt.status === "rejected"
                                                        ? "bg-red-900/20 text-red-500 border-red-500/20"
                                                        : "bg-amber-900/20 text-amber-500 border-amber-500/20"
                                                    }`}
                                            >
                                                {prompt.status}
                                            </span>
                                        </td>

                                        {/* ACTIONS */}
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">

                                                {/* VIEW BUTTON ✅ */}
                                                <button
                                                    onClick={() =>
                                                        router.push(`/all-promt/${prompt?._id}`)}
                                                    className="text-slate-400 hover:text-white"
                                                >
                                                    <Eye size={18} />
                                                </button>

                                                <button
                                                    onClick={() => handleApprove(prompt._id)}
                                                    className="text-emerald-500 hover:text-emerald-400"
                                                >
                                                    <CheckCircle2 size={18} />
                                                </button>

                                                <button
                                                    onClick={() => handleReject(prompt._id)}
                                                    className="text-red-500 hover:text-red-400"
                                                >
                                                    <XCircle size={18} />
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(prompt._id)}
                                                    className="text-slate-600 hover:text-red-500"
                                                >
                                                    <Trash2 size={18} />
                                                </button>

                                            </div>
                                        </td>

                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllAdminPromptPage;