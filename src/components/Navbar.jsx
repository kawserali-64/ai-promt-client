"use client";

import { useState } from "react";
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
} from "lucide-react";

import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";

function NavbarPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const router = useRouter();

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

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#09090b]/60 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo Area */}
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2 text-zinc-400 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 shadow-[0_0_20px_-5px_rgba(124,58,237,0.5)]">
                <Terminal className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Prompt<span className="text-violet-500">Forge</span>
              </span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full px-2 py-1.5 shadow-sm">
            {[
              { href: "/", label: "Home", icon: Home },
              { href: "/all-promt", label: "All Prompts", icon: Compass },

              // ✅ ONLY FIX HERE
              ...(!isAdmin
                ? [{ href: "/plans", label: "Plans", icon: Crown }]
                : []),

              ...(user
                ? [{ href: "/dashboard", label: "Dashboard", icon: LayoutDashboard }]
                : []),
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-zinc-400 hover:text-white transition-colors hover:bg-white/10 rounded-full"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>

          {/* User/Auth Area */}
          <div className="flex items-center gap-4">
            {isPending ? (
              <div className="h-9 w-9 animate-pulse rounded-full bg-zinc-800" />
            ) : user ? (
              <div className="flex items-center gap-3">
                <Image
                  src={user.image}
                  alt={user.name}
                  width={70}
                  height={70}
                  className="w-8 h-8 rounded-full ring-2 ring-violet-500/20"
                />
                <Button
                  isIconOnly
                  variant="flat"
                  size="sm"
                  onClick={handleNavbarLogout}
                  className="bg-zinc-800 text-zinc-400 hover:text-red-400 hover:bg-red-500/10"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/auth/signin">
                  <Button variant="light" className="text-zinc-400">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-white text-black font-semibold hover:bg-zinc-200">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#09090b]/95 backdrop-blur-xl p-4 space-y-2">
          {[
            { href: "/", label: "Home", icon: Home },
            { href: "/all-prompts", label: "All Prompts", icon: Compass },

            // ✅ SAME FIX HERE
            ...(!isAdmin
              ? [{ href: "/plans", label: "Plans", icon: Crown }]
              : []),

            ...(user
              ? [{ href: "/dashboard", label: "Dashboard", icon: LayoutDashboard }]
              : []),
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 p-3 text-zinc-300 hover:bg-white/5 rounded-xl"
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}

          {!user && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link href="/auth/signin">
                <Button fullWidth variant="flat">Login</Button>
              </Link>
              <Link href="/auth/signup">
                <Button fullWidth className="bg-violet-600 text-white">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default NavbarPage;