// Our own sites get the referrer (only the origin, the browser default), so their analytics
// can see the visit came from boosterai.pl. Everything else gets no referrer at all.
const OWN_HOSTS = ["legal-flow.pl"];

export function externalRel(href: string): string {
  try {
    const host = new URL(href).hostname.replace(/^www\./, "");
    if (OWN_HOSTS.includes(host)) return "noopener";
  } catch {
    /* not a full URL */
  }
  return "noopener noreferrer";
}
