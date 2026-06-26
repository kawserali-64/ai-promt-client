import { NextResponse } from 'next/server'
import { getUserSession } from './lib/core/session'


export async function proxy(request) {
    const user = await getUserSession();
    console.log(user);

    if (user) {
        return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/auth/signin", request.url));
}

export const config = {
    matcher: '/plans',
}