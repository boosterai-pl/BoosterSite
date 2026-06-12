import { withPayload } from "@payloadcms/next/withPayload";

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

export default withPayload(nextConfig);
