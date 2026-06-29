"use client";

import { useEffect, useState } from "react";
import PromptFormPage from "@/components/Dashboard/prompt-form";
import { Crown, Lock, Zap } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { toast } from "react-toastify"; // Ensure toast is imported

const LIMIT = 3;

const AddPromptPage = () => {
  const { data: session } = useSession();
  const [promptCount, setPromptCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.id) return;
      try {
        setLoading(true);
        const userRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user?userId=${session.user.id}`);
        const user = await userRes.json();
        setIsPremium(user?.plan === "pro");

        const promptRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/prompts?userId=${session.user.id}`);
        const promptData = await promptRes.json();
        setPromptCount(Array.isArray(promptData) ? promptData.length : (promptData?.total || 0));
      } catch (error) {
        toast.error("Failed to load your data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [session?.user?.id]);

  const limitReached = !isPremium && promptCount >= LIMIT;

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8 selection:bg-violet-500/30">
      
      {/* Usage Header */}
      <div className="max-w-5xl mx-auto mb-10">
        <div className="flex flex-col sm:flex-row items-center justify-between bg-[#0a0a0a] border border-white/5 rounded-3xl px-8 py-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400">
              <Zap size={20} />
            </div>
            <h2 className="font-black tracking-tight">Usage Statistics</h2>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <span className="text-sm font-mono text-zinc-500">
              {isPremium ? "UNLIMITED" : `${promptCount} / ${LIMIT} USED`}
            </span>
            {!isPremium && (
              <div className="flex-1 sm:w-48 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-700"
                  style={{ width: `${Math.min((promptCount / LIMIT) * 100, 100)}%` }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex justify-center px-2">
        {!limitReached ? (
          <div className="w-full max-w-5xl">
            <PromptFormPage />
          </div>
        ) : (
          <div className="max-w-xl w-full rounded-[32px] border border-white/5 bg-[#0a0a0a] p-10 text-center relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-violet-600/5 to-transparent" />
            
            <div className="relative z-10">
              <div className="inline-flex p-4 rounded-3xl bg-white/5 border border-white/10 mb-6">
                <Lock className="text-violet-400" size={32} />
              </div>

              <h1 className="text-3xl font-black tracking-tighter mb-3">Limit Reached</h1>
              <p className="text-zinc-500 mb-8 leading-relaxed">
                You've reached your free limit of {LIMIT} prompts. Upgrade to Premium to unlock unlimited generation.
              </p>

              <div className="flex justify-center gap-3 mb-8">
                <div className="px-4 py-2 rounded-full bg-white/5 text-[10px] uppercase font-bold tracking-widest text-zinc-400">Free: {LIMIT}</div>
                <div className="px-4 py-2 rounded-full bg-violet-500/10 text-[10px] uppercase font-bold tracking-widest text-violet-400">Premium: Unlimited</div>
              </div>

              <Link
                href="/plans"
                className="w-full py-4 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-sm hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                <Crown size={16} /> Upgrade to Premium
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPromptPage;