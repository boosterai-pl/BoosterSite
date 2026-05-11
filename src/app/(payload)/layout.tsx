/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import type { ReactNode } from "react";

import config from "@payload-config";
import { RootLayout } from "@payloadcms/next/layouts";
import "@payloadcms/next/css";
import { importMap } from "./admin/importMap";
import { serverFunction } from "./actions";

type Args = {
  children: ReactNode;
};

export default async function Layout({ children }: Args) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  );
}
