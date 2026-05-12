# AGENTS.md

## Purpose
This file preserves the working agreement for using Codex to define intent and Claude Code to execute scoped implementation tasks in this repository.

The repository is a public reference site for iniwa's AI coding workflow. It documents how to use Codex and Claude Code together, plus related templates and Claude Code settings.

## Project Shape
- Static HTML SPA with no build step.
- Entry point: `index.html`
- Styles: `css/style.css`
- Client logic: `js/app.js`
- Content sections: `sections/**/*.html`
- Public templates: `templates/**/*.md` and `templates/**/*.json`
- Deployment config: `wrangler.toml`

When adding a new section, update all of:
- `sections/<area>/<name>.html` or `sections/<name>.html`
- `js/app.js` `SECTIONS`
- `index.html` navigation
- `index.html` `<main>` section placeholder

## Role Split
Codex is responsible for:
- clarifying the user's goal and change type
- deciding whether the task should remain in Codex or be handed off to Claude Code
- preserving design intent across edits
- preparing Claude Code handoffs with clear scope, constraints, and verification
- reviewing implementation diffs against this file and the handoff
- updating this file when a reusable design decision or workflow rule is introduced

Claude Code is responsible for:
- implementing clear, scoped handoffs
- following `CLAUDE.md`
- keeping changes inside the allowed files and constraints
- running the requested verification where possible
- reporting changed files, verification results, and any design pressure that requires Codex review

Do not treat this as "Codex only designs, Claude Code only implements." Codex may implement small or design-sensitive changes directly. Use Claude Code when the implementation is clear, execution-heavy, repetitive, or benefits from Claude Code-specific tooling.

## Decision Rule
Keep the task in Codex when:
- the requirement is ambiguous
- the design intent is still being negotiated
- responsibility boundaries may change
- the change is small enough to implement and verify in the same context
- the main value is review, synthesis, or documentation consistency

Hand off to Claude Code when:
- the goal, files, constraints, and verification are clear
- the task is mostly editing work
- multiple files need mechanical updates
- Claude Code's CLI workflow, hooks, or subagents are useful
- Codex has already reduced the task to execution instructions

## Design Principles
- Keep the site static and lightweight. Do not add a build system, framework, package manager, or bundler unless explicitly requested.
- Reuse existing UI patterns: `.card`, `.card-grid`, `.template`, `.workflow`, `.wf-step`, `.file-tree`, and existing navigation structure.
- Keep content concise and reference-like. This is not a marketing site.
- Prefer Japanese for user-facing content unless the surrounding template is intentionally English.
- Keep public content generic. Do not add personal secrets, API keys, private hostnames beyond already documented public examples, or private operational details.
- Do not modify `.claude/settings.local.json` unless the user explicitly asks for local Claude permission changes.
- Do not commit changes automatically. Leave commits to the user unless explicitly requested.

## Codex Workflow
1. Classify the request: new section, content update, template update, UI change, workflow rule, or bug fix.
2. Decide whether the change includes durable design intent.
3. If design-heavy, write or update the relevant decision in this file before implementation.
4. If execution-heavy, prepare a Claude Code handoff.
5. After implementation, review the diff for scope, consistency, and design drift.
6. Update `AGENTS.md` only when a rule should guide future sessions.

## Design Record Scope
Keep `AGENTS.md` focused on short, durable rules that future Codex and Claude Code sessions must follow.

Do not add `Alternatives Considered` as a default Decision Log heading. When rejected options or longer background matter, summarize only the durable rule in `AGENTS.md` and put the detail under `docs/decisions/`.

## Project Documentation
Use `docs/README.md` as the source of truth for repository structure and `docs/` placement rules.

- Put site content in `sections/` and public reusable templates in `templates/`.
- Put operational repository documentation under `docs/`.
- Put Claude Code implementation handoffs under `docs/handoffs/`.
- Put longer design background and decision records under `docs/decisions/`.
- Add new `docs/` subdirectories only when the content has a distinct lifecycle that does not fit existing folders.

## Handoff Workflow
When the user wants to use the "Codex specifies, Claude Code executes" flow:

1. Codex reads the relevant repository context.
2. Codex writes a handoff file under `docs/handoffs/` using the template below.
3. Codex reports the handoff file path to the user.
4. The user gives that file path to Claude Code.
5. Claude Code reads the handoff file, implements, and returns its report.
6. The user brings Claude Code's report and/or diff back to Codex.
7. Codex reviews the result against the handoff and this file.

Codex should not hand off vague requests. Before handing off, reduce the work to a concrete implementation task with known files, constraints, non-goals, and verification.

## Codex Output Format For Claude Code
When preparing a handoff, create `docs/handoffs/YYYY-MM-DD-<short-task>.md`. Create the `docs/handoffs/` directory if it does not exist. The file should contain only the following block unless the user asks for explanation around it.

```md
Read AGENTS.md, CLAUDE.md, and this handoff file before implementation.
If implementation would violate constraints or require files outside this handoff, stop and ask before editing.

## Goal
...

## Background
...

## Files To Inspect
- ...

## Files To Edit
- ...

## Constraints
- ...

## Non Goals
- ...

## Verification
- ...

## Expected Report
- Changed files
- Summary
- Verification results
- Blocked checks
- Design questions for Codex
```

## Claude Code Handoff Template
Use this when Claude Code should perform the implementation. Save it as `docs/handoffs/YYYY-MM-DD-<short-task>.md`. Save it as `docs/handoffs/YYYY-MM-DD-<short-task>.md`.

```md
Read AGENTS.md, CLAUDE.md, and this handoff file before implementation.
If implementation would violate constraints or require files outside this handoff, stop and ask before editing.

## Goal
Describe the concrete change.

## Background
Summarize the Codex-side decision and why this change is being made.

## Files To Inspect
- path/to/file

## Files To Edit
- path/to/file

## Constraints
- Keep the site static; do not add build tooling.
- Follow existing HTML/CSS/JS patterns.
- Do not modify unrelated sections.
- Do not commit automatically.

## Non Goals
- List anything that must stay out of scope.

## Verification
- Run a local static server if needed.
- Check changed section URLs return HTTP 200.
- Run `git diff --check`.

## Expected Report
- Changed files
- Summary
- Verification results
- Any blocked checks
- Any design questions for Codex
```

## Codex Review Checklist
After Claude Code returns, review:
- Did the diff stay inside the handoff?
- Did any file outside `Files To Edit` change? If yes, was it necessary?
- Did the implementation preserve the stated constraints and non-goals?
- Did it introduce new UI classes or patterns without need?
- Did it keep the site static and dependency-free?
- Did it update all required wiring for section additions?
- Did verification run, and are blocked checks clearly explained?
- Does any discovery need to become a new `AGENTS.md` decision?

## Decision Log

### 2026-05-12: Document repository structure and docs placement

Context:
- The project needs an explicit reference for repository-wide rules, folder responsibilities, and where to put operational documents.

Decision:
- `docs/README.md` is the source of truth for the project tree and `docs/` placement rules.
- `AGENTS.md` keeps only the short durable rule that future Codex and Claude Code sessions should follow.

Reason:
- This keeps working rules discoverable without turning `AGENTS.md` into a long repository guide.

Constraints Introduced:
- Do not mix site content, public templates, handoffs, and decision records into the same directory.
- Prefer existing `docs/handoffs/` and `docs/decisions/` before creating new `docs/` subdirectories.

Do Not Change Casually:
- Do not move long project structure documentation back into `AGENTS.md` unless it becomes a short execution rule.

### 2026-05-07: Use Codex as planning owner and Claude Code as scoped executor

Context:
- The project originally described the split as "Codex designs, Claude Code implements."
- In practice, Codex can also edit, verify, and review. A fixed role split is too rigid.

Decision:
- Codex owns intent, constraints, handoff quality, and design continuity.
- Claude Code executes clear, scoped implementation work based on Codex handoffs.
- Codex may implement directly when the task is small, ambiguous, or design-sensitive.

Reason:
- This keeps ambiguous work in the tool best suited for clarification and review.
- It still uses Claude Code where its execution workflow is valuable.

Constraints Introduced:
- Claude Code tasks should include goal, files, constraints, non-goals, and verification.
- Design-impacting discoveries from Claude Code should return to Codex before becoming durable rules.

Do Not Change Casually:
- Do not return to a rigid "Codex only designs / Claude Code only edits" rule.
