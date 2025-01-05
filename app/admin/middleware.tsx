import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const pathname = request.nextUrl.pathname;

  // Define the pages or routes to protect
  const protectedRoutes = ['/admin'];

  // Check if the current route is protected
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    // Get the authentication token from cookies (or any other method you use)
    const authToken = request.cookies.get('authToken');

    // If the token is missing, redirect to the login page
    if (!authToken) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}