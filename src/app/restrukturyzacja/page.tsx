"use client";

import { useEffect, useRef, useState } from "react";
import "./legalflow.css";

const WORKER_URL = "https://clickup-lead-proxy.szymon-sidor.workers.dev";
const CAL_URL = "https://cal.com/szymon-bazan-iahn2z/30min";

type FormState = "form" | "success";

type LeadResponse = { error?: string };

function isLeadResponse(value: unknown): value is LeadResponse {
  return typeof value === "object" && value !== null;
}

export default function RestrukturyzacjaPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [formState, setFormState] = useState<FormState>("form");
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [onLight, setOnLight] = useState(false);
  const year = new Date().getFullYear();

  const rootRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const pillarsRef = useRef<HTMLElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Nav scrolled state + on-light detection over light sections
  useEffect(() => {
    const header = headerRef.current;
    const root = rootRef.current;
    if (!header || !root) return;
    const lightSections = Array.from(root.querySelectorAll<HTMLElement>("section.light"));
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const navBottom = header.getBoundingClientRect().bottom;
      const overLight = lightSections.some((s) => {
        const r = s.getBoundingClientRect();
        return r.top <= navBottom && r.bottom >= navBottom;
      });
      setOnLight(overLight);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Pillars staggered entry animation
  useEffect(() => {
    const root = pillarsRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    const pillars = Array.from(root.querySelectorAll<HTMLElement>(".pillar"));
    pillars.forEach((p, i) => {
      p.style.opacity = "0";
      p.style.transform = "translateY(18px)";
      p.style.transition = `opacity .6s ease ${i * 120}ms, transform .6s ease ${i * 120}ms, box-shadow .3s ease, border-color .25s ease`;
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          io.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    pillars.forEach((p) => io.observe(p));
    return () => io.disconnect();
  }, []);

  // Body scroll lock + focus when modal opens
  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    if (modalOpen) {
      const t = window.setTimeout(() => phoneRef.current?.focus(), 80);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, [modalOpen]);

  // Escape to close modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && modalOpen) closeModal();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen]);

  useEffect(
    () => () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    },
    [],
  );

  function openModal(e: React.MouseEvent<HTMLElement>) {
    lastFocusRef.current = e.currentTarget;
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setFormState("form");
    setFormError(null);
    setSubmitting(false);
    if (phoneRef.current) phoneRef.current.value = "";
    if (nameRef.current) nameRef.current.value = "";
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    lastFocusRef.current?.focus();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    const phone = (phoneRef.current?.value ?? "").trim();
    const name = (nameRef.current?.value ?? "").trim();
    if (!/^[+\s0-9\-()]{7,}$/.test(phone)) {
      setFormError("Podaj prawidłowy numer telefonu.");
      phoneRef.current?.focus();
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, name, source: "LegalFlow landing — Skontaktuj się" }),
      });
      if (!res.ok) {
        let msg = "Coś poszło nie tak. Spróbuj ponownie za chwilę.";
        try {
          const data: unknown = await res.json();
          if (isLeadResponse(data) && data.error === "Provide a valid email or phone") {
            msg = "Podaj prawidłowy numer telefonu.";
          }
        } catch {
          /* ignore */
        }
        throw new Error(msg);
      }
      setFormState("success");
      setSubmitting(false);
      closeTimerRef.current = setTimeout(() => setModalOpen(false), 4000);
    } catch (err) {
      setSubmitting(false);
      setFormError(err instanceof Error ? err.message : "Nie udało się wysłać. Spróbuj ponownie.");
    }
  }

  const headerClass = `site-header${scrolled ? " scrolled" : ""}${onLight ? " on-light" : ""}`;

  return (
    <div className="lf" ref={rootRef} id="top">
      <header className={headerClass} role="banner" ref={headerRef}>
        <div className="container header-inner">
          <a href="#top" className="logo" aria-label="LegalFlow strona główna">
            <img src="/assets/booster-rocket.png" alt="Booster AI" />
            <span className="logo-text">
              LegalFlow<span>.</span>
            </span>
          </a>

          <nav className="site-nav" aria-label="Nawigacja główna">
            <a href="#moduly">Moduły</a>
            <a href="#jak-to-dziala">Jak to działa</a>
            <a href="#dlaczego">Dlaczego LegalFlow</a>
            <a href="#korzysci">Korzyści</a>
            <a href="#faq">FAQ</a>
          </nav>

          <a className="header-cta" href={CAL_URL} target="_blank" rel="noopener" data-cta="header">
            <span className="dot" />
            Zobacz demo
          </a>

          <button
            className="mobile-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
        </div>

        <div id="mobile-menu" className="mobile-menu container" data-open={String(menuOpen)}>
          <nav aria-label="Nawigacja mobilna">
            <a href="#moduly" onClick={() => setMenuOpen(false)}>
              Moduły
            </a>
            <a href="#jak-to-dziala" onClick={() => setMenuOpen(false)}>
              Jak to działa
            </a>
            <a href="#dlaczego" onClick={() => setMenuOpen(false)}>
              Dlaczego LegalFlow
            </a>
            <a href="#korzysci" onClick={() => setMenuOpen(false)}>
              Korzyści
            </a>
            <a href="#faq" onClick={() => setMenuOpen(false)}>
              FAQ
            </a>
          </nav>
          <a className="btn btn-primary" href={CAL_URL} target="_blank" rel="noopener" data-cta="mobile-menu">
            Zobacz demo →
          </a>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-grid-bg" aria-hidden="true" />
          <div className="container">
            <div className="lf-hero-grid">
              <div>
                <span className="eyebrow">Dla kancelarii restrukturyzacyjnych</span>
                <h1>
                  Automatyzacja, która <span className="accent">odciąża</span> kancelarię nie zastępuje prawnika.
                </h1>
                <p className="lf-hero-sub">
                  Komunikacja z klientem, dokumentacja postępowania i pełna kontrola nad płynnością kancelarii w jednym
                  audytowalnym systemie. Twój zespół skupia się na prawie, nie na administracji.
                </p>
                <div className="hero-cta-row">
                  <a className="btn btn-primary btn-lg" href={CAL_URL} target="_blank" rel="noopener" data-cta="hero">
                    Zobacz demo
                    <span className="arrow">→</span>
                  </a>
                  <a className="btn btn-ghost btn-lg" href="#moduly" data-cta="hero-secondary">
                    Poznaj moduły
                  </a>
                </div>
                <div className="hero-trust" aria-label="Zaufanie">
                  <span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>{" "}
                    Wdrożenie end-to-end
                  </span>
                  <span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>{" "}
                    Szkolenie zespołu w cenie
                  </span>
                  <span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>{" "}
                    Integracja z Twoim CRM
                  </span>
                </div>
              </div>

              <div className="hero-visual" aria-hidden="true">
                <div className="hero-glow" />

                <div className="hero-card hero-app">
                  <div className="hero-app-bar">
                    <div className="hero-app-brand">
                      <span className="hero-app-icon">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path d="M7 5h9a3 3 0 0 1 0 6H9v3h9" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="7" cy="19" r="2" fill="white" />
                          <circle cx="18" cy="19" r="2" fill="white" />
                          <path d="M9 19h7" stroke="white" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </span>
                      <span className="hero-app-name">LegalFlow</span>
                    </div>
                    <span className="hero-app-tab">Dashboard</span>
                    <div className="hero-app-search">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="11" cy="11" r="7" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                      <span>Szukaj sprawy…</span>
                      <kbd>⌘K</kbd>
                    </div>
                    <span className="hero-app-bell">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                      </svg>
                      <span className="hero-app-bell-dot" />
                    </span>
                  </div>

                  <div className="hero-greet">
                    <div className="hero-greet-title">
                      Dzień dobry, Anna <span className="hero-greet-wave">👋</span>
                    </div>
                    <div className="hero-greet-sub">
                      Masz <strong>9 dokumentów</strong> do weryfikacji i <strong>4 terminy</strong> w tym tygodniu.
                    </div>
                  </div>

                  <div className="hero-kpi-grid">
                    <div className="kpi-tile">
                      <div className="kpi-tile-head">
                        <span className="kpi-tile-icon green">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                          </svg>
                        </span>
                        <span className="kpi-tile-lbl">Aktywne sprawy</span>
                      </div>
                      <div className="kpi-tile-num">12</div>
                      <div className="kpi-tile-delta">+3 w tym miesiącu</div>
                    </div>
                    <div className="kpi-tile">
                      <div className="kpi-tile-head">
                        <span className="kpi-tile-icon amber">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                            <line x1="12" y1="9" x2="12" y2="13" />
                            <line x1="12" y1="17" x2="12.01" y2="17" />
                          </svg>
                        </span>
                        <span className="kpi-tile-lbl">Pilne terminy</span>
                      </div>
                      <div className="kpi-tile-num">4</div>
                      <div className="kpi-tile-delta">2 w tym tygodniu</div>
                    </div>
                    <div className="kpi-tile">
                      <div className="kpi-tile-head">
                        <span className="kpi-tile-icon cyan">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                          </svg>
                        </span>
                        <span className="kpi-tile-lbl">Dokumenty AI</span>
                      </div>
                      <div className="kpi-tile-num">9</div>
                      <div className="kpi-tile-delta">Średni czas: 2 min</div>
                    </div>
                  </div>

                  <div className="hero-ai-rec">
                    <div className="hero-ai-head">
                      <span className="hero-ai-badge">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                        </svg>
                        Rekomendacja AI
                      </span>
                      <span className="hero-ai-time">Aktualizowane co 5 min</span>
                    </div>
                    <div className="hero-ai-body">
                      <div className="hero-ai-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                          <line x1="12" y1="9" x2="12" y2="13" />
                          <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                      </div>
                      <div className="hero-ai-text">
                        <div className="hero-ai-title">
                          Termin sądowy za 2 dni <strong>ALFA TECH sp. z o.o.</strong>
                        </div>
                        <div className="hero-ai-desc">
                          Brakuje załącznika 3 (spis wierzytelności). AI może wygenerować projekt na podstawie danych z
                          księgowości.
                        </div>
                        <div className="hero-ai-actions">
                          <span className="hero-ai-cta">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                            Wygeneruj załącznik
                          </span>
                          <span className="hero-ai-link">Otwórz sprawę</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hero-card hero-table-card">
                  <div className="hero-table-head">
                    <div>
                      <div className="hero-table-eyebrow">Sprawy w toku</div>
                      <div className="hero-table-title">Najnowsze aktualizacje</div>
                    </div>
                    <span className="hero-pill cyan">12</span>
                  </div>
                  <div className="hero-table-rows">
                    <div className="t-row">
                      <div className="t-row-body">
                        <div className="t-company">ALFA TECH sp. z o.o.</div>
                        <div className="t-meta">SP-324 · 47 wierzycieli</div>
                      </div>
                      <span className="t-stage navy">Głosowanie</span>
                    </div>
                    <div className="t-row">
                      <div className="t-row-body">
                        <div className="t-company">Nowak Logistyka</div>
                        <div className="t-meta">SP-321 · 23 wierzycieli</div>
                      </div>
                      <span className="t-stage amber">Inwentaryzacja</span>
                    </div>
                    <div className="t-row">
                      <div className="t-row-body">
                        <div className="t-company">Meridian Bud sp. k.</div>
                        <div className="t-meta">SP-318 · 18 wierzycieli</div>
                      </div>
                      <span className="t-stage cyan">Propozycje</span>
                    </div>
                  </div>
                </div>

                <div className="hero-notif">
                  <span className="hero-notif-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  </span>
                  <div className="hero-notif-body">
                    <div className="hero-notif-title">Plan układu gotowy</div>
                    <div className="hero-notif-meta">Wymaga akceptacji prawnika</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTRO STRIP */}
        <section className="intro-strip" aria-label="Wprowadzenie">
          <div className="container">
            <p className="intro-strip-text">
              System dla kancelarii restrukturyzacyjnych, które chcą prowadzić <span className="serif">więcej spraw</span> bez
              proporcjonalnego zwiększania pracy administracyjnej.
            </p>
          </div>
        </section>

        {/* INTEGRATIONS */}
        <section className="integrations" aria-label="Integracje">
          <div className="logos-viewport">
            <div className="logos-track" id="logos-track">
              <div className="logo-item">
                <span>HubSpot</span>
              </div>
              <div className="logo-item">
                <span>ClickUp</span>
              </div>
              <div className="logo-item">
                <span>Pipedrive</span>
              </div>
              <div className="logo-item">
                <span>Microsoft Dynamics 365</span>
              </div>
              <div className="logo-item">
                <span>monday.com</span>
              </div>
              <div className="logo-item">
                <span>Tillio</span>
              </div>
              <div className="logo-item">
                <span>SharePoint</span>
              </div>
              <div className="logo-item">
                <span>KSeF</span>
              </div>
              <div className="logo-item" aria-hidden="true">
                <span>HubSpot</span>
              </div>
              <div className="logo-item" aria-hidden="true">
                <span>ClickUp</span>
              </div>
              <div className="logo-item" aria-hidden="true">
                <span>Pipedrive</span>
              </div>
              <div className="logo-item" aria-hidden="true">
                <span>Microsoft Dynamics 365</span>
              </div>
              <div className="logo-item" aria-hidden="true">
                <span>monday.com</span>
              </div>
              <div className="logo-item" aria-hidden="true">
                <span>Tillio</span>
              </div>
              <div className="logo-item" aria-hidden="true">
                <span>SharePoint</span>
              </div>
              <div className="logo-item" aria-hidden="true">
                <span>KSeF</span>
              </div>
            </div>
          </div>
        </section>

        {/* METRICS */}
        <section>
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Zakres wdrożenia</span>
              <div>
                <h2>
                  Pełny cykl <span className="accent">życia sprawy</span> od leada do archiwizacji
                </h2>
                <p style={{ marginTop: 24 }}>Pięć zintegrowanych modułów, które działają jako jeden system.</p>
              </div>
            </div>

            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-num">5</div>
                <div className="metric-lbl">modułów obejmujących cały proces: sprzedaż, restrukturyzacja, sąd, płatności, nadzór</div>
              </div>
              <div className="metric-card">
                <div className="metric-num">
                  ~4 <small>min</small>
                </div>
                <div className="metric-lbl">średni czas reakcji na nowego leada od formularza do rozmowy</div>
              </div>
              <div className="metric-card">
                <div className="metric-num">
                  Nawet&nbsp;–70<small>%</small>
                </div>
                <div className="metric-lbl">czasu administracyjnego mniej powtarzalnej pracy biurowej w zespole</div>
              </div>
              <div className="metric-card">
                <div className="metric-num">0</div>
                <div className="metric-lbl">przeoczonych terminów, dokumentów i kontaktów z wierzycielami system pilnuje sam</div>
              </div>
            </div>

            <div className="inline-cta">
              <button type="button" className="btn btn-ghost btn-lg" onClick={openModal} data-cta="after-scope-contact">
                Skontaktuj się
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </button>
              <div className="hint">Odpiszemy w ciągu 1 dnia roboczego.</div>
            </div>
          </div>
        </section>

        {/* PILLARS */}
        <section className="pillars light" id="moduly" aria-label="Trzy filary platformy LegalFlow" ref={pillarsRef}>
          <div className="container">
            <div className="section-head left">
              <span className="eyebrow">Platforma LegalFlow</span>
              <h2>
                Trzy filary <span className="accent">nowoczesnej</span> kancelarii restrukturyzacyjnej
              </h2>
              <p>
                Transparentna współpraca z klientem. Zautomatyzowana dokumentacja postępowania. Pełna kontrola nad płynnością
                kancelarii. W jednym audytowalnym systemie bez silosów i ręcznej pracy.
              </p>
            </div>

            <article className="pillar">
              <div className="pillar-num" aria-hidden="true">
                01
              </div>
              <div className="pillar-content">
                <span className="pillar-eyebrow">Komunikacja klient ↔ kancelaria</span>
                <h3>Strefa Klienta</h3>
                <p className="pillar-headline">Klient zawsze wie, na jakim etapie jest jego sprawa.</p>
                <p className="pillar-lead">
                  Dedykowana, zabezpieczona przestrzeń, w której klient kancelarii widzi status postępowania, otrzymuje
                  dokumenty i komunikuje się z prawnikiem w jednym kanale, z pełną historią. To nie samoobsługa. To
                  uporządkowana współpraca, w której nikt nie szuka maili.
                </p>
                <ul className="pillar-features">
                  <li>Status postępowania w czasie rzeczywistym bez pytań „jak idzie sprawa?"</li>
                  <li>Centralne repozytorium dokumentów z historią wersji i kontrolą dostępu</li>
                  <li>Bezpieczne przesyłanie plików w obie strony</li>
                  <li>Powiadomienia o terminach, decyzjach i dokumentach do podpisu</li>
                  <li>Komunikacja zawsze w kontekście sprawy nigdy „w którym mailu to było"</li>
                  <li>Pełna ścieżka audytu: kto, kiedy, co przekazał</li>
                </ul>
                <div className="pillar-trust">Audytowalne · RODO · Kontrola dostępów</div>
              </div>
              <div className="pillar-visual" aria-hidden="true">
                <div className="mini mini-portal">
                  <div className="mini-head">
                    <span className="mini-title">Twoja sprawa SR-184/25</span>
                    <span className="mini-pill">Aktywna</span>
                  </div>
                  <ol className="progress-stages">
                    <li className="stage done">
                      <span className="stage-dot" />
                      <span className="stage-label">Wniosek złożony</span>
                    </li>
                    <li className="stage active">
                      <span className="stage-dot" />
                      <span className="stage-label">Postępowanie układowe</span>
                    </li>
                    <li className="stage">
                      <span className="stage-dot" />
                      <span className="stage-label">Zatwierdzenie układu</span>
                    </li>
                  </ol>
                  <div className="mini-list">
                    <div className="mini-row">
                      <span className="mini-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                      </span>
                      <div className="mini-row-body">
                        <div className="mini-row-title">Plan układu wersja 3</div>
                        <div className="mini-row-meta">Dodano 2h temu · Wymaga podpisu</div>
                      </div>
                      <span className="mini-badge attention">Do akcji</span>
                    </div>
                    <div className="mini-row">
                      <span className="mini-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                      </span>
                      <div className="mini-row-body">
                        <div className="mini-row-title">Spotkanie z prawnikiem</div>
                        <div className="mini-row-meta">Jutro, 11:00 · Online</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            <article className="pillar pillar-reverse">
              <div className="pillar-num" aria-hidden="true">
                02
              </div>
              <div className="pillar-content">
                <span className="pillar-eyebrow">Automatyzacja dokumentacji procesowej</span>
                <h3>Generator Układów i Dokumentów</h3>
                <p className="pillar-headline">Dokumentacja postępowania powstaje sama na Twoich szablonach.</p>
                <p className="pillar-lead">
                  Kancelaria definiuje własne wzory pism, ankiet i planów. System wypełnia je danymi sprawy i generuje wersje
                  robocze gotowe do akceptacji prawnika. Plan układu, propozycja układowa, wniosek do sądu, plan PZU powstają w
                  minutach, w standardzie Twojej kancelarii.
                </p>
                <ul className="pillar-features">
                  <li>Twoje wzorce, nie szablony „pudełkowe" pełna kontrola nad formatem i językiem</li>
                  <li>Plany restrukturyzacyjne, propozycje układowe, ankiety, pisma procesowe</li>
                  <li>Drafty gotowe do recenzji prawnika, nie do pisania od zera</li>
                  <li>Spójność w całej kancelarii eliminacja literówek i niespójnych klauzul</li>
                  <li>Podpis elektroniczny i wersjonowanie wbudowane</li>
                  <li>Ścieżka audytu od draftu po podpisany oryginał</li>
                </ul>
                <div className="pillar-trust">Twoje szablony · Twoja kontrola · Plan układu w ok. 8 minut</div>
              </div>
              <div className="pillar-visual" aria-hidden="true">
                <div className="mini mini-generator">
                  <div className="mini-head">
                    <span className="mini-title">Generator dokumentów</span>
                    <span className="mini-pill cyan">Auto</span>
                  </div>
                  <div className="flow">
                    <div className="flow-step">
                      <span className="flow-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <ellipse cx="12" cy="5" rx="9" ry="3" />
                          <path d="M3 5v14a9 3 0 0 0 18 0V5" />
                          <path d="M3 12a9 3 0 0 0 18 0" />
                        </svg>
                      </span>
                      <span>Dane sprawy</span>
                    </div>
                    <span className="flow-arrow" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </span>
                    <div className="flow-step">
                      <span className="flow-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <line x1="3" y1="9" x2="21" y2="9" />
                          <line x1="9" y1="9" x2="9" y2="21" />
                        </svg>
                      </span>
                      <span>Twój szablon</span>
                    </div>
                    <span className="flow-arrow" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </span>
                    <div className="flow-step">
                      <span className="flow-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="16" y1="13" x2="8" y2="13" />
                          <line x1="16" y1="17" x2="8" y2="17" />
                        </svg>
                      </span>
                      <span>Draft .doc/.pdf</span>
                    </div>
                  </div>
                  <div className="mini-list">
                    <div className="mini-row">
                      <span className="mini-row-title">Plan układu Nowak Logistyka</span>
                      <span className="mini-badge attention">Do akceptacji</span>
                    </div>
                    <div className="mini-row">
                      <span className="mini-row-title">Test prywatnego wierzyciela Polver</span>
                      <span className="mini-badge done">Podpisany</span>
                    </div>
                    <div className="mini-row">
                      <span className="mini-row-title">Propozycje układowe Meridian Bud</span>
                      <span className="mini-badge draft">Draft</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            <article className="pillar">
              <div className="pillar-num" aria-hidden="true">
                03
              </div>
              <div className="pillar-content">
                <span className="pillar-eyebrow">
                  Płynność finansowa kancelarii
                  <span className="status-live">
                    <span className="status-dot" />
                    Dostępne
                  </span>
                </span>
                <h3>AI Windykator</h3>
                <p className="pillar-headline">
                  Twoja kancelaria zawsze wie, kto i ile jest jej winien i działa, zanim faktura stanie się problemem.
                </p>
                <p className="pillar-lead">
                  AI Windykator monitoruje wszystkie wystawione faktury, śledzi należności od klientów kancelarii i
                  automatycznie inicjuje proces odzyskiwania zaległości zanim wpłyną na płynność firmy. To nie windykacja w
                  imieniu klienta. To kontrola własnych należności kancelarii, prowadzona w tle, bez angażowania prawnika.
                </p>
                <ul className="pillar-features">
                  <li>Pełny widok należności: kto, ile, jak długo zalega w jednym dashboardzie</li>
                  <li>Automatyczne wezwania do zapłaty w eskalacji ustalonej przez partnera kancelarii (e-mail, SMS, telefon)</li>
                  <li>Klasyfikacja klientów według ryzyka opóźnienia system rozpoznaje niewypłacalność wcześniej</li>
                  <li>Wczesne alerty: faktura zagrożona zanim stanie się sprawą windykacyjną</li>
                  <li>Integracja z systemem fakturowania kancelarii oraz KSeF</li>
                  <li>Ślad audytowy każdej akcji windykacyjnej od pierwszego monitu po wezwanie formalne</li>
                </ul>
                <div className="pillar-trust">KSeF · Auto-wezwania · Pełen audyt operacji</div>
              </div>
              <div className="pillar-visual" aria-hidden="true">
                <div className="mini mini-windykator">
                  <div className="mini-head">
                    <span className="mini-title">Opóźnione należności</span>
                    <span className="mini-pill trend-down">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                      –42% MoM
                    </span>
                  </div>
                  <div className="kpi-strip">
                    <div className="kpi-block">
                      <div className="kpi-num">28 460 zł</div>
                      <div className="kpi-lbl">Aktualne saldo zaległości</div>
                    </div>
                    <div className="kpi-block">
                      <div className="kpi-num">7</div>
                      <div className="kpi-lbl">Faktur w procesie</div>
                    </div>
                  </div>
                  <svg className="cfo-chart" viewBox="0 0 320 120" preserveAspectRatio="none" aria-hidden="true">
                    <defs>
                      <linearGradient id="win-area" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#22c55e" stopOpacity="0.26" />
                        <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,28 L40,32 L80,40 L120,48 L160,58 L200,68 L240,78 L280,86 L320,92 L320,120 L0,120 Z" fill="url(#win-area)" />
                    <path d="M0,28 L40,32 L80,40 L120,48 L160,58 L200,68 L240,78 L280,86 L320,92" fill="none" stroke="#22c55e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
                    <circle cx="320" cy="92" r="4" fill="#22c55e" />
                    <circle cx="320" cy="92" r="9" fill="#22c55e" opacity="0.18" />
                    <text x="6" y="22" fontSize="9" fill="#94a3b8" fontFamily="inherit">
                      Q3
                    </text>
                    <text x="296" y="86" fontSize="9" fill="#15803d" fontFamily="inherit" fontWeight="600">
                      Teraz
                    </text>
                  </svg>
                  <div className="cfo-alerts">
                    <div className="cfo-alert">
                      <span className="alert-dot success" />
                      <div className="alert-body">
                        <div className="alert-title">FV/2025/0167 Spłacone</div>
                        <div className="alert-meta">8 200 zł · po 2. monicie e-mail</div>
                      </div>
                    </div>
                    <div className="cfo-alert">
                      <span className="alert-dot warning" />
                      <div className="alert-body">
                        <div className="alert-title">FV/2025/0184 Wezwanie 1</div>
                        <div className="alert-meta">4 500 zł · 12 dni opóźnienia</div>
                      </div>
                    </div>
                    <div className="cfo-alert">
                      <span className="alert-dot danger" />
                      <div className="alert-body">
                        <div className="alert-title">FV/2025/0152 Eskalacja: wezwanie formalne</div>
                        <div className="alert-meta">15 760 zł · 38 dni · ryzyko wysokie</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            <div className="pillars-roadmap" role="note">
              <span className="roadmap-pill">W przygotowaniu</span>
              Bezpośrednia integracja z Krajowym Rejestrem Zadłużonych monitoring obwieszczeń sądowych i automatyczne alerty w
              CRM.
            </div>

            <div className="pillars-cta">
              <h3>Sprawdź, jak te trzy filary działają na realnej sprawie z Twojej kancelarii.</h3>
              <div className="pillars-cta-row">
                <a className="btn btn-primary btn-lg" href={CAL_URL} target="_blank" rel="noopener" data-cta="pillars-demo">
                  Zobacz demo
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </a>
                <a className="btn btn-ghost btn-lg" href="mailto:kontakt@boosterai.pl" data-cta="pillars-contact">
                  Skontaktuj się
                </a>
              </div>
              <p className="pillars-cta-hint">15-minutowe demo · bez prezentacji · działający system na Twoich danych.</p>
              <p className="pillars-trust-bar">Polski cloud · Audytowalne · RODO · Standardy sektora prawnego</p>
            </div>
          </div>
        </section>

        {/* ECOSYSTEM */}
        <section className="ecosystem-wrap">
          <div className="container">
            <div className="ecosystem">
              <span className="eyebrow">Co wyróżnia to wdrożenie</span>
              <h2 style={{ marginTop: 24 }}>
                Jeden zintegrowany <span className="serif">ekosystem</span>, nie zestaw skryptów
              </h2>
              <blockquote>
                CRM, SharePoint, API GUS/Regon, Mailerlite, SMS i poczta email działają razem automatycznie przekazując dane
                przez cały cykl życia sprawy restrukturyzacyjnej. Żaden element nie działa w oderwaniu od pozostałych.
                <span style={{ display: "block", marginTop: 18 }}>Integracja z KRZ w przygotowaniu.</span>
              </blockquote>
              <div className="tags">
                <span>CRM</span>
                <span>SharePoint</span>
                <span>API GUS/Regon</span>
                <span>Mailerlite</span>
                <span>SMS</span>
                <span>Email</span>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="jak-to-dziala" className="light">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Jak to działa</span>
              <div>
                <h2>
                  Cztery kroki od pierwszego <span className="accent">kontaktu</span> do zatwierdzonego układu
                </h2>
              </div>
            </div>
            <div className="steps steps-4">
              <div className="step">
                <h4>Onboarding klienta</h4>
                <p>
                  Klient trafia do Strefy Klienta. Widzi status sprawy, ankietę restrukturyzacyjną i pierwsze dokumenty w
                  jednym, zabezpieczonym kanale.
                </p>
              </div>
              <div className="step">
                <h4>Generowanie dokumentacji</h4>
                <p>
                  Plan układu, propozycje układowe, pisma procesowe automatyczne drafty na Twoich szablonach. Prawnik
                  recenzuje, nie pisze od zera.
                </p>
              </div>
              <div className="step">
                <h4>Postępowanie sądowe</h4>
                <p>
                  Obsługa wniosków, korespondencji z wierzycielami i terminów procesowych w systemie. Klient widzi każdy
                  kluczowy ruch.
                </p>
              </div>
              <div className="step">
                <h4>Płynność kancelarii</h4>
                <p>
                  AI Windykator pilnuje należności od klientów kancelarii, klasyfikuje ryzyko i automatycznie eskaluje
                  opóźnione faktury bez angażowania prawnika.
                </p>
              </div>
            </div>

            <div className="inline-cta">
              <a className="btn btn-primary btn-lg" href={CAL_URL} target="_blank" rel="noopener" data-cta="after-how-demo">
                Zobacz demo
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </a>
              <div className="hint">15 minut · bez przygotowania · działający system na żywo.</div>
            </div>
          </div>
        </section>

        {/* WHY */}
        <section id="dlaczego">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Dlaczego LegalFlow</span>
              <div>
                <h2>
                  Co odróżnia LegalFlow od <span className="accent">ogólnych</span> narzędzi automatyzacji
                </h2>
                <p style={{ marginTop: 24 }}>Sześć rzeczy, które robią różnicę w realnej pracy kancelarii restrukturyzacyjnej.</p>
              </div>
            </div>

            <div className="why-grid">
              {[
                {
                  h: "Personalizacja pod procesy kancelarii",
                  p: "LegalFlow dopasowuje się do Twojego flow nie na odwrót. Dokumenty, szablony i automatyzacje odzwierciedlają realne procesy Twojej kancelarii.",
                },
                {
                  h: "Bezpieczeństwo danych klientów",
                  p: "Dane sprawy, dokumenty i korespondencja są przechowywane zgodnie ze standardami bezpieczeństwa dla sektora prawnego. Pełna kontrola dostępów i audytowalność.",
                },
                {
                  h: "Integracja z narzędziami, których już używasz",
                  p: "LegalFlow łączy się z Twoim CRM, SharePoint, systemem płatności i pocztą. Jeden spójny ekosystem bez powielania pracy między systemami.",
                },
                {
                  h: "Wdrożenie end-to-end",
                  p: "Od onboardingu po archiwizację każdy etap sprawy jest w systemie. Żaden dokument, termin ani kontakt nie wypada między etapami.",
                },
                {
                  h: "Branżowe know-how",
                  p: "System jest zbudowany z rozumieniem prawa restrukturyzacyjnego i insolvency workflow nie jako ogólna automatyzacja skrojona pod restrukturyzację.",
                },
                {
                  h: "Skalowanie bez nowych etatów",
                  p: "Więcej spraw, ten sam zespół. Automatyzacja administracji pozwala kancelarii rosnąć bez proporcjonalnego wzrostu kosztów operacyjnych.",
                },
              ].map((item) => (
                <div className="why-item" key={item.h}>
                  <span className="why-check" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div>
                    <h4>{item.h}</h4>
                    <p>{item.p}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="benefits light" id="korzysci">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Korzyści biznesowe</span>
              <div>
                <h2>
                  Konkretne zmiany w <span className="accent">codziennej</span> pracy kancelarii
                </h2>
              </div>
            </div>

            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <h3>Nawet –70% mniej czasu administracyjnego</h3>
                <p>
                  Generowanie dokumentów, kontakty z wierzycielami, monitoring terminów system wykonuje to automatycznie.
                  Zespół zajmuje się sprawami, nie obsługą procesu.
                </p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3>Więcej spraw bez nowych etatów</h3>
                <p>
                  Automatyzacja administracji pozwala obsługiwać większą liczbę postępowań przy tym samym zespole. Wzrost
                  skali bez proporcjonalnego wzrostu kosztów.
                </p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <h3>Zero przeoczonych terminów</h3>
                <p>
                  Alerty o płatnościach, zadania windykacyjne, sprawozdania kwartalne LegalFlow pilnuje kalendarza sprawy na
                  każdym etapie postępowania.
                </p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <h3>Porządek w dokumentacji każdej sprawy</h3>
                <p>
                  Każda sprawa ma kompletną teczkę w SharePoint. Dokumenty odkładają się automatycznie bez ręcznego
                  porządkowania i szukania plików.
                </p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <h3>Automatyczny kontakt z wierzycielami i dłużnikiem</h3>
                <p>
                  Wiadomości powitalne, propozycje układowe, przypomnienia o płatnościach wysyłane automatycznie, na właściwym
                  etapie, do właściwych stron.
                </p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                </div>
                <h3>Pełna kontrola nad statusem każdej sprawy</h3>
                <p>Jeden widok na pipeline spraw, aktywne postępowania i alerty. Bez sprawdzania kilku systemów jednocześnie.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="final-cta-section">
          <div className="final-cta">
            <div className="final-cta-inner">
              <span className="eyebrow">Następny krok</span>
              <h2>
                Sprawdź, jak LegalFlow działa na <span className="serif">realnych</span> sprawach z Twojej kancelarii.
              </h2>
              <div className="final-cta-row">
                <p>
                  Umów 15-minutowe demo pokażemy system na żywo, bez slajdów i marketingu. Zobaczysz, co konkretnie zmienia
                  się w codziennej pracy.
                </p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <a className="btn btn-primary btn-lg" href={CAL_URL} target="_blank" rel="noopener" data-cta="final-demo">
                    Zobacz demo
                    <span className="arrow">→</span>
                  </a>
                  <a className="btn btn-secondary-final btn-lg" href="mailto:kontakt@boosterai.pl" data-cta="final-contact">
                    Skontaktuj się
                  </a>
                </div>
              </div>
              <span className="small">15-minutowe demo · bez przygotowania · pokazujemy działający system</span>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="faq" id="faq">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">FAQ</span>
              <div>
                <h2>
                  Najczęstsze <span className="accent">pytania</span>
                </h2>
              </div>
            </div>

            <div className="faq-list">
              {[
                {
                  q: "Czy LegalFlow zastępuje mój obecny CRM?",
                  a: "Nie. LegalFlow integruje się z CRM, którego już używasz (HubSpot, Pipedrive, monday.com i inne). Automatyzuje procesy na jego bazie nie wymaga migracji danych ani zmiany systemu.",
                },
                {
                  q: "Jak długo trwa wdrożenie?",
                  a: "Pierwsze moduły można uruchomić w ciągu kilku tygodni. Zakres i czas wdrożenia zależy od liczby modułów i specyfiki procesów kancelarii omawiamy to indywidualnie.",
                },
                {
                  q: "Czy system jest bezpieczny dla danych klientów kancelarii?",
                  a: "Tak. Dane są przechowywane zgodnie ze standardami bezpieczeństwa dla sektora prawnego, z kontrolą dostępów i pełną audytowalnością operacji.",
                },
                {
                  q: "Czy mogę wdrożyć tylko wybrane moduły?",
                  a: "Tak. Każdy moduł działa niezależnie, choć integrują się ze sobą. Możesz zacząć od jednego modułu i rozszerzać system wraz z rozwojem kancelarii.",
                },
                {
                  q: "Kiedy pojawi się integracja z KRZ?",
                  a: "Bezpośrednia integracja z Krajowym Rejestrem Zadłużonych jest w przygotowaniu jako rozszerzenie filaru postępowania sądowego automatyczny monitoring obwieszczeń i alerty w CRM. Pojawi się w jednej z kolejnych wersji. Możesz zostawić kontakt poinformujemy o uruchomieniu.",
                },
              ].map((item) => (
                <details className="faq-item" key={item.q}>
                  <summary>
                    <span>{item.q}</span>
                    <svg className="faq-chev" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </summary>
                  <div className="faq-content">
                    <p>{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* OFFER MODAL */}
      <div
        className="modal-backdrop"
        id="offer-modal"
        data-open={String(modalOpen)}
        role="dialog"
        aria-modal="true"
        aria-labelledby="offer-modal-title"
        aria-hidden={!modalOpen}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        <div className="modal" data-state={formState}>
          <button type="button" className="modal-close" aria-label="Zamknij okno" onClick={closeModal}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="6" y1="18" x2="18" y2="6" />
            </svg>
          </button>

          <div className="modal-badge" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Odpiszemy w ciągu 1 dnia roboczego
          </div>

          <h3 id="offer-modal-title">Skontaktuj się z nami</h3>
          <p className="modal-lead">
            Podaj numer telefonu, a odezwiemy się w ciągu 1 dnia roboczego. Krótko omówimy, jak LegalFlow może wesprzeć Twoją
            kancelarię.
          </p>

          <form id="offer-form" onSubmit={handleSubmit} noValidate>
            {formError && (
              <div
                className="form-error"
                role="alert"
                style={{
                  color: "#ffb4bd",
                  background: "rgba(239,68,68,.12)",
                  padding: "10px 14px",
                  borderRadius: 8,
                  fontSize: ".88rem",
                  marginBottom: 12,
                }}
              >
                {formError}
              </div>
            )}
            <div className="form-field">
              <label htmlFor="offer-phone">Numer telefonu</label>
              <input
                ref={phoneRef}
                type="tel"
                id="offer-phone"
                name="phone"
                required
                autoComplete="tel"
                inputMode="tel"
                placeholder="+48 600 000 000"
                pattern="^[\+\s0-9\-\(\)]{7,}$"
              />
            </div>
            <div className="form-field">
              <label htmlFor="offer-name">Imię (opcjonalnie)</label>
              <input ref={nameRef} type="text" id="offer-name" name="name" autoComplete="given-name" placeholder="Jak mamy się zwracać" />
            </div>
            <div className="form-consent">
              Klikając „Skontaktuj się" wyrażasz zgodę na kontakt w sprawie LegalFlow. Szczegóły w{" "}
              <a href="https://boosterai.pl/privacy-policy/" target="_blank" rel="noopener">
                polityce prywatności
              </a>
              .
            </div>
            <button type="submit" className="btn btn-primary btn-lg" data-cta="offer-submit" disabled={submitting}>
              {submitting ? "Wysyłam…" : "Skontaktuj się"}
              {!submitting && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              )}
            </button>
          </form>

          <div className="form-success" role="status" aria-live="polite">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <polyline points="8 12 11 15 16 9" />
            </svg>
            <h3>Dziękujemy!</h3>
            <p>Odezwiemy się w ciągu 1 dnia roboczego.</p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/assets/booster-rocket.png" alt="Booster AI" />
            <span className="logo-text">
              LegalFlow<span>.</span>
            </span>
            <p>Automatyzacja kancelarii restrukturyzacyjnej od leada do archiwizacji. LegalFlow by Booster AI.</p>
          </div>
          <div>
            <h4>Nawigacja</h4>
            <a href="#moduly">Moduły</a>
            <a href="#jak-to-dziala">Jak to działa</a>
            <a href="#dlaczego">Dlaczego LegalFlow</a>
            <a href="#korzysci">Korzyści</a>
            <a href="#faq">FAQ</a>
          </div>
          <div>
            <h4>Kontakt</h4>
            <a href={CAL_URL} target="_blank" rel="noopener" data-cta="footer-demo">
              Zobacz demo
            </a>
            <a href="mailto:kontakt@boosterai.pl" data-cta="footer-contact">
              Skontaktuj się
            </a>
            <a href="https://boosterai.pl/privacy-policy/" target="_blank" rel="noopener">
              Polityka prywatności
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {year} Booster AI. Wszelkie prawa zastrzeżone.</span>
          <span className="brand-note">LegalFlow by Booster AI</span>
        </div>
      </footer>
    </div>
  );
}
