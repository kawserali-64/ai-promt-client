"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Loading() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center font-sans overflow-hidden transition-colors duration-300 bg-slate-50 dark:bg-[#0a0814] text-slate-950 dark:text-white">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 blur-[120px] pointer-events-none rounded-full transition-all duration-300 bg-purple-500/15 dark:bg-purple-600/15" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 blur-[100px] pointer-events-none rounded-full transition-all duration-300 bg-violet-500/15 dark:bg-violet-600/10" />

      {/* Main Loader Card */}
      <div className="relative z-10 flex flex-col items-center gap-6 p-8 rounded-3xl border backdrop-blur-2xl transition-all duration-300 border-purple-200/80 bg-white/95 shadow-2xl shadow-purple-900/10 dark:border-purple-500/15 dark:bg-[#0f0c1f]/60 dark:shadow-[0_0_50px_-15px_rgba(147,51,234,0.3)]">

        {/* Animated Spinner with Sparkles */}
        <div className="relative flex items-center justify-center w-16 h-16">
          {/* Outer Pulsing Glow */}
          <motion.div
            className="absolute inset-0 rounded-full blur-md bg-gradient-to-tr from-purple-500 via-violet-400 to-indigo-500 opacity-20 dark:from-purple-600 dark:via-violet-500 dark:to-indigo-600 dark:opacity-30"
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
          />

          {/* Spinning Ring */}
          <div className="w-16 h-16 rounded-full border-2 animate-spin border-purple-200 border-t-purple-600 border-r-violet-500 dark:border-purple-500/20 dark:border-t-purple-500 dark:border-r-violet-400" />

          {/* Center Brand Icon */}
          <div className="absolute flex items-center justify-center w-10 h-10 rounded-full border shadow-inner bg-purple-100/80 border-purple-200 text-purple-700 dark:bg-[#0a0814] dark:border-purple-500/30 dark:text-purple-300">
            <Sparkles size={18} className="animate-pulse text-purple-700 dark:text-purple-400" />
          </div>
        </div>

        {/* Text Details */}
        <div className="text-center space-y-1.5">
          <h3 className="font-bold text-base tracking-wide flex items-center justify-center gap-2 text-black dark:text-violet-600">
            AI Prompt Marketplace
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-600" />
            </span>
          </h3>

          <p className="text-xs font-bold tracking-wider animate-pulse text-purple-950 dark:text-purple-200">
            Loading marketplace resources...
          </p>
        </div>
      </div>
    </div>
  );
}