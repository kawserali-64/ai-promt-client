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
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Button, Drawer } from "@heroui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const DashboardSidebar = () => {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const desktopLogoClass = isDark
    ? "!text-white"
    : "!text-violet-600";

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

  const desktopBorderClass = isDark
    ? "border-white/5"
    : "border-zinc-200";

  const desktopBackLinkClass = isDark
    ? "text-zinc-400 hover:text-white"
    : "text-zinc-600 hover:text-zinc-900";

  const NavContent = () => (
    <div
      className={`flex flex-col h-full ${
        isDark ? "bg-[#050505]" : "bg-white"
      }`}
    >
      <div
        className={`p-6 border-b ${
          isDark ? "border-white/5" : "border-zinc-200"
        }`}
      >
        <Link
          href="/"
          className={`text-xl font-bold flex items-center gap-2 ${
            isDark ? "!text-white" : "!text-violet-600"
          }`}
        >
          <span className="bg-gradient-to-tr from-violet-600 to-indigo-500 p-1.5 rounded-lg text-white">
            AI
          </span>
          AI Prompts
        </Link>
      </div>

      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
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
        <div className={`p-6 border-b ${desktopBorderClass}`}>
          <Link
            href="/"
            className={`text-xl font-bold flex items-center gap-2 ${desktopLogoClass}`}
          >
            <span className="bg-gradient-to-tr from-violet-600 to-indigo-500 p-1.5 rounded-lg text-white">
              AI
            </span>
            AI Prompts
          </Link>
        </div>

        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
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

        <div className={`p-4 border-t ${desktopBorderClass}`}>
          <Link
            href="/"
            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${desktopBackLinkClass}`}
          >
            <LogOut className="size-5 rotate-180" />
            Back to Home
          </Link>
        </div>
      </aside>

      {/* Mobile Drawer */}
      <Drawer>
        <Button
          className="lg:hidden fixed top-24 right-0 z-50 shadow-lg rounded-l-xl rounded-r-none border-y border-l border-zinc-200 bg-white/90 backdrop-blur-md text-zinc-900 dark:bg-[#18181b]/90 dark:text-white dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
          variant="flat"
          isIconOnly
        >
          <Menu className="size-5" />
        </Button>

        <Drawer.Backdrop>
          <Drawer.Content placement="right">
            <Drawer.Dialog
              className={
                isDark
                  ? "bg-[#09090b] text-white"
                  : "bg-white text-zinc-900"
              }
            >
              <Drawer.Header
                className={
                  isDark
                    ? "border-b border-white/5"
                    : "border-b border-zinc-200"
                }
              >
                <Drawer.Heading
                  className={
                    isDark ? "text-white" : "text-zinc-900"
                  }
                >
                  Menu
                </Drawer.Heading>

                <Drawer.CloseTrigger />
              </Drawer.Header>

              <Drawer.Body className="p-0">
                <NavContent />
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
};

export default DashboardSidebar;