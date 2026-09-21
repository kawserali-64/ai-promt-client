"use client";

import { useState, useEffect } from "react";
import { Link, Button } from "@heroui/react";
import {
  Menu,
  X,
  Terminal,
  LogOut,
  Compass,
  Home,
  LayoutDashboard,
  Crown,
  Wand2,
} from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

function NavbarPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const router = useRouter();
  const pathname = usePathname();

  // Prevent background scrolling when sidebar is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const handleNavbarLogout = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            setIsMenuOpen(false);
            router.push("/auth/signin");
            router.refresh();
          },
        },
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const isAdmin = user?.role?.toLowerCase() === "admin";
  const showAITools = user && !isAdmin;

  const violetGlow = "shadow-[0_0_25px_5px_rgba(124,58,237,0.5)]";

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="sticky top-0 z-40 w-full border-b border-white/20 bg-white/70 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.03)] dark:border-white/10 dark:bg-[#02010c]/80 dark:backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo Area */}
            <div className="flex items-center gap-4">
              {/* Hamburger Button - Mobile Only */}
              <button
                className="p-2 -ml-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white md:hidden"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>

              <Link href="/" className="group flex items-center gap-2">
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 ${violetGlow}`}>
                  <Terminal className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  Ai<span className="text-violet-500">Prompt</span>
                </span>
              </Link>
            </div>

            {/* Desktop Links */}
            <div className="hidden items-center rounded-full border border-white/40 bg-white/50 px-2 py-1.5 shadow-sm backdrop-blur-md dark:border-white/5 dark:bg-white/5 md:flex">
              {[
                { href: "/", label: "Home", icon: Home },
                { href: "/all-promt", label: "All Prompts", icon: Compass },
                ...(showAITools ? [{ href: "/ai-tools", label: "AI Tools", icon: Wand2 }] : []),
                ...(!isAdmin ? [{ href: "/plans", label: "Plans", icon: Crown }] : []),
                ...(user ? [{ href: "/dashboard", label: "Dashboard", icon: LayoutDashboard }] : []),
              ].map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-violet-600 text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]"
                        : "text-zinc-600 hover:bg-white/80 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
                    }`}
                  >
                    <item.icon className={`h-4 w-4 ${isActive ? "text-white" : ""}`} />
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* User/Auth Area */}
            <div className="flex items-center gap-3">
              <ThemeToggle />

              {isPending ? (
                <div className="h-9 w-9 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
              ) : user ? (
                <div className="flex items-center gap-3">
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={70}
                    height={70}
                    className="h-8 w-8 rounded-full ring-2 ring-violet-500/30 object-cover"
                  />
                  <Button
                    isIconOnly
                    variant="flat"
                    size="sm"
                    onClick={handleNavbarLogout}
                    className="bg-white/60 text-zinc-600 hover:bg-red-500/10 hover:text-red-500 backdrop-blur-sm dark:bg-zinc-800 dark:text-zinc-400 dark:hover:text-red-400 md:flex hidden"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="hidden items-center gap-2 sm:flex">
                  <Link href="/auth/signin">
                    <Button variant="light" className="text-zinc-600 dark:text-zinc-400">
                      Login
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button className={`bg-violet-600 font-semibold text-white hover:bg-violet-700 ${violetGlow} dark:bg-violet-600 dark:hover:bg-violet-700`}>
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Sidebar (Left Slide) */}
      <div
        className={`fixed inset-y-0 left-0 z-[60] flex h-[100dvh] w-[280px] max-w-[80vw] flex-col border-r border-zinc-200 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out dark:border-white/10 dark:bg-[#02010c] md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header (Logo & Close Button) */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-zinc-100 px-4 dark:border-white/10">
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
            <div className={`flex h-8 w-8 items-center justify-center rounded-xl bg-violet-600 ${violetGlow}`}>
              <Terminal className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
              Ai<span className="text-violet-500">Prompt</span>
            </span>
          </Link>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <div className="flex flex-col space-y-1.5">
            {[
              { href: "/", label: "Home", icon: Home },
              { href: "/all-promt", label: "All Prompts", icon: Compass },
              ...(showAITools ? [{ href: "/ai-tools", label: "AI Tools", icon: Wand2 }] : []),
              ...(!isAdmin ? [{ href: "/plans", label: "Plans", icon: Crown }] : []),
              ...(user ? [{ href: "/dashboard", label: "Dashboard", icon: LayoutDashboard }] : []),
            ].map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-violet-600 text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]"
                      : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white"
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${isActive ? "text-white" : "text-violet-500"}`} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Sidebar Footer (Auth/Logout Buttons) */}
        <div className="shrink-0 border-t border-zinc-100 p-4 dark:border-white/10">
          {!user ? (
            <div className="flex flex-col gap-3">
              <Link href="/auth/signin" className="w-full" onClick={() => setIsMenuOpen(false)}>
                <Button fullWidth variant="flat" className="bg-zinc-100 font-medium dark:bg-white/5 dark:text-zinc-300">
                  Login
                </Button>
              </Link>
              <Link href="/auth/signup" className="w-full" onClick={() => setIsMenuOpen(false)}>
                <Button fullWidth className="bg-violet-600 font-medium text-white shadow-md hover:bg-violet-700">
                  Get Started
                </Button>
              </Link>
            </div>
          ) : (
            <Button
              fullWidth
              variant="flat"
              color="danger"
              onClick={handleNavbarLogout}
              className="flex items-center gap-2 bg-red-500/10 text-red-600 hover:bg-red-500/20 dark:text-red-400"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default NavbarPage;