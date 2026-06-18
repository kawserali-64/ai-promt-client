'use client';
import { 
  Menu, 
  Layers, 
  Cpu, 
  Filter,
  BarChart2 // Difficulty আইকন
} from "lucide-react";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export function AllPromtSidebar() {
  // ক্যাটাগরি এবং ফিল্টার লিস্ট
  const aiTools = ["ChatGPT", "Gemini", "Claude", "Midjourney", "Stable Diffusion", "Other"];
  const categories = ["Coding", "Writing", "Marketing", "Graphics & Image", "Idea Generation", "System Assistant"];
  const difficulties = ["All", "Beginner", "Intermediate", "Pro"];

  const NavContent = () => (
    <div className="flex flex-col gap-8 p-4">
      
      {/* AI Engine Filter */}
      <div>
        <div className="text-xs font-bold text-zinc-500 mb-3 uppercase tracking-wider flex items-center gap-2">
          <Cpu className="size-4" /> AI Engine
        </div>
        <div className="flex flex-col gap-2">
          {aiTools.map((tool) => (
            <Link key={tool} href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
              {tool}
            </Link>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <div className="text-xs font-bold text-zinc-500 mb-3 uppercase tracking-wider flex items-center gap-2">
          <Layers className="size-4" /> Category
        </div>
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <Link key={cat} href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
              {cat}
            </Link>
          ))}
        </div>
      </div>

      {/* Difficulty Filter - নতুন যোগ করা হলো */}
      <div>
        <div className="text-xs font-bold text-zinc-500 mb-3 uppercase tracking-wider flex items-center gap-2">
          <BarChart2 className="size-4" /> Difficulty
        </div>
        <div className="flex flex-col gap-2">
          {difficulties.map((level) => (
            <Link key={level} href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
              {level}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* ডেস্কটপ সাইডবার */}
      <aside className="hidden lg:flex flex-col w-64 h-screen border-r border-white/5 bg-[#09090b] overflow-y-auto">
        <div className="p-6 border-b border-white/5">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Filter className="size-5 text-violet-500" /> Filters
          </h1>
        </div>
        <NavContent />
      </aside>

      {/* মোবাইল ড্রয়ার */}
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