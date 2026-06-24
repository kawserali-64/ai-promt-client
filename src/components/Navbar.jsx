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

function NavbarPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const user = session?.user;
  console.log(user);
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

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#09090b]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* ================= LEFT ================= */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              className="inline-flex items-center justify-center rounded-xl p-2 text-zinc-400 hover:bg-white/5 hover:text-white transition-all md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <Link href="/" className="flex items-center gap-2.5 font-bold text-white group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 shadow-lg">
                <Terminal className="h-4 w-4" />
              </div>

              <span className="text-lg font-black">
                Prompt<span className="text-violet-500">Forge</span>
              </span>
            </Link>
          </div>

          {/* ================= CENTER ================= */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <ul className="flex items-center gap-1 bg-white/[0.02] border border-white/5 rounded-full p-1.5">

              {/* Home */}
              <li>
                <Link href="/" className="flex items-center gap-1.5 px-4 py-1.5 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-full">
                  <Home className="h-4 w-4" /> Home
                </Link>
              </li>

              {/* All Prompts */}
              <li>
                <Link href="/all-promt" className="flex items-center gap-1.5 px-4 py-1.5 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-full">
                  <Compass className="h-4 w-4" /> All Prompts
                </Link>
              </li>

              {/* Plans ⭐ NEW */}
              <li>
                <Link href="/plans" className="flex items-center gap-1.5 px-4 py-1.5 text-sm text-zinc-400 hover:text-violet-300 hover:bg-white/5 rounded-full">
                  <Crown className="h-4 w-4 text-violet-400" /> Plans
                </Link>
              </li>

              {/* Dashboard */}
              {user && (
                <li>
                  <Link href="/dashboard" className="flex items-center gap-1.5 px-4 py-1.5 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-full">
                    <LayoutDashboard className="h-4 w-4" /> Dashboard
                  </Link>
                </li>
              )}

            </ul>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="flex items-center gap-3">

            {isPending ? (
              <div className="h-8 w-8 animate-pulse rounded-full bg-zinc-800" />
            ) : user ? (
              <div className="flex items-center gap-3">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-7 h-7 rounded-full ring-1 ring-violet-500/20"
                />

                <p className="text-xs text-zinc-300 hidden sm:block">
                  {user.name}
                </p>

                <Button
                  isIconOnly
                  variant="light"
                  onClick={handleNavbarLogout}
                  className="text-zinc-400 hover:text-red-400"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/auth/signin">
                  <Button variant="light">Login</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-violet-600 text-white">Register</Button>
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/5 bg-[#09090b]/95">

          <ul className="flex flex-col p-3 gap-1">

            <li>
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 text-zinc-400 hover:bg-white/5 rounded-xl">
                <Home className="h-4 w-4" /> Home
              </Link>
            </li>

            <li>
              <Link href="/all-prompts" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 text-zinc-400 hover:bg-white/5 rounded-xl">
                <Compass className="h-4 w-4" /> All Prompts
              </Link>
            </li>

            {/* Plans ⭐ NEW */}
            <li>
              <Link href="/plans" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 text-zinc-400 hover:bg-white/5 rounded-xl">
                <Crown className="h-4 w-4 text-violet-400" /> Plans
              </Link>
            </li>

            {user && (
              <li>
                <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 text-zinc-400 hover:bg-white/5 rounded-xl">
                  <LayoutDashboard className="h-4 w-4" /> Dashboard
                </Link>
              </li>
            )}

            <div className="mt-2 pt-2 border-t border-white/5">

              {user ? (
                <Button
                  onClick={handleNavbarLogout}
                  className="w-full text-red-400 bg-red-500/5 hover:bg-red-500/10"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </Button>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link href="/auth/signin">
                    <Button className="w-full">Login</Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button className="w-full bg-violet-600 text-white">
                      Register
                    </Button>
                  </Link>
                </div>
              )}

            </div>

          </ul>
        </div>
      )}

    </nav>
  );
}

export default NavbarPage;