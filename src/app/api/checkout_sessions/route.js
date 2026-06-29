import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../lib/stripe'
import { getUserSession } from '@/lib/core/session'

export async function POST() {
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')
        const user = await getUserSession()

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            customer_email: user?.email,
            line_items: [
                {
                    // Provide the exact Price ID (for example, price_1234) of the product you want to sell
                    price: 'price_1TkqPyCTv8X8Glmq4jqCNS4D',
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${origin}/plans/success?session_id={CHECKOUT_SESSION_ID}`,
        });
        console.log(session.url);
        return NextResponse.redirect(session.url, 303)
    
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}