"use client";
import { useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { Mail, ShieldCheck, Crown, Layers } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();

  // ডকুমেন্টেশন অনুযায়ী সাবস্ক্রিপশন চেক (Free / Premium)
  const isPremium = user?.subscription === "Premium"; 

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4 sm:px-6 lg:px-0 py-2">
      {/* ১. হেডার সেকশন */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          User Account Profile
        </h2>
        <p className="text-zinc-400 text-xs sm:text-sm mt-1">
          Manage your plan, credentials, and published prompt details.
        </p>
      </div>

      {/* ২. প্রোফাইল মেইন কার্ড (image_fe5fa6.png অনুযায়ী ডিজাইন) */}
      <div className="bg-[#111113] p-6 sm:p-8 rounded-2xl border border-white/5 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 text-center sm:text-left">
          {/* প্রোফাইল ফটো */}
          <div className="relative">
            <Image
              src={user?.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"} 
              alt={user?.name || "User"} 
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover ring-4 ring-violet-500/20" 
              width={96}
              height={96}
            />
            <span className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-[#111113]" />
          </div>
          
          {/* ইউজার ইনফরমেশন */}
          <div className="flex-1 space-y-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {user?.name || "User Name"}
            </h1>
            
            <div className="flex items-center justify-center sm:justify-start gap-2 text-zinc-400 text-sm">
              <Mail className="size-4 text-violet-400 shrink-0" /> 
              <span className="truncate max-w-[220px] sm:max-w-none">{user?.email || "user@aiverse.com"}</span>
            </div>
            
            {/* রোল এবং প্ল্যান ব্যাজ (ডক অনুযায়ী) */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
              <span className="bg-violet-500/10 text-violet-400 text-[10px] font-bold tracking-wider px-3 py-1 rounded-full uppercase border border-violet-500/20">
                ROLE: {user?.role || "User"}
              </span>
              <span className={`text-[10px] font-bold tracking-wider px-3 py-1 rounded-full uppercase border ${
                isPremium 
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/20" 
                  : "bg-zinc-800/50 text-zinc-400 border-white/5"
              }`}>
                PLAN: {isPremium ? "Premium" : "Free"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ৩. স্ট্যাটাস গ্রিড (মোবাইলে ১ কলাম, ট্যাবলেটে ২ কলাম) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* টোটাল প্রম্পটস কার্ড */}
        <div className="bg-[#111113] p-6 rounded-2xl border border-white/5 flex flex-col justify-between min-h-[120px]">
          <div className="flex items-center gap-2 text-zinc-500">
            <Layers className="size-4 text-violet-400" />
            <p className="text-xs font-bold uppercase tracking-widest">Prompts Published</p>
          </div>
          <h3 className="text-4xl sm:text-5xl font-black text-white tracking-tight mt-2">
            {user?.totalPrompts || 0}
          </h3>
        </div>

        {/* অ্যাকাউন্ট স্ট্যাটাস কার্ড */}
        <div className="bg-[#111113] p-6 rounded-2xl border border-white/5 flex flex-col justify-between min-h-[120px]">
          <div className="flex items-center gap-2 text-emerald-400">
            <ShieldCheck className="size-4" />
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Account Status</p>
          </div>
          <div className="mt-2">
            <h3 className="text-lg sm:text-xl font-bold text-emerald-400">Verified Member</h3>
            <p className="text-xs text-zinc-500 mt-0.5">Platform access is fully optimized</p>
          </div>
        </div>
      </div>

      {/* ৪. আপগ্রেড টু প্রিমিয়াম সেকশন (ডক অনুযায়ী: শুধুমাত্র ফ্রি ইউজারদের দেখাবে) */}
      {!isPremium && (
        <div className="relative overflow-hidden bg-gradient-to-br from-violet-950/30 via-indigo-950/10 to-transparent p-6 sm:p-8 rounded-2xl border border-violet-500/20 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="absolute -top-10 -right-10 w-36 h-36 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-start gap-4 relative z-10">
            <div className="bg-gradient-to-tr from-violet-600 to-indigo-500 p-3 rounded-xl shadow-[0_0_20px_rgba(124,58,237,0.2)] shrink-0 hidden sm:block">
              <Crown className="size-6 text-white" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Crown className="size-4 text-amber-400 sm:hidden" /> Upgrade to Pro Lifetime
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm max-w-xl leading-relaxed">
                Unlock access to all private prompt templates, parameter sets, prevent copies, and get verified analytics.
              </p>
            </div>
          </div>
          
          {/* ডক অনুযায়ী: বাটন ক্লিকে পেমেন্ট পেজে রিডাইরেক্ট হবে */}
          <Button 
            onClick={() => router.push("/dashboard/payment")}
            className="w-full md:w-auto bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm h-11 px-6 rounded-xl shadow-[0_0_25px_rgba(124,58,237,0.3)] transition-all shrink-0"
          >
            Upgrade Now ($5)
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;