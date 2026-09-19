"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";
import {
  deletePrompt,
  getMyPrompts,
  updatePrompt,
} from "@/lib/api/prompt";
import {
  Pencil,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import { useTheme } from "next-themes";

const UserMyPromptPage = () => {
  const { data: session, isPending } = useSession();
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const userId = session?.user?.id;
  const isDark = mounted && resolvedTheme === "dark";

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;

      try {
        setLoading(true);

        const data = await getMyPrompts(userId);

        setPrompts(
          Array.isArray(data)
            ? data
            : data?.prompts || data?.data || []
        );
      } catch (error) {
        toast.error("Failed to load prompts");
      } finally {
        setLoading(false);
      }
    };

    if (!isPending && userId) {
      fetchData();
    }

    if (!isPending && !userId) {
      setLoading(false);
    }
  }, [userId, isPending]);

  const handleUpdate = async () => {
    try {
      const res = await updatePrompt(editData._id, editData);

      if (res?.success) {
        setPrompts((prev) =>
          prev.map((p) =>
            p._id === editData._id ? editData : p
          )
        );

        toast.success("Prompt updated successfully");
        setIsOpen(false);
      } else {
        toast.error(res?.message || "Update failed");
      }
    } catch {
      toast.error("Server error");
    }
  };

  const confirmDelete = async () => {
    try {
      const res = await deletePrompt(deleteId);

      if (res?.success) {
        setPrompts((prev) =>
          prev.filter((p) => p._id !== deleteId)
        );

        toast.success("Prompt deleted successfully");
      } else {
        toast.error(res?.message || "Delete failed");
      }
    } catch {
      toast.error("Server error");
    } finally {
      setIsDeleteOpen(false);
    }
  };

  // Hydration theme flash prevent korar jonno
  if (!mounted) {
    return <div className="min-h-screen w-full" />;
  }

  /* =========================
      LOADING STATE
  ========================= */

  if (isPending || loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
          isDark ? "bg-[#050505]" : "bg-zinc-50"
        }`}
      >
        <div className="flex flex-col items-center justify-center">
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
                  ? "border-violet-500"
                  : "border-violet-600"
              }`}
            />
          </div>

          <h2
            className={`mt-5 text-lg font-semibold ${
              isDark ? "text-white" : "text-zinc-900"
            }`}
          >
            Loading Your Assets
          </h2>

          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Fetching your custom prompts and data...
          </p>

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
      className={`min-h-screen p-4 md:p-8 transition-colors duration-300 ${
        isDark
          ? "bg-[#050505] text-white"
          : "bg-zinc-50 text-zinc-900"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1
            className={`text-3xl font-black tracking-tight ${
              isDark ? "text-white" : "text-violet-600"
            }`}
          >
            My Prompts
          </h1>
          <p
            className={`text-sm mt-1 ${
              isDark ? "text-zinc-400" : "text-zinc-500"
            }`}
          >
            Manage and optimize your created AI assets
          </p>
        </div>

        <div
          className={`rounded-[24px] border overflow-hidden transition-colors duration-300 ${
            isDark
              ? "bg-[#0a0a0a] border-white/5"
              : "bg-white border-zinc-200"
          }`}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr
                  className={`text-[10px] uppercase tracking-widest border-b ${
                    isDark
                      ? "text-zinc-400 border-white/5"
                      : "text-zinc-500 border-zinc-200"
                  }`}
                >
                  <th className="p-6">Title</th>
                  <th className="p-6">Category</th>
                  <th className="p-6">Visibility</th>
                  <th className="p-6">Status</th>
                  <th className="p-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody
                className={
                  isDark
                    ? "divide-y divide-white/5"
                    : "divide-y divide-zinc-100"
                }
              >
                {prompts?.map((item) => (
                  <tr
                    key={item._id}
                    className={`transition-colors ${
                      isDark
                        ? "hover:bg-white/[0.02]"
                        : "hover:bg-zinc-50"
                    }`}
                  >
                    <td className="p-6">
                      <p
                        className={`font-bold text-sm ${
                          isDark ? "text-white" : "text-zinc-900"
                        }`}
                      >
                        {item.title}
                      </p>
                      {item.status === "rejected" && (
                        <p className="text-[10px] text-red-500 mt-1 italic">
                          Feedback: {item.rejectionFeedback}
                        </p>
                      )}
                    </td>
                    <td
                      className={`p-6 text-sm ${
                        isDark ? "text-zinc-400" : "text-zinc-500"
                      }`}
                    >
                      {item.category}
                    </td>
                    <td className="p-6">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                          item.visibility === "Public"
                            ? "bg-green-500/10 text-green-600 dark:text-green-400"
                            : isDark
                            ? "bg-zinc-800 text-zinc-400"
                            : "bg-zinc-100 text-zinc-500"
                        }`}
                      >
                        {item.visibility}
                      </span>
                    </td>
                    <td className="p-6">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                          item.status === "approved"
                            ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                            : "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                        }`}
                      >
                        {item.status || "pending"}
                      </span>
                    </td>
                    <td className="p-6">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => {
                            setEditData(item);
                            setIsOpen(true);
                          }}
                          className={`p-2 rounded-xl transition ${
                            isDark
                              ? "bg-white/5 hover:bg-white/10 text-zinc-300"
                              : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700"
                          }`}
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => {
                            setDeleteId(item._id);
                            setIsDeleteOpen(true);
                          }}
                          className="p-2 rounded-xl bg-red-500/5 hover:bg-red-500/10 text-red-500 transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      {isOpen && editData && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div
            className={`w-full max-w-lg border rounded-[32px] p-8 transition-colors duration-300 ${
              isDark
                ? "bg-[#0a0a0a] border-white/10"
                : "bg-white border-zinc-200"
            }`}
          >
            <h2
              className={`text-xl font-bold mb-6 ${
                isDark ? "text-white" : "text-zinc-900"
              }`}
            >
              Edit Asset
            </h2>

            <div className="space-y-4">
              <input
                className={`w-full p-4 rounded-xl border text-sm outline-none focus:border-violet-500 transition ${
                  isDark
                    ? "bg-[#111] border-white/5 text-white placeholder:text-zinc-600"
                    : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400"
                }`}
                placeholder="Title"
                value={editData.title || ""}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    title: e.target.value,
                  })
                }
              />
              <input
                className={`w-full p-4 rounded-xl border text-sm outline-none focus:border-violet-500 transition ${
                  isDark
                    ? "bg-[#111] border-white/5 text-white placeholder:text-zinc-600"
                    : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400"
                }`}
                placeholder="Category"
                value={editData.category || ""}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    category: e.target.value,
                  })
                }
              />
              <select
                className={`w-full p-4 rounded-xl border text-sm outline-none focus:border-violet-500 transition ${
                  isDark
                    ? "bg-[#111] border-white/5 text-white"
                    : "bg-zinc-50 border-zinc-200 text-zinc-900"
                }`}
                value={editData.visibility || "Public"}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    visibility: e.target.value,
                  })
                }
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
              <textarea
                className={`w-full p-4 rounded-xl border text-sm min-h-[120px] outline-none focus:border-violet-500 transition resize-none ${
                  isDark
                    ? "bg-[#111] border-white/5 text-white placeholder:text-zinc-600"
                    : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400"
                }`}
                placeholder="Content"
                value={editData.content || ""}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    content: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setIsOpen(false)}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition ${
                  isDark
                    ? "bg-white/5 text-zinc-300 hover:bg-white/10"
                    : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className={`flex-1 py-3 rounded-xl text-sm font-black transition ${
                  isDark
                    ? "bg-white text-black hover:bg-zinc-200"
                    : "bg-zinc-900 text-white hover:bg-zinc-700"
                }`}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div
            className={`w-full max-w-sm border rounded-[32px] p-8 text-center transition-colors duration-300 ${
              isDark
                ? "bg-[#0a0a0a] border-white/10"
                : "bg-white border-zinc-200"
            }`}
          >
            <div className="mx-auto w-12 h-12 bg-red-500/10 flex items-center justify-center rounded-full mb-4">
              <AlertTriangle className="text-red-500" size={24} />
            </div>
            <h2
              className={`text-xl font-bold ${
                isDark ? "text-white" : "text-zinc-900"
              }`}
            >
              Delete Prompt?
            </h2>
            <p
              className={`text-sm mt-2 mb-8 ${
                isDark ? "text-zinc-400" : "text-zinc-500"
              }`}
            >
              This action is irreversible.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className={`flex-1 py-3 rounded-xl text-sm transition ${
                  isDark
                    ? "bg-white/5 text-zinc-300 hover:bg-white/10"
                    : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-3 rounded-xl bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMyPromptPage;