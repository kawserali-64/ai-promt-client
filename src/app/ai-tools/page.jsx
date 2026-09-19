"use client";

import Link from "next/link";
import { Card } from "@heroui/react";
import {
  Bot,
  Sparkles,
  ArrowRight,
  WandSparkles,
  Stars,
} from "lucide-react";

const aiTools = [
  {
    id: 1,
    title: "AI Prompt Generator",
    description:
      "Turn your ideas into powerful, clear, and professional AI prompts in seconds.",
    icon: Bot,
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-600 dark:text-violet-400",
    border: "hover:border-violet-500/40",
    glow: "bg-violet-500/10",
    href: "/ai-tools/prompt-generator",
    available: true,
    badge: "Available Now",
  },
  {
    id: 2,
    title: "AI Prompt Improver",
    description:
      "Improve your existing prompts and make them clearer, smarter, and more effective.",
    icon: WandSparkles,
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    border: "hover:border-cyan-500/40",
    glow: "bg-cyan-500/10",
    href: "/ai-tools/prompt-improver",
    available: true,
    badge: "Available Now",
  },
];

const AIToolsPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] px-4 py-10 md:px-8 lg:px-12 select-none">
      <div className="mx-auto max-w-6xl">
        {/* ==================== HERO ==================== */}
        <div className="relative mb-14 overflow-hidden rounded-[32px] border border-zinc-200 dark:border-white/5 bg-white dark:bg-[#0a0a0a] px-6 py-12 text-center md:px-12 md:py-16 shadow-sm dark:shadow-none">
          {/* Background Glow */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-violet-600/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

          {/* Icon */}
          <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-400">
            <Sparkles size={30} />
          </div>

          <p className="relative mb-3 text-sm font-bold uppercase tracking-[0.25em] text-violet-600 dark:text-violet-400">
            AI Powered Tools
          </p>

          <h1 className="relative text-4xl font-black tracking-tight text-zinc-900 dark:text-white md:text-5xl lg:text-6xl">
            Create Better With{" "}
            <span className="text-violet-600 dark:text-violet-400">AI</span>
          </h1>

          <p className="relative mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-400 md:text-base">
            Powerful AI tools designed to help you create, improve, and
            work smarter with prompts.
          </p>
        </div>

        {/* ==================== SECTION TITLE ==================== */}
        <div className="mb-7">
          <div className="flex items-center gap-3">
            <Stars className="text-violet-600 dark:text-violet-400" size={22} />
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white">
              AI Tools
            </h2>
          </div>

          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Choose a tool and start creating.
          </p>
        </div>

        {/* ==================== TOOL CARDS ==================== */}
        <div className="grid gap-6 md:grid-cols-2">
          {aiTools.map((tool) => {
            const Icon = tool.icon;

            const cardContent = (
              <Card
                className={`group relative h-full overflow-hidden rounded-[28px] border border-zinc-200 dark:border-white/5 bg-white dark:bg-[#0a0a0a] p-7 shadow-sm dark:shadow-none transition-all duration-300 ${
                  tool.border
                } ${
                  tool.available
                    ? "cursor-pointer hover:-translate-y-1"
                    : "cursor-default"
                }`}
              >
                {/* Glow */}
                <div
                  className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full ${
                    tool.glow
                  } opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100`}
                />

                {/* Top */}
                <div className="relative flex items-start justify-between">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${tool.iconBg} ${tool.iconColor}`}
                  >
                    <Icon size={27} />
                  </div>

                  <span
                    className={`rounded-full border px-3 py-1.5 text-[11px] font-bold ${
                      tool.available
                        ? "border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-400"
                        : "border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/5 text-zinc-500"
                    }`}
                  >
                    {tool.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="relative mt-7">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white transition-colors group-hover:text-violet-600 dark:group-hover:text-violet-400">
                    {tool.title}
                  </h3>

                  <p className="mt-3 min-h-[56px] text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    {tool.description}
                  </p>
                </div>

                {/* Bottom */}
                <div className="relative mt-7 flex items-center justify-between border-t border-zinc-200 dark:border-white/5 pt-5">
                  <span
                    className={`text-sm font-bold ${
                      tool.available
                        ? "text-zinc-900 dark:text-white"
                        : "text-zinc-400 dark:text-zinc-600"
                    }`}
                  >
                    {tool.available
                      ? "Start Creating"
                      : "Coming Soon"}
                  </span>

                  {tool.available && (
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 transition-all group-hover:bg-violet-500/10 group-hover:text-violet-600 dark:group-hover:text-violet-400">
                      <ArrowRight size={17} />
                    </div>
                  )}
                </div>
              </Card>
            );

            if (tool.available) {
              return (
                <Link
                  href={tool.href}
                  key={tool.id}
                  className="block"
                >
                  {cardContent}
                </Link>
              );
            }

            return (
              <div key={tool.id}>
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AIToolsPage;