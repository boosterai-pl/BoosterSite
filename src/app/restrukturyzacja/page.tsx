"use client";

import { useEffect, useRef, useState } from "react";
import "./legalflow.css";

const pageMarkup = String.raw`
<!-- ============================================================
     HEADER
     ============================================================ -->
<header class="site-header" role="banner">
  <div class="container header-inner">
    <a href="#top" class="logo" aria-label="LegalFlow — strona główna">
      <span class="logo-mark" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Stylizowany paragraf + przepływ (dwa węzły połączone) -->
          <path d="M7 5h9a3 3 0 0 1 0 6H9v3h9" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="7" cy="19" r="2" fill="white"/>
          <circle cx="18" cy="19" r="2" fill="white"/>
          <path d="M9 19h7" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </span>
      <span class="logo-text">Legal<span>Flo</span></span>
    </a>

    <nav class="site-nav" aria-label="Nawigacja główna">
      <a href="#moduly">Moduły</a>
      <a href="#jak-to-dziala">Jak to działa</a>
      <a href="#dlaczego">Dlaczego LegalFlow</a>
      <a href="#korzysci">Korzyści</a>
      <a href="#faq">FAQ</a>
    </nav>

    <a class="btn btn-primary header-cta"
       href="https://cal.com/szymon-bazan-iahn2z/15min"
       target="_blank" rel="noopener"
       data-cta="header">
      Zobacz demo
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"/></svg>
    </a>

    <button class="mobile-toggle" aria-expanded="false" aria-controls="mobile-menu" aria-label="Otwórz menu">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
        <line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/>
      </svg>
    </button>
  </div>

  <div id="mobile-menu" class="mobile-menu container" data-open="false">
    <nav aria-label="Nawigacja mobilna">
      <a href="#moduly">Moduły</a>
      <a href="#jak-to-dziala">Jak to działa</a>
      <a href="#dlaczego">Dlaczego LegalFlow</a>
      <a href="#korzysci">Korzyści</a>
      <a href="#faq">FAQ</a>
    </nav>
    <a class="btn btn-primary"
       href="https://cal.com/szymon-bazan-iahn2z/15min"
       target="_blank" rel="noopener"
       data-cta="mobile-menu">
      Zobacz demo →
    </a>
  </div>
</header>

<main id="top">

<!-- ============================================================
     HERO
     ============================================================ -->
<section class="hero">
  <div class="container hero-grid">
    <div>
      <span class="eyebrow">Dla kancelarii restrukturyzacyjnych</span>
      <h1>Automatyzacja, która odciąża kancelarię — nie zastępuje prawnika.</h1>
      <p class="hero-sub">
        Komunikacja z klientem, dokumentacja postępowania i pełna kontrola nad płynnością kancelarii — w jednym audytowalnym systemie.
        Twój zespół skupia się na prawie, nie na administracji.
      </p>
      <div class="hero-cta-row">
        <a class="btn btn-primary btn-lg"
           href="https://cal.com/szymon-bazan-iahn2z/15min"
           target="_blank" rel="noopener"
           data-cta="hero">
          Zobacz demo
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </a>
        <a class="btn btn-ghost btn-lg" href="#moduly" data-cta="hero-secondary">
          Poznaj moduły
        </a>
      </div>
      <div class="hero-trust" aria-label="Zaufanie">
        <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Wdrożenie end-to-end</span>
        <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Szkolenie zespołu w cenie</span>
        <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Integracja z Twoim CRM</span>
      </div>
    </div>

    <!-- Hero visual — Dashboard kancelarii (premium product UI mockup) -->
    <div class="hero-visual" aria-hidden="true">
      <div class="hero-glow"></div>

      <!-- Main card: dashboard kancelarii -->
      <div class="hero-card hero-app">
        <!-- App top bar -->
        <div class="hero-app-bar">
          <div class="hero-app-brand">
            <span class="hero-app-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M7 5h9a3 3 0 0 1 0 6H9v3h9" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="7" cy="19" r="2" fill="white"/>
                <circle cx="18" cy="19" r="2" fill="white"/>
                <path d="M9 19h7" stroke="white" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </span>
            <span class="hero-app-name">LegalFlow</span>
          </div>
          <span class="hero-app-tab">Dashboard</span>
          <div class="hero-app-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <span>Szukaj sprawy…</span>
            <kbd>⌘K</kbd>
          </div>
          <span class="hero-app-bell">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            <span class="hero-app-bell-dot"></span>
          </span>
        </div>

        <!-- Greeting + sub -->
        <div class="hero-greet">
          <div class="hero-greet-title">Dzień dobry, Anna <span class="hero-greet-wave">👋</span></div>
          <div class="hero-greet-sub">Masz <strong>9 dokumentów</strong> do weryfikacji i <strong>4 terminy</strong> w tym tygodniu.</div>
        </div>

        <!-- KPI grid -->
        <div class="hero-kpi-grid">
          <div class="kpi-tile">
            <div class="kpi-tile-head">
              <span class="kpi-tile-icon green">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
              </span>
              <span class="kpi-tile-lbl">Aktywne sprawy</span>
            </div>
            <div class="kpi-tile-num">12</div>
            <div class="kpi-tile-delta">+3 w tym miesiącu</div>
          </div>
          <div class="kpi-tile">
            <div class="kpi-tile-head">
              <span class="kpi-tile-icon amber">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              </span>
              <span class="kpi-tile-lbl">Pilne terminy</span>
            </div>
            <div class="kpi-tile-num">4</div>
            <div class="kpi-tile-delta">2 w tym tygodniu</div>
          </div>
          <div class="kpi-tile">
            <div class="kpi-tile-head">
              <span class="kpi-tile-icon cyan">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              </span>
              <span class="kpi-tile-lbl">Dokumenty AI</span>
            </div>
            <div class="kpi-tile-num">9</div>
            <div class="kpi-tile-delta">Średni czas: 2 min</div>
          </div>
        </div>

        <!-- AI recommendation -->
        <div class="hero-ai-rec">
          <div class="hero-ai-head">
            <span class="hero-ai-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              Rekomendacja AI
            </span>
            <span class="hero-ai-time">Aktualizowane co 5 min</span>
          </div>
          <div class="hero-ai-body">
            <div class="hero-ai-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <div class="hero-ai-text">
              <div class="hero-ai-title">Termin sądowy za 2 dni — <strong>ALFA TECH sp. z o.o.</strong></div>
              <div class="hero-ai-desc">Brakuje załącznika 3 (spis wierzytelności). AI może wygenerować projekt na podstawie danych z księgowości.</div>
              <div class="hero-ai-actions">
                <span class="hero-ai-cta">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  Wygeneruj załącznik
                </span>
                <span class="hero-ai-link">Otwórz sprawę</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Floating: mini tabela spraw -->
      <div class="hero-card hero-table-card">
        <div class="hero-table-head">
          <div>
            <div class="hero-table-eyebrow">Sprawy w toku</div>
            <div class="hero-table-title">Najnowsze aktualizacje</div>
          </div>
          <span class="hero-pill cyan">12</span>
        </div>
        <div class="hero-table-rows">
          <div class="t-row">
            <div class="t-row-body">
              <div class="t-company">ALFA TECH sp. z o.o.</div>
              <div class="t-meta">SP-324 · 47 wierzycieli</div>
            </div>
            <span class="t-stage navy">Głosowanie</span>
          </div>
          <div class="t-row">
            <div class="t-row-body">
              <div class="t-company">Nowak Logistyka</div>
              <div class="t-meta">SP-321 · 23 wierzycieli</div>
            </div>
            <span class="t-stage amber">Inwentaryzacja</span>
          </div>
          <div class="t-row">
            <div class="t-row-body">
              <div class="t-company">Meridian Bud sp. k.</div>
              <div class="t-meta">SP-318 · 18 wierzycieli</div>
            </div>
            <span class="t-stage cyan">Propozycje</span>
          </div>
        </div>
      </div>

      <!-- Floating notif -->
      <div class="hero-notif">
        <span class="hero-notif-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        </span>
        <div class="hero-notif-body">
          <div class="hero-notif-title">Plan układu gotowy</div>
          <div class="hero-notif-meta">Wymaga akceptacji prawnika</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ============================================================
     INTRO STRIP — krótkie zdanie pod hero
     ============================================================ -->
<section class="intro-strip" aria-label="Wprowadzenie">
  <div class="container">
    <p class="intro-strip-text">
      System dla kancelarii restrukturyzacyjnych, które chcą prowadzić więcej spraw —
      bez proporcjonalnego zwiększania pracy administracyjnej.
    </p>
  </div>
</section>

<!-- ============================================================
     INTEGRATIONS STRIP
     ============================================================ -->
<section class="integrations" aria-label="Integracje">
  <div class="container">
    <h2>Łączymy się z narzędziami, których już używasz</h2>
    <p class="integrations-sub">
      Twój CRM, SharePoint i narzędzia komunikacji zostają — LegalFlow działa razem z nimi, nie zamiast nich.
    </p>
    <div class="logos-viewport">
      <div class="logos-track" id="logos-track">
        <!-- Zestaw A -->
        <div class="logo-item"><span>HubSpot</span></div>
        <div class="logo-item"><span>ClickUp</span><span class="badge">Verified Consultant</span></div>
        <div class="logo-item"><span>Pipedrive</span><span class="badge">Authorized Partner</span></div>
        <div class="logo-item"><span>Microsoft Dynamics 365</span></div>
        <div class="logo-item"><span>monday.com</span><span class="badge">Certified Partner</span></div>
        <div class="logo-item"><span>Tillio</span></div>
        <!-- Zestaw B (duplikat dla pętli) -->
        <div class="logo-item" aria-hidden="true"><span>HubSpot</span></div>
        <div class="logo-item" aria-hidden="true"><span>ClickUp</span><span class="badge">Verified Consultant</span></div>
        <div class="logo-item" aria-hidden="true"><span>Pipedrive</span><span class="badge">Authorized Partner</span></div>
        <div class="logo-item" aria-hidden="true"><span>Microsoft Dynamics 365</span></div>
        <div class="logo-item" aria-hidden="true"><span>monday.com</span><span class="badge">Certified Partner</span></div>
        <div class="logo-item" aria-hidden="true"><span>Tillio</span></div>
      </div>
    </div>
  </div>
</section>

<!-- ============================================================
     METRICS
     ============================================================ -->
<section>
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Zakres wdrożenia</span>
      <h2>Pełny cykl życia sprawy — od leada do archiwizacji</h2>
      <p>Pięć zintegrowanych modułów, które działają jako jeden system.</p>
    </div>

    <div class="metrics-grid">
      <div class="metric-card">
        <div class="metric-num">5</div>
        <div class="metric-lbl">modułów obejmujących cały proces: sprzedaż, restrukturyzacja, sąd, płatności, nadzór</div>
      </div>
      <div class="metric-card">
        <div class="metric-num">~4 <small>min</small></div>
        <div class="metric-lbl">średni czas reakcji na nowego leada — od formularza do rozmowy</div>
      </div>
      <div class="metric-card">
        <div class="metric-num">Nawet&nbsp;–70<small>%</small></div>
        <div class="metric-lbl">czasu administracyjnego — mniej powtarzalnej pracy biurowej w zespole</div>
      </div>
      <div class="metric-card">
        <div class="metric-num">0</div>
        <div class="metric-lbl">przeoczonych terminów, dokumentów i kontaktów z wierzycielami — system pilnuje sam</div>
      </div>
    </div>

    <div class="inline-cta">
      <button type="button" class="btn btn-ghost btn-lg"
              data-modal-open="offer-modal"
              data-cta="after-scope-contact">
        Skontaktuj się
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
      </button>
      <div class="hint">Odpiszemy w ciągu 1 dnia roboczego.</div>
    </div>
  </div>
</section>

<!-- ============================================================
     PILLARS — 3 filary platformy
     ============================================================ -->
<section class="pillars" id="moduly" aria-label="Trzy filary platformy LegalFlow">
  <div class="container">
    <div class="section-head left">
      <span class="eyebrow">Platforma LegalFlow</span>
      <h2>Trzy filary nowoczesnej kancelarii restrukturyzacyjnej</h2>
      <p>Transparentna współpraca z klientem. Zautomatyzowana dokumentacja postępowania. Pełna kontrola nad płynnością kancelarii. W jednym audytowalnym systemie — bez silosów i ręcznej pracy.</p>
    </div>

    <!-- Pillar 01 — Strefa Klienta -->
    <article class="pillar">
      <div class="pillar-num" aria-hidden="true">01</div>
      <div class="pillar-content">
        <span class="pillar-eyebrow">Komunikacja klient ↔ kancelaria</span>
        <h3>Strefa Klienta</h3>
        <p class="pillar-headline">Klient zawsze wie, na jakim etapie jest jego sprawa.</p>
        <p class="pillar-lead">Dedykowana, zabezpieczona przestrzeń, w której klient kancelarii widzi status postępowania, otrzymuje dokumenty i komunikuje się z prawnikiem — w jednym kanale, z pełną historią. To nie samoobsługa. To uporządkowana współpraca, w której nikt nie szuka maili.</p>
        <ul class="pillar-features">
          <li>Status postępowania w czasie rzeczywistym — bez pytań „jak idzie sprawa?"</li>
          <li>Centralne repozytorium dokumentów z historią wersji i kontrolą dostępu</li>
          <li>Bezpieczne przesyłanie plików w obie strony</li>
          <li>Powiadomienia o terminach, decyzjach i dokumentach do podpisu</li>
          <li>Komunikacja zawsze w kontekście sprawy — nigdy „w którym mailu to było"</li>
          <li>Pełna ścieżka audytu: kto, kiedy, co przekazał</li>
        </ul>
        <div class="pillar-trust">Audytowalne · RODO · Kontrola dostępów</div>
      </div>
      <div class="pillar-visual" aria-hidden="true">
        <div class="mini mini-portal">
          <div class="mini-head">
            <span class="mini-title">Twoja sprawa — SR-184/25</span>
            <span class="mini-pill">Aktywna</span>
          </div>
          <ol class="progress-stages">
            <li class="stage done"><span class="stage-dot"></span><span class="stage-label">Wniosek złożony</span></li>
            <li class="stage active"><span class="stage-dot"></span><span class="stage-label">Postępowanie układowe</span></li>
            <li class="stage"><span class="stage-dot"></span><span class="stage-label">Zatwierdzenie układu</span></li>
          </ol>
          <div class="mini-list">
            <div class="mini-row">
              <span class="mini-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              </span>
              <div class="mini-row-body">
                <div class="mini-row-title">Plan układu — wersja 3</div>
                <div class="mini-row-meta">Dodano 2h temu · Wymaga podpisu</div>
              </div>
              <span class="mini-badge attention">Do akcji</span>
            </div>
            <div class="mini-row">
              <span class="mini-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              </span>
              <div class="mini-row-body">
                <div class="mini-row-title">Spotkanie z prawnikiem</div>
                <div class="mini-row-meta">Jutro, 11:00 · Online</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>

    <!-- Pillar 02 — Generator Układów i Dokumentów -->
    <article class="pillar pillar-reverse">
      <div class="pillar-num" aria-hidden="true">02</div>
      <div class="pillar-content">
        <span class="pillar-eyebrow">Automatyzacja dokumentacji procesowej</span>
        <h3>Generator Układów i Dokumentów</h3>
        <p class="pillar-headline">Dokumentacja postępowania powstaje sama — na Twoich szablonach.</p>
        <p class="pillar-lead">Kancelaria definiuje własne wzory pism, ankiet i planów. System wypełnia je danymi sprawy i generuje wersje robocze gotowe do akceptacji prawnika. Plan układu, propozycja układowa, wniosek do sądu, plan PZU — powstają w minutach, w standardzie Twojej kancelarii.</p>
        <ul class="pillar-features">
          <li>Twoje wzorce, nie szablony „pudełkowe" — pełna kontrola nad formatem i językiem</li>
          <li>Plany restrukturyzacyjne, propozycje układowe, ankiety, pisma procesowe</li>
          <li>Drafty gotowe do recenzji prawnika, nie do pisania od zera</li>
          <li>Spójność w całej kancelarii — eliminacja literówek i niespójnych klauzul</li>
          <li>Podpis elektroniczny i wersjonowanie wbudowane</li>
          <li>Ścieżka audytu od draftu po podpisany oryginał</li>
        </ul>
        <div class="pillar-trust">Twoje szablony · Twoja kontrola · Plan układu w ok. 8 minut</div>
      </div>
      <div class="pillar-visual" aria-hidden="true">
        <div class="mini mini-generator">
          <div class="mini-head">
            <span class="mini-title">Generator dokumentów</span>
            <span class="mini-pill cyan">Auto</span>
          </div>
          <div class="flow">
            <div class="flow-step">
              <span class="flow-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/></svg>
              </span>
              <span>Dane sprawy</span>
            </div>
            <span class="flow-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </span>
            <div class="flow-step">
              <span class="flow-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="9" x2="9" y2="21"/></svg>
              </span>
              <span>Twój szablon</span>
            </div>
            <span class="flow-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </span>
            <div class="flow-step">
              <span class="flow-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
              </span>
              <span>Draft .doc/.pdf</span>
            </div>
          </div>
          <div class="mini-list">
            <div class="mini-row">
              <span class="mini-row-title">Plan układu — Nowak Logistyka</span>
              <span class="mini-badge attention">Do akceptacji</span>
            </div>
            <div class="mini-row">
              <span class="mini-row-title">Test prywatnego wierzyciela — Polver</span>
              <span class="mini-badge done">Podpisany</span>
            </div>
            <div class="mini-row">
              <span class="mini-row-title">Propozycje układowe — Meridian Bud</span>
              <span class="mini-badge draft">Draft</span>
            </div>
          </div>
        </div>
      </div>
    </article>

    <!-- Pillar 03 — AI Windykator -->
    <article class="pillar">
      <div class="pillar-num" aria-hidden="true">03</div>
      <div class="pillar-content">
        <span class="pillar-eyebrow">
          Płynność finansowa kancelarii
          <span class="status-live"><span class="status-dot"></span>Dostępne</span>
        </span>
        <h3>AI Windykator</h3>
        <p class="pillar-headline">Twoja kancelaria zawsze wie, kto i ile jest jej winien — i działa, zanim faktura stanie się problemem.</p>
        <p class="pillar-lead">AI Windykator monitoruje wszystkie wystawione faktury, śledzi należności od klientów kancelarii i automatycznie inicjuje proces odzyskiwania zaległości — zanim wpłyną na płynność firmy. To nie windykacja w imieniu klienta. To kontrola własnych należności kancelarii, prowadzona w tle, bez angażowania prawnika.</p>
        <ul class="pillar-features">
          <li>Pełny widok należności: kto, ile, jak długo zalega — w jednym dashboardzie</li>
          <li>Automatyczne wezwania do zapłaty w eskalacji ustalonej przez partnera kancelarii (e-mail, SMS, telefon)</li>
          <li>Klasyfikacja klientów według ryzyka opóźnienia — system rozpoznaje niewypłacalność wcześniej</li>
          <li>Wczesne alerty: faktura zagrożona zanim stanie się sprawą windykacyjną</li>
          <li>Integracja z systemem fakturowania kancelarii oraz KSeF</li>
          <li>Ślad audytowy każdej akcji windykacyjnej — od pierwszego monitu po wezwanie formalne</li>
        </ul>
        <div class="pillar-trust">KSeF · Auto-wezwania · Pełen audyt operacji</div>
      </div>
      <div class="pillar-visual" aria-hidden="true">
        <div class="mini mini-windykator">
          <div class="mini-head">
            <span class="mini-title">Opóźnione należności</span>
            <span class="mini-pill trend-down">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
              –42% MoM
            </span>
          </div>
          <div class="kpi-strip">
            <div class="kpi-block">
              <div class="kpi-num">28 460 zł</div>
              <div class="kpi-lbl">Aktualne saldo zaległości</div>
            </div>
            <div class="kpi-block">
              <div class="kpi-num">7</div>
              <div class="kpi-lbl">Faktur w procesie</div>
            </div>
          </div>
          <svg class="cfo-chart" viewBox="0 0 320 120" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="win-area" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stop-color="#22c55e" stop-opacity="0.26"/>
                <stop offset="100%" stop-color="#22c55e" stop-opacity="0"/>
              </linearGradient>
            </defs>
            <!-- area: linia spada — overdue maleje -->
            <path d="M0,28 L40,32 L80,40 L120,48 L160,58 L200,68 L240,78 L280,86 L320,92 L320,120 L0,120 Z" fill="url(#win-area)"/>
            <!-- line trending DOWN (= less overdue = good) -->
            <path d="M0,28 L40,32 L80,40 L120,48 L160,58 L200,68 L240,78 L280,86 L320,92" fill="none" stroke="#22c55e" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>
            <!-- last dot -->
            <circle cx="320" cy="92" r="4" fill="#22c55e"/>
            <circle cx="320" cy="92" r="9" fill="#22c55e" opacity="0.18"/>
            <!-- start label (subtelny) -->
            <text x="6" y="22" font-size="9" fill="#94a3b8" font-family="inherit">Q3</text>
            <text x="296" y="86" font-size="9" fill="#15803d" font-family="inherit" font-weight="600">Teraz</text>
          </svg>
          <div class="cfo-alerts">
            <div class="cfo-alert">
              <span class="alert-dot success"></span>
              <div class="alert-body">
                <div class="alert-title">FV/2025/0167 — Spłacone</div>
                <div class="alert-meta">8 200 zł · po 2. monicie e-mail</div>
              </div>
            </div>
            <div class="cfo-alert">
              <span class="alert-dot warning"></span>
              <div class="alert-body">
                <div class="alert-title">FV/2025/0184 — Wezwanie 1</div>
                <div class="alert-meta">4 500 zł · 12 dni opóźnienia</div>
              </div>
            </div>
            <div class="cfo-alert">
              <span class="alert-dot danger"></span>
              <div class="alert-body">
                <div class="alert-title">FV/2025/0152 — Eskalacja: wezwanie formalne</div>
                <div class="alert-meta">15 760 zł · 38 dni · ryzyko wysokie</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>

    <div class="pillars-roadmap" role="note">
      <span class="roadmap-pill">W przygotowaniu</span>
      Bezpośrednia integracja z Krajowym Rejestrem Zadłużonych — monitoring obwieszczeń sądowych i automatyczne alerty w CRM.
    </div>

    <div class="pillars-cta">
      <h3>Sprawdź, jak te trzy filary działają na realnej sprawie z Twojej kancelarii.</h3>
      <div class="pillars-cta-row">
        <a class="btn btn-primary btn-lg"
           href="https://cal.com/szymon-bazan-iahn2z/15min"
           target="_blank" rel="noopener"
           data-cta="pillars-demo">
          Zobacz demo
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </a>
        <a class="btn btn-ghost btn-lg"
           href="mailto:kontakt@boosterai.pl"
           data-cta="pillars-contact">
          Skontaktuj się
        </a>
      </div>
      <p class="pillars-cta-hint">15-minutowe demo · bez prezentacji · działający system na Twoich danych.</p>
      <p class="pillars-trust-bar">Polski cloud · Audytowalne · RODO · Standardy sektora prawnego</p>
    </div>
  </div>
</section>

<!-- ============================================================
     ECOSYSTEM CALLOUT
     ============================================================ -->
<section>
  <div class="container">
    <div class="ecosystem">
      <span class="eyebrow" style="background: rgba(255,255,255,.1); color: #99d9ff;">Co wyróżnia to wdrożenie</span>
      <h2>Jeden zintegrowany ekosystem, nie zestaw skryptów</h2>
      <blockquote>
        CRM, SharePoint, API GUS/Regon, Mailerlite, SMS i poczta email działają razem —
        automatycznie przekazując dane przez cały cykl życia sprawy restrukturyzacyjnej.
        Żaden element nie działa w oderwaniu od pozostałych.
        <span style="display:block;margin-top:14px;font-size:.92em;opacity:.75;">Integracja z KRZ — w przygotowaniu.</span>
      </blockquote>
      <div class="tags">
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

<!-- ============================================================
     HOW IT WORKS
     ============================================================ -->
<section id="jak-to-dziala">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Jak to działa</span>
      <h2>Cztery kroki od pierwszego kontaktu do zatwierdzonego układu</h2>
    </div>
    <div class="steps steps-4">
      <div class="step">
        <h4>Onboarding klienta</h4>
        <p>Klient trafia do Strefy Klienta. Widzi status sprawy, ankietę restrukturyzacyjną i pierwsze dokumenty — w jednym, zabezpieczonym kanale.</p>
      </div>
      <div class="step">
        <h4>Generowanie dokumentacji</h4>
        <p>Plan układu, propozycje układowe, pisma procesowe — automatyczne drafty na Twoich szablonach. Prawnik recenzuje, nie pisze od zera.</p>
      </div>
      <div class="step">
        <h4>Postępowanie sądowe</h4>
        <p>Obsługa wniosków, korespondencji z wierzycielami i terminów procesowych w systemie. Klient widzi każdy kluczowy ruch.</p>
      </div>
      <div class="step">
        <h4>Płynność kancelarii</h4>
        <p>AI Windykator pilnuje należności od klientów kancelarii, klasyfikuje ryzyko i automatycznie eskaluje opóźnione faktury — bez angażowania prawnika.</p>
      </div>
    </div>

    <div class="inline-cta">
      <a class="btn btn-primary btn-lg"
         href="https://cal.com/szymon-bazan-iahn2z/15min"
         target="_blank" rel="noopener"
         data-cta="after-how-demo">
        Zobacz demo
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"/></svg>
      </a>
      <div class="hint">15 minut · bez przygotowania · działający system na żywo.</div>
    </div>
  </div>
</section>

<!-- ============================================================
     WHY LEGALFLO
     ============================================================ -->
<section id="dlaczego" style="background: var(--navy-50);">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Dlaczego LegalFlow</span>
      <h2>Co odróżnia LegalFlow od ogólnych narzędzi automatyzacji</h2>
      <p>Sześć rzeczy, które robią różnicę w realnej pracy kancelarii restrukturyzacyjnej.</p>
    </div>

    <div class="why-grid">
      <div class="why-item">
        <span class="why-check" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
        <div>
          <h4>Personalizacja pod procesy kancelarii</h4>
          <p>LegalFlow dopasowuje się do Twojego flow — nie na odwrót. Dokumenty, szablony i automatyzacje odzwierciedlają realne procesy Twojej kancelarii.</p>
        </div>
      </div>
      <div class="why-item">
        <span class="why-check" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
        <div>
          <h4>Bezpieczeństwo danych klientów</h4>
          <p>Dane sprawy, dokumenty i korespondencja są przechowywane zgodnie ze standardami bezpieczeństwa dla sektora prawnego. Pełna kontrola dostępów i audytowalność.</p>
        </div>
      </div>
      <div class="why-item">
        <span class="why-check" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
        <div>
          <h4>Integracja z narzędziami, których już używasz</h4>
          <p>LegalFlow łączy się z Twoim CRM, SharePoint, systemem płatności i pocztą. Jeden spójny ekosystem — bez powielania pracy między systemami.</p>
        </div>
      </div>
      <div class="why-item">
        <span class="why-check" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
        <div>
          <h4>Wdrożenie end-to-end</h4>
          <p>Od onboardingu po archiwizację — każdy etap sprawy jest w systemie. Żaden dokument, termin ani kontakt nie wypada między etapami.</p>
        </div>
      </div>
      <div class="why-item">
        <span class="why-check" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
        <div>
          <h4>Branżowe know-how</h4>
          <p>System jest zbudowany z rozumieniem prawa restrukturyzacyjnego i insolvency workflow — nie jako ogólna automatyzacja skrojona pod restrukturyzację.</p>
        </div>
      </div>
      <div class="why-item">
        <span class="why-check" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
        <div>
          <h4>Skalowanie bez nowych etatów</h4>
          <p>Więcej spraw, ten sam zespół. Automatyzacja administracji pozwala kancelarii rosnąć bez proporcjonalnego wzrostu kosztów operacyjnych.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ============================================================
     BENEFITS 2x2
     ============================================================ -->
<section class="benefits" id="korzysci">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Korzyści biznesowe</span>
      <h2>Konkretne zmiany w codziennej pracy kancelarii</h2>
    </div>

    <div class="benefits-grid">
      <div class="benefit-card">
        <div class="benefit-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </div>
        <h3>Nawet –70% mniej czasu administracyjnego</h3>
        <p>Generowanie dokumentów, kontakty z wierzycielami, monitoring terminów — system wykonuje to automatycznie. Zespół zajmuje się sprawami, nie obsługą procesu.</p>
      </div>
      <div class="benefit-card">
        <div class="benefit-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        </div>
        <h3>Więcej spraw bez nowych etatów</h3>
        <p>Automatyzacja administracji pozwala obsługiwać większą liczbę postępowań przy tym samym zespole. Wzrost skali bez proporcjonalnego wzrostu kosztów.</p>
      </div>
      <div class="benefit-card">
        <div class="benefit-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        </div>
        <h3>Zero przeoczonych terminów</h3>
        <p>Alerty o płatnościach, zadania windykacyjne, sprawozdania kwartalne — LegalFlow pilnuje kalendarza sprawy na każdym etapie postępowania.</p>
      </div>
      <div class="benefit-card">
        <div class="benefit-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
        </div>
        <h3>Porządek w dokumentacji każdej sprawy</h3>
        <p>Każda sprawa ma kompletną teczkę w SharePoint. Dokumenty odkładają się automatycznie — bez ręcznego porządkowania i szukania plików.</p>
      </div>
      <div class="benefit-card">
        <div class="benefit-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        </div>
        <h3>Automatyczny kontakt z wierzycielami i dłużnikiem</h3>
        <p>Wiadomości powitalne, propozycje układowe, przypomnienia o płatnościach — wysyłane automatycznie, na właściwym etapie, do właściwych stron.</p>
      </div>
      <div class="benefit-card">
        <div class="benefit-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        </div>
        <h3>Pełna kontrola nad statusem każdej sprawy</h3>
        <p>Jeden widok na pipeline spraw, aktywne postępowania i alerty. Bez sprawdzania kilku systemów jednocześnie.</p>
      </div>
    </div>
  </div>
</section>

<!-- ============================================================
     FINAL CTA
     ============================================================ -->
<section>
  <div class="container">
    <div class="final-cta">
      <span class="eyebrow" style="background: rgba(255,255,255,.1); color: #99d9ff;">Następny krok</span>
      <h2>Sprawdź, jak LegalFlow działa na realnych sprawach z Twojej kancelarii.</h2>
      <p>Umów 15-minutowe demo — pokażemy system na żywo, bez slajdów i marketingu. Zobaczysz, co konkretnie zmienia się w codziennej pracy.</p>
      <div class="final-cta-row">
        <a class="btn btn-primary btn-lg"
           href="https://cal.com/szymon-bazan-iahn2z/15min"
           target="_blank" rel="noopener"
           data-cta="final-demo">
          Zobacz demo
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </a>
        <a class="btn btn-secondary-final btn-lg"
           href="mailto:kontakt@boosterai.pl"
           data-cta="final-contact">
          Skontaktuj się
        </a>
      </div>
      <span class="small">15-minutowe demo · bez przygotowania · pokazujemy działający system.</span>
    </div>
  </div>
</section>

<!-- ============================================================
     FAQ
     ============================================================ -->
<section class="faq" id="faq">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">FAQ</span>
      <h2>Najczęstsze pytania</h2>
    </div>

    <div class="faq-list">
      <details class="faq-item">
        <summary>
          <span>Czy LegalFlow zastępuje mój obecny CRM?</span>
          <svg class="faq-chev" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
        </summary>
        <div class="faq-content">
          <p>Nie. LegalFlow integruje się z CRM, którego już używasz (HubSpot, Pipedrive, monday.com i inne). Automatyzuje procesy na jego bazie — nie wymaga migracji danych ani zmiany systemu.</p>
        </div>
      </details>

      <details class="faq-item">
        <summary>
          <span>Jak długo trwa wdrożenie?</span>
          <svg class="faq-chev" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
        </summary>
        <div class="faq-content">
          <p>Pierwsze moduły można uruchomić w ciągu kilku tygodni. Zakres i czas wdrożenia zależy od liczby modułów i specyfiki procesów kancelarii — omawiamy to indywidualnie.</p>
        </div>
      </details>

      <details class="faq-item">
        <summary>
          <span>Czy system jest bezpieczny dla danych klientów kancelarii?</span>
          <svg class="faq-chev" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
        </summary>
        <div class="faq-content">
          <p>Tak. Dane są przechowywane zgodnie ze standardami bezpieczeństwa dla sektora prawnego, z kontrolą dostępów i pełną audytowalnością operacji.</p>
        </div>
      </details>

      <details class="faq-item">
        <summary>
          <span>Czy mogę wdrożyć tylko wybrane moduły?</span>
          <svg class="faq-chev" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
        </summary>
        <div class="faq-content">
          <p>Tak. Każdy moduł działa niezależnie, choć integrują się ze sobą. Możesz zacząć od jednego modułu i rozszerzać system wraz z rozwojem kancelarii.</p>
        </div>
      </details>

      <details class="faq-item">
        <summary>
          <span>Kiedy pojawi się integracja z KRZ?</span>
          <svg class="faq-chev" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
        </summary>
        <div class="faq-content">
          <p>Bezpośrednia integracja z Krajowym Rejestrem Zadłużonych jest w przygotowaniu jako rozszerzenie filaru postępowania sądowego — automatyczny monitoring obwieszczeń i alerty w CRM. Pojawi się w jednej z kolejnych wersji. Możesz zostawić kontakt — poinformujemy o uruchomieniu.</p>
        </div>
      </details>
    </div>
  </div>
</section>

</main>

<!-- ============================================================
     OFFER MODAL
     ============================================================ -->
<div class="modal-backdrop" id="offer-modal" data-open="false" role="dialog"
     aria-modal="true" aria-labelledby="offer-modal-title" aria-hidden="true">
  <div class="modal" data-state="form">
    <button type="button" class="modal-close" data-modal-close aria-label="Zamknij okno">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></svg>
    </button>

    <div class="modal-badge" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      Odpiszemy w ciągu 1 dnia roboczego
    </div>

    <h3 id="offer-modal-title">Skontaktuj się z nami</h3>
    <p class="modal-lead">
      Podaj numer telefonu, a odezwiemy się w ciągu 1 dnia roboczego.
      Krótko omówimy, jak LegalFlow może wesprzeć Twoją kancelarię.
    </p>

    <form id="offer-form" novalidate>
      <div class="form-field">
        <label for="offer-phone">Numer telefonu</label>
        <input
          type="tel"
          id="offer-phone"
          name="phone"
          required
          autocomplete="tel"
          inputmode="tel"
          placeholder="+48 600 000 000"
          pattern="^[\+\s0-9\-\(\)]{7,}$"
        >
      </div>
      <div class="form-field">
        <label for="offer-name">Imię (opcjonalnie)</label>
        <input
          type="text"
          id="offer-name"
          name="name"
          autocomplete="given-name"
          placeholder="Jak mamy się zwracać"
        >
      </div>
      <div class="form-consent">
        Klikając „Skontaktuj się" wyrażasz zgodę na kontakt w sprawie LegalFlow.
        Szczegóły w <a href="https://boosterai.pl/privacy-policy/" target="_blank" rel="noopener">polityce prywatności</a>.
      </div>
      <button type="submit" class="btn btn-primary btn-lg" data-cta="offer-submit">
        Skontaktuj się
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </button>
    </form>

    <div class="form-success" role="status" aria-live="polite">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="8 12 11 15 16 9"/></svg>
      <h3>Dziękujemy!</h3>
      <p>Odezwiemy się w ciągu 1 dnia roboczego.</p>
    </div>
  </div>
</div>

<!-- ============================================================
     FOOTER
     ============================================================ -->
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <div class="logo" style="color: white;">
          <span class="logo-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 5h9a3 3 0 0 1 0 6H9v3h9" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="7" cy="19" r="2" fill="white"/>
              <circle cx="18" cy="19" r="2" fill="white"/>
              <path d="M9 19h7" stroke="white" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </span>
          <span class="logo-text" style="color: white;">Legal<span style="color: #66d0ff;">Flo</span></span>
        </div>
        <p style="margin-top: 16px; color: #9ab3d6; max-width: 36ch; font-size: .92rem;">
          Automatyzacja kancelarii restrukturyzacyjnej — od leada do archiwizacji. LegalFlow by Booster AI.
        </p>
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
        <a href="https://cal.com/szymon-bazan-iahn2z/15min" target="_blank" rel="noopener" data-cta="footer-demo">Zobacz demo</a>
        <a href="mailto:kontakt@boosterai.pl" data-cta="footer-contact">Skontaktuj się</a>
        <a href="https://boosterai.pl/privacy-policy/" target="_blank" rel="noopener">Polityka prywatności</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© <span id="year">2026</span> Booster AI. Wszelkie prawa zastrzeżone.</span>
      <span class="brand-note">LegalFlow by Booster AI</span>
    </div>
  </div>
</footer>
`;

const submitButtonDefaultMarkup = String.raw`
        Skontaktuj się
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
      `;
const workerUrl = "https://clickup-lead-proxy.szymon-sidor.workers.dev";

type FormState = "form" | "success";

type LeadResponse = {
  error?: string;
};

function isLeadResponse(value: unknown): value is LeadResponse {
  return typeof value === "object" && value !== null && ("error" in value ? typeof (value as { error?: unknown }).error === "string" : true);
}

export default function RestrukturyzacjaPage() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [formState, setFormState] = useState<FormState>("form");
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [year, setYear] = useState(2025);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    phoneRef.current = wrapper.querySelector<HTMLInputElement>("#offer-phone");
    nameRef.current = wrapper.querySelector<HTMLInputElement>("#offer-name");
  }, []);

  useEffect(() => {
    const yearElement = wrapperRef.current?.querySelector<HTMLElement>("#year");
    if (yearElement) {
      yearElement.textContent = String(year);
    }
  }, [year]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const pillars = document.querySelectorAll<HTMLElement>(".lf .pillar");
    if (!pillars.length || !("IntersectionObserver" in window)) return;

    pillars.forEach((pillar, index) => {
      pillar.style.opacity = "0";
      pillar.style.transform = "translateY(18px)";
      pillar.style.transition = `opacity .6s ease ${index * 120}ms, transform .6s ease ${index * 120}ms, box-shadow .3s ease, border-color .25s ease`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
            observer.unobserve(element);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );

    pillars.forEach((pillar) => observer.observe(pillar));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const button = wrapperRef.current?.querySelector<HTMLButtonElement>(".mobile-toggle");
    const menu = wrapperRef.current?.querySelector<HTMLElement>("#mobile-menu");

    if (button) {
      button.setAttribute("aria-expanded", String(menuOpen));
      button.setAttribute("aria-label", menuOpen ? "Zamknij menu" : "Otwórz menu");
    }

    if (menu) {
      menu.setAttribute("data-open", String(menuOpen));
    }
  }, [menuOpen]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const modal = wrapper.querySelector<HTMLElement>("#offer-modal");
    const dialog = wrapper.querySelector<HTMLElement>("#offer-modal .modal");
    const form = wrapper.querySelector<HTMLFormElement>("#offer-form");

    if (!modal || !dialog) return;

    modal.setAttribute("data-open", String(modalOpen));
    modal.setAttribute("aria-hidden", String(!modalOpen));
    dialog.setAttribute("data-state", formState);
    document.body.style.overflow = modalOpen ? "hidden" : "";

    if (modalOpen) {
      if (formState === "form") {
        form?.reset();
      }
      window.setTimeout(() => {
        phoneRef.current?.focus();
      }, 80);
      return;
    }

    if (lastFocusRef.current) {
      lastFocusRef.current.focus();
      lastFocusRef.current = null;
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [formState, modalOpen]);

  useEffect(() => {
    const form = wrapperRef.current?.querySelector<HTMLFormElement>("#offer-form");
    if (!form) return;

    form.querySelector<HTMLElement>(".form-error")?.remove();

    if (formError) {
      const error = document.createElement("div");
      error.className = "form-error";
      error.setAttribute("role", "alert");
      error.style.cssText = "color:#c53030;background:rgba(255,85,102,.08);padding:10px 14px;border-radius:8px;font-size:.88rem;margin-bottom:12px;";
      error.textContent = formError;
      form.insertBefore(error, form.firstChild);
      phoneRef.current?.setAttribute("aria-invalid", "true");
      return;
    }

    phoneRef.current?.removeAttribute("aria-invalid");
  }, [formError]);

  useEffect(() => {
    const submitButton = wrapperRef.current?.querySelector<HTMLButtonElement>('#offer-form button[type="submit"]');
    if (!submitButton) return;

    submitButton.disabled = submitting;
    submitButton.innerHTML = submitting ? "Wysyłam…" : submitButtonDefaultMarkup;
  }, [submitting]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const mobileToggle = target.closest<HTMLButtonElement>(".mobile-toggle");
      if (mobileToggle) {
        event.preventDefault();
        setMenuOpen((current) => !current);
        return;
      }

      if (target.closest("#mobile-menu a")) {
        setMenuOpen(false);
      }

      const opener = target.closest<HTMLElement>('[data-modal-open="offer-modal"]');
      if (opener) {
        event.preventDefault();
        if (closeTimerRef.current) {
          window.clearTimeout(closeTimerRef.current);
        }
        lastFocusRef.current = opener;
        setFormError(null);
        setFormState("form");
        setSubmitting(false);
        setModalOpen(true);
        return;
      }

      const modal = wrapper.querySelector<HTMLElement>("#offer-modal");
      const closeTrigger = target.closest("[data-modal-close]");
      if (closeTrigger || (modal && target === modal)) {
        event.preventDefault();
        setModalOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && modalOpen) {
        setModalOpen(false);
      }
    };

    wrapper.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      wrapper.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalOpen]);

  useEffect(() => {
    const form = wrapperRef.current?.querySelector<HTMLFormElement>("#offer-form");
    if (!form) return;

    const onSubmit = async (event: SubmitEvent) => {
      event.preventDefault();
      await handleFormSubmit();
    };

    form.addEventListener("submit", onSubmit);

    return () => {
      form.removeEventListener("submit", onSubmit);
    };
  });

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }
      document.body.style.overflow = "";
    };
  }, []);

  async function handleFormSubmit() {
    const phone = (phoneRef.current?.value ?? "").trim();
    const name = (nameRef.current?.value ?? "").trim();

    setFormError(null);

    if (!/^[\+\s0-9\-\(\)]{7,}$/.test(phone)) {
      phoneRef.current?.setAttribute("aria-invalid", "true");
      setFormError("Podaj prawidłowy numer telefonu.");
      phoneRef.current?.focus();
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(workerUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          name,
          source: "LegalFlow landing — Skontaktuj się",
        }),
      });

      if (!response.ok) {
        let message = "Coś poszło nie tak. Spróbuj ponownie za chwilę.";

        try {
          const data: unknown = await response.json();
          if (isLeadResponse(data) && data.error === "Provide a valid email or phone") {
            message = "Podaj prawidłowy numer telefonu.";
          }
        } catch {}

        throw new Error(message);
      }

      setFormState("success");
      setSubmitting(false);

      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }

      closeTimerRef.current = window.setTimeout(() => {
        setModalOpen(false);
      }, 4000);
    } catch (error) {
      setSubmitting(false);
      setFormError(error instanceof Error ? error.message : "Nie udało się wysłać. Spróbuj ponownie.");
    }
  }

  return <div ref={wrapperRef} className="lf" dangerouslySetInnerHTML={{ __html: pageMarkup }} />;
}
