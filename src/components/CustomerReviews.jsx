"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote, CalendarDays, Mail } from "lucide-react";
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
      <section className="bg-[#f8f7fc] dark:bg-[#030014] py-24 px-5 w-full transition-colors duration-300">
        <div className="max-w-7xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-80 rounded-3xl bg-white dark:bg-white/[0.02] animate-pulse border border-zinc-200 dark:border-white/10" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-[#f8f7fc] dark:bg-[#030014] py-24 px-5 w-full overflow-hidden transition-colors duration-300">
      
      {/* ব্যাকগ্রাউন্ড সফট গ্লো */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-500/5 dark:bg-violet-900/10 blur-[120px] pointer-events-none rounded-full" />

      {/* ফুল উইডথ কন্টেইনার */}
      <div className="w-full max-w-7xl mx-auto relative z-10">
        
        {/* হেডার সেকশন */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-block px-3.5 py-1 mb-3 rounded-full text-xs font-semibold uppercase tracking-wider text-violet-700 dark:text-violet-400 bg-violet-100/80 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-800/50 shadow-sm">
            Community
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
            Community <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400">Feedback</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 font-normal text-sm md:text-base">Trusted by thousands of prompt engineers and creators globally.</p>
        </div>

        {/* রিভিউ কার্ডস গ্রিড */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <motion.div
              key={review._id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative p-8 rounded-3xl bg-white dark:bg-[#0c0a1d] border border-zinc-200/90 dark:border-white/10 hover:border-violet-500/50 dark:hover:border-violet-500/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_40px_rgba(124,58,237,0.12)] transition-all duration-500 group flex flex-col justify-between"
            >
              <div className="absolute top-4 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Quote size={32} className="text-violet-500/20" />
              </div>

              <div>
                {/* ইউজার সেকশন */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <img src={review.userPhoto} alt={review.userName} className="w-14 h-14 rounded-full object-cover border-2 border-violet-500/20 shadow-sm" />
                    <div className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-[#0c0a1d]"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-900 dark:text-white text-base">{review.userName}</h3>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 flex items-center gap-1 mt-0.5"><Mail size={10} /> {review.userEmail}</p>
                  </div>
                </div>

                {/* রেটিং */}
                <div className="flex gap-1 mb-4 bg-amber-500/10 dark:bg-amber-500/5 w-fit px-2.5 py-1 rounded-lg">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={13} className={star <= review.rating ? "fill-amber-400 text-amber-400" : "text-zinc-200 dark:text-zinc-800"} />
                  ))}
                </div>

                {/* মন্তব্য */}
                <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed mb-6 italic">
                  "{review.comment}"
                </p>
              </div>

              <div>
                {/* ট্যাগ ও ফুটার */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-[10px] uppercase tracking-wider px-3 py-1 rounded-lg bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 font-bold border border-violet-100 dark:border-violet-900/50">
                    {review.aiTool}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider px-3 py-1 rounded-lg bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 font-bold border border-zinc-200 dark:border-white/5">
                    {review.promptTitle}
                  </span>
                </div>

                <div className="pt-4 border-t border-zinc-100 dark:border-white/5 flex justify-between items-center text-[11px] font-medium text-zinc-400 dark:text-zinc-500">
                  <span className="flex items-center gap-1.5"><CalendarDays size={13} /> {review.createdAt ? format(new Date(review.createdAt), "MMM dd, yyyy") : ""}</span>
                  <span className="font-bold text-violet-600 dark:text-violet-400">{review.rating}.0 Rating</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;