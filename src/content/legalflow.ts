// The /work/legalflow page: our own product, linked from the LegalFlow card in "Realizacje".
// Same shape as a practice page. Only facts confirmed by Szymon; no LegalFlow prices.
import type { Localized, PracticePage } from "./types";

export const legalflow: Localized<PracticePage> = {
  en: {
    eyebrow: "Work / LegalFlow",
    headline: { text: "LegalFlow. Our own product,", accent: "running in law firms." },
    lead: "A platform for Polish restructuring law firms. We built it at Booster and we run it ourselves. Firms using it handle more cases with the same team.",
    heroCta: { label: "Visit the LegalFlow site", href: "https://legal-flow.pl" },
    sections: [
      {
        title: "The problem",
        body: "In a restructuring firm much of the day goes into case paperwork, letters to creditors and watching court deadlines. Every new case adds more of it.",
      },
      {
        title: "What LegalFlow does",
        body: "It generates case documents from the firm's own templates. It handles communication with creditors and tracks deadlines. It turns an hour-long client interview into a structured draft. The assistant works by text, dictation and phone.",
      },
      { title: "The result", body: "Up to 70% less administrative work. Lawyers spend their time on cases, not on retyping documents." },
      {
        title: "Why we show it",
        body: "LegalFlow was built with the same approach we offer our clients: data and process first, then AI, stage by stage. It shows that we build and maintain systems like this, not just design them.",
      },
    ],
    cta: { microCopy: "Want something similar in your company?", label: "Book a free call", href: "/book?z=legalflow" },
  },
  pl: {
    eyebrow: "Realizacje / LegalFlow",
    headline: { text: "LegalFlow. Nasz własny produkt,", accent: "który działa w kancelariach." },
    lead: "Platforma dla kancelarii restrukturyzacyjnych. Zbudowaliśmy ją w Boosterze i sami ją utrzymujemy. Kancelarie prowadzą na niej więcej spraw tym samym zespołem.",
    heroCta: { label: "Zobacz stronę LegalFlow", href: "https://legal-flow.pl" },
    sections: [
      {
        title: "Problem",
        body: "W kancelarii restrukturyzacyjnej duża część dnia idzie na dokumenty sprawy, korespondencję z wierzycielami i pilnowanie terminów sądowych. Każda nowa sprawa dokłada tej pracy.",
      },
      {
        title: "Co robi LegalFlow",
        body: "Generuje dokumentację sprawy z szablonów kancelarii. Prowadzi komunikację z wierzycielami i pilnuje terminów. Z godzinnej rozmowy z klientem robi uporządkowany szkic dokumentu. Asystent działa tekstem, dyktowaniem i przez telefon.",
      },
      { title: "Efekt", body: "Do 70% mniej pracy administracyjnej. Prawnicy zajmują się sprawami, a nie przepisywaniem dokumentów." },
      {
        title: "Dlaczego o tym piszemy",
        body: "LegalFlow powstał na tym samym podejściu, które proponujemy klientom: najpierw dane i proces, potem AI, etap po etapie. To dowód, że takie systemy budujemy i utrzymujemy, a nie tylko projektujemy.",
      },
    ],
    cta: { microCopy: "Chcesz podobnego rozwiązania w swojej firmie?", label: "Umów bezpłatną rozmowę", href: "/book?z=legalflow" },
  },
};
