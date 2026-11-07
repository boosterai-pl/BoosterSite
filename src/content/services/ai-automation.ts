// Service "ai-automation": the card in the home page Services section and the page at /practices/ai-automation.
import type { ServiceEntry } from "../types";

export const aiAutomation: ServiceEntry = {
  slug: "ai-automation",
  en: {
    card: {
      title: "AI Automation",
      description: "AI agents that work on your company's data, not on employees' private chatbot accounts. We put the process and the data in order first, then automate.",
      tags: ["Claude", "n8n", "Python", "AI agents"],
    },
    page: {
      eyebrow: "01 / AI Automation",
      headline: { text: "AI that works on your company's data,", accent: "not next to it." },
      lead: "Your people already use AI, each on their own account. They paste documents into ChatGPT or Claude, and the results stay in their chat window. We turn this into one company system: AI agents that work on shared company data, follow agreed rules and stay under your team's control. You know the price of the first stage before any work starts.",
      heroCta: {
        microCopy: "After the first call you get a plan of stages and the price of the first one.",
        label: "Book a call",
        href: "/book?z=ai-automation-hero",
      },
      sections: [
        {
          title: "Where it usually goes wrong",
          body: "Everyone uses AI differently and nobody sees the whole picture. You don't know which documents leave the company, and a good idea from one person never reaches the rest of the team. The second trap is automating too early. If the process is messy, AI simply repeats the mess faster.",
        },
        {
          title: "How we work",
          body: "1. We map. In a workshop with the people who do the work, we walk through the process and pick the places where automation makes sense. You get a plan of stages with the price of the first one. 2. We put the data in order. We align the sources, remove duplicates and agree where the system takes its information from. 3. We implement, stage by stage, on your data. You see progress regularly and decide on the next step. 4. We maintain and extend. Once the first process runs, we add the next ones.",
        },
        {
          title: "What you get and what you own",
          body: "Automations running on your servers or in your cloud, connected to the tools you already use: email, CRM, accounting, document storage. A panel where your team sees what each agent did and approves the important actions. Before we start, we agree which data goes to AI models, where it is processed and who has access. The code and the data stay with you, with no per-user fees. The code is open and documented, so another team could continue without us.",
        },
        {
          title: "Examples from our work",
          body: "LegalFlow is our own platform for Polish restructuring law firms, running in production. It prepares case documentation from the firm's templates, handles communication with creditors and tracks deadlines. A one-hour conversation with a client becomes a structured draft, and the assistant works by text, dictation and phone. Firms get up to 70% less administrative work and take on more cases with the same team. A large media company: we automated the preparation of sales offers, which used to require collecting data by hand from many places.",
        },
        {
          title: "When we are not a good fit",
          body: "If a process changes every week or nobody in the company owns it, AI will not fix that. We will tell you so on the first call and suggest starting with putting the process in order. If you are looking for a chatbot just to have one, we are not the right team.",
        },
      ],
      cta: {
        microCopy: "You know the price of each stage before we start it.",
        label: "Book a call about automation",
        href: "/book?z=ai-automation-sekcja",
      },
    },
  },
  pl: {
    card: {
      title: "Automatyzacja z AI",
      description: "Agenci AI, którzy pracują na danych Twojej firmy, a nie na prywatnych kontach pracowników. Najpierw porządkujemy proces i dane, potem automatyzujemy.",
      tags: ["Claude", "n8n", "Python", "Agenci AI"],
    },
    page: {
      eyebrow: "01 / Automatyzacja z AI",
      headline: { text: "AI, które pracuje na danych Twojej firmy,", accent: "a nie obok nich." },
      lead: "Twoi ludzie już korzystają z AI, każdy na swoim koncie. Wklejają dokumenty do ChatGPT albo Claude, a wyniki zostają w ich oknie czatu. Łączymy to w jeden system firmy. Agenci AI pracują na wspólnych danych, według ustalonych zasad i pod kontrolą Twojego zespołu. Cenę pierwszego etapu znasz, zanim zaczniemy pracę.",
      heroCta: {
        microCopy: "Po pierwszej rozmowie dostajesz plan etapów z ceną pierwszego z nich.",
        label: "Umów rozmowę",
        href: "/book?z=ai-automation-hero",
      },
      sections: [
        {
          title: "Gdzie zwykle jest problem",
          body: "Każdy używa AI inaczej i nikt nie widzi całości. Nie wiesz, jakie dokumenty wychodzą poza firmę, a dobry pomysł jednej osoby nie trafia do reszty zespołu. Druga pułapka to automatyzacja na skróty. Jeśli proces jest nieuporządkowany, AI po prostu szybciej powiela bałagan.",
        },
        {
          title: "Jak pracujemy",
          body: "1. Mapujemy. Na warsztacie z osobami, które wykonują daną pracę, przechodzimy przez proces i wybieramy miejsca, w których automatyzacja ma sens. Dostajesz plan etapów z ceną pierwszego. 2. Porządkujemy dane. Ujednolicamy źródła, usuwamy duplikaty i ustalamy, skąd system bierze informacje. 3. Wdrażamy etap po etapie, na Twoich danych. Regularnie widzisz postęp i decydujesz o kolejnym kroku. 4. Rozwijamy. Gdy pierwszy proces działa, utrzymujemy go i dokładamy kolejne.",
        },
        {
          title: "Co dostajesz i co należy do Ciebie",
          body: "Automatyzacje działające na Twoich serwerach lub w Twojej chmurze, połączone z narzędziami, których już używasz: pocztą, CRM, systemem księgowym, dyskiem z dokumentami. Panel, w którym Twój zespół widzi, co zrobił agent, i zatwierdza ważniejsze działania. Przed startem ustalamy, które dane trafiają do modeli AI, gdzie są przetwarzane i kto ma do nich dostęp. Kod i dane zostają u Ciebie, bez opłat za użytkownika. Kod jest otwarty i opisany, więc inny zespół może go rozwijać bez nas.",
        },
        {
          title: "Przykłady z naszej pracy",
          body: "LegalFlow to nasza własna platforma dla kancelarii restrukturyzacyjnych, działająca produkcyjnie. Przygotowuje dokumentację spraw na wzorach kancelarii, prowadzi komunikację z wierzycielami i pilnuje terminów. Godzinną rozmowę z klientem zamienia w uporządkowany projekt dokumentu, a asystent działa tekstowo, przez dyktowanie i przez telefon. Kancelarie mają do 70% mniej pracy administracyjnej i prowadzą więcej spraw tym samym zespołem. Duża firma z branży mediowej: zautomatyzowaliśmy przygotowywanie ofert handlowych, które wcześniej wymagało ręcznego zbierania danych z wielu miejsc.",
        },
        {
          title: "Kiedy nie jesteśmy dobrym wyborem",
          body: "Jeśli proces zmienia się co tydzień albo nikt w firmie za niego nie odpowiada, AI tego nie naprawi. Powiemy to wprost na pierwszej rozmowie i zaproponujemy, żeby zacząć od uporządkowania procesu. Jeśli szukasz chatbota tylko po to, żeby go mieć, nie jesteśmy właściwym zespołem.",
        },
      ],
      cta: {
        microCopy: "Cenę każdego etapu znasz, zanim go zaczniemy.",
        label: "Umów rozmowę o automatyzacji",
        href: "/book?z=ai-automation-sekcja",
      },
    },
  },
};
