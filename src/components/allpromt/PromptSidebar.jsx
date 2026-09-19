"use client";

import { useEffect, useState } from "react";
import { Card, Chip } from "@heroui/react";
import {
Star,
User,
Layers,
Tag,
Target,
CalendarDays,
Award,
} from "lucide-react";

const PromptSidebar = ({ prompt }) => {
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

// Configuration Data
const details = [
{
label: "AI Tool",
value: prompt.tool,
icon: <Layers size={16} />,
},
{
label: "Category",
value: prompt.category,
icon: <Tag size={16} />,
},
{
label: "Difficulty",
value: prompt.difficulty,
icon: <Target size={16} />,
},
{
label: "Created",
value: new Date(prompt.createdAt).toLocaleDateString(),
icon: <CalendarDays size={16} />,
},
];

return ( <div className="space-y-6">
{/* Primary Details Card */}
<Card
className={`border rounded-[32px] p-8 shadow-none ${
          isDark
            ? "bg-[#0a0a0a] border-white/5"
            : "bg-white border-zinc-200"
        }`}
>
<h2
className={`font-black text-xl mb-6 tracking-tight ${
            isDark ? "text-white" : "text-violet-600"
          }`}
>
Specifications </h2>


    <div className="space-y-5">
      {details.map((item, idx) => (
        <div
          key={idx}
          className="flex justify-between items-center"
        >
          <div
            className={`flex items-center gap-2 ${
              isDark ? "text-zinc-500" : "text-zinc-600"
            }`}
          >
            {item.icon}

            <span className="text-sm">
              {item.label}
            </span>
          </div>

          <Chip
            variant="flat"
            className={`font-bold text-[11px] uppercase tracking-wider ${
              isDark
                ? "bg-white/5 text-white"
                : "bg-zinc-100 text-zinc-900"
            }`}
          >
            {item.value}
          </Chip>
        </div>
      ))}

      {/* Rating Row */}
      <div
        className={`flex justify-between items-center pt-4 border-t ${
          isDark ? "border-white/5" : "border-zinc-200"
        }`}
      >
        <span
          className={`text-sm flex items-center gap-2 ${
            isDark ? "text-zinc-500" : "text-zinc-600"
          }`}
        >
          <Star size={16} />
          Rating
        </span>

        <div className="flex items-center gap-1.5 font-black text-yellow-500">
          <Star size={16} fill="currentColor" />
          <span>{prompt.averageRating || "0.0"}</span>
        </div>
      </div>
    </div>
  </Card>

  {/* Creator Info Card */}
  <Card
    className={`border rounded-[32px] p-6 shadow-none flex items-center gap-4 ${
      isDark
        ? "bg-[#0a0a0a] border-white/5"
        : "bg-white border-zinc-200"
    }`}
  >
    <div className="w-12 h-12 rounded-full bg-violet-500/10 flex items-center justify-center">
      <User className="text-violet-500" size={20} />
    </div>

    <div>
      <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
        CREATOR
      </p>

      <h4
        className={`font-bold text-sm truncate max-w-[150px] ${
          isDark ? "text-white" : "text-zinc-900"
        }`}
      >
        {prompt.creatorEmail}
      </h4>

      <span className="text-[10px] text-emerald-500 flex items-center gap-1 mt-0.5">
        <Award size={10} />
        Verified Author
      </span>
    </div>
  </Card>
</div>


);
};

export default PromptSidebar;
