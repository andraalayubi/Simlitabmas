import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { decrypt, updateSession } from '@/app/lib/session';
import { cookies } from 'next/headers';

const protectedRoutes = [
    { path: /^\/dashboard/, roles: ['admin', 'dosen', 'user'] },
    { path: /^\/admin/, roles: ['admin'] },
    { path: /^\/dashboard\/lecturer/, roles: ['admin', 'dosen'] }
];
const publicRoutes = [/^\/api\/login$/, /^\/login$/, /^\/file-page$/];

export default async function middleware(req: NextRequest, ev: NextResponse) {
    const cookieStore = cookies()
    const cookie = cookieStore.get('session')?.value;
    const path = req.nextUrl.pathname

    const isProtectedRoute = protectedRoutes.find((route) => route.path.test(path));
    const isPublicRoute = publicRoutes.some((route) => route.test(path));

    console.log('detected middleware ', path)
    
    if (isProtectedRoute) {
        const session = await decrypt(cookie);

        if (!session || !session.user_type) {
            return NextResponse.redirect(new URL('/login', req.nextUrl));

        } else if (!isProtectedRoute.roles.includes(session.user_type.toString())) {
            return NextResponse.redirect(new URL('/', req.nextUrl));

        } else {
            // If user has the correct role, update session and proceed
            // updateSession();
            return NextResponse.next();
        }
    }

    return NextResponse.next();
}


export const config = {
    // middleware only used to detect this reqeust
    matcher: [
        '/dashboard/:path*',
        '/api/admin/:path*',
        '/api/admin/:path*',
        '/api/admin/:path*',
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
    ]
}
