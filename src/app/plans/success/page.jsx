import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import { CheckCircle2, Mail, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { getUserSession } from '@/lib/core/session'
import { subscription } from '@/lib/api/coustomer'

export default async function Success({ searchParams }) {

  const user = await getUserSession()
  const params = await searchParams
  const session_id = params?.session_id


  console.log(session_id);

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })
  const { status, customer_details } = session
  const customerEmail = customer_details?.email
  console.log(status);



  if (status === 'open') {
    redirect('/')
  }
  console.log();

  if (status !== 'complete') {
    redirect('/')
  }
  subscription({
    session_id, priceId: 'price_1TkqPyCTv8X8Glmq4jqCNS4D', userId: user.id, userEmail: customer_details?.email
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-emerald-50 via-white to-emerald-100 px-4">

      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-emerald-100 p-8 text-center">

        {/* Success Icon */}
        <div className="flex justify-center mb-5">
          <div className="p-4 rounded-full bg-emerald-100">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-800">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-500 mt-2">
          Your subscription is now active and ready to use.
        </p>

        {/* Email */}
        <div className="mt-6 flex items-center justify-center gap-2 bg-gray-50 border rounded-lg p-3 text-sm text-gray-600">
          <Mail className="w-4 h-4 text-gray-500" />
          <span>{customerEmail}</span>
        </div>

        <p className="mt-4 text-xs text-gray-400">
          We’ve sent a confirmation email with your payment details.
        </p>

        <Link
          href={`/dashboard/${user?.role}`}
          className="mt-6 inline-flex items-center justify-center gap-2 w-full rounded-lg bg-emerald-600 py-2.5 text-white font-medium hover:bg-emerald-700 transition"
        >
          Go to Dashboard
          <ArrowRight className="w-4 h-4" />
        </Link>

      </div>
    </div>
  )
}