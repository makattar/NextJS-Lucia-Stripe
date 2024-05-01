import { INTERNALS } from "next/dist/server/web/spec-extension/request";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request[INTERNALS].nextUrl;
  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*"
};
