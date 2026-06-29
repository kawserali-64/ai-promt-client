"use client";

import { Card, Chip } from "@heroui/react";
import { Star, User, Layers, Tag, Target, CalendarDays, Award } from "lucide-react";

const PromptSidebar = ({ prompt }) => {
  // কনফিগুরেশন ডেটা
  const details = [
    { label: "AI Tool", value: prompt.tool, icon: <Layers size={16} /> },
    { label: "Category", value: prompt.category, icon: <Tag size={16} /> },
    { label: "Difficulty", value: prompt.difficulty, icon: <Target size={16} /> },
    { label: "Created", value: new Date(prompt.createdAt).toLocaleDateString(), icon: <CalendarDays size={16} /> },
  ];

  return (
    <div className="space-y-6">
      {/* Primary Details Card */}
      <Card className="bg-[#0a0a0a] border border-white/5 rounded-[32px] p-8 shadow-none">
        <h2 className="font-black text-xl mb-6 tracking-tight">Specifications</h2>

        <div className="space-y-5">
          {details.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-zinc-500">
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </div>
              <Chip variant="flat" className="bg-white/5 text-white font-bold text-[11px] uppercase tracking-wider">
                {item.value}
              </Chip>
            </div>
          ))}

          {/* Rating Row */}
          <div className="flex justify-between items-center pt-4 border-t border-white/5">
            <span className="text-sm text-zinc-500 flex items-center gap-2">
              <Star size={16} /> Rating
            </span>
            <div className="flex items-center gap-1.5 font-black text-yellow-500">
              <Star size={16} fill="currentColor" />
              <span>{prompt.averageRating || "0.0"}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Creator Info Card */}
      <Card className="bg-[#0a0a0a] border border-white/5 rounded-[32px] p-6 shadow-none flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-violet-500/10 flex items-center justify-center">
          <User className="text-violet-500" size={20} />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">CREATOR</p>
          <h4 className="font-bold text-sm truncate max-w-[150px]">{prompt.creatorEmail}</h4>
          <span className="text-[10px] text-emerald-500 flex items-center gap-1 mt-0.5">
            <Award size={10} /> Verified Author
          </span>
        </div>
      </Card>
    </div>
  );
};

export default PromptSidebar;