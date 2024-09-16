import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { decrypt, updateSession } from '@/app/lib/session';
import { cookies } from 'next/headers';

const protectedRoutes = [/^\/dashboard/, /^\/api(?!\/login)/];
const publicRoutes = [/^\/api\/login$/, /^\/login$/, /^\/file-page$/];

export default async function middleware(req: NextRequest, ev: NextResponse) {

    const rawPath = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.some((route) => route.test(rawPath));
    const isPublicRoute = publicRoutes.some((route) => route.test(rawPath));

    const cookie = cookies().get('session')?.value;
    const session = await decrypt(cookie);

    console.log('Request:', rawPath);

    // jika protected 
    if (isProtectedRoute) {
        console.log("protected route")
        if ((typeof session === 'undefined')) {
            return NextResponse.redirect(new URL('/login', req.nextUrl.origin));
        } else {
            // jika terdapat cookie pada local storage
            // updateSession();
        }
    }

    // jika sudah login dan akses public
    if (isPublicRoute &&
        session?.userId && !rawPath.startsWith('/dashboard')) {
        // updateSession();
        return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
