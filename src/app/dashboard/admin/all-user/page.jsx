"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    Trash2,
    ShieldCheck,
    UserCog,
    Crown,
} from "lucide-react";
import Image from "next/image";

const AllAdminUserPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // ==========================
    // FETCH USERS
    // ==========================
    const fetchUsers = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`
            );

            if (!res.ok) {
                throw new Error("Failed to fetch users");
            }

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

    // ==========================
    // CHANGE ROLE
    // ==========================
    const handleRoleChange = async (id, role) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}/role`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ role }),
                }
            );

            const data = await res.json();

            if (data.success) {
                toast.success("Role updated");

                setUsers((prev) =>
                    prev.map((user) =>
                        user._id === id ? { ...user, role } : user
                    )
                );
            } else {
                toast.error("Role update failed");
            }
        } catch (error) {
            console.error(error);
            toast.error("Role update failed");
        }
    };

    // ==========================
    // DELETE USER
    // ==========================
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) return;

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await res.json();

            if (data.success) {
                toast.success("User deleted");

                setUsers((prev) =>
                    prev.filter((user) => user._id !== id)
                );
            } else {
                toast.error("Delete failed");
            }
        } catch (error) {
            console.error(error);
            toast.error("Delete failed");
        }
    };

    // ==========================
    // LOADING
    // ==========================
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[500px]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="space-y-8 p-6">
            {/* HEADER */}
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">
                    User Role & Accounts Management
                </h1>
                <p className="text-slate-400 mt-2">
                    Review accounts, modify role scopes, and delete users.
                </p>
            </div>

            {/* TABLE CARD */}
            <div className="bg-[#0f172a] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-800 text-slate-500 text-xs uppercase tracking-widest">
                                <th className="px-6 py-5 font-semibold">Profile Details</th>
                                <th className="px-6 py-5 font-semibold">Email Address</th>
                                <th className="px-6 py-5 font-semibold">Subscription</th>
                                <th className="px-6 py-5 font-semibold">Role Level</th>
                                <th className="px-6 py-5 font-semibold">Registered Date</th>
                                <th className="px-6 py-5 font-semibold text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                            {users.map((user) => (
                                <tr
                                    key={user._id}
                                    className="hover:bg-[#162033]/40 transition-colors duration-200"
                                >
                                    {/* USER */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            {user?.image ? (
                                                <Image
                                                    src={user.image}
                                                    alt={user.name}
                                                    width={60}
                                                    height={60}
                                                    className="w-10 h-10 rounded-full object-cover border border-slate-700"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                                                    {user?.name?.charAt(0)?.toUpperCase()}
                                                </div>
                                            )}
                                            <div>
                                                <h3 className="font-semibold text-slate-200 text-sm">
                                                    {user?.name}
                                                </h3>
                                                <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                                                    ID: {user?._id?.slice(-6)}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* EMAIL */}
                                    <td className="px-6 py-4 text-slate-400 text-sm">
                                        {user?.email}
                                    </td>

                                    {/* PLAN */}
                                    <td className="px-6 py-4">
                                        {user.plan === "pro" ? (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold tracking-wider uppercase">
                                                <Crown size={12} />
                                                Premium
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-700/30 text-slate-400 border border-slate-600/30 text-[10px] font-bold tracking-wider uppercase">
                                                Free
                                            </span>
                                        )}
                                    </td>

                                    {/* ROLE */}
                                    <td className="px-6 py-4">
                                        <select
                                            value={user.role || "User"}
                                            onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                            className="bg-[#1e293b] border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-2 outline-none focus:border-blue-500 transition w-28 cursor-pointer"
                                        >
                                            <option value="User">User</option>
                                            <option value="Creator">Creator</option>
                                            <option value="Admin">Admin</option>
                                        </select>
                                    </td>

                                    {/* DATE */}
                                    <td className="px-6 py-4 text-slate-400 text-sm">
                                        <div className="flex items-center gap-2">
                                            <span className="text-slate-600">📅</span>
                                            {user.createdAt
                                                ? new Date(user.createdAt).toLocaleDateString()
                                                : "N/A"}
                                        </div>
                                    </td>

                                    {/* ACTION */}
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="text-slate-500 hover:text-red-400 transition-colors p-2"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* EMPTY STATE */}
                {users.length === 0 && (
                    <div className="py-20 text-center">
                        <UserCog size={48} className="mx-auto text-slate-700 mb-4" />
                        <h3 className="text-lg font-semibold text-slate-300">No Users Found</h3>
                        <p className="text-slate-500 text-sm mt-1">No registered users available.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllAdminUserPage;