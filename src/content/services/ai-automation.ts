// Service "ai-automation": the card in the home page Services section and the page at /practices/ai-automation.
import type { ServiceEntry } from "../types";

export const aiAutomation: ServiceEntry = {
  slug: "ai-automation",
  en: {
    card: {
      title: "AI Automation Studio",
      description: "The boring, expensive work, gone. We wire Claude, ChatGPT, n8n, and connectors we build ourselves into the bottlenecks that cost you most: document workflows, internal copilots, data plumbing. Real automation that pays for itself, not a chatbot bolted on for show.",
      tags: ["Claude", "n8n", "LLMs", "RAG"],
    },
    page: {
      eyebrow: "01 / AI Automation Studio",
      headline: { text: "Automation that stops your margins from", accent: "shrinking." },
      lead: "We build custom process automations powered by Claude, n8n, and Python to freeze your operational overhead. From turning messy client data into structured document drafts to building internal sales copilots, we systematically replace manual spreadsheet workarounds. Every deployment is measured against real ROI and engineered to pay for itself inside 90 days.",
      heroCta: { label: "Find your 90-day payback slot", href: "https://cal.com/szymon-bazan-iahn2z" },
      sections: [
        {
          title: "What we do",
          body: "We find the exact manual bottlenecks slowing down your growth and replace them with automated AI workflows. This includes fixing messy databases, automated B2B quoting pipelines, smart document processing, and deep multi-system syncs. We use Claude for reasoning, n8n for workflows, and Python to connect everything securely.",
        },
        {
          title: "How it works",
          body: "We start with a process audit, not a slide deck, but a live working session. We find the problem areas, clean your messy data first, and build directly on your production servers. A working version is ready within weeks, so your team can test it with real data from day one while we track time saved and reduce errors.",
        },
        {
          title: "Proof it works",
          body: "Kancelaria Jabłońska eliminated hours of daily spreadsheet chaos by connecting n8n, Claude, and Python into a single automation layer. Document tracking, removing duplicate records, and case routing now run smoothly in the background, paying for the system within the very first month.",
        },
        {
          title: "What you get",
          body: "Full Control: Custom workflows built on your own servers or cloud with zero license fees and no platform lock-in. System Integration: Clean connections with your existing tools: email, CRM, ERP, and data storage. Human Oversight: A simple dashboard built for your team to monitor the system and approve actions. 100% Code Ownership: You own the code completely, we train your team, and we track your real ROI from day one.",
        },
      ],
      cta: {
        microCopy: "Zero license fees. 100% your code.",
        label: "Get your custom stack",
        href: "https://cal.com/szymon-bazan-iahn2z",
      },
    },
  },
  pl: {
    card: {
      title: "AI Automation Studio",
      description: "Automatyzacja procesów oparta na Claude, n8n i Python. Od przepływów pracy z dokumentami po wewnętrznych pilotów, z mierzalnym zwrotem z inwestycji w pierwszym kwartale.",
      tags: ["Claude", "n8n", "Python", "RAG"],
    },
    page: {
      eyebrow: "01 / AI Automation Studio",
      headline: { text: "Automatyzacja, która powstrzymuje kurczenie się", accent: "Twoich marż." },
      lead: "Budujemy niestandardowe automatyzacje procesów oparte na Claude, n8n i Python, aby zatrzymać wzrost kosztów operacyjnych. Od przekształcania nieuporządkowanych danych klientów w ustrukturyzowane projekty dokumentów po budowanie wewnętrznych pilotów sprzedaży, systematycznie zastępujemy ręczne obejścia arkuszy kalkulacyjnych. Każde wdrożenie jest mierzone pod kątem rzeczywistego zwrotu z inwestycji i zaprojektowane tak, aby zwróciło się w ciągu 90 dni.",
      heroCta: {
        label: "Zarezerwuj termin. Zwrot w 90 dni",
        href: "https://cal.com/szymon-bazan-iahn2z",
      },
      sections: [
        {
          title: "Co robimy",
          body: "Znajdujemy dokładne ręczne wąskie gardła spowalniające Twój wzrost i zastępujemy je zautomatyzowanymi przepływami pracy AI. Obejmuje to naprawę nieuporządkowanych baz danych, zautomatyzowane potoki wycen B2B, inteligentne przetwarzanie dokumentów i głębokie synchronizacje wielu systemów. Używamy Claude do rozumowania, n8n do przepływów pracy i Python do bezpiecznego łączenia wszystkiego.",
        },
        {
          title: "Jak to działa",
          body: "Zaczynamy od audytu procesu, a nie od prezentacji slajdów, tylko od sesji roboczej na żywo. Znajdujemy problematyczne obszary, najpierw czyścimy Twoje nieuporządkowane dane, a następnie budujemy bezpośrednio na Twoich serwerach produkcyjnych. Działająca wersja jest gotowa w ciągu kilku tygodni, więc Twój zespół może ją testować z rzeczywistymi danymi od pierwszego dnia, podczas gdy my śledzimy zaoszczędzony czas i redukujemy błędy.",
        },
        {
          title: "Dowód, że to działa",
          body: "Kancelaria Jabłońska wyeliminowała godziny codziennego chaosu w arkuszach kalkulacyjnych, łącząc n8n, Claude i Python w jedną warstwę automatyzacji. Śledzenie dokumentów, usuwanie zduplikowanych rekordów i routing spraw działają teraz płynnie w tle, spłacając system w ciągu pierwszego miesiąca.",
        },
        {
          title: "Co otrzymujesz",
          body: "Pełna kontrola: Niestandardowe przepływy pracy zbudowane na Twoich własnych serwerach lub w chmurze, bez opłat licencyjnych i blokady platformy. Integracja systemu: Czyste połączenia z istniejącymi narzędziami: e-mail, CRM, ERP i przechowywanie danych. Nadzór człowieka: Prosty panel zbudowany dla Twojego zespołu do monitorowania systemu i zatwierdzania działań. 100% własności kodu: Jesteś w pełni właścicielem kodu, szkolimy Twój zespół i śledzimy Twój rzeczywisty zwrot z inwestycji od pierwszego dnia.",
        },
      ],
      cta: {
        microCopy: "Zero opłat licencyjnych. 100% Twój kod.",
        label: "Zbuduj swój dedykowany stack",
        href: "https://cal.com/szymon-bazan-iahn2z",
      },
    },
  },
};
