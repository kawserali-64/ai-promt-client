"use client";
import { useState } from "react";
import { Link, Button} from "@heroui/react";
import { Menu, X, Terminal, LogOut, Compass, Home, LayoutDashboard } from "lucide-react"; 

import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

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

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#09090b]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* ================= LEFT SECTION ================= */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              className="inline-flex items-center justify-center rounded-xl p-2 text-zinc-400 hover:bg-white/5 hover:text-white transition-all duration-200 focus:outline-none md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <Link href="/" className="flex items-center gap-2.5 font-bold text-white group">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 text-white shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-transform group-hover:scale-105">
                <Terminal className="h-4 w-4" />
              </div>
              <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-lg font-black tracking-tight text-transparent">
                Prompt<span className="text-violet-500 font-extrabold">Forge</span>
              </span>
            </Link>
          </div>

          {/* ================= CENTER SECTION ================= */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <ul className="flex items-center gap-1 bg-white/[0.02] border border-white/5 rounded-full p-1.5 backdrop-blur-md">
              <li>
                <Link href="/" className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium text-zinc-400 hover:text-white transition-all hover:bg-white/5">
                  <Home className="h-4 w-4" /> Home
                </Link>
              </li>
              <li>
                <Link href="/all-prompts" className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium text-zinc-400 hover:text-white transition-all hover:bg-white/5">
                  <Compass className="h-4 w-4" /> All Prompts
                </Link>
              </li>
              {/* ড্যাশবোর্ড লিঙ্ক (লগড ইন ইউজারদের জন্য) */}
              {user && (
                <li>
                  <Link href="/dashboard" className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium text-zinc-400 hover:text-white transition-all hover:bg-white/5">
                    <LayoutDashboard className="h-4 w-4" /> Dashboard
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* ================= RIGHT SECTION ================= */}
          <div className="flex items-center gap-3 h-full">
            {isPending ? (
              <div className="h-8 w-8 animate-pulse rounded-full bg-zinc-800" />
            ) : user ? (
              <div className="flex items-center gap-2 sm:gap-3.5">
                <div className="relative flex items-center justify-center bg-white/[0.02] border border-white/5 rounded-full p-1">
                  <img src={user.image} alt={user.name} className="w-7 h-7 rounded-full object-cover ring-1 ring-violet-500/20" />
                </div>
                <p className="text-xs font-medium text-zinc-300 hidden sm:block">{user.name}</p>
                <Button isIconOnly variant="light" onClick={handleNavbarLogout} className="hidden md:inline-flex w-9 h-9 min-w-9 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-red-500/5 border border-transparent hover:border-red-500/10">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2.5">
                <Link href="/auth/signin"><Button variant="light" size="sm" className="text-zinc-300">Login</Button></Link>
                <Link href="/auth/signup"><Button size="sm" className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold">Register</Button></Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {isMenuOpen && (
        <div className="border-t border-white/5 bg-[#09090b]/95 backdrop-blur-2xl md:hidden">
          <ul className="flex flex-col gap-1 p-3">
            <li><Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-zinc-400 hover:bg-white/5 w-full"><Home className="h-4 w-4" /> Home</Link></li>
            <li><Link href="/all-prompts" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-zinc-400 hover:bg-white/5 w-full"><Compass className="h-4 w-4" /> All Prompts</Link></li>
            {user && (
                <li><Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-zinc-400 hover:bg-white/5 w-full"><LayoutDashboard className="h-4 w-4" /> Dashboard</Link></li>
            )}
            
            <div className="mt-2 pt-2 border-t border-white/5">
              {user ? (
                <Button onClick={handleNavbarLogout} className="w-full justify-start gap-3 rounded-xl px-4 py-6 text-sm font-medium text-red-400 hover:bg-red-900 bg-red-500/5">
                  <LogOut className="h-4 w-4" /> Log Out ({user.name})
                </Button>
              ) : (
                <div className="flex flex-col gap-2 p-1">
                  <Link href="/auth/signin" className="w-full"><Button variant="bordered" className="w-full py-5 rounded-xl">Login</Button></Link>
                  <Link href="/auth/signup" className="w-full"><Button className="w-full py-5 rounded-xl bg-violet-600 text-white">Register</Button></Link>
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