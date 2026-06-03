---
description: Fix a PR - triage comments, fix issues, run verification, code review, push, re-request reviews
---

Load the `fixing-pull-requests` skill and follow its full workflow for this PR.

**PR:** `$1` (URL or number)

## Checkout

!`gh pr checkout "$1" && git pull`

## Pre-fetched PR data

!`PR_NUM=$(gh pr view "$1" --json number -q .number) && echo "PR number resolved: $PR_NUM"`

### PR summary
!`gh pr view "$1" --json number,title,state,reviewDecision,mergeable,headRefName,baseRefName,isDraft --jq '"PR #\(.number): \(.title)\nState: \(.state) | Review: \(.reviewDecision) | Mergeable: \(.mergeable) | Draft: \(.isDraft)\nBranch: \(.headRefName) -> \(.baseRefName)"'`

### Reviews
!`gh pr view "$1" --json reviews --jq '.reviews[] | "[\(.author.login)] \(.state): \(.body[0:150])"'`

### Inline review comments (unresolved)
!`PR_NUM=$(gh pr view "$1" --json number -q .number) && OWNER=$(gh repo view --json owner -q .owner.login) && REPO=$(gh repo view --json name -q .name) && gh api graphql -F number="$PR_NUM" -f query='query($number: Int!) { repository(owner: "'"$OWNER"'", name: "'"$REPO"'") { pullRequest(number: $number) { reviewThreads(first: 100) { nodes { id isResolved comments(first: 3) { nodes { id author { login } body path line } } } } } } }' --jq '[.data.repository.pullRequest.reviewThreads.nodes[] | select(.isResolved == false)] | .[] | "Thread \(.id) [\(.comments.nodes[0].author.login)] \(.comments.nodes[0].body[0:200])\n"'`

### CI checks
!`gh pr checks "$1" 2>/dev/null || echo "CI checks unavailable"`

---

The branch has been checked out and PR data pre-fetched above. Skip re-fetching what's already here. Proceed with the skill workflow starting from Step 2 (gather any remaining data not pre-fetched), then Step 3 (assess comments).
