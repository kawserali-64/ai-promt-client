"use client";

import { useState, useEffect } from "react";
import { Card, Button } from "@heroui/react";
import { Bookmark, Star } from "lucide-react";
import { toggleBookmark } from "@/lib/api/prompt";

const PromptHeader = ({ prompt, user }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  // =========================
  // OPTIONAL: INIT STATE
  // =========================
  useEffect(() => {
    if (prompt?.isBookmarked) {
      setIsSaved(true);
    }
  }, [prompt]);

  // =========================
  // BOOKMARK HANDLER
  // =========================
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
  
  return (
    <Card className="p-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            {prompt.title}
          </h1>

          <p className="mt-3 text-default-500">
            {prompt.description}
          </p>
        </div>

        <div className="flex gap-2">

          {/* BOOKMARK BUTTON */}
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

          {/* STAR */}
          <Button isIconOnly variant="flat">
            <Star size={18} />
          </Button>

        </div>
      </div>
    </Card>
  );
};

export default PromptHeader;