// import {verify} from "jsonwebtoken";
import {NextResponse} from "next/server";
import type {NextRequest}
from 'next/server';
import {verifyAuth} from "./utils/verifyMiddleware";


export async function middleware(req : NextRequest) {

    const token = req.cookies.get('refreshtoken') ?. value
    const verifiedToken = token && verifyAuth(token).catch(err => console.log(err))
    if (req.nextUrl.pathname.startsWith('/signin') && ! verifiedToken) {
        return
    }

    if (req.url.includes('/signin') && verifiedToken) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    if (! verifiedToken) {
        return NextResponse.redirect(new URL('/signin', req.url))
    }
}


export const config = {
    matcher: ['/', '/signin']
}
