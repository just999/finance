import type { NextRequest } from 'next/server';
import { auth } from './auth';
import { updateSession } from './lib/supabase/middleware';
import { createClient } from './lib/supabase/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // return NextResponse.redirect(new URL('/dashboard', request.url));

  const supabase = await createClient();

  const { pathname } = request.nextUrl;
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  const session = await auth();

  const email = session?.user?.email;

  if (!email && request.nextUrl.pathname.startsWith('/dashboard')) {
    return Response.redirect(new URL('/login', request.url));
  }
  if (!email && request.nextUrl.pathname.startsWith('/my-account')) {
    return Response.redirect(new URL('/login', request.url));
  }

  // if (email && request.nextUrl.pathname.startsWith('/login')) {
  //   return Response.redirect(new URL('/my-account', request.url));
  // }

  // if (pathname === '/') {
  //   return Response.redirect(new URL('/dashboard', request.url));
  // }

  return await updateSession(request);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
