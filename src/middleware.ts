import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("job-app-token")?.value;
  const role = req.cookies.get("job-app-role")?.value;
  const { pathname } = req.nextUrl;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (pathname.startsWith("/employer") && role !== "company") {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (pathname.startsWith("/employee") && role !== "job_seeker") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/employer/:path*", "/employee/:path*"],
};
