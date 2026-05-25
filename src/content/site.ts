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
  navCta: { label: "Book a call", href: "https://cal.com/szymon-bazan-iahn2z" },
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
    primaryCta: { label: "Book a free consultation", href: "https://cal.com/szymon-bazan-iahn2z" },
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
        body: "OOH Manager — production in 6 weeks. Legal Flow for restructuring — shipping now. We replace 12-month roadmaps with weekly demos.",
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
        slug: "crm-implementation",
        title: "CRM Implementation & Automation",
        description:
          "Boxed CRM stacks tuned to your sales motion. We configure, integrate and automate Monday, ClickUp, Pipedrive and Tilio — partner-grade.",
        tags: ["Monday", "ClickUp", "Pipedrive", "Tilio"],
      },
      {
        id: "02",
        slug: "open-source-erp",
        title: "Open-source ERP & CRM",
        description:
          "Enterprise without the license tax. We deploy Open Mercato on your infrastructure — fully customizable, owned by you, extended by us.",
        tags: ["Open Mercato", "ERP", "No lock-in", "Self-hosted"],
      },
      {
        id: "03",
        slug: "b2b-software",
        title: "End-to-end B2B Software",
        description:
          "Custom products built ground-up. OOH Manager, Legal Flow for restructuring, municipal applications — full stack, your IP.",
        tags: ["React", "Node", "Python", "Cloud"],
      },
      {
        id: "04",
        slug: "ai-automation",
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
        title: "OOH Manager",
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
    body: "Book a 30-minute consultation. We come back with a six-week plan, a fixed price and a first demo in two weeks.",
    button: { label: "Book free consultation", href: "https://cal.com/szymon-bazan-iahn2z" },
  },
  practices: [
    {
      slug: "crm-implementation",
      eyebrow: "01 / CRM Implementation & Automation",
      headline: { text: "Your sales motion,", accent: "automated." },
      lead: "We implement and automate CRM platforms so your team spends time selling — not wrestling spreadsheets. As certified partners of Monday, ClickUp, Pipedrive and Tilio, we deliver partner-grade configurations tuned to the way you actually work.",
      sections: [
        {
          title: "What we do",
          body: "We take your existing sales process — or help you build one — and translate it into a CRM stack that runs on autopilot. That means pipeline configuration, lead scoring, automated follow-ups, cross-platform integrations and reporting dashboards. No generic templates. Every workspace is shaped around your deal stages, your team size and your growth targets.",
        },
        {
          title: "How it works",
          body: "We start with a discovery call to map your current workflow, pain points and tools. Within the first week you get a configured workspace with live data. Over the following weeks we layer in automations: lead routing, email sequences, Slack notifications, invoice triggers — whatever the process demands. Weekly demos keep you in control. Handover includes documentation and team training.",
        },
        {
          title: "Who it's for",
          body: "Sales teams of 3–50 people who have outgrown spreadsheets but don't need a six-figure Salesforce contract. Founders who want a CRM that works on day one. Revenue leaders who need reporting they can trust without a dedicated ops hire.",
        },
        {
          title: "What you get",
          body: "A fully configured CRM workspace. Automated pipelines and follow-ups. Integrations with your email, calendar, invoicing and marketing tools. A trained team and written documentation. Ongoing support on retainer if you need it.",
        },
      ],
      cta: { label: "Book a free consultation", href: "https://cal.com/szymon-bazan-iahn2z" },
    },
    {
      slug: "open-source-erp",
      eyebrow: "02 / Open-source ERP & CRM",
      headline: { text: "Enterprise software,", accent: "zero license fees." },
      lead: "We deploy Open Mercato — an open-source ERP and CRM platform — on your own infrastructure. You get the capabilities of enterprise software without the vendor lock-in, the per-seat pricing or the six-month procurement cycle.",
      sections: [
        {
          title: "What we do",
          body: "We install, configure and extend Open Mercato to fit your business processes. That covers CRM, inventory, invoicing, procurement, HR modules — whatever your operation needs. Because the code is open-source, every customisation belongs to you. No license fees, no seat limits, no surprise renewals.",
        },
        {
          title: "How it works",
          body: "Discovery maps your current systems and data flows. We deploy Open Mercato on your cloud or on-premise infrastructure, migrate existing data, and configure modules to match your workflows. Custom features — a specific approval chain, a reporting view, a third-party integration — are built in-house and merged into your codebase. You own everything.",
        },
        {
          title: "Who it's for",
          body: "Mid-market and enterprise companies tired of paying six or seven figures a year for ERP seats. Organisations that need full control over their data and infrastructure. Teams that want to extend their business software without filing a vendor change request.",
        },
        {
          title: "What you get",
          body: "A production-ready Open Mercato deployment on your infrastructure. Configured modules for your core business processes. Data migration from legacy systems. Custom extensions built to your specification. Full source code ownership — no lock-in, ever.",
        },
      ],
      cta: { label: "Book a free consultation", href: "https://cal.com/szymon-bazan-iahn2z" },
    },
    {
      slug: "b2b-software",
      eyebrow: "03 / End-to-end B2B Software",
      headline: { text: "Custom products shipped in", accent: "weeks." },
      lead: "We build B2B software products from scratch — full stack, cloud-native, production-ready. OOH Manager went from zero to production in six weeks. Legal Flow is shipping now. The IP is always yours.",
      sections: [
        {
          title: "What we do",
          body: "We take a product idea — or a problem without a product yet — and deliver working software. Not wireframes. Not proposals. Running code with real users. Our stack is React, Node, Python and cloud infrastructure, accelerated by AI-native tooling that lets a four-person team move at the speed of forty.",
        },
        {
          title: "How it works",
          body: "Week one is discovery: we map the problem, the users, and what success looks like at six weeks. Week two delivers a clickable prototype. From week three we build in public — daily check-ins, weekly demos, no committee. Architecture decisions are made by the people writing the code. You see progress every seven days.",
        },
        {
          title: "Proof it works",
          body: "OOH Manager — a workplace health and safety platform that other teams quoted at twelve months — shipped to production in six weeks. Legal Flow automates document workflows and case management for a law firm in restructuring proceedings. Municipal Application is a B2G product line for Polish local governments. All built end-to-end by Booster.",
        },
        {
          title: "What you get",
          body: "A production-grade B2B product. Full source code and IP ownership. Cloud infrastructure configured and deployed. Admin panel or CMS for your operations team. Post-launch support on retainer. Weekly demos throughout the build so there are no surprises at handover.",
        },
      ],
      cta: { label: "Book a free consultation", href: "https://cal.com/szymon-bazan-iahn2z" },
    },
    {
      slug: "ai-automation",
      eyebrow: "04 / AI Automation Studio",
      headline: { text: "Automation that pays for itself in", accent: "one quarter." },
      lead: "We build process automations powered by Claude, n8n and Python. From document workflows to internal copilots — every deployment is measured against real ROI and expected to pay back inside ninety days.",
      sections: [
        {
          title: "What we do",
          body: "We identify manual, repetitive processes in your organisation and replace them with AI-powered automations. That includes document processing, data extraction, internal Q&A copilots, lead qualification bots, reporting pipelines and multi-system integrations. We use Claude for reasoning, n8n for orchestration and Python for everything in between.",
        },
        {
          title: "How it works",
          body: "We start with a process audit — not a slide deck, a working session. We map the inputs, outputs and decision points of the process you want to automate. Then we build it. A first working version typically ships within two weeks. We iterate based on real data, measure time saved and error rates, and hand over a system your team can maintain.",
        },
        {
          title: "Proof it works",
          body: "Kancelaria Jabłońska eliminated hours of daily paperwork by chaining n8n, Claude and Python into a single automation layer. Document classification, data extraction and case routing now run without human input. The system paid for itself within the first billing cycle.",
        },
        {
          title: "What you get",
          body: "Automated workflows deployed on your infrastructure or cloud. Integration with your existing tools — email, CRM, ERP, document storage. An admin dashboard for monitoring and exceptions. Documentation and team training. Measurable ROI tracked from day one.",
        },
      ],
      cta: { label: "Book a free consultation", href: "https://cal.com/szymon-bazan-iahn2z" },
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
