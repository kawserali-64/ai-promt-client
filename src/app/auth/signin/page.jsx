"use client";
import { useState } from "react";
import { Check, ArrowRight } from "lucide-react"; 
// 🌟 HeroUI v3 এর অফিশিয়াল ইম্পোর্ট গাইডলাইন
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { authClient } from "@/lib/auth-client"; 

const SigninPage = () => {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [serverError, setServerError] = useState(null);

  // ইমেইল ও পাসওয়ার্ড দিয়ে সাইন-ইন
  const onSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/dashboard", 
    });

    setLoading(false);

    if (error) {
      setServerError(error.message || "Invalid email or password. Please try again.");
    }
  };

  // গুগল সাইন-ইন
  const handleGoogleSignin = async () => {
    try {
      setServerError(null);
      setGoogleLoading(true);
      
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (error) {
      setServerError("Google authentication failed. Please try again.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#09090b] px-4 py-12">
      
      {/* 🌌 ব্যাকগ্রাউন্ড গ্লো ইফেক্ট (সাইন-আপ পেজের সাথে ম্যাচিং) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_100%)]"></div>
      <div className="absolute top-1/2 left-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[130px]"></div>

      {/* মেইন ফর্ম কন্টেইনার কার্ড */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/5 bg-[#0e0e12]/90 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        
        {/* হেডার টেক্সট */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
            Welcome <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">Back</span>
          </h2>
          <p className="mt-2 text-xs text-zinc-400">Sign in to access your engineering-grade prompt ecosystem.</p>
        </div>

        {/* সার্ভার সাইড এরর মেসেজ */}
        {serverError && (
          <div className="mb-5 rounded-xl border border-red-500/10 bg-red-500/5 p-3.5 text-center text-xs font-medium text-red-400">
            {serverError}
          </div>
        )}

        {/* HeroUI ফর্ম */}
        <Form className="flex flex-col gap-4" onSubmit={onSubmit}>

          {/* ইমেইল ইনপুট */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="text-zinc-300 font-medium text-xs mb-1">Email Address</Label>
            <Input 
              placeholder="john@example.com" 
              className="rounded-xl border border-white/5 bg-zinc-900/50 text-white focus-within:border-violet-500/40 transition-all"
            />
            <FieldError className="text-xs text-red-400 mt-1" />
          </TextField>

          {/* পাসওয়ার্ড ইনপুট */}
          <TextField isRequired name="password" type="password">
            <div className="flex items-center justify-between mb-1">
              <Label className="text-zinc-300 font-medium text-xs">Password</Label>
              <a href="/forgot-password" className="text-[11px] text-zinc-500 hover:text-violet-400 transition-colors">
                Forgot password?
              </a>
            </div>
            <Input 
              placeholder="••••••••" 
              className="rounded-xl border border-white/5 bg-zinc-900/50 text-white focus-within:border-violet-500/40 transition-all"
            />
            <FieldError className="text-xs text-red-400 mt-1" />
          </TextField>

          {/* সাবমিট বাটন */}
          <div className="flex flex-col gap-3 mt-2">
            <Button 
              type="submit" 
              isLoading={loading}
              disabled={googleLoading}
              className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 font-semibold text-white shadow-lg shadow-violet-600/10 hover:opacity-95"
            >
              {!loading && <Check className="h-4 w-4 mr-1" />}
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </div>
        </Form>

        {/* ─── OR DIVIDER ─── */}
        <div className="relative my-5 flex items-center justify-center">
          <div className="absolute w-full border-t border-white/5"></div>
          <span className="relative bg-[#0e0e12] px-3 text-[10px] uppercase tracking-widest text-zinc-500">Or continue with</span>
        </div>

        {/* গুগল সাইন-ইন বাটন */}
        <Button 
          type="button"
          onClick={handleGoogleSignin}
          isLoading={googleLoading}
          disabled={loading}
          className="w-full rounded-xl border border-white/5 bg-white/[0.02] text-xs font-semibold text-zinc-300 hover:bg-white/5 hover:text-white transition-all flex items-center justify-center gap-2 py-5"
        >
          {!googleLoading && (
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0112 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.336 0 3.332 2.69 1.391 6.618l3.875 3.147z" />
              <path fill="#4285F4" d="M23.455 12.273c0-.818-.073-1.609-.21-2.364H12v4.51h6.42c-.277 1.486-1.11 2.74-2.373 3.59l3.705 2.873c2.164-1.99 3.41-4.92 3.41-8.61z" />
              <path fill="#FBBC05" d="M5.266 14.235A7.093 7.093 0 014.909 12c0-.79.132-1.55.357-2.265L1.391 6.587A11.951 11.951 0 000 12c0 1.92.454 3.736 1.259 5.355l4.007-3.12z" />
              <path fill="#34A853" d="M12 24c3.24 0 5.955-1.073 7.94-2.918l-3.705-2.873c-1.027.687-2.34 1.1-4.235 1.1-3.255 0-6.014-2.2-7.004-5.164L.99 17.273C2.932 21.31 6.936 24 12 24z" />
            </svg>
          )}
          {googleLoading ? "Connecting Google..." : "Sign in with Google"}
        </Button>

        {/* সাইন-আপ লিংক */}
        <div className="mt-6 text-center">
          <p className="text-xs text-zinc-500">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="inline-flex items-center gap-0.5 font-medium text-violet-400 hover:text-violet-300 hover:underline">
              Sign Up <ArrowRight className="h-3 w-3" />
            </a>
          </p>
        </div>

      </div>
    </div>
  );
};

export default SigninPage;