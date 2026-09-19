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
import { useTheme } from "next-themes";

const ProfilePage = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const router = useRouter();
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [promptCount, setPromptCount] = useState(0);
  const [loadingPrompts, setLoadingPrompts] = useState(true);

  // Component Mount নিশ্চিতকরণ
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  useEffect(() => {
    if (!user?.id) {
      setLoadingPrompts(false);
      return;
    }

    const loadPrompts = async () => {
      try {
        setLoadingPrompts(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/my-prompts?userId=${user.id}`
        );

        const data = await res.json();

        setPromptCount(
          Array.isArray(data) ? data.length : data?.total || 0
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingPrompts(false);
      }
    };

    loadPrompts();
  }, [user?.id]);

  // Dark Luxury Skeleton Loader
  if (!mounted || isPending) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 px-4 sm:px-6 lg:px-0 py-2 animate-pulse">
        {/* Header Skeleton */}
        <div className="space-y-2">
          <div className="h-8 w-56 bg-zinc-200 dark:bg-zinc-800/80 rounded-xl" />
          <div className="h-4 w-80 bg-zinc-200 dark:bg-zinc-800/50 rounded-lg" />
        </div>

        {/* Profile Card Skeleton */}
        <div className="p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-white/5 bg-zinc-100/80 dark:bg-[#111113]/80 backdrop-blur-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-zinc-300 dark:bg-zinc-800 shrink-0" />
            <div className="flex-1 space-y-3 w-full text-center sm:text-left">
              <div className="h-6 w-48 bg-zinc-300 dark:bg-zinc-800 rounded-md mx-auto sm:mx-0" />
              <div className="h-4 w-64 bg-zinc-200 dark:bg-zinc-800/60 rounded-md mx-auto sm:mx-0" />
              <div className="flex justify-center sm:justify-start gap-2 pt-1">
                <div className="h-6 w-20 bg-zinc-200 dark:bg-zinc-800/80 rounded-full" />
                <div className="h-6 w-24 bg-zinc-200 dark:bg-zinc-800/80 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-white/5 bg-zinc-100/80 dark:bg-[#111113]/80 h-32 flex flex-col justify-between">
            <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-800/60 rounded-md" />
            <div className="h-10 w-16 bg-zinc-300 dark:bg-zinc-800 rounded-lg" />
          </div>
          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-white/5 bg-zinc-100/80 dark:bg-[#111113]/80 h-32 flex flex-col justify-between">
            <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-800/60 rounded-md" />
            <div className="space-y-2">
              <div className="h-6 w-36 bg-zinc-300 dark:bg-zinc-800 rounded-md" />
              <div className="h-3 w-48 bg-zinc-200 dark:bg-zinc-800/50 rounded-md" />
            </div>
          </div>
        </div>

        {/* Upgrade Banner Skeleton */}
        <div className="p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-white/5 bg-zinc-100/80 dark:bg-[#111113]/80 h-28" />
      </div>
    );
  }

  if (!session) {
    return (
      <div
        className={`text-center mt-20 transition-colors ${
          isDark ? "text-white" : "text-zinc-800"
        }`}
      >
        Please login to view profile.
      </div>
    );
  }

  const isPremium = user?.plan === "pro";

  return (
    <div
      className={`max-w-4xl mx-auto space-y-6 px-4 sm:px-6 lg:px-0 py-2 transition-colors duration-300 ${
        isDark ? "text-white" : "text-zinc-900"
      }`}
    >
      <div>
        <h2
          className={`text-2xl sm:text-3xl font-black tracking-tight ${
            isDark ? "text-white" : "text-violet-600"
          }`}
        >
          User Account Profile
        </h2>

        <p
          className={`text-xs sm:text-sm mt-1 ${
            isDark ? "text-zinc-400" : "text-zinc-500"
          }`}
        >
          Manage your plan, credentials, and published prompt details.
        </p>
      </div>

      <div
        className={`p-6 sm:p-8 rounded-2xl border shadow-xl transition-colors duration-300 ${
          isDark
            ? "bg-[#111113] border-white/5 shadow-none"
            : "bg-white border-zinc-200"
        }`}
      >
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

            <span
              className={`absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ${
                isDark ? "ring-[#111113]" : "ring-white"
              }`}
            />
          </div>

          <div className="flex-1 space-y-2">
            <h1
              className={`text-xl sm:text-2xl font-bold tracking-tight ${
                isDark ? "text-white" : "text-zinc-900"
              }`}
            >
              {user?.name || "User Name"}
            </h1>

            <div
              className={`flex items-center justify-center sm:justify-start gap-2 text-sm ${
                isDark ? "text-zinc-400" : "text-zinc-600"
              }`}
            >
              <Mail
                className={`size-4 shrink-0 ${
                  isDark ? "text-violet-400" : "text-violet-600"
                }`}
              />

              <span className="truncate max-w-[220px] sm:max-w-none">
                {user?.email}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
              <span
                className={`text-[10px] font-bold tracking-wider px-3 py-1 rounded-full uppercase border ${
                  isDark
                    ? "bg-violet-500/10 text-violet-400 border-violet-500/20"
                    : "bg-violet-500/10 text-violet-600 border-violet-500/20"
                }`}
              >
                ROLE: {user?.role || "User"}
              </span>

              <span
                className={`text-[10px] font-bold tracking-wider px-3 py-1 rounded-full uppercase border ${
                  isPremium
                    ? isDark
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                    : isDark
                    ? "bg-zinc-800/50 text-zinc-400 border-white/5"
                    : "bg-zinc-100 text-zinc-600 border-zinc-200"
                }`}
              >
                PLAN: {user?.plan || "free"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div
          className={`p-6 rounded-2xl border shadow-xl flex flex-col justify-between min-h-[120px] transition-colors duration-300 ${
            isDark
              ? "bg-[#111113] border-white/5 shadow-none"
              : "bg-white border-zinc-200"
          }`}
        >
          <div className="flex items-center gap-2 text-zinc-500">
            <Layers
              className={`size-4 ${
                isDark ? "text-violet-400" : "text-violet-600"
              }`}
            />

            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
              Prompts Published
            </p>
          </div>

          <h3
            className={`text-4xl sm:text-5xl font-black tracking-tight mt-2 ${
              isDark ? "text-white" : "text-zinc-900"
            }`}
          >
            {loadingPrompts ? "..." : promptCount}
          </h3>
        </div>

        <div
          className={`p-6 rounded-2xl border shadow-xl flex flex-col justify-between min-h-[120px] transition-colors duration-300 ${
            isDark
              ? "bg-[#111113] border-white/5 shadow-none"
              : "bg-white border-zinc-200"
          }`}
        >
          <div
            className={`flex items-center gap-2 ${
              isDark ? "text-emerald-400" : "text-emerald-600"
            }`}
          >
            <ShieldCheck className="size-4" />

            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
              Account Status
            </p>
          </div>

          <div className="mt-2">
            <h3
              className={`text-lg sm:text-xl font-bold ${
                isDark ? "text-emerald-400" : "text-emerald-600"
              }`}
            >
              Verified Member
            </h3>

            <p className="text-xs text-zinc-500 mt-0.5">
              Platform access is fully optimized
            </p>
          </div>
        </div>
      </div>

      {!isPremium ? (
        <div className="relative overflow-hidden bg-gradient-to-br from-violet-100/60 via-indigo-50/30 to-transparent dark:from-violet-950/30 dark:via-indigo-950/10 dark:to-transparent p-6 sm:p-8 rounded-2xl border border-violet-500/20 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="absolute -top-10 -right-10 w-36 h-36 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-start gap-4 relative z-10">
            <div className="bg-gradient-to-tr from-violet-600 to-indigo-500 p-3 rounded-xl hidden sm:block shadow-md">
              <Crown className="size-6 text-white" />
            </div>

            <div>
              <h3
                className={`text-lg font-bold ${
                  isDark ? "text-white" : "text-zinc-900"
                }`}
              >
                Upgrade to Pro Lifetime
              </h3>

              <p
                className={`text-sm ${
                  isDark ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                Unlock private templates, verified analytics, premium prompts
                and more.
              </p>
            </div>
          </div>

          <Button
            onClick={() => router.push("/plans")}
            className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold px-6 rounded-xl shadow-lg shadow-violet-600/20"
          >
            Upgrade Now ($5)
          </Button>
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 via-emerald-400/5 to-transparent p-5 shadow-lg dark:shadow-none">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                <Crown
                  className={`h-6 w-6 ${
                    isDark ? "text-emerald-400" : "text-emerald-600"
                  }`}
                />
              </div>

              <div>
                <h3
                  className={`font-bold ${
                    isDark ? "text-white" : "text-zinc-900"
                  }`}
                >
                  Pro Lifetime Active
                </h3>

                <p
                  className={`text-sm ${
                    isDark ? "text-zinc-400" : "text-zinc-600"
                  }`}
                >
                  Your premium membership is active. Enjoy all premium
                  features.
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 rounded-full bg-emerald-500/15 px-4 py-2 border border-emerald-500/20">
              <ShieldCheck
                className={`h-4 w-4 ${
                  isDark ? "text-emerald-400" : "text-emerald-600"
                }`}
              />

              <span
                className={`text-sm font-semibold ${
                  isDark ? "text-emerald-400" : "text-emerald-600"
                }`}
              >
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