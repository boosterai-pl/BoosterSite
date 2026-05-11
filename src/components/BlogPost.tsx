import type { BlogPost as BlogPostType } from "@/content/types";

type Props = { post: BlogPostType };

export function BlogPost({ post }: Props) {
  const formatted = new Date(post.date).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="blog-article">
      <div className="blog-article-header">
        <nav className="blog-breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span aria-hidden="true">/</span>
          <a href="/blog">Blog</a>
          <span aria-hidden="true">/</span>
          <span>{post.title}</span>
        </nav>
        <span className="eyebrow">{formatted}</span>
      </div>
      <h1 className="h1">{post.title}</h1>
      <div
        className="blog-body"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <a href="/blog" className="blog-back">
        ← Wróć do bloga
      </a>
    </article>
  );
}
