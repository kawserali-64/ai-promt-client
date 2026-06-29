"use client";

import { useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import {
  Mail,
  ShieldCheck,
  Crown,
  Layers,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Skeleton Component
const ProfileSkeleton = () => (
  <div className="max-w-4xl mx-auto space-y-6 px-4 py-2 animate-pulse">
    <div className="h-8 w-48 bg-white/5 rounded-lg" />

    <div className="bg-[#111113] p-8 rounded-2xl border border-white/5">
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-white/5" />
        <div className="space-y-3">
          <div className="h-6 w-40 bg-white/5 rounded-md" />
          <div className="h-4 w-60 bg-white/5 rounded-md" />
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="h-32 bg-[#111113] rounded-2xl border border-white/5" />
      <div className="h-32 bg-[#111113] rounded-2xl border border-white/5" />
    </div>
  </div>
);

const ProfilePage = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const router = useRouter();

  const [promptCount, setPromptCount] = useState(0);

 useEffect(() => {
  if (!user?.id) return;

  const loadPrompts = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/my-prompts?userId=${user.id}`
      );

      const data = await res.json();

      setPromptCount(data.length);
    } catch (error) {
      console.error(error);
    }
  };

  loadPrompts();
}, [user?.id]);
  if (isPending) return <ProfileSkeleton />;

  if (!session)
    return (
      <div className="text-white text-center mt-20">
        Please login to view profile.
      </div>
    );

  const isPremium = user?.plan === "pro";

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4 sm:px-6 lg:px-0 py-2">
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          User Account Profile
        </h2>

        <p className="text-zinc-400 text-xs sm:text-sm mt-1">
          Manage your plan, credentials, and published prompt details.
        </p>
      </div>

      <div className="bg-[#111113] p-6 sm:p-8 rounded-2xl border border-white/5 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 text-center sm:text-left">
          <div className="relative">
            <Image
              src={
                user?.image ||
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
              }
              alt={user?.name || "User"}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover ring-4 ring-violet-500/20"
              width={96}
              height={96}
            />

            <span className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-[#111113]" />
          </div>

          <div className="flex-1 space-y-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {user?.name || "User Name"}
            </h1>

            <div className="flex items-center justify-center sm:justify-start gap-2 text-zinc-400 text-sm">
              <Mail className="size-4 text-violet-400 shrink-0" />

              <span className="truncate max-w-[220px] sm:max-w-none">
                {user?.email}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
              <span className="bg-violet-500/10 text-violet-400 text-[10px] font-bold tracking-wider px-3 py-1 rounded-full uppercase border border-violet-500/20">
                ROLE: {user?.role || "User"}
              </span>

              <span
                className={`text-[10px] font-bold tracking-wider px-3 py-1 rounded-full uppercase border ${
                  isPremium
                    ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    : "bg-zinc-800/50 text-zinc-400 border-white/5"
                }`}
              >
                PLAN: {user.plan || "free"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-[#111113] p-6 rounded-2xl border border-white/5 flex flex-col justify-between min-h-[120px]">
          <div className="flex items-center gap-2 text-zinc-500">
            <Layers className="size-4 text-violet-400" />
            <p className="text-xs font-bold uppercase tracking-widest">
              Prompts Published
            </p>
          </div>

          <h3 className="text-4xl sm:text-5xl font-black text-white tracking-tight mt-2">
            {promptCount}
          </h3>
        </div>

        <div className="bg-[#111113] p-6 rounded-2xl border border-white/5 flex flex-col justify-between min-h-[120px]">
          <div className="flex items-center gap-2 text-emerald-400">
            <ShieldCheck className="size-4" />

            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
              Account Status
            </p>
          </div>

          <div className="mt-2">
            <h3 className="text-lg sm:text-xl font-bold text-emerald-400">
              Verified Member
            </h3>

            <p className="text-xs text-zinc-500 mt-0.5">
              Platform access is fully optimized
            </p>
          </div>
        </div>
      </div>

      {!isPremium ? (
        <div className="relative overflow-hidden bg-gradient-to-br from-violet-950/30 via-indigo-950/10 to-transparent p-6 sm:p-8 rounded-2xl border border-violet-500/20 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="absolute -top-10 -right-10 w-36 h-36 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-start gap-4 relative z-10">
            <div className="bg-gradient-to-tr from-violet-600 to-indigo-500 p-3 rounded-xl hidden sm:block">
              <Crown className="size-6 text-white" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Upgrade to Pro Lifetime
              </h3>

              <p className="text-zinc-400 text-sm">
                Unlock private templates, verified analytics, premium prompts
                and more.
              </p>
            </div>
          </div>

          <Button
            onClick={() => router.push("/dashboard/payment")}
            className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold px-6 rounded-xl"
          >
            Upgrade Now ($5)
          </Button>
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 via-emerald-400/5 to-transparent p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                <Crown className="h-6 w-6 text-emerald-400" />
              </div>

              <div>
                <h3 className="text-white font-bold">
                  Pro Lifetime Active
                </h3>

                <p className="text-sm text-zinc-400">
                  Your premium membership is active. Enjoy all premium
                  features.
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 rounded-full bg-emerald-500/15 px-4 py-2 border border-emerald-500/20">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />

              <span className="text-sm font-semibold text-emerald-400">
                ACTIVE
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;