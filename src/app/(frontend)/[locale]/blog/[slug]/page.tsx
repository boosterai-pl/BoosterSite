import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getBlogPost, getBlogPosts } from "@/content";
import { localeHrefPrefix, toSiteLocale } from "@/i18n/locale";
import { BlogPost } from "@/components/BlogPost";

type Props = { params: Promise<{ locale: string; slug: string }> };

// Every post is prerendered at build time; unknown slugs return 404.
export const dynamicParams = false;

export async function generateStaticParams({
  params,
}: {
  params: { locale: string };
}): Promise<Array<{ slug: string }>> {
  return getBlogPosts(toSiteLocale(params.locale)).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPost(toSiteLocale(locale), slug);
  if (!post) return {};

  const title = post.seoTitle ?? post.title;
  const description = post.seoDescription ?? post.description;
  const canonicalUrl = `https://boosterai.pl/blog/${post.slug}`;

  return {
    title: `${title} | Booster`,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://boosterai.pl/blog/${post.slug}`,
      publishedTime: post.date,
      images: [
        {
          url: `https://boosterai.pl/api/og?title=${encodeURIComponent(post.seoTitle ?? post.title)}&category=${encodeURIComponent(post.tags[0] ?? "Blog")}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getBlogPost(toSiteLocale(locale), slug);
  if (!post) notFound();

  const imageUrl = `https://boosterai.pl/api/og?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.tags[0] ?? "Blog")}`;

  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    description: post.description,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Booster",
      url: "https://boosterai.pl",
      logo: {
        "@type": "ImageObject",
        url: "https://boosterai.pl/assets/booster-sygnet.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://boosterai.pl/blog/${post.slug}`,
    },
    image: imageUrl,
    wordCount: post.wordCount,
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://boosterai.pl",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://boosterai.pl/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://boosterai.pl/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <main className="blog-post-page blog-light">
        <BlogPost post={post} prefix={localeHrefPrefix(locale)} />
      </main>
    </>
  );
}
