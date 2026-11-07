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
      title: "Pamięć klienta dla agencji",
      company: "Agencja strategiczno-kreatywna, która prowadzi klientów latami.",
      summary:
        "Wszystko, czego agencja nauczyła się o kliencie, jest w jednej karcie, na której pracują ludzie i agenci AI. Planer układa plan na kolejny miesiąc z pamięcią poprzednich kampanii, a Weryfikator sprawdza każdy materiał przed wysyłką do klienta.",
      metrics: [
        { value: "Cała historia", label: "współpracy z klientem przy każdej kampanii" },
        { value: "Reguły w kodzie", label: "zakazy marki i daty sprawdzane przed wysyłką" },
      ],
      link: { label: "Automatyzacja z AI", href: "/practices/ai-automation" },
    },
    en: {
      kind: "Client project",
      title: "Client memory for an agency",
      company: "A strategy and creative agency that works with clients for years.",
      summary:
        "Everything the agency has learned about a client lives in one client card that both people and AI agents work on. The Planner drafts next month's plan with the memory of past campaigns, and the Checker reviews every piece before it goes to the client.",
      metrics: [
        { value: "Full history", label: "of the client relationship behind every campaign" },
        { value: "Rules in code", label: "brand bans and dates checked before anything is sent" },
      ],
      link: { label: "AI automation", href: "/practices/ai-automation" },
    },
  },
  {
    example: true,
    pl: {
      kind: "Przykład zastosowania",
      title: "Opcje na salach w jednym kalendarzu, a nie w mailach",
      company: "Agencje eventowe, obiekty konferencyjne i hotele.",
      summary:
        "Opcje na sale zakłada się dziś telefonicznie, a terminy żyją w prywatnych Excelach. Łączymy obiekty, opcje i oferty w jednym systemie: każda opcja ma datę ważności, zajęty termin ma kolejkę chętnych, a klient wybiera obiekt przez link zamiast z PDF-a.",
      metrics: [],
      link: { label: "Porozmawiajmy o Twoim procesie", href: "/book?z=usecase-eventy" },
    },
    en: {
      kind: "Use case",
      title: "Venue options in one calendar, not in email threads",
      company: "Event agencies, conference venues and hotels.",
      summary:
        "Today, options on rooms are placed by phone and the dates live in private spreadsheets. We put venues, options and offers in one system: every option has an expiry date, a taken date has a waiting queue, and the client picks a venue through a link instead of a PDF.",
      metrics: [],
      link: { label: "Talk to us about your process", href: "/book?z=usecase-events" },
    },
  },
];
