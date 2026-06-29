import Link from 'next/link';
import { Ghost } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-white p-6">
      <div className="text-center space-y-6 max-w-md">
        {/* Icon/Visual */}
        <div className="mx-auto w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 mb-8">
          <Ghost size={48} className="text-zinc-500" />
        </div>

        {/* Content */}
        <div>
          <h2 className="text-5xl font-black tracking-tighter mb-4">404</h2>
          <p className="text-zinc-400 text-lg">
            Oops! The page you are looking for has vanished into the digital void.
          </p>
        </div>

        {/* Action Button */}
        <Link 
          href="/"
          className="inline-block px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-zinc-200 transition-all duration-300 active:scale-95"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}