"use client";

import { Check, Sparkles, Zap } from "lucide-react";

const PlanPage = () => {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden transition-colors duration-300">
      {/* Background Ambient Glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-violet-600/10 dark:bg-violet-600/20 rounded-full blur-[150px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-[150px]" />

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full relative z-10">
        
        {/* ================= FREE PLAN ================= */}
        <div className="group relative rounded-[32px] border border-zinc-200/80 dark:border-white/5 bg-white dark:bg-[#0a0a0a] p-8 transition-all duration-500 hover:border-zinc-300 dark:hover:border-white/20 shadow-xl shadow-zinc-200/50 dark:shadow-none">
          <h2 className="text-2xl font-black text-zinc-900 dark:text-white">Free Plan</h2>
          <p className="text-zinc-500 mt-2 text-sm">Basic access for new creators</p>
          
          <div className="mt-8 text-5xl font-black text-zinc-900 dark:text-white">
            $0 <span className="text-sm font-medium text-zinc-400 dark:text-zinc-600">/ forever</span>
          </div>

          <ul className="mt-8 space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
            {["Create up to 3 prompts", "Basic templates", "Community access"].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-zinc-100 dark:bg-white/5 flex items-center justify-center border border-zinc-200 dark:border-white/10">
                  <Check size={12} className="text-zinc-700 dark:text-zinc-300" />
                </div>
                {item}
              </li>
            ))}
          </ul>
          
          <button disabled className="mt-10 w-full py-4 rounded-2xl bg-zinc-100 dark:bg-white/5 text-zinc-400 dark:text-zinc-600 font-bold cursor-not-allowed border border-zinc-200/60 dark:border-white/5">
            Current Plan
          </button>
        </div>

        {/* ================= PREMIUM PLAN ================= */}
        <div className="group relative rounded-[32px] border border-violet-500/30 bg-white dark:bg-[#0a0a0a] p-8 shadow-xl shadow-violet-500/10 dark:shadow-[0_0_50px_-20px_rgba(139,92,246,0.3)] transition-all duration-300">
          
          <div className="absolute -top-3 right-8 px-4 py-1 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-[10px] font-black tracking-widest text-white uppercase shadow-lg shadow-violet-500/20">
            Recommended
          </div>

          <h2 className="text-2xl font-black text-zinc-900 dark:text-white flex items-center gap-2">
            Premium <Sparkles size={20} className="text-violet-600 dark:text-violet-400" />
          </h2>
          <p className="text-zinc-500 mt-2 text-sm">Full access for professionals</p>

          <div className="mt-8 text-5xl font-black text-zinc-900 dark:text-white">
            $5 <span className="text-sm font-medium text-zinc-500">/ one-time</span>
          </div>

          <ul className="mt-8 space-y-4 text-sm text-zinc-700 dark:text-white">
            {[ "Unlimited prompts", "Access private prompts", "Copy without limits", "Priority features", "Monetization access"].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-violet-500/10 dark:bg-violet-500/20 flex items-center justify-center border border-violet-500/30">
                  <Check size={12} className="text-violet-600 dark:text-violet-400" />
                </div>
                {item}
              </li>
            ))}
          </ul>

          <form action="/api/checkout_sessions" method="POST">
            {/* Fix: Light mode এ ভায়োলেট/ইন্ডিগো কালার এবং Dark mode এ হোয়াইট ব্যাকগ্রাউন্ড করা হয়েছে যাতে দেখতে একদম পারফেক্ট লাগে */}
            <button type="submit" className="mt-10 w-full py-4 rounded-2xl bg-violet-600 text-white hover:bg-violet-700 dark:bg-white dark:text-black dark:hover:bg-violet-500 dark:hover:text-white font-black transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-violet-600/25 dark:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              Unlock Premium <Zap size={16} />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default PlanPage;