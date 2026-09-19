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

const DashboardSidebar = () => {
const pathname = usePathname();
const { data: session, isPending } = useSession();
const { resolvedTheme } = useTheme();

if (isPending) {
return ( <aside className="hidden lg:flex flex-col w-64 h-screen shrink-0 border-r border-zinc-200 dark:border-white/5 bg-white dark:bg-[#050505]">
{/* Logo Skeleton */} <div className="p-6 border-b border-zinc-200 dark:border-white/5"> <div className="flex items-center gap-2"> <div className="w-9 h-9 rounded-lg bg-zinc-200 dark:bg-white/10 animate-pulse" />

        <div className="h-5 w-28 rounded-md bg-zinc-200 dark:bg-white/10 animate-pulse" />
      </div>
    </div>

    {/* Menu Skeleton */}
    <div className="flex-1 px-3 py-5 space-y-3">
      {[1, 2, 3, 4, 5].map((item) => (
        <div
          key={item}
          className="flex items-center gap-3 px-4 py-3 rounded-xl"
        >
          <div className="w-5 h-5 rounded-md bg-zinc-200 dark:bg-white/10 animate-pulse" />

          <div
            className={`h-4 rounded-md bg-zinc-200 dark:bg-white/10 animate-pulse ${
              item === 1
                ? "w-32"
                : item === 2
                ? "w-24"
                : item === 3
                ? "w-28"
                : item === 4
                ? "w-32"
                : "w-20"
            }`}
          />
        </div>
      ))}
    </div>

    {/* Bottom Skeleton */}
    <div className="p-4 border-t border-zinc-200 dark:border-white/5">
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="w-5 h-5 rounded-md bg-zinc-200 dark:bg-white/10 animate-pulse" />

        <div className="h-4 w-24 rounded-md bg-zinc-200 dark:bg-white/10 animate-pulse" />
      </div>
    </div>
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

const isDark = resolvedTheme === "dark";

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


};

const desktopBorderClass = isDark
? "border-white/5"
: "border-zinc-200";

const desktopBackLinkClass = isDark
? "text-zinc-400 hover:text-white"
: "text-zinc-600 hover:text-zinc-900";

const NavContent = () => ( <div className="flex flex-col h-full bg-white dark:bg-[#050505]"> <div className="p-6 border-b border-zinc-200 dark:border-white/5"> <Link
       href="/"
       className="text-xl font-bold flex items-center gap-2 !text-violet-600 dark:!text-white"
     > <span className="bg-gradient-to-tr from-violet-600 to-indigo-500 p-1.5 rounded-lg text-white">
AI </span>
AI Prompts </Link> </div>

  <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
    {menuItems.map((item) => {
      const isActive = pathname === item.href;

      return (
        <Link
          key={item.label}
          href={item.href}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
            isActive
              ? "bg-violet-600/10 text-violet-600 dark:text-violet-400 border border-violet-500/20"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5"
          }`}
        >
          <item.icon className="size-5" />
          {item.label}
        </Link>
      );
    })}
  </div>

  <div className="p-4 border-t border-zinc-200 dark:border-white/5">
    <Link
      href="/"
      className="flex items-center gap-3 px-4 py-3 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white text-sm font-medium transition-colors"
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
className={`hidden lg:flex flex-col w-64 h-screen overflow-y-auto shrink-0 border-r transition-colors duration-200 ${desktopSidebarClass}`}
>
<div className={`p-6 border-b ${desktopBorderClass}`}>
<Link
href="/"
className={`text-xl font-bold flex items-center gap-2 ${desktopLogoClass}`}
> <span className="bg-gradient-to-tr from-violet-600 to-indigo-500 p-1.5 rounded-lg text-white">
AI </span>
AI Prompts </Link> </div>


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
      className="lg:hidden m-4 bg-zinc-100 text-zinc-900 border border-zinc-200 dark:bg-white/5 dark:text-white dark:border-white/10"
      variant="flat"
      isIconOnly
    >
      <Menu className="size-5" />
    </Button>

    <Drawer.Backdrop>
      <Drawer.Content placement="left">
        <Drawer.Dialog className="bg-white text-zinc-900 dark:bg-[#09090b] dark:text-white">
          <Drawer.Header className="border-b border-zinc-200 dark:border-white/5">
            <Drawer.Heading className="text-zinc-900 dark:text-white">
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
