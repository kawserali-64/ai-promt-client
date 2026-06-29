"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    Trash2,
    UserCog,
    Crown,
} from "lucide-react";
import Image from "next/image";

const AllAdminUserPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`);
            if (!res.ok) throw new Error("Failed to fetch users");
            const data = await res.json();
            setUsers(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleRoleChange = async (id, role) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}/role`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role }),
            });
            const data = await res.json();
            if (data.success) {
                toast.success("Role updated");
                setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, role } : u)));
            } else {
                toast.error("Role update failed");
            }
        } catch (error) {
            toast.error("Role update failed");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) {
                toast.success("User deleted");
                setUsers((prev) => prev.filter((u) => u._id !== id));
            } else {
                toast.error("Delete failed");
            }
        } catch (error) {
            toast.error("Delete failed");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[500px]">
                <span className="loading loading-spinner loading-lg text-indigo-500"></span>
            </div>
        );
    }

    return (
        <div className="space-y-8 p-6 bg-[#050505] min-h-screen">
            {/* HEADER */}
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">User Role & Accounts Management</h1>
                <p className="text-zinc-500 mt-2">Review accounts, modify role scopes, and delete users.</p>
            </div>

            {/* TABLE CARD */}
            <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 text-zinc-500 text-[10px] uppercase tracking-widest">
                                <th className="px-6 py-5 font-semibold">Profile Details</th>
                                <th className="px-6 py-5 font-semibold">Email Address</th>
                                <th className="px-6 py-5 font-semibold">Subscription</th>
                                <th className="px-6 py-5 font-semibold">Role Level</th>
                                <th className="px-6 py-5 font-semibold">Registered Date</th>
                                <th className="px-6 py-5 font-semibold text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-white/[0.02] transition-colors duration-200">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            {user?.image ? (
                                                <Image src={user.image} alt={user.name} width={40} height={40} className="rounded-full border border-white/10" />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
                                                    {user?.name?.charAt(0)?.toUpperCase()}
                                                </div>
                                            )}
                                            <div>
                                                <h3 className="font-medium text-zinc-200 text-sm">{user?.name}</h3>
                                                <p className="text-[10px] text-zinc-600 font-mono mt-0.5">ID: {user?._id?.slice(-6)}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-zinc-400 text-sm">{user?.email}</td>
                                    <td className="px-6 py-4">
                                        {user.plan === "pro" ? (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase">
                                                <Crown size={10} /> Premium
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/5 text-zinc-500 border border-white/10 text-[10px] font-bold uppercase">
                                                Free
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={user.role || "User"}
                                            onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                            className="bg-[#0f0f0f] border border-white/10 text-zinc-300 text-xs rounded-lg px-3 py-2 outline-none focus:border-indigo-500 transition cursor-pointer"
                                        >
                                            <option value="User">User</option>
                                            <option value="Creator">Creator</option>
                                            <option value="Admin">Admin</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 text-zinc-500 text-sm">
                                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="text-zinc-600 hover:text-red-400 transition-colors p-2"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {users.length === 0 && (
                    <div className="py-20 text-center">
                        <UserCog size={48} className="mx-auto text-zinc-800 mb-4" />
                        <h3 className="text-lg font-semibold text-zinc-300">No Users Found</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllAdminUserPage;