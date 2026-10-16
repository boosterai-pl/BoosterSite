// Team members shown in the home page Team section.
// Order of this list = display order (numbered 01, 02, ...). Photos live in public/assets/team/.
import type { TeamMemberEntry } from "./types";

export const team: readonly TeamMemberEntry[] = [
  {
    name: "Szymon Bazan",
    photo: "/assets/team/szymon-bazan.jpg",
    role: { en: "Founder, CEO", pl: "Założyciel, CEO" },
  },
  {
    name: "Andrzej Chmielewski",
    photo: "/assets/team/andrzej.jpg",
    role: { en: "Co-founder, CTO", pl: "Współzałożyciel, CTO" },
  },
  {
    name: "Grzegorz Jaworek",
    photo: "/assets/team/grzegorz-jaworek.jpg",
    role: { en: "Head of Delivery", pl: "Head of Delivery" },
  },
  {
    name: "Wojciech Kozak",
    photo: "/assets/team/wojtek.jpg",
    role: { en: "Founding Full-Stack Engineer", pl: "Główny Inżynier Full-Stack" },
  },
  {
    name: "Wiktor Weremczuk",
    photo: "/assets/team/wiktor.jpg",
    role: { en: "Head of DACH", pl: "SZEF REGIONU DACH" },
  },
];
