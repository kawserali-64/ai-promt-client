"use client";
import {
  LayoutDashboard, PlusCircle, ListOrdered, Bookmark,
  MessageSquare, User as UserIcon, LogOut, Home, Users, CreditCard, AlertTriangle
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";

const DashboardSidebar = () => {
  const pathname = usePathname();
  const { data: session,isPending } = useSession();

  if(isPending){
    return <div>loding......</div>
  }
  const currentRole = session?.user?.role?.toLowerCase() || "user";

  const dashboardItems = {
    User: [
      { icon: UserIcon, label: "Profile", href: "/dashboard/user/profile" },
      { icon: PlusCircle, label: "Add Prompt", href: "/dashboard/user/add-prompt" },
      { icon: ListOrdered, label: "My Prompts", href: "/dashboard/user/my-prompts" },
      { icon: Bookmark, label: "Saved Prompts", href: "/dashboard/user/saved-prompts" },
      { icon: MessageSquare, label: "My Reviews", href: "/dashboard/user/my-reviews" },
      
    ],
    Creator: [
      { icon: LayoutDashboard, label: "Creator Dashboard Home", href: "/dashboard/creator/creatorHome" },
      { icon: PlusCircle, label: "Add Prompt", href: "/dashboard/creator/add-prompt" },
      { icon: ListOrdered, label: "My Prompts", href: "/dashboard/creator/my-prompt" },
    ],
    Admin: [
      { icon: Home, label: "Admin Analytics", href: "/dashboard/admin" },
      { icon: Users, label: "All Users", href: "/dashboard/admin/all-user" },
      { icon: ListOrdered, label: "All Prompts", href: "/dashboard/admin/all-prompt" },
      { icon: CreditCard, label: "All Payments", href: "/dashboard/admin/all-payments" },
      { icon: AlertTriangle, label: "Reported Prompts", href: "/dashboard/admin/report-prompt" },
    ]
  };

  let menuItems = dashboardItems.User; // ডিফল্ট ইউজার মেনু

  if (currentRole === "creator") {
    menuItems = dashboardItems.Creator;
  } else if (currentRole === "admin") {
    menuItems = dashboardItems.Admin;
  }

  return (
    <div className="flex flex-col h-full bg-[#09090b] border-r border-white/5">
      <div className="p-6">
        <Link href="/" className="text-xl font-bold text-white flex items-center gap-2">
          <span className="bg-gradient-to-tr from-violet-600 to-indigo-500 p-1.5 rounded-lg text-white">AI</span>
          AIverse
        </Link>
      </div>

      <div className="flex-1 px-3 py-2 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-violet-600/10 text-violet-400 border border-violet-500/20"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className="size-5" />
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/5">
        <Link href="/" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white text-sm font-medium transition-colors">
          <LogOut className="size-5 rotate-180" /> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default DashboardSidebar;