"use client";

import { useEffect, useState } from "react";
import { Card } from "@heroui/react";
import { Star } from "lucide-react";
import { getReviews } from "@/lib/api/prompt";

const ReviewList = ({ prompt, promptId, refresh }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [averageRating, setAverageRating] = useState(
    Number(prompt?.averageRating || 0)
  );

  const [totalReviews, setTotalReviews] = useState(
    Number(prompt?.totalReviews || 0)
  );

  const fetchReviews = async () => {
    try {
      setLoading(true);

      const res = await getReviews({ promptId });

      const reviewData =
        res?.reviews ??
        res?.data?.reviews ??
        (Array.isArray(res) ? res : []);

      setReviews(reviewData);

      const total = reviewData.length;

      const avg =
        total === 0
          ? 0
          : reviewData.reduce(
              (sum, item) => sum + Number(item.rating || 0),
              0
            ) / total;

      setAverageRating(avg);
      setTotalReviews(total);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (promptId) {
      fetchReviews();
    }
  }, [promptId, refresh]);

  return (
    <Card className="p-8 bg-[#0a0a0a] border border-white/5 rounded-[32px] shadow-none">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Reviews
          </h2>
          <p className="text-zinc-500 mt-1">
            What users think about this prompt
          </p>
        </div>

        <div className="text-right">
          <h3 className="text-3xl font-bold text-yellow-400">
            {averageRating.toFixed(1)}
          </h3>
          <p className="text-sm text-zinc-500">
            {totalReviews} Reviews
          </p>
        </div>
      </div>

      {/* LOADING */}
      {loading ? (
        <p className="text-zinc-500">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-zinc-500">
          No reviews yet. Be the first to review this prompt.
        </p>
      ) : (
        <div className="space-y-5">
          {reviews.map((review) => {
            const name =
              review.name ||
              review.user?.name ||
              "Anonymous";

            const email =
              review.email ||
              review.user?.email ||
              "No email";

            const comment =
              review.comment ||
              review.text ||
              "";

            const date =
              review.createdAt ||
              review.created_at;

            return (
              <div
                key={review._id}
                className="rounded-2xl border border-white/10 bg-[#111] p-5"
              >
                {/* USER INFO */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-white font-semibold">
                      {name}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1">
                      {email}
                    </p>
                  </div>

                  {/* STARS */}
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        size={16}
                        className={
                          index < (review.rating || 0)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-zinc-700"
                        }
                      />
                    ))}
                  </div>
                </div>

                {/* COMMENT */}
                <p className="text-zinc-300 leading-7 mt-5">
                  {comment}
                </p>

                {/* DATE */}
                <p className="text-xs text-zinc-500 mt-5">
                  {date
                    ? new Date(date).toLocaleDateString()
                    : "No date"}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default ReviewList;