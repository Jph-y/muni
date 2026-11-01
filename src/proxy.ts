import { NextResponse, type NextRequest } from "next/server";

const COOKIE_SESION = "mdlo_session";

export function proxy(request: NextRequest) {
  const sesion = request.cookies.get(COOKIE_SESION)?.value;

  if (!sesion) {
    const url = new URL("/login", request.url);
    url.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/mi-cuenta", "/mi-cuenta/:path*"],
};
