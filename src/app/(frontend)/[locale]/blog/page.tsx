import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getBlogPosts } from "@/content";
import { localeHrefPrefix, toSiteLocale } from "@/i18n/locale";
import { BlogCard } from "@/components/BlogCard";


type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const POSTS_PER_PAGE = 10;

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const sp = await searchParams;
  const page = Number(sp.page) || 1;
  const suffix = page > 1 ? ` — strona ${page}` : "";
  return {
    title: `Blog${suffix} | Booster — AI-Native Agency`,
    description:
      "Praktyczne artykuly o automatyzacji AI, wdrozeniach CRM i budowaniu oprogramowania B2B. Field notes z agencji Booster.",
    alternates: {
      canonical: `https://boosterai.pl/blog${page > 1 ? `?page=${page}` : ""}`,
    },
    openGraph: {
      title: `Blog${suffix} | Booster — AI-Native Agency`,
      description:
        "Praktyczne artykuly o automatyzacji AI, wdrozeniach CRM i budowaniu oprogramowania B2B.",
      type: "website",
      url: `https://boosterai.pl/blog${page > 1 ? `?page=${page}` : ""}`,
    },
  };
}

export default async function BlogPage({ params, searchParams }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = localeHrefPrefix(locale);
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page) || 1);

  const allPosts = getBlogPosts(toSiteLocale(locale));
  const totalPages = Math.max(1, Math.ceil(allPosts.length / POSTS_PER_PAGE));
  const posts = allPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://boosterai.pl" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://boosterai.pl/blog" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="blog-list-page blog-light">
        <section className="block">
          <div className="container-inner">
            <div className="blog-list-head">
              <span className="eyebrow">Blog</span>
              <h1 className="h1">
                Field notes
                <br />
                from the build.
              </h1>
            </div>
            {posts.length === 0 ? (
              <p className="blog-empty">Brak opublikowanych postów.</p>
            ) : (
              <div className="blog-grid" data-reveal-stagger>
                {posts.map((post) => (
                  <BlogCard
                    key={post.slug}
                    post={post}
                    prefix={prefix}
                  />
                ))}
              </div>
            )}
            {totalPages > 1 && (
              <nav className="blog-pagination" aria-label="Paginacja bloga">
                {page > 1 && (
                  <a href={`${prefix}/blog${page === 2 ? "" : `?page=${page - 1}`}`}>
                    ← Poprzednia
                  </a>
                )}
                <span className="blog-pagination-info">
                  Strona {page} z {totalPages}
                </span>
                {page < totalPages && (
                  <a href={`${prefix}/blog?page=${page + 1}`}>Nastepna →</a>
                )}
              </nav>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
