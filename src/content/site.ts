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
  navCta: { label: "Book a free AI consultation", href: "https://cal.com/szymon-bazan-iahn2z" },
  hero: {
    eyebrow: "AI-Native Service Agency",
    establishedLabel: "",
    headlineLines: [
      { text: "Grow your" },
      { text: "revenue." },
      { text: "Not your", accent: "payroll." },
    ],
    lead:
      "We build custom AI infrastructure for complex B2B operations — replacing manual workarounds with production systems we ship in weeks, not quarters.",
    primaryCta: { label: "Book a free consultation", href: "https://cal.com/szymon-bazan-iahn2z" },
    secondaryCta: { label: "See what we do", href: "#services" },
    meta: [
      {
        label: "Partners",
        value: "Monday · ClickUp · Pipedrive · Tillio",
        logos: [
          { name: "Monday", component: "MondayLogo" },
          { name: "ClickUp", component: "ClickUpLogo" },
          { name: "Pipedrive", component: "PipedriveLogo" },
          { name: "Tillio", component: "TilioLogo" },
        ],
      },
      {
        label: "Built with",
        value: "Claude · n8n",
        logos: [
          { name: "Claude", component: "ClaudeLogo" },
          { name: "n8n", component: "N8nLogo" },
        ],
      },
      { label: "Currently shipping", value: "LegalFlow · Lead Booster · Municipal App" },
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
        body: "We use Claude, ChatGPT, DeepSeek, Bielik, and open-source LLMs to deliver the optimal solution for each problem — not as a marketing sticker to ride the trend. We build internal AI-supported infrastructure where your data is clean, structured, and easily accessible to a variety of AI agents.",
      },
      {
        id: "003",
        title: "One stack. Three ways to build it.",
        body: "Every team gets a stack deployed in weeks. We build custom software, implement our partners' platforms, or customize open-source solutions like Open Mercato — whatever fits your operation best. For smaller businesses, that can mean targeted automations rather than a full build.",
      },
      {
        id: "004",
        title: "A partner, not a lock-in.",
        body: "We act as business consultants first, engineers second — mapping your workflows, structuring your data, and building a system your team actually enjoys using. Most clients stay with us to automate more, because it keeps paying off. And you're never trapped: your data and infrastructure are yours, with no proprietary platform holding you hostage.",
      },
    ],
    cta: {
      microCopy: "No contact forms. No endless email chains.",
      label: "Pick a time in our Founder's calendar",
      href: "https://cal.com/szymon-bazan-iahn2z",
    },
  },
  services: {
    eyebrow: "02 / Services",
    headline: { text: "Four practices.\nOne", accent: "delivery rhythm." },
    items: [
      {
        id: "01",
        slug: "ai-automation",
        title: "AI Automation Studio",
        description:
          "The boring, expensive work — gone. We wire Claude, ChatGPT, n8n, and connectors we build ourselves into the bottlenecks that cost you most: document workflows, internal copilots, data plumbing. Real automation that pays for itself, not a chatbot bolted on for show.",
        tags: ["Claude", "n8n", "LLMs", "RAG"],
      },
      {
        id: "02",
        slug: "b2b-software",
        title: "End-to-end B2B Software",
        description:
          "When off-the-shelf won't cut it, we build the thing. LegalFlow, custom municipal platforms, bespoke sales tools — full-stack products shipped to production, not slideware. Engineered to run hard and scale with you.",
        tags: ["React", "Node", "Python", "Cloud"],
      },
      {
        id: "03",
        slug: "crm-implementation",
        title: "CRM Implementation & Automation",
        description:
          "Your CRM, finally tuned to how you actually sell. We configure, integrate, and automate Monday, ClickUp, Pipedrive, and Tillio as certified partners — then layer AI on top so the busywork runs itself.",
        tags: ["Monday", "ClickUp", "Pipedrive", "Tillio"],
      },
      {
        id: "04",
        slug: "open-source-erp",
        title: "Open-source ERP & CRM",
        description:
          "Enterprise-grade systems, none of the license tax. We deploy and customize open-source platforms like Open Mercato on your own infrastructure — self-hosted, no lock-in, and extended by us as you grow.",
        tags: ["Open Mercato", "ERP", "No lock-in", "Self-hosted"],
      },
    ],
  },
  cases: {
    eyebrow: "03 / Selected work",
    headline: { text: "Built in weeks.\nEarning", accent: "their keep." },
    items: [
      {
        id: "01",
        title: "LegalFlow",
        description:
          "Our automation platform for restructuring law firms — built to relieve the team, not replace the lawyer. Generates case documentation from a firm's own templates, automates creditor communication and deadline tracking, and cuts administrative work by up to 70%. More cases, same team.",
        tags: ["Legal Tech", "IN PRODUCTION"],
      },
      {
        id: "02",
        title: "Lead Booster",
        description:
          "Our autonomous outbound engine. Every morning it scans public data sources, enriches each record with verified decision-maker contacts, and generates a complete outreach pack — a context note, a multi-touch email sequence, and a cold-call script — then pushes it straight into your CRM.",
        tags: ["B2B SaaS", "IN PRODUCTION"],
      },
      {
        id: "03",
        title: "Sales Automation Platform",
        description:
          "Automated the bulk of a manual sales workflow for a large operation. Cut proposal creation from days of digging through scattered spreadsheets to under an hour. Shipped to production in eight weeks.",
        tags: ["B2B SaaS", "IN PRODUCTION"],
      },
      {
        id: "04",
        title: "AI Decision Support",
        description:
          "An LLM-powered decision-support assistant for senior management at a large, operations-heavy enterprise. It unifies scattered operational data into a single context, then surfaces analysis and concrete optimization recommendations — so managers decide on live data, not month-old reports. Delivered as a working prototype and validated with the leadership team.",
        tags: ["Enterprise AI", "PROTOTYPE"],
      },
      {
        id: "05",
        title: "Public-Sector Platform",
        description:
          "A platform built on license-free, open-source architecture — no vendor lock-in. Brings citizen services, internal workflows, and AI assistance into one system, shifting deployment timelines from quarters to weeks.",
        tags: ["GovTech", "PROTOTYPE"],
      },
    ],
    cta: {
      microCopy: "Ready to scale your operations?",
      label: "Book a call with our Founder",
      href: "https://cal.com/szymon-bazan-iahn2z",
    },
  },
  speed: {
    eyebrow: "04 / Why us",
    headlineLines: [
      { text: "The work others quote at" },
      { text: "12 months, we ship" },
      { text: "in weeks." },
    ],
    stats: [
      { value: "10", suffix: "×", label: "Faster to production than a traditional software roadmap." },
      { value: "0", suffix: "%", label: "License fees and vendor lock-in. Open-source stacks keep your architecture independent." },
      { value: "4", suffix: "×", label: "Certified platform partnerships — Monday, ClickUp, Pipedrive, Tillio — upgraded with autonomous AI agent layers." },
      { value: "–70", suffix: "%", label: "Less repetitive manual work: generating offers, sales outreach, document creation, CRM/ERP system updates, and reports." },
    ],
  },
  process: {
    eyebrow: "05 / How we work",
    headline: { text: "Four stages.", accent: "No corporate drag." },
    steps: [
      {
        id: "01",
        title: "Map",
        description:
          "A strategic workshop. We dig into your operations, find the most expensive manual bottlenecks, and design a clear AI automation roadmap.",
      },
      {
        id: "02",
        title: "Cleanse",
        description:
          "Data structuring. Before a line of code, we gather your scattered records and clear out duplication — building the clean foundation the AI needs to work.",
      },
      {
        id: "03",
        title: "Deploy",
        description:
          "Production-first execution. No dead mockups, no theoretical specs. We ship working software into a secure environment fast, so your team tests real scenarios within weeks.",
      },
      {
        id: "04",
        title: "Grow",
        description:
          "Live and supported. Your data and infrastructure stay yours — no lock-in, no license fees. We don't disappear at launch: most clients keep us on to automate the next bottleneck, and the next. The system grows as you do.",
      },
    ],
  },
  partners: {
    eyebrow: "06 / Ecosystem",
    items: [
      { name: "Monday", role: "CRM Partner" },
      { name: "ClickUp", role: "CRM Partner" },
      { name: "Pipedrive", role: "CRM Partner" },
      { name: "Tillio", role: "CRM Partner" },
      { name: "Open Mercato", role: "Implementation" },
    ],
  },
  team: {
    eyebrow: "07 / Team",
    headline: {
      text: "A five-person team\nwith the velocity of",
      accent: "fifty.",
    },
    members: [
      { id: "01", name: "Szymon Bazan", role: "Founder · Sales", photo: "/assets/team/szymon-bazan.jpg" },
      { id: "02", name: "Andrzej Chmielewski", role: "Brand · Operations", photo: "/assets/team/andrzej.jpg" },
      { id: "03", name: "Wojciech Kozak", role: "Engineering · Products", photo: "/assets/team/wojtek.jpg" },
      { id: "04", name: "Szymon Sidor", role: "Engineering · Web", photo: "/assets/team/szymon-sidor.jpg" },
      { id: "05", name: "Wiktor Weremczuk", role: "Engineering · Web", photo: "/assets/team/wiktor.jpg" },
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
    body: "Book a 30-minute consultation. We come back with a roadmap, a fixed price, and a working demo within weeks.",
    button: { label: "Book free consultation", href: "https://cal.com/szymon-bazan-iahn2z" },
  },
  practices: [
    {
      slug: "ai-automation",
      eyebrow: "01 / AI Automation Studio",
      headline: { text: "Automation that stops your margins from", accent: "shrinking." },
      lead: "We build custom process automations powered by Claude, n8n, and Python to freeze your operational overhead. From turning messy client data into structured document drafts to building internal sales copilots, we systematically replace manual spreadsheet workarounds. Every deployment is measured against real ROI and engineered to pay for itself inside 90 days.",
      heroCta: {
        label: "Find your 90-day payback slot",
        href: "https://cal.com/szymon-bazan-iahn2z",
      },
      sections: [
        {
          title: "What we do",
          body: "We find the exact manual bottlenecks slowing down your growth and replace them with automated AI workflows. This includes fixing messy databases, automated B2B quoting pipelines, smart document processing, and deep multi-system syncs. We use Claude for reasoning, n8n for workflows, and Python to connect everything securely.",
        },
        {
          title: "How it works",
          body: "We start with a process audit — not a slide deck, but a live working session. We find the problem areas, clean your messy data first, and build directly on your production servers. A working version is ready within weeks, so your team can test it with real data from day one while we track time saved and reduce errors.",
        },
        {
          title: "Proof it works",
          body:           "LegalFlow automates high-stakes document workflows for restructuring proceedings, cutting administrative work by up to 70%. Lead Booster runs every morning to scan public data, enrich contacts, and push a complete outreach pack straight into the CRM — zero manual prospecting.",
        },
        {
          title: "What you get",
          body:           "Full Control: Custom workflows built on your own servers or cloud with zero license fees and no platform lock-in. System Integration: Clean connections with your existing tools — email, CRM, ERP, and data storage. Human Oversight: A simple dashboard built for your team to monitor the system and approve actions. No vendor dependency: You own the code, we train your team, and we track your real ROI from day one.",
        },
      ],
      cta: {
        microCopy: "Zero license fees. 100% your code.",
        label: "Get your custom stack",
        href: "https://cal.com/szymon-bazan-iahn2z",
      },
    },
    {
      slug: "b2b-software",
      eyebrow: "02 / End-to-end B2B Software",
      headline: { text: "Custom software shipped in", accent: "weeks, not months." },
      lead: "We build custom B2B software from scratch — full stack, cloud-native, and production-ready. We replace slow, traditional 12-month roadmaps with live, working code delivered in weeks. No vendor lock-in, no ongoing license fees.",
      heroCta: {
        microCopy: "Bypass the 12-month corporate software drag.",
        label: "Skip the roadmap — Pick a time",
        href: "https://cal.com/szymon-bazan-iahn2z",
      },
      sections: [
        {
          title: "What we do",
          body: "We turn your complex business processes or product ideas into working software. No dry wireframes, no endless proposals — just running code built for real users. Our core stack (React, Node, Python) is accelerated by AI-native tools, allowing our lean engineering team to move at 10x speed with zero corporate drag.",
        },
        {
          title: "How it works",
          body:           "We start by mapping your bottlenecks and defining what success looks like. From there, we skip useless mockups and build directly on your secure infrastructure. No slow committees. You see live, working progress every week and test with real data early on.",
        },
        {
          title: "Proof it works",
          body:           "LegalFlow — Automates high-stakes document workflows for restructuring proceedings, transforming hour-long client interviews into fully structured legal drafts and cutting administrative work by up to 70%. Sales Automation Platform — Cut proposal creation from days of digging through scattered spreadsheets to under an hour, shipped to production in eight weeks. Public-Sector Platform — A license-free, open-source system bringing citizen services, internal workflows, and AI assistance into one platform.",
        },
        {
          title: "What you get",
          body:           "Production-Ready Product: A secure, scalable B2B software built on your cloud or servers. No vendor lock-in: Full source code ownership with absolute freedom from ongoing platform licenses. Admin Control Panel: A clean dashboard built specifically for your internal operations team. Zero-Surprise Delivery: Weekly live demos throughout the build so you always know exactly what is being shipped.",
        },
      ],
      cta: {
        microCopy: "Ready to build software you actually own?",
        label: "Book your scoping call with our Founder",
        href: "https://cal.com/szymon-bazan-iahn2z",
      },
    },
    {
      slug: "crm-implementation",
      eyebrow: "03 / CRM Implementation & Automation",
      headline: { text: "Your sales motion,", accent: "automated." },
      lead: "We implement and automate CRM platforms so your pipeline runs on autopilot and your team spends time selling — not wrestling with broken spreadsheets. As certified partners of Monday, ClickUp, Pipedrive, and Tillio, we deliver high-performance setups tailored exactly to your real business workflows.",
      heroCta: {
        microCopy: "Stop losing deals to manual spreadsheet chaos.",
        label: "Automate your pipeline — Pick a time",
        href: "https://cal.com/szymon-bazan-iahn2z",
      },
      sections: [
        {
          title: "What we do",
          body: "We map your existing sales process and translate it into a CRM engine that drives revenue. We configure clean pipelines, set up automated follow-ups, and build cross-platform integrations alongside live reporting dashboards. No generic templates. Every workspace is shaped around your deal stages, team size, and growth targets.",
        },
        {
          title: "How it works",
          body: "We start with a live working session to map your current workflows and tools. Before anything else, we clean and deduplicate your historical customer data so your new system is free of old trash. Within days, you get a fully configured workspace loaded with real data. From there, we layer in native automations — lead routing, email sequences, and invoice triggers — while keeping you in control with weekly live demos.",
        },
        {
          title: "Who it's for",
          body: "Sales teams of 3–50 people who have outgrown basic spreadsheets but want to avoid expensive, multi-month Salesforce contracts. Founders who need a reliable CRM infrastructure that works perfectly from day one. Revenue leaders who demand accurate reporting they can actually trust without hiring a dedicated operations team.",
        },
        {
          title: "What you get",
          body: "Fully Configured CRM: A customized workspace built specifically for your team's daily sales motion. Autonomous Workflows: Automated lead routing, instant follow-ups, and internal team notifications. Deep Tool Integration: Seamless connections with your email, calendar, invoicing, and communications stack. Clean Data & Onboarding: All legacy data safely migrated, full documentation provided, and your team completely trained.",
        },
      ],
      cta: {
        microCopy: "Build a CRM stack your sales team will actually enjoy using.",
        label: "Book a scoping call with our Founder",
        href: "https://cal.com/szymon-bazan-iahn2z",
      },
    },
    {
      slug: "open-source-erp",
      eyebrow: "04 / Enterprise software, zero license fees.",
      headline: { text: "Enterprise power.", accent: "Zero user-seat pricing." },
      lead: "We deploy Open Mercato — a flexible, open-source ERP and CRM ecosystem — directly on your own secure infrastructure. You get the full power of enterprise software without the vendor lock-in, expensive per-seat subscriptions, or slow corporate procurement cycles.",
      heroCta: {
        microCopy: "Stop paying six-figure bills for software user licenses.",
        label: "Drop per-seat pricing — Pick a time",
        href: "https://cal.com/szymon-bazan-iahn2z",
      },
      sections: [
        {
          title: "What we do",
          body: "We tailor and scale Open Mercato to fit your exact business operations. This covers CRM, inventory, invoicing, and procurement modules — whatever your team needs. Since the system is open-source, every custom feature belongs entirely to you. No user limits, no hidden fees, no surprise renewals.",
        },
        {
          title: "How it works",
          body: "We start by mapping your data flows and isolating your bottlenecks. Before moving anything, we clean and structure your messy historical data so nothing gets lost. Then, we deploy Open Mercato directly onto your secure servers, customizing workflows — like approval chains or deep integrations — straight into your own codebase.",
        },
        {
          title: "Who it's for",
          body: "Mid-market enterprises tired of paying huge annual bills just for CRM and ERP user seats. Organisations that demand absolute control over their sensitive business data and secure infrastructure. Teams that want to update their software instantly without waiting for slow corporate vendor approvals.",
        },
        {
          title: "What you get",
          body:           "Production-Ready ERP/CRM: A secure Open Mercato ecosystem running live on your cloud or hardware. Clean Data Migration: Your historical business records cleaned, structured, and safely moved from legacy systems. No Vendor Lock-in: Full source code control with zero platform lock-in and no ongoing subscription renewals. Custom Extensions: Tailored workflows and modules built exactly for your team's daily operations.",
        },
      ],
      cta: {
        microCopy: "Take full ownership of your enterprise software.",
        label: "Book a consultation with our Founder",
        href: "https://cal.com/szymon-bazan-iahn2z",
      },
    },
  ],
  booking: {
    calUrl: "https://cal.com/szymon-bazan-iahn2z",
    eyebrow: "Let's talk",
    headline: { text: "Free", accent: "consultation." },
    body: "30 minutes. We come back with a roadmap, a fixed price, and a working demo within weeks.",
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
          { label: "LinkedIn", href: "https://www.linkedin.com/company/boosterai-en" },
        ],
      },
    ],
    bottom: [
      "© 2026 Booster AI sp. z o.o.",
      "Wrocław — Poland",
      "Booster / AI Native Service Agency / v1.0",
    ],
  },
};
