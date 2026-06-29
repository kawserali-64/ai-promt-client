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

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const AdminReportPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null); // নতুন স্টেট

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/api/admin/reported-prompts`);
      const data = await res.json();
      setReports(data);
    } catch (error) {
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
      const res = await fetch(`${BASE_URL}/api/prompts/${id}/dismiss-reports`, { method: "PATCH" });
      const data = await res.json();
      if (data.success) {
        toast.success("Reports cleared");
        fetchReports();
      }
    } catch (error) {
      toast.error("Failed to dismiss reports");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/api/prompts/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("Prompt deleted");
        setDeleteConfirm(null);
        fetchReports();
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 text-slate-200">
      {/* HEADER */}
      <div className="flex justify-between items-end border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <div className="p-2 bg-red-500/10 rounded-xl">
              <AlertTriangle className="text-red-500" />
            </div>
            Reported Prompts
          </h1>
          <p className="text-slate-500 mt-2">Manage user flags and content moderation queue.</p>
        </div>
        <Button
          onClick={fetchReports}
          variant="flat"
          className="bg-[#0a0a0a] border border-white/10 text-white hover:bg-slate-900"
          startContent={<RefreshCcw size={16} />}
        >
          Refresh Data
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-500">Loading reports...</div>
      ) : reports.length === 0 ? (
        <div className="text-center py-20 bg-[#0a0a0a] rounded-3xl border border-dashed border-white/5">
          <p className="text-slate-500">No reported prompts found.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {reports.map((item) => (
            <Card key={item._id} className="p-6 bg-[#0a0a0a] border border-white/5 rounded-2xl shadow-none">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">{item.title}</h2>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-red-400 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                    <AlertTriangle size={10} />
                    {item.reportCount} ACTIVE REPORTS
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="flat" color="primary" startContent={<Eye size={14} />} onClick={() => setSelectedPrompt(item)}>View</Button>
                  <Button size="sm" variant="flat" color="success" startContent={<ShieldCheck size={14} />} onClick={() => handleDismiss(item._id)}>Dismiss</Button>
                  <Button size="sm" variant="flat" color="danger" startContent={<Trash2 size={14} />} onClick={() => setDeleteConfirm(item)}>Delete</Button>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {item.reports?.slice(0, 2).map((r, i) => (
                  <div key={i} className="flex gap-3 text-sm bg-black/40 p-4 rounded-xl border border-white/5">
                    <MessageSquare size={16} className="text-slate-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-slate-300"><span className="text-slate-500">Reason:</span> {r.reason}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{r.message || "No message provided."}</p>
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
          <div className="bg-[#0f172a] border border-white/10 p-8 rounded-3xl w-[500px] shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-2">{selectedPrompt.title}</h2>
            <p className="text-slate-400 text-sm mb-6 pb-6 border-b border-white/10">{selectedPrompt.description}</p>
            <h3 className="font-semibold text-white mb-4">Full Report History</h3>
            <div className="max-h-[300px] overflow-auto space-y-3 pr-2 custom-scrollbar">
              {selectedPrompt.reports?.map((r, i) => (
                <div key={i} className="p-4 bg-black/40 rounded-xl border border-white/5">
                  <p className="text-sm text-slate-300 font-medium mb-1">{r.reason}</p>
                  <p className="text-xs text-slate-500 mb-2">{r.message}</p>
                  <p className="text-[10px] text-slate-600 flex items-center gap-1">
                    <Clock size={10} /> {new Date(r.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-end">
              <Button className="bg-[#1e293b] text-white" onClick={() => setSelectedPrompt(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#0f172a] border border-red-500/20 p-8 rounded-3xl w-[400px] shadow-2xl text-center">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="text-red-500" size={32} />
            </div>
            <h2 className="text-xl font-bold text-white">Delete Prompt?</h2>
            <p className="text-slate-400 text-sm mt-2 mb-6">Are you sure you want to permanently delete "{deleteConfirm.title}"? This action cannot be undone.</p>
            <div className="flex gap-3">
              <Button className="flex-1 bg-slate-800" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
              <Button className="flex-1 bg-red-600 text-white" onClick={() => handleDelete(deleteConfirm._id)}>Confirm Delete</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReportPage;