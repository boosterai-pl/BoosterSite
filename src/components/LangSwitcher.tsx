"use client";

import type { MouseEvent } from "react";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

// Keeps ?z=..., UTM parameters and the #anchor when switching language,
// so campaign links stay attributed after the visitor changes the language.
function keepQuery(e: MouseEvent<HTMLAnchorElement>) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
  const { search, hash } = window.location;
  if (!search && !hash) return;
  e.preventDefault();
  window.location.assign(`${e.currentTarget.pathname}${search}${hash}`);
}

export function LangSwitcher() {
  // next-intl's usePathname returns the pathname WITHOUT the locale prefix,
  // so the same path works for both locale links below.
  const pathname = usePathname();
  const locale = useLocale();
  const isPolish = locale === "pl";

  return (
    <div className="lang-switcher">
      <Link
        href={pathname}
        locale="pl"
        onClick={keepQuery}
        className={`lang-switcher__option${isPolish ? " lang-switcher__option--active" : ""}`}
        aria-current={isPolish ? "true" : undefined}
      >
        PL
      </Link>
      <span className="lang-switcher__sep" aria-hidden>|</span>
      <Link
        href={pathname}
        locale="en"
        onClick={keepQuery}
        className={`lang-switcher__option${!isPolish ? " lang-switcher__option--active" : ""}`}
        aria-current={!isPolish ? "true" : undefined}
      >
        EN
      </Link>
    </div>
  );
}
