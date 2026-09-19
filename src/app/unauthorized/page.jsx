"use client";

import { useRouter } from "next/navigation";
import { ShieldAlert, ArrowLeft } from "lucide-react";

const UnauthorizedPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gradient-to-br dark:from-black dark:via-[#0b0b1a] dark:to-black text-gray-900 dark:text-white px-4 transition-colors duration-300">

      <div className="text-center max-w-md w-full p-8 rounded-2xl border border-gray-200 dark:border-white/5 bg-white/80 dark:bg-[#0e0e12]/60 shadow-xl dark:shadow-none backdrop-blur-xl transition-colors duration-300">

        {/* ICON */}
        <div className="flex justify-center mb-6">
          <div className="p-5 rounded-full bg-red-500/10 border border-red-500/20">
            <ShieldAlert size={48} className="text-red-500 dark:text-red-400" />
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-2xl sm:text-3xl font-black mb-2 tracking-tight">
          403 - Unauthorized Access
        </h1>

        {/* DESCRIPTION */}
        <p className="text-gray-500 dark:text-zinc-400 text-sm mb-6 leading-relaxed">
          You don’t have permission to access this page.
          <br />
          Please contact admin or login with the correct account.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">

          <button
            onClick={() => router.push("/")}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 dark:border-transparent bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-800 dark:text-white transition font-medium text-sm"
          >
            <ArrowLeft size={18} />
            Go Home
          </button>

          <button
            onClick={() => router.back()}
            className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white transition font-semibold text-sm shadow-lg shadow-red-600/20"
          >
            Go Back
          </button>

        </div>

        {/* FOOT NOTE */}
        <p className="text-xs text-gray-400 dark:text-zinc-600 mt-6">
          If you think this is a mistake, contact support.
        </p>

      </div>
    </div>
  );
};

export default UnauthorizedPage;