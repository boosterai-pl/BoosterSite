"use client";

import { useEffect } from "react";

// Animations that must play in step across the page (buttons, nav rocket, hero chart).
const SYNCED = /^(alive-|dot-|growth-flow)/;

/** Pins every synced CSS animation to the start of the document timeline, so all buttons wave and
 *  change colour together, including ones that appear later (navigation, hover end, menus). */
export function AliveSync() {
  useEffect(() => {
    if (typeof document.getAnimations !== "function") return;
    let frame = 0;
    const sync = () => {
      frame = 0;
      for (const a of document.getAnimations()) {
        if (a instanceof CSSAnimation && SYNCED.test(a.animationName) && a.startTime !== 0) a.startTime = 0;
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(sync);
    };
    schedule();
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { childList: true, subtree: true });
    // Hover sets animation: none; when the pointer leaves, the animation restarts and needs re-pinning.
    document.addEventListener("pointerout", schedule, { passive: true });
    document.addEventListener("animationstart", schedule);
    return () => {
      observer.disconnect();
      document.removeEventListener("pointerout", schedule);
      document.removeEventListener("animationstart", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}
