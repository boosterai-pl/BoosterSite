import { classify, isIgnored, loadReviewIgnore, readReviewInputFromArgs, savePerFileDiffs, splitAndCleanDiff, } from './classify.js';
import { REVIEW_CONFIG } from './rules.js';
import { cliPath, diffDir, loadPlan, repoRoot, savePlan, saveReviewTargetInput, } from './session-store.js';
function getArg(args, flag) {
    const index = args.indexOf(flag);
    if (index === -1 || index + 1 >= args.length) {
        return null;
    }
    return args[index + 1];
}
function requireArg(args, flag) {
    const value = getArg(args, flag);
    if (!value) {
        throw new Error(`${flag} is required`);
    }
    return value;
}
function renderChangedFiles(files) {
    return files.map((file) => `- ${file.path} [${file.changeType}]`).join('\n');
}
function renderSubagents(plan) {
    return plan.subagents
        .map((subagent) => `- agent: ${subagent.agent} | domain: ${subagent.domain} | prompt_command: ${subagent.promptCommand}`)
        .join('\n');
}
function renderTemplate(template, values) {
    return Object.entries(values).reduce((prompt, [key, value]) => prompt.replaceAll(`{{${key}}}`, value), template);
}
function quotedCliPath(path) {
    return `"${path}"`;
}
function planCommand(path, branch) {
    return `${quotedCliPath(path)} plan --branch "${branch}" --tasks`;
}
function compileCommand(path, branch) {
    return `${quotedCliPath(path)} compile --branch "${branch}"`;
}
function promptCommand(path, branch, domain) {
    return `${quotedCliPath(path)} prompt --branch "${branch}" --domain ${domain}`;
}
function renderReviewTargetInstructions(reviewTarget) {
    const defaultInstructions = [
        '- Start with the current CLI rule before reviewing files.',
        '- If CHANGED FILES is empty, skip every remaining rule with `--reason changed-file-scope`.',
        '- Return the standard summary after the skips. Do not read code.',
        '- Do not report pre-existing issues outside the changed hunks unless this change introduced, exposed, or now depends on them.',
    ];
    if (!reviewTarget) {
        return defaultInstructions.join('\n');
    }
    const skipDeletedLine = '- Files marked [deleted] no longer exist. Skip their diffs unless the current rule explicitly applies to removed code.';
    if (reviewTarget.mode === 'base') {
        return [
            ...defaultInstructions,
            skipDeletedLine,
            `- Per-file diffs are pre-split and stored under: ${reviewTarget.diffsDir}`,
            `- For a changed file at <path>, read its diff at: ${reviewTarget.diffsDir}/<path>.diff`,
            '- Prefer the pre-split diff files — they are already cleaned of noise.',
            '- Alternatively, run the scoped diff command: `' +
                reviewTarget.perFileDiffCommandTemplate +
                '`',
            '- Read the full source file only when the diff alone is insufficient.',
        ].join('\n');
    }
    if (reviewTarget.inputKind === 'diff') {
        const diffsDir = reviewTarget.storedInputPath;
        const sourceLine = diffsDir
            ? `- Per-file diffs are pre-split and stored under: ${diffsDir}`
            : reviewTarget.source === 'path' && reviewTarget.diffPath
                ? `- Use the provided diff file as the primary review source: ${reviewTarget.diffPath}`
                : '- Use the provided diff content as the primary review source.';
        const perFileInstruction = diffsDir
            ? `- For a changed file at <path>, read its diff at: ${diffsDir}/<path>.diff`
            : null;
        return [
            ...defaultInstructions,
            skipDeletedLine,
            sourceLine,
            ...(perFileInstruction ? [perFileInstruction] : []),
            '- Read only the diff files relevant to the current rule. Use the CHANGED FILES list to know which paths exist.',
            '- Read the full source file only when the diff alone is insufficient to assess the rule.',
            '- `git diff` is not available for this review target mode.',
        ].join('\n');
    }
    const fileListSource = reviewTarget.storedInputPath
        ? `- This review target only provides a changed-file list persisted at: ${reviewTarget.storedInputPath}`
        : reviewTarget.source === 'path' && reviewTarget.diffPath
            ? `- This review target only provides a changed-file list from: ${reviewTarget.diffPath}`
            : '- This review target only provides a changed-file list.';
    return [
        ...defaultInstructions,
        fileListSource,
        '- Review only the minimum file context needed to validate the changed files for the current rule.',
        '- No scoped diff is bundled with this review target. Avoid full file reads except for the minimum context needed to validate a changed file.',
    ].join('\n');
}
function createStoredPrompt(plan, domain) {
    return renderTemplate(REVIEW_CONFIG.orchestration.promptTemplate, {
        branch: plan.branch,
        domain,
        title: plan.title,
        description: plan.description,
        changedFiles: renderChangedFiles(plan.changedFiles),
        cliPath: quotedCliPath(plan.cliPath),
        reviewTargetInstructions: renderReviewTargetInstructions(plan.reviewTarget),
        returnInstruction: REVIEW_CONFIG.orchestration.returnInstruction,
    });
}
function createSpawnPrompt(path, branch, domain) {
    return renderTemplate(REVIEW_CONFIG.orchestration.spawnPromptTemplate, {
        branch,
        domain,
        promptCommand: promptCommand(path, branch, domain),
    });
}
function toStoredPlan(plan) {
    return {
        ...plan,
        subagents: plan.subagents.map((subagent) => ({
            domain: subagent.domain,
            agent: subagent.agent,
            promptCommand: subagent.promptCommand,
            spawnPrompt: subagent.spawnPrompt,
        })),
    };
}
/**
 * Parse hunk ranges from a unified diff string.
 * Mirrors the parseHunks() logic in .github/scripts/submit-review.mjs.
 */
function parseHunks(diff) {
    const hunksByPath = new Map();
    let currentPath = null;
    for (const line of diff.split('\n')) {
        if (line.startsWith('+++ b/')) {
            currentPath = line.slice('+++ b/'.length);
            hunksByPath.set(currentPath, hunksByPath.get(currentPath) ?? []);
            continue;
        }
        if (!currentPath) {
            continue;
        }
        const match = /^@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/.exec(line);
        if (!match) {
            continue;
        }
        hunksByPath.get(currentPath).push({
            oldStart: Number(match[1]),
            oldEnd: Number(match[1]) + Number(match[2] ?? '1') - 1,
            newStart: Number(match[3]),
            newEnd: Number(match[3]) + Number(match[4] ?? '1') - 1,
        });
    }
    return hunksByPath;
}
export async function createPlanFromArgs(args) {
    const branch = requireArg(args, '--branch');
    const title = getArg(args, '--title') ?? REVIEW_CONFIG.orchestration.defaultTitle;
    const description = getArg(args, '--description') ?? REVIEW_CONFIG.orchestration.defaultDescription;
    const storedRepoRoot = repoRoot();
    const storedCliPath = cliPath();
    const ignoredPatterns = loadReviewIgnore(storedRepoRoot);
    const input = await readReviewInputFromArgs(args, 'plan');
    const classification = classify(input.files, input.proposalContent);
    let changedFiles;
    let reviewTarget;
    if (input.reviewTarget.mode === 'diff' && input.rawInput) {
        if (input.reviewTarget.inputKind === 'diff') {
            // Split the full diff into per-file artifacts; store the diffs directory path
            const diffMap = splitAndCleanDiff(input.rawInput, ignoredPatterns);
            savePerFileDiffs(branch, diffMap, ignoredPatterns);
            // Parse hunk ranges so finding() can enforce line-level anchoring
            const hunksByPath = parseHunks(input.rawInput);
            // Build changedFiles with detected change types and hunks from the diff map
            changedFiles = [...diffMap.entries()].map(([path, { changeType }]) => ({
                path,
                changeType,
                hunks: hunksByPath.get(path) ?? [],
            }));
            reviewTarget = {
                ...input.reviewTarget,
                storedInputPath: diffDir(branch),
            };
        }
        else {
            // file-list input: persist as before; change type is unknown → default to 'modified'
            // No diff available → hunks left undefined; hunk check is skipped gracefully
            changedFiles = [...new Set(input.files)]
                .filter((f) => !isIgnored(f, ignoredPatterns))
                .map((path) => ({ path, changeType: 'modified' }));
            reviewTarget = {
                ...input.reviewTarget,
                storedInputPath: saveReviewTargetInput(branch, input.reviewTarget.inputKind, input.rawInput),
            };
        }
    }
    else if (input.reviewTarget.mode === 'base') {
        // --base flow: split the git diff into per-file diffs (even if empty)
        if (input.rawInput) {
            const diffMap = splitAndCleanDiff(input.rawInput, ignoredPatterns);
            savePerFileDiffs(branch, diffMap, ignoredPatterns);
            // Parse hunk ranges so finding() can enforce line-level anchoring
            const hunksByPath = parseHunks(input.rawInput);
            changedFiles = [...diffMap.entries()].map(([path, { changeType }]) => ({
                path,
                changeType,
                hunks: hunksByPath.get(path) ?? [],
            }));
        }
        else {
            // No diff available → hunks left undefined; hunk check is skipped gracefully
            changedFiles = [...new Set(input.files)]
                .filter((f) => !isIgnored(f, ignoredPatterns))
                .map((path) => ({ path, changeType: 'modified' }));
        }
        reviewTarget = {
            ...input.reviewTarget,
            diffsDir: diffDir(branch),
        };
    }
    else {
        // fallback: no diff available, use file list with 'modified' default
        changedFiles = [...new Set(input.files)]
            .filter((f) => !isIgnored(f, ignoredPatterns))
            .map((path) => ({ path, changeType: 'modified' }));
        reviewTarget = input.reviewTarget;
    }
    const plan = {
        branch,
        title,
        description,
        repoRoot: storedRepoRoot,
        cliPath: storedCliPath,
        changedFiles,
        reviewTarget,
        domainIds: classification.domains,
        domainsToSpawn: classification.domainNames,
        classification: classification.classification,
        subagents: classification.domainNames.map((domain) => ({
            domain,
            agent: REVIEW_CONFIG.orchestration.reviewerAgent,
            promptCommand: promptCommand(storedCliPath, branch, domain),
            spawnPrompt: createSpawnPrompt(storedCliPath, branch, domain),
        })),
    };
    savePlan(branch, toStoredPlan(plan));
    return plan;
}
function hasPlanInputSource(args) {
    return args.includes('--base') || args.includes('--diff');
}
export function renderPlan(plan) {
    return [
        '<REVIEW_PLAN_SUMMARY>',
        '<TARGET>',
        `branch_label: ${plan.branch}`,
        `changed_files_count: ${plan.changedFiles.length}`,
        `domains: ${plan.domainsToSpawn.join(', ')}`,
        '<TITLE>',
        plan.title,
        '</TITLE>',
        '<DESCRIPTION>',
        plan.description,
        '</DESCRIPTION>',
        '</TARGET>',
        '',
        '<CHANGED_FILES>',
        renderChangedFiles(plan.changedFiles),
        '</CHANGED_FILES>',
        '',
        '<SUBAGENTS>',
        renderSubagents(plan),
        '</SUBAGENTS>',
        '',
        '<ORCHESTRATOR_NEXT_STEPS>',
        'This summary is not the subagent spawn prompt.',
        `1. Run: ${planCommand(plan.cliPath, plan.branch)}`,
        '2. For each <SUBAGENT_TASK>, spawn the listed agent with exactly the text inside <PROMPT>.',
        `3. After all domain sessions finish, run: ${compileCommand(plan.cliPath, plan.branch)}`,
        '</ORCHESTRATOR_NEXT_STEPS>',
        '</REVIEW_PLAN_SUMMARY>',
    ].join('\n');
}
export function renderPlanTasks(plan) {
    const tasks = plan.subagents
        .map((subagent) => [
        '<SUBAGENT_TASK>',
        `agent: ${subagent.agent}`,
        `domain: ${subagent.domain}`,
        '<PROMPT>',
        subagent.spawnPrompt,
        '</PROMPT>',
        '</SUBAGENT_TASK>',
    ].join('\n'))
        .join('\n\n');
    return [
        '<SUBAGENT_TASKS>',
        '<ORCHESTRATOR_INSTRUCTIONS>',
        'This output is for the orchestrator only.',
        'Do not pass this entire output to a reviewer subagent.',
        'Spawn one subagent per <SUBAGENT_TASK>.',
        "Pass exactly the text inside that task's <PROMPT> block to the spawned subagent.",
        'The orchestrator must not execute the prompt commands itself.',
        '</ORCHESTRATOR_INSTRUCTIONS>',
        tasks,
        '<ORCHESTRATOR_AFTER_SUBAGENTS>',
        'After all spawned subagents finish, run:',
        compileCommand(plan.cliPath, plan.branch),
        '</ORCHESTRATOR_AFTER_SUBAGENTS>',
        '</SUBAGENT_TASKS>',
    ].join('\n');
}
export async function renderPlanTasksFromArgs(args) {
    const plan = hasPlanInputSource(args)
        ? await createPlanFromArgs(args)
        : loadPlan(requireArg(args, '--branch'));
    return renderPlanTasks(plan);
}
export function renderStoredPrompt(branch, domain) {
    const plan = loadPlan(branch);
    const assignedDomain = plan.subagents.find((subagent) => subagent.domain === domain);
    if (!assignedDomain) {
        throw new Error(`No stored plan task found for domain "${domain}" on branch "${branch}".`);
    }
    return createStoredPrompt(plan, domain);
}
