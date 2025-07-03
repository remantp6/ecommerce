import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { useTokenStore } from "./store/tokenStore";

// Define the paths that should be protected
const protectedPaths = ["/admin", "/cart", "/profile", "/checkout"];

// Middleware to protect certain paths
// If the user is unauthenticated, redirect them to the login page if they try to access protected paths
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));
  const { accessToken } = useTokenStore?.getState();
  //console.log("Access Token from middleware:", accessToken);

  if (isProtected && !!accessToken) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// it matches the paths that should be protected
export const config = {
  matcher: [
    "/admin/:path*",
    "/cart/:path*",
    "/profile/:path*",
    "/checkout/:path*",
  ],
};
