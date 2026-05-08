"use client";

import type { NavLink } from "@/content/types";
import { useScrolledNav } from "@/lib/hooks";

type Props = {
  brand: string;
  links: readonly NavLink[];
  cta: { label: string; href: string };
};

export function Nav({ brand, links, cta }: Props) {
  const { scrolled, onLight } = useScrolledNav();
  const classes = ["nav"];
  if (scrolled) classes.push("scrolled");
  if (onLight) classes.push("on-light");

  return (
    <nav className={classes.join(" ")}>
      <a href="#top" className="nav-logo">
        <img src="/assets/booster-rocket.png" alt={`${brand} logo`} />
        <span>{brand}</span>
      </a>
      <div className="nav-links">
        {links.map((link) => (
          <a key={link.href + link.label} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
      <a href={cta.href} className="nav-cta">
        <span className="dot" />
        {cta.label}
      </a>
    </nav>
  );
}
