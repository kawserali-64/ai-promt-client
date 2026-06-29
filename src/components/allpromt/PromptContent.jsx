"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { Copy, Lock, Sparkles, CheckCircle2 } from "lucide-react";
import { CopyCount } from "@/lib/api/prompt";
import { toast } from "react-toastify";

const PromptContent = ({ prompt, canAccessPrompt }) => {
  const handleCopy = async () => {
    if (!canAccessPrompt) return;
    try {
      await navigator.clipboard.writeText(prompt.content);
      await CopyCount(prompt._id);
      toast.success("Prompt copied to clipboard!");
    } catch {
      toast.error("Failed to copy prompt");
    }
  };

  return (
    <div className="space-y-6">
      {/* Content Section */}
      <div className="bg-[#0a0a0a] border border-white/5 rounded-[32px] p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Prompt Content</h2>
          {canAccessPrompt && (
            <Button
              className="bg-white text-black font-bold"
              startContent={<Copy size={16} />}
              onClick={handleCopy}
            >
              Copy Prompt
            </Button>
          )}
        </div>

        <div className="relative">
          <div className={!canAccessPrompt ? "blur-md select-none pointer-events-none" : ""}>
            <pre className="whitespace-pre-wrap font-mono text-sm text-zinc-300 bg-[#111] p-6 rounded-2xl border border-white/5">
              {prompt.content}
            </pre>
          </div>

          {!canAccessPrompt && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8 bg-[#050505]/90 backdrop-blur-xl border border-white/10 rounded-[24px] shadow-2xl">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock size={28} className="text-red-500" />
                </div>
                <h3 className="text-xl font-bold">Premium Content</h3>
                <p className="text-zinc-400 mt-2 max-w-sm">Unlock this prompt and gain full access to our exclusive AI library.</p>
                <Link href="/plans">
                  <Button className="mt-6 bg-red-600 text-white font-bold" startContent={<Sparkles size={16} />}>
                    Subscribe Premium
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Instructions Section */}
      <div className={`bg-[#0a0a0a] border ${canAccessPrompt ? "border-white/5" : "border-red-500/20"} rounded-[32px] p-8`}>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          {canAccessPrompt ? <CheckCircle2 size={20} className="text-emerald-500" /> : <Lock size={20} className="text-red-500" />}
          Instructions
        </h2>
        
        <div className={!canAccessPrompt ? "blur-sm select-none" : ""}>
          <p className="text-zinc-400 leading-relaxed">{prompt.instructions}</p>
        </div>

        {!canAccessPrompt && (
          <div className="mt-6">
            <Link href="/plans">
              <Button variant="bordered" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                Unlock Premium Instructions
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptContent;