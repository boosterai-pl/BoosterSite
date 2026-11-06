// Home page copy, nav, footer and booking section (Polish).
// Every change here needs the matching change in ./en.ts.
// Internal links ("/careers", "/practices/...") stay without the /pl prefix: it is added automatically.
import type { HomeCopy } from "../types";

export const homePl: HomeCopy = {
  meta: {
    brand: "Booster",
    tagline: "Agencja Usług AI-Native",
    contactEmail: "hello@boosterai.pl",
    establishedLine: "ZAŁ. 2025 / WARSZAWA → CAŁY ŚWIAT",
    version: "Booster / AI Native Service Agency / v1.0",
  },
  nav: [
    { label: "O nas", href: "#about" },
    { label: "Usługi", href: "#services" },
    { label: "Realizacje", href: "#work" },
    { label: "Proces", href: "#process" },
    { label: "Kariera", href: "/careers" },
  ],
  navCta: {
    label: "Umów się na bezpłatną konsultację AI",
    href: "/book?z=nav",
  },
  hero: {
    eyebrow: "AI Native / Agencja Usługowa",
    establishedLabel: "",
    headline: { text: "Zwiększ swoje\nprzychody.\nNie", accent: "listę płac." },
    lead: "Budujemy autonomiczną infrastrukturę AI dla złożonych operacji B2B. Zastępując ręczne prowizorki dedykowanymi platformami, dostarczamy kompleksowe rozwiązania w ciągu tygodni, a nie kwartałów.",
    primaryCta: {
      label: "Umów się na bezpłatną konsultację",
      href: "/book?z=hero",
    },
    secondaryCta: { label: "Zobacz, co robimy", href: "#services" },
    meta: [
      {
        label: "Partnerzy",
        value: "Monday · ClickUp · Pipedrive",
        logos: [
          { name: "Monday", component: "MondayLogo" },
          { name: "ClickUp", component: "ClickUpLogo" },
          { name: "Pipedrive", component: "PipedriveLogo" },
        ],
      },
      {
        label: "Stworzone z",
        value: "Claude · n8n · OpenCode · Codex · Bielik · Railway · Cloudflare · PlanetScale",
        logos: [
          { name: "Claude", component: "ClaudeLogo" },
          { name: "n8n", component: "N8nLogo" },
          { name: "OpenCode", component: "OpenCodeLogo" },
          { name: "Codex", component: "CodexLogo" },
          { name: "Bielik", component: "BielikLogo" },
          { name: "Railway", component: "RailwayLogo" },
          { name: "Cloudflare", component: "CloudflareLogo" },
          { name: "PlanetScale", component: "PlanetScaleLogo" },
        ],
      },
      {
        label: "Aktualnie wdrażamy",
        value: "Platforma sprzedaży nośników reklamowych · LegalFlow · Lead Booster",
      },
    ],
  },
  marquee: [
    { label: "Wdrożenie CRM" },
    { label: "ERP Open Source" },
    { label: "Oprogramowanie B2B" },
    { label: "Automatyzacja AI" },
    { label: "Platformy na miarę" },
    { label: "Agenci AI" },
    { label: "Zero opłat licencyjnych" },
    { label: "Brak uzależnienia od dostawcy" },
  ],
  manifesto: {
    eyebrow: "01 / Manifest",
    headline: {
      text: "To, co kiedyś zajmowało rok spotkań, zapytań ofertowych i zakresów prac, my wdrażamy w",
      accent: "sześć tygodni.",
    },
    entries: [
      {
        id: "001",
        title: "Szybkość to funkcja.",
        body: "Budujemy niestandardowe platformy sprzedażowe, menedżery magazynowe i automatyczne generowanie ofert, które skracają czas tworzenia propozycji z tygodnia do minut. Nasz silnik dokumentów prawnych przekształca godzinne wywiady z klientami w gotowe projekty prawne, oszczędzając setki godzin rozliczeniowych na sprawę. Zastępujemy powolne, 12-miesięczne plany i jałowe makiety żywym, gotowym produkcyjnie oprogramowaniem, które możesz testować już od pierwszego tygodnia.",
      },
      {
        id: "002",
        title: "AI w procesie, nie w nagłówku.",
        body: "Używamy Claude, ChatGPT, DeepSeek, Bielika i open-source LLM tam, gdzie rozwiązują realne wąskie gardła operacyjne, a nie jako naklejkę marketingową do łapania trendu. Wspierani przez doświadczonych inżynierów IT, najpierw systematycznie czyścimy i deduplikujemy Twoje historyczne dane, a następnie wdrażamy czystą automatyzację, która powstrzymuje kurczenie się Twoich marż w miarę wzrostu firmy.",
      },
      {
        id: "003",
        title: "Jeden stack. Trzy sposoby budowania.",
        body: "Każdy zespół dostaje stack wdrożony w tygodniach. Budujemy oprogramowanie na miarę, wdrażamy platformy naszych partnerów lub dostosowujemy rozwiązania open-source, takie jak Open Mercato, cokolwiek najlepiej pasuje do Twojej operacji. Dla mniejszych firm może to oznaczać celowane automatyzacje zamiast pełnego buildu.",
      },
      {
        id: "004",
        title: "Partner, nie uzależnienie.",
        body: "Jesteśmy najpierw doradcami biznesowymi, a dopiero potem inżynierami. Mapujemy Twoje procesy, strukturyzujemy dane i budujemy system, z którego Twój zespół naprawdę chce korzystać. Większość klientów zostaje z nami, by automatyzować kolejne obszary, bo to się po prostu opłaca. Nigdy nie jesteś uwięziony: Twoje dane i infrastruktura są Twoje, żadna własnościowa platforma nie trzyma Cię jako zakładnika.",
      },
    ],
  },
  services: {
    eyebrow: "02 / Usługi",
    headline: { text: "Cztery praktyki.\nJeden", accent: "rytm dostaw." },
  },
  cases: {
    eyebrow: "03 / Wybrane realizacje",
    headline: { text: "Wdrożone w kilka tygodni.\nZarabiają", accent: "na siebie." },
  },
  speed: {
    eyebrow: "04 / Dlaczego my",
    headline: {
      line1: "Prace, które inni wyceniają na",
      strikeText: "12 miesięcy,",
      accentText: "my wdrażamy",
      line3: "w sześć tygodni.",
    },
    stats: [
      {
        value: "10",
        suffix: "x",
        label: "Szybciej do produkcji niż tradycyjny plan rozwoju oprogramowania.",
      },
      {
        value: "0",
        suffix: "%",
        label: "Opłat licencyjnych i uzależnienia od dostawcy. Stosy open-source zachowują niezależność Twojej architektury.",
      },
      {
        value: "4",
        suffix: "x",
        label: "Certyfikowane partnerstwa platformowe z Monday, ClickUp i Pipedrive, wzmocnione autonomicznymi warstwami agentów AI.",
      },
      {
        value: "-70",
        suffix: "%",
        label: "Mniej powtarzalnej pracy ręcznej: generowanie ofert, outreach sprzedażowy, tworzenie dokumentów, aktualizacje CRM/ERP i raporty.",
      },
    ],
  },
  process: {
    eyebrow: "05 / Jak pracujemy",
    headline: { text: "Trzech inżynierów.\nCztery etapy.", accent: "Żadnych korporacyjnych obciążeń." },
    steps: [
      {
        id: "01",
        title: "Mapowanie",
        description: "Strategiczny warsztat. Wchodzimy w Twoje operacje, znajdujemy najdroższe ręczne wąskie gardła i projektujemy klarowny plan automatyzacji AI.",
      },
      {
        id: "02",
        title: "Oczyszczanie",
        description: "Strukturyzacja danych. Zanim padnie pierwsza linia kodu, zbieramy Twoje rozproszone rekordy i eliminujemy duplikaty, budując czyste fundamenty, na których AI może pracować.",
      },
      {
        id: "03",
        title: "Wdrożenie",
        description: "Podejście najpierw produkcyjne. Żadnych martwych makiet, żadnych teoretycznych specyfikacji. Dostarczamy działające oprogramowanie do bezpiecznego środowiska, tak by Twój zespół testował realne scenariusze w ciągu tygodni.",
      },
      {
        id: "04",
        title: "Wzrost",
        description: "Na żywo i ze wsparciem. Twoje dane i infrastruktura pozostają Twoje, bez uzależnienia, bez opłat licencyjnych. Nie znikamy po uruchomieniu: większość klientów trzyma nas do automatyzacji kolejnych wąskich gardeł. System rośnie razem z Tobą.",
      },
    ],
  },
  partners: {
    eyebrow: "06 / Ekosystem",
    items: [
      { name: "Monday", role: "Partner CRM" },
      { name: "ClickUp", role: "Partner CRM" },
      { name: "Pipedrive", role: "Partner CRM" },
      { name: "Open Mercato", role: "Wdrożenie" },
    ],
  },
  team: {
    eyebrow: "07 / Zespół",
    headline: { text: "Pięcioosobowy zespół\nz szybkością", accent: "czterdziestu." },
  },
  insights: {
    eyebrow: "08 / Artykuły",
    headline: { text: "Notatki z terenu\nz", accent: "budowy." },
    posts: [
      {
        id: "01",
        category: "Strategia",
        date: "May 2026",
        title: "Firmy Usługowe AI-Native: co Y Combinator właśnie pobłogosławił",
      },
      {
        id: "02",
        category: "Metoda",
        date: "Apr 2026",
        title: "Sześć tygodni kontra dwanaście miesięcy: jak określić zakres dostawy AI-native",
      },
      {
        id: "03",
        category: "Inżynieria",
        date: "Apr 2026",
        title: "ERP Open-source dla europejskiego rynku średniej wielkości: Open Mercato w praktyce",
      },
    ],
  },
  cta: {
    eyebrow: "Zacznijmy",
    headline: { text: "Powiedz nam, gdzie\nTwój plan\nmówi", accent: "„w przyszłym roku”." },
    body: "Umów się na 30-minutową konsultację. Wracamy z sześciotygodniowym planem, stałą ceną i pierwszą wersją demonstracyjną w ciągu dwóch tygodni.",
    button: {
      label: "Umów się na bezpłatną konsultację",
      href: "/book?z=cta",
    },
  },
  footer: {
    intro: "Agencja usług AI-native. Wrocław → cały świat.",
    columns: [
      {
        heading: "Usługi",
        links: [
          { label: "Wdrożenia CRM", href: "/practices/crm-implementation" },
          { label: "ERP open-source", href: "/practices/open-source-erp" },
          { label: "Oprogramowanie B2B", href: "/practices/b2b-software" },
          { label: "Automatyzacja AI", href: "/practices/ai-automation" },
        ],
      },
      {
        heading: "Firma",
        links: [
          { label: "O nas", href: "/#about" },
          { label: "Zespół", href: "/#team" },
          { label: "Case studies", href: "/#work" },
          { label: "Kariera", href: "/careers" },
        ],
      },
      {
        heading: "Kontakt",
        links: [
          { label: "hello@boosterai.pl", href: "mailto:hello@boosterai.pl" },
          { label: "LinkedIn", href: "https://www.linkedin.com/company/boosterai-en" },
        ],
      },
    ],
    bottom: [
      "© 2026 Booster AI sp. z o.o.",
      "Wrocław, Polska",
      "Booster / Agencja AI Native / v1.0",
    ],
  },
  booking: {
    points: [
      "Bezpłatna rozmowa, bez zobowiązań",
      "Sześciotygodniowy plan ze stałą ceną",
      "Pierwsza wersja demonstracyjna w ciągu dwóch tygodni",
    ],
    trustLabel: "Pracujemy na narzędziach, które znasz",
    starters: {
      title: "Nie wiesz, od czego zacząć rozmowę?",
      items: [
        "Mamy proces, który zjada czas zespołu i chcemy go zautomatyzować.",
        "Potrzebujemy wdrożyć albo uporządkować CRM (Monday, ClickUp, Pipedrive).",
        "Chcemy zbudować własne oprogramowanie B2B albo moduł do istniejącego systemu.",
        "Interesuje nas AI w firmie, ale nie wiemy, gdzie ma największy sens.",
      ],
    },
    steps: {
      title: "Od formularza do planu",
      items: [
        { title: "Wypełniasz formularz", body: "Zajmuje to minutę. Wystarczy e-mail, telefon i kilka słów o sprawie." },
        { title: "Konsultacja", body: "Dzwonimy w ciągu jednego dnia roboczego i przez 30 minut rozmawiamy o Twoim procesie." },
        { title: "Plan z ceną", body: "Wracamy z sześciotygodniowym planem, stałą ceną i pierwszą wersją demonstracyjną w ciągu dwóch tygodni." },
      ],
    },
    outcomes: {
      title: "Co zostaje u Ciebie po konsultacji",
      items: [
        { title: "Plan działania", body: "Co budujemy, w jakiej kolejności i co będzie gotowe po każdym tygodniu." },
        { title: "Cena pierwszego etapu", body: "Stała kwota, bez niespodzianek w trakcie." },
        { title: "Decyzja po Twojej stronie", body: "Plan zostaje u Ciebie niezależnie od tego, czy zaczniemy współpracę." },
      ],
    },
    team: {
      title: "Z kim porozmawiasz",
      body: "Rozmowę prowadzi zespół, który potem buduje rozwiązanie. Bez pośredników i sprzedawców.",
    },
    faq: {
      title: "Zanim wyślesz formularz",
      items: [
        { q: "Czy konsultacja jest płatna?", a: "Nie. Rozmowa trwa 30 minut, jest bezpłatna i do niczego nie zobowiązuje." },
        { q: "Kiedy się odezwiecie?", a: "W ciągu jednego dnia roboczego od wysłania formularza." },
        { q: "Dlaczego potrzebujecie numeru telefonu?", a: "Konsultacja odbywa się telefonicznie. E-mail służy do potwierdzenia i podsumowania rozmowy." },
        { q: "Co mam wpisać w polu „Czego dotyczy sprawa?”", a: "Kilka zdań o tym, co chcesz zautomatyzować lub zbudować. Nie musisz mieć gotowej specyfikacji." },
        { q: "Co dzieje się z moimi danymi?", a: "Używamy ich tylko do odpowiedzi na Twoje zapytanie. Szczegóły są w polityce prywatności." },
      ],
    },
    finalCta: { title: "Zacznijmy od jednego telefonu", label: "Wypełnij formularz" },
    form: {
      emailLabel: "E-mail",
      phoneLabel: "Telefon",
      topicLabel: "Czego dotyczy sprawa?",
      topicPlaceholder: "Kilka słów o Twoim projekcie lub problemie",
      consent: "Wyrażam zgodę na kontakt i przetwarzanie moich danych w celu obsługi zapytania.",
      privacyLabel: "Polityka prywatności",
      privacyHref: "https://boosterai.pl/privacy-policy/",
      honeypotLabel: "Nie wypełniaj tego pola",
      submit: "Umów bezpłatną konsultację",
      submitting: "Wysyłanie…",
      footnote: "Bez zobowiązań.",
      invalidEmail: "Podaj prawidłowy adres e-mail.",
      invalidPhone: "Podaj prawidłowy numer telefonu.",
      requiredField: "To pole jest wymagane.",
      missingConsent: "Zgoda jest wymagana, żeby wysłać formularz.",
      sent: "Wysłane",
      errorTitle: "Zgłoszenie nie doszło.",
      errorBody: "Wpisane dane zostały w formularzu. Spróbuj jeszcze raz za chwilę albo napisz do nas bezpośrednio:",
      mailtoLabel: "Wyślij mailem",
      mailtoAddress: "hello@boosterai.pl",
      mailtoSubject: "Bezpłatna konsultacja — zgłoszenie",
      successEcho: "Odpowiemy na adres",
      successTitle: "Mamy Twoje zgłoszenie",
      successBody: "Odezwiemy się w ciągu jednego dnia roboczego.",
      requiredNote: "Pola oznaczone * są wymagane, bez nich nie wyślemy zgłoszenia.",
      formTitle: "Wypełnij formularz",
      hints: {
        email: "Na ten adres wyślemy potwierdzenie i podsumowanie rozmowy.",
        phone: "Zadzwonimy w dzień roboczy. Wybierz kierunkowy i wpisz numer bez prefiksu.",
        topic: "Opisz krótko, co chcesz zautomatyzować lub zbudować. Wystarczy kilka zdań.",
        consent: "Zaznacz zgodę, żeby wysłać zgłoszenie. Dane wykorzystamy tylko do odpowiedzi na to zapytanie.",
      },
    },
    eyebrow: "Porozmawiajmy",
    headline: { text: "Bezpłatna", accent: "konsultacja." },
    body: "30 minut rozmowy. Wracamy z sześciotygodniowym planem, stałą ceną i pierwszą wersją demonstracyjną w ciągu dwóch tygodni.",
  },
};
