# AGENTS.md

## Purpose

This is the Codex-side working agreement for `ai-coding-notes`, a public reference site for AI-assisted coding workflows and reusable examples.

`AGENTS.md` owns design intent, model and handoff policy, Codex review, and documentation lifecycle. `CLAUDE.md` provides compatibility guidance for implementation, verification, and reporting.

## Project Facts

- Runtime: a static HTML, CSS, and vanilla JavaScript SPA with no build step or package manager.
- Entry point: `index.html`.
- Shared styles and client behavior: `css/style.css` and `js/app.js`.
- Page content: `sections/**/*.html`.
- Public reusable examples: `templates/**/*.md` and `templates/**/*.json`.
- Deployment configuration: `wrangler.toml`, serving the repository root as Cloudflare static assets.
- `docs/README.md` is the source of truth for repository structure and documentation placement.

## Instruction Precedence

When instructions conflict, apply them in this order:

1. Runtime, tool, organization, and safety policy.
2. Explicit user instructions that change project policy.
3. Durable project instructions.
4. Other instructions for the current user task and the approved task scope.

The active handoff or equivalent inline prompt is the approved task scope. Verified project facts override shared defaults. A task scope may narrow durable rules but may not weaken them; only an explicit user instruction to change project policy may revise a durable rule. Report unresolved conflicts instead of guessing.

## Model and Role Policy

- Before implementation, classify the initial route from acceptance evidence as `small-primary` for small or transfer-negative work, `bounded` for settled multi-step work with one verifiable writer, `adaptive` when unresolved native/platform/runtime or cross-subsystem behavior is material, or `non-implementation` for analysis, design, review, or operations. This does not force delegation; reclassify only after a material scope change or contract reset.
- Reintegrate through the stable diff and verification evidence; do not repeat delegated discovery merely to re-establish context.
- Identify a genuinely independent phase with its own acceptance and verification as a fresh Codex task or chat boundary.
- Use GPT-5.6 Sol as the preferred main worker; the user's actual runtime model and reasoning choice remains authoritative. Sol owns intent, design, approval boundaries, integration, and user communication and can directly finish small or transfer-negative work. Use configured Luna roles (`bounded_explorer`/`bounded_implementer`) for bounded work and Terra roles (`adaptive_implementer`/`bounded_reviewer`) for adaptive implementation or risk-justified review; do not force delegation or pin the main reasoning level in project instructions.
- Keep requirements, design, and small documentation corrections in the primary context. Ordinary delegation uses native Codex agents: one `bounded_implementer` for settled cohesive work when transfer helps, or `adaptive_implementer` directly when acceptance depends on unresolved platform, native lifecycle, or cross-layer behavior.
- Use `bounded_explorer` agents only for genuinely independent read-only discovery. Use a `bounded_reviewer` only for a concrete material correctness, security, compatibility, or verification risk, and only after the writer's stable self-review gate. If implementation changes after review starts, treat that review as diagnostic and run one fresh final review only when risk warrants it.
- Keep one active writer for overlapping files. After a second correction round, or two blocked/partial returns, reset the primary contract (acceptance, boundaries, authority, and environment) before continuing. If custom roles are not observable, keep the work in the primary context or use an observable equivalent.
- Claude Code is not an approved execution route unless the user explicitly changes project policy.
- Prefer the smallest correct change and reuse existing or platform-native capabilities before adding dependencies or abstractions.

## Durable Project Rules

- Keep the site static, lightweight, and dependency-free. Do not add a framework, package manager, bundler, or build system unless explicitly requested.
- Preserve the existing navigation, section loader, HTML structure, and shared UI patterns such as `.card`, `.card-grid`, `.template`, `.workflow`, `.wf-step`, and `.file-tree`.
- When adding or renaming a section, update its content file, the `SECTIONS` registry in `js/app.js`, the navigation in `index.html`, and the matching section container in `index.html`.
- Keep user-facing content concise and primarily Japanese unless the surrounding public example is intentionally English.
- Treat all site content and files under `templates/` as public. Keep them generic and free of credentials, private hosts, machine-specific paths, and private operational details.
- Keep operational documentation under `docs/` according to `docs/README.md`; do not mix it with site content or public templates.
- Do not change `wrangler.toml`, Cloudflare deployment behavior, domains, CI/CD, or external exposure unless explicitly requested.
- Do not inspect secrets, credentials, or personal data unless their contents are strictly necessary for the approved task.
- Do not edit secrets, credentials, `.env`, local settings, production data, runtime state, generated heavy artifacts, `.claude/settings.local.json`, or generated `.wrangler/` state unless the approved task explicitly requires the change.
- Never reproduce secrets, credentials, personal data, or private infrastructure values in prompts, handoffs, reports, public content, or external tools.
- Preserve unrelated user and other-agent changes. Treat unexpected diffs as having unknown authorship and keep them outside the current task.
- Do not add dependencies or change build tooling, packaging, CI/CD, deployment, or external exposure outside the approved task scope.
- Do not commit or push unless explicitly requested. Public deployment remains outside this documentation-only scope.

## Handoff Workflow

- Keep policy, design, review, read-only investigation, and small documentation corrections in Codex.
- One handoff covers one cohesive, independently verifiable change and its focused verification. Run unresolved discovery as a separate read-only slice.
- Delegate only after the goal, files to inspect and edit, constraints, non-goals, concrete data sources, acceptance criteria, verification, and expected report are clear and material design choices are resolved.
- If a handoff times out before its intended edit, do not rerun it unchanged. Narrow the behavior, files, and verification first.
- The implementer works only on the current slice and returns design questions to Codex. A run that ends before meeting its acceptance criteria is interrupted, not complete; report usable partial results, remaining work, and the resume condition. Codex reviews the report and diff before starting another slice.
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

Definition of done: task-owned documentation is consistent, links and Markdown fences validate, protected project facts remain intact, and focused checks pass or are explicitly reported blocked.

## Personal-Use Iteration

- Treat routine changes as personal-use iteration by default unless a verified project requirement or protected public-content, rights, human-approval, or data gate is stronger. Start with the smallest useful documentation change and, when useful, a brief reference, format, or sample check. This documentation-only project does not gain runtime deployment permission or public publication authority from this rule; preserve its existing gates.
- This allowance covers bounded reversible work only. Preserve gates for credentials, authentication, permissions, external exposure, live data, infrastructure or cost, publication or release, and other project-specific protected behavior. Do not require speculative edge-case matrices, defensive hardening, or a full suite merely to permit ordinary iteration.
- If a target, check, or required approval is unavailable, distinguish source readiness from verified operation. Only important REQUIRED deferred checks belong in the existing issue or ledger, with their verification, approval, and resume conditions; optional or unnecessary checks do not create issues. Reconcile any operational checklist with the exact approval scope and conditions without weakening permanent prohibitions. For documentation-only changes, use the smallest relevant reference, fence, format, or sample check; do not invent an application runtime.
- If a project-required safety or approval review must precede application, return the stable source or diff with applicable pre-application checks first; runtime application and smoke are not run, passed, or complete until that gate clears. Ordinary work does not acquire review solely because optional checks were omitted.
