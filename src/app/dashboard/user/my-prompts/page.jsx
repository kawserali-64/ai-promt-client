"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";

import {
  getMyPrompts,
  updatePrompt,
  deletePrompt,
} from "@/lib/api/prompt";

import { Pencil, Trash2, X } from "lucide-react";

const UserMyPromptPage = () => {
  const { data: session } = useSession();

  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // ================= FETCH =================
  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.id) return;

      try {
        setLoading(true);
        const data = await getMyPrompts(session.user.id);

        setPrompts(Array.isArray(data) ? data : data?.data || []);
      } catch {
        toast.error("Failed to load prompts");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session]);

  // ================= UPDATE =================
  const handleUpdate = async () => {
    try {
      const res = await updatePrompt(editData._id, editData);

      if (res?.success) {
        setPrompts((prev) =>
          prev.map((p) => (p._id === editData._id ? editData : p))
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

  // ================= DELETE =================
  const confirmDelete = async () => {
    try {
      const res = await deletePrompt(deleteId);

      if (res?.success) {
        setPrompts((prev) => prev.filter((p) => p._id !== deleteId));
        toast.success("Prompt deleted successfully");
      } else {
        toast.error(res?.message || "Delete failed");
      }
    } catch {
      toast.error("Server error");
    } finally {
      setIsDeleteOpen(false);
      setDeleteId(null);
    }
  };

  if (loading) {
    return <div className="p-8 text-zinc-400">Loading prompts...</div>;
  }

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-black via-[#0b0b1a] to-black text-white">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">My Prompts</h1>
        <p className="text-zinc-400 text-sm">
          Manage your created prompts
        </p>
      </div>

      {/* TABLE */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
        <table className="w-full text-sm">

          <thead className="bg-white/5 text-zinc-300">
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
                <tr key={item._id} className="border-t border-white/5 hover:bg-white/5">

                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <span>{item.title}</span>

                      {item.status === "rejected" && item.rejectionFeedback && (
                        <span className="text-xs text-red-400 bg-red-500/10 px-2 py-1 rounded-md">
                          Feedback: {item.rejectionFeedback}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-zinc-300">{item.category}</td>
                  <td className="p-4 text-zinc-300">{item.tool}</td>
                  <td className="p-4 text-zinc-300">{item.difficulty}</td>

                  {/* VISIBILITY */}
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.visibility === "Public"
                      ? "bg-green-500/10 text-green-400"
                      : "bg-red-500/10 text-red-400"
                      }`}>
                      {item.visibility}
                    </span>
                  </td>

                  {/* STATUS (DOC REQUIRED) */}
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.status === "approved"
                      ? "bg-green-500/10 text-green-400"
                      : item.status === "rejected"
                        ? "bg-red-500/10 text-red-400"
                        : "bg-yellow-500/10 text-yellow-400"
                      }`}>
                      {item.status || "pending"}
                    </span>
                  </td>

                  {/* COPIES */}
                  <td className="p-4 text-zinc-300">
                    {item.copyCount || 0}
                  </td>

                  {/* ACTION */}
                  <td className="p-4">
                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() => {
                          setEditData(item);
                          setIsOpen(true);
                        }}
                        className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => {
                          setDeleteId(item._id);
                          setIsDeleteOpen(true);
                        }}
                        className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center p-10 text-zinc-500">
                  No prompts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= EDIT MODAL ================= */}
      {isOpen && editData && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">

          <div className="w-[850px] max-w-[95%] max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0f0f1a] border border-white/10 p-6 relative">

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X />
            </button>

            <h2 className="text-xl font-bold mb-6">Edit Prompt</h2>

            <div className="grid gap-4">

              <input
                className="p-3 rounded bg-white/5 border border-white/10"
                value={editData.title || ""}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
              />

              <textarea
                className="p-3 rounded bg-white/5 border border-white/10"
                value={editData.description || ""}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
              />

              <input
                className="p-3 rounded bg-white/5 border border-white/10"
                value={editData.category || ""}
                onChange={(e) =>
                  setEditData({ ...editData, category: e.target.value })
                }
              />

              <input
                className="p-3 rounded bg-white/5 border border-white/10"
                value={editData.tool || ""}
                onChange={(e) =>
                  setEditData({ ...editData, tool: e.target.value })
                }
              />

              <select
                className="p-3 rounded bg-white/5 border border-white/10"
                value={editData.difficulty || ""}
                onChange={(e) =>
                  setEditData({ ...editData, difficulty: e.target.value })
                }
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>

              <select
                className="p-3 rounded bg-white/5 border border-white/10"
                value={editData.visibility || "Public"}
                onChange={(e) =>
                  setEditData({ ...editData, visibility: e.target.value })
                }
              >
                <option>Public</option>
                <option>Private</option>
              </select>

              <textarea
                rows={6}
                className="p-3 rounded bg-white/5 border border-white/10"
                value={editData.content || ""}
                onChange={(e) =>
                  setEditData({ ...editData, content: e.target.value })
                }
              />

            </div>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded bg-white/10"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-4 py-2 rounded bg-violet-600 hover:bg-violet-700"
              >
                Save
              </button>

            </div>

          </div>
        </div>
      )}

      {/* ================= DELETE MODAL ================= */}
      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="w-[400px] bg-[#0f0f1a] border border-white/10 p-6 rounded-xl">

            <h2 className="text-xl font-bold">Delete Prompt?</h2>
            <p className="text-zinc-400 mt-2 text-sm">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => setIsDeleteOpen(false)}
                className="px-4 py-2 bg-white/10 rounded"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 rounded"
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