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
    <section className="py-32 bg-[#050505] text-white">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header - Minimalist & Punchy */}
        <div className="mb-24">
          <p className="text-violet-500 font-mono text-sm mb-4">04 // LEADERSHIP_BOARD</p>
          <h2 className="text-7xl font-black tracking-tighter italic">TOP ARCHITECTS</h2>
        </div>

        {/* Content - Cinematic Vertical Rows */}
        <div className="space-y-2">
          {creators.map((creator, index) => (
            <motion.div
              key={creator._id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: "circOut" }}
              className="group relative flex items-center justify-between py-10 border-b border-white/10 hover:border-violet-500 transition-colors duration-500"
            >
              {/* Index Number */}
              <div className="text-8xl font-black text-white/5 group-hover:text-violet-500/20 transition-colors absolute left-0 select-none">
                0{index + 1}
              </div>

              {/* Creator Info */}
              <div className="relative z-10 ml-10">
                <h3 className="text-3xl font-bold tracking-tight">{creator.name}</h3>
                <p className="text-zinc-500 font-mono mt-1">Verified Architect // {creator.role}</p>
              </div>

              {/* Stats */}
              <div className="relative z-10 flex items-center gap-12 font-mono text-lg">
                <div className="text-right">
                  <span className="block text-[10px] text-zinc-600 uppercase tracking-widest">Prompts</span>
                  {creator.totalPrompts}
                </div>
                <div className="text-right w-24">
                  <span className="block text-[10px] text-zinc-600 uppercase tracking-widest">Copies</span>
                  <span className="text-violet-400">{creator.totalCopies}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}