import Image from "next/image";
import Link from "next/link";
import { Star, Copy, Eye } from "lucide-react";

const PromptCard = ({ prompt }) => {
  const imageSrc = prompt?.image?.trim() ? prompt.image : "/placeholder.png";

  return (
    <div className="group relative bg-[#0a0a0a] rounded-[24px] border border-white/5 overflow-hidden transition-all duration-500 hover:border-violet-500/30 hover:shadow-[0_0_40px_-15px_rgba(139,92,246,0.3)]">
      
      {/* IMAGE SECTION */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={imageSrc}
          alt={prompt?.title || "prompt"}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

        {/* BADGES */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white">
            {prompt?.tool}
          </span>
          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-white/10 backdrop-blur-md text-white">
            {prompt?.difficulty}
          </span>
        </div>

        {/* PREMIUM BADGE */}
        {prompt?.visibility === "Private" && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
              Premium
            </span>
          </div>
        )}
      </div>

      {/* BODY SECTION */}
      <div className="p-6">
        <h3 className="text-white font-bold text-lg line-clamp-1 group-hover:text-violet-400 transition-colors">
          {prompt?.title}
        </h3>

        <p className="text-zinc-500 text-sm mt-2 line-clamp-2 leading-relaxed">
          {prompt?.description}
        </p>

        <p className="mt-4 text-[11px] font-mono text-violet-500/80">
          #{prompt?.category}
        </p>

        {/* FOOTER STATS */}
        <div className="mt-6 flex items-center justify-between text-[11px] text-zinc-500">
          <span className="font-medium text-zinc-400">{prompt?.role}</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5"><Eye size={13} /> {prompt?.views || 0}</div>
            <div className="flex items-center gap-1.5"><Copy size={13} /> {prompt?.copyCount || 0}</div>
            <div className="flex items-center gap-1.5 text-amber-400"><Star size={13} /> {Number(prompt?.averageRating || 0).toFixed(1)}</div>
          </div>
        </div>

        {/* BUTTON */}
        <Link href={`/all-promt/${prompt?._id}`}>
          <button className="mt-6 w-full py-3 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-violet-500 hover:text-white transition-all duration-300">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PromptCard;