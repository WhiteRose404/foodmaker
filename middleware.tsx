import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY: string = process.env.SECRET_KEY || "";

export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const pathname = request.nextUrl.pathname;
  // Define the pages or routes to protect
  const protectedRoutes = ['/admin'];

  // Check if the current route is protected 
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    // Get the authentication token from cookies (or any other method you use)
    const authToken:string = request.cookies.get('authToken')?.value || "";
    if (!SECRET_KEY || typeof SECRET_KEY !== 'string') {
      console.error('JWT_SECRET is not defined or is not a valid string.');
      return NextResponse.redirect(new URL('/login', request.url));
    }
    try {
      await jwtVerify(authToken, new TextEncoder().encode(SECRET_KEY));  // Validate token in Edge runtime
      console.log("valid token")
      return NextResponse.next();  // Allow the request to continue
    } catch (err: any) {
      console.error("Invalid JWT:", err.message);
      return NextResponse.redirect(new URL('/login?error=session', request.url));
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}


export const config = {
  matcher: '/admin/:path*',
}