import Image from "next/image";
import Link from "next/link";
import { Star, Copy, Eye } from "lucide-react";

const PromptCard = ({ prompt }) => {
  return (
    <div className="overflow-hidden rounded-2xl bg-[#111827] border border-[#1f2937] hover:border-violet-500 transition-all duration-300">

      {/* IMAGE */}
      <div className="relative h-40">
        <Image
          src={prompt?.image}
          alt={prompt?.title}
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />

        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2 py-1 text-[10px] rounded-full bg-amber-500 text-white">
            {prompt?.tool}
          </span>

          <span className="px-2 py-1 text-[10px] rounded-full bg-white/10 text-white">
            {prompt?.difficulty}
          </span>
        </div>
      </div>

      {/* BODY */}
      <div className="p-4">

        <h3 className="text-white font-semibold text-base line-clamp-2">
          {prompt?.title}
        </h3>

        <p className="text-gray-400 text-sm mt-2 line-clamp-2">
          {prompt?.description}
        </p>

        <p className="mt-3 text-xs text-violet-400">
          #{prompt?.category}
        </p>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between text-xs text-gray-400">

          <span>
            Prompt:{prompt.role}
          </span>

          <div className="flex items-center gap-3">

            <div className="flex items-center gap-1">
              <Eye size={13} />
              <span>{prompt?.views || 0}</span>
            </div>

            <div className="flex items-center gap-1">
              <Copy size={13} />
              <span>{prompt?.copyCount || 0}</span>
            </div>

            <div className="flex items-center gap-1">
              <Star size={13} />
              <span>{prompt?.averageRating || 0}</span>
            </div>

          </div>

        </div>

        <Link href={`/all-promt/${prompt?._id}`}>
          <button className="mt-4 w-full py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium">
            View Details
          </button>
        </Link>

      </div>
    </div>
  );
};

export default PromptCard;