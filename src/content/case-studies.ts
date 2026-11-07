// Cases in the "Realizacje" section of the home page. Order = display order.
// Only true facts: every number needs a real implementation behind it.
// The media client is confidential: no name, no system name, no numbers.
import type { CaseStudyEntry } from "./types";

export const caseStudies: readonly CaseStudyEntry[] = [
  {
    featured: true,
    en: {
      kind: "Our product",
      title: "LegalFlow",
      company: "Platform for Polish restructuring law firms. We built it and run it ourselves.",
      before: "In a restructuring firm much of the day goes into case paperwork, letters to creditors and watching court deadlines.",
      did: "LegalFlow generates case documents from the firm's own templates, handles communication with creditors and tracks deadlines. It turns an hour-long client interview into a structured draft. The assistant works by text, dictation and phone.",
      after: "Up to 70% less administrative work. The firm handles more cases with the same team.",
      link: { label: "See LegalFlow", href: "https://legal-flow.pl" },
    },
    pl: {
      kind: "Nasz produkt",
      title: "LegalFlow",
      company: "Platforma dla kancelarii restrukturyzacyjnych. Zbudowaliśmy ją i sami ją utrzymujemy.",
      before: "W kancelarii restrukturyzacyjnej duża część dnia idzie na dokumenty sprawy, korespondencję z wierzycielami i pilnowanie terminów.",
      did: "LegalFlow generuje dokumentację sprawy z szablonów kancelarii, prowadzi komunikację z wierzycielami i pilnuje terminów. Z godzinnej rozmowy z klientem robi uporządkowany szkic dokumentu. Asystent działa tekstem, dyktowaniem i przez telefon.",
      after: "Do 70% mniej pracy administracyjnej. Kancelaria prowadzi więcej spraw tym samym zespołem.",
      link: { label: "Zobacz LegalFlow", href: "https://legal-flow.pl" },
    },
  },
  {
    en: {
      kind: "Client project",
      title: "Certificates for workers posted to Germany",
      company: "A group of four construction companies with crews on sites in Germany.",
      before: "Every month the accountant copied date ranges of stays in Germany, dates of birth and addresses from work calendars into certificates. About 300 people a month, about 3 working days.",
      did: "Automation built into the spreadsheets the company already uses. No new system, no training. One menu item reads the calendars of all four companies, works out the periods of work, fills in personal data and adds new workers. The accountant's own entries stay untouched, a backup is made before every write, and unusual cases go to a log for a person to check.",
      after: "The monthly update is one click plus checking the exceptions. On historical data the result matched the accountant's manual work in 99.8% of cases (2,914 of 2,920). The rest were typos in the source data, which the system flagged.",
      when: "Running at the client since October 2026.",
    },
    pl: {
      kind: "Wdrożenie u klienta",
      title: "Zaświadczenia dla pracowników delegowanych",
      company: "Grupa czterech spółek budowlanych z pracownikami na budowach w Niemczech.",
      before: "Co miesiąc księgowa przepisywała z kalendarzy pracy zakresy dat pobytu w Niemczech, daty urodzenia i adresy do zaświadczeń. Około 300 osób miesięcznie, około 3 dni pracy.",
      did: "Automatyzacja wbudowana w arkusze, na których firma już pracuje. Bez nowego systemu i bez szkolenia. Jedna pozycja w menu czyta kalendarze czterech spółek, wylicza okresy pracy, uzupełnia dane osobowe i dopisuje nowych pracowników. Wpisy księgowej zostają nietknięte, przed każdym zapisem powstaje kopia, a nietypowe przypadki trafiają do dziennika do sprawdzenia przez człowieka.",
      after: "Comiesięczna aktualizacja to jedno kliknięcie i sprawdzenie wyjątków. Na danych historycznych wynik zgadzał się z ręczną pracą księgowej w 99,8% przypadków (2914 z 2920). Pozostałe różnice to literówki w danych źródłowych, które system wskazał.",
      when: "Działa u klienta od października 2026.",
    },
  },
  {
    en: {
      kind: "Client project",
      title: "AI agent that finds new clients",
      company: "An engineering contractor from Wrocław.",
      did: "An AI agent searches the web and suggests companies that may be interested in the client's offer to the sales team. Plus a simple panel for entering data.",
      after: "According to the client: accurate, valuable leads and a more effective sales team.",
      quote: {
        text: "The first results were visible just three weeks after we started working together. The suggested leads turned out to be accurate and valuable, which made our sales team more effective. (translated from Polish)",
        source: "Client reference letter, 10.2025",
        pending: "[reference letter PDF: to be added]",
      },
    },
    pl: {
      kind: "Wdrożenie u klienta",
      title: "Agent AI do pozyskiwania klientów",
      company: "Firma wykonawstwa inżynieryjnego z Wrocławia.",
      did: "Agent AI przeszukuje sieć i podsuwa handlowcom firmy, które mogą być zainteresowane ofertą klienta. Do tego prosty panel do wprowadzania danych.",
      after: "Według klienta: trafne leady i wyższa efektywność działu handlowego.",
      quote: {
        text: "Pierwsze efekty wdrożenia były widoczne już po trzech tygodniach od rozpoczęcia współpracy – sugerowane leady okazały się trafne i wartościowe, co przełożyło się na wzrost efektywności działu handlowego.",
        source: "List referencyjny klienta, 10.2025",
        pending: "[list referencyjny PDF: do dodania]",
      },
    },
  },
  {
    en: {
      kind: "We run on it ourselves",
      title: "Our own marketing engine",
      company: "Booster. This is not a client project, it is how we work.",
      did: "AI agents run our campaigns in Google Ads, Meta Ads and TikTok Ads. Other agents build and update the landing pages for those campaigns. Everything is stored in one place connected to the CRM, and what happens in the CRM (a new lead, a stage change, no reply) triggers the next steps on its own.",
      after: "We build the same setup for companies that want ads, landing pages and CRM to work as one process.",
    },
    pl: {
      kind: "Sami tak działamy",
      title: "Nasz własny silnik marketingu",
      company: "Booster. To nie wdrożenie u klienta, tylko sposób, w jaki sami pracujemy.",
      did: "Agenci AI prowadzą nasze kampanie w Google Ads, Meta Ads i TikTok Ads. Inni agenci budują i aktualizują strony pod te kampanie. Wszystko zapisuje się w jednym miejscu połączonym z CRM, a to, co dzieje się w CRM (nowy lead, zmiana etapu, brak odpowiedzi), samo uruchamia kolejne kroki.",
      after: "Ten sam układ budujemy dla firm, które chcą połączyć reklamy, strony i CRM w jeden proces.",
    },
  },
  {
    en: {
      kind: "Client project",
      title: "Sales proposals",
      company: "A large media company.",
      did: "We automated the preparation of sales proposals, which used to mean collecting data by hand from many places.",
    },
    pl: {
      kind: "Wdrożenie u klienta",
      title: "Oferty handlowe",
      company: "Duża firma z branży mediowej.",
      did: "Zautomatyzowaliśmy przygotowywanie ofert handlowych, które wcześniej wymagało ręcznego zbierania danych z wielu miejsc.",
    },
  },
];
