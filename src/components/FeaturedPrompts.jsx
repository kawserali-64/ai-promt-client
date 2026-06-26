import FeaturedPromptsClient from "./FeaturedPromptsClient";
import { getFeaturedPrompts } from "@/lib/api/prompt";

export default async function FeaturedPrompts() {
  let prompts = [];

  try {
    const data = await getFeaturedPrompts();
    prompts = data?.prompts ?? [];
  } catch (error) {
    console.error("Featured prompts fetch error:", error);
  }

  return <FeaturedPromptsClient prompts={prompts} />;
}