import type { ReactNode } from "react";
import { loadSite } from "@/content";
import { Nav } from "@/components/Nav";
import { SiteRuntime } from "@/components/SiteRuntime";

export default async function BlogLayout({ children }: { children: ReactNode }) {
  const site = await loadSite();
  return (
    <div className="blog-light-page">
      <SiteRuntime />
      <Nav brand={site.meta.brand} links={site.nav} cta={site.navCta} />
      {children}
    </div>
  );
}
