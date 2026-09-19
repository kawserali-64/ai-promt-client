"use client";

import { useEffect, useState } from "react";
import { getMyPrompts, updatePrompt, deletePrompt } from "@/lib/api/prompt";
import { Pencil, Trash2, X, AlertTriangle } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useTheme } from "next-themes";

const MyPromptPage = () => {
  const { data: session, isPending: sessionLoading } = useSession();
  const { resolvedTheme } = useTheme();

  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    id: null,
  });

  // Client hydration check
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  // Fetch prompts
  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.id) {
        if (!sessionLoading) setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const res = await getMyPrompts(session.user.id);

        setPrompts(
          Array.isArray(res)
            ? res
            : res?.prompts || res?.data || []
        );
      } catch (err) {
        toast.error("Failed to load prompts");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session?.user?.id, sessionLoading]);

  const openEdit = (item) => {
    setEditData({ ...item });
    setIsOpen(true);
  };

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
      const res = await deletePrompt(deleteModal.id);

      if (res?.success) {
        setPrompts((prev) =>
          prev.filter((p) => p._id !== deleteModal.id)
        );

        toast.success("Deleted successfully");

        setDeleteModal({
          isOpen: false,
          id: null,
        });
      }
    } catch {
      toast.error("Server error");
    }
  };

  // 1. Hydration Mismatch & Theme Flash প্রতিরোধ
  if (!mounted) {
    return <div className="min-h-screen w-full opacity-0" />;
  }

  // 2. Matching Creator UI Animated Loading state
  if (sessionLoading || loading) {
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
            Loading Your Prompts
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Fetching your custom collection...
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
      className={`min-h-screen p-4 md:p-6 transition-colors duration-300 ${
        isDark ? "bg-[#050505] text-white" : "bg-zinc-50 text-zinc-900"
      }`}
    >
      {/* HEADER */}
      <div className="mb-6">
        <h2
          className={`text-3xl font-bold tracking-tight ${
            isDark ? "text-white" : "text-violet-600"
          }`}
        >
          My Prompts
        </h2>
        <p
          className={`text-sm mt-1 ${
            isDark ? "text-zinc-400" : "text-zinc-500"
          }`}
        >
          Manage your created AI prompts
        </p>
      </div>

      {/* TABLE */}
      <div
        className={`rounded-2xl border overflow-x-auto transition-colors duration-300 ${
          isDark
            ? "bg-[#0a0a0a] border-white/5"
            : "bg-white border-zinc-200 shadow-sm"
        }`}
      >
        <table className="w-full text-sm min-w-[800px]">
          <thead
            className={`uppercase text-xs tracking-wider ${
              isDark
                ? "bg-white/5 text-zinc-400"
                : "bg-zinc-50 text-zinc-500"
            }`}
          >
            <tr>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Tool</th>
              <th className="p-4 text-left">Difficulty</th>
              <th className="p-4 text-left">Visibility</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Copies</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {prompts?.length > 0 ? (
              prompts.map((item) => (
                <tr
                  key={item._id}
                  className={`border-t transition ${
                    isDark
                      ? "border-white/5 hover:bg-white/5"
                      : "border-zinc-100 hover:bg-zinc-50"
                  }`}
                >
                  {/* TITLE */}
                  <td
                    className={`p-4 font-medium ${
                      isDark ? "text-white" : "text-zinc-900"
                    }`}
                  >
                    {item.title}
                  </td>

                  {/* CATEGORY */}
                  <td
                    className={`p-4 ${
                      isDark ? "text-zinc-300" : "text-zinc-600"
                    }`}
                  >
                    {item.category}
                  </td>

                  {/* TOOL */}
                  <td
                    className={`p-4 ${
                      isDark ? "text-zinc-300" : "text-zinc-600"
                    }`}
                  >
                    {item.tool}
                  </td>

                  {/* DIFFICULTY */}
                  <td
                    className={`p-4 ${
                      isDark ? "text-zinc-300" : "text-zinc-600"
                    }`}
                  >
                    {item.difficulty}
                  </td>

                  {/* VISIBILITY */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        item.visibility === "Public"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                          : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                      }`}
                    >
                      {item.visibility}
                    </span>
                  </td>

                  {/* STATUS */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        item.status === "approved"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                      }`}
                    >
                      {item.status || "pending"}
                    </span>
                  </td>

                  {/* COPIES */}
                  <td
                    className={`p-4 font-semibold ${
                      isDark ? "text-white" : "text-zinc-900"
                    }`}
                  >
                    {item.copyCount || 0}
                  </td>

                  {/* ACTION */}
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => openEdit(item)}
                        className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 transition"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() =>
                          setDeleteModal({
                            isOpen: true,
                            id: item._id,
                          })
                        }
                        className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className={`text-center p-10 ${
                    isDark ? "text-zinc-400" : "text-zinc-500"
                  }`}
                >
                  No prompts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      {isOpen && editData && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div
            className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto border rounded-2xl p-6 relative transition-colors duration-300 ${
              isDark
                ? "bg-[#0a0a0a] border-white/10"
                : "bg-white border-zinc-200"
            }`}
          >
            <button
              onClick={() => setIsOpen(false)}
              className={`absolute top-4 right-4 transition ${
                isDark
                  ? "text-zinc-400 hover:text-white"
                  : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              <X />
            </button>

            <h2
              className={`text-xl font-bold mb-6 ${
                isDark ? "text-white" : "text-zinc-900"
              }`}
            >
              Edit Prompt
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className={`p-3 rounded-lg border outline-none focus:border-violet-500 transition ${
                  isDark
                    ? "bg-[#111] border-white/10 text-white placeholder:text-zinc-600"
                    : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400"
                }`}
                value={editData.title || ""}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    title: e.target.value,
                  })
                }
                placeholder="Title"
              />

              <input
                className={`p-3 rounded-lg border outline-none focus:border-violet-500 transition ${
                  isDark
                    ? "bg-[#111] border-white/10 text-white placeholder:text-zinc-600"
                    : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400"
                }`}
                value={editData.category || ""}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    category: e.target.value,
                  })
                }
                placeholder="Category"
              />

              <input
                className={`p-3 rounded-lg border outline-none focus:border-violet-500 transition ${
                  isDark
                    ? "bg-[#111] border-white/10 text-white placeholder:text-zinc-600"
                    : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400"
                }`}
                value={editData.tool || ""}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    tool: e.target.value,
                  })
                }
                placeholder="Tool"
              />

              <select
                className={`p-3 rounded-lg border outline-none focus:border-violet-500 transition ${
                  isDark
                    ? "bg-[#111] border-white/10 text-white"
                    : "bg-zinc-50 border-zinc-200 text-zinc-900"
                }`}
                value={editData.difficulty || ""}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    difficulty: e.target.value,
                  })
                }
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>

              <select
                className={`p-3 rounded-lg border outline-none focus:border-violet-500 transition ${
                  isDark
                    ? "bg-[#111] border-white/10 text-white"
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
                <option>Public</option>
                <option>Private</option>
              </select>

              <input
                className={`p-3 rounded-lg border md:col-span-2 outline-none focus:border-violet-500 transition ${
                  isDark
                    ? "bg-[#111] border-white/10 text-white placeholder:text-zinc-600"
                    : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400"
                }`}
                value={
                  Array.isArray(editData.tags)
                    ? editData.tags.join(", ")
                    : editData.tags || ""
                }
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    tags: e.target.value
                      .split(",")
                      .map((t) => t.trim()),
                  })
                }
                placeholder="Tags"
              />

              <textarea
                rows={6}
                className={`p-3 rounded-lg border md:col-span-2 outline-none focus:border-violet-500 transition resize-none ${
                  isDark
                    ? "bg-[#111] border-white/10 text-white placeholder:text-zinc-600"
                    : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400"
                }`}
                value={editData.content || ""}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    content: e.target.value,
                  })
                }
                placeholder="Prompt Content"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsOpen(false)}
                className={`px-4 py-2 rounded-lg transition ${
                  isDark
                    ? "bg-white/5 text-zinc-300 hover:bg-white/10"
                    : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                }`}
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div
            className={`w-full max-w-sm border rounded-2xl p-6 text-center transition-colors duration-300 ${
              isDark
                ? "bg-[#0a0a0a] border-white/10"
                : "bg-white border-zinc-200"
            }`}
          >
            <div className="w-16 h-16 bg-red-500/10 flex items-center justify-center rounded-full mx-auto mb-4">
              <AlertTriangle className="text-red-500" size={32} />
            </div>

            <h3
              className={`text-xl font-bold mb-2 ${
                isDark ? "text-white" : "text-zinc-900"
              }`}
            >
              Delete Prompt?
            </h3>

            <p
              className={`text-sm mb-6 ${
                isDark ? "text-zinc-400" : "text-zinc-500"
              }`}
            >
              Are you sure? This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() =>
                  setDeleteModal({
                    isOpen: false,
                    id: null,
                  })
                }
                className={`flex-1 px-4 py-2 rounded-lg transition ${
                  isDark
                    ? "bg-white/5 text-zinc-300 hover:bg-white/10"
                    : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                }`}
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition"
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

export default MyPromptPage;