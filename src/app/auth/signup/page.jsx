"use client";
import { useState } from "react";
import { Button, Description, FieldError, Form, Input, Label, Radio, RadioGroup, TextField } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [selection, setSelection] = useState("User");

  const onSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");
    const image = formData.get("image");
    const role = selection;

    const { error } = await authClient.signUp.email({
      email,
      password,
      name,
      image,
      role,
      plan: 'free',
      callbackURL: "/dashboard",
    });

    setLoading(false);

    if (error) {
      setServerError(error.message || "Something went wrong. Please try again.");
      return;
    }
    
    // signup successful
    window.location.href = "/";
  };

  const handleGoogleSignin = async () => {
    setGoogleLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
      });
    } catch (err) {
      console.error(err);
      setGoogleLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gray-50 dark:bg-[#09090b] px-4 py-12 transition-colors duration-300">
      
      {/* ব্যাকগ্রাউন্ড প্যাটার্ন (লাইট ও ডার্ক মোড ফ্রেন্ডলি) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_100%)] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[130px] pointer-events-none"></div>

      {/* মেইন কার্ড */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-gray-200 dark:border-white/5 bg-white/80 dark:bg-[#0e0e12]/90 p-8 shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-colors duration-300">
        
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            Create an <span className="bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">Account</span>
          </h2>
        </div>

        {serverError && (
          <div className="mb-5 rounded-xl border border-red-500/10 bg-red-500/5 p-3.5 text-center text-xs font-medium text-red-400">
            {serverError}
          </div>
        )}

        <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <TextField isRequired name="name" type="text">
            <Label className="text-gray-700 dark:text-zinc-300 font-medium text-xs mb-1">Full Name</Label>
            <Input placeholder="John Doe" className="rounded-xl border border-gray-300 dark:border-white/5 bg-gray-50 dark:bg-zinc-900/50 text-gray-900 dark:text-white" />
          </TextField>

          <TextField isRequired name="image" type="url">
            <Label className="text-gray-700 dark:text-zinc-300 font-medium text-xs mb-1">Profile Image URL</Label>
            <Input placeholder="Enter image URL" className="rounded-xl border border-gray-300 dark:border-white/5 bg-gray-50 dark:bg-zinc-900/50 text-gray-900 dark:text-white" />
          </TextField>

          <TextField isRequired name="email" type="email">
            <Label className="text-gray-700 dark:text-zinc-300 font-medium text-xs mb-1">Email Address</Label>
            <Input placeholder="john@example.com" className="rounded-xl border border-gray-300 dark:border-white/5 bg-gray-50 dark:bg-zinc-900/50 text-gray-900 dark:text-white" />
            <FieldError className="text-xs text-red-400 mt-1" />
          </TextField>

          <TextField isRequired name="password" type="password">
            <Label className="text-gray-700 dark:text-zinc-300 font-medium text-xs mb-1">Password</Label>
            <Input placeholder="••••••••" className="rounded-xl border border-gray-300 dark:border-white/5 bg-gray-50 dark:bg-zinc-900/50 text-gray-900 dark:text-white" />
            <Description className="text-[10px] text-gray-400 dark:text-zinc-500 mt-1">Must be at least 8 characters.</Description>
          </TextField>
          
          <div className="flex flex-col gap-2 my-1">
            <RadioGroup
              defaultValue="User"
              name="user"
              onChange={(nextValue) => setSelection(nextValue)}
              className="text-gray-700 dark:text-zinc-300 text-xs"
            >
              <Label className="text-gray-700 dark:text-zinc-300 font-medium text-xs mb-1.5">Select Role</Label>
              <div className="flex gap-4">
                <Radio value="User" className="text-gray-800 dark:text-white text-xs">
                  <Radio.Content>
                    <Radio.Control>
                      <Radio.Indicator />
                    </Radio.Control>
                    <span className="text-gray-800 dark:text-zinc-200">User</span>
                  </Radio.Content>
                </Radio>
                <Radio value="Creator" className="text-gray-800 dark:text-white text-xs">
                  <Radio.Content>
                    <Radio.Control>
                      <Radio.Indicator />
                    </Radio.Control>
                    <span className="text-gray-800 dark:text-zinc-200">Creator</span>
                  </Radio.Content>
                </Radio>
              </div>
            </RadioGroup>
          </div>

          <Button 
            type="submit" 
            isLoading={loading} 
            disabled={googleLoading}
            className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 font-semibold text-white shadow-lg shadow-violet-600/10 hover:opacity-95"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>
        </Form>

        <div className="relative my-5 flex items-center justify-center">
          <div className="absolute w-full border-t border-gray-200 dark:border-white/5"></div>
          <span className="relative bg-white dark:bg-[#0e0e12] px-3 text-[10px] uppercase tracking-widest text-gray-400 dark:text-zinc-500 transition-colors">
            Or continue with
          </span>
        </div>

        <Button
          onClick={handleGoogleSignin}
          variant="bordered"
          className="w-full h-12 border-gray-300 dark:border-default-200 hover:bg-gray-100 dark:hover:bg-default-100 flex items-center justify-center gap-2 text-gray-800 dark:text-white font-medium transition-colors"
        >
          <FcGoogle size={22} />
          Continue with Google
        </Button>
      </div>
    </div>
  );
};

export default SignupPage;