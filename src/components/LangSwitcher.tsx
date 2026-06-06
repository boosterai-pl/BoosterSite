"use client";

import { usePathname } from "next/navigation";

export function LangSwitcher() {
  const pathname = usePathname();
  // Normalize: strip trailing /index that Next.js static build can expose
  const normalized = pathname.replace(/\/index$/, "") || "/";
  const isPolish = normalized === "/pl" || normalized.startsWith("/pl/");
  const stripped = normalized.replace(/^\/pl(\/|$)/, "");
  const englishHref = isPolish ? (stripped ? `/${stripped}` : "/") : normalized;
  const polishHref = isPolish ? normalized : `/pl${normalized === "/" ? "" : normalized}`;

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
