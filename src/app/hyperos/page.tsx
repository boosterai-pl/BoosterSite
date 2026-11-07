import { readFileSync } from "node:fs";
import { join } from "node:path";

/* Standalone Polish case study (non-localized). Markup lives in content.html. */
const html = readFileSync(join(process.cwd(), "src/app/hyperos/content.html"), "utf8");

export default function HyperosPage() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
