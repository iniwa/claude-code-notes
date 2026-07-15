# AGENTS.md

## Purpose
This file preserves the working agreement for using Codex to define intent and Claude Code to execute scoped implementation tasks.

## Project Shape
- Describe the entry point, runtime, languages, and deployment target.
- List the directories Codex and Claude Code should know about.

## Role Split / Model Policy
- Use GPT-5.3-Codex-Spark (`gpt-5.3-codex-spark`) proactively, when available, for low-risk, well-scoped, independently verifiable supporting work that requires no material design judgment or source-code implementation.
- GPT-5.6 Terra (`gpt-5.6-terra`) or Sol (`gpt-5.6-sol`) owns requirements and design. Whenever Terra is used, set its reasoning level to `high`. Prefer Sol for substantial ambiguity, risk, or cross-boundary reasoning.
- After design is fixed, delegate source-code implementation first to Claude Code Sonnet 5 at effort medium from the repository root: `claude -p --model sonnet --permission-mode auto "<handoff/task prompt>"`.
- Only when Sonnet 5 is unavailable because of usage limits or service availability, use GPT-5.6 Luna (`gpt-5.6-luna`) with reasoning level `max` for the same implementation slice.
- Implementation failure, failed verification, or a design question is not model unavailability. Return it to Codex instead of switching models.
- Apply this policy to every coordinating Codex model and its subagents; do not create coordinator-specific exceptions.
- Codex may keep requirements, design, read-only investigation, review, synthesis, and small documentation-consistency changes in one context.
- Claude Code subagents are optional and limited to clearly parallel mechanical work within the approved handoff.

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
- Preserve documented design decisions unless the user explicitly approves a change.
- Prefer small, scoped changes over broad rewrites.
- Keep responsibility boundaries stable.
- Do not introduce new abstractions unless they remove real complexity.
- Separate temporary workarounds from long-term design.
- Keep public content generic. Do not add secrets or private operational details.
- Do not commit, push, or deploy unless explicitly requested.

## Codex Workflow
1. Classify the request: new feature / existing adjustment / bug fix / docs / workflow rule.
2. Decide whether the change includes durable design intent.
3. If design-heavy, write or update the relevant decision in this file before implementation.
4. If execution-heavy, prepare a Claude Code handoff.
5. After implementation, review the diff for scope, consistency, and design drift.
6. Update `AGENTS.md` only when a rule should guide future sessions.

## Handoff Workflow
1. Codex reads the project context and resolves material design choices.
2. For substantive implementation, Codex saves one cohesive, independently verifiable slice under `docs/handoffs/YYYY-MM-DD-<short-task>.md`.
3. Codex delegates the next ready slice first to Sonnet 5. Luna at reasoning level `max` may implement that same slice only under the unavailability condition above.
4. The implementer edits and verifies only the current slice. Codex reviews the report and diff before preparing another.
5. Keep only active or blocked handoffs in `docs/handoffs/`; move completed handoffs to `docs/handoffs/archive/`.

Size the slice so the first intended edit is reachable after reading the listed files. Run unresolved discovery separately, and do not rerun an unchanged handoff after it times out before the intended edit.

## Codex Output Format For Claude Code
Save the handoff as `docs/handoffs/YYYY-MM-DD-<short-task>.md`. Create the directory if it does not exist. Use exactly this block.

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

## Codex Review Checklist
After Claude Code returns, review:
- Did the diff stay inside the handoff?
- Did any file outside `Files To Edit` change? If yes, was it necessary?
- Did the implementation preserve the stated constraints and non-goals?
- Did it introduce new UI classes or patterns without need?
- Did it keep the project static and dependency-free (if applicable)?
- Did verification run, and are blocked checks clearly explained?
- Does any discovery need to become a new `AGENTS.md` decision?
- After all implementation and follow-up are complete, was the handoff moved to `docs/handoffs/archive/`?
