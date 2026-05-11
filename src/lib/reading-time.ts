/**
 * Estimate reading time from a Lexical rich text JSON structure.
 * Extracts all text nodes recursively, counts words, divides by 200 wpm.
 * Returns minutes rounded up (minimum 1).
 */
export function estimateReadingTime(lexicalJson: unknown): number {
  const text = extractText(lexicalJson);
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function extractText(node: unknown): string {
  if (!node || typeof node !== "object") return "";
  const n = node as Record<string, unknown>;

  if (typeof n.text === "string") return n.text;

  if (Array.isArray(n.children)) {
    return n.children.map(extractText).join(" ");
  }
  if (n.root && typeof n.root === "object") {
    return extractText(n.root);
  }

  return "";
}
