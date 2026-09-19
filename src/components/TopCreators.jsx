"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { getTopCreators } from "@/lib/api/prompt";

export default function TopCreators() {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTopCreators();
      setCreators(data?.creators || []);
    };

    fetchData();
  }, []);

  return (
    <section className="relative py-32 bg-white dark:bg-[#030014] text-zinc-900 dark:text-white transition-colors duration-300 overflow-hidden">
      
      {/* ব্যাকগ্রাউন্ড ওয়েভ ও গ্রেডিয়েন্ট */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-purple-100/60 via-purple-50/20 to-transparent dark:from-purple-950/20 dark:via-transparent pointer-events-none" />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[800px] h-48 bg-purple-200/40 dark:bg-purple-900/10 rounded-[100%] blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-24">
          <p className="text-violet-600 dark:text-violet-500 font-mono text-sm mb-4">
            04 // LEADERSHIP_BOARD
          </p>

          {/* হেডিং: TOP লেখাটি হোয়াইট মোডে ব্ল্যাক এবং ডার্ক মোডে হোয়াইট থাকবে */}
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic">
            <span className="!text-zinc-900 dark:!text-white">TOP </span>
            <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
              ARCHITECTS
            </span>
          </h2>
        </div>

        {/* Content */}
        <div className="space-y-2">
          {creators.map((creator, index) => (
            <motion.div
              key={creator._id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: "circOut",
              }}
              className="group relative flex items-center justify-between py-10 border-b border-zinc-200 dark:border-white/10 hover:border-violet-500 transition-colors duration-500"
            >
              {/* Index Number */}
              <div className="text-7xl md:text-8xl font-black text-zinc-100 dark:text-white/5 group-hover:text-violet-500/20 transition-colors absolute left-0 select-none">
                0{index + 1}
              </div>

              {/* Creator Info */}
              <div className="relative z-10 ml-10">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight !text-black dark:!text-white">
                  {creator.name}
                </h3>

                <p className="text-zinc-500 dark:text-zinc-400 font-mono mt-1">
                  Verified Architect // {creator.role}
                </p>
              </div>

              {/* Stats */}
              <div className="relative z-10 flex items-center gap-6 md:gap-12 font-mono text-lg">
                <div className="text-right">
                  <span className="block text-[10px] text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">
                    Prompts
                  </span>

                  <span className="!text-zinc-800 dark:!text-white">
                    {creator.totalPrompts}
                  </span>
                </div>

                <div className="text-right w-24">
                  <span className="block text-[10px] text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">
                    Copies
                  </span>

                  <span className="text-violet-600 dark:text-violet-400">
                    {creator.totalCopies}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}