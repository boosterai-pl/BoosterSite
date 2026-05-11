import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPosts, getPost } from "@/lib/blog";
import { BlogPost } from "@/components/BlogPost";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const url = `https://boosterai.pl/blog/${post.slug}`;
  return {
    title: `${post.title} | Booster`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url,
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const jsonLdBlogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    description: post.description,
    author: { "@type": "Organization", name: "Booster" },
    publisher: {
      "@type": "Organization",
      name: "Booster",
      url: "https://boosterai.pl",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://boosterai.pl/blog/${post.slug}`,
    },
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://boosterai.pl" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://boosterai.pl/blog" },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBlogPosting) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <main className="blog-post-page">
        <BlogPost post={post} />
      </main>
    </>
  );
}
