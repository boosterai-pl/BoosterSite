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
  const isPolish = pathname === "/pl" || pathname.startsWith("/pl/");
  const homePath = isPolish ? "/pl" : "/";

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
          return (
            <a key={link.href + link.label} href={resolved}>
              {link.label}
            </a>
          );
        })}
      </div>
      <LangSwitcher />
      <a
        href={cta.href}
        className="nav-cta"
        {...(cta.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        <span className="dot" />
        {cta.label}
      </a>
    </nav>
  );
}
