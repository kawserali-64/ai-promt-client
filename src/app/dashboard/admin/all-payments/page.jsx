"use client";

import { useEffect, useState } from "react";
import { DollarSign, CreditCard, ReceiptText } from "lucide-react";
import { useTheme } from "next-themes";

const AllPaymentPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const { resolvedTheme } = useTheme();

  // Component Mount হওয়া নিশ্চিতকরণ
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/payments`)
      .then((res) => res.json())
      .then((data) => {
        setPayments(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const isDark = resolvedTheme === "dark";

  // Flash বন্ধ করতে bg-transparent এবং dynamic dark: modifiers
  if (!mounted) {
    return (
      <div className="min-h-screen bg-transparent p-6 md:p-8 space-y-8 animate-pulse">
        <div className="h-10 w-48 bg-zinc-200 dark:bg-zinc-800/50 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-32 bg-zinc-100 dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/5 rounded-2xl" />
          <div className="h-32 bg-zinc-100 dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/5 rounded-2xl" />
        </div>
        <div className="h-96 bg-zinc-100 dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/5 rounded-2xl" />
      </div>
    );
  }

  const totalRevenue = payments.reduce(
    (sum, payment) => sum + (payment.amount || 0),
    0
  );

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
          isDark ? "bg-[#050505]" : "bg-zinc-50"
        }`}
      >
        <div className="flex flex-col items-center justify-center">
          {/* LOADING ICON CONTAINER */}
          <div
            className={`relative flex items-center justify-center w-16 h-16 rounded-2xl border ${
              isDark
                ? "bg-[#0a0a0a] border-white/10"
                : "bg-white border-zinc-200 shadow-sm"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full border-4 border-t-transparent animate-spin ${
                isDark
                  ? "border-violet-500 border-t-transparent"
                  : "border-violet-600 border-t-transparent"
              }`}
            />
          </div>

          {/* LOADING TEXT */}
          <h2
            className={`mt-5 text-lg font-semibold ${
              isDark ? "text-white" : "text-zinc-900"
            }`}
          >
            Loading Payments
          </h2>

          <p
            className={`mt-1 text-sm ${
              isDark ? "text-zinc-500" : "text-zinc-500"
            }`}
          >
            Fetching transaction history...
          </p>

          {/* BOUNCING DOTS */}
          <div className="flex gap-1.5 mt-4">
            <span
              className={`w-1.5 h-1.5 rounded-full animate-bounce ${
                isDark ? "bg-violet-500" : "bg-violet-600"
              }`}
            />
            <span
              className={`w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:150ms] ${
                isDark ? "bg-violet-500" : "bg-violet-600"
              }`}
            />
            <span
              className={`w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:300ms] ${
                isDark ? "bg-violet-500" : "bg-violet-600"
              }`}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`p-6 md:p-8 space-y-8 min-h-screen transition-colors duration-300 ${
        isDark ? "bg-[#050505]" : "bg-zinc-50"
      }`}
    >
      {/* PAGE HEADER */}
      <div>
        <h1
          className={`text-3xl font-bold tracking-tight ${
            isDark ? "text-white" : "text-violet-600"
          }`}
        >
          All Payments
        </h1>

        <p
          className={`mt-2 ${
            isDark ? "text-zinc-400" : "text-zinc-500"
          }`}
        >
          View and monitor all platform payment transactions.
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* TOTAL TRANSACTIONS */}
        <div
          className={`border rounded-2xl p-6 ${
            isDark
              ? "bg-[#0a0a0a] border-white/5 shadow-xl"
              : "bg-white border-zinc-200 shadow-sm"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className={`text-xs font-semibold uppercase tracking-widest ${
                  isDark ? "text-zinc-400" : "text-zinc-500"
                }`}
              >
                Total Transactions
              </p>

              <h2
                className={`text-4xl font-bold mt-2 ${
                  isDark ? "text-white" : "text-zinc-900"
                }`}
              >
                {payments.length}
              </h2>
            </div>

            <div className="p-3 bg-indigo-500/10 rounded-xl">
              <CreditCard
                size={24}
                className="text-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* TOTAL REVENUE */}
        <div
          className={`border rounded-2xl p-6 ${
            isDark
              ? "bg-[#0a0a0a] border-white/5 shadow-xl"
              : "bg-white border-zinc-200 shadow-sm"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className={`text-xs font-semibold uppercase tracking-widest ${
                  isDark ? "text-zinc-400" : "text-zinc-500"
                }`}
              >
                Total Revenue
              </p>

              <h2 className="text-4xl font-bold mt-2 text-emerald-600">
                ${totalRevenue.toFixed(2)}
              </h2>
            </div>

            <div className="p-3 bg-emerald-500/10 rounded-xl">
              <DollarSign
                size={24}
                className="text-emerald-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* PAYMENTS TABLE */}
      <div
        className={`border rounded-2xl overflow-hidden ${
          isDark
            ? "bg-[#0a0a0a] border-white/5 shadow-2xl"
            : "bg-white border-zinc-200 shadow-sm"
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr
                className={`border-b text-[10px] uppercase tracking-widest ${
                  isDark
                    ? "border-white/5 text-zinc-400"
                    : "border-zinc-200 text-zinc-500"
                }`}
              >
                <th className="px-6 py-5">#</th>
                <th className="px-6 py-5">Transaction ID</th>
                <th className="px-6 py-5">User Email</th>
                <th className="px-6 py-5">Amount</th>
                <th className="px-6 py-5">Currency</th>
                <th className="px-6 py-5">Date</th>
              </tr>
            </thead>

            <tbody
              className={`divide-y ${
                isDark
                  ? "divide-white/5"
                  : "divide-zinc-100"
              }`}
            >
              {payments.map((payment, index) => (
                <tr
                  key={payment._id || index}
                  className={`transition-colors ${
                    isDark
                      ? "hover:bg-white/[0.02]"
                      : "hover:bg-zinc-50"
                  }`}
                >
                  {/* NUMBER */}
                  <td
                    className={`px-6 py-4 text-sm ${
                      isDark
                        ? "text-zinc-600"
                        : "text-zinc-400"
                    }`}
                  >
                    {index + 1}
                  </td>

                  {/* TRANSACTION ID */}
                  <td
                    className={`px-6 py-4 font-mono text-xs ${
                      isDark
                        ? "text-zinc-400"
                        : "text-zinc-500"
                    }`}
                  >
                    <div
                      className="max-w-[180px] truncate"
                      title={payment.transactionId}
                    >
                      {payment.transactionId}
                    </div>
                  </td>

                  {/* EMAIL */}
                  <td
                    className={`px-6 py-4 text-sm ${
                      isDark
                        ? "text-zinc-300"
                        : "text-zinc-700"
                    }`}
                  >
                    {payment.userEmail}
                  </td>

                  {/* AMOUNT */}
                  <td className="px-6 py-4 font-medium text-emerald-600 text-sm">
                    ${payment.amount}
                  </td>

                  {/* CURRENCY */}
                  <td
                    className={`px-6 py-4 text-sm uppercase ${
                      isDark
                        ? "text-zinc-400"
                        : "text-zinc-500"
                    }`}
                  >
                    {payment.currency}
                  </td>

                  {/* DATE */}
                  <td
                    className={`px-6 py-4 text-sm ${
                      isDark
                        ? "text-zinc-400"
                        : "text-zinc-500"
                    }`}
                  >
                    {payment.createdAt
                      ? new Date(
                          payment.createdAt
                        ).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* EMPTY STATE */}
          {payments.length === 0 && (
            <div
              className={`text-center py-20 ${
                isDark
                  ? "text-zinc-600"
                  : "text-zinc-400"
              }`}
            >
              <ReceiptText
                className="mx-auto mb-3 opacity-50"
                size={32}
              />

              <p>No payment records found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllPaymentPage;