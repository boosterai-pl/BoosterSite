// The /voicebots page: how Booster implements voicebots, with the LegalFlow assistant as the use case.
// Only facts already confirmed on the LegalFlow page; no prices, timelines or volumes.
import { legalFlowHref } from "./links";
import type { Localized, PracticePage } from "./types";

export const voicebots: Localized<PracticePage> = {
  en: {
    eyebrow: "Voicebots",
    headline: { text: "A voicebot that picks up the phone", accent: "when your team can't." },
    lead: "We build voice assistants that answer calls, run a structured conversation, and leave your team a ready note in the system they already use. Not a menu of options to press, but a conversation. A working example is the assistant we run in LegalFlow, a platform for law firms.",
    heroCta: {
      microCopy: "On a free call we tell you honestly whether a voicebot fits your company.",
      label: "Book a free call",
      href: "/book?z=voicebots-hero",
    },
    facts: [
      { value: "24/7", label: "the assistant picks up after hours, at weekends and during meetings" },
      { value: "Text, voice, phone", label: "the channels the LegalFlow assistant works on" },
      { value: "Live in production", label: "at law firms, not a lab prototype" },
    ],
    problems: {
      title: "Where voicebots pay off",
      items: [
        "Calls arrive when nobody can answer, and a missed call is often a lost customer.",
        "Staff repeat the same first questions in every call.",
        "What the caller said ends up in someone's notebook, not in the system.",
        "Urgent cases wait in the same queue as routine ones.",
        "Voicemail is where inquiries go to be forgotten.",
      ],
    },
    features: {
      title: "What a voicebot from us does",
      items: [
        { title: "Picks up and talks", body: "Answers the call, introduces itself as an AI assistant and runs the conversation in natural language." },
        { title: "Asks your questions", body: "Follows the list of questions you define, and asks again when an answer is incomplete." },
        { title: "Spots what is urgent", body: "Recognises urgent situations and hands them to a person straight away." },
        { title: "Writes to your system", body: "Saves the data, the urgency and a short note in your CRM or business system, so nobody retypes anything." },
        { title: "Books the next step", body: "Arranges a call with the right person on your team." },
        { title: "Knows its limits", body: "Does not give advice outside its scope. Decisions stay with your people." },
      ],
    },
    callout: {
      eyebrow: "Use case: LegalFlow",
      title: "A digital law firm assistant, answering the phone since day one",
      body: "In LegalFlow, a platform for Polish restructuring law firms, the assistant takes the first call from a business owner in debt. It checks how urgent the case is and leaves the lawyer a ready note in the case. In the morning the lawyer sees a list of cases, not a list of missed calls.",
      points: [
        "Runs the first interview using the firm's own list of questions.",
        "Spots urgent cases, such as a frozen account or an auction, and passes them to a person straight away.",
        "Saves the case with its urgency and a note, and arranges a call with the lawyer.",
        "Always introduces itself as an AI assistant and gives no legal advice.",
      ],
      phone: {
        label: "Demo line",
        display: "+48 71 300 15 02",
        href: "tel:+48713001502",
        note: "Call and play a client. The assistant answers in Polish on a sample law firm. Standard call rates apply.",
      },
      link: { label: "More about the assistant", href: legalFlowHref("/asystentka", "voicebots-callout", "en") },
    },
    steps: {
      title: "How we implement a voicebot",
      items: [
        { title: "1. We map the conversation", body: "Together we go through the calls you get: who calls, what they ask, what your team needs to know and which cases are urgent." },
        { title: "2. We design the script", body: "We turn it into a list of questions, rules for urgent cases, and the limits of what the assistant may say." },
        { title: "3. We connect it to your system", body: "The assistant saves what it learns where your team already works, such as your CRM or business system." },
        { title: "4. We test on a demo line", body: "You call and play a customer before anyone real does, and we adjust until it sounds right." },
        { title: "5. We start with one process", body: "We launch on a single process, watch real calls and extend from there." },
      ],
    },
    sections: [
      {
        title: "Who this is for",
        body: "Companies that get phone calls they cannot always answer and where the first conversation follows a pattern: law firms, service companies, clinics, B2B sales teams. If a simple form or a better phone routine solves your problem, we will say so.",
      },
      {
        title: "What stays with your people",
        body: "The assistant collects and organises. It always says it is an AI and does not make decisions for you. Your team sees every conversation and takes it from there.",
      },
    ],
    cta: { microCopy: "Want a voicebot in your company?", label: "Book a free call", href: "/book?z=voicebots" },
  },
  pl: {
    eyebrow: "Voiceboty",
    headline: { text: "Voicebot, który odbiera telefon,", accent: "gdy zespół nie może." },
    lead: "Budujemy asystentów głosowych, którzy odbierają telefony, prowadzą uporządkowaną rozmowę i zostawiają zespołowi gotową notatkę w systemie, w którym już pracuje. To nie menu „wciśnij 1”, tylko rozmowa. Działający przykład to asystentka, którą prowadzimy w LegalFlow, platformie dla kancelarii.",
    heroCta: {
      microCopy: "Na bezpłatnej rozmowie uczciwie powiemy, czy voicebot pasuje do Twojej firmy.",
      label: "Umów bezpłatną rozmowę",
      href: "/book?z=voicebots-hero",
    },
    facts: [
      { value: "24/7", label: "asystent odbiera po godzinach, w weekend i w czasie spotkań" },
      { value: "Tekst, głos, telefon", label: "kanały, na których działa asystentka LegalFlow" },
      { value: "Działa produkcyjnie", label: "w kancelariach, nie jako prototyp z laboratorium" },
    ],
    problems: {
      title: "Gdzie voicebot się opłaca",
      items: [
        "Telefony przychodzą, gdy nikt nie może odebrać, a nieodebrane połączenie to często stracony klient.",
        "Pracownicy powtarzają te same pierwsze pytania w każdej rozmowie.",
        "To, co powiedział dzwoniący, ląduje w czyimś notesie, a nie w systemie.",
        "Pilne sprawy czekają w tej samej kolejce co rutynowe.",
        "Poczta głosowa to miejsce, w którym zapytania są zapominane.",
      ],
    },
    features: {
      title: "Co robi voicebot od nas",
      items: [
        { title: "Odbiera i rozmawia", body: "Odbiera połączenie, przedstawia się jako asystent AI i prowadzi rozmowę naturalnym językiem." },
        { title: "Zadaje Twoje pytania", body: "Idzie według listy pytań, którą ustalisz, i dopytuje, gdy odpowiedź jest niepełna." },
        { title: "Wyłapuje pilne sprawy", body: "Rozpoznaje sytuacje pilne i od razu przekazuje je człowiekowi." },
        { title: "Zapisuje w Twoim systemie", body: "Dane, pilność i krótką notatkę zapisuje w CRM lub systemie firmy, więc nikt niczego nie przepisuje." },
        { title: "Umawia kolejny krok", body: "Umawia rozmowę z właściwą osobą w Twoim zespole." },
        { title: "Zna swoje granice", body: "Nie udziela porad poza swoim zakresem. Decyzje zostają po stronie Twoich ludzi." },
      ],
    },
    callout: {
      eyebrow: "Use case: LegalFlow",
      title: "Cyfrowa Asystentka Kancelarii, która odbiera telefon od pierwszego dnia",
      body: "W LegalFlow, platformie dla kancelarii restrukturyzacyjnych, asystentka odbiera pierwszy telefon od przedsiębiorcy w długach. Ocenia, czy sprawa jest pilna, i zostawia prawnikowi gotową notatkę w sprawie. Rano prawnik widzi listę spraw, a nie listę nieodebranych połączeń.",
      points: [
        "Prowadzi pierwszy wywiad według listy pytań kancelarii.",
        "Wyłapuje pilne sprawy, na przykład zajęte konto albo licytację, i od razu przekazuje je człowiekowi.",
        "Zapisuje sprawę z pilnością i notatką, a potem umawia rozmowę z doradcą.",
        "Zawsze przedstawia się jako asystent AI i nie udziela porad prawnych.",
      ],
      phone: {
        label: "Linia demo",
        display: "71 300 15 02",
        href: "tel:+48713001502",
        note: "Zadzwoń i zagraj klienta, a asystentka poprowadzi resztę. Linia działa na przykładowej kancelarii. Opłata jak za zwykłe połączenie krajowe.",
      },
      link: { label: "Więcej o asystentce", href: legalFlowHref("/asystentka", "voicebots-callout", "pl") },
    },
    steps: {
      title: "Jak wdrażamy voicebota",
      items: [
        { title: "1. Mapujemy rozmowę", body: "Razem przechodzimy przez telefony, które dostajecie: kto dzwoni, o co pyta, co musi wiedzieć zespół i które sprawy są pilne." },
        { title: "2. Projektujemy scenariusz", body: "Zamieniamy to w listę pytań, zasady dla spraw pilnych i granice tego, co asystent może powiedzieć." },
        { title: "3. Podłączamy do Twojego systemu", body: "Asystent zapisuje to, czego się dowie, tam, gdzie zespół już pracuje, na przykład w CRM lub systemie firmy." },
        { title: "4. Testujemy na linii demo", body: "Dzwonisz i grasz klienta, zanim zrobi to prawdziwy klient, a my poprawiamy, aż brzmi dobrze." },
        { title: "5. Zaczynamy od jednego procesu", body: "Uruchamiamy na jednym procesie, oglądamy prawdziwe rozmowy i dopiero potem rozszerzamy." },
      ],
    },
    sections: [
      {
        title: "Dla kogo",
        body: "Dla firm, do których dzwoni się częściej, niż da się odebrać, i w których pierwsza rozmowa przebiega według schematu: kancelarie, firmy usługowe, przychodnie, zespoły sprzedaży B2B. Jeśli Twój problem rozwiąże prosty formularz albo lepsza organizacja telefonów, powiemy to wprost.",
      },
      {
        title: "Co zostaje po stronie Twoich ludzi",
        body: "Asystent zbiera i porządkuje. Zawsze mówi, że jest AI, i nie podejmuje decyzji za Ciebie. Zespół widzi każdą rozmowę i przejmuje sprawę.",
      },
    ],
    cta: { microCopy: "Chcesz voicebota w swojej firmie?", label: "Umów bezpłatną rozmowę", href: "/book?z=voicebots" },
  },
};
