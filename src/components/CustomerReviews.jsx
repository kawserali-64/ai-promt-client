"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Quote,
  Bot,
  CalendarDays,
  Mail,
} from "lucide-react";
import { format } from "date-fns";
import { getCustomerReviews } from "@/lib/api/prompt";

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await getCustomerReviews();
        setReviews(data?.reviews || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-5 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            Customer Reviews
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-72 rounded-3xl bg-base-200 animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-5 py-24">

      <div className="text-center max-w-2xl mx-auto mb-14">

        <span className="badge badge-primary badge-outline mb-4">
          Testimonials
        </span>

        <h2 className="text-4xl md:text-5xl font-bold">
          What Our Users Say
        </h2>

        <p className="mt-4 text-base-content/70">
          Discover what creators and AI enthusiasts think about the prompts
          shared on our marketplace.
        </p>
      </div>

      <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">

        {reviews.map((review, index) => (

          <motion.div
            key={review._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: index * 0.08,
            }}
            viewport={{ once: true }}
            whileHover={{
              y: -8,
            }}
            className="rounded-3xl border border-base-300 bg-base-100 shadow-xl p-7 transition-all duration-300"
          >

            <div className="flex items-center justify-between mb-6">

              <div className="flex items-center gap-4">

                <img
                  src={review.userPhoto}
                  alt={review.userName}
                  className="w-16 h-16 rounded-full object-cover ring ring-primary ring-offset-2"
                />

                <div>

                  <h3 className="font-bold text-lg">
                    {review.userName}
                  </h3>

                  <div className="flex items-center gap-1 text-sm opacity-70">

                    <Mail size={14} />

                    {review.userEmail}

                  </div>

                </div>

              </div>

              <Quote
                size={30}
                className="text-primary opacity-30"
              />

            </div>

            <div className="flex items-center gap-1 mb-5">

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

            <div className="flex flex-wrap gap-2 mb-5">

              <span className="badge badge-primary gap-1">

                <Bot size={14} />

                {review.aiTool}

              </span>

              <span className="badge badge-outline">

                {review.promptTitle}

              </span>

            </div>

            <p className="text-base-content/80 leading-7 line-clamp-5 min-h-[120px] italic">
              "{review.comment}"
            </p>

            <div className="mt-6 pt-5 border-t border-base-300 flex items-center justify-between text-sm opacity-70">

              <div className="flex items-center gap-2">

                <CalendarDays size={15} />

                {format(new Date(review.createdAt), "MMM dd, yyyy")}

              </div>

              <span className="font-semibold">
                {review.rating}.0 / 5
              </span>

            </div>

          </motion.div>

        ))}

      </div>

    </section>
  );
};

export default CustomerReviews;