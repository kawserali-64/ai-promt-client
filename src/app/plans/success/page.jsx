import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default async function Success({ searchParams }) {

  // 1️⃣ session_id URL থেকে নিচ্ছি
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id')

  // 2️⃣ Stripe থেকে payment session verify করছি
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items']
  })

  const {
    status,
    customer_details: { email: customerEmail }
  } = session

  // 3️⃣ যদি payment complete না হয় → redirect home
  if (status === 'open') return redirect('/')

  // 4️⃣ 🔥 IMPORTANT PART (ADD HERE)
  // Payment successful → এখন user কে premium বানাতে backend call দিবো

  await fetch("http://localhost:5000/api/upgrade-premium", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: customerEmail, // user email পাঠাচ্ছি backend এ
    }),
  })

  // 5️⃣ UI render (success page)
  return (
    <section className="flex min-h-[60vh] items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">

        {/* success icon */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
          <CheckCircle2 size={40} />
        </div>

        {/* title */}
        <h1 className="mb-2 text-2xl font-bold text-slate-900">
          Payment Successful!
        </h1>

        {/* email show */}
        <p className="mb-6 text-slate-600">
          Thank you! A confirmation email has been sent to{' '}
          <span className="font-medium text-slate-900">
            {customerEmail}
          </span>
        </p>

        {/* return button */}
        <Link
          href="/"
          className="inline-block w-full rounded-lg bg-blue-600 px-6 py-2.5 font-semibold text-white transition hover:bg-blue-700"
        >
          Return to Dashboard
        </Link>

        {/* footer */}
        <p className="mt-6 text-sm text-slate-500">
          Questions? Contact us at{' '}
          <a
            href="mailto:orders@example.com"
            className="text-blue-600 hover:underline"
          >
            orders@example.com
          </a>
        </p>

      </div>
    </section>
  )
}