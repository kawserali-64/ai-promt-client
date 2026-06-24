"use client";
import { useState } from "react";
// import { Radio } from "lucide-react";
import { Button, Description, FieldError, Form, Input, Label, Radio, RadioGroup, TextField } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [selection, setSelection] = useState("User");

  // ইমেইল ও পাসওয়ার্ড দিয়ে সাইন-আপ
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
      plan:'free',
      callbackURL: "/dashboard",
    });

    setLoading(false);

    if (error) {
      setServerError(error.message || "Something went wrong. Please try again.");
    }
  };

  // গুগল সাইন-আপ
  const handleGoogleSignup = async () => {

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
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_100%)]"></div>
      <div className="absolute top-1/2 left-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[130px]"></div>

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/5 bg-[#0e0e12]/90 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
            Create an <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">Account</span>
          </h2>
        </div>

        {serverError && (
          <div className="mb-5 rounded-xl border border-red-500/10 bg-red-500/5 p-3.5 text-center text-xs font-medium text-red-400">
            {serverError}
          </div>
        )}

        <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
          {/* নাম ইনপুট */}
          <TextField isRequired name="name" type="text">
            <Label className="text-zinc-300 font-medium text-xs mb-1">Full Name</Label>
            <Input placeholder="John Doe" className="rounded-xl border border-white/5 bg-zinc-900/50 text-white" />
          </TextField>

          {/* প্রোফাইল ছবি ইনপুট */}
          <TextField isRequired name="image" type="url">
            <Label className="text-zinc-300 font-medium text-xs mb-1">Profile Image URL</Label>
            <Input placeholder="Enter image URL" className="rounded-xl border border-white/5 bg-zinc-900/50 text-white" />
          </TextField>

          {/* ইমেইল ইনপুট */}
          <TextField isRequired name="email" type="email">
            <Label className="text-zinc-300 font-medium text-xs mb-1">Email Address</Label>
            <Input placeholder="john@example.com" className="rounded-xl border border-white/5 bg-zinc-900/50 text-white" />
            <FieldError className="text-xs text-red-400 mt-1" />
          </TextField>

          {/* পাসওয়ার্ড ইনপুট */}
          <TextField isRequired name="password" type="password">
            <Label className="text-zinc-300 font-medium text-xs mb-1">Password</Label>
            <Input placeholder="••••••••" className="rounded-xl border border-white/5 bg-zinc-900/50 text-white" />
            <Description className="text-[10px] text-zinc-500 mt-1">Must be at least 8 characters.</Description>
          </TextField>
          {/* role */}
          <div className="flex flex-col gap-4">
            <RadioGroup
              defaultValue="User"
              name="user"
              onChange={(nextValue) => setSelection(nextValue)}
            >
              <Label>Subscription plan</Label>
              <Radio value="User">
                <Radio.Content>
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>
                  <label>User</label>
                </Radio.Content>
              </Radio>
              <Radio value="Creator">
                <Radio.Content>
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>
                  <label>Creator</label>
                </Radio.Content>
              </Radio>
            </RadioGroup>
          </div>

          <Button type="submit" isLoading={loading} className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 font-semibold text-white">
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>
        </Form>

        <div className="relative my-5 flex items-center justify-center">
          <div className="absolute w-full border-t border-white/5"></div>
          <span className="relative bg-[#0e0e12] px-3 text-[10px] uppercase tracking-widest text-zinc-500">Or continue with</span>
        </div>

        <Button type="button" onClick={handleGoogleSignup} isLoading={googleLoading} className="w-full rounded-xl border border-white/5 bg-white/[0.02] text-xs font-semibold text-zinc-300 hover:bg-white/5">
          Sign up with Google
        </Button>
      </div>
    </div>
  );
};

export default SignupPage;