# AGENTS.md

## Purpose
Use this template to define durable project intent and coordinate scoped work.

## Authority and scope
Apply runtime, tool, organization, and safety policy, then explicit user policy,
then project rules and the approved task. Verified project facts replace template
defaults but do not grant authorization. Preserve unrelated work and stop when
an overlap requires guessing.

## Project shape
- Entry point, runtime, languages, and deployment target: describe verified facts.
- Directories and generated/public boundaries: list only what readers need.

## Role policy
- Classify work as small-primary, bounded, adaptive, or non-implementation from
  acceptance evidence; this does not force delegation.
- The user's runtime model and effort remain authoritative. Configuration owns
  model, effort, and role-specific instructions.
- Keep design, requirements, and small documentation corrections in the primary
  context. Use one bounded_implementer for settled cohesive work when transfer
  helps, or adaptive_implementer for material native/platform uncertainty.
- Use bounded_explorer only for independent read-only discovery and
  bounded_reviewer only for a named material risk after the writer's stable
  self-review gate.
- Keep one active writer. A changed candidate invalidates an in-progress review
  as acceptance evidence and must be restabilized. After a second correction or
  two blocked/partial returns, reset the contract before continuing.
- Claude Code is not an approved route unless the user explicitly changes policy.

## Project rules
- Preserve documented design decisions, responsibility boundaries, public/private
  boundaries, and established commands.
- Do not inspect or edit secrets, credentials, local settings, production data,
  runtime state, generated heavy artifacts, dependencies, CI/CD, deployment,
  publication, or external exposure unless explicitly in scope.
- Never reproduce private values. Do not commit, push, or deploy unless requested.

## Workflow
1. Read this entry, the real project's effective entry, the approved task, and
   directly relevant files.
2. Resolve acceptance, protected behavior, authorization, and verification from
   repository evidence before editing.
3. Use an inline native Codex task by default. Create a persisted handoff only
   for a named cross-session, interruption-sensitive, operationally risky, or
   separately executed slice.
4. Implement the cohesive slice, review its stable diff, run focused checks, and
   report passed, blocked, or unmet criteria. Optional cheap direct regression
   tests are appropriate when they materially support changed behavior; a new
   harness or full suite is not required by this template.

## Handoff fields
When a persisted handoff is required, include:

```md
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
- Partial edits
- Design questions
```

## Completion
Self-review the stable diff against every criterion, protected behavior, affected
reference, fence, and required artifact. Run the smallest relevant checks,
including git diff --check. Do not report unavailable target operation as passed;
state exact resume conditions for blocked work.
For incomplete delegated work, report the blocker, resume condition, and next owner/action. Requested model or effort is configuration context, not execution evidence; unknown stays unknown, with no diagnostic-only agents or probes to fill observation fields. After stable-diff review, read deeper only for gaps, conflicts, or concrete risk; rerun checks only for a mandatory contract, changed target or assumption, insufficient evidence, or integration risk. Return concise results and evidence references without raw logs or unchanged inventories. While children run, continue useful work within existing ownership and parallelism rules; otherwise wait for notifications. Avoid liveness-only polling, rereads, or state rewrites; respond to errors, inconsistent state, and user steering, and follow host progress rules.
