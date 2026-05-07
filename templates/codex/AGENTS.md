# AGENTS.md

## Purpose
This file preserves design continuity for Codex-assisted planning and review.

Codex is responsible for:
- clarifying requirements
- preserving existing design intent
- recording architectural decisions
- preparing implementation handoffs for Claude Code
- reviewing implementation diffs against documented design constraints

Claude Code is responsible for:
- implementing the current handoff
- following `CLAUDE.md`
- reporting any implementation pressure that may require a design update

## Design Principles
- Preserve documented design decisions unless the user explicitly approves a change.
- Prefer small, scoped changes over broad rewrites.
- Keep responsibility boundaries stable.
- Do not introduce new abstractions unless they remove real complexity or match an existing project pattern.
- Separate temporary workarounds from long-term design.

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
- Did Claude Code change behavior outside the handoff?
- Should `AGENTS.md` or `docs/` be updated with a new decision?
