// Service "open-source-erp": the card in the home page Services section and the page at /practices/open-source-erp.
import type { ServiceEntry } from "../types";

export const openSourceErp: ServiceEntry = {
  slug: "open-source-erp",
  en: {
    card: {
      title: "Open-source ERP & CRM",
      description: "Enterprise-grade systems, none of the license tax. We deploy and customize open-source platforms like Open Mercato on your own infrastructure — self-hosted, no lock-in, and extended by us as you grow.",
      tags: ["Open Mercato", "ERP", "No lock-in", "Self-hosted"],
    },
    page: {
      eyebrow: "04 / Enterprise software, zero license fees.",
      headline: { text: "Enterprise power.", accent: "Zero user-seat pricing." },
      lead: "We deploy Open Mercato, a flexible, open-source ERP and CRM ecosystem, directly on your own secure infrastructure. You get the full power of enterprise software without vendor lock-in, expensive per-seat subscriptions, or slow corporate procurement cycles.",
      heroCta: {
        microCopy: "Stop paying six-figure bills for software user licenses.",
        label: "Drop per-seat pricing. Pick a time",
        href: "https://cal.com/szymon-bazan-iahn2z",
      },
      sections: [
        {
          title: "What we do",
          body: "We tailor and scale Open Mercato to fit your exact business operations. This covers CRM, inventory, invoicing, and procurement modules, whatever your team needs. Since the system is open-source, every custom feature belongs entirely to you. No user limits, no hidden fees, no surprise renewals.",
        },
        {
          title: "How it works",
          body: "We start by mapping your data flows and isolating your bottlenecks. Before moving anything, we clean and structure your messy historical data so nothing gets lost. Then, we deploy Open Mercato directly onto your secure servers, customizing workflows like approval chains or deep integrations straight into your own codebase.",
        },
        {
          title: "Who it's for",
          body: "Mid-market enterprises tired of paying huge annual bills just for CRM and ERP user seats. Organisations that demand absolute control over their sensitive business data and secure infrastructure. Teams that want to update their software instantly without waiting for slow corporate vendor approvals.",
        },
        {
          title: "What you get",
          body: "Production-Ready ERP/CRM: A secure Open Mercato ecosystem running live on your cloud or hardware. Clean Data Migration: Your historical business records cleaned, structured, and safely moved from legacy systems. 100% Code Ownership: Full source code control with zero platform lock-in and no ongoing subscription renewals. Custom Extensions: Tailored workflows and modules built exactly for your team's daily operations.",
        },
      ],
      cta: {
        microCopy: "Take full ownership of your enterprise software.",
        label: "Book a consultation with our Founder",
        href: "https://cal.com/szymon-bazan-iahn2z",
      },
    },
  },
  pl: {
    card: {
      title: "ERP i CRM Open Source",
      description: "Przedsiębiorstwo bez podatku licencyjnego. Wdrażamy Open Mercato w Twojej infrastrukturze. Jest w pełni konfigurowalny, należy do Ciebie i może być przez nas rozwijany.",
      tags: ["Open Mercato", "ERP", "Brak blokady", "Własny hosting"],
    },
    page: {
      eyebrow: "04 / Oprogramowanie dla przedsiębiorstw, zero opłat licencyjnych.",
      headline: { text: "Moc przedsiębiorstwa.", accent: "Zero cen za stanowisko użytkownika." },
      lead: "Wdrażamy Open Mercato, elastyczny ekosystem ERP i CRM open-source, bezpośrednio w Twojej własnej bezpiecznej infrastrukturze. Otrzymujesz pełną moc oprogramowania dla przedsiębiorstw bez blokady ze strony dostawcy, drogich subskrypcji za stanowisko i powolnych korporacyjnych cykli zakupów.",
      heroCta: {
        microCopy: "Przestań płacić sześciocyfrowe rachunki za licencje użytkowników oprogramowania.",
        label: "Porzuć ceny za stanowisko. Wybierz termin",
        href: "https://cal.com/szymon-bazan-iahn2z",
      },
      sections: [
        {
          title: "Co robimy",
          body: "Dostosowujemy i skalujemy Open Mercato, aby pasował do Twoich dokładnych operacji biznesowych. Obejmuje to moduły CRM, zapasów, fakturowania i zaopatrzenia, czegokolwiek potrzebuje Twój zespół. Ponieważ system jest open-source, każda niestandardowa funkcja należy w całości do Ciebie. Brak limitów użytkowników, brak ukrytych opłat, brak zaskakujących odnowień.",
        },
        {
          title: "Jak to działa",
          body: "Zaczynamy od mapowania Twoich przepływów danych i izolowania Twoich wąskich gardeł. Przed przeniesieniem czegokolwiek czyścimy i strukturyzujemy Twoje nieuporządkowane dane historyczne, aby nic nie zostało utracone. Następnie wdrażamy Open Mercato bezpośrednio na Twoich bezpiecznych serwerach, dostosowując przepływy pracy, takie jak łańcuchy zatwierdzeń lub głębokie integracje, bezpośrednio do Twojej własnej bazy kodu.",
        },
        {
          title: "Dla kogo to jest",
          body: "Przedsiębiorstwa ze średniego segmentu rynku zmęczone płaceniem ogromnych rocznych rachunków tylko za stanowiska użytkowników CRM i ERP. Organizacje, które wymagają absolutnej kontroli nad swoimi wrażliwymi danymi biznesowymi i bezpieczną infrastrukturą. Zespoły, które chcą natychmiast aktualizować swoje oprogramowanie bez czekania na powolne korporacyjne zatwierdzenia dostawców.",
        },
        {
          title: "Co otrzymujesz",
          body: "ERP/CRM gotowy do produkcji: Bezpieczny ekosystem Open Mercato działający na Twojej chmurze lub sprzęcie. Czysta migracja danych: Twoje historyczne dane biznesowe wyczyszczone, ustrukturyzowane i bezpiecznie przeniesione ze starszych systemów. 100% własności kodu: Pełna kontrola nad kodem źródłowym bez blokady platformy i bez stałych odnowień subskrypcji. Niestandardowe rozszerzenia: Dostosowane przepływy pracy i moduły zbudowane dokładnie dla codziennych operacji Twojego zespołu.",
        },
      ],
      cta: {
        microCopy: "Przejmij pełną kontrolę nad swoim oprogramowaniem dla przedsiębiorstw.",
        label: "Umów się na konsultację z naszym założycielem",
        href: "https://cal.com/szymon-bazan-iahn2z",
      },
    },
  },
};
