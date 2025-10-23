import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public paths
  const publicPaths = ["/login", "/signup", "/verifyemail"];

  const token = request.cookies.get("token")?.value || "";

  // If user is logged in and tries to access public path → redirect to home
  if (publicPaths.includes(path) && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user is NOT logged in and tries to access protected path → redirect to login
  if (!publicPaths.includes(path) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Otherwise allow
  return NextResponse.next();
}

// Protect only the paths that need protection
export const config = {
  matcher: ["/", "/profile/:path*"], // all /profile routes
};
