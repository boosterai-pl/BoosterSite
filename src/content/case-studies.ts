// Case studies shown in the home page "Work" section.
// Order of this list = display order (numbered 01, 02, ...).
import type { CaseStudyEntry } from "./types";

export const caseStudies: readonly CaseStudyEntry[] = [
  {
    en: {
      title: "LegalFlow",
      description: "Our automation platform for restructuring law firms, built to relieve the team, not replace the lawyer. Generates case documentation from a firm’s own templates, automates creditor communication and deadline tracking, and cuts administrative work by up to 70%. More cases, same team.",
      tags: ["Legal Tech", "IN PRODUCTION"],
    },
    pl: {
      title: "Legal Flow — Restrukturyzacja",
      description: "Oszczędza setki godzin i dziesiątki tysięcy PLN na sprawę w postępowaniach restrukturyzacyjnych wysokiej stawki (obsługa zadłużenia korporacyjnego w wysokości ponad 500 tys. PLN). Zastąpiono powolne notatki ręczne silnikiem AI, który natychmiast przekształca godzinne wywiady audio z klientami w w pełni ustrukturyzowane projekty prawne do ostatecznej weryfikacji.",
      tags: ["Legal Tech", "W PRODUKCJI"],
    },
  },
  {
    en: {
      title: "Lead Booster",
      description: "Our autonomous outbound engine. Every morning it scans public data sources, enriches each record with verified decision-maker contacts, and generates a complete outreach pack (a context note, a multi-touch email sequence, and a cold-call script) then pushes it straight into your CRM.",
      tags: ["B2B SaaS", "IN PRODUCTION"],
    },
    pl: {
      title: "Lead Booster",
      description: "Nasz autonomiczny silnik outbound. Każdego ranka skanuje publiczne źródła danych, wzbogaca każdy rekord o zweryfikowane kontakty do decydentów i generuje kompletny pakiet outreachowy — notatkę kontekstową, wieloetapową sekwencję e-mailową i skrypt cold-call — a następnie przesyła go bezpośrednio do Twojego CRM.",
      tags: ["B2B SaaS", "W PRODUKCJI"],
    },
  },
  {
    en: {
      title: "Sales Automation Platform",
      description: "Automated the bulk of a manual sales workflow for a large operation. Cut proposal creation from days of digging through scattered spreadsheets to under an hour. Shipped to production in eight weeks.",
      tags: ["B2B SaaS", "IN PRODUCTION"],
    },
    pl: {
      title: "Sales Automation Platform",
      description: "Zautomatyzowaliśmy większość ręcznego procesu sprzedaży dla dużej firmy. Skróciliśmy czas tworzenia ofert z kilku dni przeszukiwania rozproszonych arkuszy kalkulacyjnych do mniej niż godziny. Wdrożone produkcyjnie w osiem tygodni.",
      tags: ["B2B SaaS", "W PRODUKCJI"],
    },
  },
  {
    en: {
      title: "AI Decision Support",
      description: "An LLM-powered decision-support assistant for senior management at a large, operations-heavy enterprise. It unifies scattered operational data into a single context, then surfaces analysis and concrete optimization recommendations so managers decide on live data, not month-old reports. Delivered as a working prototype and validated with the leadership team.",
      tags: ["Enterprise AI", "PROTOTYPE"],
    },
    pl: {
      title: "AI Decision Support",
      description: "Asystent wspomagający decyzje zarządu oparty na LLM, stworzony dla dużego przedsiębiorstwa o rozbudowanej strukturze operacyjnej. Łączy rozproszone dane operacyjne w jednym kontekście i dostarcza analizę oraz konkretne rekomendacje optymalizacyjne — tak by menedżerowie podejmowali decyzje na bieżących danych, a nie miesięcznych raportach. Dostarczony jako działający prototyp i zwalidowany z zespołem kierowniczym.",
      tags: ["Enterprise AI", "PROTOTYP"],
    },
  },
  {
    en: {
      title: "Public-Sector Platform",
      description: "A platform built on license-free, open-source architecture with no vendor lock-in. Brings citizen services, internal workflows, and AI assistance into one system, shifting deployment timelines from quarters to weeks.",
      tags: ["GovTech", "PROTOTYPE"],
    },
    pl: {
      title: "Aplikacja dla Samorządów",
      description: "Linia produktów B2G dla polskich gmin oparta na architekturze open-source bez licencji, aby wyeliminować blokadę ze strony dostawcy. Integruje usługi skierowane do obywateli, wewnętrzne przepływy pracy i pomoc AI, przenosząc tradycyjne wdrażanie w sektorze publicznym z kwartałów na tygodnie.",
      tags: ["GovTech", "PROTOTYP"],
    },
  },
];
