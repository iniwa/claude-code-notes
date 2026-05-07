# CLAUDE.md

> Detailed notes (Japanese): CLAUDE_ja.md

## Coding Style
- Write lightweight, efficient code. Prefer minimal dependencies.
- Keep it simple - avoid heavyweight frameworks for simple tasks.
- No CI/CD, installers, or packaging unless explicitly requested.

## Role
- Claude Code is the implementation executor.
- Follow the current handoff, this `CLAUDE.md`, and project-local instructions.
- Treat design decisions documented in `AGENTS.md` and `docs/` as constraints.

## Project Overview
<!-- Brief description of this project -->

## Tech Stack
- Language:
- Framework:
- Package manager:

## Environment
<!-- Host specs, OS, architecture, etc. -->

## Build & Deploy
<!-- Build target, image registry, deploy flow, etc. -->

## External Access
<!-- Tunnel, reverse proxy, domain settings, etc. -->

## Common Commands
```bash
# Fill in project-specific commands
```

## Design Continuity
- Before implementation, check `AGENTS.md` and relevant files in `docs/`.
- Do not rewrite architecture just because a simpler local implementation is possible.
- If a documented design decision must change, stop and ask before editing.
- Keep changes scoped to the current handoff.
- At the end, report changed files, verification results, and whether the implementation stayed within the documented design constraints.

## Knowledge Persistence
- Implementation discoveries that affect future design should be reported back for `AGENTS.md` or `docs/` updates.
- Do not silently encode new design rules only in code.

## Tooling
- Use **Serena MCP** tools for code navigation and editing to maximize efficiency (symbol search, overview, replace, insert, etc.)

## Do Not Touch
- .env (refer to .env.example)
<!-- Add other protected files as needed -->

## Checklist
<!-- Per-project checklist for new components, deployments, etc. -->
- [ ] ...
