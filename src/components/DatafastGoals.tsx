"use client";

import { useDatafastGoals, usePreserveAdParams } from "@/lib/hooks";

/** Sends Datafast click goals and keeps ad click parameters on internal links, on every page of the site. */
export function DatafastGoals() {
  useDatafastGoals();
  usePreserveAdParams();
  return null;
}
