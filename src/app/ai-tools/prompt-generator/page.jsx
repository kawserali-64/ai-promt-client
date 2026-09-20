"use client";

import { useState } from "react";
import { Card, Button } from "@heroui/react";
import {
  Bot,
  Sparkles,
  Copy,
  Check,
  WandSparkles,
} from "lucide-react";
import { generatePrompt } from "@/lib/api/prompt";

const PromptGeneratorPage = () => {
  const [idea, setIdea] = useState("");
  const [aiTool, setAiTool] = useState("ChatGPT");
  const [category, setCategory] = useState("Web Development");

  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");


  const handleGenerate = async () => {
    if (!idea.trim()) {
      setError("Please describe what kind of prompt you want to create.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setGeneratedPrompt("");
      setCopied(false);

      const data = await generatePrompt({
        idea,
        aiTool,
        category,
      });

      setGeneratedPrompt(data.prompt || "");
    } catch (error) {
      setError(
        error.message || "Failed to generate prompt. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!generatedPrompt) return;

    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] px-4 py-8 md:px-8 lg:px-12 select-none transition-colors duration-300">
      <div className="mx-auto max-w-5xl">
        {/* ==================== HEADER ==================== */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-600 dark:text-violet-400">
            <Sparkles size={16} />
            AI Powered
          </div>

          <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white md:text-5xl">
            AI Prompt Generator
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400 md:text-base">
            Describe what you want to create and let AI generate a
            professional, clear, and powerful prompt for you.
          </p>
        </div>

        {/* ==================== GENERATOR FORM ==================== */}
        <Card className="rounded-[28px] border border-zinc-200 dark:border-white/5 bg-white dark:bg-[#0a0a0a] p-5 shadow-sm dark:shadow-none md:p-8 transition-colors duration-300">
          {/* IDEA INPUT */}
          <div className="mb-6 flex flex-col">
            <label className="text-zinc-900 dark:text-white font-semibold mb-2 text-sm">
              What do you want to create?
            </label>
            <textarea
              placeholder="Example: Create a modern portfolio website for a junior full stack developer..."
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              rows={6}
              className="w-full rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#111111] p-4 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 outline-none transition-all hover:border-violet-500/40 focus:border-violet-500 resize-y"
            />
          </div>

          {/* AI TOOL + CATEGORY */}
          <div className="grid gap-5 md:grid-cols-2">
            {/* AI TOOL */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-900 dark:text-white">
                AI Tool
              </label>

              <select
                value={aiTool}
                onChange={(e) => setAiTool(e.target.value)}
                className="h-12 w-full rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#111111] px-4 text-sm text-zinc-900 dark:text-white outline-none transition-all hover:border-violet-500/40 focus:border-violet-500"
              >
                <option value="ChatGPT">ChatGPT</option>
                <option value="Claude">Claude</option>
                <option value="Gemini">Gemini</option>
                <option value="Midjourney">Midjourney</option>
                <option value="Grok">Grok</option>
              </select>
            </div>

            {/* CATEGORY */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-900 dark:text-white">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-12 w-full rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#111111] px-4 text-sm text-zinc-900 dark:text-white outline-none transition-all hover:border-violet-500/40 focus:border-violet-500"
              >
                <option value="Web Development">Web Development</option>
                <option value="Design">Design</option>
                <option value="Writing">Writing</option>
                <option value="Marketing">Marketing</option>
                <option value="Business">Business</option>
                <option value="Education">Education</option>
                <option value="Image Generation">
                  Image Generation
                </option>
                <option value="Programming">Programming</option>
                <option value="General">General</option>
              </select>
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-500 dark:text-red-400">
              {error}
            </div>
          )}

          {/* GENERATE BUTTON */}
          <div className="mt-7 flex justify-end">
            <Button
              size="lg"
              onPress={handleGenerate}
              isLoading={loading}
              isDisabled={loading || !idea.trim()}
              startContent={
                !loading && <WandSparkles size={18} />
              }
              className="bg-violet-600 px-7 font-bold text-white hover:bg-violet-500 transition-all"
            >
              {loading ? "Generating..." : "Generate Prompt"}
            </Button>
          </div>
        </Card>

        {/* ==================== GENERATED PROMPT ==================== */}
        {generatedPrompt && (
          <Card className="mt-6 rounded-[28px] border border-violet-500/20 bg-white dark:bg-[#0a0a0a] p-5 shadow-sm dark:shadow-none md:p-8 transition-colors duration-300">
            {/* RESULT HEADER */}
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
                    <Bot size={19} />
                  </div>

                  <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                    Generated Prompt
                  </h2>
                </div>

                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  Your AI-generated prompt is ready to use.
                </p>
              </div>

              {/* COPY BUTTON */}
              <Button
                size="sm"
                variant="flat"
                onPress={handleCopy}
                startContent={
                  copied ? <Check size={16} /> : <Copy size={16} />
                }
                className={
                  copied
                    ? "bg-green-500/10 font-semibold text-green-600 dark:text-green-400"
                    : "bg-zinc-100 dark:bg-white/5 font-semibold text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-white/10"
                }
              >
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>

            {/* GENERATED TEXT */}
            <div className="rounded-2xl border border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-[#111111] p-5">
              <p className="whitespace-pre-wrap text-sm leading-7 text-zinc-700 dark:text-zinc-300">
                {generatedPrompt}
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PromptGeneratorPage;