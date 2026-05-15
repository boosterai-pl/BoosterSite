import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import plMessages from "../../../messages/pl.json";

export default function PlLayout({ children }: { children: ReactNode }) {
  return (
    <NextIntlClientProvider locale="pl" messages={plMessages}>
      {children}
    </NextIntlClientProvider>
  );
}
