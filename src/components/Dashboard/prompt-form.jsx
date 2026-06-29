"use client";

import { useState } from "react";
import { Input, Button, TextArea } from "@heroui/react";
import { Sparkles, UploadCloud, WandSparkles } from "lucide-react";
import { CreatePrompts } from "@/lib/actions/prompt";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import { toast } from "react-toastify"; // Toastify imported

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

    const tagOptions = [
        "SEO", "Marketing", "Writing", "Coding", "Business", "Education", "AI", "Prompt Engineering",
    ];

    // Premium styling classes
    const selectClass = "w-full h-12 px-4 rounded-xl bg-[#0a0a0a] border border-white/10 text-white shadow-sm focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all appearance-none cursor-pointer";
    const containerStyle = "w-full max-w-5xl rounded-[32px] border border-white/5 bg-[#050505] shadow-2xl overflow-hidden";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const uploadImageToImgBB = async (file) => {
        try {
            setUploading(true);
            if (!file) return null;
            if (file.size > 5 * 1024 * 1024) {
                toast.error("Max 5MB allowed");
                return null;
            }
            const formData = new FormData();
            formData.append("image", file);
            const res = await fetch(
                `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
                { method: "POST", body: formData }
            );
            const data = await res.json();
            if (!data?.success) {
                toast.error("Image upload failed");
                return null;
            }
            const url = data.data.url;
            setImageUrl(url);
            return url;
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
                uploadedImage = await uploadImageToImgBB(file);
                if (!uploadedImage) {
                    setLoading(false);
                    return;
                }
            }
            const payload = {
                ...form,
                image: uploadedImage,
                userId: session?.user?.id || "",
                role: session?.user?.role || "User",
                isPremium: session?.user?.plan === 'pro'
            };
            const res = await CreatePrompts(payload);
            if (!res?.success) {
                toast.error(res?.message || "Failed to create prompt");
                setLoading(false);
                return;
            }
            toast.success("Prompt created successfully!");
            setForm({ title: "", tags: "", category: "", tool: "ChatGPT", difficulty: "Beginner", visibility: "Public", description: "", instructions: "", content: "" });
            setFile(null);
            setImageUrl("");
            const role = session?.user?.role;
            router.push(role === "Creator" ? "/dashboard/creator/my-prompt" : "/dashboard/user/my-prompts");
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] p-4 md:p-6 flex justify-center text-white">
            <div className={containerStyle}>
                <div className="border-b border-white/10 px-6 md:px-8 py-8 bg-[#0a0a0a]">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 text-violet-400 text-xs font-bold uppercase tracking-widest">
                        <Sparkles size={14} /> AI Prompt Marketplace
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black mt-4 text-white">
                        Create Your Next <span className="text-violet-500">AI Prompt</span>
                    </h1>
                    <p className="text-zinc-500 mt-3">Share powerful prompts with creators worldwide.</p>
                </div>

                <form onSubmit={handleSubmit} className="p-4 md:p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Prompt Title *" name="title" value={form.title} onChange={handleChange} variant="bordered" className="bg-[#0a0a0a] rounded-xl" />
                        <select name="tags" value={form.tags} onChange={handleChange} className={selectClass}>
                            <option value="">Select Tag *</option>
                            {tagOptions.map((tag) => <option key={tag} value={tag}>{tag}</option>)}
                        </select>
                    </div>

                    <div className="rounded-2xl border border-white/5 bg-[#0a0a0a] p-4 md:p-6 space-y-6">
                        <div className="flex items-center gap-2 text-violet-400">
                            <Sparkles size={18} />
                            <h3 className="text-lg font-semibold text-white">Prompt Configuration</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            <select name="category" className={selectClass} value={form.category} onChange={handleChange}>
                                <option value="">Category *</option>
                                <option>Coding</option><option>Writing</option><option>Marketing</option>
                                <option>SEO</option><option>Business</option><option>Education</option>
                            </select>
                            <select name="tool" className={selectClass} value={form.tool} onChange={handleChange}>
                                <option>ChatGPT</option><option>Gemini</option><option>Claude</option>
                                <option>Midjourney</option><option>Copilot</option>
                            </select>
                            <select name="difficulty" className={selectClass} value={form.difficulty} onChange={handleChange}>
                                <option>Beginner</option><option>Intermediate</option><option>Pro</option>
                            </select>
                            <select name="visibility" className={selectClass} value={form.visibility} onChange={handleChange}>
                                <option>Public</option><option>Private</option>
                            </select>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-white/5 bg-[#0a0a0a] p-4 md:p-6 space-y-6">
                        <div className="flex items-center gap-2 text-violet-400">
                            <WandSparkles size={18} />
                            <h3 className="text-lg font-semibold text-white">Prompt Details</h3>
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                            <TextArea name="description" value={form.description} onChange={handleChange} rows={4} variant="bordered" placeholder="Description" className="bg-[#0a0a0a]" />
                            <TextArea name="instructions" value={form.instructions} onChange={handleChange} rows={4} variant="bordered" placeholder="Instructions" className="bg-[#0a0a0a]" />
                            <TextArea name="content" value={form.content} onChange={handleChange} rows={4} variant="bordered" placeholder="Prompt Content" className="bg-[#0a0a0a]" />
                        </div>
                    </div>

                    <div className="rounded-2xl border border-white/5 bg-[#0a0a0a] p-4 md:p-6">
                        <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:border-violet-500 transition">
                            <UploadCloud size={40} className="text-violet-500 mb-2" />
                            <p className="font-semibold text-white">Upload Thumbnail</p>
                            <p className="text-xs text-zinc-500">PNG, JPG, WEBP (Max 5MB)</p>
                            <input type="file" hidden accept="image/*" onChange={(e) => setFile(e.target.files?.[0])} />
                        </label>
                        {imageUrl && (
                            <div className="mt-4 relative w-full h-48 rounded-xl overflow-hidden border border-white/10">
                                <Image src={imageUrl} alt="preview" fill className="object-cover" />
                            </div>
                        )}
                    </div>

                    <Button type="submit" className="w-full h-14 text-lg font-bold rounded-2xl bg-violet-600 hover:bg-violet-700 text-white" disabled={loading || uploading}>
                        {loading ? "Publishing..." : <><WandSparkles className="mr-2 h-5 w-5" /> Publish Prompt</>}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default PromptFormPage;