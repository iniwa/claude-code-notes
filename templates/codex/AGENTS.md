# AGENTS.md

## Purpose
This file preserves design continuity for Codex-assisted planning and review.

When creating a new project, use the base files in `D:\Git\CLAUDEmdStrage\_base` as the starting point, then adapt this file to the project.

Codex is responsible for:
- clarifying requirements
- deciding whether work should stay in Codex or be handed off to Claude Code
- preserving existing design intent
- recording architectural decisions
- implementing scoped changes when keeping design, edits, verification, and review in one context is safer
- preparing implementation handoffs for Claude Code when the task is clear and execution-heavy
- reviewing implementation diffs against documented design constraints

Claude Code is responsible for:
- implementing the current handoff when the scope, constraints, and verification are clear
- following `CLAUDE.md`
- reporting any implementation pressure that may require a design update

## Project Summary
- Project name:
- Purpose:
- Runtime target:
- Repository path:
- Deployment target:

## Decision Rule
Keep the task in Codex when:
- requirements are ambiguous
- design intent is still being negotiated
- responsibility boundaries may change
- the change is small enough to implement and verify in one context

Hand off to Claude Code when:
- goal, files, constraints, non-goals, and verification are clear
- the task is mostly implementation or mechanical editing
- the allowed edit scope can be stated explicitly
- Claude Code-specific workflow, hooks, or subagents would be useful

## Design Principles
- Preserve documented design decisions unless the user explicitly approves a change.
- Prefer small, scoped changes over broad rewrites.
- Keep responsibility boundaries stable.
- Do not introduce new abstractions unless they remove real complexity or match an existing project pattern.
- Separate temporary workarounds from long-term design.

## Handoff Workflow
1. Codex reads project context, `AGENTS.md`, `CLAUDE.md`, and relevant files.
2. Codex decides whether the task is ready for handoff.
3. Codex writes a concrete handoff file under `docs/handoffs/`.
4. Codex reports the handoff file path to the user.
5. The user gives that file path to Claude Code.
6. Claude Code reads the handoff file, implements, and reports back.
7. Codex reviews the report and/or diff.

## Decision Log

### YYYY-MM-DD: Decision Title

Context:
- What problem or requirement caused this decision?

Decision:
- What did we decide?

Alternatives Considered:
- What did we reject?

Reason:
- Why is this the right tradeoff for now?

Constraints Introduced:
- What should future implementation preserve?

Do Not Change Casually:
- What would cause design drift if changed without review?

## Claude Code Handoff Template

Use this template when Claude Code is the better execution environment. Save it as `docs/handoffs/YYYY-MM-DD-<short-task>.md`. If the task is still ambiguous or design-heavy, keep it in Codex until the constraints are clear.

### Goal
Describe the implementation goal.

### Change Type
New feature / behavior adjustment / bug fix / refactor / documentation.

### Design Intent
Describe why the change should be implemented this way.

### Files To Inspect
- path/to/file

### Files To Edit
- path/to/file

### Constraints
- Preserve existing public APIs unless explicitly approved.
- Keep business logic out of UI components unless the project already follows that pattern.
- Do not change persistence, authentication, or deployment behavior unless listed in the handoff.

### Non Goals
- List changes that should not be made during this task.

### Verification
- List build, lint, test, or manual checks.

### Expected Report
Claude Code should report:
- changed files
- implementation summary
- verification results
- any design constraints that could not be preserved

## Codex Review Checklist
- Does the diff match the stated design intent?
- Did implementation introduce a new responsibility boundary?
- Did a local shortcut become an implicit architecture rule?
- Did implementation change behavior outside the handoff?
- Did any file outside `Files To Edit` change, and was it necessary?
- Were verification results reported clearly?
- Should `AGENTS.md` or `docs/` be updated with a new decision?
