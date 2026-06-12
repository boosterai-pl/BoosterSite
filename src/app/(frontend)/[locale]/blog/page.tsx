import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getPayloadClient } from "@/lib/payload";
import { localeHrefPrefix } from "@/i18n/locale";
import { BlogCard } from "@/components/BlogCard";

export const revalidate = 3600;

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

  let posts: Array<{ id: string; slug: string; title: string; publishedAt: string; excerpt: string }> = [];
  let totalPages = 1;

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "posts",
      where: { _status: { equals: "published" } },
      sort: "-publishedAt",
      limit: POSTS_PER_PAGE,
      page,
    });
    posts = result.docs.map((p: unknown) => {
      const doc = p as Record<string, unknown>;
      return {
        id: doc.id as string,
        slug: doc.slug as string,
        title: doc.title as string,
        publishedAt: doc.publishedAt as string,
        excerpt: doc.excerpt as string,
      };
    });
    totalPages = result.totalPages;
  } catch {
    // No posts available — show empty state
  }

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
                    key={post.id}
                    post={{
                      slug: post.slug,
                      title: post.title,
                      date: post.publishedAt,
                      description: post.excerpt,
                    }}
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
