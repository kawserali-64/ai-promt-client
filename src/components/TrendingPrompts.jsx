"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flame, Star, Cpu, Loader2 } from "lucide-react";
import { getTrendingPrompts } from "@/lib/api/prompt";

export default function TrendingPrompts() {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getTrendingPrompts();
        console.log("Fetched Data:", data);
        
        const promptList = Array.isArray(data) ? data : data?.prompts || [];
        setPrompts(promptList);
      } catch (err) {
        console.error("API Error:", err);
        setError("Failed to load trending assets.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="py-24 bg-white dark:bg-[#050505] relative min-h-[400px] transition-colors duration-300">
      {/* ব্যাকগ্রাউন্ড গ্রিড প্যাটার্ন (লাইট ও ডার্ক উভয়ের জন্য অপ্টিমাইজড) */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#8b5cf6 1px, transparent 1px)', backgroundSize: '30px 30px' }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter flex items-center gap-3">
            <span className="w-2 h-8 bg-violet-500 block"></span>
            Trending <span className="text-gray-400 dark:text-zinc-600">Assets</span>
          </h2>
        </div>

        {/* ১. লোডিং স্টেট */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
          </div>
        )}

        {/* ২. এরর স্টেট */}
        {error && !loading && (
          <div className="text-red-500 text-center py-10 font-medium">
            {error}
          </div>
        )}

        {/* ৩. ডেটা না থাকলে ফাঁকা মেসেজ */}
        {!loading && !error && prompts.length === 0 && (
          <div className="text-gray-500 dark:text-zinc-500 text-center py-10">
            No trending assets found.
          </div>
        )}

        {/* ৪. মেইন কন্টেন্ট গ্রিড */}
        {!loading && prompts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prompts.map((item, index) => (
              <motion.div
                key={item._id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative p-6 bg-gray-50 dark:bg-[#0a0a0c] border border-gray-200 dark:border-zinc-800 hover:border-violet-500/50 transition-all duration-300 group flex flex-col justify-between shadow-sm dark:shadow-none"
              >
                {/* কর্নার ডেকোরেশন */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-violet-500/50"></div>
                
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-10 h-10 rounded-lg bg-white dark:bg-zinc-900 flex items-center justify-center border border-gray-200 dark:border-zinc-800 group-hover:border-violet-500/30 transition-colors shadow-xs">
                      <Cpu size={18} className="text-violet-500" />
                    </div>
                    {index === 0 && (
                      <span className="text-[9px] font-black uppercase bg-violet-500 text-black dark:text-black px-2.5 py-1 tracking-wider">
                        Top Pick
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-6 leading-snug group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                </div>

                <div className="flex items-center gap-6 pt-4 border-t border-gray-200 dark:border-zinc-900 mt-auto">
                  <div className="flex items-center gap-1.5 text-gray-500 dark:text-zinc-500">
                    <Flame size={14} className="text-orange-500" />
                    <span className="text-[11px] font-bold tracking-widest">{item.copyCount || 0}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-500 dark:text-zinc-500">
                    <Star size={14} className="text-yellow-500" />
                    <span className="text-[11px] font-bold tracking-widest">
                      {item.averageRating ? item.averageRating.toFixed(1) : "0.0"}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}