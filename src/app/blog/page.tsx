import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/blog";
import { BlogCard } from "@/components/BlogCard";

export const metadata: Metadata = {
  title: "Blog | Booster — AI-Native Agency",
  description:
    "Praktyczne artykuły o automatyzacji AI, wdrożeniach CRM i budowaniu oprogramowania B2B. Field notes z agencji Booster.",
  alternates: {
    canonical: "https://boosterai.pl/blog",
  },
  openGraph: {
    title: "Blog | Booster — AI-Native Agency",
    description:
      "Praktyczne artykuły o automatyzacji AI, wdrożeniach CRM i budowaniu oprogramowania B2B.",
    type: "website",
    url: "https://boosterai.pl/blog",
  },
};

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <main className="blog-list-page">
      <section className="block">
        <div className="container-inner">
          <div className="blog-list-head">
            <span className="eyebrow">Blog</span>
            <h1 className="h1">Field notes<br />from the build.</h1>
          </div>
          <div className="blog-grid" data-reveal-stagger>
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
