// Home page copy, nav, footer and booking section (English).
// Every change here needs the matching change in ./pl.ts.
import type { HomeCopy } from "../types";

export const homeEn: HomeCopy = {
  meta: {
    brand: "Booster",
    tagline: "AI-Native Service Agency",
    contactEmail: "hello@boosterai.pl",
    establishedLine: "EST. 2025 / WARSAW → WORLDWIDE",
    version: "Booster / AI Native Service Agency / v1.0",
  },
  nav: [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "Careers", href: "/careers" },
  ],
  navCta: { label: "Book a free AI consultation", href: "https://cal.com/szymon-bazan-iahn2z" },
  hero: {
    eyebrow: "AI-Native Service Agency",
    establishedLabel: "",
    headline: { text: "Grow your\nrevenue.\nNot your", accent: "payroll." },
    lead: "We build custom AI infrastructure for complex B2B operations, replacing manual workarounds with production systems we ship in weeks, not quarters.",
    primaryCta: { label: "Book a free consultation", href: "https://cal.com/szymon-bazan-iahn2z" },
    secondaryCta: { label: "See what we do", href: "#services" },
    meta: [
      {
        label: "Partners",
        value: "Monday · ClickUp · Pipedrive",
        logos: [
          { name: "Monday", component: "MondayLogo" },
          { name: "ClickUp", component: "ClickUpLogo" },
          { name: "Pipedrive", component: "PipedriveLogo" },
        ],
      },
      {
        label: "Built with",
        value: "Claude · n8n · OpenCode · Codex · Bielik · Railway · Cloudflare · PlanetScale",
        logos: [
          { name: "Claude", component: "ClaudeLogo" },
          { name: "n8n", component: "N8nLogo" },
          { name: "OpenCode", component: "OpenCodeLogo" },
          { name: "Codex", component: "CodexLogo" },
          { name: "Bielik", component: "BielikLogo" },
          { name: "Railway", component: "RailwayLogo" },
          { name: "Cloudflare", component: "CloudflareLogo" },
          { name: "PlanetScale", component: "PlanetScaleLogo" },
        ],
      },
      { label: "Currently shipping", value: "Media Sales Platform · LegalFlow · Lead Booster" },
    ],
  },
  marquee: [
    { label: "CRM Implementation" },
    { label: "Open-Source ERP" },
    { label: "B2B Software" },
    { label: "AI Automation" },
    { label: "Custom Platforms" },
    { label: "AI Agents" },
    { label: "Zero License Fees" },
    { label: "No Lock-In" },
  ],
  manifesto: {
    eyebrow: "01 / Manifesto",
    headline: {
      text: "What once took six months of meetings, RFPs and statements of work, we now ship in weeks.",
    },
    entries: [
      {
        id: "001",
        title: "Speed is a feature.",
        body: "We build custom sales platforms, inventory managers, and automated offer generation that cut proposal times from a week to minutes. Our legal engine turns hour-long client interviews into structured legal drafts, saving hundreds of billable hours per case. We replace slow software roadmaps and dead mockups with live, production-ready software you can test within weeks.",
      },
      {
        id: "002",
        title: "AI in the loop, not in the headline.",
        body: "We use Claude, ChatGPT, DeepSeek, Bielik, and open-source LLMs to deliver the optimal solution for each problem. Not as a marketing sticker to ride the trend. We build internal AI-supported infrastructure where your data is clean, structured, and easily accessible to a variety of AI agents.",
      },
      {
        id: "003",
        title: "One stack. Three ways to build it.",
        body: "Every team gets a stack deployed in weeks. We build custom software, implement our partners’ platforms, or customize open-source solutions like Open Mercato, whatever fits your operation best. For smaller businesses, that can mean targeted automations rather than a full build.",
      },
      {
        id: "004",
        title: "A partner, not a lock-in.",
        body: "We act as business consultants first, engineers second. We map your workflows, structure your data, and build a system your team actually enjoys using. Most clients stay with us to automate more, because it keeps paying off. You are never trapped: your data and infrastructure are yours, with no proprietary platform holding you hostage.",
      },
    ],
  },
  services: {
    eyebrow: "02 / Services",
    headline: { text: "Four practices.\nOne", accent: "delivery rhythm." },
  },
  cases: {
    eyebrow: "03 / Selected work",
    headline: { text: "Built in weeks.\nEarning", accent: "their keep." },
  },
  speed: {
    eyebrow: "04 / Why us",
    headline: {
      line1: "The work others quote at",
      strikeText: "12 months",
      accentText: "we ship",
      line3: "in weeks.",
    },
    stats: [
      {
        value: "10",
        suffix: "x",
        label: "Faster to production than a traditional software roadmap.",
      },
      {
        value: "0",
        suffix: "%",
        label: "License fees and vendor lock-in. Open-source stacks keep your architecture independent.",
      },
      {
        value: "4",
        suffix: "x",
        label: "Certified platform partnerships with Monday, ClickUp, and Pipedrive, upgraded with autonomous AI agent layers.",
      },
      {
        value: "-70",
        suffix: "%",
        label: "Less repetitive manual work: generating offers, sales outreach, document creation, CRM/ERP system updates, and reports.",
      },
    ],
  },
  process: {
    eyebrow: "05 / How we work",
    headline: { text: "Four stages.", accent: "No corporate drag." },
    steps: [
      {
        id: "01",
        title: "Map",
        description: "A strategic workshop. We dig into your operations, find the most expensive manual bottlenecks, and design a clear AI automation roadmap.",
      },
      {
        id: "02",
        title: "Cleanse",
        description: "Data structuring. Before a line of code, we gather your scattered records and clear out duplication, building the clean foundation the AI needs to work.",
      },
      {
        id: "03",
        title: "Deploy",
        description: "Production-first execution. No dead mockups, no theoretical specs. We ship working software into a secure environment fast, so your team tests real scenarios within weeks.",
      },
      {
        id: "04",
        title: "Grow",
        description: "Live and supported. Your data and infrastructure stay yours, no lock-in, no license fees. We do not disappear at launch: most clients keep us on to automate the next bottleneck, and the next. The system grows as you do.",
      },
    ],
  },
  partners: {
    eyebrow: "06 / Ecosystem",
    items: [
      { name: "Monday", role: "CRM Partner" },
      { name: "ClickUp", role: "CRM Partner" },
      { name: "Pipedrive", role: "CRM Partner" },
      { name: "Open Mercato", role: "Implementation" },
    ],
  },
  team: {
    eyebrow: "07 / Team",
    headline: { text: "A five-person team\nwith the velocity of", accent: "fifty." },
  },
  insights: {
    eyebrow: "08 / Insights",
    headline: { text: "Field notes\nfrom", accent: "the build." },
    posts: [
      {
        id: "01",
        category: "Strategy",
        date: "May 2026",
        title: "AI-Native Service Companies: what Y Combinator just blessed",
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
        title: "Open-source ERP for European mid-market: Open Mercato in practice",
      },
    ],
  },
  cta: {
    eyebrow: "Let's start",
    headline: { text: "Tell us where\nyour roadmap\nsays", accent: "“next year.”" },
    body: "Book a 30-minute consultation. We come back with a roadmap, a fixed price, and a working demo within weeks.",
    button: { label: "Book free consultation", href: "https://cal.com/szymon-bazan-iahn2z" },
  },
  footer: {
    intro: "AI-native service agency. Wrocław → worldwide.",
    columns: [
      {
        heading: "Services",
        links: [
          { label: "CRM Implementation", href: "/practices/crm-implementation" },
          { label: "Open-source ERP", href: "/practices/open-source-erp" },
          { label: "B2B Software", href: "/practices/b2b-software" },
          { label: "AI Automation", href: "/practices/ai-automation" },
        ],
      },
      {
        heading: "Company",
        links: [
          { label: "About", href: "/#about" },
          { label: "Team", href: "/#team" },
          { label: "Case studies", href: "/#work" },
          { label: "Careers", href: "/careers" },
        ],
      },
      {
        heading: "Contact",
        links: [
          { label: "hello@boosterai.pl", href: "mailto:hello@boosterai.pl" },
          { label: "LinkedIn", href: "https://www.linkedin.com/company/boosterai-en" },
        ],
      },
    ],
    bottom: [
      "© 2026 Booster AI sp. z o.o.",
      "Wrocław, Poland",
      "Booster / AI Native Service Agency / v1.0",
    ],
  },
  booking: {
    calUrl: "https://cal.com/szymon-bazan-iahn2z",
    eyebrow: "Let's talk",
    headline: { text: "Free", accent: "consultation." },
    body: "30 minutes. We come back with a six-week plan, a fixed price and a first demo in two weeks.",
  },
};
