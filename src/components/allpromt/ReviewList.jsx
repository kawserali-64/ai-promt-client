import { Card } from "@heroui/react";
import { Star } from "lucide-react";

const ReviewList = ({ prompt }) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-5">
        Reviews
      </h2>

      <p>
        Average Rating:
        {prompt.averageRating}
      </p>

      {/* reviews map হবে */}
    </Card>
  );
};

export default ReviewList;