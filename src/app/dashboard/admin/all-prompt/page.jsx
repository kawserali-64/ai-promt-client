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
        <div className="space-y-8 p-6 bg-[#050505] min-h-screen">
            {/* HEADER */}
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Prompt Template Moderation</h1>
                <p className="text-zinc-500 mt-2">Approve templates, reject with feedback, or tag featured highlights.</p>
            </div>

            {/* STATS */}
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {[
                    { title: "Total Prompts", val: totalPrompts, icon: FileText },
                    { title: "Pending Review", val: pending, icon: Clock3, color: "text-amber-400" },
                    { title: "Approved", val: approved, icon: ShieldCheck, color: "text-emerald-400" },
                    { title: "Featured", val: featured, icon: Sparkles, color: "text-blue-400" },
                ].map((item, i) => (
                    <div key={i} className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl shadow-xl">
                        <item.icon className={`mb-3 ${item.color || "text-zinc-500"}`} size={24} />
                        <h2 className="text-3xl font-bold text-white">{item.val}</h2>
                        <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">{item.title}</p>
                    </div>
                ))}
            </div>

            {/* FILTER */}
            <div className="bg-[#0a0a0a] border border-white/5 p-4 rounded-2xl flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-3.5 text-zinc-600" size={18} />
                    <input
                        type="text"
                        placeholder="Search title, category or tool..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-[#0f0f0f] border border-white/10 rounded-xl py-3 pl-11 text-sm text-white outline-none focus:border-indigo-500 transition"
                    />
                </div>
                <select
                    className="bg-[#0f0f0f] border border-white/10 text-white rounded-xl px-4 py-3 text-sm outline-none cursor-pointer focus:border-indigo-500 transition"
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
            <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 text-zinc-500 text-[10px] uppercase tracking-widest">
                                <th className="px-6 py-5">Template Title</th>
                                <th className="px-6 py-5">Creator</th>
                                <th className="px-6 py-5">AI Engine</th>
                                <th className="px-6 py-5">Visibility</th>
                                <th className="px-6 py-5">Featured</th>
                                <th className="px-6 py-5">Status</th>
                                <th className="px-6 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-20 text-zinc-500">Loading...</td>
                                </tr>
                            ) : filteredPrompts.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-20 text-zinc-500">No Prompt Found</td>
                                </tr>
                            ) : (
                                filteredPrompts.map((prompt) => (
                                    <tr key={prompt._id} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-4">
                                            <h2 className="font-medium text-zinc-200 text-sm">{prompt.title}</h2>
                                            <p className="text-[10px] text-zinc-600 uppercase mt-0.5">Category: {prompt.category}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-zinc-300">{prompt.userName}</p>
                                            <p className="text-[10px] text-zinc-600">{prompt.userEmail}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="bg-indigo-500/10 text-indigo-400 text-[10px] px-2.5 py-0.5 rounded-full border border-indigo-500/20 font-bold uppercase">
                                                {prompt.tool || "CHATGPT"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase ${(prompt.visibility || "public") === "private" ? "border-red-500/20 bg-red-500/10 text-red-400" : "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"}`}>
                                                {prompt.visibility || "public"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => handleFeature(prompt._id, prompt.featured)} className={prompt.featured ? "text-amber-400" : "text-zinc-700"}>
                                                <Star size={16} fill={prompt.featured ? "currentColor" : "none"} />
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase ${prompt.status === "approved" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : prompt.status === "rejected" ? "bg-red-500/10 text-red-500 border-red-500/20" : "bg-amber-500/10 text-amber-500 border-amber-500/20"}`}>
                                                {prompt.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-3">
                                                <button onClick={() => router.push(`/all-promt/${prompt?._id}`)} className="text-zinc-500 hover:text-white transition"><Eye size={16} /></button>
                                                <button onClick={() => handleApprove(prompt._id)} className="text-emerald-500 hover:text-emerald-400 transition"><CheckCircle2 size={16} /></button>
                                                <button onClick={() => handleReject(prompt._id)} className="text-red-500 hover:text-red-400 transition"><XCircle size={16} /></button>
                                                <button onClick={() => handleDelete(prompt._id)} className="text-zinc-600 hover:text-red-500 transition"><Trash2 size={16} /></button>
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