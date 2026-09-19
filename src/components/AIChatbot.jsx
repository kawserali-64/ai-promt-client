"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  X,
  Send,
  Sparkles,
  Loader2,
  User,
  Trash2,
  Maximize2,
  Minimize2,
  Terminal,
  Code2,
  Wand2,
  Lightbulb,
  Copy,
  Check,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const PROMPT_SUGGESTIONS = [
  {
    id: "optimize-prompt",
    label: "Refine Prompt",
    icon: Wand2,
    prompt: "Can you refine this prompt to make it production-ready and professional?",
  },
  {
    id: "next-api",
    label: "Next.js API Structure",
    icon: Code2,
    prompt: "Provide a clean Next.js App Router API route structure with TypeScript and error handling.",
  },
  {
    id: "framer-motion",
    label: "Framer Motion Tips",
    icon: Terminal,
    prompt: "How can I build smooth bento-grid entrance animations with Framer Motion?",
  },
  {
    id: "explain-code",
    label: "Explain Code Architecture",
    icon: Lightbulb,
    prompt: "Explain how to structure full-stack React components for maximum reusability.",
  },
];

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, loading, isOpen]);

  const handleSend = async (customPrompt) => {
    const textToSend = customPrompt || message.trim();
    if (!textToSend || loading) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      text: textToSend,
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!customPrompt) setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/ai/chat`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: textToSend }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch response.");
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "ai",
          text: data.message,
        },
      ]);
    } catch (error) {
      console.error("AI Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "ai",
          text: "System encountered an error. Please check your backend endpoint configurations.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[99999] font-sans antialiased">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            className={`flex flex-col mb-4 overflow-hidden rounded-3xl border border-cyan-500/20 bg-[#090a10]/90 backdrop-blur-2xl shadow-[0_0_60px_-10px_rgba(6,182,212,0.3)] transition-all duration-300 ${
              isExpanded
                ? "w-[90vw] h-[82vh] sm:w-[650px] sm:h-[720px]"
                : "w-[calc(100vw-32px)] h-[580px] sm:w-[400px]"
            }`}
          >
            {/* Background Aesthetic Glows */}
            <div className="absolute top-0 left-1/3 w-40 h-40 bg-cyan-500/10 blur-[60px] pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-rose-500/10 blur-[60px] pointer-events-none" />

            {/* HEADER */}
            <div className="relative z-10 flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#0d0e17]/80 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-indigo-500/20 to-rose-500/20 border border-white/15 shadow-inner">
                  <Sparkles size={20} className="text-cyan-400" />
                  <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white tracking-wide flex items-center gap-2">
                    Next Skill AI
                  </h3>
                  <p className="text-[11px] text-zinc-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online & Ready
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    onClick={() => setMessages([])}
                    title="Clear Chat"
                    className="p-2 text-zinc-400 hover:text-rose-400 hover:bg-white/5 rounded-xl transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="hidden sm:flex p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                >
                  {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* CHAT MESSAGES AREA */}
            <div className="relative z-10 flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3 p-4 rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-950/20 to-indigo-950/20 backdrop-blur-sm"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Bot size={18} />
                </div>
                <div className="text-xs leading-relaxed text-zinc-300 space-y-1">
                  <p className="font-semibold text-white">Next Skill AI Assistant</p>
                  <p>
                    Select any quick prompt title below or write your custom message to start generating responses.
                  </p>
                </div>
              </motion.div>

              {messages.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex gap-3 ${
                    item.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {item.type === "ai" && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                      <Bot size={18} />
                    </div>
                  )}

                  <div
                    className={`relative group max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                      item.type === "user"
                        ? "bg-gradient-to-r from-cyan-600 via-indigo-600 to-rose-600 text-white shadow-lg shadow-cyan-500/10 rounded-tr-none"
                        : "bg-slate-900/70 border border-white/10 text-zinc-200 rounded-tl-none shadow-sm"
                    }`}
                  >
                    {item.type === "ai" ? (
                      <div className="prose prose-invert max-w-none text-xs">
                        <button
                          onClick={() => copyToClipboard(item.text, item.id)}
                          className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-white"
                          title="Copy response"
                        >
                          {copiedId === item.id ? (
                            <Check size={13} className="text-emerald-400" />
                          ) : (
                            <Copy size={13} />
                          )}
                        </button>

                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            h1: ({ children }) => (
                              <h1 className="text-sm font-bold text-white my-2">{children}</h1>
                            ),
                            h2: ({ children }) => (
                              <h2 className="text-xs font-bold text-cyan-300 my-1.5">{children}</h2>
                            ),
                            p: ({ children }) => (
                              <p className="mb-2 last:mb-0 text-zinc-300 leading-relaxed">{children}</p>
                            ),
                            strong: ({ children }) => (
                              <strong className="text-white font-semibold">{children}</strong>
                            ),
                            ul: ({ children }) => (
                              <ul className="list-disc pl-4 my-2 space-y-1">{children}</ul>
                            ),
                            ol: ({ children }) => (
                              <ol className="list-decimal pl-4 my-2 space-y-1">{children}</ol>
                            ),
                            code: ({ inline, children }) =>
                              inline ? (
                                <code className="px-1.5 py-0.5 rounded bg-white/10 text-cyan-300 font-mono text-[11px]">
                                  {children}
                                </code>
                              ) : (
                                <code className="block p-3 my-2 rounded-xl bg-black/80 border border-white/10 text-zinc-300 font-mono text-[11px] overflow-x-auto">
                                  {children}
                                </code>
                              ),
                            blockquote: ({ children }) => (
                              <blockquote className="border-l-2 border-rose-500 pl-3 my-2 italic text-zinc-400 bg-rose-500/5 py-1.5 rounded-r-lg">
                                {children}
                              </blockquote>
                            ),
                          }}
                        >
                          {item.text}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap">{item.text}</p>
                    )}
                  </div>

                  {item.type === "user" && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
                      <User size={16} />
                    </div>
                  )}
                </motion.div>
              ))}

              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3 justify-start"
                >
                  <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                    <Bot size={18} />
                  </div>
                  <div className="p-3.5 rounded-2xl rounded-tl-none bg-slate-900/70 border border-white/10 flex items-center gap-2 text-zinc-400 text-xs">
                    <Loader2 size={14} className="animate-spin text-cyan-400" />
                    <span>Processing request...</span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* INPUT SECTION WITH PROMPT TITLE CHIPS */}
            <div className="relative z-10 p-3 bg-[#0d0e17]/90 border-t border-white/10 backdrop-blur-md space-y-2.5">
              {/* TOP PROMPT SUGGESTION CHIPS */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {PROMPT_SUGGESTIONS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSend(item.prompt)}
                      disabled={loading}
                      className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-rose-500/20 hover:border-cyan-500/40 text-[11px] text-zinc-300 hover:text-white transition-all disabled:opacity-50"
                    >
                      <Icon size={12} className="text-cyan-400" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* INPUT FORM */}
              <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-black/60 border border-white/10 focus-within:border-cyan-500/50 transition-colors">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  disabled={loading}
                  placeholder={loading ? "Generating answer..." : "Ask Next Skill AI..."}
                  className="flex-1 px-3 bg-transparent text-xs text-white placeholder-zinc-500 focus:outline-none disabled:opacity-50"
                />

                <button
                  onClick={() => handleSend()}
                  disabled={!message.trim() || loading}
                  className={`p-2.5 rounded-xl transition-all duration-200 flex items-center justify-center ${
                    message.trim() && !loading
                      ? "bg-gradient-to-r from-cyan-500 via-indigo-500 to-rose-500 text-white shadow-md shadow-rose-500/20 hover:scale-105 active:scale-95"
                      : "bg-white/5 text-zinc-600 cursor-not-allowed"
                  }`}
                >
                  {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Send size={16} />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ANIMATED FRAMER MOTION FLOATING TRIGGER BUBBLE */}
      <motion.div
        className="relative flex items-center justify-center ml-auto"
        initial={false}
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      >
        {/* Glow Ring Effect */}
        <motion.span
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500 via-indigo-500 to-rose-500 opacity-60 blur-md pointer-events-none"
          animate={{
            scale: isOpen ? 1 : [1, 1.25, 1],
            opacity: isOpen ? 0.2 : [0.4, 0.7, 0.4],
          }}
          transition={{ repeat: Infinity, duration: 2.5 }}
        />

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Assistant"
          className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full bg-[#0d0e17] border border-cyan-500/40 text-white shadow-[0_0_30px_rgba(6,182,212,0.4)] overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-indigo-500/20 to-rose-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
          />

          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} className="text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="bot"
                initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
                className="relative flex items-center justify-center"
              >
                <Bot size={26} className="text-cyan-400" />
              </motion.div>
            )}
          </AnimatePresence>

          {!isOpen && (
            <span className="absolute top-2 right-2 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500 border-2 border-slate-950" />
            </span>
          )}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default AIChatbot;