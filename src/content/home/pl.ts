// Home page copy, nav, footer and the /book page (Polish).
// Every change here needs the matching change in ./en.ts.
// Internal links ("/careers", "/book?z=...") stay without the /pl prefix: it is added automatically.
// Text in [square brackets] is a placeholder waiting for Szymon's confirmation.
import type { HomeCopy } from "../types";

export const homePl: HomeCopy = {
  meta: {
    brand: "Booster",
    contactEmail: "hello@boosterai.pl",
  },
  nav: [
    { label: "Jak pracujemy", href: "#process" },
    {
      label: "Realizacje",
      href: "#work",
      children: [
        { label: "LegalFlow", href: "/work/legalflow" },
        { label: "Open Mercato", href: "/practices/open-source-erp" },
      ],
    },
    { label: "O nas", href: "#team" },
    { label: "Kariera", href: "/careers" },
  ],
  navCta: {
    label: "Otrzymaj wycenę",
    href: "/book?z=nav",
  },
  home: {
    hero: {
      eyebrow: "Transformacja AI od A do Z",
      headline: { text: "Boostujemy firmy z AI.", accent: "Od pierwszego procesu do całej firmy." },
      lead: "Stawiamy AI w centrum Twojej firmy. Porządkujemy procesy, automatyzujemy powtarzalną pracę i budujemy nowe usługi, żeby firma mogła rosnąć szybciej, niż rośnie zespół. Prowadzimy przez całą transformację, etapami i ze stałą ceną każdego etapu.",
      primaryCta: { label: "Otrzymaj wycenę", href: "/book?z=hero" },
      secondaryCta: { label: "Zobacz, jak to wygląda w praktyce", href: "#work" },
      chart: {
        title: "Jak rośnie firma z AI w centrum",
        legend: { scale: "Skala firmy", team: "Zespół" },
        steps: [
          {
            title: "Pierwsze próby",
            text: "Ludzie testują AI na własnych kontach. Każdy nowy klient to więcej ręcznej pracy i kolejne osoby do zatrudnienia.",
            note: "Tu jest dziś większość firm",
          },
          {
            title: "Porządek w danych",
            text: "Wspólne dane i jasne procesy. Wiadomo, co robi człowiek, a co AI, i gdzie jest jedno źródło prawdy.",
          },
          {
            title: "Pierwsze procesy na AI",
            text: "Powtarzalną pracę przejmują agenci AI. Ten sam zespół obsługuje więcej zleceń.",
          },
          {
            title: "AI w centrum firmy",
            text: "Firma rośnie szybciej niż zespół. Ludzie podejmują decyzje i budują nowe usługi.",
          },
        ],
      },
    },
    facts: [
      { value: "do 70%", label: "mniej pracy administracyjnej w kancelariach, które pracują na LegalFlow" },
      { value: "Plan i cena", label: "po pierwszej rozmowie: plan etapów z ceną pierwszego etapu" },
      { value: "Twój kod", label: "kod i dane zostają u Ciebie, bez opłat za każdego użytkownika" },
    ],
    pain: {
      eyebrow: "Poznajesz to?",
      headline: { text: "Firma rośnie,", accent: "a razem z nią ręczna robota." },
      items: [
        "Każdy nowy klient oznacza kolejną osobę do zatrudnienia.",
        "Oferta powstaje kilka dni, bo dane są porozrzucane po Excelach.",
        "Jest jedna osoba, bez której pewne rzeczy stają.",
        "Raport robi się dwa dni, a i tak nikt mu do końca nie ufa.",
        "Ludzie używają AI, ale każdy po swojemu. Firma jako całość nic z tego nie ma.",
      ],
      closing: "Jedno nowe narzędzie tego nie zmieni. Firmę trzeba poukładać tak, żeby AI było jej centrum, a nie dodatkiem.",
    },
    stages: {
      eyebrow: "Gdzie jest Twoja firma",
      headline: { text: "Od pierwszych prób z AI", accent: "do firmy, która na nim działa." },
      items: [
        {
          title: "Pierwsze próby",
          body: "Ludzie testują AI na własnych kontach. Wiedza siedzi w głowach i w Excelach, a procesy działają tak samo jak przed AI.",
          note: "Tu jest dziś większość firm",
        },
        {
          title: "Poukładana firma",
          body: "Wspólne dane i uporządkowane procesy. Wiadomo, co robi człowiek, co robi AI i gdzie jest jedno źródło prawdy.",
        },
        {
          title: "AI w centrum firmy",
          body: "Agenci AI wykonują powtarzalną pracę na danych firmy, a ludzie podejmują decyzje i budują nowe usługi. Kolejni klienci nie wymagają kolejnych etatów.",
        },
      ],
      footnote: "Przeprowadzamy przez całą tę drogę, od A do Z. Zaczynamy od procesu, który dziś najbardziej boli.",
    },
    cases: {
      eyebrow: "Realizacje",
      headline: { text: "Jak to wygląda", accent: "w praktyce." },
      industries: "Pracowaliśmy z firmami z mediów, marketingu, budownictwa, produkcji, usług i z kancelariami.",
      labels: { before: "Przed", did: "Co zrobiliśmy", after: "Efekt" },
    },
    foundation: {
      eyebrow: "Fundament",
      headline: { text: "Nie piszemy Twojego systemu", accent: "od zera." },
      body: "Budujemy na Open Mercato. To otwarty, sprawdzony szkielet systemu firmowego: CRM, sprzedaż, magazyn i dokumenty. Dokładamy do niego to, czego potrzebuje Twoja firma, a AI tam, gdzie ma sens.",
      points: [
        { title: "Szybciej i taniej", body: "Gotowe fundamenty zamiast miesięcy pisania podstaw od nowa." },
        { title: "Bez opłat za użytkownika", body: "Płacisz za wdrożenie, a nie za każde konto w systemie." },
        { title: "System zostaje Twój", body: "Kod jest otwarty. Gdyby nas zabrakło, inny zespół może go dalej rozwijać." },
      ],
      partners: "Jeśli Twoja firma pracuje na Monday, ClickUp albo Pipedrive, wdrażamy też na nich. Jesteśmy partnerami tych platform.",
    },
    process: {
      eyebrow: "Jak pracujemy",
      headline: { text: "Wiesz, co dostaniesz", accent: "i ile to kosztuje." },
      steps: [
        { title: "Mapujemy", body: "Rozmowa i warsztat na Twoim procesie. Dostajesz plan z ceną pierwszego etapu." },
        { title: "Porządkujemy dane", body: "Zanim pojawi się AI, dane i proces muszą mieć sens. Inaczej automatyzujemy bałagan." },
        { title: "Wdrażamy", body: "Etap po etapie, na Twoich danych. Regularnie widzisz postęp i działające elementy." },
        { title: "Rozwijamy", body: "System działa, a my go utrzymujemy i bierzemy się za kolejne obszary." },
      ],
      principlesTitle: "Zasady",
      principles: [
        "Po rozmowie dostajesz plan: co robimy, w jakiej kolejności i ile kosztuje pierwszy etap.",
        "Cenę etapu znasz, zanim zaczniemy.",
        "Plan zostaje u Ciebie, nawet jeśli nie zaczniemy współpracy.",
      ],
    },
    data: {
      eyebrow: "Twoje dane",
      headline: { text: "Twoje dane zostają pod", accent: "Twoją kontrolą." },
      lead: "Na Twoich serwerach albo w chmurze. Na modelach, które znasz.",
      points: [
        { title: "Ty wybierasz, gdzie stoi system", body: "Na serwerach firmy (on-premise) albo w chmurze. Decyzja należy do Ciebie." },
        {
          title: "Model dobrany do zadania",
          body: "Pracujemy na czołowych modelach. Modele otwarte, w tym polski Bielik, mogą działać w całości na serwerach firmy.",
        },
        { title: "Wszystko na Twoją firmę", body: "Konta, repozytorium i klucze zakładamy na Twoją firmę. Kod jest Twój." },
        { title: "NDA i RODO", body: "Przed startem podpisujemy NDA. Dane przetwarzamy zgodnie z RODO." },
      ],
      modelsLabel: "Modele, na których pracujemy",
    },
    notFor: {
      eyebrow: "Uczciwie",
      headline: { text: "Kiedy nie jesteśmy", accent: "dla Ciebie." },
      items: [
        "Chcesz mieć AI, bo mają je wszyscy, ale nie zależy Ci na tym, co ma się zmienić w pracy firmy.",
        "Nikt po Twojej stronie nie znajdzie godziny w tygodniu na projekt.",
        "Potrzebujesz jednego prostego czatbota na stronę. Do tego wystarczy gotowe narzędzie.",
      ],
      closing: "Jeśli żaden punkt Cię nie dotyczy, porozmawiajmy.",
    },
    team: {
      eyebrow: "O nas",
      headline: { text: "Rozmawiasz z ludźmi, którzy potem", accent: "to budują." },
      body: "Nie mamy działu sprzedaży, który przekazuje projekt dalej. Na pierwszej rozmowie jest ktoś z zespołu, który potem pracuje przy wdrożeniu.",
      story: "LegalFlow powstał w Boosterze. Zbudowaliśmy go na tym samym podejściu, które proponujemy klientom, i sami go utrzymujemy.",
    },
    services: {
      eyebrow: "Czym to robimy",
      headline: { text: "Narzędzia dobieramy", accent: "do problemu." },
      body: "Nie musisz wybierać technologii. Opisz problem, a my zaproponujemy, czym go rozwiązać.",
    },
    faq: {
      eyebrow: "Pytania",
      headline: { text: "Zanim", accent: "porozmawiamy." },
      items: [
        {
          q: "Ile to kosztuje i od czego zależy cena?",
          a: "Od zakresu: ile procesów, ile systemów trzeba połączyć i ile danych uporządkować. Dlatego nie mamy cennika. Po pierwszej rozmowie dostajesz plan etapów i stałą cenę pierwszego etapu. Cenę każdego kolejnego etapu znasz, zanim go zaczniemy.",
        },
        {
          q: "Ile czasu musi poświęcić mój zespół?",
          a: "Potrzebujemy jednej osoby po Twojej stronie, która zna proces i może podejmować decyzje. Na początku to warsztat, potem krótkie spotkania, na których pokazujemy postęp. Reszta zespołu wchodzi wtedy, gdy testuje działające elementy.",
        },
        {
          q: "Co z naszymi obecnymi systemami (Comarch, Excel, CRM)?",
          a: "Zaczynamy od tego, co już macie. Często łączymy się z obecnym systemem albo budujemy na arkuszach, z których korzysta zespół, jak w firmie budowlanej powyżej. Nowy system proponujemy wtedy, gdy obecny blokuje pracę.",
        },
        {
          q: "Co z danymi i RODO?",
          a: "Ty decydujesz, gdzie stoi system: na Waszych serwerach albo w chmurze. Konta, repozytorium i klucze są na Twoją firmę, a przed startem podpisujemy NDA. Jeśli dane nie mogą wyjść poza firmę, używamy modeli otwartych, które działają na Waszych serwerach.",
        },
        {
          q: "Co jeśli zespół nie będzie chciał z tego korzystać?",
          a: "Dlatego zaczynamy od procesu, który zespół najbardziej męczy, i budujemy razem z osobami, które go wykonują. Pokazujemy działające elementy na Waszych danych, zanim zmieni się sposób pracy, i uczymy zespół z nich korzystać.",
        },
        {
          q: "Co się stanie z systemem, jeśli przestaniemy współpracować?",
          a: "Zostaje u Ciebie i działa dalej. Kod i dane należą do Twojej firmy, a fundament (Open Mercato) jest otwarty, więc może go rozwijać inny zespół.",
        },
      ],
    },
    cta: {
      eyebrow: "Pierwszy krok",
      headline: { text: "Zacznijmy od jednego procesu, który dziś", accent: "najbardziej boli." },
      body: "Rozmowa jest bezpłatna. Po niej dostajesz plan etapów z ceną pierwszego etapu, a decyzja należy do Ciebie.",
      button: { label: "Umów bezpłatną rozmowę", href: "/book?z=cta" },
    },
  },
  footer: {
    intro: "Transformacja firm z AI. Z Wrocławia.",
    columns: [
      {
        heading: "Czym to robimy",
        links: [
          { label: "Wdrożenia CRM", href: "/practices/crm-implementation" },
          { label: "System na Open Mercato", href: "/practices/open-source-erp" },
          { label: "Oprogramowanie na miarę", href: "/practices/b2b-software" },
          { label: "Automatyzacja z AI", href: "/practices/ai-automation" },
        ],
      },
      {
        heading: "Firma",
        links: [
          { label: "Jak pracujemy", href: "/#process" },
          { label: "Realizacje", href: "/#work" },
          { label: "LegalFlow", href: "/work/legalflow" },
          { label: "Zespół", href: "/#team" },
          { label: "Kariera", href: "/careers" },
        ],
      },
      {
        heading: "Kontakt",
        links: [
          { label: "hello@boosterai.pl", href: "mailto:hello@boosterai.pl" },
          { label: "LinkedIn", href: "https://www.linkedin.com/company/boosterai-en" },
          { label: "Polityka prywatności", href: "https://boosterai.pl/privacy-policy/" },
        ],
      },
    ],
    bottom: ["© 2026 Sales Booster Sp. z o.o., Wrocław", "Booster AI"],
  },
  booking: {
    eyebrow: "Bezpłatna rozmowa",
    headline: { text: "Opowiedz nam, co dziś", accent: "najbardziej boli." },
    body: "Pół godziny o Twojej firmie i o procesie, który chcesz zmienić. Po rozmowie dostajesz plan etapów z ceną pierwszego etapu. Co dalej, decydujesz Ty.",
    points: [
      "Rozmowa nic nie kosztuje",
      "Rozmawiasz z osobą, która potem pracuje przy wdrożeniu",
      "Nie potrzebujesz gotowej specyfikacji",
    ],
    proof: {
      kind: "Nasz produkt",
      title: "LegalFlow",
      body: "Do 70% mniej pracy administracyjnej w kancelariach restrukturyzacyjnych. Zbudowaliśmy go i sami utrzymujemy.",
      link: { label: "Więcej o LegalFlow", href: "/work/legalflow" },
    },
    calendar: {
      text: "Nie chcesz zostawiać numeru?",
      label: "Wybierz termin w kalendarzu",
      href: "https://cal.com/szymon-bazan-iahn2z/30min",
    },
    trustLabel: "Wdrażamy też na Monday, ClickUp i Pipedrive",
    starters: {
      eyebrow: "Z czym przychodzą firmy",
      headline: { text: "Nie wiesz, jak to", accent: "nazwać?" },
      hint: "Napisz to w formularzu",
      items: [
        "Każdy w firmie używa AI po swojemu i chcemy to uporządkować.",
        "Oferty albo raporty robimy ręcznie i trwa to dni.",
        "Wszystko jest w Excelu i w głowie jednej osoby.",
        "Chcemy zacząć z AI, ale nie wiemy, od czego.",
      ],
    },
    steps: {
      eyebrow: "Co dalej",
      headline: { text: "Od formularza", accent: "do planu." },
      imageAlt: "Szymon Bazan pracuje przy laptopie",
      items: [
        { title: "Piszesz kilka zdań", body: "Co dziś nie działa albo zajmuje za dużo czasu. Specyfikacja nie jest potrzebna." },
        { title: "Rozmawiamy", body: "Pół godziny przez telefon albo w terminie z kalendarza. O procesie i o tym, co ma się zmienić." },
        { title: "Dostajesz plan", body: "Etapy, kolejność i cena pierwszego etapu. Decyzję podejmujesz Ty." },
      ],
    },
    outcomes: {
      eyebrow: "Po rozmowie",
      headline: { text: "Co", accent: "dostajesz." },
      items: [
        { title: "Plan etapów", body: "Co robimy i w jakiej kolejności, zaczynając od tego, co najbardziej boli." },
        { title: "Cenę pierwszego etapu", body: "Stała kwota, którą znasz, zanim cokolwiek zaczniemy." },
        { title: "Czas na decyzję", body: "Nie musisz decydować na rozmowie. Plan możesz spokojnie przemyśleć." },
      ],
    },
    team: {
      eyebrow: "Zespół",
      headline: { text: "Kto jest po drugiej", accent: "stronie." },
      body: "Rozmowę prowadzi ktoś z zespołu, który potem buduje rozwiązanie.",
    },
    faq: {
      eyebrow: "Pytania",
      headline: { text: "Zanim wyślesz", accent: "formularz." },
      items: [
        { q: "Czy rozmowa jest płatna?", a: "Nie. Trwa około 30 minut i do niczego nie zobowiązuje." },
        {
          q: "Dlaczego prosicie o numer telefonu?",
          a: "Rozmowa odbywa się telefonicznie. Jeśli wolisz nie podawać numeru, wybierz termin w kalendarzu pod formularzem.",
        },
        {
          q: "Co mam wpisać w polu „Czego dotyczy sprawa?”",
          a: "Kilka zdań o tym, co dziś nie działa albo zajmuje za dużo czasu. Nie musisz wiedzieć, jaka technologia to rozwiąże.",
        },
        {
          q: "Czy muszę mieć pomysł na AI?",
          a: "Nie. Wystarczy, że wiesz, który proces w firmie Cię męczy. Od tego zaczynamy.",
        },
        {
          q: "Co dzieje się z moimi danymi?",
          a: "Administratorem danych jest Sales Booster Sp. z o.o. z siedzibą we Wrocławiu. Używamy ich tylko do odpowiedzi na Twoje zgłoszenie. Szczegóły są w polityce prywatności.",
        },
      ],
    },
    finalCta: {
      eyebrow: "Pierwszy krok",
      headline: { text: "Zacznijmy od", accent: "jednej rozmowy." },
      body: "Wypełnienie formularza zajmuje minutę. Odezwiemy się, żeby umówić termin.",
      label: "Wypełnij formularz",
    },
    form: {
      emailLabel: "E-mail",
      phoneLabel: "Telefon",
      topicLabel: "Czego dotyczy sprawa?",
      topicPlaceholder: "Np. oferty robimy ręcznie z kilku Exceli i trwa to kilka dni",
      consent:
        "Zgadzam się na kontakt w sprawie mojego zgłoszenia. Administratorem danych jest Sales Booster Sp. z o.o. z siedzibą we Wrocławiu.",
      privacyLabel: "Polityka prywatności",
      privacyHref: "https://boosterai.pl/privacy-policy/",
      honeypotLabel: "Nie wypełniaj tego pola",
      submit: "Umów bezpłatną rozmowę",
      submitting: "Wysyłanie…",
      footnote: "Rozmowa nic nie kosztuje.",
      invalidEmail: "Podaj prawidłowy adres e-mail.",
      invalidPhone: "Podaj prawidłowy numer telefonu.",
      requiredField: "To pole jest wymagane.",
      missingConsent: "Zaznacz zgodę, żeby wysłać zgłoszenie.",
      sent: "Wysłane",
      errorTitle: "Zgłoszenie nie doszło.",
      errorBody: "Wpisane dane zostały w formularzu. Spróbuj jeszcze raz za chwilę albo napisz do nas bezpośrednio:",
      mailtoLabel: "Wyślij mailem",
      mailtoAddress: "hello@boosterai.pl",
      mailtoSubject: "Bezpłatna rozmowa: zgłoszenie",
      successEcho: "Odpowiemy na adres",
      successTitle: "Dziękujemy, mamy Twoje zgłoszenie",
      successBody: "Odezwiemy się, żeby umówić rozmowę.",
      requiredNote: "Pola z gwiazdką (*) są wymagane.",
      formTitle: "Umów rozmowę",
      hints: {
        email: "Tu wyślemy potwierdzenie terminu.",
        phone: "Zadzwonimy w dzień roboczy. Wybierz kierunkowy i wpisz numer.",
        topic: "Kilka zdań wystarczy. Nie musisz znać rozwiązania.",
        consent: "Bez tej zgody nie możemy odpowiedzieć na zgłoszenie.",
      },
    },
  },
};
