"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
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
  const [mounted, setMounted] = useState(false);

  const { resolvedTheme } = useTheme();

  // Component mount হওয়া নিশ্চিতকরণ
  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchPrompts = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/prompts`
      );

      const data = await res.json();
      setPrompts(Array.isArray(data) ? data : []);
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
        {
          method: "PATCH",
        }
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
          headers: {
            "Content-Type": "application/json",
          },
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
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            featured: !featured,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success(
          !featured
            ? "Added To Featured"
            : "Removed From Featured"
        );

        fetchPrompts();
      }
    } catch {
      toast.error("Feature Update Failed");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/prompts/${id}`,
        {
          method: "DELETE",
        }
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
      const searchText = search.toLowerCase();

      const matchSearch =
        prompt.title?.toLowerCase().includes(searchText) ||
        prompt.category?.toLowerCase().includes(searchText) ||
        prompt.tool?.toLowerCase().includes(searchText);

      const matchStatus =
        statusFilter === "all"
          ? true
          : prompt.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [prompts, search, statusFilter]);

  const isDark = resolvedTheme === "dark";

  // Hydration theme flash প্রতিরোধ করতে transparent background dynamic style
  if (!mounted) {
    return (
      <div className="min-h-screen bg-transparent p-6 space-y-8 animate-pulse">
        <div className="h-10 w-64 bg-zinc-200 dark:bg-zinc-800/50 rounded-lg" />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-28 bg-zinc-100 dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/5 rounded-2xl"
            />
          ))}
        </div>
        <div className="h-14 bg-zinc-100 dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/5 rounded-2xl" />
        <div className="h-96 bg-zinc-100 dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/5 rounded-2xl" />
      </div>
    );
  }

  const totalPrompts = prompts.length;

  const approved = prompts.filter(
    (p) => p.status === "approved"
  ).length;

  const pending = prompts.filter(
    (p) => p.status === "pending"
  ).length;

  const featured = prompts.filter(
    (p) => p.featured
  ).length;

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
            Loading Prompts
          </h2>

          <p
            className={`mt-1 text-sm ${
              isDark ? "text-zinc-500" : "text-zinc-500"
            }`}
          >
            Preparing template moderation...
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

  return (
    <div
      className={`space-y-8 p-6 min-h-screen transition-colors duration-300 ${
        isDark ? "bg-[#050505]" : "bg-zinc-50"
      }`}
    >
      {/* HEADER */}
      <div>
        <h1
          className={`text-3xl font-bold tracking-tight ${
            isDark ? "text-white" : "text-violet-600"
          }`}
        >
          Prompt Template Moderation
        </h1>

        <p
          className={`mt-2 ${
            isDark ? "text-zinc-400" : "text-zinc-500"
          }`}
        >
          Approve templates, reject with feedback, or tag
          featured highlights.
        </p>
      </div>

      {/* STATS */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: "Total Prompts",
            val: totalPrompts,
            icon: FileText,
            color: "text-indigo-500",
          },
          {
            title: "Pending Review",
            val: pending,
            icon: Clock3,
            color: "text-amber-500",
          },
          {
            title: "Approved",
            val: approved,
            icon: ShieldCheck,
            color: "text-emerald-500",
          },
          {
            title: "Featured",
            val: featured,
            icon: Sparkles,
            color: "text-blue-500",
          },
        ].map((item, i) => (
          <div
            key={i}
            className={`border p-6 rounded-2xl ${
              isDark
                ? "bg-[#0a0a0a] border-white/5 shadow-xl"
                : "bg-white border-zinc-200 shadow-sm"
            }`}
          >
            <item.icon
              className={`mb-3 ${item.color}`}
              size={24}
            />

            <h2
              className={`text-3xl font-bold ${
                isDark
                  ? "text-white"
                  : "text-zinc-900"
              }`}
            >
              {item.val}
            </h2>

            <p
              className={`text-xs uppercase tracking-widest mt-1 ${
                isDark
                  ? "text-zinc-400"
                  : "text-zinc-500"
              }`}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {/* FILTER */}
      <div
        className={`border p-4 rounded-2xl flex flex-col lg:flex-row gap-4 ${
          isDark
            ? "bg-[#0a0a0a] border-white/5"
            : "bg-white border-zinc-200"
        }`}
      >
        <div className="relative flex-1">
          <Search
            className={`absolute left-4 top-3.5 ${
              isDark
                ? "text-zinc-600"
                : "text-zinc-400"
            }`}
            size={18}
          />

          <input
            type="text"
            placeholder="Search title, category or tool..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full border rounded-xl py-3 pl-11 text-sm outline-none focus:border-indigo-500 transition ${
              isDark
                ? "bg-[#0f0f0f] border-white/10 text-white placeholder:text-zinc-600"
                : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400"
            }`}
          />
        </div>

        <select
          className={`border rounded-xl px-4 py-3 text-sm outline-none cursor-pointer focus:border-indigo-500 transition ${
            isDark
              ? "bg-[#0f0f0f] border-white/10 text-white"
              : "bg-zinc-50 border-zinc-200 text-zinc-900"
          }`}
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* TABLE */}
      <div
        className={`border rounded-2xl overflow-hidden ${
          isDark
            ? "bg-[#0a0a0a] border-white/5 shadow-2xl"
            : "bg-white border-zinc-200 shadow-sm"
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr
                className={`border-b text-[10px] uppercase tracking-widest ${
                  isDark
                    ? "border-white/5 text-zinc-400"
                    : "border-zinc-200 text-zinc-500"
                }`}
              >
                <th className="px-6 py-5">
                  Template Title
                </th>

                <th className="px-6 py-5">
                  Creator
                </th>

                <th className="px-6 py-5">
                  AI Engine
                </th>

                <th className="px-6 py-5">
                  Visibility
                </th>

                <th className="px-6 py-5">
                  Featured
                </th>

                <th className="px-6 py-5">
                  Status
                </th>

                <th className="px-6 py-5 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody
              className={`divide-y ${
                isDark
                  ? "divide-white/5"
                  : "divide-zinc-100"
              }`}
            >
              {filteredPrompts.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className={`text-center py-20 ${
                      isDark
                        ? "text-zinc-400"
                        : "text-zinc-500"
                    }`}
                  >
                    No Prompt Found
                  </td>
                </tr>
              ) : (
                filteredPrompts.map((prompt) => (
                  <tr
                    key={prompt._id}
                    className={`transition-colors ${
                      isDark
                        ? "hover:bg-white/[0.02]"
                        : "hover:bg-zinc-50"
                    }`}
                  >
                    {/* TITLE */}
                    <td className="px-6 py-4">
                      <h2
                        className={`font-medium text-sm ${
                          isDark
                            ? "text-zinc-200"
                            : "text-zinc-800"
                        }`}
                      >
                        {prompt.title}
                      </h2>

                      <p
                        className={`text-[10px] uppercase mt-0.5 ${
                          isDark
                            ? "text-zinc-600"
                            : "text-zinc-400"
                        }`}
                      >
                        Category: {prompt.category}
                      </p>
                    </td>

                    {/* CREATOR */}
                    <td className="px-6 py-4">
                      <p
                        className={`text-sm ${
                          isDark
                            ? "text-zinc-300"
                            : "text-zinc-700"
                        }`}
                      >
                        {prompt.userName}
                      </p>

                      <p
                        className={`text-[10px] ${
                          isDark
                            ? "text-zinc-600"
                            : "text-zinc-400"
                        }`}
                      >
                        {prompt.userEmail}
                      </p>
                    </td>

                    {/* AI ENGINE */}
                    <td className="px-6 py-4">
                      <span className="bg-indigo-500/10 text-indigo-600 text-[10px] px-2.5 py-0.5 rounded-full border border-indigo-500/20 font-bold uppercase">
                        {prompt.tool || "CHATGPT"}
                      </span>
                    </td>

                    {/* VISIBILITY */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                          (prompt.visibility ||
                            "public") === "private"
                            ? "border-red-500/20 bg-red-500/10 text-red-500"
                            : "border-emerald-500/20 bg-emerald-500/10 text-emerald-600"
                        }`}
                      >
                        {prompt.visibility || "public"}
                      </span>
                    </td>

                    {/* FEATURED */}
                    <td className="px-6 py-4">
                      <button
                        onClick={() =>
                          handleFeature(
                            prompt._id,
                            prompt.featured
                          )
                        }
                        className={`transition ${
                          prompt.featured
                            ? "text-amber-400"
                            : isDark
                            ? "text-zinc-700"
                            : "text-zinc-300"
                        }`}
                      >
                        <Star
                          size={16}
                          fill={
                            prompt.featured
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </button>
                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-4">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase ${
                          prompt.status === "approved"
                            ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                            : prompt.status === "rejected"
                            ? "bg-red-500/10 text-red-500 border-red-500/20"
                            : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                        }`}
                      >
                        {prompt.status}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() =>
                            router.push(
                              `/all-promt/${prompt?._id}`
                            )
                          }
                          className={`transition ${
                            isDark
                              ? "text-zinc-500 hover:text-white"
                              : "text-zinc-400 hover:text-zinc-900"
                          }`}
                        >
                          <Eye size={16} />
                        </button>

                        <button
                          onClick={() =>
                            handleApprove(prompt._id)
                          }
                          className="text-emerald-500 hover:text-emerald-400 transition"
                        >
                          <CheckCircle2 size={16} />
                        </button>

                        <button
                          onClick={() =>
                            handleReject(prompt._id)
                          }
                          className="text-red-500 hover:text-red-400 transition"
                        >
                          <XCircle size={16} />
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(prompt._id)
                          }
                          className={`transition ${
                            isDark
                              ? "text-zinc-600 hover:text-red-500"
                              : "text-zinc-400 hover:text-red-500"
                          }`}
                        >
                          <Trash2 size={16} />
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