"use client";

import { useEffect, useState } from "react";
import PromptFormPage from "@/components/Dashboard/prompt-form";
import { Crown, Lock, Zap } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { toast } from "react-toastify";
import { useTheme } from "next-themes";

const LIMIT = 3;

const AddPromptPage = () => {
  const { data: session, isPending } = useSession();
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [promptCount, setPromptCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.id) return;

      try {
        setLoading(true);

        const userRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user?userId=${session.user.id}`
        );
        const user = await userRes.json();
        setIsPremium(user?.plan === "pro");

        const promptRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/prompts?userId=${session.user.id}`
        );
        const promptData = await promptRes.json();

        setPromptCount(
          Array.isArray(promptData)
            ? promptData.length
            : promptData?.total || 0
        );
      } catch (error) {
        toast.error("Failed to load your data.");
      } finally {
        setLoading(false);
      }
    };

    if (!isPending && session?.user?.id) {
      fetchData();
    }

    if (!isPending && !session?.user?.id) {
      setLoading(false);
    }
  }, [session?.user?.id, isPending]);

  const limitReached = !isPremium && promptCount >= LIMIT;

  // Flash Prevent করার জন্য Theme না পাওয়া পর্যন্ত Neutral Container রেন্ডার করবে
  if (!mounted) {
    return <div className="min-h-screen w-full" />;
  }

  /* =========================
      LOADING STATE
  ========================= */

  if (isPending || loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${isDark ? "bg-[#050505]" : "bg-zinc-50"
          }`}
      >
        <div className="flex flex-col items-center justify-center">
          <div
            className={`relative flex items-center justify-center w-16 h-16 rounded-2xl border ${isDark
              ? "bg-[#0a0a0a] border-white/10"
              : "bg-white border-zinc-200 shadow-sm"
              }`}
          >
            <div
              className={`w-8 h-8 rounded-full border-4 border-t-transparent animate-spin ${isDark ? "border-violet-500" : "border-violet-600"
                }`}
            />
          </div>

          <h2
            className={`mt-5 text-lg font-semibold ${isDark ? "text-white" : "text-zinc-900"
              }`}
          >
            Checking Usage Stats
          </h2>

          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Verifying your plan limitations...
          </p>

          <div className="flex gap-1.5 mt-4">
            <span
              className={`w-1.5 h-1.5 rounded-full animate-bounce ${isDark ? "bg-violet-500" : "bg-violet-600"
                }`}
            />
            <span
              className={`w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:150ms] ${isDark ? "bg-violet-500" : "bg-violet-600"
                }`}
            />
            <span
              className={`w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:300ms] ${isDark ? "bg-violet-500" : "bg-violet-600"
                }`}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen p-4 md:p-8 selection:bg-violet-500/35 transition-colors duration-300 ${isDark ? "bg-[#050505] text-white" : "bg-zinc-50 text-zinc-900"
        }`}
    >
      <div className="max-w-5xl mx-auto mb-10">
        <div
          className={`flex flex-col sm:flex-row items-center justify-between border rounded-3xl px-8 py-6 gap-4 shadow-xl transition-colors duration-300 ${isDark
            ? "bg-[#0a0a0a] border-white/5 shadow-black/40"
            : "bg-white border-zinc-200"
            }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-xl border ${isDark
                  ? "bg-violet-500/10 text-violet-400 border-violet-500/20"
                  : "bg-violet-100 text-violet-700 border-violet-200"
                }`}
            >
              <Zap size={20} />
            </div>

            <h2
              className={`text-xl sm:text-2xl font-black tracking-tight ${isDark ? "text-white" : "text-violet-700"
                }`}
            >
              Usage Statistics
            </h2>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <span className="text-sm font-mono text-zinc-600 dark:text-zinc-400">
              {isPremium
                ? "UNLIMITED"
                : `${promptCount} / ${LIMIT} USED`}
            </span>

            {!isPremium && (
              <div className="flex-1 sm:w-48 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-700"
                  style={{
                    width: `${Math.min(
                      (promptCount / LIMIT) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center px-2">
        {!limitReached ? (
          <div className="w-full max-w-5xl">
            <PromptFormPage />
          </div>
        ) : (
          <div
            className={`max-w-xl w-full border rounded-[32px] p-10 text-center relative overflow-hidden shadow-2xl transition-colors duration-300 ${isDark
              ? "bg-[#0a0a0a] border-white/10 shadow-black/50"
              : "bg-white border-zinc-200"
              }`}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-violet-600/5 to-transparent pointer-events-none" />

            <div className="relative z-10">
              <div
                className={`inline-flex p-4 rounded-3xl border mb-6 ${isDark
                  ? "bg-[#111] border-white/5"
                  : "bg-zinc-100 border-zinc-200"
                  }`}
              >
                <Lock
                  className="text-violet-600 dark:text-violet-400"
                  size={32}
                />
              </div>

              <h1 className="text-3xl font-black tracking-tighter mb-3 text-zinc-900 dark:text-white">
                Limit Reached
              </h1>

              <p className="text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                You've reached your free limit of {LIMIT} prompts. Upgrade to
                Premium to unlock unlimited generation.
              </p>

              <div className="flex justify-center gap-3 mb-8">
                <div
                  className={`px-4 py-2 rounded-full text-[10px] uppercase font-bold tracking-widest border ${isDark
                    ? "bg-[#111] text-zinc-400 border-white/5"
                    : "bg-zinc-100 text-zinc-600 border-zinc-200"
                    }`}
                >
                  Free: {LIMIT}
                </div>

                <div className="px-4 py-2 rounded-full bg-violet-500/10 text-[10px] uppercase font-bold tracking-widest text-violet-600 dark:text-violet-400 border border-violet-500/20">
                  Premium: Unlimited
                </div>
              </div>

              <Link
                href="/plans"
                className="w-full py-4 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-widest text-sm hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Crown size={16} />
                Upgrade to Premium
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPromptPage;