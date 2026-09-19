"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { Sparkles, UploadCloud, WandSparkles } from "lucide-react";
import { CreatePrompts } from "@/lib/actions/prompt";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import { toast } from "react-toastify";

const PromptFormPage = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [mounted, setMounted] = useState(false);
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
    const [previewUrl, setPreviewUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!file) {
            setPreviewUrl("");
            return;
        }
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

    const tagOptions = [
        "SEO", "Marketing", "Writing", "Coding", "Business", "Education", "AI", "Prompt Engineering",
    ];

    const inputClass =
        "w-full h-12 px-4 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 !text-zinc-900 dark:!text-white shadow-sm focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all outline-none text-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-500";

    const selectClass =
        "w-full h-12 px-4 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 !text-zinc-900 dark:!text-white shadow-sm focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all appearance-none cursor-pointer text-sm outline-none";

    const textareaClass =
        "w-full p-4 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 !text-zinc-900 dark:!text-white shadow-sm focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all outline-none text-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-500 resize-none";

    const containerStyle = "w-full max-w-5xl rounded-[32px] shadow-xl overflow-hidden";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const uploadImageToImgBB = async (fileToUpload) => {
        try {
            setUploading(true);

            if (!fileToUpload) return null;

            if (fileToUpload.size > 5 * 1024 * 1024) {
                toast.error("Max 5MB allowed");
                return null;
            }

            const formData = new FormData();
            formData.append("image", fileToUpload);

            const res = await fetch(
                `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
                { method: "POST", body: formData }
            );

            const data = await res.json();

            if (!data?.success) {
                toast.error("Image upload failed");
                return null;
            }

            return data.data.url;
        } catch (err) {
            toast.error(err.message || "Upload failed");
            return null;
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const required = ["title", "tags", "category", "description", "content"];

            for (let field of required) {
                if (!form[field]?.trim()) {
                    toast.warning(`${field} is required`);
                    setLoading(false);
                    return;
                }
            }

            let uploadedImage = "";

            if (file) {
                const imgUrl = await uploadImageToImgBB(file);
                if (!imgUrl) {
                    setLoading(false);
                    return;
                }
                uploadedImage = imgUrl;
            }

            const payload = {
                ...form,
                image: uploadedImage,
                userId: session?.user?.id || "",
                role: session?.user?.role || "User",
                isPremium: session?.user?.plan === "pro"
            };

            const res = await CreatePrompts(payload);

            if (!res?.success) {
                toast.error(res?.message || "Failed to create prompt");
                setLoading(false);
                return;
            }

            toast.success("Prompt created successfully!");

            setForm({
                title: "",
                tags: "",
                category: "",
                tool: "ChatGPT",
                difficulty: "Beginner",
                visibility: "Public",
                description: "",
                instructions: "",
                content: ""
            });

            setFile(null);
            setPreviewUrl("");

            const role = session?.user?.role;

            router.push(
                role === "Creator"
                    ? "/dashboard/creator/my-prompt"
                    : "/dashboard/user/my-prompts"
            );
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    if (!mounted) {
        return <div className="min-h-screen w-full opacity-0" />;
    }

    return (
        <div className="min-h-screen p-4 md:p-6 flex justify-center text-zinc-900 transition-colors duration-300">
            <div className={containerStyle}>
                <div className="border-b border-zinc-200 dark:border-zinc-800 px-6 md:px-8 py-8 bg-zinc-50/50 dark:bg-zinc-950">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 text-xs font-bold uppercase tracking-widest border border-violet-500/20">
                        <Sparkles size={14} />
                        AI Prompt Marketplace
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black mt-4 !text-zinc-900 dark:!text-white tracking-tight">
                        Create Your Next{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400">
                            AI Prompt
                        </span>
                    </h1>

                    <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm">
                        Share powerful prompts with creators worldwide.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="p-4 md:p-8 space-y-8 bg-white dark:bg-zinc-950"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                                Prompt Title *
                            </label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Enter prompt title..."
                                value={form.title}
                                onChange={handleChange}
                                className={inputClass}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                                Tags *
                            </label>
                            <select
                                name="tags"
                                value={form.tags}
                                onChange={handleChange}
                                className={selectClass}
                            >
                                <option
                                    value=""
                                    className="bg-white dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500"
                                >
                                    Select Tag *
                                </option>

                                {tagOptions.map((tag) => (
                                    <option
                                        key={tag}
                                        value={tag}
                                        className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                                    >
                                        {tag}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900 p-4 md:p-6 space-y-6">
                        <div className="flex items-center gap-2 text-violet-600">
                            <Sparkles size={18} />
                            <h3 className="text-lg font-semibold !text-violet-600 dark:!text-white">
                                Prompt Configuration
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            <select
                                name="category"
                                className={selectClass}
                                value={form.category}
                                onChange={handleChange}
                            >
                                <option
                                    value=""
                                    className="bg-white dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500"
                                >
                                    Category *
                                </option>
                                <option className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white">Coding</option>
                                <option className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white">Writing</option>
                                <option className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white">Marketing</option>
                                <option className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white">SEO</option>
                                <option className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white">Business</option>
                                <option className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white">Education</option>
                            </select>

                            <select
                                name="tool"
                                className={selectClass}
                                value={form.tool}
                                onChange={handleChange}
                            >
                                <option className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white">ChatGPT</option>
                                <option className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white">Gemini</option>
                                <option className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white">Claude</option>
                                <option className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white">Midjourney</option>
                                <option className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white">Copilot</option>
                            </select>

                            <select
                                name="difficulty"
                                className={selectClass}
                                value={form.difficulty}
                                onChange={handleChange}
                            >
                                <option className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white">Beginner</option>
                                <option className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white">Intermediate</option>
                                <option className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white">Pro</option>
                            </select>

                            <select
                                name="visibility"
                                className={selectClass}
                                value={form.visibility}
                                onChange={handleChange}
                            >
                                <option className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white">Public</option>
                                <option className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white">Private</option>
                            </select>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900 p-4 md:p-6 space-y-6">
                        <div className="flex items-center gap-2 text-violet-600">
                            <WandSparkles size={18} />
                            <h3 className="text-lg font-semibold !text-violet-600 dark:!text-white">
                                Prompt Details
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                                    Description *
                                </label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Description..."
                                    className={textareaClass}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                                    Instructions
                                </label>
                                <textarea
                                    name="instructions"
                                    value={form.instructions}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Instructions..."
                                    className={textareaClass}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                                    Prompt Content *
                                </label>
                                <textarea
                                    name="content"
                                    value={form.content}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Prompt Content..."
                                    className={textareaClass}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900 p-4 md:p-6">
                        <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl cursor-pointer hover:border-violet-500 transition bg-white dark:bg-zinc-800">
                            <UploadCloud size={40} className="text-violet-600 mb-2" />
                            <p className="font-semibold text-zinc-900 dark:text-white">
                                Upload Thumbnail
                            </p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                PNG, JPG, WEBP (Max 5MB)
                            </p>
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                            />
                        </label>

                        {previewUrl && (
                            <div className="mt-4 relative w-full h-48 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700">
                                <Image
                                    src={previewUrl}
                                    alt="preview"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-14 text-lg font-bold rounded-2xl bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-600/20 transition-all"
                        disabled={loading || uploading}
                    >
                        {loading ? (
                            "Publishing..."
                        ) : (
                            <>
                                <WandSparkles className="mr-2 h-5 w-5" />
                                Publish Prompt
                            </>
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default PromptFormPage;