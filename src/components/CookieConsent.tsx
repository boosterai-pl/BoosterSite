"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { initGA4 } from "@/lib/analytics";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type ConsentState = {
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
};

type View = "banner" | "settings" | "hidden";

const STORAGE_KEY = "booster-cookie-consent";
const EXIT_DURATION = 350; // ms — matches CSS animation

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentState;
  } catch {
    return null;
  }
}

function writeConsent(state: ConsentState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/* ------------------------------------------------------------------ */
/*  Script injection                                                   */
/* ------------------------------------------------------------------ */

function loadConsentScripts(consent: ConsentState): void {
  if (consent.analytics) {
    const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    if (gaId) initGA4(gaId);
  }

  if (consent.marketing) {
    // TODO: inject Facebook Pixel / Google Ads when ready
  }
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

type Locale = "pl" | "en";

const t = {
  pl: {
    dialogLabel: "Zgoda na cookies",
    title: "Używamy cookies",
    desc: "Korzystamy z plików cookies, aby analizować ruch na stronie i prowadzić działania marketingowe. Możesz wybrać, na co wyrażasz zgodę.",
    acceptAll: "Akceptuj wszystkie",
    rejectOptional: "Tylko niezbędne",
    customize: "Dostosuj",
    settingsTitle: "Ustawienia cookies",
    necessary: "Niezbędne",
    necessaryDesc: "Wymagane do poprawnego działania strony.",
    analytics: "Analityczne",
    analyticsDesc: "Pomagają nam zrozumieć, jak korzystasz ze strony.",
    marketing: "Marketingowe",
    marketingDesc: "Umożliwiają wyświetlanie spersonalizowanych reklam.",
    save: "Zapisz preferencje",
    back: "Wstecz",
    reopenLabel: "Ustawienia cookies",
  },
  en: {
    dialogLabel: "Cookie consent",
    title: "We use cookies",
    desc: "We use cookies to analyse site traffic and run marketing activities. You can choose what you consent to.",
    acceptAll: "Accept all",
    rejectOptional: "Essential only",
    customize: "Customize",
    settingsTitle: "Cookie settings",
    necessary: "Necessary",
    necessaryDesc: "Required for the site to function correctly.",
    analytics: "Analytics",
    analyticsDesc: "Help us understand how you use the site.",
    marketing: "Marketing",
    marketingDesc: "Allow us to show personalised ads.",
    save: "Save preferences",
    back: "Back",
    reopenLabel: "Cookie settings",
  },
} as const;

export function CookieConsent({ locale = "pl" }: { locale?: Locale }) {
  const tr = t[locale];
  const [view, setView] = useState<View>("hidden");
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [hasSavedConsent, setHasSavedConsent] = useState(false);
  const [dismissing, setDismissing] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* On mount: check localStorage */
  useEffect(() => {
    const saved = readConsent();
    if (saved) {
      setAnalytics(saved.analytics);
      setMarketing(saved.marketing);
      setHasSavedConsent(true);
      loadConsentScripts(saved);
      setView("hidden");
    } else {
      setView("banner");
    }
  }, []);

  /* Cleanup timer on unmount */
  useEffect(() => {
    return () => {
      if (dismissTimer.current) clearTimeout(dismissTimer.current);
    };
  }, []);

  /* Animated dismiss — plays exit animation, then hides */
  const dismiss = useCallback(() => {
    setDismissing(true);
    dismissTimer.current = setTimeout(() => {
      setDismissing(false);
      setView("hidden");
    }, EXIT_DURATION);
  }, []);

  /* Animated view transition (banner <-> settings) */
  const switchView = useCallback((target: "banner" | "settings") => {
    setTransitioning(true);
    setTimeout(() => {
      setView(target);
      setTransitioning(false);
    }, 200); // half-way fade for crossfade effect
  }, []);

  /* Accept all */
  const acceptAll = useCallback(() => {
    const state: ConsentState = {
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    writeConsent(state);
    setAnalytics(true);
    setMarketing(true);
    setHasSavedConsent(true);
    loadConsentScripts(state);
    dismiss();
  }, [dismiss]);

  /* Reject optional */
  const rejectOptional = useCallback(() => {
    const state: ConsentState = {
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    writeConsent(state);
    setAnalytics(false);
    setMarketing(false);
    setHasSavedConsent(true);
    dismiss();
  }, [dismiss]);

  /* Save custom preferences */
  const savePreferences = useCallback(() => {
    const state: ConsentState = {
      analytics,
      marketing,
      timestamp: new Date().toISOString(),
    };
    writeConsent(state);
    setHasSavedConsent(true);
    loadConsentScripts(state);
    dismiss();
  }, [analytics, marketing, dismiss]);

  /* Reopen banner */
  const reopen = useCallback(() => {
    const saved = readConsent();
    if (saved) {
      setAnalytics(saved.analytics);
      setMarketing(saved.marketing);
    }
    setView("settings");
  }, []);

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  if (view === "hidden" && !dismissing) return null;

  const boxClasses = [
    "cookie-box",
    view === "settings" ? "cookie-box--settings" : "",
    dismissing ? "cookie-box--exit" : "",
    transitioning ? "cookie-box--transitioning" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={boxClasses} role="dialog" aria-label={tr.dialogLabel}>
      {view === "banner" && (
        <div className="cookie-content">
          <p className="cookie-title mono cookie-stagger" style={{ animationDelay: "0.05s" }}>
            {tr.title}
          </p>
          <p className="cookie-desc cookie-stagger" style={{ animationDelay: "0.12s" }}>
            {tr.desc}
          </p>
          <div
            className="cookie-actions cookie-stagger"
            style={{ animationDelay: "0.2s" }}
          >
            <button type="button" className="cookie-btn cookie-btn--accept" onClick={acceptAll}>
              {tr.acceptAll}
            </button>
            <button type="button" className="cookie-btn cookie-btn--reject" onClick={rejectOptional}>
              {tr.rejectOptional}
            </button>
            <button type="button" className="cookie-btn cookie-btn--settings" onClick={() => switchView("settings")}>
              {tr.customize}
            </button>
          </div>
        </div>
      )}

      {view === "settings" && (
        <div className="cookie-content">
          <p className="cookie-title mono cookie-stagger" style={{ animationDelay: "0.05s" }}>
            {tr.settingsTitle}
          </p>

          <label className="cookie-toggle cookie-stagger" style={{ animationDelay: "0.1s" }}>
            <span className="cookie-toggle-info">
              <span className="cookie-toggle-label">{tr.necessary}</span>
              <span className="cookie-toggle-desc">{tr.necessaryDesc}</span>
            </span>
            <input type="checkbox" checked disabled />
            <span className="cookie-slider" />
          </label>

          <label className="cookie-toggle cookie-stagger" style={{ animationDelay: "0.16s" }}>
            <span className="cookie-toggle-info">
              <span className="cookie-toggle-label">{tr.analytics}</span>
              <span className="cookie-toggle-desc">{tr.analyticsDesc}</span>
            </span>
            <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />
            <span className="cookie-slider" />
          </label>

          <label className="cookie-toggle cookie-stagger" style={{ animationDelay: "0.22s" }}>
            <span className="cookie-toggle-info">
              <span className="cookie-toggle-label">{tr.marketing}</span>
              <span className="cookie-toggle-desc">{tr.marketingDesc}</span>
            </span>
            <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />
            <span className="cookie-slider" />
          </label>

          <div className="cookie-actions cookie-stagger" style={{ animationDelay: "0.28s" }}>
            <button type="button" className="cookie-btn cookie-btn--accept" onClick={savePreferences}>
              {tr.save}
            </button>
            <button type="button" className="cookie-btn cookie-btn--settings" onClick={() => switchView("banner")}>
              {tr.back}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
