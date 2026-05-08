"use client";

import { useReveal, useCursorBlob } from "@/lib/hooks";

export function SiteRuntime() {
  useReveal();
  const blobRef = useCursorBlob(true);
  return <div ref={blobRef} className="cursor-blob" aria-hidden />;
}
