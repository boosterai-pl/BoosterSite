import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
  },
  // Markdown content (blog posts, job roles) is read from disk. Most pages are
  // prerendered at build time, but /blog reads ?page= at request time, so the
  // files must ship with the server bundle.
  outputFileTracingIncludes: {
    "/**": ["./src/content/**/*.md"],
  },
};

export default withNextIntl(nextConfig);
