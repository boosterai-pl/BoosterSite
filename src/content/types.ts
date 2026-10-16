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
  readonly tagline: string;
  readonly contactEmail: string;
  readonly establishedLine: string;
  readonly version: string;
};

export type NavLink = {
  readonly label: string;
  readonly href: string;
};

export type SpeedHeadline = {
  readonly line1: string;
  readonly strikeText: string;
  readonly accentText: string;
  readonly line3: string;
};

export type HeroContent = {
  readonly eyebrow: string;
  readonly establishedLabel: string;
  readonly headline: HeadlineLine;
  readonly lead: string;
  readonly primaryCta: { readonly label: string; readonly href: string };
  readonly secondaryCta: { readonly label: string; readonly href: string };
  readonly meta: readonly HeroMetaCell[];
};

export type HeadlineLine = {
  readonly text: string;
  readonly accent?: string;
};

export type HeroMetaLogo = {
  readonly name: string;
  readonly component: string; // key matching BrandLogos export
};

export type HeroMetaCell = {
  readonly label: string;
  readonly value: string;
  readonly logos?: readonly HeroMetaLogo[];
};

export type MarqueeItem = {
  readonly label: string;
};

export type ManifestoEntry = {
  readonly id: string;
  readonly title: string;
  readonly body: string;
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

export type PracticeContent = {
  readonly slug: string;
  readonly eyebrow: string;
  readonly headline: HeadlineLine;
  readonly lead: string;
  readonly heroCta?: SectionCta;
  readonly sections: readonly PracticeSection[];
  readonly cta: SectionCta;
};

export type CaseStudy = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly tags: readonly string[];
};

export type Stat = {
  readonly value: string;
  readonly suffix?: string;
  readonly label: string;
};

export type ProcessStep = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
};

export type Partner = {
  readonly name: string;
  readonly role: string;
};

export type TeamMember = {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly photo: string;
};

export type Insight = {
  readonly id: string;
  readonly category: string;
  readonly date: string;
  readonly title: string;
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

export type EmploymentType = "full-time" | "part-time" | "contract" | "internship";

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

export type BookingContent = {
  readonly calUrl: string;
  readonly eyebrow: string;
  readonly headline: HeadlineLine;
  readonly body: string;
};

export type SiteContent = {
  readonly meta: SiteMeta;
  readonly nav: readonly NavLink[];
  readonly navCta: { readonly label: string; readonly href: string };
  readonly hero: HeroContent;
  readonly marquee: readonly MarqueeItem[];
  readonly manifesto: {
    readonly eyebrow: string;
    readonly headline: HeadlineLine;
    readonly entries: readonly ManifestoEntry[];
    readonly cta?: SectionCta;
  };
  readonly services: {
    readonly eyebrow: string;
    readonly headline: HeadlineLine;
    readonly items: readonly Service[];
  };
  readonly cases: {
    readonly eyebrow: string;
    readonly headline: HeadlineLine;
    readonly items: readonly CaseStudy[];
    readonly cta?: SectionCta;
  };
  readonly speed: {
    readonly eyebrow: string;
    readonly headline: SpeedHeadline;
    readonly stats: readonly Stat[];
  };
  readonly process: {
    readonly eyebrow: string;
    readonly headline: HeadlineLine;
    readonly steps: readonly ProcessStep[];
    readonly cta?: SectionCta;
  };
  readonly partners: {
    readonly eyebrow: string;
    readonly items: readonly Partner[];
  };
  readonly team: {
    readonly eyebrow: string;
    readonly headline: HeadlineLine;
    readonly members: readonly TeamMember[];
  };
  readonly insights: {
    readonly eyebrow: string;
    readonly headline: HeadlineLine;
    readonly posts: readonly Insight[];
  };
  readonly cta: {
    readonly eyebrow: string;
    readonly headline: HeadlineLine;
    readonly body: string;
    readonly button: { readonly label: string; readonly href: string };
  };
  readonly footer: {
    readonly intro: string;
    readonly columns: readonly FooterColumn[];
    readonly bottom: readonly string[];
  };
  readonly practices: readonly PracticeContent[];
  readonly booking: BookingContent;
};

// ---------------------------------------------------------------------------
// Source-file types (what you edit in src/content/)
// ---------------------------------------------------------------------------

type Section = {
  readonly eyebrow: string;
  readonly headline: HeadlineLine;
};

/** Everything in src/content/home/en.ts and src/content/home/pl.ts. */
export type HomeCopy = Omit<SiteContent, "services" | "cases" | "team" | "practices"> & {
  readonly services: Section;
  readonly cases: Section & { readonly cta?: SectionCta };
  readonly team: Section;
};

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
export type CaseStudyEntry = Localized<{
  readonly title: string;
  readonly description: string;
  readonly tags: readonly string[];
}>;

/** One item in src/content/team.ts. */
export type TeamMemberEntry = {
  readonly name: string;
  /** Path under public/, e.g. "/assets/team/jan-kowalski.jpg". */
  readonly photo: string;
  readonly role: Localized<string>;
};
