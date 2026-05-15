"use client";

import { usePathname } from "next/navigation";

export function LangSwitcher() {
  const pathname = usePathname();
  const isPolish = pathname === "/pl" || pathname.startsWith("/pl/");

  return (
    <div className="lang-switcher">
      <a
        href="/"
        className={`lang-switcher__option${!isPolish ? " lang-switcher__option--active" : ""}`}
        aria-current={!isPolish ? "true" : undefined}
      >
        EN
      </a>
      <span className="lang-switcher__sep" aria-hidden>|</span>
      <a
        href="/pl"
        className={`lang-switcher__option${isPolish ? " lang-switcher__option--active" : ""}`}
        aria-current={isPolish ? "true" : undefined}
      >
        PL
      </a>
    </div>
  );
}
