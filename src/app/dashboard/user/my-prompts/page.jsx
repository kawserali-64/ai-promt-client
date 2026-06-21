"use client";

import { useEffect, useState } from "react";
import {
  getMyPrompts,
  updatePrompt,
  deletePrompt,
} from "@/lib/api/prompt";

import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { FaPencilAlt } from "react-icons/fa";
import { BiTrash } from "react-icons/bi";
import { X } from "lucide-react";

const UserMyPromptPage = () => {
  const { data: session } = useSession();

  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

  // EDIT MODAL
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // DELETE MODAL
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

  // ================= DELETE OPEN =================
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsDeleteOpen(true);
  };

  // ================= CONFIRM DELETE =================
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

  // ================= LOADING =================
  if (loading) {
    return <div className="p-8 text-zinc-400">Loading prompts...</div>;
  }

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-black via-[#0b0b1a] to-black text-white">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">My Prompts</h1>
        <p className="text-zinc-400 text-sm">
          Manage, update and organize your AI prompts
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
                  <td className="p-4 font-medium text-white">{item.title}</td>
                  <td className="p-4 text-zinc-300">{item.category}</td>
                  <td className="p-4 text-zinc-300">{item.tool}</td>
                  <td className="p-4 text-zinc-300">{item.difficulty}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.visibility === "Public"
                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
                          : "bg-red-500/10 text-red-400 border border-red-500/20"
                      }`}
                    >
                      {item.visibility}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() => openEdit(item)}
                        className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                      >
                        <FaPencilAlt size={16} />
                      </button>

                      <button
                        onClick={() => handleDeleteClick(item._id)}
                        className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                      >
                        <BiTrash size={16} />
                      </button>

                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-10 text-zinc-500">
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
          <div className="w-[650px] max-w-[95%] rounded-3xl border border-white/10 bg-[#0f0f1a] p-6 relative">

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X />
            </button>

            <h2 className="text-xl font-bold">Edit Prompt</h2>
            <p className="text-sm text-zinc-400 mb-6">
              Update your prompt details
            </p>

            <input
              className="w-full p-3 mb-3 rounded-xl bg-white/5 border border-white/10"
              value={editData.title || ""}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
            />

            <textarea
              className="w-full p-3 mb-3 rounded-xl bg-white/5 border border-white/10"
              rows={4}
              value={editData.content || ""}
              onChange={(e) =>
                setEditData({ ...editData, content: e.target.value })
              }
            />

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2 rounded-xl bg-white/10"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-5 py-2 rounded-xl bg-violet-600 font-semibold"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================= DELETE MODAL ================= */}
      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="w-[420px] max-w-[95%] rounded-2xl border border-white/10 bg-[#0f0f1a] p-6">

            <h2 className="text-xl font-bold">Delete Prompt?</h2>

            <p className="text-sm text-zinc-400 mt-2">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/10"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl bg-red-600 font-semibold"
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