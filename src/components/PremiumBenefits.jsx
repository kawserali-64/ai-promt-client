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
    description:
      "Access exclusive private prompts created by top AI creators.",
  },
  {
    icon: Sparkles,
    title: "Unlimited Prompt Access",
    description:
      "Explore advanced prompts for ChatGPT, Gemini, Claude and more without restrictions.",
  },
  {
    icon: ShieldCheck,
    title: "Premium Experience",
    description:
      "Enjoy a smoother experience with exclusive premium-only content and features.",
  },
  {
    icon: BadgeCheck,
    title: "Support Top Creators",
    description:
      "Your subscription helps creators continue publishing high-quality AI prompts.",
  },
];

const PremiumBenefits = () => {
  return (
    <section className="py-24 bg-base-200/40">
      <div className="max-w-7xl mx-auto px-5">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold mb-5">
            <Crown size={18} />
            Premium Membership
          </div>

          <h2 className="text-4xl md:text-5xl font-bold">
            Unlock the Full Power of AI Prompts
          </h2>

          <p className="mt-5 text-base-content/70 text-lg">
            Upgrade once and access premium prompts, exclusive content,
            and an enhanced AI experience designed for creators and professionals.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7">

          {benefits.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                }}
                className="rounded-3xl bg-base-100 border border-base-300 shadow-lg p-8 text-center hover:shadow-2xl transition-all"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-content">
                  <Icon size={30} />
                </div>

                <h3 className="text-xl font-bold mb-3">
                  {item.title}
                </h3>

                <p className="text-base-content/70 leading-7">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="rounded-3xl bg-primary text-primary-content px-10 py-12 flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>
              <h3 className="text-3xl font-bold">
                Ready to Go Premium?
              </h3>

              <p className="mt-3 opacity-90 max-w-xl">
                Unlock every private prompt, support creators, and
                supercharge your AI workflow with Premium access.
              </p>
            </div>

            <Link
              href="/plans"
              className="btn btn-neutral rounded-full px-8"
            >
              Upgrade Now
              <ArrowRight size={18} />
            </Link>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default PremiumBenefits;