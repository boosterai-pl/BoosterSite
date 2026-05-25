// Content schema. Mirrors what a CMS (Sanity, Contentful, Payload) would expose.
// Swap the local data modules with CMS-fetched objects of the same shape.

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

export type HeroContent = {
  readonly eyebrow: string;
  readonly establishedLabel: string;
  readonly headlineLines: readonly HeadlineLine[];
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

export type PracticeContent = {
  readonly slug: string;
  readonly eyebrow: string;
  readonly headline: HeadlineLine;
  readonly lead: string;
  readonly sections: readonly PracticeSection[];
  readonly cta: { readonly label: string; readonly href: string };
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
  readonly date: string;
  readonly description: string;
  readonly author: string;
  readonly content: string;
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
  };
  readonly speed: {
    readonly eyebrow: string;
    readonly headlineLines: readonly HeadlineLine[];
    readonly stats: readonly Stat[];
  };
  readonly process: {
    readonly eyebrow: string;
    readonly headline: HeadlineLine;
    readonly steps: readonly ProcessStep[];
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
    readonly headlineLines: readonly HeadlineLine[];
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
