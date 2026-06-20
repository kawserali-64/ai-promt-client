import { Card, Button } from "@heroui/react";
import { Bookmark, Star } from "lucide-react";

const PromptHeader = ({ prompt }) => {
  return (
    <Card className="p-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            {prompt.title}
          </h1>

          <p className="mt-3 text-default-500">
            {prompt.description}
          </p>
        </div>

        <div className="flex gap-2">
          <Button isIconOnly variant="flat">
            <Bookmark size={18} />
          </Button>

          <Button isIconOnly variant="flat">
            <Star size={18} />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PromptHeader;