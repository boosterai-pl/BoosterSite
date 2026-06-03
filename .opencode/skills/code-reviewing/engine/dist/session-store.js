import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DOMAIN_ORDER } from './rules.js';
const __dirname = dirname(fileURLToPath(import.meta.url));
// Bundled as a self-contained skill engine: session state lives in the consumer
// project root (cwd), and the launcher sits one level above dist/.
const REPO_ROOT = process.cwd();
const CLI_PATH = join(__dirname, '..', 'review-cli');
export function repoRoot() {
    return REPO_ROOT;
}
export function cliPath() {
    return CLI_PATH;
}
export function sanitizeBranch(branch) {
    if (branch.length === 0) {
        throw new Error('branch must be a non-empty string');
    }
    return branch.replace(/[/\\]/g, '-');
}
function sessionsDir(branch) {
    return join(REPO_ROOT, '.review-sessions', sanitizeBranch(branch));
}
export function findingsDir(branch) {
    return join(sessionsDir(branch), 'findings');
}
function notesDir(branch) {
    return join(sessionsDir(branch), 'notes');
}
export function diffDir(branch) {
    return join(sessionsDir(branch), 'diffs');
}
export function diffFilePath(branch, filePath) {
    return join(diffDir(branch), filePath + '.diff');
}
export function sessionPath(branch, domain) {
    return join(sessionsDir(branch), `${domain}.json`);
}
export function findingsPath(branch, domain) {
    return join(findingsDir(branch), `${domain}.json`);
}
export function notesPath(branch, domain) {
    return join(notesDir(branch), `${domain}.md`);
}
export function reportPath(branch) {
    return join(sessionsDir(branch), 'review-report.json');
}
export function commentsPath(branch) {
    return join(sessionsDir(branch), 'review-comments.json');
}
export function planPath(branch) {
    return join(sessionsDir(branch), 'plan.json');
}
export function reviewTargetInputPath(branch, inputKind) {
    return join(sessionsDir(branch), inputKind === 'diff' ? 'review-target.diff' : 'review-target-files.txt');
}
export function ensureSessionDirectories(branch) {
    mkdirSync(sessionsDir(branch), { recursive: true });
    mkdirSync(findingsDir(branch), { recursive: true });
    mkdirSync(notesDir(branch), { recursive: true });
    mkdirSync(diffDir(branch), { recursive: true });
}
export function loadSession(branch, domain) {
    const path = sessionPath(branch, domain);
    if (!existsSync(path)) {
        throw new Error(`No session found for domain "${domain}" on branch "${branch}".`);
    }
    return normalizeSession(JSON.parse(readFileSync(path, 'utf8')));
}
export function hasSession(branch, domain) {
    return existsSync(sessionPath(branch, domain));
}
export function saveSession(branch, session) {
    ensureSessionDirectories(branch);
    writeFileSync(sessionPath(branch, session.domain), JSON.stringify(session, null, 2));
}
function normalizeSession(session) {
    return {
        ...session,
        skipped: session.skipped ?? 0,
        criticalPasses: session.criticalPasses ?? 0,
        criticalSkipped: session.criticalSkipped ?? 0,
        criticalFindings: session.criticalFindings ?? 0,
        warningPasses: session.warningPasses ?? 0,
        warningSkipped: session.warningSkipped ?? 0,
        warningFindings: session.warningFindings ?? 0,
    };
}
export function savePlan(branch, plan) {
    ensureSessionDirectories(branch);
    writeFileSync(planPath(branch), JSON.stringify(plan, null, 2));
}
export function saveReviewTargetInput(branch, inputKind, content) {
    ensureSessionDirectories(branch);
    const path = reviewTargetInputPath(branch, inputKind);
    writeFileSync(path, content);
    return path;
}
/**
 * Normalizes the stored plan's changedFiles field to the current ChangedFile[] shape.
 * Old plans stored changedFiles as string[] — migrate them to { path, changeType: 'modified' }.
 */
function normalizePlan(raw) {
    const plan = raw;
    if (Array.isArray(plan['changedFiles']) && plan['changedFiles'].length > 0) {
        const first = plan['changedFiles'][0];
        if (typeof first === 'string') {
            // Old format: string[] — migrate to ChangedFile[]
            plan['changedFiles'] = plan['changedFiles'].map((p) => ({ path: p, changeType: 'modified' }));
        }
    }
    return plan;
}
export function loadPlan(branch) {
    const path = planPath(branch);
    if (!existsSync(path)) {
        throw new Error(`No stored plan found for branch "${branch}". Run \`.opencode/skills/code-reviewing/engine/review-cli plan --branch "${branch}" ...\` first.`);
    }
    return normalizePlan(JSON.parse(readFileSync(path, 'utf8')));
}
export function loadFindings(branch, domain) {
    const path = findingsPath(branch, domain);
    if (!existsSync(path)) {
        return [];
    }
    return JSON.parse(readFileSync(path, 'utf8'));
}
export function saveFindings(branch, domain, findings) {
    ensureSessionDirectories(branch);
    writeFileSync(findingsPath(branch, domain), JSON.stringify(findings, null, 2));
}
export function appendFinding(branch, domain, finding) {
    const findings = loadFindings(branch, domain);
    findings.push(finding);
    saveFindings(branch, domain, findings);
}
export function appendNote(branch, domain, note) {
    ensureSessionDirectories(branch);
    const path = notesPath(branch, domain);
    const existing = existsSync(path) ? readFileSync(path, 'utf8') : '';
    const entry = `- ${note.trim()}\n`;
    writeFileSync(path, `${existing}${entry}`);
}
export function readNotes(branch, domain) {
    const path = notesPath(branch, domain);
    if (!existsSync(path)) {
        return '';
    }
    return readFileSync(path, 'utf8');
}
export function loadBranchSessions(branch) {
    const dir = sessionsDir(branch);
    if (!existsSync(dir)) {
        return [];
    }
    const sessions = [];
    for (const domain of DOMAIN_ORDER) {
        const path = sessionPath(branch, domain);
        if (!existsSync(path)) {
            continue;
        }
        sessions.push(normalizeSession(JSON.parse(readFileSync(path, 'utf8'))));
    }
    return sessions;
}
export function branchHasSessions(branch) {
    const dir = sessionsDir(branch);
    if (!existsSync(dir)) {
        return false;
    }
    const reportFileName = basename(reportPath(branch));
    const commentsFileName = basename(commentsPath(branch));
    const planFileName = basename(planPath(branch));
    return readdirSync(dir).some((entry) => entry.endsWith('.json') &&
        entry !== reportFileName &&
        entry !== commentsFileName &&
        entry !== planFileName);
}
export function resetSession(branch, domain) {
    if (domain) {
        rmSync(sessionPath(branch, domain), { force: true });
        rmSync(findingsPath(branch, domain), { force: true });
        rmSync(notesPath(branch, domain), { force: true });
        return;
    }
    rmSync(sessionsDir(branch), { recursive: true, force: true });
}
export function severitySummary(session) {
    const criticalTotal = session.rules.filter((rule) => rule.severity === 'critical').length;
    const warningTotal = session.rules.length - criticalTotal;
    const criticalDone = Math.min(session.currentIndex, criticalTotal);
    const warningDone = Math.max(0, session.currentIndex - criticalTotal);
    let phase = 'complete';
    if (session.currentIndex < criticalTotal) {
        phase = 'critical';
    }
    else if (session.currentIndex < session.rules.length) {
        phase = 'warning';
    }
    return { criticalDone, criticalTotal, warningDone, warningTotal, phase };
}
