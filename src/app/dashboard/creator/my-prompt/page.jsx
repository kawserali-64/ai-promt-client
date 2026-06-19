"use client";

import { useEffect, useState } from "react";
import { getMyPrompts } from "@/lib/api/prompt";
import { Pencil, Trash2 } from "lucide-react";
import { useSession } from "@/lib/auth-client";

const MyPromptPage = () => {
  const { data: session } = useSession();

  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.id) return;

      const data = await getMyPrompts(session.user.id);
      setPrompts(data);
    };

    fetchData();
  }, [session]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Prompts</h2>

      <div className="overflow-x-auto rounded-xl border border-default-200 bg-content1 shadow-sm">
        <table className="w-full text-sm">

          <thead className="bg-content2 text-left">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Tool</th>
              <th className="p-4">Difficulty</th>
              <th className="p-4">Visibility</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {prompts?.length > 0 ? (
              prompts.map((item) => (
                <tr key={item._id} className="border-t border-default-200 hover:bg-content2 transition">
                  <td className="p-4 font-medium">{item.title}</td>
                  <td className="p-4">{item.category}</td>
                  <td className="p-4">{item.tool}</td>
                  <td className="p-4">{item.difficulty}</td>

                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.visibility === "Public"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}>
                      {item.visibility}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center justify-center gap-3">
                      <button className="p-2 rounded-lg hover:bg-blue-100 text-blue-600">
                        <Pencil size={18} />
                      </button>

                      <button className="p-2 rounded-lg hover:bg-red-100 text-red-600">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">
                  No prompts found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default MyPromptPage;