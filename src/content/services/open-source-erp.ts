// Service "open-source-erp": the card in the home page Services section and the page at /practices/open-source-erp.
import type { ServiceEntry } from "../types";

export const openSourceErp: ServiceEntry = {
  slug: "open-source-erp",
  en: {
    card: {
      title: "Open-source ERP & CRM",
      description: "One system for sales, warehouse, documents and customers, built on Open Mercato. No per-user fees, and the code and data stay with your company.",
      tags: ["Open Mercato", "ERP", "CRM", "Open source"],
    },
    page: {
      eyebrow: "04 / Open-source ERP & CRM",
      headline: { text: "One system for the whole company.", accent: "No per-user fees." },
      lead: "We implement Open Mercato, an open framework for business systems that covers CRM, sales, warehouse and documents. It becomes one engine for your company: shared data, ordered processes and a place where AI agents can work on real company information. It runs on your servers or in your cloud. You know the price of the first stage before we start.",
      heroCta: {
        microCopy: "After the first call you get a plan of stages and the price of the first one.",
        label: "Book a call",
        href: "/book?z=open-source-erp-hero",
      },
      sections: [
        {
          title: "Sound familiar?",
          body: "Sales works in one program, the warehouse in another, and documents live on shared drives. Every new hire means another licence. Changing anything requires the vendor, their schedule and their price. Meanwhile nobody has one current view of the company.",
        },
        {
          title: "How we work",
          body: "1. We map. In a workshop we go through how information flows between departments and agree which modules you need first. You get a plan of stages with the price of the first one. 2. We put the data in order. We clean and structure your records before anything is moved from the old systems. 3. We implement stage by stage, on your data. Each stage is a working part of the system that your team starts using. 4. We maintain and extend it: new modules, integrations and AI agents working on the data that is already in one place.",
        },
        {
          title: "What you get and what you own",
          body: "A working Open Mercato system on your infrastructure, adapted to your processes. Your historical data cleaned and moved from the old tools. Full source code and documentation. You pay for implementation stages, hosting and, if you choose, our maintenance. There are no fees per user. The code is open, so another team could continue the work without us.",
        },
        {
          title: "Who this is for",
          body: "B2B companies with 50 to 300 people that have outgrown a set of disconnected tools and want control over their data and costs. If one ready-made tool such as Monday, ClickUp or Pipedrive covers what you need, we will say so and can implement that instead.",
        },
      ],
      cta: {
        microCopy: "You know the price of each stage before we start it.",
        label: "Book a call about Open Mercato",
        href: "/book?z=open-source-erp-sekcja",
      },
    },
  },
  pl: {
    card: {
      title: "ERP i CRM na otwartym kodzie",
      description: "Jeden system dla sprzedaży, magazynu, dokumentów i klientów, zbudowany na Open Mercato. Bez opłat za użytkownika, a kod i dane zostają w Twojej firmie.",
      tags: ["Open Mercato", "ERP", "CRM", "Otwarty kod"],
    },
    page: {
      eyebrow: "04 / ERP i CRM na otwartym kodzie",
      headline: { text: "Jeden system dla całej firmy.", accent: "Bez opłat za użytkownika." },
      lead: "Wdrażamy Open Mercato, otwartą podstawę dla systemów firmowych, która obejmuje CRM, sprzedaż, magazyn i dokumenty. Staje się jednym silnikiem Twojej firmy: wspólne dane, uporządkowane procesy i miejsce, w którym agenci AI pracują na prawdziwych informacjach firmy. Działa na Twoich serwerach lub w Twojej chmurze. Cenę pierwszego etapu znasz, zanim zaczniemy.",
      heroCta: {
        microCopy: "Po pierwszej rozmowie dostajesz plan etapów z ceną pierwszego z nich.",
        label: "Umów rozmowę",
        href: "/book?z=open-source-erp-hero",
      },
      sections: [
        {
          title: "Brzmi znajomo?",
          body: "Sprzedaż pracuje w jednym programie, magazyn w drugim, a dokumenty leżą na dyskach. Każda nowa osoba w zespole to kolejna licencja. Każda zmiana wymaga dostawcy, jego terminów i jego cennika. A aktualnego obrazu całej firmy nie ma nikt.",
        },
        {
          title: "Jak pracujemy",
          body: "1. Mapujemy. Na warsztacie przechodzimy przez to, jak informacje płyną między działami, i ustalamy, od których modułów zacząć. Dostajesz plan etapów z ceną pierwszego. 2. Porządkujemy dane. Czyścimy i układamy dane, zanim cokolwiek przeniesiemy ze starych systemów. 3. Wdrażamy etap po etapie, na Twoich danych. Każdy etap to działająca część systemu, z której zespół zaczyna korzystać. 4. Rozwijamy. Dokładamy moduły, połączenia z innymi narzędziami i agentów AI, którzy pracują na danych zebranych już w jednym miejscu.",
        },
        {
          title: "Co dostajesz i co należy do Ciebie",
          body: "Działający system Open Mercato na Twojej infrastrukturze, dopasowany do Twoich procesów. Dane historyczne uporządkowane i przeniesione ze starych narzędzi. Pełny kod źródłowy i dokumentację. Płacisz za etapy wdrożenia, serwery i, jeśli zechcesz, za nasze utrzymanie. Nie ma opłat za użytkownika. Kod jest otwarty, więc inny zespół może przejąć prace bez nas.",
        },
        {
          title: "Dla kogo to jest",
          body: "Dla firm B2B zatrudniających od 50 do 300 osób, które wyrosły z zestawu niepołączonych narzędzi i chcą mieć kontrolę nad danymi i kosztami. Jeśli wystarczy Ci jedno gotowe narzędzie, na przykład Monday, ClickUp albo Pipedrive, powiemy to i możemy wdrożyć właśnie je.",
        },
      ],
      cta: {
        microCopy: "Cenę każdego etapu znasz, zanim go zaczniemy.",
        label: "Umów rozmowę o Open Mercato",
        href: "/book?z=open-source-erp-sekcja",
      },
    },
  },
};
