import { NextResponse } from "next/server";

// These routes require authentication
export const config = {
  matcher: ["/cms/:path*", "/api/:path*"]
};

export function middleware(req) {
  const path = req.nextUrl.pathname;

  // Public routes
  const publicPaths = ["/", "/login", "/contact", "/booking"];
  const isPublic = publicPaths.some((p) => path.startsWith(p));

  const session = req.cookies.get("ruben_cms_session");

  if (!isPublic && !session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
