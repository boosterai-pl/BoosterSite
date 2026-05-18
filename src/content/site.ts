import type { SiteContent } from "./types";

export const site: SiteContent = {
  meta: {
    brand: "Booster",
    tagline: "AI-Native Service Agency",
    contactEmail: "hello@boosterai.pl",
    establishedLine: "EST. 2025 / WARSAW → WORLDWIDE",
    version: "Booster / AI Native Service Agency / v1.0",
  },
  nav: [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "About", href: "#about" },
    { label: "Insights", href: "#insights" },
  ],
  navCta: { label: "Book a call", href: "/book" },
  hero: {
    eyebrow: "AI Native — Service Agency",
    establishedLabel: "EST. 2025 / WARSAW → WORLDWIDE",
    headlineLines: [
      { text: "We build what" },
      { text: "others quote" },
      { text: "for", accent: "a year." },
    ],
    lead:
      "Booster is an AI-native service agency. We implement CRMs, ship custom B2B software, and deploy open-source ERP — end-to-end, in weeks, not quarters.",
    primaryCta: { label: "Book a free consultation", href: "/book" },
    secondaryCta: { label: "See what we do", href: "#services" },
    meta: [
      {
        label: "Partners",
        value: "Monday · ClickUp · Pipedrive · Tilio · Open Mercato",
        logos: [
          { name: "Monday", component: "MondayLogo" },
          { name: "ClickUp", component: "ClickUpLogo" },
          { name: "Pipedrive", component: "PipedriveLogo" },
          { name: "Tilio", component: "TilioLogo" },
          { name: "Open Mercato", component: "OpenMercatoLogo" },
        ],
      },
      {
        label: "Built with",
        value: "Claude · n8n · Python · Open Mercato",
        logos: [
          { name: "Claude", component: "ClaudeLogo" },
          { name: "n8n", component: "N8nLogo" },
          { name: "Python", component: "PythonLogo" },
          { name: "Open Mercato", component: "OpenMercatoLogo" },
        ],
      },
      { label: "Currently shipping", value: "OHA Manager · Legal Flow · Municipal App" },
    ],
  },
  marquee: [
    { label: "AI Native Service Agency" },
    { label: "Built in weeks" },
    { label: "CRM Implementation" },
    { label: "Open Source ERP" },
    { label: "B2B Software" },
    { label: "Automation" },
    { label: "Zero License Fees" },
    { label: "No Lock-In" },
    { label: "100% Customizable" },
  ],
  manifesto: {
    eyebrow: "01 / Manifesto",
    headline: {
      text: "What used to take a year of meetings, RFPs and statements of work, we ship in",
      accent: "six weeks.",
    },
    entries: [
      {
        id: "001",
        title: "Speed is a feature.",
        body: "OHA Manager — production in 6 weeks. Legal Flow for restructuring — shipping now. We replace 12-month roadmaps with weekly demos.",
      },
      {
        id: "002",
        title: "AI in the loop, not in the headline.",
        body: "We use Claude, n8n and Python where they earn their place — not as a sticker. Every automation we deploy is paid back inside one quarter.",
      },
      {
        id: "003",
        title: "Boxed for SMB. Open-source for Enterprise.",
        body: "Smaller teams get pre-shaped CRM stacks. Enterprises get Open Mercato — your code, your infrastructure, zero licenses, zero lock-in.",
      },
      {
        id: "004",
        title: "End-to-end ownership.",
        body: "From discovery, through architecture, to a CMS the marketing team can run alone. We hand you the keys, not a dependency.",
      },
    ],
  },
  services: {
    eyebrow: "02 / Services",
    headline: { text: "Four practices.\nOne", accent: "delivery rhythm." },
    items: [
      {
        id: "01",
        title: "CRM Implementation & Automation",
        description:
          "Boxed CRM stacks tuned to your sales motion. We configure, integrate and automate Monday, ClickUp, Pipedrive and Tilio — partner-grade.",
        tags: ["Monday", "ClickUp", "Pipedrive", "Tilio"],
      },
      {
        id: "02",
        title: "Open-source ERP & CRM",
        description:
          "Enterprise without the license tax. We deploy Open Mercato on your infrastructure — fully customizable, owned by you, extended by us.",
        tags: ["Open Mercato", "ERP", "No lock-in", "Self-hosted"],
      },
      {
        id: "03",
        title: "End-to-end B2B Software",
        description:
          "Custom products built ground-up. OHA Manager, Legal Flow for restructuring, municipal applications — full stack, your IP.",
        tags: ["React", "Node", "Python", "Cloud"],
      },
      {
        id: "04",
        title: "AI Automation Studio",
        description:
          "Process automations powered by Claude, n8n and Python. From document workflows to internal copilots — measurable ROI in the first quarter.",
        tags: ["Claude", "n8n", "Python", "RAG"],
      },
    ],
  },
  cases: {
    eyebrow: "03 / Selected work",
    headline: { text: "Built in weeks.\nEarning", accent: "their keep." },
    items: [
      {
        id: "01",
        title: "OHA Manager",
        description:
          "A workplace health & safety platform other teams quoted at 12 months. Shipped in six weeks.",
        tags: ["B2B SaaS", "6 WEEKS", "IN PRODUCTION"],
      },
      {
        id: "02",
        title: "Legal Flow — Restructuring",
        description:
          "Document workflow and case automation for a law firm operating in restructuring proceedings.",
        tags: ["Legal Tech", "Automation", "IN PROGRESS"],
      },
      {
        id: "03",
        title: "Municipal Application",
        description:
          "A B2G product line for Polish gminy — citizen-facing services, internal workflow, AI assistance.",
        tags: ["GovTech", "Multi-tenant", "PROTOTYPE"],
      },
      {
        id: "04",
        title: "Kancelaria Jabłońska — Office Ops",
        description:
          "Internal automations chaining n8n, Claude and Python to remove repetitive paperwork.",
        tags: ["Automation", "n8n + Claude", "LIVE"],
      },
    ],
  },
  speed: {
    eyebrow: "04 / Why us",
    headlineLines: [
      { text: "The work others quote at" },
      { text: "12 months we ship" },
      { text: "in six weeks." },
    ],
    stats: [
      { value: "6", suffix: "wks", label: "Avg. delivery / B2B product" },
      { value: "0", suffix: "%", label: "License fees on open-source stack" },
      { value: "4", suffix: "x", label: "CRM partnerships, all in production" },
      { value: "100", suffix: "%", label: "Code ownership stays with the client" },
    ],
  },
  process: {
    eyebrow: "05 / How we work",
    headline: { text: "One operator.\nFour stages.", accent: "No committee." },
    steps: [
      {
        id: "01",
        title: "Discover",
        description:
          "A working call. We map the problem, the existing stack and what success looks like at six weeks.",
      },
      {
        id: "02",
        title: "Mockup",
        description:
          "We sketch the product end-to-end before a single line of CMS work — fast, cheap, opinionated.",
      },
      {
        id: "03",
        title: "Build",
        description:
          "Daily check-ins. Weekly demos. Claude Code accelerates the boilerplate; humans own architecture.",
      },
      {
        id: "04",
        title: "Hand over",
        description:
          "CMS-driven content, SEO baked in, marketing pixels wired. You run the site; we stay on retainer.",
      },
    ],
  },
  partners: {
    eyebrow: "06 / Ecosystem",
    items: [
      { name: "Monday", role: "CRM Partner" },
      { name: "ClickUp", role: "CRM Partner" },
      { name: "Pipedrive", role: "CRM Partner" },
      { name: "Tilio", role: "CRM Partner" },
      { name: "Open Mercato", role: "Implementation" },
    ],
  },
  team: {
    eyebrow: "07 / Team",
    headline: {
      text: "A four-person team\nwith the velocity of",
      accent: "forty.",
    },
    members: [
      { id: "01", name: "Szymon Bazan", role: "Founder · Sales" },
      { id: "02", name: "Szymon Sidor", role: "Engineering · Web" },
      { id: "03", name: "Wojtek", role: "Engineering · Products" },
      { id: "04", name: "Andrzej", role: "Brand · Operations" },
    ],
  },
  insights: {
    eyebrow: "08 / Insights",
    headline: { text: "Field notes\nfrom", accent: "the build." },
    posts: [
      {
        id: "01",
        category: "Strategy",
        date: "May 2026",
        title: "AI-Native Service Companies — what Y Combinator just blessed",
      },
      {
        id: "02",
        category: "Method",
        date: "Apr 2026",
        title: "Six weeks vs twelve months: how to scope AI-native delivery",
      },
      {
        id: "03",
        category: "Engineering",
        date: "Apr 2026",
        title: "Open-source ERP for European mid-market — Open Mercato in practice",
      },
    ],
  },
  cta: {
    eyebrow: "Let's start",
    headlineLines: [
      { text: "Tell us where" },
      { text: "your roadmap" },
      { text: "says", accent: "“next year.”" },
    ],
    body: "Book a 30-minute consultation. We come back with a six-week plan, a fixed price and a first demo in two weeks.",
    button: { label: "Book free consultation", href: "/book" },
  },
  booking: {
    calUrl: "https://cal.com/szymon-sidor-bruix3",
    eyebrow: "Umów rozmowę",
    headline: { text: "Bezpłatna", accent: "konsultacja." },
    body: "30 minut. Wrócimy z sześciotygodniowym planem, stałą ceną i pierwszym demo w dwa tygodnie.",
  },
  footer: {
    intro: "AI-native service agency. Warsaw → worldwide.",
    columns: [
      {
        heading: "Services",
        links: [
          { label: "CRM Implementation", href: "#services" },
          { label: "Open-source ERP", href: "#services" },
          { label: "B2B Software", href: "#services" },
          { label: "AI Automation", href: "#services" },
        ],
      },
      {
        heading: "Company",
        links: [
          { label: "About", href: "#about" },
          { label: "Team", href: "#team" },
          { label: "Case studies", href: "#work" },
          { label: "Blog", href: "/blog" },
          { label: "Insights", href: "#insights" },
        ],
      },
      {
        heading: "Contact",
        links: [
          { label: "hello@boosterai.pl", href: "mailto:hello@boosterai.pl" },
          { label: "LinkedIn", href: "#" },
          { label: "GitHub", href: "#" },
          { label: "X / Twitter", href: "#" },
        ],
      },
    ],
    bottom: [
      "© 2026 Booster AI sp. z o.o.",
      "Warsaw — Poland",
      "Booster / AI Native Service Agency / v1.0",
    ],
  },
};
