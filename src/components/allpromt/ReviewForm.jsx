"use client";

import { useEffect, useState } from "react";
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
const [isDark, setIsDark] = useState(false);

const { data: session } = useSession();

useEffect(() => {
const checkTheme = () => {
setIsDark(document.documentElement.classList.contains("dark"));
};


checkTheme();

const observer = new MutationObserver(checkTheme);

observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["class"],
});

return () => observer.disconnect();


}, []);

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
<Card
className={`p-8 border rounded-[32px] shadow-none ${
        isDark
          ? "bg-[#0a0a0a] border-white/5"
          : "bg-white border-zinc-200"
      }`}
>
<h2
className={`text-2xl font-bold mb-2 ${
          isDark ? "text-white" : "text-violet-600"
        }`}
>
Write a Review </h2>

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
            : isDark
            ? "text-zinc-700"
            : "text-zinc-300"
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
    className={`w-full rounded-2xl border p-4 focus:outline-none focus:border-violet-500 ${
      isDark
        ? "bg-[#111] border-white/10 text-white placeholder:text-zinc-600"
        : "bg-white border-zinc-200 text-zinc-900 placeholder:text-zinc-400"
    }`}
  />

  <Button
    className={`mt-6 w-full h-12 rounded-xl font-semibold ${
      isDark
        ? "bg-white text-black"
        : "bg-violet-600 text-white"
    }`}
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
