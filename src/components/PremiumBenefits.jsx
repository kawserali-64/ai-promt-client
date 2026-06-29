"use client";

import { motion } from "framer-motion";
import {
  Crown,
  Lock,
  Sparkles,
  ShieldCheck,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const benefits = [
  {
    icon: Lock,
    title: "Unlock Premium Prompts",
    description: "Access exclusive private prompts created by top AI creators.",
  },
  {
    icon: Sparkles,
    title: "Unlimited Prompt Access",
    description: "Explore advanced prompts for ChatGPT, Gemini, Claude and more without restrictions.",
  },
  {
    icon: ShieldCheck,
    title: "Premium Experience",
    description: "Enjoy a smoother experience with exclusive premium-only content and features.",
  },
  {
    icon: BadgeCheck,
    title: "Support Top Creators",
    description: "Your subscription helps creators continue publishing high-quality AI prompts.",
  },
];

const PremiumBenefits = () => {
  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-900/20 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-5 relative z-10">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 font-semibold mb-6 text-sm">
            <Crown size={16} /> Premium Membership
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
            Unlock the Full Power of AI
          </h2>
          <p className="mt-6 text-zinc-400 text-lg">
            Upgrade once and access premium prompts, exclusive content, and an enhanced AI experience designed for creators.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="rounded-[2rem] bg-white/[0.03] border border-white/5 p-8 text-center hover:bg-white/[0.05] hover:border-violet-500/30 transition-all duration-500 group"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-violet-400 group-hover:bg-violet-500 group-hover:text-white transition-colors duration-500">
                  <Icon size={30} />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                <p className="text-zinc-500 leading-7 text-sm">{item.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="rounded-[2rem] bg-gradient-to-r from-violet-600 to-blue-600 p-[1px]">
            <div className="bg-[#050505] rounded-[2rem] px-10 py-12 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-3xl font-bold text-white">Ready to Go Premium?</h3>
                <p className="mt-2 text-zinc-400 max-w-xl">
                  Unlock every private prompt, support creators, and supercharge your AI workflow.
                </p>
              </div>
              <Link
                href="/plans"
                className="group flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-violet-500 hover:text-white transition-all duration-300"
              >
                Upgrade Now
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default PremiumBenefits;