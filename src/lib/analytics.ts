/* ------------------------------------------------------------------ */
/*  GA4 Analytics Module                                               */
/*  Central analytics layer — all GA4 interaction goes through here.   */
/*  Components never call gtag() directly.                             */
/* ------------------------------------------------------------------ */

/* ---- Global type declarations ------------------------------------ */

type GtagCommand = "config" | "event" | "consent" | "js" | "set";

interface GtagFn {
  (command: "js", date: Date): void;
  (command: "config", targetId: string, params?: Record<string, unknown>): void;
  (command: "event", eventName: string, params?: Record<string, unknown>): void;
  (command: "consent", action: "default" | "update", params: Record<string, string>): void;
  (command: "set", params: Record<string, unknown>): void;
  (command: GtagCommand, ...args: unknown[]): void;
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: GtagFn;
  }
}

/* ---- State ------------------------------------------------------- */

let ga4Loaded = false;
let measurementId = "";

/* ---- Core -------------------------------------------------------- */

/**
 * Dynamically inject the GA4 gtag.js script and configure it.
 * Safe to call multiple times — only the first call has effect.
 */
export function initGA4(id: string): void {
  if (ga4Loaded || typeof window === "undefined" || !id || id === "G-XXXXXXXXXX") return;

  measurementId = id;

  // dataLayer + gtag shim
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  } as GtagFn;

  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    send_page_view: true,
  });

  // Inject script tag
  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.async = true;
  document.head.appendChild(script);

  ga4Loaded = true;
}

/** Check if GA4 has been initialised. */
export function isGA4Loaded(): boolean {
  return ga4Loaded;
}

/* ---- Generic event helper --------------------------------------- */

export function trackEvent(
  name: string,
  params?: Record<string, unknown>,
): void {
  if (!ga4Loaded || typeof window === "undefined") return;
  window.gtag("event", name, params);
}

/* ---- Domain-specific events ------------------------------------- */

/** CTA / button click */
export function trackButtonClick(
  buttonText: string,
  section: string,
  href: string,
): void {
  trackEvent("cta_click", {
    button_text: buttonText.trim().slice(0, 100),
    section,
    link_url: href,
  });
}

/** Service card click */
export function trackServiceClick(serviceName: string, href: string): void {
  trackEvent("service_click", {
    service_name: serviceName.trim().slice(0, 100),
    link_url: href,
  });
}

/** Nav link click */
export function trackNavClick(label: string, targetSection: string): void {
  trackEvent("nav_click", {
    link_label: label.trim(),
    target_section: targetSection,
  });
}

/** Footer link click */
export function trackFooterClick(
  text: string,
  href: string,
  column: string,
): void {
  trackEvent("footer_link_click", {
    link_text: text.trim(),
    link_url: href,
    column,
  });
}

/** Section enters viewport */
export function trackSectionView(sectionId: string): void {
  trackEvent("section_view", {
    section_id: sectionId,
  });
}

/** Full section journey sent on page unload */
export function trackSectionJourney(journey: string): void {
  trackEvent("section_journey", {
    journey,
  });
}

/** Engagement time — per-section breakdown on unload */
export function trackPageEngagement(
  totalSeconds: number,
  sectionTimes: Record<string, number>,
): void {
  trackEvent("page_engagement", {
    total_seconds: Math.round(totalSeconds),
    section_times: JSON.stringify(sectionTimes),
  });
}

/** Navigation method — scroll vs nav click */
export function trackNavigationMethod(
  sectionId: string,
  method: "scroll" | "nav_click",
): void {
  trackEvent("navigation_method", {
    section_id: sectionId,
    method,
  });
}
