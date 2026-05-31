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

export function CookieConsent() {
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

  /* Floating reopen button (always visible when consent was given) */
  if (view === "hidden" && !dismissing) {
    if (!hasSavedConsent) return null;
    return (
      <button
        type="button"
        className="cookie-reopen mono"
        onClick={reopen}
        aria-label="Ustawienia cookies"
      >
        Cookies
      </button>
    );
  }

  const boxClasses = [
    "cookie-box",
    view === "settings" ? "cookie-box--settings" : "",
    dismissing ? "cookie-box--exit" : "",
    transitioning ? "cookie-box--transitioning" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={boxClasses} role="dialog" aria-label="Zgoda na cookies">
      {view === "banner" && (
        <div className="cookie-content">
          <p className="cookie-title mono cookie-stagger" style={{ animationDelay: "0.05s" }}>
            Uzywamy cookies
          </p>
          <p className="cookie-desc cookie-stagger" style={{ animationDelay: "0.12s" }}>
            Korzystamy z plikow cookies, aby analizowac ruch na stronie i
            prowadzic dzialania marketingowe. Mozesz wybrac, na co wyrazasz
            zgode.
          </p>
          <div
            className="cookie-actions cookie-stagger"
            style={{ animationDelay: "0.2s" }}
          >
            <button
              type="button"
              className="cookie-btn cookie-btn--accept"
              onClick={acceptAll}
            >
              Akceptuj wszystkie
            </button>
            <button
              type="button"
              className="cookie-btn cookie-btn--reject"
              onClick={rejectOptional}
            >
              Tylko niezbedne
            </button>
            <button
              type="button"
              className="cookie-btn cookie-btn--settings"
              onClick={() => switchView("settings")}
            >
              Dostosuj
            </button>
          </div>
        </div>
      )}

      {view === "settings" && (
        <div className="cookie-content">
          <p className="cookie-title mono cookie-stagger" style={{ animationDelay: "0.05s" }}>
            Ustawienia cookies
          </p>

          {/* Necessary — always on */}
          <label
            className="cookie-toggle cookie-stagger"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="cookie-toggle-info">
              <span className="cookie-toggle-label">Niezbedne</span>
              <span className="cookie-toggle-desc">
                Wymagane do poprawnego dzialania strony.
              </span>
            </span>
            <input type="checkbox" checked disabled />
            <span className="cookie-slider" />
          </label>

          {/* Analytics */}
          <label
            className="cookie-toggle cookie-stagger"
            style={{ animationDelay: "0.16s" }}
          >
            <span className="cookie-toggle-info">
              <span className="cookie-toggle-label">Analityczne</span>
              <span className="cookie-toggle-desc">
                Pomagaja nam zrozumiec, jak korzystasz ze strony.
              </span>
            </span>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
            />
            <span className="cookie-slider" />
          </label>

          {/* Marketing */}
          <label
            className="cookie-toggle cookie-stagger"
            style={{ animationDelay: "0.22s" }}
          >
            <span className="cookie-toggle-info">
              <span className="cookie-toggle-label">Marketingowe</span>
              <span className="cookie-toggle-desc">
                Umozliwiaja wyswietlanie spersonalizowanych reklam.
              </span>
            </span>
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
            />
            <span className="cookie-slider" />
          </label>

          <div
            className="cookie-actions cookie-stagger"
            style={{ animationDelay: "0.28s" }}
          >
            <button
              type="button"
              className="cookie-btn cookie-btn--accept"
              onClick={savePreferences}
            >
              Zapisz preferencje
            </button>
            <button
              type="button"
              className="cookie-btn cookie-btn--settings"
              onClick={() => switchView("banner")}
            >
              Wstecz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
