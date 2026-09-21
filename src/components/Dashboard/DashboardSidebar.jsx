"use client";

import {
  LayoutDashboard,
  PlusCircle,
  ListOrdered,
  Bookmark,
  MessageSquare,
  User as UserIcon,
  LogOut,
  Home,
  Users,
  CreditCard,
  AlertTriangle,
  Menu,
  X,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const DashboardSidebar = () => {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background scrolling when mobile sidebar is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isDrawerOpen]);

  const isDark = mounted && resolvedTheme === "dark";

  if (!mounted) {
    return (
      <aside className="hidden lg:flex flex-col w-64 h-screen shrink-0 border-r border-transparent" />
    );
  }

  if (isPending) {
    return (
      <aside
        className={`hidden lg:flex flex-col w-64 h-screen shrink-0 border-r p-6 space-y-6 transition-colors duration-300 ${
          isDark
            ? "bg-[#050505] border-white/5"
            : "bg-white border-zinc-200"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-xl animate-pulse ${
              isDark ? "bg-white/10" : "bg-zinc-200"
            }`}
          />
          <div
            className={`h-5 w-28 rounded-md animate-pulse ${
              isDark ? "bg-white/10" : "bg-zinc-200"
            }`}
          />
        </div>

        <div className="flex-1 space-y-3 py-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`h-12 w-full rounded-xl animate-pulse ${
                isDark ? "bg-white/5" : "bg-zinc-100"
              }`}
            />
          ))}
        </div>

        <div
          className={`h-12 w-full rounded-xl animate-pulse ${
            isDark ? "bg-white/5" : "bg-zinc-100"
          }`}
        />
      </aside>
    );
  }

  const currentRole = session?.user?.role?.toLowerCase() || "user";

  const dashboardItems = {
    User: [
      {
        icon: UserIcon,
        label: "Profile",
        href: "/dashboard/user/profile",
      },
      {
        icon: PlusCircle,
        label: "Add Prompt",
        href: "/dashboard/user/add-prompt",
      },
      {
        icon: ListOrdered,
        label: "My Prompts",
        href: "/dashboard/user/my-prompts",
      },
      {
        icon: Bookmark,
        label: "Saved Prompts",
        href: "/dashboard/user/saved-prompts",
      },
      {
        icon: MessageSquare,
        label: "My Reviews",
        href: "/dashboard/user/my-reviews",
      },
    ],

    Creator: [
      {
        icon: LayoutDashboard,
        label: "Creator Dashboard Home",
        href: "/dashboard/creator/creatorHome",
      },
      {
        icon: PlusCircle,
        label: "Add Prompt",
        href: "/dashboard/creator/add-prompt",
      },
      {
        icon: ListOrdered,
        label: "My Prompts",
        href: "/dashboard/creator/my-prompt",
      },
    ],

    Admin: [
      {
        icon: Home,
        label: "Admin Analytics",
        href: "/dashboard/admin",
      },
      {
        icon: Users,
        label: "All Users",
        href: "/dashboard/admin/all-user",
      },
      {
        icon: ListOrdered,
        label: "All Prompts",
        href: "/dashboard/admin/all-prompt",
      },
      {
        icon: CreditCard,
        label: "All Payments",
        href: "/dashboard/admin/all-payments",
      },
      {
        icon: AlertTriangle,
        label: "Reported Prompts",
        href: "/dashboard/admin/report-prompt",
      },
    ],
  };

  let menuItems = dashboardItems.User;

  if (currentRole === "creator") {
    menuItems = dashboardItems.Creator;
  } else if (currentRole === "admin") {
    menuItems = dashboardItems.Admin;
  }

  const desktopSidebarClass = isDark
    ? "bg-[#050505] text-white border-white/5"
    : "bg-white text-zinc-900 border-zinc-200";

  const desktopLogoClass = isDark ? "!text-white" : "!text-violet-600";

  const getDesktopItemClass = (isActive) => {
    if (isActive) {
      return isDark
        ? "bg-violet-600/10 text-violet-400 border border-violet-500/20"
        : "bg-violet-600/10 text-violet-600 border border-violet-500/20";
    }

    return isDark
      ? "text-zinc-400 hover:text-white hover:bg-white/5"
      : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100";
  };

  const desktopBorderClass = isDark ? "border-white/5" : "border-zinc-200";

  const desktopBackLinkClass = isDark
    ? "text-zinc-400 hover:text-white"
    : "text-zinc-600 hover:text-zinc-900";

  const NavContent = ({ onLinkClick, isMobile }) => (
    <div
      className={`flex flex-col h-full ${
        isDark ? "bg-[#050505]" : "bg-white"
      }`}
    >
      <div
        className={`p-6 border-b flex items-center justify-between ${
          isDark ? "border-white/5" : "border-zinc-200"
        }`}
      >
        <Link
          href="/"
          onClick={onLinkClick}
          className={`text-xl font-bold flex items-center gap-2 ${
            isDark ? "!text-white" : "!text-violet-600"
          }`}
        >
          <span className="bg-gradient-to-tr from-violet-600 to-indigo-500 p-1.5 rounded-lg text-white">
            AI
          </span>
          AI Prompts
        </Link>

        {/* Close Button only for mobile */}
        {isMobile && (
          <button
            onClick={onLinkClick}
            className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onLinkClick}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${getDesktopItemClass(
                isActive
              )}`}
            >
              <item.icon className="size-5" />
              {item.label}
            </Link>
          );
        })}
      </div>

      <div
        className={`p-4 border-t ${
          isDark ? "border-white/5" : "border-zinc-200"
        }`}
      >
        <Link
          href="/"
          onClick={onLinkClick}
          className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${desktopBackLinkClass}`}
        >
          <LogOut className="size-5 rotate-180" />
          Back to Home
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col w-64 h-screen overflow-y-auto shrink-0 border-r transition-colors duration-300 ${desktopSidebarClass}`}
      >
        <NavContent />
      </aside>

      {/* Mobile Menu Button */}
     {/* Mobile Menu Button */}
      <Button
        onClick={() => setIsDrawerOpen(true)}
        className="lg:hidden fixed top-24 right-0 z-40 shadow-xl rounded-l-2xl rounded-r-none border-y border-l transition-all p-3"
        style={{
          backgroundColor: resolvedTheme === "dark" ? "#18181b" : "#ffffff",
          color: resolvedTheme === "dark" ? "#ffffff" : "#18181b",
          borderColor: resolvedTheme === "dark" ? "#3f3f46" : "#cbd5e1",
        }}
        isIconOnly
      >
        <Menu className="size-6" />
      </Button>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Mobile Sidebar (Slide from Right) */}
      <div
        className={`fixed inset-y-0 right-0 z-[60] w-[280px] max-w-[80vw] transform transition-transform duration-300 ease-in-out lg:hidden shadow-2xl ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <NavContent onLinkClick={() => setIsDrawerOpen(false)} isMobile={true} />
      </div>
    </>
  );
};

export default DashboardSidebar;