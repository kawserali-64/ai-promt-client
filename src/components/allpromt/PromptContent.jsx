"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { Copy, Lock, Sparkles, CheckCircle2 } from "lucide-react";
import { CopyCount } from "@/lib/api/prompt";
import { toast } from "react-toastify";

const PromptContent = ({ prompt, canAccessPrompt }) => {
const [isDark, setIsDark] = useState(false);

useEffect(() => {
const checkTheme = () => {
setIsDark(document.documentElement.classList.contains("dark"));
};


checkTheme();

const observer = new MutationObserver(checkTheme);

observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["class"],
});

return () => observer.disconnect();


}, []);

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

return ( <div className="space-y-6">
<div
className={`border rounded-[32px] p-8 ${
          isDark
            ? "bg-[#0a0a0a] border-white/5"
            : "bg-white border-zinc-200"
        }`}
> <div className="flex justify-between items-center mb-6">
<h2
className={`text-xl font-bold ${
              isDark ? "text-white" : "text-violet-600"
            }`}
>
Prompt Content </h2>


      {canAccessPrompt && (
        <Button
          className={`font-bold ${
            isDark
              ? "bg-white text-black"
              : "bg-violet-600 text-white"
          }`}
          startContent={<Copy size={16} />}
          onClick={handleCopy}
        >
          Copy Prompt
        </Button>
      )}
    </div>

    <div className="relative">
      <div
        className={
          !canAccessPrompt
            ? "blur-md select-none pointer-events-none"
            : ""
        }
      >
        <pre
          className={`whitespace-pre-wrap font-mono text-sm p-6 rounded-2xl border ${
            isDark
              ? "text-zinc-300 bg-[#111] border-white/5"
              : "text-zinc-700 bg-zinc-50 border-zinc-200"
          }`}
        >
          {prompt.content}
        </pre>
      </div>

      {!canAccessPrompt && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`text-center p-8 backdrop-blur-xl border rounded-[24px] shadow-2xl ${
              isDark
                ? "bg-[#050505]/90 border-white/10"
                : "bg-white/95 border-zinc-200"
            }`}
          >
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={28} className="text-red-500" />
            </div>

            <h3
              className={`text-xl font-bold ${
                isDark ? "text-white" : "text-zinc-900"
              }`}
            >
              Premium Content
            </h3>

            <p
              className={`mt-2 max-w-sm ${
                isDark ? "text-zinc-400" : "text-zinc-600"
              }`}
            >
              Unlock this prompt and gain full access to our exclusive AI library.
            </p>

            <Link href="/plans">
              <Button
                className="mt-6 bg-red-600 text-white font-bold"
                startContent={<Sparkles size={16} />}
              >
                Subscribe Premium
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  </div>

  <div
    className={`border rounded-[32px] p-8 ${
      canAccessPrompt
        ? isDark
          ? "bg-[#0a0a0a] border-white/5"
          : "bg-white border-zinc-200"
        : "bg-white dark:bg-[#0a0a0a] border-red-500/20"
    }`}
  >
    <h2
      className={`text-xl font-bold mb-4 flex items-center gap-2 ${
        isDark ? "text-white" : "text-violet-600"
      }`}
    >
      {canAccessPrompt ? (
        <CheckCircle2 size={20} className="text-emerald-500" />
      ) : (
        <Lock size={20} className="text-red-500" />
      )}
      Instructions
    </h2>

    <div className={!canAccessPrompt ? "blur-sm select-none" : ""}>
      <p
        className={`leading-relaxed ${
          isDark ? "text-zinc-400" : "text-zinc-600"
        }`}
      >
        {prompt.instructions}
      </p>
    </div>

    {!canAccessPrompt && (
      <div className="mt-6">
        <Link href="/plans">
          <Button
            variant="bordered"
            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          >
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
