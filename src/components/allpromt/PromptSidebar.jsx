import { Card, Chip } from "@heroui/react";
import { Star, User } from "lucide-react";

const PromptSidebar = ({ prompt }) => {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="font-bold text-xl mb-5">
          Prompt Details
        </h2>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Tool</span>
            <Chip>{prompt.tool}</Chip>
          </div>

          <div className="flex justify-between">
            <span>Category</span>
            <Chip>{prompt.category}</Chip>
          </div>

          <div className="flex justify-between">
            <span>Difficulty</span>
            <Chip>{prompt.difficulty}</Chip>
          </div>

          <div className="flex justify-between items-center">
            <span>Rating</span>

            <div className="flex items-center gap-2">
              <Star
                size={16}
                className="fill-yellow-400 text-yellow-400"
              />
              {prompt.averageRating}
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-3">
          <User />
          <div>
            <h4>Creator</h4>
            <p>{prompt.creatorEmail}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PromptSidebar;