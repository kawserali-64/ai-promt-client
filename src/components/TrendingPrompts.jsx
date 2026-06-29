"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flame, Star, Zap, Cpu } from "lucide-react";
import { getTrendingPrompts } from "@/lib/api/prompt";

export default function TrendingPrompts() {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getTrendingPrompts();
        setPrompts(data?.prompts || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="py-24 bg-[#050505] relative">
      {/* ব্যাকগ্রাউন্ড গ্রিড প্যাটার্ন */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#8b5cf6 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
            <span className="w-2 h-8 bg-violet-500 block"></span>
            Trending <span className="text-zinc-600">Assets</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {prompts.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative p-6 bg-[#0a0a0c] border border-zinc-800 hover:border-violet-500/50 transition-all duration-300 group"
            >
              {/* কর্নার ডেকোরেশন */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-violet-500/50"></div>
              
              <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center border border-zinc-800">
                  <Cpu size={18} className="text-violet-500" />
                </div>
                {index === 0 && (
                  <span className="text-[9px] font-black uppercase bg-violet-500 text-black px-2 py-1">Top Pick</span>
                )}
              </div>

              <h3 className="text-base font-bold text-white mb-4 leading-tight group-hover:text-violet-400 transition-colors">
                {item.title}
              </h3>

              <div className="flex items-center gap-6 mt-auto">
                <div className="flex items-center gap-1.5 text-zinc-500">
                  <Flame size={14} />
                  <span className="text-[11px] font-bold tracking-widest">{item.copyCount}</span>
                </div>
                <div className="flex items-center gap-1.5 text-zinc-500">
                  <Star size={14} />
                  <span className="text-[11px] font-bold tracking-widest">{item.averageRating?.toFixed(1) || "0.0"}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}