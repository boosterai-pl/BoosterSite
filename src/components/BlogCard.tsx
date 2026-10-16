import type { BlogPost } from "@/content/types";

type Props = {
  post: Pick<BlogPost, "slug" | "title" | "date" | "description">;
  /** Locale URL prefix: "" for English, "/pl" for Polish. */
  prefix?: string;
};

export function BlogCard({ post, prefix = "" }: Props) {
  const formatted = new Date(post.date).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
  });

  return (
    <a href={`${prefix}/blog/${post.slug}`} className="blog-card">
      <span className="eyebrow">{formatted}</span>
      <h3 className="h3">{post.title}</h3>
      <p className="blog-card-desc">{post.description}</p>
    </a>
  );
}
