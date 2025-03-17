import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { decrypt, updateSession } from 'src/lib/session';
import { cookies, headers } from 'next/headers';


const protectedRoutes = [
    { path: /^\/dashboard/, roles: ['admin', 'lecturer', 'kaprodi', 'ketua_rg'] },
    { path: /^\/audit/, roles: ['admin'] },
    { path: /^\/konfigurasi/, roles: ['admin'] },
    { path: /^\/research_group/, roles: ['admin'] },
    { path: /^\/program_studi/, roles: ['admin'] },
    { path: /^\/admin/, roles: ['admin'] },
    { path: /^\/usulan/, roles: ['admin', 'lecturer', 'kaprodi', 'ketua_rg']},
    { path: /^\/penelitian/, roles: ['admin', 'lecturer', 'kaprodi', 'ketua_rg']},
    { path: /^\/pengmas/, roles: ['admin', 'lecturer', 'kaprodi', 'ketua_rg']},
    { path: /^\/profile/, roles: ['admin', 'lecturer', 'kaprodi', 'ketua_rg']},
    { path: /^\/dashboard\/lecturer/, roles: ['admin', 'lecturer'] },
];

// make api endpoint dinamically for protected routing
const roleBasedApiRoutes = [
    'admin',
    'lecturer',
    'kaprodi',
    'ketua_rg',
];

roleBasedApiRoutes.forEach(role => {
    protectedRoutes.push({
        path: new RegExp(`^/api/${role}/`),
        roles: [role]
    });
});

const publicRoutes = [/^\/api\/login$/, /^\/login$/, /^\/file-page$/];

export default async function middleware(req: NextRequest, ev: NextResponse) {

    let token = null;

    // get from cookie
    const cookieStore = cookies()
    const cookie = cookieStore.get('session')?.value;
    const path = req.nextUrl.pathname
    token = cookie

    // if get from authorization bearer
    const headersList = await headers();
    if (!token && headersList.get('authorization')?.split(" ")[0] === "Bearer") {
        const bearer = headersList.get('authorization')?.split(" ")[1]
        token = bearer
    }
    
    const isProtectedRoute = protectedRoutes.find((route) => route.path.test(path));
    const isPublicRoute = publicRoutes.some((route) => route.test(path));

    console.log('detected middleware ', path)
    
    if (isProtectedRoute) {
        console.log('detected protected route')
        const session = await decrypt(token);

        if (!session || !session.user_type) {
            // if send api request
            if (path.startsWith('/api/')) {
                return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
            }

            // if page routing
            return NextResponse.redirect(new URL('/login', req.nextUrl));

        } else if (!isProtectedRoute.roles.includes(session.user_type.toString())) {
            // if send api request
            if (path.startsWith('/api/')) {
                return NextResponse.json({ message: 'Forbidden: You do not have permission' }, { status: 403 });
            }

            // if page routing
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
        '/api/ketua_rg/:path*',
        '/api/lecturer/:path*',
        '/api/kaprodi/:path*',
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
    ]
}
