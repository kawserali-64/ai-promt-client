"use client";

import {
  Menu,
  Layers,
  Cpu,
  Filter,
  BarChart2,
  Tag,
} from "lucide-react";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function AllPromtSidebar() {
  const searchParams = useSearchParams();

  const aiTools = ["ChatGPT", "Gemini", "Claude", "Copilot", "Midjourney"];
  const categories = ["SEO", "Marketing", "Writing", "Coding", "Business", "Education"];
  const tags = ["SEO", "Marketing", "Writing", "Coding", "Business", "Education", "AI", "Prompt Engineering"];
  const difficulties = ["Beginner", "Intermediate", "Pro"];

  const createLink = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value) params.delete(key);
    else params.set(key, value);
    const query = params.toString();
    return query ? `/all-promt?${query}` : "/all-promt";
  };

  const resetAll = "/all-promt";

  const linkClass = "text-sm text-zinc-600 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200";
  const headingClass = "text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-3 uppercase flex items-center gap-2";

  const NavContent = () => (
    <div className="flex flex-col gap-8 p-4">
      {/* AI TOOL */}
      <div>
        <div className={headingClass}><Cpu className="size-4 text-violet-600 dark:text-violet-400" />AI Tool</div>
        <div className="flex flex-col gap-2">
          <Link href={resetAll} className={linkClass}>All</Link>
          {aiTools.map((tool) => (
            <Link key={tool} href={createLink("tool", tool)} className={linkClass}>{tool}</Link>
          ))}
        </div>
      </div>

      {/* CATEGORY */}
      <div>
        <div className={headingClass}><Layers className="size-4 text-violet-600 dark:text-violet-400" />Category</div>
        <div className="flex flex-col gap-2">
          <Link href={resetAll} className={linkClass}>All</Link>
          {categories.map((cat) => (
            <Link key={cat} href={createLink("category", cat)} className={linkClass}>{cat}</Link>
          ))}
        </div>
      </div>

      {/* TAGS */}
      <div>
        <div className={headingClass}><Tag className="size-4 text-violet-600 dark:text-violet-400" />Tags</div>
        <div className="flex flex-col gap-2">
          <Link href={resetAll} className={linkClass}>All</Link>
          {tags.map((tag) => (
            <Link key={tag} href={createLink("tags", tag)} className={linkClass}>{tag}</Link>
          ))}
        </div>
      </div>

      {/* DIFFICULTY */}
      <div>
        <div className={headingClass}><BarChart2 className="size-4 text-violet-600 dark:text-violet-400" />Difficulty</div>
        <div className="flex flex-col gap-2">
          <Link href={resetAll} className={linkClass}>All</Link>
          {difficulties.map((level) => (
            <Link key={level} href={createLink("difficulty", level)} className={linkClass}>{level}</Link>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 h-screen overflow-y-auto border-r border-zinc-200 dark:border-white/5 bg-white dark:bg-[#050505]">
        <div className="p-6 border-b border-zinc-200 dark:border-white/5">
          <h1 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Filter className="size-5 text-violet-600 dark:text-violet-500" />
            Filters
          </h1>
        </div>
        <NavContent />
      </aside>

      {/* Mobile Sidebar */}
      <Drawer>
        {/* বাটনটি স্ক্রিনের ডান পাশে ফিক্সড এবং Search Prompts এর বরাবরে (top-32) রাখা হয়েছে */}
        <Button
          className="lg:hidden fixed top-24 right-0 z-50 shadow-lg rounded-l-xl rounded-r-none border-y border-l border-zinc-200 bg-white/90 backdrop-blur-md text-zinc-900 dark:bg-[#18181b]/90 dark:text-white dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
          variant="flat"
          isIconOnly
        >
          <Menu className="size-5" />
        </Button>

        <Drawer.Backdrop>
          <Drawer.Content placement="right">
            <Drawer.Dialog className="bg-white text-zinc-900 dark:bg-[#09090b] dark:text-white">
              <Drawer.Header className="border-b border-zinc-200 dark:border-white/5">
                <Drawer.Heading className="text-zinc-900 dark:text-white">
                  Filters
                </Drawer.Heading>
                <Drawer.CloseTrigger />
              </Drawer.Header>

              <Drawer.Body className="p-0">
                <NavContent />
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}