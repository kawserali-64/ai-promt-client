"use client";

import { useState } from "react";
import ReviewList from "./allpromt/ReviewList";
import ReviewForm from "./allpromt/ReviewForm";

const ReviewSection = ({ prompt, promptId }) => {
  const [refresh, setRefresh] = useState(false);

  const handleReviewAdded = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div className="space-y-6">
      <ReviewList
        prompt={prompt}
        promptId={promptId}
        refresh={refresh}
      />

      <ReviewForm
        promptId={promptId}
        onReviewAdded={handleReviewAdded}
      />
    </div>
  );
};

export default ReviewSection;