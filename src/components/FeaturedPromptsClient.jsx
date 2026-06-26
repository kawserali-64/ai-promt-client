"use client";

import PromptCard from "@/components/allpromt/PromptCard";
import Link from "next/link";
import { motion } from "framer-motion";

export default function FeaturedPromptsClient({ prompts }) {
  return (
    <section className="py-20 bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-4xl font-bold text-white">
              Featured Prompts
            </h2>
            <p className="text-zinc-400 mt-2">
              Trending prompts picked by our algorithm.
            </p>
          </div>

          <Link
            href="/all-promt"
            className="text-violet-400 hover:text-violet-300"
          >
            View All →
          </Link>
        </div>

        {/* Content */}
        {prompts.length === 0 ? (
          <div className="text-center text-zinc-500 py-10">
            No featured prompts found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {prompts.map((prompt, index) => (
              <motion.div
                key={prompt._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <PromptCard prompt={prompt} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}