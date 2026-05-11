/**
 * Convert Payload Lexical rich text JSON to HTML string.
 * Handles common node types: paragraphs, headings, lists, text formatting.
 * Server-side only utility for rendering blog post content.
 */

interface LexicalNode {
  type: string;
  text?: string;
  children?: LexicalNode[];
  format?: number | string;
  tag?: string;
  listType?: string;
  value?: number;
  fields?: Record<string, unknown>;
  url?: string;
  root?: LexicalNode;
}

const TEXT_FORMAT_BOLD = 1;
const TEXT_FORMAT_ITALIC = 2;
const TEXT_FORMAT_UNDERLINE = 8;
const TEXT_FORMAT_CODE = 16;
const TEXT_FORMAT_STRIKETHROUGH = 4;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function convertNode(node: LexicalNode): string {
  if (!node) return "";

  switch (node.type) {
    case "root":
      return (node.children ?? []).map(convertNode).join("");

    case "paragraph": {
      const inner = (node.children ?? []).map(convertNode).join("");
      return inner ? `<p>${inner}</p>` : "";
    }

    case "heading": {
      const tag = node.tag ?? "h2";
      const inner = (node.children ?? []).map(convertNode).join("");
      return `<${tag}>${inner}</${tag}>`;
    }

    case "list": {
      const listTag = node.listType === "number" ? "ol" : "ul";
      const inner = (node.children ?? []).map(convertNode).join("");
      return `<${listTag}>${inner}</${listTag}>`;
    }

    case "listitem": {
      const inner = (node.children ?? []).map(convertNode).join("");
      return `<li>${inner}</li>`;
    }

    case "quote": {
      const inner = (node.children ?? []).map(convertNode).join("");
      return `<blockquote>${inner}</blockquote>`;
    }

    case "code": {
      const inner = (node.children ?? []).map(convertNode).join("");
      return `<pre><code>${inner}</code></pre>`;
    }

    case "link": {
      const url = node.fields?.url as string | undefined ?? "#";
      const inner = (node.children ?? []).map(convertNode).join("");
      return `<a href="${escapeHtml(url)}" rel="noopener noreferrer">${inner}</a>`;
    }

    case "autolink": {
      const url = node.fields?.url as string | undefined ?? "#";
      const inner = (node.children ?? []).map(convertNode).join("");
      return `<a href="${escapeHtml(url)}">${inner}</a>`;
    }

    case "text": {
      if (node.text === undefined || node.text === null) return "";
      let text = escapeHtml(node.text);
      const fmt = typeof node.format === "number" ? node.format : 0;
      if (fmt & TEXT_FORMAT_BOLD) text = `<strong>${text}</strong>`;
      if (fmt & TEXT_FORMAT_ITALIC) text = `<em>${text}</em>`;
      if (fmt & TEXT_FORMAT_UNDERLINE) text = `<u>${text}</u>`;
      if (fmt & TEXT_FORMAT_STRIKETHROUGH) text = `<s>${text}</s>`;
      if (fmt & TEXT_FORMAT_CODE) text = `<code>${text}</code>`;
      return text;
    }

    case "linebreak":
      return "<br />";

    case "horizontalrule":
      return "<hr />";

    default:
      // Unknown node type — render children if any
      if (node.children) {
        return (node.children ?? []).map(convertNode).join("");
      }
      return "";
  }
}

export function lexicalToHtml(content: unknown): string {
  if (!content || typeof content !== "object") return "";
  const root = content as LexicalNode;
  // Handle both {root: ...} wrapper and raw root node
  const node = root.root ? root.root : root;
  return convertNode(node);
}
