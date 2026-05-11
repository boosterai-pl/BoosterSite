import type { ReactNode } from "react";

export const metadata = {
  title: "Booster CMS",
};

export default function PayloadLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
