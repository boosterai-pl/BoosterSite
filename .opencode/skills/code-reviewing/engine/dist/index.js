import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { classifyFromArgs, renderClassification } from './classify.js';
import { compileFindings } from './compile.js';
import { createPlanFromArgs, renderPlan, renderPlanTasksFromArgs, renderStoredPrompt, } from './plan.js';
import { DOMAIN_ORDER, loadDomainRules, lookupRulesBySlug } from './rules.js';
import { appendFinding, appendNote, commentsPath, ensureSessionDirectories, hasSession, loadBranchSessions, loadFindings, loadPlan, loadSession, planPath, readNotes, resetSession, reportPath, saveFindings, saveSession, severitySummary, } from './session-store.js';
const SKIP_REASONS = [
    'changed-file-scope',
    'docs-only-change',
    'test-only-change',
    'no-relevant-runtime-surface',
    'other',
];
function die(message) {
    console.error(`ERROR: ${message}`);
    process.exit(1);
}
function getArg(args, flag) {
    const index = args.indexOf(flag);
    if (index === -1 || index + 1 >= args.length) {
        return null;
    }
    return args[index + 1];
}
function hasArg(args, flag) {
    return args.includes(flag);
}
function requireArg(args, flag) {
    const value = getArg(args, flag);
    if (!value) {
        die(`${flag} is required`);
    }
    return value;
}
function readFindingBody(args) {
    const sources = [
        hasArg(args, '--body'),
        hasArg(args, '--body-file'),
        hasArg(args, '--body-stdin'),
    ].filter(Boolean).length;
    if (sources !== 1) {
        die('Use exactly one of --body, --body-file, or --body-stdin');
    }
    if (hasArg(args, '--body')) {
        return requireArg(args, '--body');
    }
    if (hasArg(args, '--body-file')) {
        const bodyPath = requireArg(args, '--body-file');
        try {
            return readFileSync(bodyPath, 'utf8');
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            die(`Could not read --body-file "${bodyPath}": ${message}`);
        }
    }
    if (process.stdin.isTTY) {
        die('--body-stdin requires piped stdin');
    }
    return readFileSync(0, 'utf8');
}
function parseDomain(value) {
    if (DOMAIN_ORDER.includes(value)) {
        return value;
    }
    die(`Unknown domain "${value}". Valid domains: ${DOMAIN_ORDER.join(', ')}`);
}
function printRule(session) {
    if (session.currentIndex >= session.rules.length) {
        const summary = severitySummary(session);
        console.log(`DOMAIN COMPLETE. critical ${summary.criticalDone}/${summary.criticalTotal}, warning ${summary.warningDone}/${summary.warningTotal}.`);
        return;
    }
    const summary = severitySummary(session);
    const rule = session.rules[session.currentIndex];
    const position = session.currentIndex + 1;
    console.log(`RULE [${position}/${session.rules.length}] ${rule.slug} (${rule.severity})`);
    console.log(`PHASE: ${summary.phase}`);
    console.log(rule.description);
}
function formatReviewCounts(summary) {
    return `passes=${summary.passedCount} skipped=${summary.skippedCount} findings=${summary.findingCount}`;
}
function summarizeReviewOutcomes(sessions) {
    const passedCount = sessions.reduce((total, session) => total + session.passes, 0);
    const skippedCount = sessions.reduce((total, session) => total + session.skipped, 0);
    const findingCount = sessions.reduce((total, session) => total + session.findings, 0);
    return {
        totalReviewedRules: passedCount + skippedCount + findingCount,
        passedCount,
        skippedCount,
        findingCount,
    };
}
function formatReviewedRulesSentence(summary) {
    return `Reviewed ${summary.totalReviewedRules} rule(s): ${summary.passedCount} passed, ${summary.skippedCount} skipped, ${summary.findingCount} findings.`;
}
export function buildGithubReviewBody(summary, domains, comments) {
    const criticalCount = comments.filter((c) => c.severity === 'critical').length;
    const warningCount = comments.filter((c) => c.severity === 'warning').length;
    let header;
    if (summary.findingCount === 0) {
        header = '## Code Review — ✅ Approved';
    }
    else if (criticalCount > 0) {
        header = `## Code Review — 🚨 ${criticalCount} critical finding(s)`;
    }
    else {
        header = `## Code Review — ⚠️ ${warningCount} warning finding(s)`;
    }
    const completeDomains = domains.filter((d) => d.phase === 'complete');
    const tableRows = completeDomains.map((d) => {
        const criticalParts = [];
        if (d.criticalPassed > 0)
            criticalParts.push(`${d.criticalPassed}✅`);
        if (d.criticalSkipped > 0)
            criticalParts.push(`${d.criticalSkipped}⏭️`);
        if (d.criticalFindings > 0)
            criticalParts.push(`${d.criticalFindings}🚨`);
        const criticalContent = criticalParts.length > 0 ? criticalParts.join(' · ') : '—';
        const criticalCell = `**${criticalContent} / ${d.criticalTotal}**`;
        const warningParts = [];
        if (d.warningPassed > 0)
            warningParts.push(`${d.warningPassed}✅`);
        if (d.warningSkipped > 0)
            warningParts.push(`${d.warningSkipped}⏭️`);
        if (d.warningFindings > 0)
            warningParts.push(`${d.warningFindings}⚠️`);
        const warningContent = warningParts.length > 0 ? warningParts.join(' · ') : '—';
        const warningCell = `**${warningContent} / ${d.warningTotal}**`;
        return `| ${d.domain} | ${criticalCell} | ${warningCell} |`;
    });
    const tableHeader = '| Domain | 🚨 Critical | ⚠️ Warning |\n|---|---|---|';
    const legend = '✅ passed · ⏭️ skipped · 🚨 critical finding · ⚠️ warning finding';
    const table = [tableHeader, ...tableRows].join('\n');
    let footer;
    if (summary.findingCount === 0) {
        footer = `**${summary.totalReviewedRules} rules reviewed** — ${summary.passedCount} passed · ${summary.skippedCount} skipped · 0 findings`;
    }
    else {
        footer = `**${summary.totalReviewedRules} rules reviewed** — ${summary.passedCount} passed · ${summary.skippedCount} skipped · ${criticalCount} critical · ${warningCount} warning`;
    }
    return `${header}\n\n${table}\n\n${legend}\n\n${footer}`;
}
export function selectGithubReviewEvent(comments) {
    const criticalCount = comments.filter((c) => c.severity === 'critical').length;
    if (criticalCount > 0) {
        return 'REQUEST_CHANGES';
    }
    return 'APPROVE';
}
function formatStatusLine(session) {
    const summary = severitySummary(session);
    return `${session.domain}: phase=${summary.phase} critical ${summary.criticalDone}/${summary.criticalTotal}, warning ${summary.warningDone}/${summary.warningTotal}, ${formatReviewCounts(summarizeReviewOutcomes([session]))}`;
}
function ensureDomainNotActive(branch, domain) {
    if (!hasSession(branch, domain)) {
        return;
    }
    const session = loadSession(branch, domain);
    if (session.currentIndex < session.rules.length) {
        die(`Session already active for ${domain} on ${branch}. Complete it or reset it first.`);
    }
}
function advanceSession(branch, session) {
    session.currentIndex += 1;
    session.updatedAt = new Date().toISOString();
    saveSession(branch, session);
    printRule(session);
}
function start(branch, domain) {
    ensureDomainNotActive(branch, domain);
    const rules = loadDomainRules(domain);
    const session = {
        branch,
        domain,
        rules,
        currentIndex: 0,
        findings: 0,
        passes: 0,
        skipped: 0,
        criticalPasses: 0,
        criticalSkipped: 0,
        criticalFindings: 0,
        warningPasses: 0,
        warningSkipped: 0,
        warningFindings: 0,
        startedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    ensureSessionDirectories(branch);
    saveSession(branch, session);
    saveFindings(branch, domain, []);
    const summary = severitySummary(session);
    console.log(`Session started for ${domain} on ${branch}. critical ${summary.criticalTotal}, warning ${summary.warningTotal}.`);
    printRule(session);
}
function next(branch, domain) {
    printRule(loadSession(branch, domain));
}
function pass(branch, domain, evidence) {
    if (evidence.trim().length < 10) {
        die('--evidence must be at least 10 characters');
    }
    const session = loadSession(branch, domain);
    if (session.currentIndex >= session.rules.length) {
        die(`All rules already completed for ${domain}.`);
    }
    const rule = session.rules[session.currentIndex];
    console.log(`PASS: ${rule.slug} -- ${evidence.trim()}`);
    session.passes += 1;
    if (rule.severity === 'critical')
        session.criticalPasses += 1;
    else
        session.warningPasses += 1;
    advanceSession(branch, session);
}
function parseSkipReason(value) {
    if (SKIP_REASONS.includes(value)) {
        return value;
    }
    die(`Unknown --reason "${value}". Valid reasons: ${SKIP_REASONS.join(', ')}`);
}
function skip(branch, domain, reason, note) {
    const parsedReason = parseSkipReason(reason);
    const trimmedNote = note?.trim();
    if (note != null && !trimmedNote) {
        die('--note must not be empty when provided');
    }
    const session = loadSession(branch, domain);
    if (session.currentIndex >= session.rules.length) {
        die(`All rules already completed for ${domain}.`);
    }
    const rule = session.rules[session.currentIndex];
    if (rule.severity === 'critical') {
        die(`BLOCKED: critical rule "${rule.slug}" cannot be skipped.\n\n` +
            `Rule: ${rule.description}\n\n` +
            `You MUST make an explicit judgment on the actual diff for this rule.\n` +
            `Re-read the changed hunks now, then choose one of:\n` +
            `  • No issue found → pass --evidence "<quote the specific code or absence you verified that proves this rule does not apply>"\n` +
            `  • Issue found    → finding --file <path> --line <n> --side RIGHT --body-file <tmp>\n\n` +
            `Do NOT call skip again on a critical rule.`);
    }
    // Only warning rules reach this point — critical rules are blocked above.
    console.log(`SKIP: ${rule.slug} -- ${parsedReason}${trimmedNote ? ` | ${trimmedNote}` : ''}`);
    session.skipped += 1;
    session.warningSkipped += 1;
    advanceSession(branch, session);
}
function finding(branch, domain, args) {
    const file = requireArg(args, '--file');
    const line = Number(requireArg(args, '--line'));
    const side = requireArg(args, '--side').toUpperCase();
    const body = readFindingBody(args);
    if (!Number.isInteger(line)) {
        die('--line must be an integer');
    }
    if (side !== 'RIGHT' && side !== 'LEFT') {
        die('--side must be RIGHT or LEFT');
    }
    if (body.trim().length < 10) {
        die('--body must be at least 10 characters');
    }
    // Enforce diff-anchor: findings must target a file that was actually changed in this PR.
    // If the plan exists and lists changed files, reject findings outside that set.
    // This forces agents to anchor every finding to a changed line; references to
    // pre-existing code belong in the finding body, not as the finding target.
    if (existsSync(planPath(branch))) {
        const plan = loadPlan(branch);
        const changedPaths = plan.changedFiles.map((f) => f.path);
        if (changedPaths.length > 0 && !changedPaths.includes(file)) {
            die(`BLOCKED: "${file}" is not in the PR diff.\n\n` +
                `Every finding must be anchored to a line that was changed in this PR.\n` +
                `If the issue is in existing code that this PR introduces a dependency on or exposes:\n` +
                `  1. Find the changed line in the diff that introduces or calls that code\n` +
                `  2. Record the finding there: --file <changed-file> --line <that-line>\n` +
                `  3. Quote or reference the problematic pre-existing code in the finding body\n\n` +
                `Changed files in this PR:\n${changedPaths.map((p) => `  ${p}`).join('\n')}`);
        }
        // Hunk-level check: the line must fall within a diff hunk for this file.
        // Skip only when hunks is undefined (file-list mode / legacy plan — no diff was parsed).
        // An empty array [] means the file was in the diff but has no changed hunks (e.g. a pure
        // rename or mode-change). In that case GitHub will also reject an inline comment, so we
        // reject the finding here rather than letting submit-review.mjs silently drop it later.
        const fileEntry = plan.changedFiles.find((f) => f.path === file);
        if (fileEntry?.hunks !== undefined) {
            if (fileEntry.hunks.length === 0) {
                die(`BLOCKED: "${file}" has no changed hunks in the PR diff (it may be a pure rename or mode-change).\n\n` +
                    `GitHub does not allow inline comments on files with no changed lines.\n` +
                    `Record the finding on a file that has actual line changes, or skip this rule with an appropriate reason.`);
            }
            const range = side === 'LEFT' ? ['oldStart', 'oldEnd'] : ['newStart', 'newEnd'];
            const inHunk = fileEntry.hunks.some((hunk) => line >= hunk[range[0]] && line <= hunk[range[1]]);
            if (!inHunk) {
                const hunkRanges = fileEntry.hunks.map((h) => `${h[range[0]]}–${h[range[1]]}`).join(', ');
                die(`line ${line} of "${file}" is not in the PR diff.\n` +
                    `Changed hunks (${side} side): lines ${hunkRanges}\n` +
                    `Read the diff for this file and re-record at a line within those ranges, or drop this finding and move on.`);
            }
        }
    }
    const session = loadSession(branch, domain);
    if (session.currentIndex >= session.rules.length) {
        die(`All rules already completed for ${domain}.`);
    }
    const rule = session.rules[session.currentIndex];
    const reviewFinding = {
        path: file,
        line,
        side: side,
        severity: rule.severity,
        rule: rule.slug,
        domain,
        body,
    };
    appendFinding(branch, domain, reviewFinding);
    session.findings += 1;
    if (rule.severity === 'critical')
        session.criticalFindings += 1;
    else
        session.warningFindings += 1;
    console.log(`FINDING recorded: ${rule.slug} @ ${file}:${line} (${rule.severity})`);
    advanceSession(branch, session);
}
function status(branch, maybeDomain) {
    if (maybeDomain) {
        const session = loadSession(branch, parseDomain(maybeDomain));
        console.log(formatStatusLine(session));
        return;
    }
    const sessions = loadBranchSessions(branch);
    if (sessions.length === 0) {
        console.log(`No sessions found for branch "${branch}".`);
        return;
    }
    for (const session of sessions) {
        console.log(formatStatusLine(session));
    }
}
function rule(args) {
    const slug = requireArg(args, '--slug');
    const domainArg = getArg(args, '--domain');
    const domain = domainArg ? parseDomain(domainArg) : undefined;
    const matches = lookupRulesBySlug(slug, domain);
    if (matches.length === 0) {
        die(`No rule found for slug "${slug}"${domain ? ` in domain "${domain}"` : ''}.`);
    }
    if (matches.length > 1) {
        die(`Multiple rules found for slug "${slug}" across domains: ${matches
            .map((match) => match.domain)
            .join(', ')}. Re-run with --domain.`);
    }
    const match = matches[0];
    if (args.includes('--json')) {
        console.log(JSON.stringify(match, null, 2));
        return;
    }
    console.log(`domain: ${match.domain}`);
    console.log(`slug: ${match.slug}`);
    console.log(`severity: ${match.severity}`);
    console.log(`description: ${match.description}`);
}
function summary(branch) {
    const sessions = loadBranchSessions(branch);
    if (sessions.length === 0) {
        console.log(`No sessions found for branch "${branch}".`);
        return;
    }
    let criticalDone = 0;
    let criticalTotal = 0;
    let warningDone = 0;
    let warningTotal = 0;
    const reviewSummary = summarizeReviewOutcomes(sessions);
    for (const session of sessions) {
        const progress = severitySummary(session);
        criticalDone += progress.criticalDone;
        criticalTotal += progress.criticalTotal;
        warningDone += progress.warningDone;
        warningTotal += progress.warningTotal;
    }
    console.log(`domains=${sessions.length} critical ${criticalDone}/${criticalTotal} warning ${warningDone}/${warningTotal} ${formatReviewCounts(reviewSummary)}`);
}
function compile(branch) {
    const sessions = loadBranchSessions(branch);
    if (sessions.length === 0) {
        die(`No sessions found for branch "${branch}".`);
    }
    const incomplete = sessions.filter((session) => session.currentIndex < session.rules.length);
    if (incomplete.length > 0) {
        die(`Cannot compile. Incomplete sessions: ${incomplete
            .map((session) => `${session.domain} (${session.currentIndex}/${session.rules.length})`)
            .join(', ')}`);
    }
    const comments = compileFindings(sessions.flatMap((session) => loadFindings(branch, session.domain)));
    const reviewSummary = summarizeReviewOutcomes(sessions);
    const criticalCount = comments.filter((comment) => comment.severity === 'critical').length;
    const warningCount = comments.length - criticalCount;
    const domainRows = sessions.map((session) => {
        const sv = severitySummary(session);
        return {
            domain: session.domain,
            phase: sv.phase,
            criticalTotal: sv.criticalTotal,
            criticalPassed: session.criticalPasses,
            criticalSkipped: session.criticalSkipped,
            criticalFindings: session.criticalFindings,
            warningTotal: sv.warningTotal,
            warningPassed: session.warningPasses,
            warningSkipped: session.warningSkipped,
            warningFindings: session.warningFindings,
        };
    });
    const githubReviewBody = buildGithubReviewBody(reviewSummary, domainRows, comments);
    const githubReviewEvent = selectGithubReviewEvent(comments);
    const commentsWithSummary = comments.map((comment, index) => index === 0 ? { ...comment, reviewSummary } : comment);
    const report = {
        branch,
        generatedAt: new Date().toISOString(),
        summary: {
            totalReviewedRules: reviewSummary.totalReviewedRules,
            passedCount: reviewSummary.passedCount,
            skippedCount: reviewSummary.skippedCount,
            findingCount: reviewSummary.findingCount,
            totalFindings: comments.length,
            criticalCount,
            warningCount,
            domainCount: sessions.length,
        },
        githubReview: {
            body: githubReviewBody,
            event: githubReviewEvent,
            summary: reviewSummary,
        },
        domains: sessions.map((session) => ({
            domain: session.domain,
            findings: session.findings,
            passes: session.passes,
            skipped: session.skipped,
            ...severitySummary(session),
        })),
        comments: commentsWithSummary,
    };
    writeFileSync(reportPath(branch), JSON.stringify(report, null, 2));
    writeFileSync(commentsPath(branch), JSON.stringify(commentsWithSummary, null, 2));
    console.log(formatReviewedRulesSentence(reviewSummary));
    console.log(`Compiled ${comments.length} finding(s): ${criticalCount} critical, ${warningCount} warning.`);
    console.log(`Comments: ${commentsPath(branch)}`);
    console.log(`Report: ${reportPath(branch)}`);
}
function doctor(branch) {
    const sessions = loadBranchSessions(branch);
    if (sessions.length === 0) {
        die(`No sessions found for branch "${branch}".`);
    }
    for (const session of sessions) {
        if (session.currentIndex > session.rules.length) {
            die(`${session.domain}: currentIndex exceeds rule count`);
        }
        if (session.currentIndex !== session.findings + session.passes + session.skipped) {
            die(`${session.domain}: currentIndex does not match findings + passes + skipped`);
        }
        const warningBeforeCritical = session.rules
            .slice(0, session.currentIndex)
            .some((rule, index, completed) => rule.severity === 'warning' &&
            completed.slice(index + 1).some((laterRule) => laterRule.severity === 'critical'));
        if (warningBeforeCritical) {
            die(`${session.domain}: warning rule completed before remaining critical rule`);
        }
        if (session.criticalSkipped > 0) {
            die(`${session.domain}: ${session.criticalSkipped} critical rule(s) were skipped — this is forbidden. Critical rules must be passed or flagged as findings.`);
        }
        const findings = loadFindings(branch, session.domain);
        if (findings.length !== session.findings) {
            die(`${session.domain}: findings file count does not match session counter`);
        }
    }
    console.log(`Doctor OK for ${branch}.`);
}
function notes(branch, domain, note) {
    if (note.trim().length === 0) {
        die('--append must not be empty');
    }
    appendNote(branch, domain, note);
    console.log(`Note appended for ${domain}.`);
}
function showNotes(branch, domain) {
    const notesContent = readNotes(branch, domain);
    if (notesContent.length === 0) {
        console.log(`No notes for ${domain} on ${branch}.`);
        return;
    }
    process.stdout.write(notesContent);
}
function usage() {
    console.log('Usage: review-cli <classify|plan|prompt|rule|start|next|pass|skip|finding|status|summary|compile|doctor|notes|show-notes|reset> ...');
}
function reset(branch, maybeDomain) {
    resetSession(branch, maybeDomain ? parseDomain(maybeDomain) : undefined);
    if (maybeDomain) {
        console.log(`Reset session for ${maybeDomain} on ${branch}.`);
        return;
    }
    console.log(`Reset all sessions for ${branch}.`);
}
async function main() {
    const args = process.argv.slice(2);
    const command = args[0];
    if (!command) {
        usage();
        process.exit(0);
    }
    if (command === 'classify') {
        const result = await classifyFromArgs(args.slice(1));
        if (args.includes('--json')) {
            console.log(JSON.stringify(result, null, 2));
            return;
        }
        console.log(renderClassification(result));
        return;
    }
    if (command === 'plan') {
        if (args.includes('--json')) {
            const result = await createPlanFromArgs(args.slice(1));
            console.log(JSON.stringify(result, null, 2));
            return;
        }
        if (args.includes('--tasks')) {
            console.log(await renderPlanTasksFromArgs(args.slice(1)));
            return;
        }
        const result = await createPlanFromArgs(args.slice(1));
        console.log(renderPlan(result));
        return;
    }
    if (command === 'rule') {
        rule(args.slice(1));
        return;
    }
    const branch = requireArg(args, '--branch');
    if (command === 'prompt') {
        console.log(renderStoredPrompt(branch, parseDomain(requireArg(args, '--domain'))));
        return;
    }
    switch (command) {
        case 'start':
            start(branch, parseDomain(requireArg(args, '--domain')));
            break;
        case 'next':
            next(branch, parseDomain(requireArg(args, '--domain')));
            break;
        case 'pass':
            pass(branch, parseDomain(requireArg(args, '--domain')), requireArg(args, '--evidence'));
            break;
        case 'skip':
            skip(branch, parseDomain(requireArg(args, '--domain')), requireArg(args, '--reason'), getArg(args, '--note'));
            break;
        case 'finding':
            finding(branch, parseDomain(requireArg(args, '--domain')), args);
            break;
        case 'status':
            status(branch, getArg(args, '--domain'));
            break;
        case 'summary':
            summary(branch);
            break;
        case 'compile':
            compile(branch);
            break;
        case 'doctor':
            doctor(branch);
            break;
        case 'notes':
            notes(branch, parseDomain(requireArg(args, '--domain')), requireArg(args, '--append'));
            break;
        case 'show-notes':
            showNotes(branch, parseDomain(requireArg(args, '--domain')));
            break;
        case 'reset':
            reset(branch, getArg(args, '--domain'));
            break;
        default:
            usage();
            die(`Unknown command "${command}"`);
    }
}
const isMain = process.argv[1] &&
    fileURLToPath(import.meta.url) ===
        (process.argv[1].startsWith('/')
            ? process.argv[1]
            : new URL(process.argv[1], import.meta.url).pathname);
if (isMain) {
    void main().catch((error) => {
        die(error instanceof Error ? error.message : String(error));
    });
}
