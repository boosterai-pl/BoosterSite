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
  ],
  navCta: { label: "Book a free AI consultation", href: "https://cal.com/szymon-bazan-iahn2z" },
  hero: {
    eyebrow: "AI Native — Service Agency",
    establishedLabel: "",
    headline: { text: "Grow your\nrevenue.\nNot your", accent: "payroll." },
    lead:
      "We build autonomous AI infrastructure for complex B2B operations. By replacing manual workarounds with custom platforms, we deliver end-to-end solutions in weeks, not quarters.",
    primaryCta: { label: "Book a free consultation", href: "https://cal.com/szymon-bazan-iahn2z" },
    secondaryCta: { label: "See what we do", href: "#services" },
    meta: [
      {
        label: "Partners",
        value: "Monday · ClickUp · Pipedrive · Tilio",
        logos: [
          { name: "Monday", component: "MondayLogo" },
          { name: "ClickUp", component: "ClickUpLogo" },
          { name: "Pipedrive", component: "PipedriveLogo" },
          { name: "Tilio", component: "TilioLogo" },
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
      { label: "Currently shipping", value: "OOH Manager · Legal Flow · Municipal App" },
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
        body: "OOH Advertising Platform — automated 7 out of 9 selling steps, cutting proposal times from a whole week to minutes. Legal Document Engine — saving hundreds of billable hours per case by transforming automated transcripts into legal drafts. We completely replace slow, 12-month software roadmaps and dry mockups with live, production-ready iterations you can test from week one.",
      },
      {
        id: "002",
        title: "AI in the loop, not in the headline.",
        body: "We use Claude, n8n, and Python where they solve painful operational bottlenecks — not as a marketing sticker to ride the trend. Backed by veteran IT engineers, we systematically clean and deduplicate your historical data first, then deploy clean automation that stops your profit margins from shrinking as your company grows.",
      },
      {
        id: "003",
        title: "Boxed for SMB. Open-source for Enterprise.",
        body: "Mid-sized teams get pre-shaped, highly profitable CRM stacks deployed in days. Established mid-market enterprises with complex operations get Open Mercato — a flexible, license-free ERP and CRM ecosystem that ensures 100% control over your own code, infrastructure, and data with zero vendor lock-in.",
      },
      {
        id: "004",
        title: "End-to-end ownership.",
        body: "We act as business consultants first and engineers second. Our process runs from deep-dive workflow mapping workshops, through tailored data architecture, to a system your team actually enjoys using. At the end of the 6 weeks, we hand you the keys and total infrastructure autonomy — not an ongoing, expensive dependency.",
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
          "Process automations powered by Claude, n8n and Python. From document workflows to internal copilots — measurable ROI in the first quarter.",
        tags: ["Claude", "n8n", "Python", "RAG"],
      },
      {
        id: "02",
        slug: "b2b-software",
        title: "End-to-end B2B Software",
        description:
          "Custom products built ground-up. OOH Manager, Legal Flow for restructuring, municipal applications — full stack, your IP.",
        tags: ["React", "Node", "Python", "Cloud"],
      },
      {
        id: "03",
        slug: "crm-implementation",
        title: "CRM Implementation & Automation",
        description:
          "Boxed CRM stacks tuned to your sales motion. We configure, integrate and automate Monday, ClickUp, Pipedrive and Tilio — partner-grade.",
        tags: ["Monday", "ClickUp", "Pipedrive", "Tilio"],
      },
      {
        id: "04",
        slug: "open-source-erp",
        title: "Open-source ERP & CRM",
        description:
          "Enterprise without the license tax. We deploy Open Mercato on your infrastructure — fully customizable, owned by you, extended by us.",
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
        title: "OOH Manager",
        description:
          "Automated 7 out of 9 sales steps for a massive media network managing 40,000+ billboard locations. Smashed client proposal creation times from 7 full days of digging through 5 separate Excels down to just 30 minutes. Shipped to production in six weeks.",
        tags: ["B2B SaaS", "6 WEEKS", "IN PRODUCTION"],
      },
      {
        id: "02",
        title: "Legal Flow — Restructuring",
        description:
          "Saves hundreds of hours and tens of thousands of PLN per case for high-stakes restructuring proceedings (handling corporate debts of 500k+ PLN). Replaced slow manual notes with an AI engine that instantly transforms 1-hour audio client interviews into fully structured legal drafts for final review.",
        tags: ["Legal Tech", "Automation", "IN PROGRESS"],
      },
      {
        id: "03",
        title: "Municipal Application",
        description:
          "A B2G product line for Polish gminy powered by a license-free, open-source architecture to eliminate vendor lock-in. Integrates citizen-facing services, internal workflows, and AI assistance, shifting traditional public sector deployment from quarters to weeks.",
        tags: ["GovTech", "Multi-tenant", "PROTOTYPE"],
      },
      {
        id: "04",
        title: "Kancelaria Jabłońska — Office Ops",
        description:
          "Intelligent automation pipelines chaining n8n, Claude, and Python to clean, deduplicate, and structure thousands of messy business records. Removes repetitive office paperwork and manual system bottlenecks to protect operational margins as the business scales.",
        tags: ["Automation", "n8n + Claude", "LIVE"],
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
    headline: {
      line1: "The work others quote at",
      strikeText: "12 months",
      accentText: "we ship",
      line3: "in six weeks.",
    },
    stats: [
      { value: "6", suffix: "wks", label: "From first workshop to live production deployment, completely replacing slow 12-month software roadmaps." },
      { value: "0", suffix: "%", label: "License fees and vendor lock-in, leveraging flexible open-source enterprise stacks to keep your architecture independent." },
      { value: "4", suffix: "x", label: "Certified platform partnerships (Pipedrive, Monday, ClickUp, Twilio) instantly upgraded with autonomous AI agent layers." },
      { value: "100", suffix: "%", label: "Code ownership and data autonomy, deployed securely on your infrastructure with zero ongoing agency dependency." },
    ],
  },
  process: {
    eyebrow: "05 / How we work",
    headline: { text: "Three engineers.\nFour stages.", accent: "No corporate drag." },
    steps: [
      {
        id: "01",
        title: "Map",
        description:
          "A strategic workshop. We deep-dive into your operational workflows and locate your most expensive manual bottlenecks to design a clear 6-week AI automation roadmap.",
      },
      {
        id: "02",
        title: "Cleanse",
        description:
          "Data structuring. Before writing a single line of code, we gather your scattered historical records and eliminate spreadsheet duplication to build a clean format for the AI architecture.",
      },
      {
        id: "03",
        title: "Deploy",
        description:
          "Production-first execution. We skip dry mockups and messy staging environments. We deploy custom LLM layers directly to your live infrastructure so your team can test real scenarios from week three.",
      },
      {
        id: "04",
        title: "Own",
        description:
          "Total autonomy. We hand you the keys, full code ownership, and total infrastructure independence. You run the system natively with zero vendor lock-in and zero ongoing license fees.",
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
    headline: { text: "Tell us where\nyour roadmap\nsays", accent: "\u201cnext year.\u201d" },
    body: "Book a 30-minute consultation. We come back with a six-week plan, a fixed price and a first demo in two weeks.",
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
          body: "Kancelaria Jabłońska eliminated hours of daily spreadsheet chaos by connecting n8n, Claude, and Python into a single automation layer. Document tracking, removing duplicate records, and case routing now run smoothly in the background, paying for the system within the very first month.",
        },
        {
          title: "What you get",
          body: "Full Control: Custom workflows built on your own servers or cloud with zero license fees and no platform lock-in. System Integration: Clean connections with your existing tools — email, CRM, ERP, and data storage. Human Oversight: A simple dashboard built for your team to monitor the system and approve actions. 100% Code Ownership: You own the code completely, we train your team, and we track your real ROI from day one.",
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
      lead: "We build custom B2B software from scratch — full stack, cloud-native, and production-ready. We completely replace slow, traditional 12-month roadmaps with live, working code delivered in weeks. The intellectual property is 100% yours from day one, with zero vendor lock-in and zero ongoing license fees.",
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
          body: "Week one is process mapping: we isolate your bottlenecks and define what success looks like at week six. From week two, we skip useless mockups and build directly on your secure production infrastructure. No slow committees. You see live, working progress every seven days and test with real data early on.",
        },
        {
          title: "Proof it works",
          body: "OOH Manager — Automated 7 out of 9 sales steps for a media network with 40,000+ billboard locations. Smashed proposal creation times from 7 days of digging through 5 separate Excels down to 30 minutes. Shipped in 6 weeks. Legal Flow — Automates high-stakes document workflows for restructuring proceedings, transforming 1-hour audio interviews into fully structured legal drafts. Municipal Application — A license-free, open-source B2G product line for Polish local governments, built to eliminate expensive vendor lock-in.",
        },
        {
          title: "What you get",
          body: "Production-Ready Product: A secure, scalable B2B software built on your cloud or servers. 100% IP Ownership: Full source code ownership with absolute freedom from ongoing platform licenses. Admin Control Panel: A clean dashboard built specifically for your internal operations team. Zero-Surprise Delivery: Weekly live demos throughout the build so you always know exactly what is being shipped.",
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
      lead: "We implement and automate CRM platforms so your pipeline runs on autopilot and your team spends time selling — not wrestling with broken spreadsheets. As certified partners of Monday, ClickUp, Pipedrive, and Tilio, we deliver high-performance setups tailored exactly to your real business workflows.",
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
          body: "Production-Ready ERP/CRM: A secure Open Mercato ecosystem running live on your cloud or hardware. Clean Data Migration: Your historical business records cleaned, structured, and safely moved from legacy systems. 100% Code Ownership: Full source code control with zero platform lock-in and no ongoing subscription renewals. Custom Extensions: Tailored workflows and modules built exactly for your team's daily operations.",
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
    body: "30 minutes. We come back with a six-week plan, a fixed price and a first demo in two weeks.",
  },
  footer: {
    intro: "AI-native service agency. Warsaw → worldwide.",
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
          { label: "LinkedIn", href: "https://www.linkedin.com/company/boosterai-en/" },
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
