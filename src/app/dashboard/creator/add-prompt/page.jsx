"use client";

import { useState } from "react";
import { Input, Button, TextArea } from "@heroui/react";
import { Sparkles, UploadCloud, WandSparkles } from "lucide-react";
import { CreatePrompts } from "@/lib/actions/prompt";

import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

const AddPromptCreator = () => {
  const router = useRouter()
      const { data: session } = useSession();
  const selectClass =
    "w-full h-12 px-4 rounded-xl bg-content1 border border-default-200 text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer";

  const [form, setForm] = useState({
    title: "",
    tags: "",
    category: "",
    tool: "ChatGPT",
    difficulty: "Beginner",
    visibility: "Public",
    description: "",
    instructions: "",
    content: "",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "title",
      "tags",
      "category",
      "description",
      "instructions",
      "content",
    ];

    for (let field of requiredFields) {
      if (!form[field]?.trim()) {
        alert(`${field.toUpperCase()} is required!`);
        return;
      }
    }

    try {
      setLoading(true);

      const payload = {
        ...form,
        file,
        userId: session?.user?.id,
        
      };
      console.log(payload);

      const res = await CreatePrompts(payload);
      if (res?.insertedId) {
        alert('prompt posted success')
      }

      // reset form
      setForm({
        title: "",
        tags: "",
        category: "",
        tool: "ChatGPT",
        difficulty: "Beginner",
        visibility: "Public",
        description: "",
        instructions: "",
        content: "",
      });

      setFile(null);
      router.push("/dashboard/creator/my-prompt");
      return;
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-content1 to-background p-6 flex justify-center">
      <div className="w-full max-w-5xl rounded-3xl border border-default-200 bg-content1 shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="border-b border-divider px-8 py-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
            <Sparkles size={16} />
            AI Prompt Marketplace
          </div>

          <h1 className="text-4xl md:text-5xl font-black mt-4">
            Create Your Next <span className="text-primary">AI Prompt</span>
          </h1>

          <p className="text-default-500 mt-3">
            Share powerful prompts with creators around the world.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">

          {/* BASIC INFO */}
          <div className="rounded-2xl border border-default-200 bg-content2 p-6 space-y-6">

            <div className="grid md:grid-cols-2 gap-5">
              <Input
                label="Prompt Title *"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="AI Interview Question Generator..."
                variant="bordered"
              />

              <Input
                label="Tags *"
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="react, nextjs, ai"
                variant="bordered"
              />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

              <select
                name="category"
                className={selectClass}
                value={form.category}
                onChange={handleChange}
              >
                <option value="">Select category *</option>
                <option>Coding</option>
                <option>Writing</option>
                <option>Marketing</option>
                <option>SEO</option>
                <option>Business</option>
                <option>Education</option>
              </select>

              <select
                name="tool"
                className={selectClass}
                value={form.tool}
                onChange={handleChange}
              >
                <option>ChatGPT</option>
                <option>Gemini</option>
                <option>Claude</option>
                <option>Midjourney</option>
                <option>Copilot</option>
              </select>

              <select
                name="difficulty"
                className={selectClass}
                value={form.difficulty}
                onChange={handleChange}
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Pro</option>
              </select>

              <select
                name="visibility"
                className={selectClass}
                value={form.visibility}
                onChange={handleChange}
              >
                <option>Public</option>
                <option>Private</option>
              </select>

            </div>
          </div>

          {/* DETAILS */}
          <div className="rounded-2xl border border-default-200 bg-content2 p-6 space-y-5">

            <TextArea
              label="Prompt Description *"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              variant="bordered"
            />

            <TextArea
              label="Usage Instructions *"
              name="instructions"
              value={form.instructions}
              onChange={handleChange}
              rows={4}
              variant="bordered"
            />

            <TextArea
              label="Prompt Content *"
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={6}
              variant="bordered"
            />

          </div>

          {/* UPLOAD */}
          <div className="rounded-2xl border border-default-200 bg-content2 p-6">

            <label className="flex flex-col items-center justify-center h-44 rounded-2xl border-2 border-dashed border-primary/30 cursor-pointer hover:bg-primary/5 transition">

              <UploadCloud size={40} className="text-primary mb-3" />

              <h3 className="font-semibold">Upload Thumbnail</h3>

              <p className="text-default-500 text-sm">
                PNG, JPG, JPEG, WEBP
              </p>

              <input
                type="file"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>

          </div>

          {/* SUBMIT */}
          <Button
            type="submit"
            color="primary"
            size="lg"
            disabled={loading}
            className="w-full h-14 text-lg font-bold rounded-2xl shadow-lg shadow-primary/25"
          >
            <WandSparkles className="mr-2 h-5 w-5" />
            {loading ? "Publishing..." : "Publish Prompt"}
          </Button>

        </form>
      </div>
    </div>
  );
};

export default AddPromptCreator;