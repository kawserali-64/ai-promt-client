"use client";
import { Link } from "@heroui/react";
import { Terminal, Globe, Mail } from "lucide-react";

function FooterPage() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/10 bg-[#050505] text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        
        {/* মেইন গ্রিড লেআউট */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          
          {/* ================= ১. ব্র্যান্ড সেকশন ================= */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2.5 font-bold text-white group w-fit transition-opacity hover:opacity-90">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 shadow-[0_0_20px_-5px_rgba(124,58,237,0.5)]">
                <Terminal className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                Prompt<span className="text-violet-500">Forge</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-zinc-500 max-w-xs">
              Discover, copy, and create production-ready AI prompts for Gemini, ChatGPT, Claude, and Midjourney. Build better apps, write better code, and automate your productivity.
            </p>
          </div>

          {/* ================= ২. প্ল্যাটফর্ম লিংকস ================= */}
          <div className="flex flex-col gap-6">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-white">Platform</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li><Link href="/all-prompts" className="text-zinc-400 hover:text-violet-400 transition-colors">All Prompts</Link></li>
              <li><Link href="/#trending" className="text-zinc-400 hover:text-violet-400 transition-colors">Trending Prompts</Link></li>
              <li><Link href="/login" className="text-zinc-400 hover:text-violet-400 transition-colors">Login</Link></li>
              <li><Link href="/register" className="text-zinc-400 hover:text-violet-400 transition-colors">Register</Link></li>
            </ul>
          </div>

          {/* ================= ৩. রিসোর্সেস লিংকস ================= */}
          <div className="flex flex-col gap-6">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-white">Resources</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li><Link href="https://uiverse.io/" target="_blank" className="text-zinc-400 hover:text-violet-400 transition-colors">UI Elements</Link></li>
              <li><Link href="https://devmeetsdevs.com/" target="_blank" className="text-zinc-400 hover:text-violet-400 transition-colors">Dev Meets Devs</Link></li>
              <li><Link href="https://stripe.com" target="_blank" className="text-zinc-400 hover:text-violet-400 transition-colors">Stripe Payment</Link></li>
              <li><Link href="https://firebase.google.com" target="_blank" className="text-zinc-400 hover:text-violet-400 transition-colors">Firebase Auth</Link></li>
            </ul>
          </div>

          {/* ================= ৪. কানেক্ট সেকশন ================= */}
          <div className="flex flex-col gap-6">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-white">Connect</h3>
            
            <div className="flex items-center gap-3">
              <a href="https://x.com" target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03] border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-all">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03] border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-all">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.48 0-.236-.009-.866-.014-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.068.069-.068 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .269.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03] border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-all">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="#" target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03] border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-all">
                <Globe className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-2 flex flex-col gap-2">
              <span className="text-[10px] font-bold uppercase text-zinc-600 tracking-wider">Support</span>
              <a href="mailto:support@promptforge.com" className="flex items-center gap-2 text-sm font-semibold text-zinc-300 hover:text-violet-400 transition-colors">
                <Mail className="h-4 w-4" /> support@promptforge.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-zinc-600">
          <p>&copy; {currentYear} PromptForge. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="text-xs text-zinc-600 hover:text-zinc-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-zinc-600 hover:text-zinc-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterPage;