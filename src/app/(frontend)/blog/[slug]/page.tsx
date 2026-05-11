import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPayloadClient } from "@/lib/payload";
import { BlogPost } from "@/components/BlogPost";
import { lexicalToHtml } from "@/lib/lexical-html";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

interface PayloadPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: unknown;
  publishedAt: string;
  updatedAt: string;
  readingTime?: number;
  seoTitle?: string;
  seoDescription?: string;
  seoCanonicalUrl?: string;
  featuredImage?: { url?: string };
  author?: { name?: string } | string;
  tags?: Array<{ tag: string }>;
}

export async function generateStaticParams() {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "posts",
      where: { _status: { equals: "published" } },
      limit: 1000,
    });
    return (result.docs as unknown[]).map((p) => ({
      slug: (p as Record<string, unknown>).slug as string,
    }));
  } catch {
    return [];
  }
}

async function getPost(slug: string): Promise<PayloadPost | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "posts",
      where: { slug: { equals: slug }, _status: { equals: "published" } },
      limit: 1,
      depth: 2,
    });
    if (!result.docs.length) return null;
    return result.docs[0] as unknown as PayloadPost;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const title = post.seoTitle ?? post.title;
  const description = post.seoDescription ?? post.excerpt;
  const canonicalUrl =
    post.seoCanonicalUrl ?? `https://boosterai.pl/blog/${post.slug}`;

  return {
    title: `${title} | Booster`,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://boosterai.pl/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      images: [
        {
          url: `https://boosterai.pl/api/og?title=${encodeURIComponent(post.seoTitle ?? post.title)}&category=${encodeURIComponent(post.tags?.[0]?.tag ?? "Blog")}`,
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
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const htmlContent = lexicalToHtml(post.content);

  const authorName =
    typeof post.author === "object" && post.author !== null
      ? (post.author.name ?? "Booster")
      : "Booster";

  const blogPost = {
    slug: post.slug,
    title: post.title,
    date: post.publishedAt,
    description: post.excerpt,
    author: authorName,
    content: htmlContent,
  };

  const imageUrl =
    post.featuredImage?.url
      ? `https://boosterai.pl${post.featuredImage.url}`
      : `https://boosterai.pl/api/og?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.tags?.[0]?.tag ?? "Blog")}`;

  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: authorName,
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
    ...(post.readingTime
      ? { wordCount: post.readingTime * 200 }
      : {}),
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
      <main className="blog-post-page">
        <BlogPost post={blogPost} />
      </main>
    </>
  );
}
