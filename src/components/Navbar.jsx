"use client";
import { useState } from "react";
import { 
  Link, 
  Button, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem, 
  Avatar 
} from "@heroui/react";
import { Menu, X, Terminal, LogOut, LayoutDashboard, Compass, Home, ChevronDown } from "lucide-react";

function NavbarPage({ user, handleLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#09090b]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* ================= LEFT SECTION (Logo + Mobile Trigger) ================= */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* মোবাইল ও ট্যাবলেট হ্যামবার্গার (md:hidden) */}
            <button
              className="inline-flex items-center justify-center rounded-xl p-2 text-zinc-400 hover:bg-white/5 hover:text-white transition-all duration-200 focus:outline-none md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            
            {/* আল্ট্রা-প্রিমিয়াম টেক লোগো */}
            <Link href="/" className="flex items-center gap-2.5 font-bold text-white group">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 text-white shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-transform group-hover:scale-105">
                <Terminal className="h-4 w-4" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 blur-sm opacity-50 -z-10 group-hover:opacity-70 transition-opacity"></div>
              </div>
              <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-lg font-black tracking-tight text-transparent">
                Prompt<span className="text-violet-500 font-extrabold">Forge</span>
              </span>
            </Link>
          </div>

          {/* ================= CENTER SECTION (Desktop Menu) ================= */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <ul className="flex items-center gap-1 bg-white/[0.02] border border-white/5 rounded-full p-1.5 backdrop-blur-md">
              <li>
                <Link 
                  href="/" 
                  className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium text-zinc-400 hover:text-white transition-all duration-200 hover:bg-white/5"
                >
                  <Home className="h-4 w-4" /> Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/all-prompts" 
                  className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium text-zinc-400 hover:text-white transition-all duration-200 hover:bg-white/5"
                >
                  <Compass className="h-4 w-4" /> All Prompts
                </Link>
              </li>
            </ul>
          </div>

          {/* ================= RIGHT SECTION (User Action & Auth) ================= */}
          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              <Dropdown placement="bottom-end" className="bg-[#0c0c0e] border border-white/5 shadow-2xl rounded-2xl">
                <DropdownTrigger>
                  <button className="flex items-center gap-2 outline-none group bg-white/[0.02] border border-white/5 hover:border-white/10 rounded-full pl-1.5 pr-2.5 py-1.5 transition-all active:scale-98">
                    <Avatar
                      isBordered
                      className="w-7 h-7 text-xs ring-2 ring-violet-500/20"
                      color="secondary"
                      name={user?.displayName || user?.name}
                      src={user?.photoURL}
                    />
                    <ChevronDown className="h-3.5 w-3.5 text-zinc-500 group-hover:text-zinc-300 transition-colors hidden sm:block" />
                  </button>
                </DropdownTrigger>
                
                <DropdownMenu aria-label="Profile Actions" variant="flat" className="p-1.5">
                  <DropdownItem key="profile" className="h-14 gap-2 border-b border-white/5 rounded-xl" textValue="Profile Info">
                    <p className="font-semibold text-[11px] text-zinc-500">Signed in as</p>
                    <p className="font-bold text-sm text-zinc-200 truncate max-w-[180px]">{user?.email}</p>
                    {user?.role && (
                      <span className="inline-block mt-1 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-violet-500/10 text-violet-400 border border-violet-500/20 rounded-md">
                        {user.role}
                      </span>
                    )}
                  </DropdownItem>
                  <DropdownItem 
                    key="dashboard" 
                    startContent={<LayoutDashboard className="h-4 w-4 text-zinc-400" />}
                    href="/dashboard"
                    className="rounded-xl mt-1 text-zinc-300 hover:text-white"
                    textValue="Dashboard"
                  >
                    Dashboard
                  </DropdownItem>
                  <DropdownItem 
                    key="logout" 
                    color="danger" 
                    className="text-danger rounded-xl"
                    startContent={<LogOut className="h-4 w-4" />}
                    onClick={handleLogout}
                    textValue="Log Out"
                  >
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2.5">
                <Button 
                  as={Link} 
                  href="/login" 
                  variant="light" 
                  size="sm" 
                  className="font-medium text-zinc-400 hover:text-white px-3 sm:px-4"
                >
                  Login
                </Button>
                <Button 
                  as={Link} 
                  href="/register" 
                  size="sm" 
                  className="relative overflow-hidden rounded-xl bg-white px-4 py-1.5 text-sm font-semibold text-black shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:bg-zinc-200 transition-all duration-200 active:scale-95"
                >
                  Register
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= MOBILE EXPANDABLE MENU ================= */}
      {isMenuOpen && (
        <div className="border-t border-white/5 bg-[#09090b]/95 backdrop-blur-2xl md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <ul className="flex flex-col gap-1 p-3">
            <li>
              <Link 
                href="/" 
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-zinc-400 hover:bg-white/5 hover:text-white active:bg-white/10 transition-all duration-150"
              >
                <Home className="h-4 w-4" /> Home
              </Link>
            </li>
            <li>
              <Link 
                href="/all-prompts" 
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-zinc-400 hover:bg-white/5 hover:text-white active:bg-white/10 transition-all duration-150"
              >
                <Compass className="h-4 w-4" /> All Prompts
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default NavbarPage;