"use client";

import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

const PlanPage = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const handleUpgrade = () => {
        if (!session) {
            router.push("/login");
            return;
        }
        router.push("/payment");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-[#0b0b1a] to-black flex items-center justify-center p-6">

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl w-full">

                {/* ================= FREE PLAN ================= */}
                <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 overflow-hidden">

                    <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 via-transparent to-blue-500/10 blur-2xl" />

                    <div className="relative z-10">

                        <h2 className="text-2xl font-bold text-white">Free Plan</h2>

                        <p className="text-gray-400 mt-2">
                            Basic access for new creators
                        </p>

                        <div className="mt-6 text-4xl font-bold text-white">
                            $0 <span className="text-sm text-gray-400">/ forever</span>
                        </div>

                        <ul className="mt-6 space-y-3 text-sm text-gray-300">
                            <li>✔ Create up to 3 prompts</li>
                            <li>✔ Basic templates</li>
                            <li>✔ Community access</li>
                            <li className="text-gray-500">✖ Premium AI tools</li>
                            <li className="text-gray-500">✖ Private prompt access</li>
                        </ul>
                        <button
                            disabled
                            className="mt-8 w-full py-3 rounded-xl bg-white/10 text-gray-400 cursor-not-allowed"
                        >
                            Current Plan
                        </button>

                    </div>
                </div>

                {/* ================= PREMIUM PLAN ================= */}
                <div className="relative rounded-3xl border border-violet-500/30 bg-gradient-to-br from-violet-600/10 to-pink-500/10 p-8 overflow-hidden">

                    <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-violet-600/20 via-transparent to-pink-500/20" />

                    <div className="relative z-10">

                        <div className="inline-block px-3 py-1 text-xs rounded-full bg-violet-500/20 text-violet-300 mb-4">
                            Unlock Everything
                        </div>

                        <h2 className="text-2xl font-bold text-white">Premium Plan</h2>

                        <p className="text-gray-400 mt-2">
                            Full access for creators & professionals
                        </p>

                        <div className="mt-6 text-4xl font-bold text-white">
                            $5 <span className="text-sm text-gray-400">/ one-time</span>
                        </div>

                        <ul className="mt-6 space-y-3 text-sm text-gray-300">
                            <li>✔ Unlimited prompts</li>
                            <li>✔ Access private prompts</li>
                            <li>✔ Copy without limits</li>
                            <li>✔ Priority features</li>
                            <li>✔ Monetization access</li>
                        </ul>


                        <form action="/api/checkout_sessions" method="POST">
                            <section>
                                <button type="submit" role="link"
                                    className="mt-8 w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition flex items-center justify-center gap-2">
                                    Checkout
                                </button>
                            </section>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PlanPage;