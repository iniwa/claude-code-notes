# AGENTS.md

## Purpose

This is the Codex-side working agreement for `ai-coding-notes`, a public reference site for AI-assisted coding workflows and reusable examples.

`AGENTS.md` owns design intent, model and handoff policy, Codex review, and documentation lifecycle. `CLAUDE.md` owns implementation, verification, and reporting rules.

## Project Facts

- Runtime: a static HTML, CSS, and vanilla JavaScript SPA with no build step or package manager.
- Entry point: `index.html`.
- Shared styles and client behavior: `css/style.css` and `js/app.js`.
- Page content: `sections/**/*.html`.
- Public reusable examples: `templates/**/*.md` and `templates/**/*.json`.
- Deployment configuration: `wrangler.toml`, serving the repository root as Cloudflare static assets.
- `docs/README.md` is the source of truth for repository structure and documentation placement.

## Model and Role Policy

- Use GPT-5.3-Codex-Spark (`gpt-5.3-codex-spark`) proactively, when available, for low-risk, well-scoped, independently verifiable supporting work that requires no material design judgment or source-code implementation.
- GPT-5.6 Terra (`gpt-5.6-terra`) or Sol (`gpt-5.6-sol`) owns requirements and design. Whenever Terra is used, set its reasoning level to `high`. Prefer Sol for substantial ambiguity, risk, or cross-boundary reasoning.
- After design is fixed, delegate source-code implementation first to Claude Code Sonnet 5 at effort medium from the repository root: `claude -p --model sonnet --permission-mode auto "<handoff/task prompt>"`.
- Only when Sonnet 5 is unavailable because of usage limits or service availability, use GPT-5.6 Luna (`gpt-5.6-luna`) with reasoning level `max` for the same implementation slice.
- Implementation failure, failed verification, or a design question is not model unavailability; return it to Codex.
- Apply this policy to every coordinating Codex model and its subagents. Do not create coordinator-specific exceptions.
- Codex may keep requirements, design, read-only investigation, review, synthesis, and small documentation-consistency changes in one context.
- Claude Code subagents are optional and limited to clearly parallel mechanical work inside the approved handoff.

## Durable Project Rules

- Keep the site static, lightweight, and dependency-free. Do not add a framework, package manager, bundler, or build system unless explicitly requested.
- Preserve the existing navigation, section loader, HTML structure, and shared UI patterns such as `.card`, `.card-grid`, `.template`, `.workflow`, `.wf-step`, and `.file-tree`.
- When adding or renaming a section, update its content file, the `SECTIONS` registry in `js/app.js`, the navigation in `index.html`, and the matching section container in `index.html`.
- Keep user-facing content concise and primarily Japanese unless the surrounding public example is intentionally English.
- Treat all site content and files under `templates/` as public. Keep them generic and free of credentials, private hosts, machine-specific paths, and private operational details.
- Keep operational documentation under `docs/` according to `docs/README.md`; do not mix it with site content or public templates.
- Do not change `wrangler.toml`, Cloudflare deployment behavior, domains, CI/CD, or external exposure unless explicitly requested.
- Do not edit `.claude/settings.local.json` or generated `.wrangler/` state unless the task explicitly requires it.
- Preserve unrelated changes. Do not commit, push, or deploy unless explicitly requested.

## Handoff Workflow

- Keep policy, design, review, read-only investigation, and small documentation corrections in Codex.
- One handoff covers one cohesive, independently verifiable change and its focused verification. Run unresolved discovery as a separate read-only slice.
- State the goal, files to inspect and edit, constraints, non-goals, concrete data sources, verification, and expected report.
- If a handoff times out before its intended edit, do not rerun it unchanged. Narrow the behavior, files, and verification first.
- The implementer works only on the current slice and returns design questions to Codex. Codex reviews the report and diff before starting another slice.
- Store active or blocked handoffs under `docs/handoffs/`. After implementation, verification, review, required runtime work, and follow-up are complete, move the handoff to `docs/handoffs/archive/`.

## Verification and Review

Use the smallest check that demonstrates the scoped change:

- Run `git diff --check` for every change.
- For content or navigation changes, serve the repository with `python -m http.server 8787 --bind 127.0.0.1` and inspect the affected page.
- For JavaScript changes, exercise the affected interaction and inspect relevant browser console output.
- For public templates, confirm that examples remain generic and internally consistent.

During review, confirm that the diff stayed in scope, preserved the static architecture and public/private boundary, introduced no unapproved dependency or deployment change, and reported blocked verification explicitly.

## Documentation Lifecycle

- Keep this file limited to short, current, durable rules and links.
- Put detailed decisions and evidence in `docs/decisions/`.
- Follow `docs/README.md` for documentation placement and the active/archive handoff lifecycle.
- Put reusable procedures in an appropriate `docs/` location.
- Do not rewrite historical documentation merely to match a newer shared policy.
