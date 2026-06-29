"use client";

import { useState } from "react";
import { Card, Button } from "@heroui/react";
import { Star, Send } from "lucide-react";
import { createReview } from "@/lib/api/prompt";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";

const ReviewForm = ({ promptId, onReviewAdded }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [hovered, setHovered] = useState(0);

  const { data: session } = useSession();

  const handleSubmit = async () => {
    if (!rating) {
      return toast.error("Please give a rating");
    }

    if (!comment.trim()) {
      return toast.error("Write a review comment");
    }

    const userId = session?.user?.id;

    if (!userId) {
      return toast.warning("Please login first");
    }

    try {
      setLoading(true);

      await createReview({
        promptId,
        rating,
        comment,
        userId,
        name: session?.user?.name,
        email: session?.user?.email,
      });

      toast.success("Review submitted successfully!");

      // Clear Form
      setRating(0);
      setComment("");

      // Refresh Review List
      if (onReviewAdded) {
        onReviewAdded();
      }
    } catch (err) {
      toast.error(err.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-8 bg-[#0a0a0a] border border-white/5 rounded-[32px] shadow-none">
      <h2 className="text-2xl font-bold text-white mb-2">
        Write a Review
      </h2>

      <p className="text-zinc-500 mb-6">
        Share your experience with this prompt.
      </p>

      {/* Rating */}
      <div className="flex gap-2 mb-6">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={30}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => setRating(star)}
            className={`cursor-pointer transition-all duration-200 ${
              star <= (hovered || rating)
                ? "fill-yellow-400 text-yellow-400 scale-110"
                : "text-zinc-700"
            }`}
          />
        ))}
      </div>

      {/* Comment */}
      <textarea
        rows={5}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your honest opinion..."
        className="w-full rounded-2xl bg-[#111] border border-white/10 p-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500"
      />

      <Button
        className="mt-6 w-full h-12 rounded-xl bg-white text-black font-semibold"
        onClick={handleSubmit}
        isLoading={loading}
        startContent={!loading && <Send size={18} />}
      >
        {loading ? "Submitting..." : "Submit Review"}
      </Button>
    </Card>
  );
};

export default ReviewForm;