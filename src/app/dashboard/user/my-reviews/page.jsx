"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { Card } from "@heroui/react";
import { Star } from "lucide-react";
import { getReviews } from "@/lib/api/prompt";

const MyReviewPage = () => {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const loadReviews = async () => {
      if (!session?.user?.id) return;

      try {
        const data = await getReviews({
          userId: session.user.id,
        });

        setReviews(data);
      } catch (error) {
        console.log(error);
      }
    };

    loadReviews();
  }, [session]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        My Reviews
      </h1>

      {reviews.length === 0 ? (
        <Card className="p-6">
          No reviews found
        </Card>
      ) : (
        reviews.map((review) => (
          <Card key={review._id} className="p-5">
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={18}
                  className={
                    star <= review.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>

            <p>{review.comment}</p>

            <p className="text-sm text-gray-500 mt-2">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </Card>
        ))
      )}
    </div>
  );
};

export default MyReviewPage;