"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Button, Spinner } from "@heroui/react";
import { getBookmarks, toggleBookmark } from "@/lib/api/prompt";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { Trash2, ExternalLink, Bookmark, Package } from "lucide-react";

const SavedPromptsPage = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, isPending } = useSession();
  const userId = session?.user?.id;

  const fetchSaved = async () => {
    try {
      setLoading(true);
      const res = await getBookmarks(userId);
      setData(Array.isArray(res) ? res : res?.data || []);
    } catch (error) {
      toast.error("Failed to load saved prompts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isPending && userId) fetchSaved();
    if (!isPending && !userId) setLoading(false);
  }, [userId, isPending]);

  const handleRemove = (promptId) => {
    const backup = data;
    setData((prev) => prev.filter((item) => item.prompt?._id !== promptId));
    toast.success("Removed from saved library");

    toggleBookmark({ userId, promptId }).catch(() => {
      setData(backup);
      toast.error("Action failed. Reverting...");
    });
  };

  if (isPending || loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#050505]">
        <Spinner size="lg" color="secondary" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 min-h-screen bg-[#050505] text-white">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-black tracking-tight mb-2">Saved Library</h1>
          <p className="text-zinc-500">Curated prompts you've saved for later use.</p>
        </div>

        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-[#0a0a0a] rounded-[32px] border border-white/5">
            <div className="w-20 h-20 bg-violet-500/10 rounded-full flex items-center justify-center mb-6">
              <Bookmark size={32} className="text-violet-500" />
            </div>
            <h2 className="text-xl font-bold">No Saved Prompts</h2>
            <p className="text-zinc-500 mt-2">Explore and bookmark your favorites.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.map((item) => (
              <Card
                key={item._id}
                className="p-6 bg-[#0a0a0a] border border-white/5 hover:border-violet-500/30 transition-all rounded-[24px] shadow-none"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-lg font-bold truncate">{item.prompt?.title}</h2>
                    <span className="text-[11px] uppercase tracking-wider font-bold text-violet-400 mt-1 block">
                      {item.prompt?.category} • {item.prompt?.tool}
                    </span>
                  </div>
                  <div className="bg-white/5 px-2 py-1 rounded-lg text-[10px] font-bold text-zinc-400">
                    {item.prompt?.copyCount || 0} COPIES
                  </div>
                </div>

                <div className="flex gap-3 mt-auto pt-4 border-t border-white/5">
                  <Button
                    variant="flat"
                    className="flex-1 bg-white text-black font-bold hover:bg-zinc-200"
                    onClick={() => router.push(`/all-promt/${item.prompt?._id}`)}
                    startContent={<ExternalLink size={16} />}
                  >
                    View
                  </Button>
                  <Button
                    variant="bordered"
                    className="border-white/10 hover:border-red-500/50 hover:text-red-500"
                    onClick={() => handleRemove(item.prompt?._id)}
                    startContent={<Trash2 size={16} />}
                  >
                    Remove
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedPromptsPage;