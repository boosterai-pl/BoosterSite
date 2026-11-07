// Service "ai-automation": the card in the home page Services section and the page at /practices/ai-automation.
// Only true results from real projects. Clients stay anonymous; the media client is not mentioned.
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
      facts: [
        { value: "up to 70%", label: "less administrative work in law firms using LegalFlow" },
        { value: "3 days → 30 min", label: "monthly work on employee certificates in a construction group" },
        { value: "99.8%", label: "match with the accountant's manual work in the same project" },
      ],
      problems: {
        title: "Where it usually goes wrong",
        items: [
          "Everyone uses AI their own way, on a private account. What they learn stays in their chat window.",
          "You don't know which documents and client data end up in outside tools.",
          "Someone retypes the same data from emails and spreadsheets into several systems.",
          "Proposals, reports and summaries take days, because the information sits in many places.",
          "Automation on a shortcut: if the process is messy, AI repeats the mess faster.",
          "A good idea from one person never reaches the rest of the team.",
        ],
      },
      features: {
        title: "What we automate",
        items: [
          {
            title: "Documents and letters",
            body: "AI drafts documents from your own templates: proposals, contracts, letters, certificates. A person checks and approves them.",
          },
          {
            title: "Retyping data",
            body: "Data from emails, PDFs and spreadsheets goes where it belongs, without copying by hand. Unusual cases are set aside for a person to check.",
          },
          {
            title: "Client enquiries",
            body: "An agent answers repetitive questions by text, voice or phone, saves what it learns and hands the case to a person when needed.",
          },
          {
            title: "Finding new clients",
            body: "An agent searches for companies that match your offer and suggests them to your sales team, with a reason for each one.",
          },
          {
            title: "Reports and summaries",
            body: "Summaries that are now put together by hand from several sources are built automatically, on current data.",
          },
          {
            title: "Campaigns and marketing",
            body: "Agents prepare and update campaigns and the landing pages behind them, and everything connects to the CRM.",
          },
        ],
      },
      steps: {
        title: "How we work",
        items: [
          {
            title: "We map",
            body: "In a workshop with the people who do the work, we walk through the process and pick the places where automation makes sense. You get a plan of stages with the price of the first one.",
          },
          {
            title: "We put the data in order",
            body: "We align the sources, remove duplicates and agree where the system takes its information from. Otherwise AI automates the mess.",
          },
          {
            title: "We implement",
            body: "Stage by stage, on your data. You see progress regularly and decide on the next step.",
          },
          {
            title: "We maintain and extend",
            body: "Once the first process runs, we look after it and add the next ones.",
          },
        ],
      },
      sections: [
        {
          title: "What you get and what you own",
          body: "Automations running on your servers or in your cloud, connected to the tools you already use: email, CRM, accounting, document storage. A panel where your team sees what each agent did and approves the important actions. The code and the data stay with you, with no per-user fees. The code is open and documented, so another team could continue without us.",
        },
        {
          title: "Your data and the AI models",
          body: "Before we start, we agree which data goes to AI models, where it is processed and who has access. We work with Claude, ChatGPT and Gemini, and with open models, including the Polish Bielik, that can run entirely on your servers. Accounts, the repository and keys are set up in your company's name.",
        },
        {
          title: "Who this is for",
          body: "Companies with 50 to 300 people where the same work is repeated every day: documents, data entry, enquiries, reports. You don't need a ready specification. It is enough to know which process takes up the most time.",
        },
        {
          title: "When we are not a good fit",
          body: "If a process changes every week or nobody in the company owns it, AI will not fix that. We will tell you so on the first call and suggest starting with putting the process in order. If you are looking for a chatbot just to have one, we are not the right team.",
        },
      ],
      proof: {
        title: "Examples from our work",
        items: [
          {
            kind: "Platform for law firms",
            title: "LegalFlow",
            body: "Case documents from the firm's templates, communication with creditors, deadline tracking and an assistant that talks to the firm's clients.",
            metric: { value: "up to 70%", label: "less administrative work" },
            link: { label: "More about LegalFlow", href: "/work/legalflow" },
          },
          {
            kind: "Construction group",
            title: "Certificates for site workers",
            body: "Monthly certificates for people working on sites abroad. The automation runs in the spreadsheets the team already used, and unusual cases go to a log for a person to check.",
            metric: { value: "99.8%", label: "match with manual work" },
          },
          {
            kind: "Engineering contractor",
            title: "AI agent that finds new clients",
            body: "The agent searches the web and suggests companies that may be interested in the client's offer, with a simple panel for the sales team.",
            metric: { value: "Relevant leads", label: "and a more effective sales team, in the client's words" },
          },
          {
            kind: "Strategy and creative agency",
            title: "Client memory for an agency",
            body: "Everything the agency knows about a client in one card. The Planner drafts next month's plan with the memory of past campaigns, and the Checker reviews every piece before it goes out.",
            metric: { value: "Full history", label: "of the client relationship behind every campaign" },
          },
        ],
      },
      faq: {
        title: "Questions we hear most often",
        items: [
          {
            q: "Where do we start?",
            a: "With one process that takes the most time or breaks most often. We choose it together on the first call, and after the workshop you get a plan of stages with the price of the first one.",
          },
          {
            q: "Do we have to change the systems we use?",
            a: "No. We connect automations to the tools you already have: email, CRM, accounting, spreadsheets. In the construction project the automation works inside the spreadsheets the team used before.",
          },
          {
            q: "Who controls what the AI does?",
            a: "Your team. For important actions the agent prepares the work and a person approves it. The panel shows what the agent did and on which data.",
          },
          {
            q: "How much does it cost?",
            a: "It depends on the process and the scope. After the workshop you get a plan of stages and know the price of the first one before we start. There are no per-user fees.",
          },
          {
            q: "What if we stop working together?",
            a: "The code and the data are yours. The code is documented, so another team can keep developing it.",
          },
        ],
      },
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
      facts: [
        { value: "do 70%", label: "mniej pracy administracyjnej w kancelariach pracujących na LegalFlow" },
        { value: "3 dni → 30 min", label: "comiesięcznej pracy przy zaświadczeniach w grupie budowlanej" },
        { value: "99,8%", label: "zgodności z ręczną pracą księgowej w tym samym projekcie" },
      ],
      problems: {
        title: "Gdzie zwykle jest problem",
        items: [
          "Każdy używa AI po swojemu, na prywatnym koncie. To, czego się nauczy, zostaje w jego oknie czatu.",
          "Nie wiesz, jakie dokumenty i dane klientów trafiają do zewnętrznych narzędzi.",
          "Te same dane ktoś przepisuje ręcznie z maili i arkuszy do kilku systemów.",
          "Oferty, raporty i zestawienia powstają dniami, bo informacje leżą w wielu miejscach.",
          "Automatyzacja na skróty: jeśli proces jest nieuporządkowany, AI szybciej powiela bałagan.",
          "Dobry pomysł jednej osoby nie trafia do reszty zespołu.",
        ],
      },
      features: {
        title: "Co automatyzujemy",
        items: [
          {
            title: "Dokumenty i pisma",
            body: "AI przygotowuje projekty dokumentów na Twoich wzorach: oferty, umowy, pisma, zaświadczenia. Człowiek je sprawdza i zatwierdza.",
          },
          {
            title: "Przepisywanie danych",
            body: "Dane z maili, PDF-ów i arkuszy trafiają tam, gdzie powinny, bez ręcznego kopiowania. Nietypowe przypadki system odkłada do sprawdzenia przez człowieka.",
          },
          {
            title: "Obsługa zapytań",
            body: "Agent odpowiada na powtarzalne pytania tekstem, głosem albo przez telefon, zapisuje to, czego się dowiedział, i przekazuje sprawę człowiekowi, gdy trzeba.",
          },
          {
            title: "Pozyskiwanie klientów",
            body: "Agent wyszukuje firmy, które pasują do Twojej oferty, i podsuwa je handlowcom razem z uzasadnieniem.",
          },
          {
            title: "Raporty i zestawienia",
            body: "Zestawienia, które dziś składa się ręcznie z kilku źródeł, powstają same, na aktualnych danych.",
          },
          {
            title: "Kampanie i marketing",
            body: "Agenci przygotowują i aktualizują kampanie oraz strony pod nie, a wszystko jest połączone z CRM.",
          },
        ],
      },
      steps: {
        title: "Jak pracujemy",
        items: [
          {
            title: "Mapujemy",
            body: "Na warsztacie z osobami, które wykonują daną pracę, przechodzimy przez proces i wybieramy miejsca, w których automatyzacja ma sens. Dostajesz plan etapów z ceną pierwszego.",
          },
          {
            title: "Porządkujemy dane",
            body: "Ujednolicamy źródła, usuwamy duplikaty i ustalamy, skąd system bierze informacje. Inaczej AI automatyzuje bałagan.",
          },
          {
            title: "Wdrażamy",
            body: "Etap po etapie, na Twoich danych. Regularnie widzisz postęp i decydujesz o kolejnym kroku.",
          },
          {
            title: "Rozwijamy",
            body: "Gdy pierwszy proces działa, utrzymujemy go i dokładamy kolejne.",
          },
        ],
      },
      sections: [
        {
          title: "Co dostajesz i co należy do Ciebie",
          body: "Automatyzacje działające na Twoich serwerach lub w Twojej chmurze, połączone z narzędziami, których już używasz: pocztą, CRM, systemem księgowym, dyskiem z dokumentami. Panel, w którym Twój zespół widzi, co zrobił agent, i zatwierdza ważniejsze działania. Kod i dane zostają u Ciebie, bez opłat za użytkownika. Kod jest otwarty i opisany, więc inny zespół może go rozwijać bez nas.",
        },
        {
          title: "Twoje dane i modele AI",
          body: "Przed startem ustalamy, które dane trafiają do modeli AI, gdzie są przetwarzane i kto ma do nich dostęp. Pracujemy na Claude, ChatGPT i Gemini, a także na modelach otwartych, w tym na polskim Bieliku, które mogą działać w całości na Twoich serwerach. Konta, repozytorium i klucze zakładamy na Twoją firmę.",
        },
        {
          title: "Dla kogo to jest",
          body: "Dla firm zatrudniających od 50 do 300 osób, w których ta sama praca powtarza się każdego dnia: dokumenty, przepisywanie danych, zapytania, raporty. Nie potrzebujesz gotowej specyfikacji. Wystarczy, że wiesz, który proces zabiera najwięcej czasu.",
        },
        {
          title: "Kiedy nie jesteśmy dobrym wyborem",
          body: "Jeśli proces zmienia się co tydzień albo nikt w firmie za niego nie odpowiada, AI tego nie naprawi. Powiemy to wprost na pierwszej rozmowie i zaproponujemy, żeby zacząć od uporządkowania procesu. Jeśli szukasz chatbota tylko po to, żeby go mieć, nie jesteśmy właściwym zespołem.",
        },
      ],
      proof: {
        title: "Przykłady z naszej pracy",
        items: [
          {
            kind: "Platforma dla kancelarii",
            title: "LegalFlow",
            body: "Dokumenty spraw z szablonów kancelarii, komunikacja z wierzycielami, pilnowanie terminów i asystent, który rozmawia z klientami kancelarii.",
            metric: { value: "do 70%", label: "mniej pracy administracyjnej" },
            link: { label: "Więcej o LegalFlow", href: "/work/legalflow" },
          },
          {
            kind: "Grupa budowlana",
            title: "Zaświadczenia dla pracowników fizycznych",
            body: "Comiesięczne zaświadczenia dla osób pracujących na budowach za granicą. Automatyzacja działa w arkuszach, na których zespół już pracował, a nietypowe przypadki trafiają do dziennika do sprawdzenia.",
            metric: { value: "99,8%", label: "zgodności z ręczną pracą" },
          },
          {
            kind: "Firma wykonawstwa inżynieryjnego",
            title: "Agent AI do pozyskiwania klientów",
            body: "Agent przeszukuje sieć i podsuwa handlowcom firmy, które mogą być zainteresowane ofertą klienta. Do tego prosty panel dla działu sprzedaży.",
            metric: { value: "Trafne leady", label: "i wyższa efektywność działu handlowego, według klienta" },
          },
          {
            kind: "Agencja strategiczno-kreatywna",
            title: "Pamięć klienta dla agencji",
            body: "Wszystko, co agencja wie o kliencie, w jednej karcie. Planer układa plan na kolejny miesiąc z pamięcią poprzednich kampanii, a Weryfikator sprawdza każdy materiał przed wysyłką.",
            metric: { value: "Cała historia", label: "współpracy z klientem przy każdej kampanii" },
          },
        ],
      },
      faq: {
        title: "Najczęstsze pytania",
        items: [
          {
            q: "Od czego zacząć?",
            a: "Od jednego procesu, który zabiera najwięcej czasu albo najczęściej się sypie. Wybieramy go razem na pierwszej rozmowie, a po warsztacie dostajesz plan etapów z ceną pierwszego.",
          },
          {
            q: "Czy musimy zmieniać systemy, na których pracujemy?",
            a: "Nie. Automatyzacje łączymy z narzędziami, które już masz: pocztą, CRM, systemem księgowym, arkuszami. W projekcie dla grupy budowlanej automatyzacja działa w arkuszach, na których zespół pracował wcześniej.",
          },
          {
            q: "Kto kontroluje to, co robi AI?",
            a: "Twój zespół. Przy ważniejszych działaniach agent przygotowuje pracę, a człowiek ją zatwierdza. W panelu widać, co agent zrobił i na jakich danych.",
          },
          {
            q: "Ile to kosztuje?",
            a: "To zależy od procesu i zakresu. Po warsztacie dostajesz plan etapów i znasz cenę pierwszego, zanim zaczniemy. Nie ma opłat za użytkownika.",
          },
          {
            q: "Co, jeśli przestaniemy współpracować?",
            a: "Kod i dane należą do Ciebie. Kod jest opisany, więc inny zespół może go dalej rozwijać.",
          },
        ],
      },
      cta: {
        microCopy: "Cenę każdego etapu znasz, zanim go zaczniemy.",
        label: "Umów rozmowę o automatyzacji",
        href: "/book?z=ai-automation-sekcja",
      },
    },
  },
};
