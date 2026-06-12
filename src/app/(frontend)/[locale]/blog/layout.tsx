import type { ReactNode } from "react";
import { loadSite } from "@/content";
import { toSiteLocale, localeHrefPrefix } from "@/i18n/locale";
import { Nav } from "@/components/Nav";
import { SiteRuntime } from "@/components/SiteRuntime";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function BlogLayout({ children, params }: Props) {
  const { locale } = await params;
  const prefix = localeHrefPrefix(locale);
  const site = await loadSite(toSiteLocale(locale));
  const homeLinks = site.nav.map((link) => ({
    ...link,
    href: link.href.startsWith("#") ? `${prefix || ""}/${link.href}` : link.href,
  }));
  return (
    <div className="blog-light-page">
      <SiteRuntime />
      <Nav brand={site.meta.brand} links={homeLinks} cta={site.navCta} logoHref={prefix || "/"} />
      {children}
    </div>
  );
}
