"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  isGA4Loaded,
  trackButtonClick,
  trackServiceClick,
  trackNavClick,
  trackFooterClick,
  trackSectionView,
  trackSectionJourney,
  trackNavigationMethod,
  trackPageEngagement,
} from "@/lib/analytics";

export function useReveal(): void {
  useEffect(() => {
    // Gate the hidden-by-default CSS: only add opacity:0 once JS is ready
    // to manage the IntersectionObserver. Without this class, content stays
    // visible — a safe fallback for bfcache restores and broken hydration.
    document.documentElement.classList.add("js-reveal");

    const els = document.querySelectorAll<HTMLElement>(
      "[data-reveal], [data-reveal-stagger], .word-reveal",
    );

    // Elements already in or above the viewport (e.g. after back-navigation
    // restores scroll position) will never intersect, so reveal them now.
    const viewportBottom = window.innerHeight;
    els.forEach((el) => {
      if (el.getBoundingClientRect().bottom < viewportBottom) {
        el.classList.add("visible");
      }
    });

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    els.forEach((el) => {
      if (!el.classList.contains("visible")) {
        io.observe(el);
      }
    });
    return () => {
      io.disconnect();
      document.documentElement.classList.remove("js-reveal");
    };
  }, []);
}

export function useScrolledNav(): { scrolled: boolean; onLight: boolean } {
  const [scrolled, setScrolled] = useState(false);
  const [onLight, setOnLight] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const navH = 70;
      const els = document.elementsFromPoint(window.innerWidth / 2, navH);
      const el = els.find((e) => !e.closest("nav"));
      const lightSection =
        el && el instanceof Element ? el.closest(".block.light, .light-zone") : null;
      setOnLight(!!lightSection);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { scrolled, onLight };
}

export function useCursorBlob(enabled: boolean) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;

    const move = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const tick = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  return ref;
}

/* ------------------------------------------------------------------ */
/*  Analytics: click delegation                                        */
/* ------------------------------------------------------------------ */

/**
 * Single global click listener that captures all trackable interactions.
 * Runs in SiteRuntime so Server Components stay untouched.
 */
export function useClickTracking(): void {
  // Track last nav click timestamp to distinguish scroll vs nav arrivals
  const lastNavClick = useRef(0);

  const getLastNavClick = useCallback(() => lastNavClick.current, []);
  const setLastNavClick = useCallback((t: number) => {
    lastNavClick.current = t;
  }, []);

  useEffect(() => {
    // Expose getter for section tracking hook
    (window as unknown as Record<string, unknown>).__lastNavClick = getLastNavClick;

    function handler(e: MouseEvent) {
      if (!isGA4Loaded()) return;

      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";
      const text = anchor.textContent ?? "";

      // --- Nav CTA (Book a free AI consultation) ---
      if (anchor.classList.contains("nav-cta")) {
        trackButtonClick(text, "nav", href);
        return;
      }

      // --- Nav link (Services, Work, Process, etc.) ---
      if (anchor.closest(".nav-links")) {
        const targetSection = href.replace(/^.*#/, "");
        trackNavClick(text, targetSection);
        setLastNavClick(Date.now());
        return;
      }

      // --- Service card ---
      if (anchor.classList.contains("service-card")) {
        const title = anchor.querySelector("h3")?.textContent ?? text;
        trackServiceClick(title, href);
        return;
      }

      // --- CTA buttons (primary & ghost) ---
      if (anchor.classList.contains("btn-primary") || anchor.classList.contains("btn-ghost")) {
        const section = anchor.closest("section")?.id ?? "unknown";
        trackButtonClick(text, section, href);
        return;
      }

      // --- Footer links ---
      if (anchor.closest("footer")) {
        const column = anchor.closest(".footer-col")?.querySelector("h4")?.textContent ?? "brand";
        trackFooterClick(text, href, column);
        return;
      }
    }

    document.addEventListener("click", handler, { capture: true });
    return () => document.removeEventListener("click", handler, { capture: true });
  }, [getLastNavClick, setLastNavClick]);
}

/* ------------------------------------------------------------------ */
/*  Analytics: section visibility tracking                             */
/* ------------------------------------------------------------------ */

/**
 * Observes all <section> elements with an id.
 * Fires section_view events + tracks journey order + navigation method.
 */
export function useSectionTracking(): void {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const visited: string[] = [];
    const observed = new Set<string>();

    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (!isGA4Loaded()) return;

        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const id = (entry.target as HTMLElement).id;
          if (observed.has(id)) continue;
          observed.add(id);

          trackSectionView(id);
          visited.push(id);

          // Determine if user scrolled or used nav
          const getLastNav = (window as unknown as Record<string, unknown>)
            .__lastNavClick as (() => number) | undefined;
          const lastNav = getLastNav ? getLastNav() : 0;
          const method = Date.now() - lastNav < 800 ? "nav_click" : "scroll";
          trackNavigationMethod(id, method);
        }
      },
      { threshold: 0.5 },
    );

    sections.forEach((el) => io.observe(el));

    // Send journey on unload
    function sendJourney() {
      if (visited.length > 0 && isGA4Loaded()) {
        trackSectionJourney(visited.join(","));
      }
    }

    window.addEventListener("beforeunload", sendJourney);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") sendJourney();
    });

    return () => {
      io.disconnect();
      window.removeEventListener("beforeunload", sendJourney);
    };
  }, []);
}

/* ------------------------------------------------------------------ */
/*  Analytics: engagement time per section                             */
/* ------------------------------------------------------------------ */

/**
 * Measures time spent in each visible section.
 * Sends page_engagement event on page hide / unload.
 */
export function useEngagementTime(): void {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const startTime = Date.now();
    const sectionTimes: Record<string, number> = {};
    let currentSection = "";
    let sectionStart = 0;

    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id;

          if (entry.isIntersecting) {
            // Flush previous section time
            if (currentSection && sectionStart > 0) {
              const elapsed = (Date.now() - sectionStart) / 1000;
              sectionTimes[currentSection] = (sectionTimes[currentSection] ?? 0) + elapsed;
            }
            currentSection = id;
            sectionStart = Date.now();
          } else if (id === currentSection) {
            // Current section left viewport
            const elapsed = (Date.now() - sectionStart) / 1000;
            sectionTimes[currentSection] = (sectionTimes[currentSection] ?? 0) + elapsed;
            currentSection = "";
            sectionStart = 0;
          }
        }
      },
      { threshold: 0.5 },
    );

    sections.forEach((el) => io.observe(el));

    function sendEngagement() {
      if (!isGA4Loaded()) return;

      // Flush current section
      if (currentSection && sectionStart > 0) {
        const elapsed = (Date.now() - sectionStart) / 1000;
        sectionTimes[currentSection] = (sectionTimes[currentSection] ?? 0) + elapsed;
      }

      const totalSeconds = (Date.now() - startTime) / 1000;

      // Round all values
      const rounded: Record<string, number> = {};
      for (const [k, v] of Object.entries(sectionTimes)) {
        rounded[k] = Math.round(v);
      }

      trackPageEngagement(totalSeconds, rounded);
    }

    window.addEventListener("beforeunload", sendEngagement);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") sendEngagement();
    });

    return () => {
      io.disconnect();
      window.removeEventListener("beforeunload", sendEngagement);
    };
  }, []);
}
