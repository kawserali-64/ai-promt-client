import Image from "next/image";
import Link from "next/link";
import { Star, Copy, Eye } from "lucide-react";

const PromptCard = ({ prompt }) => {
  const imageSrc = prompt?.image?.trim() ? prompt.image : "/placeholder.png";

  return (
    <div className="group relative bg-white dark:bg-[#121214] rounded-3xl border border-zinc-200/80 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between w-full">
      
      {/* IMAGE SECTION */}
      <div className="relative h-48 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <Image
          src={imageSrc}
          alt={prompt?.title || "prompt"}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

        {/* BADGES */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <div className="flex gap-1.5 flex-wrap">
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-zinc-900/90 backdrop-blur-md text-white border border-white/10 shadow">
              {prompt?.tool}
            </span>
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-white/95 backdrop-blur-md text-zinc-900 shadow font-semibold">
              {prompt?.difficulty}
            </span>
          </div>

          {/* PREMIUM BADGE */}
          {prompt?.visibility === "Private" && (
            <span className="px-2.5 py-1 rounded-lg bg-violet-600 text-white text-[10px] font-black uppercase tracking-widest shadow-md">
              Pro
            </span>
          )}
        </div>
      </div>

      {/* BODY SECTION */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono font-semibold text-violet-600 dark:text-violet-400">
              #{prompt?.category}
            </span>
            <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
              {prompt?.role}
            </span>
          </div>

          <h3 className="text-zinc-900 dark:text-white font-bold text-base line-clamp-1 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
            {prompt?.title}
          </h3>

          <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">
            {prompt?.description}
          </p>
        </div>

        <div>
          {/* FOOTER STATS */}
          <div className="mt-4 pt-3 flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 border-t border-zinc-100 dark:border-white/5">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1"><Eye size={12} /> {prompt?.views || 0}</div>
              <div className="flex items-center gap-1"><Copy size={12} /> {prompt?.copyCount || 0}</div>
            </div>
            <div className="flex items-center gap-1 text-amber-500 font-semibold">
              <Star size={12} fill="currentColor" /> 
              <span>{Number(prompt?.averageRating || 0).toFixed(1)}</span>
            </div>
          </div>

          {/* BUTTON */}
          <Link href={`/all-promt/${prompt?._id}`} className="block mt-4">
            <button className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs tracking-wide transition-all shadow-sm shadow-violet-600/25">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PromptCard;