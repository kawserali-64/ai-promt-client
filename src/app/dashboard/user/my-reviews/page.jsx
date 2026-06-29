"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { Card, Button } from "@heroui/react";
import { Star, Eye, MessageSquare, Calendar, Bot } from "lucide-react";
import { getReviews } from "@/lib/api/prompt";
import Link from "next/link";

const MyReviewPage = () => {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const loadReviews = async () => {
      if (!session?.user?.id) return;
      try {
        const data = await getReviews({ userId: session.user.id });
        setReviews(data);
      } catch (error) {
        console.log(error);
      }
    };
    loadReviews();
  }, [session]);

  return (
    <div className="min-h-screen bg-[#050505] p-4 md:p-8">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-white tracking-tight">My Reviews</h1>
        <p className="text-zinc-500 mt-2">Manage and track all your feedback history.</p>
      </div>

      {reviews.length === 0 ? (
        <Card className="p-16 text-center bg-[#0a0a0a] border border-white/5 rounded-[32px] shadow-none">
          <MessageSquare className="mx-auto text-zinc-700 mb-4" size={48} />
          <p className="text-zinc-500 font-medium">No reviews submitted yet</p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="group bg-[#0a0a0a] border border-white/5 p-6 rounded-[24px] hover:border-violet-500/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              {/* Info Section */}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white group-hover:text-violet-400 transition-colors">
                  {review.promptTitle}
                </h3>
                <div className="flex items-center gap-4 mt-3 text-xs text-zinc-500 font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1.5"><Bot size={14} /> {review.aiTool}</span>
                  <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(review.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Comment Section */}
              <div className="md:max-w-[300px] text-sm text-zinc-400 italic">
                "{review.comment}"
              </div>

              {/* Rating & Action */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1.5 text-yellow-500 font-black">
                  <Star size={16} fill="currentColor" />
                  <span>{review.rating}.0</span>
                </div>
                <Link href={`/all-promt/${review.promptId}`}>
                  <Button
                    size="sm"
                    className="bg-white text-black font-bold hover:bg-zinc-200"
                    startContent={<Eye size={14} />}
                  >
                    View Prompt
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviewPage;