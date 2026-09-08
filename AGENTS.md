# AGENTS.md

This entry governs the public static reference site for AI-assisted coding workflows.

## Verified project facts
- Static HTML, CSS, and vanilla JavaScript SPA; no build step or package manager.
- Entry: index.html. Shared behavior: js/app.js; styles: css/style.css; content: sections/**/*.html.
- Public reusable examples are templates/**/*.md and templates/**/*.json. docs/README.md governs operational documentation.
- wrangler.toml serves the repository root as Cloudflare static assets.

## Project rules
Preserve navigation, section registry/loader, HTML structure, and established classes (.card, .card-grid, .template, .workflow, .wf-step, .file-tree). Section additions or renames update content, js/app.js SECTIONS, navigation, and matching container. Keep public content concise, primarily Japanese, generic, and free of private values. Do not alter wrangler.toml, deployment, domains, CI/CD, or exposure without explicit scope.

## Authority and scope
Apply runtime, tool, organization, and safety policy, then explicit user policy, then this entry and the approved task. Verified repository facts replace defaults; they do not grant authorization. Preserve unrelated work and stop on an overlap that requires guessing.

## Execution
Choose the smallest correct change. Default to primary execution. The primary owns design, implementation, related discovery, verification, corrections, and final acceptance at any task size. Before implementation, decide whether to delegate, then choose the role and route: `small-primary` means direct primary work of any size; `bounded` means one delegated writer handles a settled cohesive outcome; `adaptive` means one delegated writer handles material native/platform or cross-system acceptance uncertainty; `non-implementation` covers analysis, design, review, or operations. Classification does not force delegation. delegate autonomously within existing authority only when replacing primary work lowers expected total effort including handoff, communication, waiting, integration, verification, and corrections, or when a named material risk or mandatory independent verification gate warrants it. Size or technical uncertainty alone is insufficient; routine direct work needs no per-task justification. Use one `bounded_implementer` for settled cohesive work and `adaptive_implementer` for the corresponding uncertainty, `bounded_explorer` only for independently valuable read-only discovery, and `bounded_reviewer` only for a named material risk or existing mandatory gate. The user's runtime model and effort remain authoritative and role configuration owns role settings. Keep one writer for overlapping files; delegated writers do not redelegate. The primary may reclaim any size before correction thresholds when remaining primary work is lower effort or delegation is unavailable, but first confirms child writes stopped, ownership returned, and acceptance, protected boundaries, authority, environment, and evidence are reset. Do not research, rerun checks, or inspect an unstable candidate merely to fill waiting time; continue useful in-scope work or wait for a substantive notification. A changed candidate after review must be restabilized; after a second correction or two qualifying blocked or partial returns, reset the contract before continuing. Persisted handoffs are for named cross-session, interruption-sensitive, risky, or separately executed work; otherwise use the approved inline scope. Optional cheap direct regression tests are appropriate when they materially support changed behavior; do not require a new harness or full suite by default.

## Safety
Do not inspect or edit secrets, credentials, local settings, runtime or production state, generated heavy artifacts, dependencies, CI/CD, deployment, publication, or external exposure unless explicitly in scope. Never reproduce private values. Do not commit, push, or publish unless explicitly requested. Report source readiness separately from unavailable runtime verification.

## Completion
Review the stable diff against every criterion and protected behavior, verify affected references and Markdown fences, run the smallest relevant checks plus git diff --check, and report changed files, evidence, blocked checks, partial edits, and unresolved questions.

## Checks
For content or navigation changes, run python -m http.server 8787 --bind 127.0.0.1 and inspect the affected page. For public templates, check genericity and internal consistency.
For incomplete delegated work, report the blocker, resume condition, and next owner/action. Requested model or effort is configuration context, not execution evidence; unknown stays unknown, with no diagnostic-only agents or probes to fill observation fields. After stable-diff review, read deeper only for gaps, conflicts, or concrete risk; rerun checks only for a mandatory contract, changed target or assumption, insufficient evidence, or integration risk. Return concise results and evidence references without raw logs or unchanged inventories. While children run, continue useful work within existing ownership and parallelism rules; otherwise wait for notifications. Do not add research/checks, inspect a changing candidate, or repeat liveness polling, rereads, or state updates merely to fill the wait or observe liveness. Respond to errors, inconsistent state, and user steering, and follow host progress rules.

Existing mandatory independent and multi-reviewer gates remain in force.
