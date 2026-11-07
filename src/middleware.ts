import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "@/i18n/routing";
import { legalFlowHref } from "@/content/links";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const { pathname } = request.nextUrl;

  // The LegalFlow subdomain now lives at legal-flow.pl.
  if (host === "restrukturyzacja.boosterai.pl") {
    return NextResponse.redirect(legalFlowHref("/", "restrukturyzacja-subdomain", "pl"), 308);
  }

  // The /restrukturyzacja route is a standalone, non-localized page — skip
  // next-intl locale routing so it is served as-is.
  if (pathname === "/restrukturyzacja" || pathname.startsWith("/restrukturyzacja/")) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  // Exclude /api/og, Next internals, metadata files (sitemap.xml,
  // robots.txt) and any path containing a file extension.
  matcher: [
    "/((?!api|_next|_vercel|sitemap\\.xml|robots\\.txt|.*\\..*).*)",
  ],
};
