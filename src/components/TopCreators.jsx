"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Trophy, Zap, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { getTopCreators } from "@/lib/api/prompt";

export default function TopCreators() {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTopCreators();
        setCreators(data?.creators || []);
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
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold">
            🏆 Top Creators
          </h2>
          <p className="text-zinc-400 mt-2">
            Meet the most active AI prompt creators in our community
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {creators.map((creator, index) => {
            const isTop = index === 0;
            const isVerified = creator.role === "creator";

            return (
              <motion.div
                key={creator._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative p-6 rounded-2xl border transition
                ${
                  isTop
                    ? "border-yellow-400 bg-yellow-400/10 shadow-lg shadow-yellow-500/20"
                    : "border-zinc-800 bg-zinc-900 hover:bg-zinc-800"
                }`}
              >

                {/* RANK BADGE */}
                {isTop && (
                  <div className="absolute -top-3 -right-3 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Trophy size={14} /> #1 Creator
                  </div>
                )}

                {/* PROFILE */}
                <div className="flex items-center gap-4 mb-5">
                  <Image
                    src={creator.photo || "/avatar.png"}
                    alt="creator"
                    width={55}
                    height={55}
                    className="rounded-full border border-zinc-700"
                  />

                  <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      {creator.name}

                      {isVerified && (
                        <Star size={16} className="text-blue-400" />
                      )}
                    </h3>

                    <p className="text-xs text-zinc-400">
                      AI Prompt Creator
                    </p>
                  </div>
                </div>

                {/* STATS */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Prompts</span>
                    <span className="font-semibold">
                      {creator.totalPrompts}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-zinc-400 flex items-center gap-1">
                      <Zap size={14} /> Copies
                    </span>
                    <span className="font-semibold text-green-400">
                      {creator.totalCopies}
                    </span>
                  </div>
                </div>

                {/* BADGE */}
                <div className="mt-5 flex gap-2 flex-wrap">
                  {creator.totalCopies > 500 && (
                    <span className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded-full">
                      🔥 Top Performer
                    </span>
                  )}

                  {isVerified && (
                    <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded-full">
                      ⭐ Verified Creator
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}