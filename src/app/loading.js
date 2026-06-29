export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505]">
      {/* Container */}
      <div className="flex flex-col items-center gap-6">
        {/* Animated Spinner */}
        <div className="relative">
          <div className="w-12 h-12 border-4 border-white/10 rounded-full animate-spin border-t-white"></div>
          {/* Optional Pulse Effect */}
          <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-white/5 animate-pulse"></div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <h3 className="text-white font-bold text-lg tracking-wide">Loading</h3>
          <p className="text-zinc-500 text-sm font-medium animate-pulse">
            Please wait a moment...
          </p>
        </div>
      </div>
    </div>
  );
}