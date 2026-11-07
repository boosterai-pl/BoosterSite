// Service "b2b-software": the card in the home page Services section and the page at /practices/b2b-software.
import type { ServiceEntry } from "../types";

export const b2bSoftware: ServiceEntry = {
  slug: "b2b-software",
  en: {
    card: {
      title: "Custom B2B Software",
      description: "Software built around your process when off-the-shelf systems force your team into workarounds. We build on Open Mercato, so we don't start from zero, and the code is yours.",
      tags: ["Open Mercato", "TypeScript", "React", "Node", "Postgres", "AI agents"],
    },
    page: {
      eyebrow: "02 / Custom B2B Software",
      headline: { text: "Software built for your process,", accent: "without starting from scratch." },
      lead: "When no ready-made system fits the way your company works, we build one that does. We start from Open Mercato, an open framework for business systems with CRM, sales, warehouse and documents already in place. We only build what is specific to you. The code and the data belong to your company, and the price of each stage is known before we start it.",
      heroCta: {
        microCopy: "After the first call you get a plan of stages and the price of the first one.",
        label: "Book a call",
        href: "/book?z=b2b-software-hero",
      },
      sections: [
        {
          title: "Sound familiar?",
          body: "You bought a system, but half of the work still happens in Excel and email because the software doesn't match how you operate. Building your own sounds risky: a project that keeps growing, a price that changes along the way, and a vendor you can't leave later. Those concerns are fair. Our way of working is designed to address them.",
        },
        {
          title: "How we work",
          body: "1. We map. In a workshop we go through your process with the people who run it and agree what the system has to do. You get a plan of stages and the price of the first one. 2. We put the data in order. We decide where each piece of information lives and clean what will be moved over. 3. We build stage by stage, on your data. You see progress regularly and decide on the next step. 4. We maintain and extend the system as your company changes.",
        },
        {
          title: "What you get and what you own",
          body: "A working system on your servers or in your cloud, with an admin panel for your team. Full source code and documentation. No per-user fees. Because the code is open and built on a public framework, another team could continue the work without us. Once the data is in order, AI agents can work on it inside the same system, not in separate tools.",
        },
        {
          title: "What we have built",
          body: "LegalFlow is a platform for Polish restructuring law firms, running in production. It prepares case documentation from the firm's templates, handles communication with creditors and tracks deadlines. A one-hour client conversation becomes a structured draft. Firms get up to 70% less administrative work and handle more cases with the same team. We have also built a prototype application for local governments.",
        },
        {
          title: "Who this is for",
          body: "B2B companies with 50 to 300 people whose process is specific enough that ready-made software needs constant workarounds. If a good off-the-shelf product already solves your problem, we will tell you and help you implement it instead of building something new.",
        },
      ],
      cta: {
        microCopy: "You know the price of each stage before we start it.",
        label: "Book a call about your system",
        href: "/book?z=b2b-software-sekcja",
      },
    },
  },
  pl: {
    card: {
      title: "Oprogramowanie B2B na zamówienie",
      description: "System zbudowany pod Twój proces, gdy gotowe programy zmuszają zespół do obejść. Budujemy na Open Mercato, więc nie zaczynamy od zera, a kod należy do Ciebie.",
      tags: ["Open Mercato", "TypeScript", "React", "Node", "Postgres", "Agenci AI"],
    },
    page: {
      eyebrow: "02 / Oprogramowanie B2B na zamówienie",
      headline: {
        text: "System zbudowany pod Twój proces,",
        accent: "bez zaczynania od zera.",
      },
      lead: "Gdy żaden gotowy system nie pasuje do tego, jak działa Twoja firma, budujemy taki, który pasuje. Zaczynamy od Open Mercato, otwartej podstawy dla systemów firmowych, w której CRM, sprzedaż, magazyn i dokumenty już są. Dobudowujemy tylko to, co jest specyficzne dla Ciebie. Kod i dane należą do Twojej firmy, a cenę każdego etapu znasz przed jego rozpoczęciem.",
      heroCta: {
        microCopy: "Po pierwszej rozmowie dostajesz plan etapów z ceną pierwszego z nich.",
        label: "Umów rozmowę",
        href: "/book?z=b2b-software-hero",
      },
      sections: [
        {
          title: "Brzmi znajomo?",
          body: "Kupiliście system, ale połowa pracy i tak dzieje się w Excelu i mailach, bo program nie pasuje do tego, jak działacie. Budowa własnego brzmi ryzykownie: projekt, który rośnie bez końca, cena zmieniająca się po drodze i dostawca, od którego trudno potem odejść. To uzasadnione obawy. Nasz sposób pracy jest ułożony właśnie pod nie.",
        },
        {
          title: "Jak pracujemy",
          body: "1. Mapujemy. Na warsztacie przechodzimy przez proces z osobami, które go prowadzą, i ustalamy, co system ma robić. Dostajesz plan etapów z ceną pierwszego. 2. Porządkujemy dane. Ustalamy, gdzie jest każda informacja, i czyścimy to, co będziemy przenosić. 3. Wdrażamy etap po etapie, na Twoich danych. Regularnie widzisz postęp i decydujesz o kolejnym kroku. 4. Rozwijamy. Utrzymujemy system i rozbudowujemy go, gdy firma się zmienia.",
        },
        {
          title: "Co dostajesz i co należy do Ciebie",
          body: "Działający system na Twoich serwerach lub w Twojej chmurze, z panelem administracyjnym dla Twojego zespołu. Pełny kod źródłowy i dokumentację. Bez opłat za użytkownika. Kod jest otwarty i oparty na publicznej podstawie, więc inny zespół może przejąć prace bez nas. Gdy dane są uporządkowane, agenci AI mogą na nich pracować w tym samym systemie, a nie w osobnych narzędziach.",
        },
        {
          title: "Co zbudowaliśmy",
          body: "LegalFlow to platforma dla kancelarii restrukturyzacyjnych, działająca produkcyjnie. Przygotowuje dokumentację spraw na wzorach kancelarii, prowadzi komunikację z wierzycielami i pilnuje terminów. Godzinną rozmowę z klientem zamienia w uporządkowany projekt dokumentu. Kancelarie mają do 70% mniej pracy administracyjnej i prowadzą więcej spraw tym samym zespołem. Zbudowaliśmy też prototyp aplikacji dla samorządów.",
        },
        {
          title: "Dla kogo to jest",
          body: "Dla firm B2B zatrudniających od 50 do 300 osób, których proces jest na tyle specyficzny, że gotowy program wymaga ciągłych obejść. Jeśli dobry gotowy produkt rozwiązuje Twój problem, powiemy to wprost i pomożemy go wdrożyć, zamiast budować coś nowego.",
        },
      ],
      cta: {
        microCopy: "Cenę każdego etapu znasz, zanim go zaczniemy.",
        label: "Umów rozmowę o systemie",
        href: "/book?z=b2b-software-sekcja",
      },
    },
  },
};
