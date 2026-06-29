"use client";

import { Check, Sparkles, Zap } from "lucide-react";

const PlanPage = () => {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[150px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px]" />

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full relative z-10">
        
        {/* ================= FREE PLAN ================= */}
        <div className="group relative rounded-[32px] border border-white/5 bg-[#0a0a0a] p-8 transition-all duration-500 hover:border-white/20">
          <h2 className="text-2xl font-black text-white">Free Plan</h2>
          <p className="text-zinc-500 mt-2 text-sm">Basic access for new creators</p>
          
          <div className="mt-8 text-5xl font-black text-white">
            $0 <span className="text-sm font-medium text-zinc-600">/ forever</span>
          </div>

          <ul className="mt-8 space-y-4 text-sm text-zinc-400">
            {["Create up to 3 prompts", "Basic templates", "Community access"].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <Check size={12} />
                </div>
                {item}
              </li>
            ))}
          </ul>
          
          <button disabled className="mt-10 w-full py-4 rounded-2xl bg-white/5 text-zinc-600 font-bold cursor-not-allowed border border-white/5">
            Current Plan
          </button>
        </div>

        {/*  PREMIUM PLAN */}
        <div className="group relative rounded-[32px] border border-violet-500/30 bg-[#0a0a0a] p-8 shadow-[0_0_50px_-20px_rgba(139,92,246,0.3)]">
          
          <div className="absolute -top-3 right-8 px-4 py-1 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-[10px] font-black tracking-widest text-white uppercase shadow-lg">
            Recommended
          </div>

          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            Premium <Sparkles size={20} className="text-violet-400" />
          </h2>
          <p className="text-zinc-500 mt-2 text-sm">Full access for professionals</p>

          <div className="mt-8 text-5xl font-black text-white">
            $5 <span className="text-sm font-medium text-zinc-500">/ one-time</span>
          </div>

          <ul className="mt-8 space-y-4 text-sm text-white">
            {[ "Unlimited prompts", "Access private prompts", "Copy without limits", "Priority features", "Monetization access"].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-violet-500/20 flex items-center justify-center border border-violet-500/30">
                  <Check size={12} className="text-violet-400" />
                </div>
                {item}
              </li>
            ))}
          </ul>

          <form action="/api/checkout_sessions" method="POST">
            <button type="submit" className="mt-10 w-full py-4 rounded-2xl bg-white text-black font-black hover:bg-violet-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              Unlock Premium <Zap size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlanPage;