"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flame, Star, TrendingUp } from "lucide-react";
import { getTrendingPrompts } from "@/lib/api/prompt";

export default function TrendingPrompts() {
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTrendingPrompts();
        setPrompts(data?.prompts || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-24 bg-[#09090b] text-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold flex items-center justify-center gap-2">
            🔥 Trending Prompts
          </h2>
          <p className="text-zinc-400 mt-2">
            Most copied and highest performing prompts right now
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {prompts.map((item, index) => {
            const isTop = index === 0;

            return (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                className={`
                  relative p-6 rounded-2xl border transition-all
                  bg-zinc-900/60 backdrop-blur-md
                  ${isTop
                    ? "border-orange-400 shadow-lg shadow-orange-500/20"
                    : "border-zinc-800 hover:border-zinc-600"
                  }
                `}
              >

                {/* TOP BADGE */}
                {isTop && (
                  <div className="absolute -top-3 -right-3 bg-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <TrendingUp size={14} /> Trending #1
                  </div>
                )}

                {/* TITLE */}
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                  {item.title}
                </h3>

                {/* TOOL */}
                <p className="text-sm text-zinc-400 mb-4">
                  {item.tool}
                </p>

                {/* STATS */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-orange-400 font-medium">
                    <Flame size={16} />
                    {item.copyCount} copies
                  </div>

                  <div className="flex items-center gap-1 text-yellow-400 font-medium">
                    <Star size={16} />
                    {item.averageRating?.toFixed(1) || 0}
                  </div>
                </div>

                {/* GLOW EFFECT */}
                <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition bg-gradient-to-r from-orange-500/10 to-pink-500/10 pointer-events-none" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}