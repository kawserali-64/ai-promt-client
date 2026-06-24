"use client";

import { useState, useEffect } from "react";
import { Card, Button } from "@heroui/react";
import { Bookmark, Flag } from "lucide-react";
import { toggleBookmark } from "@/lib/api/prompt";

const PromptHeader = ({ prompt, user }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  // REPORT STATES
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (prompt?.isBookmarked) {
      setIsSaved(true);
    }
  }, [prompt]);

  // ================= BOOKMARK =================
  const handleBookmark = async () => {
    try {
      const userId = user?.id || user?._id || user?.user?.id;

      if (!userId) {
        alert("Please login first");
        return;
      }

      setLoading(true);

      const res = await toggleBookmark({
        userId,
        promptId: prompt._id,
      });

      if (res.saved) {
        setIsSaved(true);
        alert("Saved to bookmarks");
      } else {
        setIsSaved(false);
        alert("Removed from bookmarks");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ================= REPORT =================
  const handleReport = async () => {
    try {
      const userId = user?.id || user?._id || user?.user?.id;

      if (!userId) {
        alert("Please login first");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/prompts/${prompt._id}/report`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            reason,
            message,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Reported successfully");
        setIsReportOpen(false);
        setReason("");
        setMessage("");
      } else {
        alert("Report failed");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <Card className="p-6">
        <div className="flex justify-between">
          <div>
            <h1 className="text-4xl font-bold">{prompt.title}</h1>

            <p className="mt-3 text-default-500">
              {prompt.description}
            </p>
          </div>

          <div className="flex gap-2">

            {/* BOOKMARK */}
            <Button
              isIconOnly
              variant={isSaved ? "solid" : "flat"}
              onClick={handleBookmark}
              disabled={loading}
            >
              <Bookmark
                size={18}
                fill={isSaved ? "currentColor" : "none"}
              />
            </Button>

            {/* REPORT BUTTON */}
            <Button
              isIconOnly
              variant="flat"
              onClick={() => setIsReportOpen(true)}
            >
              <Flag size={18} />
            </Button>

          </div>
        </div>
      </Card>

      {/* ================= REPORT MODAL ================= */}
      {isReportOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="w-[400px] bg-[#0f0f1a] border border-white/10 p-6 rounded-xl">

            <h2 className="text-xl font-bold mb-4">
              Report Prompt
            </h2>

            {/* REASON */}
            <select
              className="w-full p-2 bg-white/5 border border-white/10 rounded"
              onChange={(e) => setReason(e.target.value)}
            >
              <option value="">Select Reason</option>
              <option value="Spam">Spam</option>
              <option value="Inappropriate Content">Inappropriate Content</option>
              <option value="Copyright Violation">Copyright Violation</option>
            </select>

            {/* MESSAGE */}
            <textarea
              className="w-full mt-3 p-2 bg-white/5 border border-white/10 rounded"
              placeholder="Optional message"
              onChange={(e) => setMessage(e.target.value)}
            />

            <div className="flex justify-end gap-2 mt-4">

              <button
                onClick={() => setIsReportOpen(false)}
                className="px-3 py-1 bg-white/10 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleReport}
                className="px-3 py-1 bg-red-600 rounded"
              >
                Submit
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default PromptHeader;