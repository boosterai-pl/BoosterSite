// The /work/legalflow page, linked from the LegalFlow card in "Realizacje".
// Same shape as a practice page. Only facts confirmed by Szymon; no LegalFlow prices.
// Do not describe LegalFlow as Booster's own product.
import { legalFlowHref } from "./links";
import type { Localized, PracticePage } from "./types";

export const legalflow: Localized<PracticePage> = {
  en: {
    eyebrow: "Work / LegalFlow",
    headline: { text: "LegalFlow. A platform that works", accent: "in law firms." },
    lead: "A platform for Polish restructuring law firms, running in production. Case documents, communication with creditors, deadlines and an AI assistant in one place. Firms using it handle more cases with the same team.",
    heroCta: { label: "Visit the LegalFlow site", href: legalFlowHref("/", "work-legalflow-hero", "en") },
    facts: [
      { value: "up to 70%", label: "less administrative work in the firm" },
      { value: "Text, voice, phone", label: "the ways a client can talk to the assistant" },
      { value: "More cases", label: "handled by the same team" },
    ],
    problems: {
      title: "What a restructuring firm's day looks like",
      items: [
        "Much of the day goes into case paperwork, not legal work.",
        "Letters to creditors are written and sent by hand, one by one.",
        "Court deadlines are tracked in calendars and in people's heads.",
        "An hour-long client interview is then retyped into a document.",
        "Clients call with the same questions, and someone has to stop and answer.",
        "Every new case adds more of the same work.",
      ],
    },
    features: {
      title: "What LegalFlow does",
      items: [
        {
          title: "Case documents from templates",
          body: "Documents are generated from the firm's own templates and the data already in the case.",
        },
        {
          title: "Communication with creditors",
          body: "Letters and messages to creditors go out from one place, and the history stays in the case.",
        },
        {
          title: "Deadline tracking",
          body: "LegalFlow tracks court and procedural deadlines, and the whole team sees them in one place.",
        },
        {
          title: "From conversation to draft",
          body: "An hour-long conversation with a client becomes a structured draft of a document.",
        },
        {
          title: "AI assistant",
          body: "Talks to the firm's clients by text, dictation and phone, also after hours, and saves what it learns in the case.",
        },
        {
          title: "Everything in one place",
          body: "Cases, documents, tasks and deadlines in one system that the whole firm works on.",
        },
      ],
    },
    gallery: [
      {
        src: "/assets/work/legalflow-platform.jpg",
        alt: "A case card in LegalFlow",
        caption: "LegalFlow platform: a case card with documents, tasks and deadlines.",
        link: { label: "legal-flow.pl", href: legalFlowHref("/", "work-legalflow-gallery-platform", "en") },
      },
      {
        src: "/assets/work/legalflow-assistant.jpg",
        alt: "A conversation with the LegalFlow AI assistant",
        caption: "AI assistant: a conversation with a client, with the data saved in the case.",
        link: { label: "See the assistant", href: legalFlowHref("/asystentka", "work-legalflow-gallery-assistant", "en") },
      },
    ],
    callout: {
      eyebrow: "Digital law firm assistant",
      title: "An assistant that answers the phone when nobody in the firm can",
      body: "After hours, at weekends, during a hearing. The assistant picks up, holds the first conversation with a business owner in debt, checks how urgent the case is and leaves the lawyer a ready note in LegalFlow. In the morning the lawyer sees a list of cases, not a list of missed calls.",
      points: [
        "Runs the first interview using the firm's own list of questions.",
        "Spots urgent cases, such as a frozen account or an auction, and passes them to a person straight away.",
        "Saves the case with its urgency and a note, and arranges a call with the lawyer.",
        "Always introduces itself as an AI assistant and gives no legal advice. Decisions stay with the lawyer.",
      ],
      phone: {
        label: "Demo line",
        display: "+48 71 300 15 02",
        href: "tel:+48713001502",
        note: "Call and play a client. The assistant answers in Polish on a sample law firm. Standard call rates apply.",
      },
      link: { label: "More about the assistant", href: legalFlowHref("/asystentka", "work-legalflow-callout", "en") },
    },
    sections: [
      {
        title: "The result",
        body: "Up to 70% less administrative work. Lawyers spend their time on cases, not on retyping documents, and the firm takes on more cases with the same team.",
      },
      {
        title: "What this means for your company",
        body: "A law firm is one example. The same pattern, documents from templates, deadlines that nobody has to remember and an assistant that collects data from clients, works wherever a team is buried in paperwork. On a call we will tell you honestly whether it fits your company.",
      },
    ],
    cta: { microCopy: "Want something similar in your company?", label: "Book a free call", href: "/book?z=legalflow" },
  },
  pl: {
    eyebrow: "Realizacje / LegalFlow",
    headline: { text: "LegalFlow. Platforma, która działa", accent: "w kancelariach." },
    lead: "Platforma dla kancelarii restrukturyzacyjnych, działająca produkcyjnie. Dokumenty spraw, komunikacja z wierzycielami, terminy i asystent AI w jednym miejscu. Kancelarie prowadzą na niej więcej spraw tym samym zespołem.",
    heroCta: { label: "Zobacz stronę LegalFlow", href: legalFlowHref("/", "work-legalflow-hero", "pl") },
    facts: [
      { value: "do 70%", label: "mniej pracy administracyjnej w kancelarii" },
      { value: "Tekst, głos, telefon", label: "tak klient może rozmawiać z asystentem" },
      { value: "Więcej spraw", label: "prowadzonych tym samym zespołem" },
    ],
    problems: {
      title: "Jak wygląda dzień w kancelarii restrukturyzacyjnej",
      items: [
        "Duża część dnia idzie na dokumenty sprawy, a nie na pracę prawniczą.",
        "Pisma do wierzycieli powstają i wychodzą ręcznie, jedno po drugim.",
        "Terminy sądowe są pilnowane w kalendarzach i w głowach ludzi.",
        "Godzinna rozmowa z klientem jest potem przepisywana do dokumentu.",
        "Klienci dzwonią z tymi samymi pytaniami i ktoś musi przerwać pracę, żeby odpowiedzieć.",
        "Każda nowa sprawa dokłada tej samej pracy.",
      ],
    },
    features: {
      title: "Co robi LegalFlow",
      items: [
        {
          title: "Dokumenty z szablonów",
          body: "Dokumenty sprawy powstają z szablonów kancelarii i danych, które już są w sprawie.",
        },
        {
          title: "Komunikacja z wierzycielami",
          body: "Pisma i wiadomości do wierzycieli wychodzą z jednego miejsca, a historia zostaje w sprawie.",
        },
        {
          title: "Pilnowanie terminów",
          body: "LegalFlow pilnuje terminów sądowych i procesowych, a cały zespół widzi je w jednym miejscu.",
        },
        {
          title: "Z rozmowy szkic dokumentu",
          body: "Godzinna rozmowa z klientem zamienia się w uporządkowany szkic dokumentu.",
        },
        {
          title: "Asystent AI",
          body: "Rozmawia z klientami kancelarii tekstem, dyktowaniem i przez telefon, także po godzinach, a to, czego się dowie, zapisuje w sprawie.",
        },
        {
          title: "Wszystko w jednym miejscu",
          body: "Sprawy, pisma, zadania i terminy w jednym systemie, na którym pracuje cała kancelaria.",
        },
      ],
    },
    gallery: [
      {
        src: "/assets/work/legalflow-platform.jpg",
        alt: "Karta sprawy w LegalFlow",
        caption: "Platforma LegalFlow: karta sprawy z pismami, zadaniami i terminami.",
        link: { label: "legal-flow.pl", href: legalFlowHref("/", "work-legalflow-gallery-platform", "pl") },
      },
      {
        src: "/assets/work/legalflow-assistant.jpg",
        alt: "Rozmowa z Asystentem AI LegalFlow",
        caption: "Asystent AI: rozmowa z klientem, a dane zapisane w sprawie.",
        link: { label: "Zobacz asystenta", href: legalFlowHref("/asystentka", "work-legalflow-gallery-assistant", "pl") },
      },
    ],
    callout: {
      eyebrow: "Cyfrowa Asystentka Kancelarii",
      title: "Asystentka, która odbiera telefon, gdy w kancelarii nikt nie może",
      body: "Po godzinach, w weekend, w czasie rozprawy. Asystentka odbiera, przeprowadza pierwszą rozmowę z przedsiębiorcą w długach, ocenia, czy sprawa jest pilna, i zostawia prawnikowi gotową notatkę w LegalFlow. Rano prawnik widzi listę spraw, a nie listę nieodebranych połączeń.",
      points: [
        "Prowadzi pierwszy wywiad według listy pytań kancelarii.",
        "Wyłapuje pilne sprawy, na przykład zajęte konto albo licytację, i od razu przekazuje je człowiekowi.",
        "Zapisuje sprawę z pilnością i notatką, a potem umawia rozmowę z doradcą.",
        "Zawsze przedstawia się jako asystent AI i nie udziela porad prawnych. Decyzje zostają po stronie prawnika.",
      ],
      phone: {
        label: "Linia demo",
        display: "71 300 15 02",
        href: "tel:+48713001502",
        note: "Zadzwoń i zagraj klienta, a asystentka poprowadzi resztę. Linia działa na przykładowej kancelarii. Opłata jak za zwykłe połączenie krajowe.",
      },
      link: { label: "Więcej o asystentce", href: legalFlowHref("/asystentka", "work-legalflow-callout", "pl") },
    },
    sections: [
      {
        title: "Efekt",
        body: "Do 70% mniej pracy administracyjnej. Prawnicy zajmują się sprawami, a nie przepisywaniem dokumentów, a kancelaria prowadzi więcej spraw tym samym zespołem.",
      },
      {
        title: "Co z tego wynika dla Twojej firmy",
        body: "Kancelaria to tylko jeden przykład. Ten sam układ, czyli dokumenty z szablonów, terminy, których nikt nie musi pamiętać, i asystent, który zbiera dane od klientów, sprawdza się wszędzie tam, gdzie zespół tonie w papierach. Na rozmowie uczciwie powiemy, czy pasuje do Twojej firmy.",
      },
    ],
    cta: { microCopy: "Chcesz podobnego rozwiązania w swojej firmie?", label: "Umów bezpłatną rozmowę", href: "/book?z=legalflow" },
  },
};
