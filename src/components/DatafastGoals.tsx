"use client";

import { useDatafastGoals } from "@/lib/hooks";

/** Sends Datafast click goals on every page of the site. */
export function DatafastGoals() {
  useDatafastGoals();
  return null;
}
