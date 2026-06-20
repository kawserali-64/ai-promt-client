"use client";

import { Card, Button } from "@heroui/react";
import { Copy } from "lucide-react";
import { CopyCount } from "@/lib/api/prompt";

const PromptContent = ({ prompt }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.content);

      // API call (clean architecture)
      await CopyCount(prompt._id);

      alert("Prompt copied successfully!");
    } catch (error) {
      alert("Failed to copy prompt");
    }
  };

  return (
    <>
      <Card className="p-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Prompt Content</h2>

          <Button
            color="primary"
            startContent={<Copy size={16} />}
            onClick={handleCopy}
          >
            Copy Prompt
          </Button>
        </div>

        <pre className="whitespace-pre-wrap">
          {prompt.content}
        </pre>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Instructions</h2>
        <p>{prompt.instructions}</p>
      </Card>
    </>
  );
};

export default PromptContent;