"use client";

import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { Bookmark, Flag, X, AlertCircle } from "lucide-react";
import { toggleBookmark } from "@/lib/api/prompt";
import { toast } from "react-toastify";

const PromptHeader = ({ prompt, user }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (prompt?.isBookmarked) setIsSaved(true);
  }, [prompt]);

  const handleBookmark = async () => {
    const userId = user?.id || user?._id || user?.user?.id;
    if (!userId) return toast.error("Please login first");

    setLoading(true);
    try {
      const res = await toggleBookmark({ userId, promptId: prompt._id });
      setIsSaved(res.saved);
      toast.success(res.saved ? "Added to your library" : "Removed from library");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleReport = async () => {
    if (!reason) return toast.error("Please select a reason");
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/prompts/${prompt._id}/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user?.id, reason, message }),
      });
      if ((await res.json()).success) {
        toast.success("Reported successfully");
        setIsReportOpen(false);
      }
    } catch { toast.error("Report failed"); }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">{prompt.title}</h1>
          <p className="mt-4 text-zinc-400 leading-relaxed max-w-2xl">{prompt.description}</p>
        </div>

        <div className="flex gap-2 shrink-0">
          <Button
            isIconOnly
            variant="flat"
            className={`${isSaved ? "bg-violet-500/20 text-violet-400" : "bg-white/5 hover:bg-white/10"}`}
            onClick={handleBookmark}
            isLoading={loading}
          >
            <Bookmark size={20} fill={isSaved ? "currentColor" : "none"} />
          </Button>

          <Button isIconOnly variant="flat" className="bg-white/5 hover:bg-red-500/10 hover:text-red-500" onClick={() => setIsReportOpen(true)}>
            <Flag size={20} />
          </Button>
        </div>
      </div>

      {/* Report Modal */}
      {isReportOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#0a0a0a] border border-white/10 p-8 rounded-[32px] relative">
            <button onClick={() => setIsReportOpen(false)} className="absolute top-6 right-6 text-zinc-500 hover:text-white"><X size={20}/></button>
            
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="text-red-500" />
              <h2 className="text-xl font-bold">Report Prompt</h2>
            </div>

            <select className="w-full p-4 bg-[#111] border border-white/5 rounded-xl mb-3 text-sm" onChange={(e) => setReason(e.target.value)}>
              <option value="">Select a reason</option>
              <option value="Spam">Spam</option>
              <option value="Inappropriate Content">Inappropriate Content</option>
              <option value="Copyright Violation">Copyright Violation</option>
            </select>

            <textarea className="w-full p-4 bg-[#111] border border-white/5 rounded-xl mb-6 text-sm min-h-[100px]" placeholder="Additional details..." onChange={(e) => setMessage(e.target.value)} />

            <Button className="w-full bg-white text-black font-bold h-12 rounded-xl" onClick={handleReport}>Submit Report</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default PromptHeader;