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

  // ✅ CLEAN LINK BUILDER (IMPORTANT FIX)
  const createLink = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    // empty = remove filter
    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    const query = params.toString();
    return query ? `/all-promt?${query}` : "/all-promt";
  };

  // ✅ RESET ALL FILTERS
  const resetAll = "/all-promt";

  const NavContent = () => (
    <div className="flex flex-col gap-8 p-4">

      {/* AI TOOL */}
      <div>
        <div className="text-xs font-bold text-zinc-500 mb-3 uppercase flex items-center gap-2">
          <Cpu className="size-4" />
          AI Tool
        </div>

        <div className="flex flex-col gap-2">

          {/* ALL BUTTON (RESET ONLY THIS FILTER GROUP) */}
          <Link
            href={resetAll}
            className="text-sm text-zinc-400 hover:text-white"
          >
            All
          </Link>

          {aiTools.map((tool) => (
            <Link
              key={tool}
              href={createLink("tool", tool)}
              className="text-sm text-zinc-400 hover:text-white"
            >
              {tool}
            </Link>
          ))}
        </div>
      </div>

      {/* CATEGORY */}
      <div>
        <div className="text-xs font-bold text-zinc-500 mb-3 uppercase flex items-center gap-2">
          <Layers className="size-4" />
          Category
        </div>

        <div className="flex flex-col gap-2">

          <Link
            href={resetAll}
            className="text-sm text-zinc-400 hover:text-white"
          >
            All
          </Link>

          {categories.map((cat) => (
            <Link
              key={cat}
              href={createLink("category", cat)}
              className="text-sm text-zinc-400 hover:text-white"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      {/* TAGS */}
      <div>
        <div className="text-xs font-bold text-zinc-500 mb-3 uppercase flex items-center gap-2">
          <Tag className="size-4" />
          Tags
        </div>

        <div className="flex flex-col gap-2">

          <Link
            href={resetAll}
            className="text-sm text-zinc-400 hover:text-white"
          >
            All
          </Link>

          {tags.map((tag) => (
            <Link
              key={tag}
              href={createLink("tags", tag)}
              className="text-sm text-zinc-400 hover:text-white"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* DIFFICULTY */}
      <div>
        <div className="text-xs font-bold text-zinc-500 mb-3 uppercase flex items-center gap-2">
          <BarChart2 className="size-4" />
          Difficulty
        </div>

        <div className="flex flex-col gap-2">

          <Link
            href={resetAll}
            className="text-sm text-zinc-400 hover:text-white"
          >
            All
          </Link>

          {difficulties.map((level) => (
            <Link
              key={level}
              href={createLink("difficulty", level)}
              className="text-sm text-zinc-400 hover:text-white"
            >
              {level}
            </Link>
          ))}
        </div>
      </div>

    </div>
  );

  return (
    <>
      <aside className="hidden lg:flex flex-col w-64 h-screen border-r border-white/5 bg-[#09090b] overflow-y-auto">
        <div className="p-6 border-b border-white/5">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Filter className="size-5 text-violet-500" />
            Filters
          </h1>
        </div>

        <NavContent />
      </aside>

      <Drawer>
        <Button className="lg:hidden m-4" variant="flat" isIconOnly>
          <Menu className="size-5" />
        </Button>

        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog className="bg-[#09090b]">
              <Drawer.Header>
                <Drawer.Heading>Filters</Drawer.Heading>
                <Drawer.CloseTrigger />
              </Drawer.Header>

              <Drawer.Body>
                <NavContent />
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}