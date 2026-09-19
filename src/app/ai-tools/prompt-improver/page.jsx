"use client";

import { useState } from "react";
import { Button, Card } from "@heroui/react";
import { Sparkles, Copy, Check, Bot } from "lucide-react";

const AI_TOOLS = [
  { key: "ChatGPT", label: "ChatGPT" },
  { key: "Claude", label: "Claude" },
  { key: "Gemini", label: "Gemini" },
  { key: "Midjourney", label: "Midjourney" },
];

export default function AIPromptImproverPage() {
  const [rawPrompt, setRawPrompt] = useState("");
  const [aiTool, setAiTool] = useState("ChatGPT");
  const [loading, setLoading] = useState(false);
  const [improvedPrompt, setImprovedPrompt] = useState("");
  const [copied, setCopied] = useState(false);

  const handleImprove = async (e) => {
    e.preventDefault();
    if (!rawPrompt.trim()) return;

    setLoading(true);
    setImprovedPrompt("");

    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
      const apiUrl = `${baseUrl}/api/ai/improve-prompt`;
      
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rawPrompt, aiTool }),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("API endpoint not found (404) or server error.");
      }

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to improve prompt");
      }

      setImprovedPrompt(data.prompt);
    } catch (error) {
      console.error("Error improving prompt:", error);
      alert(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!improvedPrompt) return;
    navigator.clipboard.writeText(improvedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] px-4 py-8 md:px-8 lg:px-12 select-none transition-colors duration-300">
      <div className="mx-auto max-w-5xl space-y-8">
        
        {/* ==================== HEADER ==================== */}
        <div className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-600 dark:text-violet-400">
            <Sparkles size={16} />
            AI Powered
          </div>
          <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white md:text-5xl">
            AI Prompt Improver
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400 md:text-base">
            Paste your raw or weak prompt below and transform it into a professional, clear, and powerful masterpiece.
          </p>
        </div>

        {/* ==================== MAIN FORM CARD ==================== */}
        <Card className="rounded-[28px] border border-zinc-200 dark:border-white/5 bg-white dark:bg-[#0a0a0a] p-5 shadow-sm dark:shadow-none md:p-8 transition-colors duration-300">
          <form onSubmit={handleImprove} className="space-y-6">
            
            {/* RAW PROMPT INPUT */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-900 dark:text-white">
                Your Raw Prompt
              </label>
              <textarea
                placeholder="e.g., Write a blog post about coffee."
                value={rawPrompt}
                onChange={(e) => setRawPrompt(e.target.value)}
                rows={5}
                className="w-full rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#111111] p-4 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 outline-none transition-all hover:border-violet-500/40 focus:border-violet-500 resize-y"
              />
            </div>

            {/* TARGET AI TOOL SELECTOR */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-900 dark:text-white">
                Target AI Tool
              </label>
              <select
                value={aiTool}
                onChange={(e) => setAiTool(e.target.value)}
                className="h-12 w-full rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#111111] px-4 text-sm text-zinc-900 dark:text-white outline-none transition-all hover:border-violet-500/40 focus:border-violet-500"
              >
                {AI_TOOLS.map((tool) => (
                  <option key={tool.key} value={tool.key} className="bg-white dark:bg-[#111111] text-zinc-900 dark:text-white">
                    {tool.label}
                  </option>
                ))}
              </select>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                size="lg"
                isLoading={loading}
                isDisabled={loading || !rawPrompt.trim()}
                className="bg-violet-600 px-7 font-bold text-white hover:bg-violet-500 transition-all shadow-[0_0_20px_-5px_rgba(124,58,237,0.5)]"
                startContent={!loading && <Sparkles size={18} />}
              >
                {loading ? "Enhancing Prompt..." : "Improve Prompt"}
              </Button>
            </div>
          </form>
        </Card>

        {/* ==================== RESULT CARD ==================== */}
        {improvedPrompt && (
          <Card className="rounded-[28px] border border-violet-500/20 bg-white dark:bg-[#0a0a0a] p-5 shadow-sm dark:shadow-none md:p-8 transition-colors duration-300 animate-in fade-in duration-300">
            
            {/* RESULT HEADER */}
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
                  <Bot size={19} />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                  Optimized Prompt
                </h3>
              </div>

              <Button
                size="sm"
                variant="flat"
                onClick={handleCopy}
                className={
                  copied
                    ? "bg-green-500/10 font-semibold text-green-600 dark:text-green-400"
                    : "bg-zinc-100 dark:bg-white/5 font-semibold text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-white/10"
                }
                startContent={copied ? <Check size={16} /> : <Copy size={16} />}
              >
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>

            {/* OPTIMIZED TEXT */}
            <div className="rounded-2xl border border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-[#111111] p-5">
              <p className="whitespace-pre-wrap text-sm leading-7 text-zinc-700 dark:text-zinc-300">
                {improvedPrompt}
              </p>
            </div>
          </Card>
        )}

      </div>
    </div>
  );
}