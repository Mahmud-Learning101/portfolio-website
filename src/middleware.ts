import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protected Admin Routes
  const isProtectedAdminRoute =
    pathname.startsWith('/admin/dashboard') ||
    pathname.startsWith('/admin/profile') ||
    pathname.startsWith('/admin/experience') ||
    pathname.startsWith('/admin/education') ||
    pathname.startsWith('/admin/projects') ||
    pathname.startsWith('/admin/testimonials') ||
    pathname.startsWith('/admin/messages');

  const token = req.cookies.get('admin_token')?.value;

  if (isProtectedAdminRoute && !token) {
    const loginUrl = new URL('/admin/login', req.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect away from login if already authenticated
  if (pathname === '/admin/login' && token) {
    return NextResponse.redirect(new URL('/admin/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
