// Links to legal-flow.pl carry UTM tags, so the LegalFlow analytics (Datafast) sees that the visit
// came from boosterai.pl and from which spot. utm_campaign = the spot, utm_content = the language.
export function legalFlowHref(path: string, placement: string, locale: "pl" | "en"): string {
  const query = new URLSearchParams({
    utm_source: "boosterai.pl",
    utm_medium: "referral",
    utm_campaign: placement,
    utm_content: locale,
  });
  return `https://legal-flow.pl${path}?${query}`;
}
