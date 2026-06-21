"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Button, Spinner } from "@heroui/react";
import { getBookmarks, toggleBookmark } from "@/lib/api/prompt";
import { useSession } from "@/lib/auth-client";

const SavedPromptsPage = () => {
  const router = useRouter();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: session, isPending } = useSession();

  const userId = session?.user?.id;

  const fetchSaved = async () => {
    try {
      const res = await getBookmarks(userId);

      console.log("Bookmarks Response:", res);

      setData(Array.isArray(res) ? res : []);
    } catch (error) {
      console.log(error);
      alert("Failed to load saved prompts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isPending && userId) {
      fetchSaved();
    }

    if (!isPending && !userId) {
      setLoading(false);
    }
  }, [userId, isPending]);

  const handleRemove = async (promptId) => {
    try {
      await toggleBookmark({
        userId,
        promptId,
      });

      setData((prev) =>
        prev.filter((item) => item.prompt?._id !== promptId)
      );

      alert("Removed from saved");
    } catch (error) {
      console.log(error);
      alert("Failed to remove bookmark");
    }
  };

  if (isPending || loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Saved Prompts
      </h1>

      {data.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <h2 className="text-xl font-semibold">
            No Saved Prompts
          </h2>
          <p>Start bookmarking prompts to see them here.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {data.map((item) => (
            <Card key={item._id} className="p-4">
              <h2 className="text-xl font-semibold">
                {item.prompt?.title}
              </h2>

              <p className="text-sm text-gray-500">
                {item.prompt?.category} • {item.prompt?.tool}
              </p>

              <p className="text-sm mt-1">
                Copy Count: {item.prompt?.copyCount || 0}
              </p>

              <div className="flex gap-2 mt-4">
                <Button
                  color="primary"
                  onClick={() =>
                    router.push(`/all-promt/${item.prompt?._id}`)
                  }
                >
                  View Details
                </Button>

                <Button
                  color="danger"
                  variant="flat"
                  onClick={() =>
                    handleRemove(item.prompt?._id)
                  }
                >
                  Remove
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedPromptsPage;