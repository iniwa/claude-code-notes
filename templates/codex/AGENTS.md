# AGENTS.md

## Purpose
This file preserves the working agreement for using Codex to define intent and Claude Code to execute scoped implementation tasks.

## Project Shape
- Describe the entry point, runtime, languages, and deployment target.
- List the directories Codex and Claude Code should know about.

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
- Preserve documented design decisions unless the user explicitly approves a change.
- Prefer small, scoped changes over broad rewrites.
- Keep responsibility boundaries stable.
- Do not introduce new abstractions unless they remove real complexity.
- Separate temporary workarounds from long-term design.
- Keep public content generic. Do not add secrets or private operational details.
- Do not commit changes automatically.

## Codex Workflow
1. Classify the request: new feature / existing adjustment / bug fix / docs / workflow rule.
2. Decide whether the change includes durable design intent.
3. If design-heavy, write or update the relevant decision in this file before implementation.
4. If execution-heavy, prepare a Claude Code handoff.
5. After implementation, review the diff for scope, consistency, and design drift.
6. Update `AGENTS.md` only when a rule should guide future sessions.

## Handoff Workflow
1. Codex reads project context, `AGENTS.md`, `CLAUDE.md`, and relevant files.
2. Codex writes a handoff file under `docs/handoffs/` using the template below.
3. Codex reports the handoff file path to the user.
4. The user gives that file path to Claude Code.
5. Claude Code reads the handoff file, implements, and returns its report.
6. Codex reviews the report and/or diff against the handoff and this file.

Codex should not hand off vague requests. Reduce the work to a concrete implementation task with known files, constraints, non-goals, and verification before handing off.

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

## Decision Log

### YYYY-MM-DD: Decision Title

Context:
- What problem or requirement caused this decision?

Decision:
- What did we decide?

Reason:
- Why is this the right tradeoff for now?

Constraints Introduced:
- What should future implementation preserve?

Do Not Change Casually:
- What would cause design drift if changed without review?
