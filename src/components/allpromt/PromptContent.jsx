import { Card, Button } from "@heroui/react";
import { Copy } from "lucide-react";

const PromptContent = ({ prompt }) => {
  return (
    <>
      <Card className="p-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">
            Prompt Content
          </h2>

          <Button
            color="primary"
            startContent={<Copy size={16} />}
          >
            Copy Prompt
          </Button>
        </div>

        <pre className="whitespace-pre-wrap">
          {prompt.content}
        </pre>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">
          Instructions
        </h2>

        <p>{prompt.instructions}</p>
      </Card>
    </>
  );
};

export default PromptContent;