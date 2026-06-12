import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Exclude Payload admin + REST API, /api/og, Next internals, metadata
  // files (sitemap.xml, robots.txt) and any path containing a file extension.
  matcher: [
    "/((?!api|admin|_next|_vercel|sitemap\\.xml|robots\\.txt|.*\\..*).*)",
  ],
};
