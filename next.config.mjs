import { withPayload } from "@payloadcms/next/withPayload";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "restrukturyzacja.boosterai.pl" }],
        destination: "/restrukturyzacja",
      },
    ];
  },
};

export default withNextIntl(withPayload(nextConfig));
