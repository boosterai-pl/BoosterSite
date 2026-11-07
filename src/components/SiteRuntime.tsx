"use client";

import {
  useReveal,
  useClickTracking,
  useSectionTracking,
  useEngagementTime,
} from "@/lib/hooks";

export function SiteRuntime() {
  useReveal();
  useClickTracking();
  useSectionTracking();
  useEngagementTime();
  return null;
}
