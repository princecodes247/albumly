import { NextResponse } from 'next/server';
import { auth } from "@/lib/auth";
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function 
isAuth(args?: {invert?:boolean}) {
    const session = await auth.api.getSession({ headers: await headers() });

    if(args?.invert && session) return redirect("/user")

    if (!session) {
        // return NextResponse.redirect(new URL('/login', req.url));
        return redirect("/login")
    }

    return session;
}