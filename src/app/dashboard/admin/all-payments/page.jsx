"use client";

import { useEffect, useState } from "react";
import { DollarSign, CreditCard, ReceiptText } from "lucide-react";

const AllPaymentPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/payments`)
      .then((res) => res.json())
      .then((data) => {
        setPayments(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const totalRevenue = payments.reduce(
    (sum, payment) => sum + (payment.amount || 0),
    0
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[500px]">
        <span className="loading loading-spinner loading-lg text-indigo-500"></span>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-8 bg-[#050505] min-h-screen">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">All Payments</h1>
        <p className="text-zinc-500 mt-2">View and monitor all platform payment transactions.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest">Total Transactions</p>
              <h2 className="text-4xl font-bold mt-2 text-white">{payments.length}</h2>
            </div>
            <div className="p-3 bg-indigo-500/10 rounded-xl">
              <CreditCard size={24} className="text-indigo-400" />
            </div>
          </div>
        </div>

        <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest">Total Revenue</p>
              <h2 className="text-4xl font-bold mt-2 text-emerald-400">${totalRevenue.toFixed(2)}</h2>
            </div>
            <div className="p-3 bg-emerald-500/10 rounded-xl">
              <DollarSign size={24} className="text-emerald-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-zinc-500 text-[10px] uppercase tracking-widest">
                <th className="px-6 py-5">#</th>
                <th className="px-6 py-5">Transaction ID</th>
                <th className="px-6 py-5">User Email</th>
                <th className="px-6 py-5">Amount</th>
                <th className="px-6 py-5">Currency</th>
                <th className="px-6 py-5">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {payments.map((payment, index) => (
                <tr key={payment._id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 text-zinc-600 text-sm">{index + 1}</td>
                  <td className="px-6 py-4 font-mono text-xs text-zinc-400">
                    <div className="max-w-[180px] truncate" title={payment.transactionId}>
                      {payment.transactionId}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-300">{payment.userEmail}</td>
                  <td className="px-6 py-4 font-medium text-emerald-400 text-sm">${payment.amount}</td>
                  <td className="px-6 py-4 text-sm text-zinc-500 uppercase">{payment.currency}</td>
                  <td className="px-6 py-4 text-sm text-zinc-500">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {payments.length === 0 && (
            <div className="text-center py-20 text-zinc-600">
              <ReceiptText className="mx-auto mb-3 opacity-50" size={32} />
              <p>No payment records found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllPaymentPage;