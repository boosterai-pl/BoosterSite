"use client";

import { usePathname } from "next/navigation";
import type { NavLink } from "@/content/types";
import { useScrolledNav } from "@/lib/hooks";
import { LangSwitcher } from "@/components/LangSwitcher";

type Props = {
  brand: string;
  links: readonly NavLink[];
  cta: { label: string; href: string };
  logoHref?: string;
};

export function Nav({ brand, links, cta, logoHref = "#top" }: Props) {
  const { scrolled, onLight } = useScrolledNav();
  const pathname = usePathname();
  const homePath = pathname === "/pl" || pathname.startsWith("/pl/") ? "/pl" : "/en";

  const classes = ["nav"];
  if (scrolled) classes.push("scrolled");
  if (onLight) classes.push("on-light");

  return (
    <nav className={classes.join(" ")}>
      <a href={logoHref} className="nav-logo">
        <img src="/assets/booster-rocket.png" alt={`${brand} logo`} className="nav-logo-img" />
        <span>{brand}</span>
      </a>
      <div className="nav-links">
        {links.map((link) => {
          const resolved = link.href.startsWith("#") && pathname !== homePath
            ? `${homePath}${link.href}`
            : link.href;
          if (!link.children?.length) {
            return (
              <a key={link.href + link.label} href={resolved}>
                {link.label}
              </a>
            );
          }
          return (
            <div key={link.href + link.label} className="nav-drop">
              <a href={resolved} aria-haspopup="true">
                {link.label}
                <span className="nav-drop-caret" aria-hidden="true" />
              </a>
              <div className="nav-drop-menu">
                {link.children.map((child) => (
                  <a key={child.href} href={child.href}>
                    {child.label}
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <LangSwitcher />
      <a
        href={cta.href}
        className="nav-cta btn-alive"
        {...(cta.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        <span className="dot" />
        {cta.label}
      </a>
    </nav>
  );
}
