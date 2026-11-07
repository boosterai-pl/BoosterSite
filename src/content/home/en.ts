// Home page copy, nav, footer and the /book page (English).
// Every change here needs the matching change in ./pl.ts.
// Internal links ("/careers", "/book?z=...") stay without the /en prefix: it is added automatically.
// Text in [square brackets] is a placeholder waiting for Szymon's confirmation.
import type { HomeCopy } from "../types";

export const homeEn: HomeCopy = {
  meta: {
    brand: "Booster",
    contactEmail: "hello@boosterai.pl",
  },
  nav: [
    { label: "How we work", href: "#process" },
    {
      label: "Work",
      href: "#work",
      children: [
        { label: "LegalFlow", href: "/work/legalflow" },
        { label: "Open Mercato", href: "/practices/open-source-erp" },
      ],
    },
    { label: "About", href: "#team" },
    { label: "Careers", href: "/careers" },
  ],
  navCta: {
    label: "Book a call",
    href: "/book?z=nav",
  },
  home: {
    hero: {
      eyebrow: "AI transformation, end to end",
      headline: { text: "We boost companies with AI.", accent: "From the first process to the whole company." },
      lead: "We put AI at the centre of your company. We bring order to processes, automate repetitive work and build new services, so the business can grow faster than the headcount. We take you through the whole transformation, in stages, with a fixed price for each stage.",
      primaryCta: { label: "Book a free call", href: "/book?z=hero" },
      secondaryCta: { label: "See what it looks like in practice", href: "#work" },
      chart: {
        title: "How a company grows with AI at its centre",
        legend: { scale: "Company scale", team: "Team" },
        steps: [
          {
            title: "First experiments",
            text: "People try AI on their own accounts. Every new client means more manual work and more people to hire.",
            note: "Most companies are here today",
          },
          {
            title: "Data in order",
            text: "Shared data and clear processes. It is clear what people do, what AI does and where the one source of truth is.",
          },
          {
            title: "First processes on AI",
            text: "AI agents take over the repetitive work. The same team handles more orders.",
          },
          {
            title: "AI at the centre",
            text: "The company grows faster than the team. People make decisions and build new services.",
          },
        ],
      },
    },
    facts: [
      { value: "up to 70%", label: "less administrative work in law firms running on LegalFlow" },
      { value: "Plan and price", label: "after the first call: a staged plan with the price of the first stage" },
      { value: "Your code", label: "code and data stay with you, no per-user fees" },
    ],
    pain: {
      eyebrow: "Sound familiar?",
      headline: { text: "The company grows.", accent: "So does the manual work." },
      items: [
        "Every new client means another person to hire.",
        "A proposal takes days because the data sits in a dozen spreadsheets.",
        "There is one person without whom some things simply stop.",
        "A report takes two days and nobody fully trusts it anyway.",
        "People use AI, but each in their own way. The company as a whole gets nothing from it.",
      ],
      closing: "One more tool won't fix this. The company has to be organised with AI at its centre, not bolted on the side.",
    },
    stages: {
      eyebrow: "Where your company is",
      headline: { text: "From first experiments with AI", accent: "to a company that runs on it." },
      items: [
        {
          title: "First experiments",
          body: "People try AI on their own accounts. Knowledge lives in heads and spreadsheets, and processes work the same as before AI.",
          note: "Most companies are here today",
        },
        {
          title: "An organised company",
          body: "Shared data and orderly processes. It is clear what people do, what AI does and where the one source of truth is.",
        },
        {
          title: "AI at the centre",
          body: "AI agents do the repetitive work on company data, while people make decisions and build new services. More clients no longer mean more hires.",
        },
      ],
      footnote: "We take you through the whole journey, end to end. We start with the process that hurts most today.",
    },
    cases: {
      eyebrow: "Work",
      headline: { text: "What it looks like", accent: "in practice." },
      industries: "We have worked with companies in media, marketing, construction, manufacturing, services and with law firms.",
      labels: { before: "Before", did: "What we did", after: "Result" },
    },
    foundation: {
      eyebrow: "Foundation",
      headline: { text: "We don't write your system", accent: "from scratch." },
      body: "We build on Open Mercato, a proven open-source framework for business systems: CRM, sales, warehouse and documents. On top of it we add what your company needs, and AI where it makes sense.",
      points: [
        { title: "Faster and cheaper", body: "A ready foundation instead of months spent rebuilding the basics." },
        { title: "No per-user fees", body: "You pay for the implementation, not for every account in the system." },
        { title: "The system stays yours", body: "The code is open. If we were gone, another team could keep developing it." },
      ],
      partners: "If your company runs on Monday, ClickUp or Pipedrive, we implement on those too. We are partners of all three.",
    },
    process: {
      eyebrow: "How we work",
      headline: { text: "You know what you get", accent: "and what it costs." },
      steps: [
        { title: "Map", body: "A conversation and a workshop on your process. You get a plan with the price of the first stage." },
        { title: "Clean up the data", body: "Before any AI, the data and the process have to make sense. Otherwise we just automate the mess." },
        { title: "Build", body: "Stage by stage, on your data. You see progress and working parts regularly." },
        { title: "Grow", body: "The system runs, we maintain it and move on to the next areas." },
      ],
      principlesTitle: "Ground rules",
      principles: [
        "After the call you get a plan: what we do, in what order and what the first stage costs.",
        "You know the price of a stage before we start it.",
        "The plan is yours to keep, even if we never work together.",
      ],
    },
    data: {
      eyebrow: "Your data",
      headline: { text: "Your data stays", accent: "under your control." },
      lead: "On your servers or in the cloud. On models you already know.",
      points: [
        { title: "You choose where it runs", body: "On your own servers (on-premise) or in the cloud. Your call." },
        {
          title: "The right model for the job",
          body: "We work with the leading models. Open models, including the Polish Bielik, can run entirely on your servers.",
        },
        { title: "Everything in your company's name", body: "Accounts, repository and keys are set up for your company. The code is yours." },
        { title: "NDA and GDPR", body: "We sign an NDA before we start. Data is processed in line with GDPR." },
      ],
      modelsLabel: "Models we work with",
    },
    notFor: {
      eyebrow: "To be honest",
      headline: { text: "When we're not", accent: "the right fit." },
      items: [
        "You want AI because everyone has it, but you don't really care what should change in how the company works.",
        "Nobody on your side can spare an hour a week for the project.",
        "You need one simple chatbot for your website. An off-the-shelf tool will do.",
      ],
      closing: "If none of these is you, let's talk.",
    },
    team: {
      eyebrow: "About us",
      headline: { text: "You talk to the people who", accent: "then build it." },
      body: "We don't have a sales department that hands the project over to someone else. The first call is with someone from the team that then works on the implementation.",
      story: "LegalFlow was born at Booster. We built it with the same approach we offer our clients, and we run it ourselves.",
    },
    services: {
      eyebrow: "What we build with",
      headline: { text: "We pick the tools", accent: "to fit the problem." },
      body: "You don't need to choose the technology. Describe the problem and we'll suggest how to solve it.",
    },
    faq: {
      eyebrow: "Questions",
      headline: { text: "Before", accent: "we talk." },
      items: [
        {
          q: "How much does it cost, and what drives the price?",
          a: "The scope: how many processes, how many systems to connect and how much data to clean up. That's why we have no price list. After the first call you get a staged plan and a fixed price for the first stage. You know the price of every next stage before we start it.",
        },
        {
          q: "How much time does my team need to put in?",
          a: "We need one person on your side who knows the process and can make decisions. It starts with a workshop, then short meetings where we show progress. The rest of the team joins when they test working parts.",
        },
        {
          q: "What about our current systems (ERP, spreadsheets, CRM)?",
          a: "We start from what you already have. We often connect to the current system or build on the spreadsheets your team uses, like for the construction group above. We suggest a new system when the current one blocks the work.",
        },
        {
          q: "What about data and GDPR?",
          a: "You decide where the system runs: on your servers or in the cloud. Accounts, repository and keys are in your company's name, and we sign an NDA before we start. If data must not leave the company, we use open models running on your servers.",
        },
        {
          q: "What if the team doesn't want to use it?",
          a: "That's why we start with the process your team finds most painful, and we build it together with the people who do that work. We show working parts on your data before the way of working changes, and we teach the team to use them.",
        },
        {
          q: "What happens to the system if we stop working together?",
          a: "It stays with you and keeps running. The code and the data belong to your company, and the foundation (Open Mercato) is open source, so another team can take it further.",
        },
      ],
    },
    cta: {
      eyebrow: "First step",
      headline: { text: "Let's start with the one process that", accent: "hurts most today." },
      body: "The call is free. Afterwards you get a staged plan with the price of the first stage, and the decision is yours.",
      button: { label: "Book a free call", href: "/book?z=cta" },
    },
  },
  footer: {
    intro: "Company transformation with AI. Based in Wrocław, Poland.",
    columns: [
      {
        heading: "What we build with",
        links: [
          { label: "CRM implementation", href: "/practices/crm-implementation" },
          { label: "Systems on Open Mercato", href: "/practices/open-source-erp" },
          { label: "Custom software", href: "/practices/b2b-software" },
          { label: "AI automation", href: "/practices/ai-automation" },
        ],
      },
      {
        heading: "Company",
        links: [
          { label: "How we work", href: "/#process" },
          { label: "Work", href: "/#work" },
          { label: "LegalFlow", href: "/work/legalflow" },
          { label: "Team", href: "/#team" },
          { label: "Careers", href: "/careers" },
        ],
      },
      {
        heading: "Contact",
        links: [
          { label: "hello@boosterai.pl", href: "mailto:hello@boosterai.pl" },
          { label: "LinkedIn", href: "https://www.linkedin.com/company/boosterai-en" },
          { label: "Privacy policy", href: "https://boosterai.pl/privacy-policy/" },
        ],
      },
    ],
    bottom: ["© 2026 Sales Booster Sp. z o.o., Wrocław", "Booster AI"],
  },
  booking: {
    eyebrow: "Free call",
    headline: { text: "Tell us what hurts", accent: "most today." },
    body: "Half an hour about your company and the process you want to change. After the call you get a staged plan with the price of the first stage. What happens next is up to you.",
    points: [
      "The call costs nothing",
      "You talk to someone who then works on the implementation",
      "No ready-made specification needed",
    ],
    proof: {
      kind: "Our product",
      title: "LegalFlow",
      body: "Up to 70% less administrative work in Polish restructuring law firms. We built it and run it ourselves.",
      link: { label: "More about LegalFlow", href: "/work/legalflow" },
    },
    calendar: {
      text: "Rather not leave your number?",
      label: "Pick a time in the calendar",
      href: "https://cal.com/szymon-bazan-iahn2z/30min",
    },
    trustLabel: "We also implement on Monday, ClickUp and Pipedrive",
    starters: {
      eyebrow: "What companies come to us with",
      headline: { text: "Not sure how to", accent: "put it?" },
      hint: "Write it in the form",
      items: [
        "Everyone in the company uses AI their own way and we want to bring order to it.",
        "Proposals or reports are done by hand and take days.",
        "Everything lives in spreadsheets and in one person's head.",
        "We want to start with AI but don't know where.",
      ],
    },
    steps: {
      eyebrow: "What happens next",
      headline: { text: "From the form", accent: "to a plan." },
      imageAlt: "Szymon Bazan working at a laptop",
      items: [
        { title: "You write a few sentences", body: "What doesn't work today or takes too long. No specification needed." },
        { title: "We talk", body: "Half an hour by phone or at a time you pick in the calendar. About the process and what should change." },
        { title: "You get a plan", body: "Stages, their order and the price of the first one. The decision is yours." },
      ],
    },
    outcomes: {
      eyebrow: "After the call",
      headline: { text: "What you", accent: "get." },
      items: [
        { title: "A staged plan", body: "What we do and in what order, starting with what hurts most." },
        { title: "The price of the first stage", body: "A fixed amount you know before anything starts." },
        { title: "Time to decide", body: "You don't have to decide on the call. Take the plan and think it over." },
      ],
    },
    team: {
      eyebrow: "Team",
      headline: { text: "Who's on the", accent: "other side." },
      body: "The call is led by someone from the team that then builds the solution.",
    },
    faq: {
      eyebrow: "Questions",
      headline: { text: "Before you send", accent: "the form." },
      items: [
        { q: "Is the call paid?", a: "No. It takes about 30 minutes and doesn't commit you to anything." },
        {
          q: "Why do you ask for my phone number?",
          a: "The call happens by phone. If you'd rather not share your number, pick a time in the calendar below the form.",
        },
        {
          q: "What should I write in \"What is this about?\"",
          a: "A few sentences about what doesn't work today or takes too long. You don't need to know which technology will fix it.",
        },
        {
          q: "Do I need an idea for AI?",
          a: "No. It's enough to know which process in the company wears you down. That's where we start.",
        },
        {
          q: "What happens to my data?",
          a: "The data controller is Sales Booster Sp. z o.o., based in Wrocław, Poland. We use your data only to reply to your request. Details are in the privacy policy.",
        },
      ],
    },
    finalCta: {
      eyebrow: "First step",
      headline: { text: "Let's start with", accent: "one call." },
      body: "Filling in the form takes a minute. We'll get back to you to set a time.",
      label: "Fill in the form",
    },
    form: {
      emailLabel: "Email",
      phoneLabel: "Phone",
      topicLabel: "What is this about?",
      topicPlaceholder: "E.g. we build proposals by hand from several spreadsheets and it takes days",
      consent:
        "I agree to be contacted about my request. The data controller is Sales Booster Sp. z o.o., based in Wrocław, Poland.",
      privacyLabel: "Privacy policy",
      privacyHref: "https://boosterai.pl/privacy-policy/",
      honeypotLabel: "Leave this field empty",
      submit: "Book a free call",
      submitting: "Sending…",
      footnote: "The call costs nothing.",
      invalidEmail: "Enter a valid email address.",
      invalidPhone: "Enter a valid phone number.",
      requiredField: "This field is required.",
      missingConsent: "Tick the consent box to send your request.",
      sent: "Sent",
      errorTitle: "Your request didn't go through.",
      errorBody: "What you typed is still in the form. Try again in a moment or write to us directly:",
      mailtoLabel: "Send by email",
      mailtoAddress: "hello@boosterai.pl",
      mailtoSubject: "Free call: request",
      successEcho: "We'll reply to",
      successTitle: "Thank you, we have your request",
      successBody: "We'll get back to you to set up the call.",
      requiredNote: "Fields marked with * are required.",
      formTitle: "Book a call",
      hints: {
        email: "We'll send the confirmation here.",
        phone: "We call on business days. Pick the country code and enter your number.",
        topic: "A few sentences are enough. You don't need to know the solution.",
        consent: "We can't reply to your request without this consent.",
      },
    },
  },
};
