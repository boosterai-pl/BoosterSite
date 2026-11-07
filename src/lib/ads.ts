/* ------------------------------------------------------------------ */
/*  Ad measurement: Google Ads tag, Meta Pixel, consent handling.      */
/*  Google loads from the layout head in Consent Mode v2 (denied by     */
/*  default); Meta loads only after the visitor accepts marketing.      */
/* ------------------------------------------------------------------ */

export const GOOGLE_ADS_ID = "AW-18511091888";
export const GOOGLE_ADS_FORM_CONVERSION = `${GOOGLE_ADS_ID}/2WFYCNCCkbQdELCx4_pE`;
export const CONSENT_STORAGE_KEY = "booster-cookie-consent";

// "Booster AI - Pixel". A pixel ID is public. NEXT_PUBLIC_META_PIXEL_ID overrides it; set it empty to turn the pixel off.
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "1871005757257441";

type Fbq = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  loaded: boolean;
  version: string;
  push: Fbq;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

let metaLoaded = false;

/** Tell Google Consent Mode what the visitor chose. */
export function updateGoogleConsent(analytics: boolean, marketing: boolean): void {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("consent", "update", {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: marketing ? "granted" : "denied",
    ad_user_data: marketing ? "granted" : "denied",
    ad_personalization: marketing ? "granted" : "denied",
  });
}

/** Load the Meta Pixel and send PageView. Safe to call repeatedly; no-op without an ID. */
export function initMetaPixel(): void {
  if (metaLoaded || typeof window === "undefined" || !META_PIXEL_ID) return;
  metaLoaded = true;

  const fbq: Fbq = Object.assign(
    (...args: unknown[]) => {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue.push(args);
    },
    { queue: [], loaded: true, version: "2.0" } as Pick<Fbq, "queue" | "loaded" | "version">,
  ) as Fbq;
  fbq.push = fbq;
  window.fbq = window._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  fbq("init", META_PIXEL_ID);
  fbq("track", "PageView");
}

/** Stop Meta tracking after the visitor withdraws marketing consent. */
export function revokeMetaPixel(): void {
  window.fbq?.("consent", "revoke");
}

/** Successful contact form: Google Ads conversion + Meta Lead. Call once per submission. */
export function trackLeadConversion(): void {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "conversion", { send_to: GOOGLE_ADS_FORM_CONVERSION });
  window.fbq?.("track", "Lead");
}
