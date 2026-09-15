"use client";

import { useState } from "react";
import { Button, Card } from "@heroui/react";
import { Sparkles, Copy, Check } from "lucide-react";

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
    const res = PROCESS.ENV.NEXT_PUBLIC_API_URL + "/api/ai/improve-prompt";
      const response = await fetch(res, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rawPrompt, aiTool }),
      });

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
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center justify-center gap-2">
          <Sparkles className="h-8 w-8 text-violet-500" /> AI Prompt Improver
        </h1>
        <p className="text-zinc-400">
          Paste your raw or weak prompt below and transform it into a masterpiece.
        </p>
      </div>

      <Card className="bg-[#121214] border border-white/10 p-6 shadow-xl">
        <form onSubmit={handleImprove} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">
              Your Raw Prompt
            </label>
            <textarea
              placeholder="e.g., Write a blog post about coffee."
              value={rawPrompt}
              onChange={(e) => setRawPrompt(e.target.value)}
              rows={4}
              className="w-full bg-[#18181b] border border-white/10 text-white placeholder:text-zinc-500 rounded-xl p-4 focus:outline-none focus:border-violet-500 transition-colors resize-y"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">
              Target AI Tool
            </label>
            <select
              value={aiTool}
              onChange={(e) => setAiTool(e.target.value)}
              className="w-full bg-[#18181b] border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-violet-500 transition-colors"
            >
              {AI_TOOLS.map((tool) => (
                <option key={tool.key} value={tool.key} className="bg-[#18181b] text-white">
                  {tool.label}
                </option>
              ))}
            </select>
          </div>

          <Button
            type="submit"
            isLoading={loading}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold h-12 rounded-xl shadow-[0_0_20px_-5px_rgba(124,58,237,0.5)]"
            startContent={!loading && <Sparkles className="h-5 w-5" />}
          >
            {loading ? "Enhancing Prompt..." : "Improve Prompt"}
          </Button>
        </form>
      </Card>

      {improvedPrompt && (
        <Card className="bg-[#121214] border border-white/10 p-6 shadow-xl relative animate-in fade-in duration-300">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-violet-500" /> Optimized Prompt
            </h3>
            <Button
              size="sm"
              variant="flat"
              onClick={handleCopy}
              className="bg-white/10 text-zinc-300 hover:bg-white/20"
              startContent={
                copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />
              }
            >
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
          <div className="pt-4 text-zinc-300 whitespace-pre-wrap leading-relaxed">
            {improvedPrompt}
          </div>
        </Card>
      )}
    </div>
  );
}