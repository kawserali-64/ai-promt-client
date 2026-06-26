import PromptCard from "@/components/allpromt/PromptCard";
import { getFeaturedPrompts } from "@/lib/api/prompt";
import Link from "next/link";

export default async function FeaturedPrompts() {
  const data = await getFeaturedPrompts();

  const prompts = data.prompts || [];

  return (
    <section className="py-20 bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-4xl font-bold text-white">
              ⭐ Featured Prompts
            </h2>

            <p className="text-zinc-400 mt-2">
              Trending prompts picked by our editors.
            </p>
          </div>

          <Link
            href="/all-promt"
            className="text-violet-400 hover:text-violet-300"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {prompts.map((prompt) => (
            <PromptCard
              key={prompt._id}
              prompt={prompt}
            />
          ))}
        </div>

      </div>
    </section>
  );
}