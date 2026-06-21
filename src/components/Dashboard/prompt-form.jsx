"use client";

import { useState } from "react";
import { Input, Button, TextArea, } from "@heroui/react";
import { Sparkles, UploadCloud, WandSparkles } from "lucide-react";
import { CreatePrompts } from "@/lib/actions/prompt";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";

const PromptFormPage = () => {
    const router = useRouter();
    const { data: session } = useSession();

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
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    const selectClass =
        "w-full h-12 px-4 rounded-xl bg-content1 border border-default-200 text-foreground shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // ======================
    // IMAGE UPLOAD
    // ======================
    const uploadImageToImgBB = async (file) => {
        try {
            setUploading(true);

            if (!file) return null;

            if (file.size > 5 * 1024 * 1024) {
                alert("Max 5MB allowed");
                return null;
            }

            const formData = new FormData();
            formData.append("image", file);

            const res = await fetch(
                `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await res.json();

            if (!data?.success) {
                alert("Image upload failed");
                return null;
            }

            const url = data.data.url;
            setImageUrl(url);

            return url;
        } catch (err) {
            alert(err.message || "Upload failed");
            return null;
        } finally {
            setUploading(false);
        }
    };

    // ======================
    // SUBMIT
    // ======================
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const required = ["title", "tags", "category", "description", "content"];

            for (let field of required) {
                if (!form[field]?.trim()) {
                    alert(`${field} is required`);
                    setLoading(false);
                    return;
                }
            }

            let uploadedImage = "";

            if (file) {
                uploadedImage = await uploadImageToImgBB(file);
                if (!uploadedImage) {
                    setLoading(false);
                    return;
                }
            }

            // 🔥 FIXED: isPremium bug removed
            const payload = {
                ...form,
                image: uploadedImage,
                userId: session?.user?.id || "",
                role: session?.user?.role || "user",
                isPremium: session?.user?.isPremium || false,
            };

            console.log("SESSION USER =>", session?.user);
            console.log("PROMPT PAYLOAD =>", payload);

            const res = await CreatePrompts(payload);


            if (!res?.success) {
                alert(res?.message || "Failed to create prompt");
                setLoading(false);
                return;
            }

            alert("Prompt created successfully!");

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
            setImageUrl("");

            router.push("/dashboard/creator/my-prompt");
        } catch (error) {
            console.log(error);
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
                        Share powerful prompts with creators worldwide.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">

                    {/* TITLE + TAGS */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <Input
                            label="Prompt Title *"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            variant="bordered"
                        />

                        <Input
                            label="Tags *"
                            name="tags"
                            value={form.tags}
                            onChange={handleChange}
                            variant="bordered"
                        />
                    </div>

                    {/* CONFIG */}
                    <div className="rounded-2xl border border-default-200 bg-content2 p-6 space-y-6">
                        <div className="flex items-center gap-2">
                            <Sparkles className="text-primary" size={18} />
                            <h3 className="text-lg font-semibold">Prompt Configuration</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                            <select name="category" className={selectClass} value={form.category} onChange={handleChange}>
                                <option value="">Category *</option>
                                <option>Coding</option>
                                <option>Writing</option>
                                <option>Marketing</option>
                                <option>SEO</option>
                                <option>Business</option>
                                <option>Education</option>
                            </select>

                            <select name="tool" className={selectClass} value={form.tool} onChange={handleChange}>
                                <option>ChatGPT</option>
                                <option>Gemini</option>
                                <option>Claude</option>
                                <option>Midjourney</option>
                                <option>Copilot</option>
                            </select>

                            <select name="difficulty" className={selectClass} value={form.difficulty} onChange={handleChange}>
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Pro</option>
                            </select>

                            <select name="visibility" className={selectClass} value={form.visibility} onChange={handleChange}>
                                <option>Public</option>
                                <option>Private</option>
                            </select>
                        </div>
                    </div>

                    {/* DETAILS */}
                    <div className="rounded-2xl border border-default-200 bg-content2 p-6 space-y-6">
                        <div className="flex items-center gap-2">
                            <WandSparkles className="text-primary" size={18} />
                            <h3 className="text-lg font-semibold">Prompt Details</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            <TextArea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                rows={8}
                                variant="bordered"
                                placeholder="Description"
                            />

                            <TextArea
                                name="instructions"
                                value={form.instructions}
                                onChange={handleChange}
                                rows={8}
                                variant="bordered"
                                placeholder="Instructions"
                            />

                            <TextArea
                                name="content"
                                value={form.content}
                                onChange={handleChange}
                                rows={8}
                                variant="bordered"
                                placeholder="Prompt Content"
                            />
                        </div>
                    </div>

                    {/* IMAGE */}
                    <div className="rounded-2xl border border-default-200 bg-content2 p-6">

                        <label className="flex flex-col items-center justify-center h-44 border-2 border-dashed border-primary/30 rounded-2xl cursor-pointer hover:bg-primary/5 transition">

                            <UploadCloud size={40} className="text-primary mb-2" />
                            <p className="font-semibold">Upload Thumbnail</p>
                            <p className="text-sm text-default-500">
                                PNG, JPG, WEBP (Max 5MB)
                            </p>

                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={(e) => setFile(e.target.files?.[0])}
                            />
                        </label>

                        {imageUrl && (
                            <div className="mt-4 relative w-full h-48 rounded-xl overflow-hidden border">
                                <Image
                                    src={imageUrl}
                                    alt="preview"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                    </div>

                    {/* SUBMIT */}
                    <Button
                        type="submit"
                        color="primary"
                        size="lg"
                        disabled={loading || uploading}
                        className="w-full h-14 text-lg font-bold rounded-2xl"
                    >
                        <WandSparkles className="mr-2 h-5 w-5" />
                        {loading ? "Publishing..." : "Publish Prompt"}
                    </Button>

                </form>
            </div>
        </div>
    );
};

export default PromptFormPage;