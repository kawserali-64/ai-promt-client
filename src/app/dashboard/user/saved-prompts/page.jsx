"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Button, Spinner } from "@heroui/react";
import { getBookmarks, toggleBookmark } from "@/lib/api/prompt";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";

const SavedPromptsPage = () => {
  const router = useRouter();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: session, isPending } = useSession();

  const userId = session?.user?.id;

  // ================= FETCH BOOKMARKS =================
  const fetchSaved = async () => {
    try {
      setLoading(true);

      const res = await getBookmarks(userId);

      setData(Array.isArray(res) ? res : res?.data || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load saved prompts");
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

  // ================= REMOVE BOOKMARK (OPTIMISTIC UI) =================
  const handleRemove = (promptId) => {
    // backup (optional rollback)
    const backup = data;

    // instant UI update
    setData((prev) =>
      prev.filter((item) => item.prompt?._id !== promptId)
    );

    // instant toast
    toast.success("Removed from saved prompts");

    // background sync (no UI blocking)
    toggleBookmark({
      userId,
      promptId,
    }).catch((error) => {
      console.log(error);

      // rollback if failed
      setData(backup);

      toast.error("Failed to remove. Changes reverted.");
    });
  };

  // ================= LOADING =================
  if (isPending || loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-black via-[#0b0b1a] to-black text-white">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-6">
        Saved Prompts
      </h1>

      {/* EMPTY STATE */}
      {data.length === 0 ? (
        <div className="text-center py-16 text-zinc-400">
          <h2 className="text-xl font-semibold text-white">
            No Saved Prompts
          </h2>
          <p className="mt-2">
            Start bookmarking prompts to see them here.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">

          {data.map((item) => (
            <Card
              key={item._id}
              className="p-5 bg-white/5 border border-white/10 backdrop-blur-xl"
            >
              <h2 className="text-xl font-semibold text-white">
                {item.prompt?.title}
              </h2>

              <p className="text-sm text-zinc-400 mt-1">
                {item.prompt?.category} • {item.prompt?.tool}
              </p>

              <p className="text-sm text-zinc-500 mt-1">
                Copy Count: {item.prompt?.copyCount || 0}
              </p>

              <div className="flex gap-3 mt-5">

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