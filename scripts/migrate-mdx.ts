import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getPayload } from "payload";
import config from "../src/payload/payload.config";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

interface LexicalText {
  type: "text";
  text: string;
}

interface LexicalParagraph {
  type: "paragraph";
  children: LexicalText[];
  direction: "ltr";
  format: string;
  indent: number;
  version: number;
}

interface LexicalHeading {
  type: "heading";
  tag: string;
  children: LexicalText[];
  direction: "ltr";
  format: string;
  indent: number;
  version: number;
}

type LexicalChild = LexicalParagraph | LexicalHeading;

interface LexicalContent {
  root: {
    type: "root";
    children: LexicalChild[];
    direction: "ltr";
    format: string;
    indent: number;
    version: number;
  };
}

function markdownToLexical(markdown: string): LexicalContent {
  const paragraphs = markdown.split("\n\n").filter(Boolean);

  const children: LexicalChild[] = paragraphs.map((paragraph): LexicalChild => {
    const trimmed = paragraph.trim();
    if (trimmed.startsWith("## ")) {
      return {
        type: "heading",
        tag: "h2",
        children: [{ type: "text", text: trimmed.replace(/^## /, "") }],
        direction: "ltr",
        format: "",
        indent: 0,
        version: 1,
      };
    }
    if (trimmed.startsWith("### ")) {
      return {
        type: "heading",
        tag: "h3",
        children: [{ type: "text", text: trimmed.replace(/^### /, "") }],
        direction: "ltr",
        format: "",
        indent: 0,
        version: 1,
      };
    }
    return {
      type: "paragraph",
      children: [{ type: "text", text: trimmed }],
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    };
  });

  return {
    root: {
      type: "root",
      children,
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    },
  };
}

async function migrateMdx() {
  const payload = await getPayload({ config });

  if (!fs.existsSync(BLOG_DIR)) {
    console.log("No blog directory found at", BLOG_DIR);
    process.exit(0);
  }

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  console.log(`Found ${files.length} MDX files to migrate.\n`);

  for (const filename of files) {
    const slug = filename.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
    const { data, content } = matter(raw);

    const existing = await payload.find({
      collection: "posts",
      where: { slug: { equals: slug } },
    });

    if (existing.docs.length > 0) {
      console.log(`Skipping existing: ${slug}`);
      continue;
    }

    const lexicalContent = markdownToLexical(content);

    await payload.create({
      collection: "posts",
      data: {
        title: data.title as string,
        slug,
        excerpt: data.description as string,
        content: lexicalContent as unknown as Record<string, unknown>,
        publishedAt: data.date as string,
        _status: "draft",
      },
    });

    console.log(`Migrated: ${slug} (as draft — review in admin before publishing)`);
  }

  console.log("\nMigration complete. Review posts in /admin and publish when ready.");
  process.exit(0);
}

migrateMdx().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
