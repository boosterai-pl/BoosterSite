// Team members shown on the home page and on /book (the first three).
// Order of this list = display order. Photos live in public/assets/team/.
// `bio` is one plain sentence about what the person does, in both languages.
import type { TeamMemberEntry } from "./types";

export const team: readonly TeamMemberEntry[] = [
  {
    name: "Szymon Bazan",
    photo: "/assets/team/szymon-bazan.jpg",
    role: { en: "Founder, CEO", pl: "Założyciel, CEO" },
    bio: {
      en: "Leads the first conversations with clients and makes sure the plan solves the company's real problem.",
      pl: "Prowadzi pierwsze rozmowy z klientami i pilnuje, żeby plan rozwiązywał prawdziwy problem firmy.",
    },
  },
  {
    name: "Andrzej Chmielewski",
    photo: "/assets/team/andrzej.jpg",
    role: { en: "Co-founder, CTO", pl: "Współzałożyciel, CTO" },
    bio: {
      en: "Designs the systems and makes sure they work on the client's real data, not just in a demo.",
      pl: "Projektuje systemy i pilnuje, żeby działały na prawdziwych danych klienta, a nie tylko na prezentacji.",
    },
  },
  {
    name: "Grzegorz Jaworek",
    photo: "/assets/team/grzegorz-jaworek.jpg",
    role: { en: "Head of Delivery", pl: "Kierownik wdrożeń" },
    bio: {
      en: "Runs implementations stage by stage and keeps scope and budget in check.",
      pl: "Prowadzi wdrożenia etap po etapie i pilnuje zakresu oraz budżetu.",
    },
  },
  {
    name: "Wojciech Kozak",
    photo: "/assets/team/wojtek.jpg",
    role: { en: "Founding Full-Stack Engineer", pl: "Inżynier full-stack" },
    bio: {
      en: "Builds the systems end to end, from the database to the screens the client's team works on.",
      pl: "Buduje systemy od bazy danych po ekrany, na których pracuje zespół klienta.",
    },
  },
  {
    name: "Wiktor Weremczuk",
    photo: "/assets/team/wiktor.jpg",
    role: { en: "Head of DACH", pl: "Rozwój w regionie DACH" },
    bio: {
      en: "Works with companies in Germany, Austria and Switzerland.",
      pl: "Odpowiada za współpracę z firmami z Niemiec, Austrii i Szwajcarii.",
    },
  },
];
