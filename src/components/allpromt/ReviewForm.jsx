"use client";

import { useState } from "react";
import { Card, Button } from "@heroui/react";
import { Star } from "lucide-react";
import { createReview } from "@/lib/api/prompt";
import { useSession } from "@/lib/auth-client";

const ReviewForm = ({ promptId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();

  const handleSubmit = async () => {
    if (!rating) return alert("Give rating");
    if (!comment.trim()) return alert("Write comment");

    const userId = session?.user?.id;

    if (!userId) {
      return alert("Please login first");
    }

    try {
      setLoading(true);

      await createReview({
        promptId,
        rating,
        comment,
        userId,
      });

      setRating(0);
      setComment("");

      alert("Review submitted successfully!");
    } catch (err) {
      console.log("SUBMIT ERROR:", err);
      alert(err.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-5">
        Write Review
      </h2>

      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={30}
            onClick={() => setRating(star)}
            className={
              star <= rating
                ? "fill-yellow-400 text-yellow-400 cursor-pointer"
                : "cursor-pointer text-gray-400"
            }
          />
        ))}
      </div>

      <textarea
        rows={5}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review..."
        className="w-full border rounded-xl p-3"
      />

      <Button
        className="mt-4 w-full"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Review"}
      </Button>
    </Card>
  );
};

export default ReviewForm;