import createMiddleware from "next-intl/middleware";
import { type NextFetchEvent, type NextRequest, NextResponse } from "next/server";
import { trackAICrawlerRequest } from "@datafast/ai-crawl";
import { routing } from "@/i18n/routing";
import { legalFlowHref } from "@/content/links";

const intlMiddleware = createMiddleware(routing);

// Same website ID as the DataFast browser script in the locale layout.
const DATAFAST_WEBSITE_ID = "dfid_tg468q8wxZ0nWQgvnEQNn";

export default function middleware(request: NextRequest, event: NextFetchEvent) {
  // DataFast bot traffic: reports AI assistants and search/training crawlers server-side
  // (they often skip JavaScript). Best-effort and runs in the background via event.waitUntil;
  // it must not be awaited.
  trackAICrawlerRequest(request, event, { websiteId: DATAFAST_WEBSITE_ID });

  const host = request.headers.get("host") ?? "";
  const { pathname } = request.nextUrl;

  // The LegalFlow subdomain now lives at legal-flow.pl.
  if (host === "restrukturyzacja.boosterai.pl") {
    return NextResponse.redirect(legalFlowHref("/", "restrukturyzacja-subdomain", "pl"), 308);
  }

  // Crawler-facing files (robots.txt, sitemap.xml, llms.txt, ...) pass through the matcher only
  // so bot requests to them are tracked; they are served as-is, without locale routing.
  if (/\.[a-z0-9]+$/i.test(pathname)) {
    return NextResponse.next();
  }

  // The /restrukturyzacja route is a standalone, non-localized page — skip
  // next-intl locale routing so it is served as-is.
  if (pathname === "/restrukturyzacja" || pathname.startsWith("/restrukturyzacja/")) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  // Exclude /api, Next internals and static assets (images, scripts, styles, fonts).
  // Text files such as robots.txt, llms.txt and sitemap.xml stay in, so crawler requests to them
  // reach the DataFast tracking above.
  matcher: [
    "/((?!api|_next|_vercel|.*\\.(?:png|jpe?g|gif|svg|ico|webp|avif|css|js|map|woff2?|ttf|otf|pdf|mp4|webm)$).*)",
  ],
};
