"use client";

import { usePathname } from "next/navigation";

export function LangSwitcher() {
  const pathname = usePathname();
  const isPolish = pathname === "/pl" || pathname.startsWith("/pl/");
  const englishHref = isPolish ? pathname.replace(/^\/pl\/?/, "/") : pathname;
  const polishHref = isPolish ? pathname : `/pl${pathname === "/" ? "" : pathname}`;

  return (
    <div className="lang-switcher">
      <a
        href={englishHref}
        className={`lang-switcher__option${!isPolish ? " lang-switcher__option--active" : ""}`}
        aria-current={!isPolish ? "true" : undefined}
      >
        EN
      </a>
      <span className="lang-switcher__sep" aria-hidden>|</span>
      <a
        href={polishHref}
        className={`lang-switcher__option${isPolish ? " lang-switcher__option--active" : ""}`}
        aria-current={isPolish ? "true" : undefined}
      >
        PL
      </a>
    </div>
  );
}
