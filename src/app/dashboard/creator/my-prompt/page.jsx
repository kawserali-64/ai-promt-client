"use client";

import { useEffect, useState } from "react";
import { getMyPrompts, updatePrompt, deletePrompt } from "@/lib/api/prompt";
import { Pencil, Trash2, X, AlertTriangle } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";

const MyPromptPage = () => {
  const { data: session } = useSession();
  const [prompts, setPrompts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  
  // ডিলিট মোডালের জন্য স্টেট
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.id) return;
      try {
        const res = await getMyPrompts(session.user.id);
        setPrompts(Array.isArray(res) ? res : res?.prompts || res?.data || []);
      } catch (err) {
        toast.error("Failed to load prompts");
      }
    };
    fetchData();
  }, [session]);

  const openEdit = (item) => {
    setEditData({ ...item });
    setIsOpen(true);
  };

  const handleUpdate = async () => {
    try {
      const res = await updatePrompt(editData._id, editData);
      if (res?.success) {
        setPrompts((prev) => prev.map((p) => (p._id === editData._id ? editData : p)));
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
        setPrompts((prev) => prev.filter((p) => p._id !== deleteModal.id));
        toast.success("Deleted successfully");
        setDeleteModal({ isOpen: false, id: null });
      }
    } catch {
      toast.error("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">My Prompts</h2>
        <p className="text-zinc-500 text-sm mt-1">Manage your created AI prompts</p>
      </div>

      <div className="rounded-2xl border border-white/5 bg-[#0a0a0a] overflow-x-auto">
        <table className="w-full text-sm min-w-[800px]">
          <thead className="bg-white/5 text-zinc-400 uppercase text-xs tracking-wider">
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
                <tr key={item._id} className="border-t border-white/5 hover:bg-white/5 transition">
                  <td className="p-4 font-medium">{item.title}</td>
                  <td className="p-4 text-zinc-300">{item.category}</td>
                  <td className="p-4 text-zinc-300">{item.tool}</td>
                  <td className="p-4 text-zinc-300">{item.difficulty}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${item.visibility === "Public" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border-rose-500/20"}`}>
                      {item.visibility}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${item.status === "approved" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"}`}>
                      {item.status || "pending"}
                    </span>
                  </td>
                  <td className="p-4 text-zinc-300">{item.copyCount || 0}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => openEdit(item)} className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition"><Pencil size={16} /></button>
                      <button onClick={() => setDeleteModal({ isOpen: true, id: item._id })} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="8" className="text-center p-10 text-zinc-500">No prompts found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL - FULLY RESPONSIVE */}
      {isOpen && editData && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 relative">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-zinc-400 hover:text-white"><X /></button>
            <h2 className="text-xl font-bold mb-6">Edit Prompt</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="p-3 rounded-lg bg-[#111] border border-white/10" value={editData.title || ""} onChange={(e) => setEditData({...editData, title: e.target.value})} placeholder="Title" />
              <input className="p-3 rounded-lg bg-[#111] border border-white/10" value={editData.category || ""} onChange={(e) => setEditData({...editData, category: e.target.value})} placeholder="Category" />
              <input className="p-3 rounded-lg bg-[#111] border border-white/10" value={editData.tool || ""} onChange={(e) => setEditData({...editData, tool: e.target.value})} placeholder="Tool" />
              <select className="p-3 rounded-lg bg-[#111] border border-white/10" value={editData.difficulty || ""} onChange={(e) => setEditData({...editData, difficulty: e.target.value})}>
                <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
              </select>
              <select className="p-3 rounded-lg bg-[#111] border border-white/10" value={editData.visibility || "Public"} onChange={(e) => setEditData({...editData, visibility: e.target.value})}>
                <option>Public</option><option>Private</option>
              </select>
              <input className="p-3 rounded-lg bg-[#111] border border-white/10 md:col-span-2" value={Array.isArray(editData.tags) ? editData.tags.join(", ") : editData.tags || ""} onChange={(e) => setEditData({...editData, tags: e.target.value.split(",").map(t => t.trim())})} placeholder="Tags" />
              <textarea rows={6} className="p-3 rounded-lg bg-[#111] border border-white/10 md:col-span-2" value={editData.content || ""} onChange={(e) => setEditData({...editData, content: e.target.value})} placeholder="Prompt Content" />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setIsOpen(false)} className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10">Cancel</button>
              <button onClick={handleUpdate} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL - MODERN DESIGN */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-sm bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 text-center">
            <div className="w-16 h-16 bg-red-500/10 flex items-center justify-center rounded-full mx-auto mb-4">
              <AlertTriangle className="text-red-500" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Delete Prompt?</h3>
            <p className="text-zinc-400 text-sm mb-6">Are you sure? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteModal({ isOpen: false, id: null })} className="flex-1 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10">Cancel</button>
              <button onClick={confirmDelete} className="flex-1 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 font-semibold">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPromptPage;