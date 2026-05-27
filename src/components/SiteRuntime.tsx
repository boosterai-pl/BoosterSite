"use client";

import {
  useReveal,
  useCursorBlob,
  useClickTracking,
  useSectionTracking,
  useEngagementTime,
} from "@/lib/hooks";

export function SiteRuntime() {
  useReveal();
  useClickTracking();
  useSectionTracking();
  useEngagementTime();
  const blobRef = useCursorBlob(true);
  return <div ref={blobRef} className="cursor-blob" aria-hidden />;
}
