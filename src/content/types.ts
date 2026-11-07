// Content schema for everything rendered on the site.
// Source files (src/content/home/*, services/*, team.ts, case-studies.ts,
// careers/*.md, blog/*.md) are typed with the *Entry / HomeCopy types below.
// loadSite() in ./index.ts assembles them into the per-locale SiteContent
// object that pages and components read.

export type Locale = "en" | "pl";

/** One value per site language. Both are required. */
export type Localized<T> = {
  readonly en: T;
  readonly pl: T;
};

export type SiteMeta = {
  readonly brand: string;
  readonly contactEmail: string;
};

export type NavLink = {
  readonly label: string;
  readonly href: string;
  // Shown as a dropdown under the link on hover / focus.
  readonly children?: readonly {
    readonly label: string;
    readonly href: string;
  }[];
};

export type HeadlineLine = {
  readonly text: string;
  readonly accent?: string;
};

export type Service = {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly tags: readonly string[];
};

export type PracticeSection = {
  readonly title: string;
  readonly body: string;
};

export type SectionCta = {
  readonly microCopy?: string;
  readonly label: string;
  readonly href: string;
};

/** A titled list of cards (title + body), used for "what it does" and "how we work" blocks. */
export type PracticeCards = {
  readonly title: string;
  readonly items: readonly { readonly title: string; readonly body: string }[];
};

export type PracticeContent = {
  readonly slug: string;
  readonly eyebrow: string;
  readonly headline: HeadlineLine;
  readonly lead: string;
  readonly heroCta?: SectionCta;
  /** Short true facts under the hero, shown large. Only real numbers. */
  readonly facts?: readonly { readonly value: string; readonly label: string }[];
  /** Pain points, written as short scenes from the client's company. */
  readonly problems?: { readonly title: string; readonly items: readonly string[] };
  /** What we build or what the product does, as a card grid. */
  readonly features?: PracticeCards;
  /** Real screenshots with captions. */
  readonly gallery?: readonly {
    readonly src: string;
    readonly alt: string;
    readonly caption: string;
    readonly link?: { readonly label: string; readonly href: string };
  }[];
  /** A highlighted feature with a phone number to try it (e.g. a voice assistant demo line). */
  readonly callout?: {
    readonly eyebrow: string;
    readonly title: string;
    readonly body: string;
    readonly points: readonly string[];
    readonly phone: { readonly label: string; readonly display: string; readonly href: string; readonly note: string };
    readonly link: { readonly label: string; readonly href: string };
  };
  /** How we work, as numbered steps. */
  readonly steps?: PracticeCards;
  /** Plain text sections (what you own, who it is for, ...). */
  readonly sections: readonly PracticeSection[];
  /** Short cases with one result each. */
  readonly proof?: {
    readonly title: string;
    readonly items: readonly {
      readonly kind: string;
      readonly title: string;
      readonly body: string;
      readonly metric?: { readonly value: string; readonly label: string };
      readonly link?: { readonly label: string; readonly href: string };
    }[];
  };
  readonly faq?: { readonly title: string; readonly items: readonly { readonly q: string; readonly a: string }[] };
  readonly cta: SectionCta;
};

export type TeamMember = {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  /** One plain sentence about what the person does day to day. */
  readonly bio: string;
  readonly photo: string;
  /** Full LinkedIn profile URL, shown as a link under the person. */
  readonly linkedin?: string;
};

/** One case on the home page ("Realizacje"). Optional parts are simply not rendered. */
export type CaseStudy = {
  readonly id: string;
  /** Small label above the title, e.g. "Wdrożenie u klienta". */
  readonly kind: string;
  readonly title: string;
  /** Type of company: industry and size. */
  readonly company: string;
  /** One or two sentences: what we did. */
  readonly summary: string;
  /** Results shown large. `label` is optional for short qualitative results. */
  readonly metrics: readonly {
    readonly value: string;
    readonly label?: string;
  }[];
  /** Screens of the product, with links (used by the featured card). */
  readonly products?: readonly {
    readonly title: string;
    readonly text: string;
    readonly image: { readonly src: string; readonly alt: string };
    readonly link: { readonly label: string; readonly href: string };
  }[];
  readonly link?: { readonly label: string; readonly href: string };
  /** Illustrative system screens drawn in HTML (no real client data), shown next to the text. */
  readonly mock?: CaseMock;
  /** The large card at the top of the section. */
  readonly featured?: boolean;
  /** A use case (not a delivered project): shown full width, set apart from the real cases. */
  readonly example?: boolean;
};
export type CaseMock = {
  /** Small label under the screens, e.g. "Ilustracja poglądowa". */
  readonly caption: string;
  readonly table: {
    readonly title: string;
    readonly search: string;
    readonly action: string;
    readonly columns: readonly [string, string, string];
    readonly rows: readonly {
      readonly venue: string;
      readonly date: string;
      readonly status: string;
      readonly tone: "ok" | "wait" | "queue" | "late";
      readonly note: string;
    }[];
  };
  readonly map: { readonly title: string; readonly count: string; readonly legend: readonly [string, string] };
};
export type TitledText = { readonly title: string; readonly body: string };

type HomeSection = {
  readonly eyebrow: string;
  readonly headline: HeadlineLine;
};

/** Copy of the home page sections, in display order. */
export type HomeLanding = {
  readonly hero: {
    readonly eyebrow: string;
    readonly headline: HeadlineLine;
    readonly lead: string;
    readonly primaryCta: { readonly label: string; readonly href: string };
    readonly secondaryCta: { readonly label: string; readonly href: string };
    /** Illustrative growth chart next to the headline (no real data, no numbers). */
    readonly chart: {
      readonly title: string;
      readonly legend: { readonly scale: string; readonly team: string };
      readonly steps: readonly {
        readonly title: string;
        readonly note?: string;
      }[];
    };
  };
  /** Short "talk to us" strips shown between sections, in this order: after stages, cases, process and data. */
  readonly contactStrips: readonly {
    readonly text: string;
    readonly label: string;
    readonly href: string;
  }[];
  /** Three short, true facts under the hero. */
  readonly facts: readonly { readonly value: string; readonly label: string }[];
  readonly pain: HomeSection & {
    readonly items: readonly string[];
    readonly closing: string;
  };
  readonly stages: HomeSection & {
    readonly items: readonly (TitledText & { readonly note?: string })[];
    readonly footnote: string;
  };
  readonly cases: HomeSection & {};
  readonly foundation: HomeSection & {
    readonly body: string;
    readonly points: readonly TitledText[];
    readonly partners: {
      readonly intro: string;
      readonly tools: readonly string[];
    };
  };
  readonly process: HomeSection & {
    readonly steps: readonly TitledText[];
    readonly principlesTitle: string;
    readonly principles: readonly string[];
  };
  readonly data: HomeSection & {
    readonly lead: string;
    readonly points: readonly TitledText[];
    readonly modelsLabel: string;
  };
  readonly notFor: HomeSection & {
    readonly items: readonly string[];
    readonly closing: string;
  };
  readonly team: HomeSection & { readonly body: string };
  readonly services: HomeSection & { readonly body: string };
  readonly faq: HomeSection & {
    readonly items: readonly { readonly q: string; readonly a: string }[];
  };
  readonly cta: HomeSection & {
    readonly body: string;
    readonly button: { readonly label: string; readonly href: string };
  };
};

export type FooterColumn = {
  readonly heading: string;
  readonly links: readonly NavLink[];
};

export type BlogPost = {
  readonly slug: string;
  readonly title: string;
  /** Publication date, ISO format (YYYY-MM-DD). */
  readonly date: string;
  /** Short summary for the blog listing and the meta description. */
  readonly description: string;
  readonly author: string;
  readonly tags: readonly string[];
  readonly seoTitle?: string;
  readonly seoDescription?: string;
  /** Rendered HTML of the markdown body. */
  readonly content: string;
  readonly wordCount: number;
};

export type EmploymentType =
  "full-time" | "part-time" | "contract" | "internship";

export type JobRole = {
  readonly slug: string;
  readonly title: string;
  readonly department: string;
  readonly location: string;
  readonly employmentType: EmploymentType;
  /** Short summary shown on the /careers listing. */
  readonly description: string;
  /** Rendered HTML of the markdown body. Empty when the role has no detail page. */
  readonly bodyHtml: string;
  readonly applyUrl: string;
};

export type ContactFormCopy = {
  readonly emailLabel: string;
  readonly phoneLabel: string;
  readonly topicLabel: string;
  readonly topicPlaceholder: string;
  readonly consent: string;
  /** Optional second checkbox: consent to marketing messages (newsletter, news about services). */
  readonly marketingConsent: string;
  readonly privacyLabel: string;
  readonly privacyHref: string;
  readonly honeypotLabel: string;
  readonly submit: string;
  readonly submitting: string;
  readonly footnote: string;
  readonly invalidEmail: string;
  readonly invalidPhone: string;
  readonly requiredField: string;
  readonly missingConsent: string;
  readonly sent: string;
  readonly errorTitle: string;
  readonly errorBody: string;
  readonly mailtoLabel: string;
  readonly mailtoAddress: string;
  readonly mailtoSubject: string;
  readonly successEcho: string;
  readonly successTitle: string;
  readonly successBody: string;
  readonly formTitle: string;
};

export type BookingStep = { readonly title: string; readonly body: string };

export type BookingSection = {
  readonly eyebrow: string;
  readonly headline: HeadlineLine;
};

export type BookingExtras = {
  readonly points: readonly string[];
  /** A few real results next to the form (not just one project). */
  readonly proof: {
    readonly kind: string;
    readonly items: readonly { readonly value: string; readonly label: string }[];
    readonly link: { readonly label: string; readonly href: string };
  };
  /** Alternative to leaving a phone number: pick a slot in the calendar. */
  readonly calendar: {
    readonly text: string;
    readonly label: string;
    readonly href: string;
  };
  readonly trustLabel: string;
  /** Tools we also implement on, shown as plain name pills. */
  readonly trustTools: readonly string[];
  readonly starters: BookingSection & {
    readonly items: readonly string[];
    readonly hint: string;
  };
  readonly steps: BookingSection & {
    /** Example layout of the plan the client gets after the call (no prices, no invented data). */
    readonly plan: {
      readonly title: string;
      readonly caption: string;
      readonly items: readonly { readonly title: string; readonly note: string }[];
    };
    readonly items: readonly BookingStep[];
  };
  readonly outcomes: BookingSection & {
    readonly items: readonly BookingStep[];
  };
  readonly team: BookingSection & { readonly body: string };
  readonly faq: BookingSection & {
    readonly items: readonly { readonly q: string; readonly a: string }[];
  };
  readonly finalCta: BookingSection & {
    readonly body: string;
    readonly label: string;
  };
};

export type BookingContent = BookingExtras & {
  readonly form: ContactFormCopy;
  readonly eyebrow: string;
  readonly headline: HeadlineLine;
  readonly body: string;
};

export type SiteContent = {
  readonly meta: SiteMeta;
  readonly nav: readonly NavLink[];
  readonly navCta: { readonly label: string; readonly href: string };
  readonly home: HomeLanding;
  readonly services: readonly Service[];
  readonly cases: readonly CaseStudy[];
  readonly team: readonly TeamMember[];
  readonly footer: {
    readonly intro: string;
    readonly columns: readonly FooterColumn[];
    readonly bottom: readonly string[];
  };
  readonly practices: readonly PracticeContent[];
  /** The /work/legalflow page. */
  readonly legalflow: PracticePage;
  readonly booking: BookingContent;
};

// ---------------------------------------------------------------------------
// Source-file types (what you edit in src/content/)
// ---------------------------------------------------------------------------

/** Everything in src/content/home/en.ts and src/content/home/pl.ts. */
export type HomeCopy = Omit<
  SiteContent,
  "services" | "cases" | "team" | "practices" | "legalflow"
>;

export type ServiceCard = {
  readonly title: string;
  readonly description: string;
  readonly tags: readonly string[];
};

export type PracticePage = Omit<PracticeContent, "slug">;

/** One file per service in src/content/services/<slug>.ts. */
export type ServiceEntry = {
  /** URL slug of the detail page: /practices/<slug>. */
  readonly slug: string;
  readonly en: { readonly card: ServiceCard; readonly page: PracticePage };
  readonly pl: { readonly card: ServiceCard; readonly page: PracticePage };
};

/** One item in src/content/case-studies.ts. */
export type CaseStudyEntry = Localized<
  Omit<CaseStudy, "id" | "featured" | "example">
> & {
  readonly featured?: boolean;
  readonly example?: boolean;
};

/** One item in src/content/team.ts. */
export type TeamMemberEntry = {
  readonly name: string;
  /** Path under public/, e.g. "/assets/team/jan-kowalski.jpg". */
  readonly photo: string;
  /** Full LinkedIn profile URL, shown as a link under the person. */
  readonly linkedin?: string;
  readonly role: Localized<string>;
  readonly bio: Localized<string>;
};
