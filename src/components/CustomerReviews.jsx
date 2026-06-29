"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote, Bot, CalendarDays, Mail } from "lucide-react";
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
      <section className="bg-[#050505] py-24 px-5">
        <div className="max-w-7xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-80 rounded-3xl bg-zinc-900 animate-pulse border border-zinc-800" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-[#050505] py-24 px-5 overflow-hidden">
      {/* ব্যাকগ্রাউন্ড গ্লো */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/10 via-[#050505] to-[#050505]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-5xl font-black text-white tracking-tight mb-6">
            Community <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">Feedback</span>
          </h2>
          <p className="text-zinc-500 font-medium">Trusted by thousands of prompt engineers and creators globally.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-8 rounded-3xl bg-[#0a0a0c] border border-zinc-800 hover:border-violet-500/50 transition-all duration-500 group"
            >
              <div className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <Quote size={40} className="text-violet-500/20" />
              </div>

              {/* ইউজার সেকশন */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img src={review.userPhoto} alt={review.userName} className="w-14 h-14 rounded-full object-cover border-2 border-zinc-800" />
                  <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-[#0a0a0c]"></div>
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">{review.userName}</h3>
                  <p className="text-xs text-zinc-600 flex items-center gap-1"><Mail size={10} /> {review.userEmail}</p>
                </div>
              </div>

              {/* রেটিং */}
              <div className="flex gap-0.5 mb-5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={14} className={star <= review.rating ? "fill-amber-400 text-amber-400" : "text-zinc-800"} />
                ))}
              </div>

              {/* মন্তব্য */}
              <p className="text-zinc-400 text-sm leading-relaxed mb-6 italic">
                "{review.comment}"
              </p>

              {/* ট্যাগ ও ফুটার */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-[10px] uppercase tracking-wider px-3 py-1 rounded-md bg-zinc-900 text-violet-400 font-bold border border-zinc-800">
                  {review.aiTool}
                </span>
                <span className="text-[10px] uppercase tracking-wider px-3 py-1 rounded-md bg-zinc-900 text-zinc-500 font-bold border border-zinc-800">
                  {review.promptTitle}
                </span>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex justify-between items-center text-[10px] font-bold text-zinc-600 uppercase">
                <span className="flex items-center gap-1.5"><CalendarDays size={12} /> {format(new Date(review.createdAt), "MMM dd, yyyy")}</span>
                <span className="text-zinc-400">{review.rating}.0 Rating</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;