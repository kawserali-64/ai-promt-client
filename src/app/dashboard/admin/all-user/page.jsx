"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Trash2, UserCog, Crown } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";

const AllAdminUserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const { resolvedTheme } = useTheme();

  // Client hydration check
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  const fetchUsers = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`
      );

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
          prev.map((u) => (u._id === id ? { ...u, role } : u))
        );
      } else {
        toast.error("Role update failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Role update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

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

        setUsers((prev) => prev.filter((u) => u._id !== id));
      } else {
        toast.error("Delete failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  // 1. Hydration Mismatch & Theme Flash প্রতিরোধ
  if (!mounted) {
    return <div className="min-h-screen w-full opacity-0" />;
  }

  // 2. Loading State
  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
          isDark ? "bg-[#050505]" : "bg-zinc-50"
        }`}
      >
        <div className="flex flex-col items-center justify-center">
          {/* LOADING ICON */}
          <div
            className={`relative flex items-center justify-center w-16 h-16 rounded-2xl border ${
              isDark
                ? "bg-[#0a0a0a] border-white/10"
                : "bg-white border-zinc-200 shadow-sm"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full border-4 border-t-transparent animate-spin ${
                isDark
                  ? "border-violet-500 border-t-transparent"
                  : "border-violet-600 border-t-transparent"
              }`}
            />
          </div>

          {/* LOADING TEXT */}
          <h2
            className={`mt-5 text-lg font-semibold ${
              isDark ? "text-white" : "text-zinc-900"
            }`}
          >
            Loading Users
          </h2>

          <p
            className={`mt-1 text-sm ${
              isDark ? "text-zinc-500" : "text-zinc-500"
            }`}
          >
            Preparing user management...
          </p>

          {/* DOTS */}
          <div className="flex gap-1.5 mt-4">
            <span
              className={`w-1.5 h-1.5 rounded-full animate-bounce ${
                isDark ? "bg-violet-500" : "bg-violet-600"
              }`}
            />
            <span
              className={`w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:150ms] ${
                isDark ? "bg-violet-500" : "bg-violet-600"
              }`}
            />
            <span
              className={`w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:300ms] ${
                isDark ? "bg-violet-500" : "bg-violet-600"
              }`}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`space-y-8 p-6 min-h-screen transition-colors duration-300 ${
        isDark ? "bg-[#050505]" : "bg-zinc-50"
      }`}
    >
      {/* HEADER */}
      <div>
        <h1
          className={`text-3xl font-bold tracking-tight ${
            isDark ? "text-white" : "text-violet-600"
          }`}
        >
          User Role & Accounts Management
        </h1>

        <p
          className={`mt-2 ${
            isDark ? "text-zinc-400" : "text-zinc-500"
          }`}
        >
          Review accounts, modify role scopes, and delete users.
        </p>
      </div>

      {/* USERS TABLE */}
      <div
        className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${
          isDark
            ? "bg-[#0a0a0a] border-white/5 shadow-2xl"
            : "bg-white border-zinc-200 shadow-sm"
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr
                className={`border-b ${
                  isDark
                    ? "border-white/5 bg-white/[0.02]"
                    : "border-zinc-100 bg-zinc-50/70"
                }`}
              >
                <th
                  className={`px-6 py-4 text-xs font-bold uppercase tracking-wider ${
                    isDark ? "text-zinc-400" : "text-zinc-500"
                  }`}
                >
                  Profile Details
                </th>

                <th
                  className={`px-6 py-4 text-xs font-bold uppercase tracking-wider ${
                    isDark ? "text-zinc-400" : "text-zinc-500"
                  }`}
                >
                  Email Address
                </th>

                <th
                  className={`px-6 py-4 text-xs font-bold uppercase tracking-wider ${
                    isDark ? "text-zinc-400" : "text-zinc-500"
                  }`}
                >
                  Subscription
                </th>

                <th
                  className={`px-6 py-4 text-xs font-bold uppercase tracking-wider ${
                    isDark ? "text-zinc-400" : "text-zinc-500"
                  }`}
                >
                  Role Level
                </th>

                <th
                  className={`px-6 py-4 text-xs font-bold uppercase tracking-wider ${
                    isDark ? "text-zinc-400" : "text-zinc-500"
                  }`}
                >
                  Registered Date
                </th>

                <th
                  className={`px-6 py-4 text-xs font-bold uppercase tracking-wider text-right ${
                    isDark ? "text-zinc-400" : "text-zinc-500"
                  }`}
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody
              className={`divide-y ${
                isDark ? "divide-white/5" : "divide-zinc-100"
              }`}
            >
              {users.map((user) => (
                <tr
                  key={user._id}
                  className={`transition-colors duration-200 ${
                    isDark ? "hover:bg-white/[0.02]" : "hover:bg-zinc-50"
                  }`}
                >
                  {/* PROFILE */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt={user.name || "User"}
                          width={42}
                          height={42}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                            isDark
                              ? "bg-violet-500/10 text-violet-400"
                              : "bg-violet-100 text-violet-600"
                          }`}
                        >
                          {user.name
                            ?.charAt(0)
                            ?.toUpperCase() || "U"}
                        </div>
                      )}

                      <div>
                        <p
                          className={`font-semibold ${
                            isDark ? "text-white" : "text-zinc-900"
                          }`}
                        >
                          {user.name || "Unknown User"}
                        </p>

                        <p
                          className={`text-xs mt-1 ${
                            isDark ? "text-zinc-500" : "text-zinc-400"
                          }`}
                        >
                          User Account
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* EMAIL */}
                  <td className="px-6 py-5">
                    <span
                      className={`text-sm ${
                        isDark ? "text-zinc-300" : "text-zinc-600"
                      }`}
                    >
                      {user.email}
                    </span>
                  </td>

                  {/* SUBSCRIPTION */}
                  <td className="px-6 py-5">
                    {user.plan === "pro" ? (
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                          isDark
                            ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                            : "bg-yellow-50 text-yellow-600 border border-yellow-200"
                        }`}
                      >
                        <Crown size={13} />
                        Premium
                      </span>
                    ) : (
                      <span
                        className={`inline-flex px-3 py-1.5 rounded-full text-xs font-semibold ${
                          isDark
                            ? "bg-zinc-800 text-zinc-400"
                            : "bg-zinc-100 text-zinc-500"
                        }`}
                      >
                        Free
                      </span>
                    )}
                  </td>

                  {/* ROLE */}
                  <td className="px-6 py-5">
                    <select
                      value={user.role || "user"}
                      onChange={(e) =>
                        handleRoleChange(
                          user._id,
                          e.target.value
                        )
                      }
                      className={`px-3 py-2 rounded-lg border text-sm font-medium outline-none cursor-pointer ${
                        isDark
                          ? "bg-[#111111] border-white/10 text-white"
                          : "bg-white border-zinc-200 text-zinc-900"
                      }`}
                    >
                      <option value="user">User</option>
                      <option value="creator">Creator</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>

                  {/* DATE */}
                  <td className="px-6 py-5">
                    <span
                      className={`text-sm ${
                        isDark ? "text-zinc-400" : "text-zinc-500"
                      }`}
                    >
                      {user.createdAt
                        ? new Date(
                            user.createdAt
                          ).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </td>

                  {/* DELETE */}
                  <td className="px-6 py-5 text-right">
                    <button
                      onClick={() =>
                        handleDelete(user._id)
                      }
                      className={`inline-flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
                        isDark
                          ? "text-red-400 hover:bg-red-500/10"
                          : "text-red-500 hover:bg-red-50"
                      }`}
                      title="Delete user"
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
          <div className="flex flex-col items-center justify-center py-20">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                isDark ? "bg-white/5 text-zinc-500" : "bg-zinc-100 text-zinc-400"
              }`}
            >
              <UserCog size={28} />
            </div>

            <h3
              className={`text-lg font-semibold ${
                isDark ? "text-white" : "text-zinc-900"
              }`}
            >
              No Users Found
            </h3>

            <p
              className={`mt-1 text-sm ${
                isDark ? "text-zinc-500" : "text-zinc-400"
              }`}
            >
              There are no user accounts to display.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAdminUserPage;