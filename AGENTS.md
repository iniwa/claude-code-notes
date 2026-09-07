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
Choose the smallest correct change. The user selects the runtime model and effort; role configuration owns model, effort, and role instructions. Use one bounded writer for settled work, adaptive implementation only for material native/platform uncertainty, and read-only exploration or review only when independently useful. Keep one writer for overlapping files. A changed candidate after review must be restabilized; after a second correction or two blocked returns, reset the contract before continuing. Persisted handoffs are for named cross-session, interruption-sensitive, risky, or separately executed work; otherwise use the approved inline scope. Optional cheap direct regression tests are appropriate when they materially support changed behavior; do not require a new harness or full suite by default.

## Safety
Do not inspect or edit secrets, credentials, local settings, runtime or production state, generated heavy artifacts, dependencies, CI/CD, deployment, publication, or external exposure unless explicitly in scope. Never reproduce private values. Do not commit, push, or publish unless explicitly requested. Report source readiness separately from unavailable runtime verification.

## Completion
Review the stable diff against every criterion and protected behavior, verify affected references and Markdown fences, run the smallest relevant checks plus git diff --check, and report changed files, evidence, blocked checks, partial edits, and unresolved questions.

## Checks
For content or navigation changes, run python -m http.server 8787 --bind 127.0.0.1 and inspect the affected page. For public templates, check genericity and internal consistency.
For incomplete delegated work, report the blocker, resume condition, and next owner/action. Requested model or effort is configuration context, not execution evidence; unknown stays unknown, with no diagnostic-only agents or probes to fill observation fields. After stable-diff review, read deeper only for gaps, conflicts, or concrete risk; rerun checks only for a mandatory contract, changed target or assumption, insufficient evidence, or integration risk. Return concise results and evidence references without raw logs or unchanged inventories. While children run, continue useful work within existing ownership and parallelism rules; otherwise wait for notifications. Avoid liveness-only polling, rereads, or state rewrites; respond to errors, inconsistent state, and user steering, and follow host progress rules.
