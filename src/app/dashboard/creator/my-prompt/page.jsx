"use client";

import { useEffect, useState } from "react";
import {
  getMyPrompts,
  updatePrompt,
  deletePrompt,
} from "@/lib/api/prompt";

import { Pencil, Trash2, X } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";

const MyPromptPage = () => {
  const { data: session } = useSession();

  const [prompts, setPrompts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // ================= FETCH =================
  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.id) return;

      try {
        const res = await getMyPrompts(session.user.id);

        console.log(res);

        setPrompts(
          Array.isArray(res)
            ? res
            : Array.isArray(res?.prompts)
              ? res.prompts
              : Array.isArray(res?.data)
                ? res.data
                : []
        );
      } catch (err) {
        console.error(err);
        toast.error("Failed to load prompts");
      }
    };

    fetchData();
  }, [session]);

  // ================= OPEN EDIT =================
  const openEdit = (item) => {
    setEditData({ ...item });
    setIsOpen(true);
  };

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
  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this prompt?");
    if (!ok) return;

    try {
      const res = await deletePrompt(id);

      if (res?.success) {
        setPrompts((prev) => prev.filter((p) => p._id !== id));
        toast.success("Deleted successfully");
      }
    } catch {
      toast.error("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white p-6">

      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">My Prompts</h2>
        <p className="text-slate-400 text-sm mt-1">
          Manage your created AI prompts
        </p>
      </div>

      {/* TABLE WRAPPER */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-white/5 text-slate-300 uppercase text-xs tracking-wider">
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
                  className="border-t border-white/5 hover:bg-white/5 transition"
                >

                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-white">
                        {item.title}
                      </span>

                      {item.status === "rejected" &&
                        item.rejectionFeedback && (
                          <span className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-1 rounded-md w-fit">
                            Rejected Reason: {item.rejectionFeedback}
                          </span>
                        )}
                    </div>
                  </td>


                  <td className="p-4 text-slate-300">{item.category}</td>
                  <td className="p-4 text-slate-300">{item.tool}</td>
                  <td className="p-4 text-slate-300">{item.difficulty}</td>

                  {/* VISIBILITY */}
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${item.visibility === "Public"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                      }`}>
                      {item.visibility}
                    </span>
                  </td>

                  {/* STATUS */}
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${item.status === "approved"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : item.status === "rejected"
                        ? "bg-red-500/10 text-red-400 border-red-500/20"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      }`}>
                      {item.status || "pending"}
                    </span>
                  </td>

                  {/* COPIES */}
                  <td className="p-4 text-slate-300">
                    {item.copyCount || 0}
                  </td>

                  {/* ACTION */}
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">

                      <button
                        onClick={() => openEdit(item)}
                        className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center p-10 text-slate-400">
                  No prompts found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* ================= EDIT MODAL ================= */}
      {isOpen && editData && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="w-[900px] max-w-[95%] max-h-[90vh] overflow-y-auto bg-slate-950 border border-white/10 rounded-2xl p-6 relative">

            {/* CLOSE */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X />
            </button>

            <h2 className="text-xl font-bold mb-6">Edit Prompt</h2>

            {/* INPUTS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <input
                className="p-3 rounded-lg bg-white/5 border border-white/10"
                value={editData.title || ""}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
                placeholder="Title"
              />

              <input
                className="p-3 rounded-lg bg-white/5 border border-white/10"
                value={editData.category || ""}
                onChange={(e) =>
                  setEditData({ ...editData, category: e.target.value })
                }
                placeholder="Category"
              />

              <input
                className="p-3 rounded-lg bg-white/5 border border-white/10"
                value={editData.tool || ""}
                onChange={(e) =>
                  setEditData({ ...editData, tool: e.target.value })
                }
                placeholder="Tool"
              />

              <select
                className="p-3 rounded-lg bg-white/5 border border-white/10"
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
                className="p-3 rounded-lg bg-white/5 border border-white/10"
                value={editData.visibility || "Public"}
                onChange={(e) =>
                  setEditData({ ...editData, visibility: e.target.value })
                }
              >
                <option>Public</option>
                <option>Private</option>
              </select>

              <input
                className="p-3 rounded-lg bg-white/5 border border-white/10 md:col-span-2"
                value={
                  Array.isArray(editData.tags)
                    ? editData.tags.join(", ")
                    : editData.tags || ""
                }
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    tags: e.target.value.split(",").map(t => t.trim())
                  })
                }
                placeholder="Tags"
              />

              <textarea
                rows={6}
                className="p-3 rounded-lg bg-white/5 border border-white/10 md:col-span-2"
                value={editData.content || ""}
                onChange={(e) =>
                  setEditData({ ...editData, content: e.target.value })
                }
                placeholder="Prompt Content"
              />

            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold"
              >
                Save Changes
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default MyPromptPage;