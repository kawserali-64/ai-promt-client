"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

function HeroBanner() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const trendingTags = [
    "#SEO",
    "#Marketing",
    "#Copywriter",
    "#Writing",
    "#Coding",
    "#Business",
  ];

  // Search Input
  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const query = searchQuery.trim();

    if (!query) {
      router.push("/all-promt");
      return;
    }

    // General search
    router.push(`/all-promt?search=${encodeURIComponent(query)}`);
  };

  // Trending Tag
  const handleTagClick = (tag) => {
    const cleanTag = tag.replace("#", "");

    // Tag filter
    router.push(`/all-promt?tags=${encodeURIComponent(cleanTag)}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative w-full bg-[#09090b] text-white overflow-hidden py-24">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl font-black mb-8"
          >
            Build Better With <br />
            <span className="text-violet-500">AI Precision</span>
          </motion.h1>

          <motion.form
            variants={itemVariants}
            onSubmit={handleSearchSubmit}
            className="relative max-w-lg mx-auto mb-10"
          >
            <div className="flex bg-white/5 p-2 rounded-2xl border border-white/10">
              <Search className="ml-3 mt-3.5 text-zinc-500" />

              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Find your perfect prompt..."
                className="flex-1 bg-transparent px-4 py-3 outline-none"
              />

              <Button
                type="submit"
                className="bg-violet-600 h-12 rounded-xl px-6"
              >
                Go
              </Button>
            </div>
          </motion.form>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-2"
          >
            {trendingTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className="text-xs px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/5"
              >
                {tag}
              </button>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroBanner;