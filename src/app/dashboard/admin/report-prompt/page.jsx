"use client";

import { useEffect, useState } from "react";
import { Card, Button } from "@heroui/react";
import { toast } from "react-toastify";
import {
  AlertTriangle,
  Trash2,
  ShieldCheck,
  Eye,
  RefreshCcw,
  MessageSquare,
  Clock,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const AdminReportPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [mounted, setMounted] = useState(false);

  const { resolvedTheme } = useTheme();

  // Component Mount নিশ্চিতকরণ
  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchReports = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/admin/reported-prompts`);
      const data = await res.json();

      setReports(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleDismiss = async (id) => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/prompts/${id}/dismiss-reports`,
        {
          method: "PATCH",
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Reports cleared");
        fetchReports();
      }
    } catch {
      toast.error("Failed to dismiss reports");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/api/prompts/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Prompt deleted");
        setDeleteConfirm(null);
        fetchReports();
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  const isDark = resolvedTheme === "dark";

  // Hydration theme flash বন্ধ করার জন্য Skeleton Loader
  if (!mounted) {
    return (
      <div className="p-8 max-w-6xl mx-auto space-y-8 min-h-screen bg-transparent animate-pulse">
        <div className="flex justify-between items-end pb-6 border-b border-zinc-200 dark:border-white/5">
          <div className="space-y-3">
            <div className="h-8 w-60 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
            <div className="h-4 w-80 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
          </div>
          <div className="h-10 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
        </div>

        <div className="grid gap-4">
          <div className="h-44 bg-zinc-100 dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/5 rounded-2xl" />
          <div className="h-44 bg-zinc-100 dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/5 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
          isDark ? "bg-[#050505]" : "bg-zinc-50"
        }`}
      >
        <div className="flex flex-col items-center justify-center">
          {/* LOADING ICON CONTAINER */}
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
            Loading Reports
          </h2>

          <p
            className={`mt-1 text-sm ${
              isDark ? "text-zinc-500" : "text-zinc-500"
            }`}
          >
            Fetching content moderation queue...
          </p>

          {/* BOUNCING DOTS */}
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
      className={`p-8 max-w-6xl mx-auto space-y-8 min-h-screen transition-colors duration-300 ${
        isDark
          ? "bg-[#050505] text-slate-200"
          : "bg-zinc-50 text-zinc-900"
      }`}
    >
      {/* HEADER */}
      <div
        className={`flex justify-between items-end border-b pb-6 ${
          isDark ? "border-white/5" : "border-zinc-200"
        }`}
      >
        <div>
          <h1
            className={`text-3xl font-black flex items-center gap-3 ${
              isDark ? "text-white" : "text-zinc-900"
            }`}
          >
            <div className="p-2 bg-red-500/10 rounded-xl">
              <AlertTriangle className="text-red-500" />
            </div>

            Reported Prompts
          </h1>

          <p
            className={`mt-2 ${
              isDark ? "text-slate-400" : "text-zinc-500"
            }`}
          >
            Manage user flags and content moderation queue.
          </p>
        </div>

        <Button
          onClick={() => {
            setLoading(true);
            fetchReports();
          }}
          variant="flat"
          className={`border transition-colors ${
            isDark
              ? "bg-[#0a0a0a] border-white/10 text-white hover:bg-slate-900"
              : "bg-zinc-100 border-zinc-200 text-zinc-700 hover:bg-zinc-200"
          }`}
          startContent={<RefreshCcw size={16} />}
        >
          Refresh Data
        </Button>
      </div>

      {/* CONTENT */}
      {reports.length === 0 ? (
        <div
          className={`text-center py-20 rounded-3xl border border-dashed transition-colors ${
            isDark
              ? "bg-[#0a0a0a] border-white/5"
              : "bg-white border-zinc-200"
          }`}
        >
          <p className={isDark ? "text-slate-400" : "text-zinc-500"}>
            No reported prompts found.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {reports.map((item) => (
            <Card
              key={item._id}
              className={`p-6 border rounded-2xl shadow-sm transition-colors ${
                isDark
                  ? "bg-[#0a0a0a] border-white/5 shadow-none"
                  : "bg-white border-zinc-200"
              }`}
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h2
                    className={`text-xl font-bold mb-1 ${
                      isDark ? "text-white" : "text-zinc-900"
                    }`}
                  >
                    {item.title}
                  </h2>

                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-red-500 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                    <AlertTriangle size={10} />
                    {item.reportCount} ACTIVE REPORTS
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="flat"
                    color="primary"
                    startContent={<Eye size={14} />}
                    onClick={() => setSelectedPrompt(item)}
                  >
                    View
                  </Button>

                  <Button
                    size="sm"
                    variant="flat"
                    color="success"
                    startContent={<ShieldCheck size={14} />}
                    onClick={() => handleDismiss(item._id)}
                  >
                    Dismiss
                  </Button>

                  <Button
                    size="sm"
                    variant="flat"
                    color="danger"
                    startContent={<Trash2 size={14} />}
                    onClick={() => setDeleteConfirm(item)}
                  >
                    Delete
                  </Button>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {item.reports?.slice(0, 2).map((r, i) => (
                  <div
                    key={i}
                    className={`flex gap-3 text-sm p-4 rounded-xl border ${
                      isDark
                        ? "bg-black/40 border-white/5"
                        : "bg-zinc-50 border-zinc-200"
                    }`}
                  >
                    <MessageSquare
                      size={16}
                      className={`shrink-0 mt-0.5 ${
                        isDark ? "text-slate-600" : "text-zinc-400"
                      }`}
                    />

                    <div>
                      <p
                        className={
                          isDark ? "text-slate-300" : "text-zinc-700"
                        }
                      >
                        <span
                          className={
                            isDark ? "text-slate-500" : "text-zinc-500"
                          }
                        >
                          Reason:
                        </span>{" "}
                        {r.reason}
                      </p>

                      <p
                        className={`text-xs mt-0.5 ${
                          isDark ? "text-slate-500" : "text-zinc-500"
                        }`}
                      >
                        {r.message || "No message provided."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* VIEW MODAL */}
      {selectedPrompt && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div
            className={`border p-8 rounded-3xl w-[500px] max-w-full shadow-2xl transition-colors ${
              isDark
                ? "bg-[#0a0a0a] border-white/10"
                : "bg-white border-zinc-200"
            }`}
          >
            <div className="flex justify-between items-start gap-4">
              <h2
                className={`text-2xl font-bold mb-2 ${
                  isDark ? "text-white" : "text-zinc-900"
                }`}
              >
                {selectedPrompt.title}
              </h2>

              <button
                onClick={() => setSelectedPrompt(null)}
                className={`transition ${
                  isDark
                    ? "text-slate-500 hover:text-white"
                    : "text-zinc-400 hover:text-zinc-900"
                }`}
              >
                <X size={20} />
              </button>
            </div>

            <p
              className={`text-sm mb-6 pb-6 border-b ${
                isDark
                  ? "text-slate-400 border-white/10"
                  : "text-zinc-600 border-zinc-200"
              }`}
            >
              {selectedPrompt.description}
            </p>

            <h3
              className={`font-semibold mb-4 ${
                isDark ? "text-white" : "text-zinc-900"
              }`}
            >
              Full Report History
            </h3>

            <div className="max-h-[300px] overflow-auto space-y-3 pr-2 custom-scrollbar">
              {selectedPrompt.reports?.map((r, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl border ${
                    isDark
                      ? "bg-black/40 border-white/5"
                      : "bg-zinc-50 border-zinc-200"
                  }`}
                >
                  <p
                    className={`text-sm font-medium mb-1 ${
                      isDark ? "text-slate-300" : "text-zinc-800"
                    }`}
                  >
                    {r.reason}
                  </p>

                  <p
                    className={`text-xs mb-2 ${
                      isDark ? "text-slate-500" : "text-zinc-500"
                    }`}
                  >
                    {r.message || "No message provided."}
                  </p>

                  <p
                    className={`text-[10px] flex items-center gap-1 ${
                      isDark ? "text-slate-600" : "text-zinc-400"
                    }`}
                  >
                    <Clock size={10} />
                    {new Date(r.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <Button
                className={`${
                  isDark
                    ? "bg-[#1e293b] text-white hover:bg-slate-800"
                    : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                }`}
                onClick={() => setSelectedPrompt(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div
            className={`border border-red-500/20 p-8 rounded-3xl w-[400px] max-w-full shadow-2xl text-center ${
              isDark ? "bg-[#0a0a0a]" : "bg-white"
            }`}
          >
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="text-red-500" size={32} />
            </div>

            <h2
              className={`text-xl font-bold ${
                isDark ? "text-white" : "text-zinc-900"
              }`}
            >
              Delete Prompt?
            </h2>

            <p
              className={`text-sm mt-2 mb-6 ${
                isDark ? "text-slate-400" : "text-zinc-600"
              }`}
            >
              Are you sure you want to permanently delete &quot;
              {deleteConfirm.title}&quot;? This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <Button
                className={`flex-1 ${
                  isDark
                    ? "bg-slate-800 text-white hover:bg-slate-700"
                    : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                }`}
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </Button>

              <Button
                className="flex-1 bg-red-600 text-white hover:bg-red-700"
                onClick={() => handleDelete(deleteConfirm._id)}
              >
                Confirm Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReportPage;