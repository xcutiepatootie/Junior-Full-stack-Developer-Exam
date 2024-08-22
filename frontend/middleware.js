import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // If no token, redirect to the login page
  const token = request.cookies.get("access_token");
  console.log(token);

  if (!token) {
    return NextResponse.redirect(new URL("/authentication", request.url));
  }
}

export const config = {
  matcher: "/protected-route/:path*",
};
