"use client";

import { useRouter } from "next/navigation";
import { ShieldAlert, ArrowLeft } from "lucide-react";

const UnauthorizedPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0b0b1a] to-black text-white px-4">

      <div className="text-center max-w-md w-full">

        {/* ICON */}
        <div className="flex justify-center mb-6">
          <div className="p-5 rounded-full bg-red-500/10 border border-red-500/20">
            <ShieldAlert size={48} className="text-red-400" />
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-bold mb-2">
          403 - Unauthorized Access
        </h1>

        {/* DESCRIPTION */}
        <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
          You don’t have permission to access this page.
          <br />
          Please contact admin or login with the correct account.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">

          <button
            onClick={() => router.push("/")}
            className="flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
          >
            <ArrowLeft size={18} />
            Go Home
          </button>

          <button
            onClick={() => router.back()}
            className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition font-semibold"
          >
            Go Back
          </button>

        </div>

        {/* FOOT NOTE */}
        <p className="text-xs text-zinc-600 mt-6">
          If you think this is a mistake, contact support.
        </p>

      </div>
    </div>
  );
};

export default UnauthorizedPage;