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
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-black text-white">All Payments</h1>
        <p className="text-slate-400 mt-2">
          View and monitor all platform payment transactions.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Total Transactions</p>
              <h2 className="text-4xl font-black mt-2 text-white">{payments.length}</h2>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <CreditCard size={28} className="text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Total Revenue</p>
              <h2 className="text-4xl font-black mt-2 text-emerald-400">${totalRevenue.toFixed(2)}</h2>
            </div>
            <div className="p-3 bg-emerald-500/10 rounded-xl">
              <DollarSign size={28} className="text-emerald-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">User Email</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Currency</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {payments.map((payment, index) => (
                <tr key={payment._id} className="hover:bg-slate-900/30 transition-colors">
                  <td className="px-6 py-4 text-slate-400 text-sm">{index + 1}</td>
                  <td className="px-6 py-4 font-mono text-sm text-slate-300">
                    <div className="max-w-[180px] truncate" title={payment.transactionId}>
                      {payment.transactionId}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-200">{payment.userEmail}</td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-emerald-400">${payment.amount}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{payment.currency}</td>
                  <td className="px-6 py-4 text-sm text-slate-400">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {payments.length === 0 && (
            <div className="text-center py-20 text-slate-500">
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