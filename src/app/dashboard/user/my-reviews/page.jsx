"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { Card, Button } from "@heroui/react";
import { Star, Eye } from "lucide-react";
import { getReviews } from "@/lib/api/prompt";
import Link from "next/link";

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
      <div>
        <h1 className="text-3xl font-bold text-white">
          My Reviews
        </h1>
        <p className="text-default-500 mt-1">
          Manage and track all your submitted reviews.
        </p>
      </div>

      {reviews.length === 0 ? (
        <Card className="p-10 text-center">
          <p className="text-default-500">
            No reviews found
          </p>
        </Card>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#050816]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase text-default-500">
                <th className="px-6 py-4 text-left">
                  Prompt Title
                </th>

                <th className="px-6 py-4 text-left">
                  AI Tool
                </th>

                <th className="px-6 py-4 text-left">
                  Rating
                </th>

                <th className="px-6 py-4 text-left">
                  Comments
                </th>

                <th className="px-6 py-4 text-left">
                  Submitted Date
                </th>

                <th className="px-6 py-4 text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {reviews.map((review) => (
                <tr
                  key={review._id}
                  className="border-b border-white/5 hover:bg-white/[0.03] transition"
                >
                  <td className="px-6 py-5 font-medium text-white">
                    {review.promptTitle}
                  </td>

                  <td className="px-6 py-5">
                    <span className="px-3 py-1 text-xs rounded-full bg-violet-500/20 text-violet-300">
                      {review.aiTool}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star
                        size={14}
                        fill="currentColor"
                      />
                      <span>{review.rating}.0</span>
                    </div>
                  </td>

                  <td className="px-6 py-5 max-w-[250px] truncate text-default-400">
                    "{review.comment}"
                  </td>

                  <td className="px-6 py-5 text-default-400">
                    {new Date(
                      review.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-5 text-center">
                    <Link href={`/all-promt/${review.promptId}`}>
                      <Button
                        size="sm"
                        variant="bordered"
                        startContent={<Eye size={14} />}
                      >
                        View
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyReviewPage;