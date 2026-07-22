# CLAUDE.md

## Codex / Claude Code Workflow
- Treat `AGENTS.md` as durable design intent and this file as execution rules. The active handoff or equivalent inline task is the approved scope; it may narrow durable rules but may not weaken them.
- Model selection and handoff policy belong in `AGENTS.md`; do not redefine them here.
- Stop and return questions to Codex when scope, constraints, design, or allowed files are unclear. Do not commit unless explicitly requested.
- Implement and verify only the current independently verifiable slice. Subagents are optional and limited to clearly parallel mechanical work within the same files, scope, and constraints.

## Start Of Task Routine
For every implementation task:
1. Read `AGENTS.md` and this `CLAUDE.md`.
2. Read the active handoff under `docs/handoffs/`, or the equivalent inline task scope permitted by `AGENTS.md`.
3. Identify the allowed files (`Files To Edit`) and non-goals before editing.
4. Inspect the relevant existing files before introducing new patterns.
5. Capture `git status --short` when Git is available.
6. If the requested edit requires files outside the approved scope, stop and return the issue to Codex.

## Project Overview
<!-- Brief description of what this project does -->

## Tech Stack
- Language:
- Framework:
- Package manager:
- Deployment target:

## Implementation Rules
- Follow runtime, tool, organization, and safety policy; explicit user policy changes; durable project rules; and then the approved task scope. Report unresolved conflicts instead of guessing.
- Stay inside `Files To Edit`. If a file outside the list must change, stop and report it.
- If the listed files are insufficient to reach the first scoped edit, stop and report the missing discovery or a proposed split instead of broadening the task.
- Preserve existing class names, file layout, and UI patterns.
- Prefer editing existing files over introducing new patterns.
- Do not add dependencies, build tooling, or frameworks unless the handoff says so.
- Do not add secrets, API keys, or machine-specific tokens.
- Do not commit or push unless explicitly requested.
- Do not modify unrelated files for cleanup.
- After editing, compare the final status and diff with the baseline. Do not reset, clean, stage, or rewrite pre-existing changes.

Stop and ask before editing when:
- the handoff is missing goal, files, constraints, or verification
- the requested change conflicts with `AGENTS.md`
- the task would add dependencies or build tooling
- a public template would need private environment details
- secrets, credential-like files, or local permission state would be touched

## Verification
Run the minimum sufficient verification for the acceptance criteria, starting with the most focused relevant check. Examples:
- format / lint / type checks
- relevant unit or integration tests
- build or local server check if structural files changed
- `git diff --check` to catch trailing whitespace or conflict markers

If a check cannot be run in the current environment, report it as a blocked check.

## Reporting Format
At the end of a task, report:
- **Changed files** — every modified path
- **Summary** — what changed and why, in 1–3 lines per area
- **Verification results** — commands run and outcomes
- **Blocked checks** — checks that could not be run, with reason
- **Partial edits** — edits left in the worktree, if any
- **Subagent usage** — none, or the bounded mechanical work delegated
- **Files edited outside Files To Edit** — none, or path + reason
- **Design questions for Codex** — anything that may belong in `AGENTS.md`

If the acceptance criteria are not met, mark the task interrupted and report completed work, remaining work, and the resume condition. Keep the report concise and factual.

## Knowledge Persistence
Durable project workflow decisions belong in `AGENTS.md`. Do not silently encode a new workflow rule only in code. If a discovery should guide future sessions, surface it in the report so Codex can decide whether to record it.

## Protected Scope
- Do not inspect secrets, credentials, or personal data unless their contents are strictly necessary for the approved task.
- Do not edit secrets, credentials, `.env`, local settings, production data, runtime state, or generated heavy artifacts unless the approved task explicitly requires the change.
- Never reproduce secrets, credentials, personal data, or private infrastructure values in prompts, handoffs, reports, or external tools.
- Do not edit local Claude permission state (e.g. `.claude/settings.local.json`) unless explicitly asked.
<!-- Add other protected files as needed -->
