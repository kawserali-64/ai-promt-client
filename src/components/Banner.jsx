"use client";
import { useState } from "react";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { Search, Sparkles, ArrowRight, Code2, Terminal, Cpu } from "lucide-react";

function HeroBanner({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const trendingTags = [
    "#SEO Optimize",
    "#React Component",
    "#Copywriter",
    "#Midjourney v6",
    "#Gemini Code",
    "#Claude Architect"
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
  };

  const handleTagClick = (tag) => {
    const cleanTag = tag.replace("#", "");
    setSearchQuery(cleanTag);
    if (onSearch) onSearch(cleanTag);
  };

  // Framer Motion এন্ট্রান্স অ্যানিমেশন
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const cardFloating = {
    animate: {
      y: [0, -10, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <section className="relative flex min-h-[90vh] w-full items-center justify-center overflow-hidden bg-[#09090b] px-4 py-20 sm:px-6 lg:px-8">
      
      {/* 🌌 ব্যাকগ্রাউন্ড আর্কিটেকচার (সাইড গ্লো এবং ফাইন গ্রিড) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_top_right,black_30%,transparent_80%)]"></div>
      <div className="absolute -top-20 -right-20 h-[600px] w-[600px] rounded-full bg-indigo-600/10 blur-[140px]"></div>
      <div className="absolute -bottom-40 -left-20 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[130px]"></div>

      <div className="mx-auto max-w-7xl w-full z-10">
        {/* ডেসকটপে ২-কলামের সিনেমাটিক স্প্লিট লেআউট */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          
          {/* ================= বাম কলাম: টেক্সট, কাস্টম সার্চ ও ট্যাগস ================= */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* প্রিমিয়াম আল্ট্রা-ব্যাজ */}
            <motion.div variants={itemVariants} className="mb-5 flex">
              <div className="inline-flex items-center gap-1.5 rounded-xl border border-violet-500/20 bg-violet-500/5 px-3 py-1 text-xs font-semibold text-violet-400 backdrop-blur-md shadow-[0_0_15px_rgba(124,58,237,0.05)]">
                <Sparkles className="h-3.5 w-3.5 text-violet-400" />
                The Ultimate Prompt Platform
              </div>
            </motion.div>

            {/* হেডিং (স্ক্রিনশটের মতো এক লাইনে না রেখে বোল্ড এসমেট্রিক লুক) */}
            <motion.h1 
              variants={itemVariants}
              className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl/none font-black"
            >
              Unlock the Power of <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
                Generative AI
              </span>
            </motion.h1>

            {/* ডেসক্রিপশন */}
            <motion.p 
              variants={itemVariants}
              className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400"
            >
              Discover, bookmark, and run engineering-grade prompts for ChatGPT, Gemini, Claude, and Midjourney. Boost your productivity today.
            </motion.p>

            {/* কাস্টম ডিজাইনড গ্লোয়িং সার্চ বার */}
            <motion.form 
              variants={itemVariants}
              onSubmit={handleSearchSubmit}
              className="mt-8 max-w-xl"
            >
              <div className="group relative flex items-center rounded-2xl border border-white/5 bg-zinc-900/40 p-2 backdrop-blur-xl transition-all duration-300 focus-within:border-violet-500/40 focus-within:shadow-[0_0_30px_rgba(124,58,237,0.15)]">
                <div className="flex flex-1 items-center gap-3 px-3">
                  <Search className="h-5 w-5 text-zinc-500 group-focus-within:text-violet-400 transition-colors" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search prompts by title, tags, or AI tools..."
                    className="w-full bg-transparent text-sm text-white placeholder-zinc-500 outline-none focus:ring-0"
                  />
                </div>
                <Button
                  type="submit"
                  size="md"
                  className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 font-semibold text-white hover:opacity-90"
                >
                  Search
                </Button>
              </div>
            </motion.form>

            {/* ট্রেন্ডিং ট্যাগস (মিনিমালিস্টিক পিল শেপ) */}
            <motion.div 
              variants={itemVariants}
              className="mt-5 flex flex-wrap gap-2 max-w-xl"
            >
              {trendingTags.map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => handleTagClick(tag)}
                  className="rounded-lg border border-white/5 bg-white/[0.01] px-2.5 py-1 text-xs font-medium text-zinc-500 transition-all hover:border-violet-500/30 hover:bg-violet-500/5 hover:text-violet-400"
                >
                  {tag}
                </button>
              ))}
            </motion.div>

            {/* কল-টু-অ্যাকশন বাটন্স */}
            <motion.div 
              variants={itemVariants}
              className="mt-8 flex flex-col sm:flex-row items-center gap-4"
            >
              <Button
                href="/all-prompts"
                className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-white px-6 py-6 text-sm font-bold text-black transition-all hover:bg-zinc-200"
              >
                Explore All Prompts
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                href="/dashboard"
                className="flex w-full sm:w-auto items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] px-6 py-6 text-sm font-semibold text-zinc-300 hover:bg-white/5 hover:text-white transition-all"
              >
                Become a Creator
              </Button>
            </motion.div>

          </div>

          {/* ================= ডান কলাম: সিনেমাটিক গ্লোয়িং কোড/কার্ড প্রিভিউ ================= */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-5 relative hidden lg:flex justify-center items-center"
          >
            {/* কার্ডের পেছনের অ্যাম্বিয়েন্ট লাইট */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-violet-500/20 blur-[100px]"></div>

            {/* ফ্লোটিং আর্কিটেকচার মেকার কার্ড */}
            <motion.div 
              variants={cardFloating}
              animate="animate"
              className="w-full max-w-[380px] rounded-2xl border border-white/10 bg-[#0e0e12]/90 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl"
            >
              {/* কার্ড টপ */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-800 text-violet-400">
                    <Terminal className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-semibold text-zinc-400">Midjourney_v6.config</span>
                </div>
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
              </div>

              {/* কন্টেন্ট বা বক্স কোড এরিয়া */}
              <div className="rounded-xl bg-black/40 p-4 border border-white/5 font-mono text-xs text-zinc-400 leading-relaxed">
                <span className="text-violet-400">/imagine prompt:</span> ultra-premium cinematic tech dashboard, cyber neon accents, minimal asset grid, 8k resolution, octane render, matte black <span className="text-indigo-400">--v 6.0 --ar 16:9</span>
              </div>

              {/* মেটা ইনফো ট্যাগ */}
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500">
                <div className="flex items-center gap-1">
                  <Code2 className="h-3.5 w-3.5 text-zinc-400" />
                  <span>Engineering Grade</span>
                </div>
                <div className="flex items-center gap-1 text-violet-400 font-medium">
                  <Cpu className="h-3.5 w-3.5" />
                  <span>9.8k Copies</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}

export default HeroBanner;