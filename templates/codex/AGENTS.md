# AGENTS.md

## Purpose
This file preserves the working agreement for using Codex to define intent and delegate scoped implementation tasks.

## Instruction Precedence
When instructions conflict, apply them in this order:
1. Runtime, tool, organization, and safety policy.
2. Explicit user instructions that change project policy.
3. Durable project instructions.
4. Other instructions for the current task and its approved scope.

The active handoff or equivalent inline prompt is the approved task scope. Verified project facts override template defaults. Only an explicit user instruction to change project policy may revise a durable rule; other task scopes may narrow durable rules but may not weaken them. Report unresolved conflicts instead of guessing.

## Project Shape
- Describe the entry point, runtime, languages, and deployment target.
- List the directories Codex and Claude Code should know about.

## Role Split / Model Policy
- Before implementation, classify the initial route from acceptance evidence as `small-primary`, `bounded`, `adaptive`, or `non-implementation` (analysis, design, review, or operations). This does not force delegation; reclassify only after a material scope change or contract reset.
- Reintegrate through the stable diff and verification evidence; do not repeat delegated discovery merely to re-establish context.
- Identify a genuinely independent phase with its own acceptance and verification as a fresh Codex task or chat boundary.
- The user selects the primary model at runtime; do not require a named model or execution product.
- Keep requirements, design, and small documentation corrections in the primary context. Use one `bounded_implementer` for settled cohesive work when transfer helps, or `adaptive_implementer` directly when acceptance depends on unresolved platform, native lifecycle, or cross-layer behavior.
- Use `bounded_explorer` agents only for independent read-only discovery. Use a `bounded_reviewer` only for concrete material risk after the writer's stable self-review gate; if implementation changes, treat earlier review as diagnostic and refresh once when risk warrants it.
- Keep one active writer. After a second correction or two blocked/partial returns, reset the primary contract. If custom roles are unobservable, continue in the primary context or use an observable equivalent.
- Claude Code is not an approved route unless the user explicitly changes project policy.
- Prefer the smallest correct change and reuse existing or platform-native capabilities before adding dependencies or abstractions.

## Decision Rule
Keep the task in Codex when:
- the requirement is ambiguous
- the design intent is still being negotiated
- responsibility boundaries may change
- the change is small enough to implement and verify in the same context
- the main value is review, synthesis, or documentation consistency

Delegate when:
- the goal, files, constraints, and verification are clear
- the task is mostly editing work
- multiple files need mechanical updates
- native Codex delegation is useful
- Codex has already reduced the task to execution instructions

## Design Principles
- Preserve documented design decisions unless the user explicitly approves a change.
- Prefer small, scoped changes over broad rewrites.
- Keep responsibility boundaries stable.
- Do not introduce new abstractions unless they remove real complexity.
- Separate temporary workarounds from long-term design.
- Preserve unrelated user and other-agent changes and exclude unexpected diffs from the task.
- Do not inspect secrets, credentials, or personal data unless their contents are strictly necessary for the approved task.
- Do not edit secrets, credentials, `.env`, local settings, production data, runtime state, or generated heavy artifacts unless the approved task explicitly requires the change.
- Never reproduce secrets, credentials, personal data, or private infrastructure values in prompts, handoffs, reports, or external tools.
- Do not add dependencies or change build tooling, packaging, CI/CD, deployment, or external exposure outside the approved task scope.
- Keep public content generic. Do not add secrets or private operational details.
- Do not commit, push, or deploy unless explicitly requested.

## Codex Workflow
1. Classify the request: new feature / existing adjustment / bug fix / docs / workflow rule.
2. Decide whether the change includes durable design intent.
3. If design-heavy, write or update the relevant decision in this file before implementation.
4. If execution-heavy, prepare a scoped native Codex handoff.
5. After implementation, review the diff for scope, consistency, and design drift.
6. Update `AGENTS.md` only when a rule should guide future sessions.

## Handoff Workflow
1. Codex reads the project context and resolves material design choices.
2. For substantive implementation, Codex saves one cohesive, independently verifiable slice under `docs/handoffs/YYYY-MM-DD-<short-task>.md` after its goal, files, constraints, non-goals, data sources, acceptance criteria, and verification are clear.
3. Codex delegates the next ready slice to the selected native Codex role.
4. The implementer edits and verifies only the current slice. Codex reviews the report and diff before preparing another.
5. Keep only active or blocked handoffs in `docs/handoffs/`; move completed handoffs to `docs/handoffs/archive/`.

Size the slice so the first intended edit is reachable after reading the listed files. Run unresolved discovery separately, and do not rerun an unchanged handoff after it times out before the intended edit.
Treat a run that ends before meeting its acceptance criteria as interrupted rather than complete. Record usable partial results, remaining work, and the resume condition before narrowing or resuming it.

## Codex Output Format For Claude Code
Save the handoff as `docs/handoffs/YYYY-MM-DD-<short-task>.md`. Create the directory if it does not exist. Use exactly this block.

```md
Read AGENTS.md, CLAUDE.md, and this handoff file before implementation.
If implementation would violate constraints or require files outside this handoff, stop and ask before editing.

## Goal
...

## Background
...

## Acceptance Criteria
- ...

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
- Partial edits left in the worktree, if any
- Subagent usage
- Design questions for Codex
```

## Codex Review Checklist
After Claude Code returns, review:
- Did the diff stay inside the handoff?
- Did any file outside `Files To Edit` change? If yes, was it necessary?
- Did the implementation preserve the stated constraints and non-goals?
- Did it introduce new UI classes or patterns without need?
- Did it keep the project static and dependency-free (if applicable)?
- Did verification run, and are blocked checks clearly explained?
- If the slice was interrupted, are completed work, remaining work, and the resume condition explicit?
- Does any discovery need to become a new `AGENTS.md` decision?
- After all implementation and follow-up are complete, was the handoff moved to `docs/handoffs/archive/`?
