"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Users,
  Zap,
  Search,
  Sparkles,
  Globe,
} from "lucide-react";

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
    <section className="py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold">
            Why Choose Us
          </h2>
          <p className="text-zinc-400 mt-3">
            Everything you need to create, share and explore AI prompts
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 transition"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-violet-600/20">
                    <Icon className="text-violet-400" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold">
                    {item.title}
                  </h3>
                </div>

                <p className="text-zinc-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}