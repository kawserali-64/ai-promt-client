import PromptCard from "@/components/allpromt/PromptCard";
import { getPrompt } from "@/lib/api/prompt";

const AllPromptPage = async ({ searchParams }) => {

  // SAFE: directly pass object as query builder in API layer
  const prompts = await getPrompt(searchParams);

  return (
    <div className="p-6">

      <h3 className="text-2xl font-bold mb-6">
        All Prompts: {prompts?.length}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prompts?.map((prompt) => (
          <PromptCard key={prompt._id} prompt={prompt} />
        ))}
      </div>

    </div>
  );
};

export default AllPromptPage;