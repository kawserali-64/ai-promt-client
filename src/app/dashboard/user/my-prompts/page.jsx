"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { deletePrompt, getMyPrompts, updatePrompt } from "@/lib/api/prompt";
import { Pencil, Trash2, AlertTriangle } from "lucide-react";

const UserMyPromptPage = () => {
  const { data: session } = useSession();
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    if (!session?.user?.id) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getMyPrompts(session.user.id);
        setPrompts(Array.isArray(data) ? data : (data?.prompts || data?.data || []));
      } catch (error) {
        toast.error("Failed to load prompts");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [session?.user?.id]);

  const handleUpdate = async () => {
    try {
      const res = await updatePrompt(editData._id, editData);
      if (res?.success) {
        setPrompts((prev) => prev.map((p) => (p._id === editData._id ? editData : p)));
        toast.success("Prompt updated successfully");
        setIsOpen(false);
      } else toast.error(res?.message || "Update failed");
    } catch { toast.error("Server error"); }
  };

  const confirmDelete = async () => {
    try {
      const res = await deletePrompt(deleteId);
      if (res?.success) {
        setPrompts((prev) => prev.filter((p) => p._id !== deleteId));
        toast.success("Prompt deleted successfully");
      } else toast.error(res?.message || "Delete failed");
    } catch { toast.error("Server error"); } finally { setIsDeleteOpen(false); }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-zinc-500">Loading your assets...</div>;

  return (
    <div className="p-4 md:p-8 min-h-screen bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-tight">My Prompts</h1>
          <p className="text-zinc-500 text-sm mt-1">Manage and optimize your created AI assets</p>
        </div>

        {/* Table */}
        <div className="rounded-[24px] border border-white/5 bg-[#0a0a0a] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-zinc-500 text-[10px] uppercase tracking-widest border-b border-white/5">
                  <th className="p-6">Title</th>
                  <th className="p-6">Category</th>
                  <th className="p-6">Visibility</th>
                  <th className="p-6">Status</th>
                  <th className="p-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {prompts?.map((item) => (
                  <tr key={item._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6">
                      <p className="font-bold text-sm">{item.title}</p>
                      {item.status === "rejected" && <p className="text-[10px] text-red-500 mt-1 italic">Feedback: {item.rejectionFeedback}</p>}
                    </td>
                    <td className="p-6 text-zinc-400 text-sm">{item.category}</td>
                    <td className="p-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${item.visibility === "Public" ? "bg-green-500/10 text-green-400" : "bg-zinc-800 text-zinc-400"}`}>
                        {item.visibility}
                      </span>
                    </td>
                    <td className="p-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${item.status === "approved" ? "bg-blue-500/10 text-blue-400" : "bg-yellow-500/10 text-yellow-400"}`}>
                        {item.status || "pending"}
                      </span>
                    </td>
                    <td className="p-6">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => { setEditData(item); setIsOpen(true); }} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition"><Pencil size={16} /></button>
                        <button onClick={() => { setDeleteId(item._id); setIsDeleteOpen(true); }} className="p-2 rounded-xl bg-red-500/5 hover:bg-red-500/10 text-red-500 transition"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-[32px] p-8">
            <h2 className="text-xl font-bold mb-6">Edit Asset</h2>
            <div className="space-y-4">
              <input className="w-full bg-[#111] p-4 rounded-xl border border-white/5 text-sm" placeholder="Title" value={editData.title} onChange={(e) => setEditData({...editData, title: e.target.value})} />
              <input className="w-full bg-[#111] p-4 rounded-xl border border-white/5 text-sm" placeholder="Category" value={editData.category} onChange={(e) => setEditData({...editData, category: e.target.value})} />
              <select className="w-full bg-[#111] p-4 rounded-xl border border-white/5 text-sm" value={editData.visibility} onChange={(e) => setEditData({...editData, visibility: e.target.value})}>
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
              <textarea className="w-full bg-[#111] p-4 rounded-xl border border-white/5 text-sm min-h-[120px]" placeholder="Content" value={editData.content} onChange={(e) => setEditData({...editData, content: e.target.value})} />
            </div>
            <div className="flex gap-3 mt-8">
              <button onClick={() => setIsOpen(false)} className="flex-1 py-3 rounded-xl bg-white/5 text-sm font-bold">Cancel</button>
              <button onClick={handleUpdate} className="flex-1 py-3 rounded-xl bg-white text-black text-sm font-black">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#0a0a0a] border border-white/10 rounded-[32px] p-8 text-center">
            <div className="mx-auto w-12 h-12 bg-red-500/10 flex items-center justify-center rounded-full mb-4">
              <AlertTriangle className="text-red-500" size={24} />
            </div>
            <h2 className="text-xl font-bold">Delete Prompt?</h2>
            <p className="text-zinc-500 text-sm mt-2 mb-8">This action is irreversible.</p>
            <div className="flex gap-3">
              <button onClick={() => setIsDeleteOpen(false)} className="flex-1 py-3 rounded-xl bg-white/5 text-sm">Cancel</button>
              <button onClick={confirmDelete} className="flex-1 py-3 rounded-xl bg-red-600 text-sm font-bold">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMyPromptPage;