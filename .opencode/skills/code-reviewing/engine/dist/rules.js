import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const TOOL_ROOT = join(__dirname, '..');
const REVIEW_CONFIG_PATH = join(TOOL_ROOT, 'config', 'review-config.json');
export const REVIEW_CONFIG = JSON.parse(readFileSync(REVIEW_CONFIG_PATH, 'utf8'));
export const DOMAIN_ORDER = REVIEW_CONFIG.domains.map((domain) => domain.name);
export const DOMAIN_IDS = Object.fromEntries(REVIEW_CONFIG.domains.map((domain) => [domain.name, domain.id]));
export const DOMAIN_NAMES_BY_ID = Object.fromEntries(REVIEW_CONFIG.domains.map((domain) => [domain.id, domain.name]));
export const DOMAIN_RULE_FILES = Object.fromEntries(REVIEW_CONFIG.domains.map((domain) => [domain.name, domain.ruleFile]));
export function domainNameFromId(domainId) {
    const domainName = DOMAIN_NAMES_BY_ID[domainId];
    if (!domainName) {
        throw new Error(`Unknown domain id: ${domainId}`);
    }
    return domainName;
}
export function loadDomainRules(domain) {
    const fileName = DOMAIN_RULE_FILES[domain];
    const filePath = join(TOOL_ROOT, 'rules', fileName);
    const rules = JSON.parse(readFileSync(filePath, 'utf8'));
    if (rules.length === 0) {
        throw new Error(`No rules found in ${filePath}`);
    }
    const criticals = rules.filter((rule) => rule.severity === 'critical');
    const warnings = rules.filter((rule) => rule.severity === 'warning');
    return [...criticals, ...warnings];
}
export function lookupRulesBySlug(slug, domain) {
    const domains = domain ? [domain] : DOMAIN_ORDER;
    return domains.flatMap((domainName) => loadDomainRules(domainName)
        .filter((rule) => rule.slug === slug)
        .map((rule) => ({
        domain: domainName,
        ...rule,
    })));
}
