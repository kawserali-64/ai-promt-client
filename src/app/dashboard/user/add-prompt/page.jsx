"use client";

import { useEffect, useState } from "react";
import PromptFormPage from "@/components/Dashboard/prompt-form";
import { Crown, Lock } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";

const LIMIT = 3;

const AddPromptPage = () => {
  const { data: session } = useSession();

  const [promptCount, setPromptCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const isPremium = session?.user?.isPremium;

  // FETCH USER PROMPTS COUNT
  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/prompts?userId=${session?.user?.id}`
        );

        const data = await res.json();

        setPromptCount(data?.length || 0);
      } catch (err) {
        console.log("Error fetching prompts:", err);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.id) {
      fetchPrompts();
    }
  }, [session?.user?.id]);

  const limitReached = !isPremium && promptCount >= LIMIT;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0b0b1a] to-black p-6">

      {/* =========================
          TOP USAGE BAR
      ========================== */}
      <div className="max-w-5xl mx-auto mb-6">
        <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl px-6 py-4">

          <h2 className="text-white font-semibold">
            Prompt Usage
          </h2>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-300">
              {promptCount} / {LIMIT}
            </span>

            <div className="w-40 h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-violet-500 transition-all duration-300"
                style={{
                  width: `${Math.min((promptCount / LIMIT) * 100, 100)}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          MAIN AREA
      ========================== */}
      <div className="flex justify-center">

        {/* FORM */}
        {!limitReached ? (
          <div className="w-full max-w-5xl">
            <PromptFormPage />
          </div>
        ) : (
          /* =========================
              UPGRADE CARD
          ========================== */
          <div className="max-w-2xl w-full rounded-3xl border border-violet-500/30 bg-[#0f172a] shadow-2xl p-10 text-center relative overflow-hidden">

            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-transparent to-pink-500/10 blur-2xl" />

            <div className="relative z-10">

              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-violet-500/20">
                  <Lock className="text-violet-400" size={28} />
                </div>
              </div>

              <h1 className="text-3xl font-bold text-white">
                Free Limit Reached
              </h1>

              <p className="text-gray-400 mt-3">
                You’ve used all{" "}
                <span className="text-white font-semibold">{LIMIT} free prompts</span>.
                Upgrade to continue creating unlimited prompts.
              </p>

              {/* STATS */}
              <div className="mt-6 flex justify-center gap-4 text-sm text-gray-300">
                <span className="px-3 py-1 rounded-full bg-white/10">
                  Free: {LIMIT} prompts
                </span>
                <span className="px-3 py-1 rounded-full bg-violet-600/20 text-violet-300">
                  Premium: Unlimited
                </span>
              </div>

              {/* BUTTON */}
              <Link href={'/plans'} className="mt-8 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold flex items-center gap-2 mx-auto">
                <Crown size={18} />
                Upgrade to Premium
              </Link>

              <p className="text-xs text-gray-500 mt-4">
                Unlock unlimited prompt creation + premium features
              </p>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AddPromptPage;