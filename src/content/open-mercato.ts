// The /open-mercato landing page. Same shape as a practice page.
// DRAFT: text in [square brackets] waits for decisions and must be filled in before merge.
// No client names and no numbers other than the ones below: "eight weeks" comes from an anonymous reference.
import type { Localized, PracticePage } from "./types";

export const openMercato: Localized<PracticePage> = {
  en: {
    eyebrow: "Open Mercato",
    headline: { text: "Your process does not fit in a box", accent: "" },
    lead: "Open Mercato is our system framework, on which we build a solution for one specific company process. We do not start from a blank page, and we do not make you work around an off-the-shelf program that almost fits.",
    heroCta: {
      label: "Book a call about your process",
      href: "#contact",
    },
    secondaryCta: {
      label: "See what the first stage looks like",
      href: "#steps",
    },
    problems: {
      title: "Where the work goes",
      items: [
        "An off-the-shelf program almost fits. Almost means the team keeps half of the process in spreadsheets and the other half goes by email. Every new person learns the exceptions, not the system.",
        "Data lives in four places at once. The order in one system, stock in another, the price list in a file, agreements with the customer in an inbox. Someone stitches it together by hand every day, and that person is the bottleneck.",
        "Growth costs more and more manual work. Twice the orders means twice the retyping. That is the moment a company stops growing on the same team.",
      ],
    },
    features: {
      title: "What we usually build on Open Mercato",
      items: [
        { title: "Orders and customer service", body: "An order is entered once and visible everywhere, instead of circulating in emails." },
        { title: "Price lists and offer configurator", body: "A salesperson builds an offer in minutes, with current prices and discount rules, without asking anyone for a file." },
        { title: "B2B customer portal", body: "The customer checks status, history and documents on their own, instead of calling their account manager." },
        { title: "Company documents with an answer and a source", body: "Ask in plain language, get an answer with a link to the exact document, without guessing." },
        { title: "Quality documentation and certificates", body: "The full set of shipping papers is assembled automatically, instead of searching through folders." },
        { title: "Integrations", body: "We connect what stays with you: accounting, warehouse, online shop, files from suppliers." },
        { title: "On-premise version", body: "If data cannot leave the company, we run the whole system with you, with a model that works locally." },
        { title: "[For Szymon to decide]", body: "[Which tiles stay on this page. Drop the ones we do not want to sell today.]" },
      ],
    },
    steps: {
      title: "Three steps",
      items: [
        { title: "A talk about the process", body: "We look at where manual work comes from and how much of it there is. No product presentation." },
        { title: "A core in a few weeks", body: "One process, your data, a working system in the team's hands." },
        { title: "Modules in stages", body: "We add further areas in the order that makes sense for you." },
      ],
    },
    sections: [
      {
        title: "First a core that works. Then modules.",
        body: "We start with one process, the one that hurts most today. We build the core of the system on your data and put it into real work, instead of showing a presentation and asking for a decision in the dark. We add further modules in stages, with the system already running. In practice, you decide about the next stage by looking at something that works for you. If after the first stage you decide it is not the right way, you stop with a working piece, not with an invoice for a project that was supposed to be ready in a year. In a project for an industrial automation company we had a working core after eight weeks, and added further modules on the living system.",
      },
      {
        title: "Who this is for",
        body: "For companies whose process is specific enough that off-the-shelf programs have to be worked around, and repeatable enough to be described with rules. Usually [client profile: size, industries, number of people in the operations team, for Szymon to fill in]. It is not for companies that want the cheapest box and agree to fit their work to what is in it. We do not take such projects, because both sides lose.",
      },
      {
        title: "About throughput",
        body: "We do not sell laying people off. We sell the same team handling several times more orders, offers and enquiries, because it stops retyping data between systems. Whoever holds the process and the customer relationship in their head is the most valuable person in this setup, not the most at risk.",
      },
      {
        title: "Who does this",
        body: "Booster AI, Wrocław. We are a small team that builds systems for specific processes: automations, AI agents, CRM and internal systems. We are implementation partners of Monday, ClickUp and Pipedrive. From projects we can talk about: a system for managing the inventory of advertising media, and an AI system in industrial automation, where a working core took eight weeks and we added further modules in stages.",
      },
    ],
    faq: {
      title: "Questions we hear most often",
      items: [
        { q: "How long does it take?", a: "The first stage usually takes [range of weeks, for Szymon to set]. We give the exact date after a talk about scope, because it depends on how many systems have to be connected and how much data we migrate." },
        { q: "How much does it cost?", a: "[Price range or billing model, for Szymon to decide. Nothing entered by the agent.]" },
        { q: "How is Open Mercato different from an off-the-shelf ERP?", a: "An off-the-shelf system imposes its way of working, and you either fit in or build workarounds. Open Mercato is a framework in which we describe the process your way, and the repeatable blocks are already built, so you do not pay for writing everything from scratch." },
        { q: "What if the data cannot leave the company?", a: "We run everything with you, with a model that works locally. Nothing goes outside." },
        { q: "What stays ours?", a: "[For Szymon to confirm: code ownership and licence. We do not know our standard, so we do not guess.]" },
        { q: "What if after the first stage we decide it is not it?", a: "You stay with a working piece of the system and a decision whether we go on. We do not tie anyone to the whole project up front." },
      ],
    },
    cta: {
      microCopy: "Tell us what you do by hand today. In the first talk we do not show a product presentation. We ask about the process and say whether we see the point, also when it turns out we do not. [Hook this up to: form / calendar / address, to be decided. Planned form: name, company, email, one field “what eats the most manual work today”.]",
      label: "Book a call about your process",
      href: "/book?z=open-mercato-cta",
    },
  },
  pl: {
    eyebrow: "Open Mercato",
    headline: { text: "Twój proces nie mieści się w pudełku", accent: "" },
    lead: "Open Mercato to nasz szkielet systemu, na którym składamy rozwiązanie pod konkretny proces firmy. Nie zaczynamy od pustej kartki i nie każemy Wam obchodzić bokiem gotowego programu, który prawie pasuje.",
    heroCta: {
      label: "Umów rozmowę o swoim procesie",
      href: "#contact",
    },
    secondaryCta: {
      label: "Zobacz, jak wygląda pierwszy etap",
      href: "#steps",
    },
    problems: {
      title: "Gdzie ucieka praca",
      items: [
        "Gotowy program prawie pasuje. Prawie, czyli zespół i tak trzyma połowę procesu w arkuszach, a druga połowa idzie mailem. Każda nowa osoba uczy się wyjątków, nie systemu.",
        "Dane siedzą w czterech miejscach naraz. Zamówienie w jednym systemie, magazyn w drugim, cennik w pliku, ustalenia z klientem w skrzynce. Ktoś to codziennie zszywa ręcznie i ten ktoś jest wąskim gardłem.",
        "Wzrost kosztuje coraz więcej ręcznej roboty. Dwa razy więcej zamówień oznacza dwa razy więcej przeklepywania. To moment, w którym firma przestaje rosnąć na tym samym zespole.",
      ],
    },
    features: {
      title: "Co zwykle składamy na Open Mercato",
      items: [
        { title: "Zamówienia i obsługa klienta", body: "Zamówienie wchodzi raz i jest widoczne wszędzie, zamiast krążyć w mailach." },
        { title: "Cenniki i konfigurator oferty", body: "Handlowiec składa ofertę w kilka minut, z aktualnymi cenami i regułami rabatowymi, bez pytania kogoś o plik." },
        { title: "Portal dla klientów B2B", body: "Klient sam sprawdza status, historię i dokumenty, zamiast dzwonić do opiekuna." },
        { title: "Dokumenty firmowe z odpowiedzią i źródłem", body: "Pytanie po ludzku, odpowiedź z linkiem do konkretnego dokumentu, bez zgadywania." },
        { title: "Dokumentacja jakościowa i atesty", body: "Komplet papierów do wysyłki składany automatycznie, zamiast szukania po katalogach." },
        { title: "Integracje", body: "Spinamy to, co u Was zostaje: księgowość, magazyn, sklep, pliki od dostawców." },
        { title: "Wersja on-premise", body: "Jeśli dane nie mogą wyjść z firmy, stawiamy całość u Was, z modelem działającym lokalnie." },
        { title: "[Do decyzji Szymona]", body: "[Które kafelki zostawiamy na tej stronie. Wyrzuciłbym to, czego nie chcemy dziś sprzedawać.]" },
      ],
    },
    steps: {
      title: "Trzy kroki",
      items: [
        { title: "Rozmowa o procesie", body: "Patrzymy, gdzie powstaje ręczna robota i ile jej jest. Bez prezentacji produktowej." },
        { title: "Rdzeń w kilka tygodni", body: "Jeden proces, Wasze dane, działający system w rękach zespołu." },
        { title: "Moduły etapami", body: "Dokładamy kolejne obszary w kolejności, która ma dla Was sens." },
      ],
    },
    sections: [
      {
        title: "Najpierw rdzeń, który działa. Potem moduły.",
        body: "Zaczynamy od jednego procesu, tego, który dziś boli najbardziej. Stawiamy rdzeń systemu na Waszych danych i uruchamiamy go w realnej pracy, zamiast pokazywać prezentację i prosić o decyzję w ciemno. Kolejne moduły dokładamy etapami, już przy działającym systemie. Co to zmienia w praktyce: decyzję o kolejnym etapie podejmujecie, patrząc na coś, co działa u Was. Jeśli po pierwszym etapie uznacie, że to nie ta droga, zatrzymujecie się z działającym kawałkiem, a nie z fakturą za projekt, który miał być gotowy za rok. W projekcie dla firmy z automatyki przemysłowej działający rdzeń mieliśmy po ośmiu tygodniach, a kolejne moduły dokładaliśmy już na żywym organizmie.",
      },
      {
        title: "Dla kogo to jest",
        body: "Dla firm, w których proces jest na tyle swoisty, że gotowe programy wymagają obchodzenia ich bokiem, a na tyle powtarzalny, że da się go opisać regułami. Zwykle [profil klienta: wielkość, branże, liczba osób w zespole operacyjnym do uzupełnienia przez Szymona]. Nie jest dla firm, które chcą najtańsze pudełko i zgadzają się dopasować swoją robotę do tego, co w nim jest. Takich tematów nie bierzemy, bo obie strony na tym tracą.",
      },
      {
        title: "O przepustowości",
        body: "Nie sprzedajemy zwalniania ludzi. Sprzedajemy to, że ten sam zespół obsługuje kilka razy więcej zamówień, ofert i zapytań, bo przestaje przeklepywać dane między systemami. Kto ma w głowie proces i relację z klientem, ten jest w tym układzie najcenniejszy, a nie najbardziej zagrożony.",
      },
      {
        title: "Kto to robi",
        body: "Booster AI, Wrocław. Jesteśmy małym zespołem, który składa systemy pod konkretne procesy: automatyzacje, agenci AI, CRM i systemy wewnętrzne. Partnerzy wdrożeniowi Monday, ClickUp i Pipedrive. Z realizacji, o których możemy mówić: system do zarządzania inventory nośników reklamowych oraz system AI w automatyce przemysłowej, gdzie działający rdzeń powstał w osiem tygodni, a kolejne moduły dokładaliśmy etapami.",
      },
    ],
    faq: {
      title: "Najczęstsze pytania",
      items: [
        { q: "Ile to trwa?", a: "Pierwszy etap zwykle [zakres tygodni do ustalenia przez Szymona]. Dokładny termin podajemy po rozmowie o zakresie, bo zależy od tego, ile systemów trzeba spiąć i ile danych migrujemy." },
        { q: "Ile to kosztuje?", a: "[Widełki albo model rozliczenia do decyzji Szymona. Sam nic nie wpisuję.]" },
        { q: "Czym Open Mercato różni się od gotowego ERP?", a: "Gotowy system narzuca swój sposób pracy i albo się w nim mieścicie, albo robicie obejścia. Open Mercato to szkielet, w którym proces opisujemy po Waszemu, a powtarzalne klocki mamy już zrobione, więc nie płacicie za pisanie wszystkiego od zera." },
        { q: "Co, jeśli dane nie mogą wyjść poza firmę?", a: "Stawiamy wszystko u Was, z modelem działającym lokalnie. Nic nie wychodzi na zewnątrz." },
        { q: "Co zostaje nasze?", a: "[Do potwierdzenia przez Szymona: kwestia własności kodu i licencji. Nie znam naszego standardu, więc nie zgaduję.]" },
        { q: "Co, jeśli po pierwszym etapie stwierdzimy, że to nie to?", a: "Zostajecie z działającym kawałkiem systemu i decyzją, czy idziemy dalej. Nie wiążemy nikogo na cały projekt z góry." },
      ],
    },
    cta: {
      microCopy: "Opowiedz, co dziś robicie ręcznie. Na pierwszej rozmowie nie pokazujemy prezentacji produktu. Pytamy o proces i mówimy, czy widzimy sens, także wtedy, gdy wychodzi, że nie. [Podpiąć pod: formularz / kalendarz / adres, do ustalenia. Planowany formularz: imię, firma, mail, jedno pole „co dziś zjada najwięcej ręcznej roboty”.]",
      label: "Umów rozmowę o swoim procesie",
      href: "/book?z=open-mercato-cta",
    },
  },
};

export const openMercatoMeta = {
  en: {
    title: "Open Mercato: a system built around your process, assembled in modules | Booster AI",
    description:
      "Instead of fitting your company to a boxed system, we build the system around your process. A working core in a few weeks. Further modules in stages.",
  },
  pl: {
    title: "Open Mercato: system pod Twój proces, składany modułowo | Booster AI",
    description:
      "Zamiast dopasowywać firmę do pudełkowego systemu, składamy system pod Wasz proces. Rdzeń, który działa, w kilka tygodni. Kolejne moduły etapami.",
  },
} as const;
