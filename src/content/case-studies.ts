// Cases in the "Realizacje" section of the home page. Order = display order.
// Keep each card short: what we did in a sentence or two, and the results shown large.
// Only true results. The media client is confidential: no name, no system name, no numbers.
import type { CaseStudyEntry } from "./types";

export const caseStudies: readonly CaseStudyEntry[] = [
  {
    featured: true,
    pl: {
      kind: "Platforma dla kancelarii",
      title: "LegalFlow",
      company: "Platforma dla kancelarii restrukturyzacyjnych.",
      summary: "Dokumenty sprawy z szablonów kancelarii, komunikacja z wierzycielami i pilnowanie terminów w jednym systemie. Asystent AI rozmawia z klientem i sam uzupełnia sprawę.",
      metrics: [{ value: "do 70%", label: "mniej pracy administracyjnej w kancelarii" }],
      products: [
        {
          title: "Platforma LegalFlow",
          text: "Sprawy, pisma, zadania i terminy w jednym miejscu.",
          image: { src: "/assets/work/legalflow-platform.jpg", alt: "Karta sprawy w LegalFlow" },
          link: { label: "legal-flow.pl", href: "https://legal-flow.pl" },
        },
        {
          title: "Asystent AI",
          text: "Rozmawia z klientem kancelarii tekstem, głosem i przez telefon, a dane zapisuje w sprawie.",
          image: { src: "/assets/work/legalflow-assistant.jpg", alt: "Rozmowa z Asystentem AI LegalFlow" },
          link: { label: "Zobacz asystenta", href: "https://legal-flow.pl/asystentka" },
        },
      ],
      link: { label: "Więcej o LegalFlow", href: "/work/legalflow" },
    },
    en: {
      kind: "Platform for law firms",
      title: "LegalFlow",
      company: "A platform for restructuring law firms in Poland.",
      summary: "Case documents from the firm's own templates, communication with creditors and deadline tracking in one system. An AI assistant talks to the client and fills in the case.",
      metrics: [{ value: "up to 70%", label: "less administrative work in the firm" }],
      products: [
        {
          title: "LegalFlow platform",
          text: "Cases, documents, tasks and deadlines in one place.",
          image: { src: "/assets/work/legalflow-platform.jpg", alt: "A case card in LegalFlow" },
          link: { label: "legal-flow.pl", href: "https://legal-flow.pl" },
        },
        {
          title: "AI assistant",
          text: "Talks to the firm's clients by text, voice and phone, and saves the data in the case.",
          image: { src: "/assets/work/legalflow-assistant.jpg", alt: "A conversation with the LegalFlow AI assistant" },
          link: { label: "See the assistant", href: "https://legal-flow.pl/asystentka" },
        },
      ],
      link: { label: "More about LegalFlow", href: "/work/legalflow" },
    },
  },
  {
    pl: {
      kind: "Wdrożenie u klienta",
      title: "Zaświadczenia dla pracowników fizycznych",
      company: "Grupa czterech spółek budowlanych z pracownikami na budowach za granicą.",
      summary: "Comiesięczna aktualizacja zaświadczeń to teraz jedno kliknięcie w arkuszach, na których firma już pracuje.",
      metrics: [
        { value: "3 dni → 30 min", label: "comiesięcznej pracy" },
        { value: "99,8%", label: "skuteczności. Reszta to literówki do ręcznej poprawy" },
      ],
      link: { label: "Automatyzacja z AI", href: "/practices/ai-automation" },
    },
    en: {
      kind: "Client project",
      title: "Certificates for site workers",
      company: "A group of four construction companies with crews on sites abroad.",
      summary: "The monthly certificate update is now one click in the spreadsheets the company already uses.",
      metrics: [
        { value: "3 days → 30 min", label: "of monthly work" },
        { value: "99.8%", label: "accuracy. The rest are typos to fix by hand" },
      ],
      link: { label: "AI automation", href: "/practices/ai-automation" },
    },
  },
  {
    pl: {
      kind: "Wdrożenie u klienta",
      title: "Agent AI do pozyskiwania klientów",
      company: "Firma wykonawstwa inżynieryjnego z Wrocławia.",
      summary: "Agent AI przeszukuje sieć i podsuwa handlowcom firmy, które mogą być zainteresowane ofertą.",
      metrics: [
        { value: "3 tyg.", label: "do pierwszych efektów, według listu referencyjnego klienta" },
        { value: "Trafne leady", label: "i wyższa efektywność działu handlowego" },
      ],
      link: { label: "Automatyzacja z AI", href: "/practices/ai-automation" },
    },
    en: {
      kind: "Client project",
      title: "AI agent that finds new clients",
      company: "An engineering contractor from Wrocław.",
      summary: "An AI agent searches the web and suggests companies that may be interested in the offer to the sales team.",
      metrics: [
        { value: "3 weeks", label: "to first results, according to the client's reference letter" },
        { value: "Accurate leads", label: "and a more effective sales team" },
      ],
      link: { label: "AI automation", href: "/practices/ai-automation" },
    },
  },
  {
    pl: {
      kind: "Wdrożenie u klienta",
      title: "Silnik marketingu",
      company: "Firma produkująca treści cyfrowe.",
      summary: "Agenci AI prowadzą kampanie w Google, Meta i TikTok, budują strony pod kampanie i łączą wszystko z CRM w jeden proces.",
      metrics: [{ value: "Tańsze kampanie" }, { value: "Większa kontrola" }, { value: "Wzrost MRR" }],
      link: { label: "Automatyzacja z AI", href: "/practices/ai-automation" },
    },
    en: {
      kind: "Client project",
      title: "Marketing engine",
      company: "A digital content production company.",
      summary: "AI agents run campaigns in Google, Meta and TikTok, build landing pages for them and connect everything with the CRM in one process.",
      metrics: [{ value: "Cheaper campaigns" }, { value: "More control" }, { value: "Higher MRR" }],
      link: { label: "AI automation", href: "/practices/ai-automation" },
    },
  },
  {
    pl: {
      kind: "Wdrożenie u klienta",
      title: "System ERP",
      company: "Duża firma z branży mediowej.",
      summary: "Jeden system do zarządzania inwentarzem, sprzedażą, ofertami, klientami i dostępnością. Działa na bardzo dużym inwentarzu.",
      metrics: [{ value: "Jeden system", label: "zamiast danych rozproszonych po wielu miejscach" }],
      link: { label: "Oprogramowanie na miarę", href: "/practices/b2b-software" },
    },
    en: {
      kind: "Client project",
      title: "ERP system",
      company: "A large media company.",
      summary: "One system for inventory, sales, offers, clients and availability. It runs on a very large inventory.",
      metrics: [{ value: "One system", label: "instead of data scattered across many places" }],
      link: { label: "Custom software", href: "/practices/b2b-software" },
    },
  },
];
