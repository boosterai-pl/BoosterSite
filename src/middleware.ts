import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const { pathname } = request.nextUrl;

  // Route the LegalFlow subdomain directly to the /restrukturyzacja page,
  // bypassing locale routing entirely.
  if (host === "restrukturyzacja.boosterai.pl") {
    return NextResponse.rewrite(new URL("/restrukturyzacja", request.url));
  }

  // The /restrukturyzacja route is a standalone, non-localized page — skip
  // next-intl locale routing so it is served as-is.
  if (pathname === "/restrukturyzacja" || pathname.startsWith("/restrukturyzacja/")) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  // Exclude Payload admin + REST API, /api/og, Next internals, metadata
  // files (sitemap.xml, robots.txt) and any path containing a file extension.
  matcher: [
    "/((?!api|admin|_next|_vercel|sitemap\\.xml|robots\\.txt|.*\\..*).*)",
  ],
};
