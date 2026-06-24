"use client";

import Link from "next/link";
import { Card, Button } from "@heroui/react";
import { Copy, Lock } from "lucide-react";
import { CopyCount } from "@/lib/api/prompt";

const PromptContent = ({
  prompt,
  canAccessPrompt,
}) => {

  const handleCopy = async () => {
    if (!canAccessPrompt) return;

    try {
      await navigator.clipboard.writeText(
        prompt.content
      );

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
          <h2 className="text-xl font-semibold">
            Prompt Content
          </h2>

          {canAccessPrompt && (
            <Button
              color="primary"
              startContent={<Copy size={16} />}
              onClick={handleCopy}
            >
              Copy Prompt
            </Button>
          )}
        </div>

        {canAccessPrompt ? (
          <pre className="whitespace-pre-wrap">
            {prompt.content}
          </pre>
        ) : (
          <div className="relative min-h-[250px] overflow-hidden rounded-xl">

            {/* Blurred Content */}
            <div className="blur-md select-none pointer-events-none">
              <pre className="whitespace-pre-wrap">
                {prompt.content}
              </pre>
            </div>

            {/* Lock Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <div className="max-w-md text-center bg-[#111827] border border-red-500 rounded-2xl p-6">

                <Lock
                  size={40}
                  className="mx-auto text-red-500 mb-3"
                />

                <h3 className="text-xl font-bold text-white">
                  Premium Prompt
                </h3>

                <p className="text-gray-400 mt-2">
                  Upgrade to Premium to unlock
                  this private prompt and gain
                  access to all premium prompts.
                </p>

                <Link href="/plans">
                  <Button
                    color="danger"
                    className="mt-5"
                  >
                    Subscribe Premium
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Instructions */}
      {canAccessPrompt ? (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            Instructions
          </h2>

          <p>{prompt.instructions}</p>
        </Card>
      ) : (
        <Card className="p-6 border border-red-500/30">
          <h2 className="text-xl font-semibold mb-4">
            Instructions
          </h2>

          <div className="blur-sm select-none">
            <p>{prompt.instructions}</p>
          </div>

          <div className="mt-4">
            <Link href="/plans">
              <Button color="danger">
                Unlock Premium Content
              </Button>
            </Link>
          </div>
        </Card>
      )}
    </>
  );
};

export default PromptContent;