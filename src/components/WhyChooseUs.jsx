"use client";

import { motion } from "framer-motion";
import { Shield, Users, Zap, Search, Sparkles, Globe } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Prompts",
    desc: "Discover high-quality prompts optimized for ChatGPT, Gemini, Claude & more.",
  },
  {
    icon: Shield,
    title: "Secure & Trusted",
    desc: "Your data and prompts are protected with secure authentication & role-based access.",
  },
  {
    icon: Users,
    title: "Creative Community",
    desc: "Connect with creators, share ideas, and grow your AI productivity network.",
  },
  {
    icon: Zap,
    title: "Boost Productivity",
    desc: "Save time with ready-to-use prompts designed for real-world tasks.",
  },
  {
    icon: Search,
    title: "Smart Search",
    desc: "Find the perfect prompt instantly with advanced filtering and sorting.",
  },
  {
    icon: Globe,
    title: "Global Platform",
    desc: "A worldwide marketplace for AI prompt creators and users.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-zinc-50 dark:bg-[#050505] relative overflow-hidden transition-colors duration-300">
      {/* ব্যাকগ্রাউন্ড গ্লো */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">
            Why Choose <span className="text-violet-600 dark:text-violet-500">Us?</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 font-medium">
            Everything you need to create, share and explore AI prompts
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0c] hover:border-violet-500/50 shadow-sm dark:shadow-none transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  {/* আইকন কন্টেইনার */}
                  <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-6 border border-zinc-200 dark:border-zinc-800 group-hover:border-violet-500/50 group-hover:bg-violet-500/10 transition-all duration-500">
                    <Icon className="text-violet-600 dark:text-violet-400" size={28} />
                  </div>

                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* হোভার ইফেক্ট লাইন */}
                <div className="mt-8 w-0 group-hover:w-full h-[2px] bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-500 dark:to-indigo-500 transition-all duration-500"></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}