"use client";

import { useState } from "react";
import { Card, Button } from "@heroui/react";
import { Star } from "lucide-react";

const ReviewForm = ({ promptId }) => {
  const [rating, setRating] = useState(0);

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
                : "cursor-pointer"
            }
          />
        ))}
      </div>

      <textarea
        rows={5}
        className="w-full border rounded-xl p-3"
      />

      <Button className="mt-4">
        Submit Review
      </Button>
    </Card>
  );
};

export default ReviewForm;