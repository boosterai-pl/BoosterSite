// Service "crm-implementation": the card in the home page Services section and the page at /practices/crm-implementation.
import type { ServiceEntry } from "../types";

export const crmImplementation: ServiceEntry = {
  slug: "crm-implementation",
  en: {
    card: {
      title: "CRM Implementation",
      description: "We set up Monday, ClickUp or Pipedrive around the way your company actually sells, with clean data and automations that take routine work off your team. We are partners of all three.",
      tags: ["Monday", "ClickUp", "Pipedrive"],
    },
    page: {
      eyebrow: "03 / CRM Implementation",
      headline: { text: "A CRM your team", accent: "actually uses." },
      lead: "We implement Monday, ClickUp and Pipedrive, and we are partners of all three. We set the system up around your sales process, move your customer data over in order and automate the routine steps. Your team spends more time with clients and less on updating spreadsheets. You know the price of the first stage before we start.",
      heroCta: {
        microCopy: "After the first call you get a plan of stages and the price of the first one.",
        label: "Book a call",
        href: "/book?z=crm-implementation-hero",
      },
      sections: [
        {
          title: "Sound familiar?",
          body: "You have a CRM, but salespeople still keep deals in Excel and their inboxes. Reports need to be put together by hand, and you are never sure the numbers are current. Customer data sits in several places, often duplicated. A new tool alone won't change that. The process and the data have to make sense first.",
        },
        {
          title: "How we work",
          body: "1. We map. In a workshop we go through how your company really sells, from first contact to invoice. You get a plan of stages with the price of the first one. 2. We put the data in order. We clean and deduplicate your customer records before anything is moved. 3. We implement stage by stage: sales stages, lead assignment, reminders, connections with email, calendar and invoicing, then reports. You see progress regularly. 4. We maintain and extend the setup, and once the data is reliable we can add AI agents that work on it.",
        },
        {
          title: "What you get and what you own",
          body: "A configured CRM loaded with your cleaned data. Automations for the repetitive steps your team does today by hand. Reports based on data you can trust. Documentation and training for your people. The data stays yours, and the setup is described so that you are not dependent on us to run it.",
        },
        {
          title: "Who this is for",
          body: "B2B companies with 50 to 300 people that want order in sales and customer data without a large, long enterprise implementation. If your sales are closely tied to warehouse, documents or your own processes, and a ready-made CRM would need more and more workarounds, a system built on Open Mercato may be a better choice. We will tell you which option makes sense on the first call.",
        },
      ],
      cta: {
        microCopy: "You know the price of each stage before we start it.",
        label: "Book a call about your CRM",
        href: "/book?z=crm-implementation-sekcja",
      },
    },
  },
  pl: {
    card: {
      title: "Wdrożenie CRM",
      description: "Ustawiamy Monday, ClickUp lub Pipedrive pod to, jak naprawdę sprzedaje Twoja firma, z uporządkowanymi danymi i automatyzacjami, które zdejmują z zespołu rutynę. Jesteśmy partnerami wszystkich trzech.",
      tags: ["Monday", "ClickUp", "Pipedrive"],
    },
    page: {
      eyebrow: "03 / Wdrożenie CRM",
      headline: { text: "CRM, z którego Twój zespół", accent: "naprawdę korzysta." },
      lead: "Wdrażamy Monday, ClickUp i Pipedrive, a we wszystkich trzech jesteśmy partnerami. Ustawiamy system pod Twój proces sprzedaży, przenosimy uporządkowane dane klientów i automatyzujemy powtarzalne kroki. Twój zespół spędza więcej czasu z klientami, a mniej na uzupełnianiu arkuszy. Cenę pierwszego etapu znasz, zanim zaczniemy.",
      heroCta: {
        microCopy: "Po pierwszej rozmowie dostajesz plan etapów z ceną pierwszego z nich.",
        label: "Umów rozmowę",
        href: "/book?z=crm-implementation-hero",
      },
      sections: [
        {
          title: "Brzmi znajomo?",
          body: "Macie CRM, ale handlowcy i tak prowadzą sprawy w Excelu i w skrzynkach mailowych. Raporty trzeba składać ręcznie i nigdy nie wiesz, czy liczby są aktualne. Dane klientów leżą w kilku miejscach, często zdublowane. Samo nowe narzędzie tego nie zmieni. Najpierw proces i dane muszą mieć sens.",
        },
        {
          title: "Jak pracujemy",
          body: "1. Mapujemy. Na warsztacie przechodzimy przez to, jak Twoja firma naprawdę sprzedaje, od pierwszego kontaktu do faktury. Dostajesz plan etapów z ceną pierwszego. 2. Porządkujemy dane. Czyścimy bazę klientów i usuwamy duplikaty, zanim cokolwiek przeniesiemy. 3. Wdrażamy etap po etapie: etapy sprzedaży, przydzielanie zapytań, przypomnienia, połączenie z pocztą, kalendarzem i fakturowaniem, a na końcu raporty. Regularnie widzisz postęp. 4. Rozwijamy. Utrzymujemy i rozbudowujemy konfigurację, a gdy dane są wiarygodne, możemy dodać agentów AI, którzy na nich pracują.",
        },
        {
          title: "Co dostajesz i co należy do Ciebie",
          body: "Skonfigurowany CRM z Twoimi uporządkowanymi danymi. Automatyzacje kroków, które zespół robi dziś ręcznie. Raporty oparte na danych, którym można ufać. Dokumentację i szkolenie dla Twoich ludzi. Dane zostają Twoje, a konfiguracja jest opisana tak, żebyś nie był od nas zależny.",
        },
        {
          title: "Dla kogo to jest",
          body: "Dla firm B2B zatrudniających od 50 do 300 osób, które chcą uporządkować sprzedaż i dane klientów bez dużego, długiego wdrożenia korporacyjnego systemu. Jeśli Twoja sprzedaż jest mocno powiązana z magazynem, dokumentami albo własnymi procesami, a gotowy CRM wymagałby coraz więcej obejść, lepszym wyborem może być system na Open Mercato. Na pierwszej rozmowie powiemy, która droga ma sens.",
        },
      ],
      cta: {
        microCopy: "Cenę każdego etapu znasz, zanim go zaczniemy.",
        label: "Umów rozmowę o CRM",
        href: "/book?z=crm-implementation-sekcja",
      },
    },
  },
};
