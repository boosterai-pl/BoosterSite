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
      // Serve the landing page at /restrukturyzacja path
      {
        source: "/restrukturyzacja",
        destination: "/restrukturyzacja/index.html",
      },
      {
        source: "/restrukturyzacja/",
        destination: "/restrukturyzacja/index.html",
      },
      // Serve the landing page when accessed via restrukturyzacja.boosterai.pl subdomain
      {
        source: "/",
        has: [{ type: "host", value: "restrukturyzacja.boosterai.pl" }],
        destination: "/restrukturyzacja/index.html",
      },
    ];
  },
};

export default withPayload(nextConfig);
