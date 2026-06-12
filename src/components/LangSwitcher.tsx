"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

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
        locale="en"
        className={`lang-switcher__option${!isPolish ? " lang-switcher__option--active" : ""}`}
        aria-current={!isPolish ? "true" : undefined}
      >
        EN
      </Link>
      <span className="lang-switcher__sep" aria-hidden>|</span>
      <Link
        href={pathname}
        locale="pl"
        className={`lang-switcher__option${isPolish ? " lang-switcher__option--active" : ""}`}
        aria-current={isPolish ? "true" : undefined}
      >
        PL
      </Link>
    </div>
  );
}
