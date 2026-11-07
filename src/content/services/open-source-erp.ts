// Service "open-source-erp": the card in the home page Services section and the page at /practices/open-source-erp.
// No invented numbers: the facts here are terms of the offer (no per-user fees, open code), not results.
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
      facts: [
        { value: "0 per-user fees", label: "a new person on the team does not mean a new licence" },
        { value: "Your code", label: "full source code and documentation stay with your company" },
        { value: "Your servers", label: "or your cloud. You decide where the system runs" },
      ],
      problems: {
        title: "Sound familiar?",
        items: [
          "Sales works in one program, the warehouse in another, and documents live on shared drives.",
          "Every new person on the team means another licence.",
          "Any change to the system needs the vendor, their schedule and their price list.",
          "The same customer is in three places, and each record is a little different.",
          "The board report is built by hand from several spreadsheet exports.",
          "The ready-made system needs more and more workarounds, because your company works its own way.",
        ],
      },
      features: {
        title: "What the system covers",
        items: [
          {
            title: "CRM and sales",
            body: "Customers, contacts, sales opportunities and offers in one place, with the full history of each relationship.",
          },
          {
            title: "Warehouse and products",
            body: "Products, stock levels and availability, connected to sales, so offers are based on what you actually have.",
          },
          {
            title: "Documents",
            body: "Offers, contracts and other documents created from the data already in the system, not retyped from spreadsheets.",
          },
          {
            title: "Modules made to measure",
            body: "We add what your company needs and no ready-made system offers. The code is open, so nothing is blocked by a vendor.",
          },
          {
            title: "Connections to your tools",
            body: "Accounting, email, e-commerce and other programs you keep using exchange data with the system.",
          },
          {
            title: "AI agents on company data",
            body: "Once the data is in one place, agents can prepare offers, summaries and reminders based on real information.",
          },
        ],
      },
      steps: {
        title: "How we work",
        items: [
          {
            title: "We map",
            body: "In a workshop we go through how information flows between departments and agree which modules you need first. You get a plan of stages with the price of the first one.",
          },
          {
            title: "We put the data in order",
            body: "We clean and structure your records before anything is moved from the old systems.",
          },
          {
            title: "We implement",
            body: "Stage by stage, on your data. Each stage is a working part of the system that your team starts using.",
          },
          {
            title: "We maintain and extend",
            body: "New modules, integrations and AI agents working on the data that is already in one place.",
          },
        ],
      },
      sections: [
        {
          title: "What you get and what you own",
          body: "A working Open Mercato system on your infrastructure, adapted to your processes. Your historical data cleaned and moved from the old tools. Full source code and documentation. You pay for implementation stages, hosting and, if you choose, our maintenance. There are no fees per user.",
        },
        {
          title: "Why it does not depend on us",
          body: "Open Mercato is open source. If we were gone tomorrow, another team could take over the code and keep developing your system. Accounts, the repository and servers are set up in your company's name from day one.",
        },
        {
          title: "Who this is for",
          body: "B2B companies with 50 to 300 people that have outgrown a set of disconnected tools and want control over their data and costs. Especially where sales, warehouse and documents are closely linked and a ready-made CRM needs more and more workarounds.",
        },
        {
          title: "When a ready-made tool is enough",
          body: "If one ready-made tool covers what you need, we will say so. We also implement Monday, ClickUp, Pipedrive and Tillio, and we can start there and move to Open Mercato only when the company outgrows them.",
        },
      ],
      faq: {
        title: "Questions we hear most often",
        items: [
          {
            q: "What is Open Mercato?",
            a: "Open source code for building company systems: CRM, sales, warehouse and documents. We don't start from scratch. We start from proven modules and adapt them to your company.",
          },
          {
            q: "Can we move data from our current system?",
            a: "Yes. We put the data in order first and then move it. We agree the scope in the workshop.",
          },
          {
            q: "Where does the system run?",
            a: "On your servers or in your cloud. You decide.",
          },
          {
            q: "How much does it cost?",
            a: "You pay for implementation stages, hosting and, if you want, maintenance. After the workshop you know the price of the first stage before we start. There are no per-user fees.",
          },
          {
            q: "What if we stop working together?",
            a: "The system stays yours. The code is open and documented, so another team can continue the work.",
          },
        ],
      },
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
      facts: [
        { value: "0 zł", label: "opłat za użytkownika. Nowa osoba w zespole to nie nowa licencja" },
        { value: "Kod i dane", label: "pełny kod źródłowy i dokumentacja zostają w Twojej firmie" },
        { value: "Twoje serwery", label: "albo Twoja chmura. Ty decydujesz, gdzie działa system" },
      ],
      problems: {
        title: "Brzmi znajomo?",
        items: [
          "Sprzedaż pracuje w jednym programie, magazyn w drugim, a dokumenty leżą na dyskach.",
          "Każda nowa osoba w zespole to kolejna licencja.",
          "Każda zmiana w systemie wymaga dostawcy, jego terminów i jego cennika.",
          "Ten sam klient jest w trzech miejscach i w każdym wygląda trochę inaczej.",
          "Raport dla zarządu powstaje ręcznie, z kilku eksportów do Excela.",
          "Gotowy system wymaga coraz więcej obejść, bo Twoja firma działa po swojemu.",
        ],
      },
      features: {
        title: "Co obejmuje system",
        items: [
          {
            title: "CRM i sprzedaż",
            body: "Klienci, kontakty, szanse sprzedaży i oferty w jednym miejscu, z pełną historią każdej relacji.",
          },
          {
            title: "Magazyn i produkty",
            body: "Produkty, stany i dostępność połączone ze sprzedażą, więc oferta opiera się na tym, co naprawdę masz.",
          },
          {
            title: "Dokumenty",
            body: "Oferty, umowy i inne dokumenty powstają z danych, które już są w systemie, a nie są przepisywane z arkuszy.",
          },
          {
            title: "Moduły na miarę",
            body: "Dokładamy to, czego potrzebuje Twoja firma, a czego nie ma żaden gotowy system. Kod jest otwarty, więc nic nie blokuje dostawca.",
          },
          {
            title: "Połączenia z Twoimi narzędziami",
            body: "Księgowość, poczta, sklep internetowy i inne programy, z których dalej korzystasz, wymieniają dane z systemem.",
          },
          {
            title: "Agenci AI na danych firmy",
            body: "Gdy dane są w jednym miejscu, agenci mogą przygotowywać oferty, zestawienia i przypomnienia na prawdziwych informacjach.",
          },
        ],
      },
      steps: {
        title: "Jak pracujemy",
        items: [
          {
            title: "Mapujemy",
            body: "Na warsztacie przechodzimy przez to, jak informacje płyną między działami, i ustalamy, od których modułów zacząć. Dostajesz plan etapów z ceną pierwszego.",
          },
          {
            title: "Porządkujemy dane",
            body: "Czyścimy i układamy dane, zanim cokolwiek przeniesiemy ze starych systemów.",
          },
          {
            title: "Wdrażamy",
            body: "Etap po etapie, na Twoich danych. Każdy etap to działająca część systemu, z której zespół zaczyna korzystać.",
          },
          {
            title: "Rozwijamy",
            body: "Dokładamy moduły, połączenia z innymi narzędziami i agentów AI, którzy pracują na danych zebranych już w jednym miejscu.",
          },
        ],
      },
      sections: [
        {
          title: "Co dostajesz i co należy do Ciebie",
          body: "Działający system Open Mercato na Twojej infrastrukturze, dopasowany do Twoich procesów. Dane historyczne uporządkowane i przeniesione ze starych narzędzi. Pełny kod źródłowy i dokumentację. Płacisz za etapy wdrożenia, serwery i, jeśli zechcesz, za nasze utrzymanie. Nie ma opłat za użytkownika.",
        },
        {
          title: "Dlaczego nie jesteś od nas zależny",
          body: "Open Mercato to otwarty kod. Gdyby nas zabrakło, inny zespół może przejąć kod i dalej rozwijać Twój system. Konta, repozytorium i serwery od początku są zakładane na Twoją firmę.",
        },
        {
          title: "Dla kogo to jest",
          body: "Dla firm B2B zatrudniających od 50 do 300 osób, które wyrosły z zestawu niepołączonych narzędzi i chcą mieć kontrolę nad danymi i kosztami. Szczególnie tam, gdzie sprzedaż, magazyn i dokumenty są ze sobą mocno powiązane, a gotowy CRM wymaga coraz więcej obejść.",
        },
        {
          title: "Kiedy wystarczy gotowe narzędzie",
          body: "Jeśli wystarczy Ci jedno gotowe narzędzie, powiemy to wprost. Wdrażamy też Monday, ClickUp, Pipedrive i Tillio. Możemy zacząć od nich i przejść na Open Mercato dopiero wtedy, gdy firma z nich wyrośnie.",
        },
      ],
      faq: {
        title: "Najczęstsze pytania",
        items: [
          {
            q: "Czym jest Open Mercato?",
            a: "To otwarty kod do budowy systemów firmowych: CRM, sprzedaży, magazynu i dokumentów. Nie zaczynamy od zera, tylko od sprawdzonych modułów, które dopasowujemy do Twojej firmy.",
          },
          {
            q: "Czy możemy przenieść dane z obecnego systemu?",
            a: "Tak. Najpierw porządkujemy dane, potem je przenosimy. Zakres ustalamy na warsztacie.",
          },
          {
            q: "Gdzie działa system?",
            a: "Na Twoich serwerach albo w Twojej chmurze. Decydujesz Ty.",
          },
          {
            q: "Ile to kosztuje?",
            a: "Płacisz za etapy wdrożenia, serwery i, jeśli chcesz, za utrzymanie. Po warsztacie znasz cenę pierwszego etapu, zanim zaczniemy. Nie ma opłat za użytkownika.",
          },
          {
            q: "Co, jeśli przestaniemy współpracować?",
            a: "System zostaje Twój. Kod jest otwarty i opisany, więc inny zespół może kontynuować prace.",
          },
        ],
      },
      cta: {
        microCopy: "Cenę każdego etapu znasz, zanim go zaczniemy.",
        label: "Umów rozmowę o Open Mercato",
        href: "/book?z=open-source-erp-sekcja",
      },
    },
  },
};
