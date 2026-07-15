# CLAUDE.md

## Codex / Claude Code Workflow
- Treat `AGENTS.md` as design intent and this file as execution rules. Follow the supplied handoff first.
- Model selection and handoff policy belong in `AGENTS.md`; do not redefine them here.
- Stop and return questions to Codex when scope, constraints, design, or allowed files are unclear. Do not commit unless explicitly requested.
- Implement and verify only the current independently verifiable slice. Subagents are optional and limited to clearly parallel mechanical work in the same scope.

## Start Of Task Routine
For every implementation task:
1. Read the user's current handoff file under `docs/handoffs/`.
2. Read `AGENTS.md` and this `CLAUDE.md`.
3. Identify the allowed files (`Files To Edit`) and non-goals before editing.
4. Inspect the relevant existing files before introducing new patterns.
5. If the requested edit requires files outside the handoff, explain why before editing them.

## Project Overview
<!-- Brief description of what this project does -->

## Tech Stack
- Language:
- Framework:
- Package manager:
- Deployment target:

## Implementation Rules
- Follow the current handoff first, then this file, then local code style.
- Stay inside `Files To Edit`. If a file outside the list must change, stop and report it.
- If the listed files are insufficient to reach the first scoped edit, stop and report the missing discovery or a proposed split instead of broadening the task.
- Preserve existing class names, file layout, and UI patterns.
- Prefer editing existing files over introducing new patterns.
- Do not add dependencies, build tooling, or frameworks unless the handoff says so.
- Do not add secrets, API keys, or machine-specific tokens.
- Do not commit or push unless explicitly requested.
- Do not modify unrelated files for cleanup.

Stop and ask before editing when:
- the handoff is missing goal, files, constraints, or verification
- the requested change conflicts with `AGENTS.md`
- the task would add dependencies or build tooling
- a public template would need private environment details
- secrets, credential-like files, or local permission state would be touched

## Verification
Run the smallest useful verification for the change. Examples:
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
- **Subagent usage** — none, or the bounded mechanical work delegated
- **Files edited outside Files To Edit** — none, or path + reason
- **Design questions for Codex** — anything that may belong in `AGENTS.md`

Keep the report concise and factual.

## Knowledge Persistence
Durable project workflow decisions belong in `AGENTS.md`. Do not silently encode a new workflow rule only in code. If a discovery should guide future sessions, surface it in the report so Codex can decide whether to record it.

## Do Not Touch
- secrets, `.env`, credential files
- local Claude permission state (e.g. `.claude/settings.local.json`) unless explicitly asked
<!-- Add other protected files as needed -->
