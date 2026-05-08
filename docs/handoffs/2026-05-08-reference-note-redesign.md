Read AGENTS.md, CLAUDE.md, and this handoff file before implementation.
If implementation would violate constraints or require files outside this handoff, stop and ask before editing.

## Goal
Make the site more useful as a working companion for using Codex to define intent and Claude Code to execute scoped implementation tasks.

The result should help the user quickly answer:
- What should I do first?
- Should this stay in Codex or go to Claude Code?
- What exactly should I give Claude Code?
- What should Claude Code report back?
- What should Codex review after implementation?

## Background
The current site already documents the Codex / Claude Code split, handoff flow, and Claude Code settings. The main issue is information architecture: operational guidance and detailed Claude Code reference pages are mixed at the same level, so the site reads more like a manual than a note that can sit beside real work.

Design direction:
- Treat the first screens as an operational dashboard, not an introduction.
- Keep public content generic and concise.
- Keep detailed Claude Code command/config pages, but make them secondary reference material.
- Make Codex pages produce usable artifacts: decision prompts, handoff blocks, review checklists, and report formats.
- Keep the static SPA architecture and existing visual system.

## Files To Inspect
- AGENTS.md
- CLAUDE.md
- index.html
- js/app.js
- css/style.css
- sections/top.html
- sections/workflow.html
- sections/codex/overview.html
- sections/codex/decision.html
- sections/codex/design.html
- sections/codex/handoff.html
- sections/codex/loop.html
- sections/codex/review.html
- sections/templates.html
- templates/codex/AGENTS.md
- templates/codex/plan.md
- templates/claude/CLAUDE.md

## Files To Edit
- index.html
- js/app.js
- sections/top.html
- sections/workflow.html
- sections/codex/overview.html
- sections/codex/decision.html
- sections/codex/design.html
- sections/codex/handoff.html
- sections/codex/loop.html
- sections/codex/review.html
- sections/templates.html
- templates/codex/AGENTS.md
- templates/codex/plan.md
- templates/claude/CLAUDE.md

Do not edit Claude Code manual/reference sections under `sections/claude/` unless a nav label or cross-reference becomes inconsistent. If that happens, stop and report the proposed extra file before editing.

## Constraints
- Keep the site static; do not add build tooling, dependencies, package files, or a framework.
- Reuse existing UI patterns: `.card`, `.card-grid`, `.template`, `.workflow`, `.wf-step`, `.file-tree`, `.tip`, and existing navigation groups.
- Keep user-facing content in Japanese.
- Keep public content generic. Do not add personal secrets, private hostnames, API keys, tokens, or private operational details.
- Preserve the current rule that Codex may implement small or design-sensitive changes directly, but this particular task is intended for Claude Code execution.
- Keep the core role split aligned across `AGENTS.md`, `CLAUDE.md`, `sections/top.html`, `sections/workflow.html`, `sections/codex/*`, and `templates/codex/AGENTS.md`.
- Do not modify `.claude/settings.local.json`.
- Do not commit automatically.

## Non Goals
- Do not redesign the visual theme.
- Do not add a landing page or marketing copy.
- Do not remove existing Claude Code reference material.
- Do not add external links or claims that require current web verification.
- Do not turn this into a generic AI coding tutorial; keep it specific to this repository's Codex -> Claude Code workflow.
- Do not rewrite every section for style only.

## Proposed Information Architecture
Update the site so the first navigation area is the primary work surface:

1. `Top`
   - Reframe as "作業前に見るページ".
   - Add a compact "今日の使い方" card:
     - Codexに頼む: 目的整理、設計判断、handoff作成、差分レビュー
     - Claude Codeに頼む: handoff実装、検証、変更報告
     - 戻すもの: changed files, summary, verification, blocked checks, design questions
   - Add "迷ったら" decision bullets:
     - 曖昧なら Codex
     - 明確で編集量が多いなら Claude Code
     - 実装後は Codex で設計整合性レビュー
   - Keep the public-use caution, but shorten it.

2. `併用ワークフロー`
   - Make this the canonical step-by-step loop:
     1. Codexで依頼を分類する
     2. Codexで設計リスクを切る
     3. Claude Codeに渡せる粒度まで絞る
     4. `docs/handoffs/YYYY-MM-DD-<task>.md` を作る
     5. Claude Codeが実装・検証・報告する
     6. Codexが差分をレビューする
     7. 必要な判断だけ `AGENTS.md` に残す
   - Keep examples as short copy-ready prompts rather than long prose.

3. `Codex 基本運用`
   - Rework as a control panel for Codex actions.
   - Include cards for:
     - 依頼分類
     - 設計リスク判定
     - handoff作成
     - Claude Code報告のレビュー
     - durable rule化の判断
   - Add one copy-ready "Codexに最初に渡す依頼" prompt.

4. `作業判定と分岐`
   - Add a decision matrix with columns:
     - 状況
     - Codexでやる
     - Claude Codeへ渡す
     - 注意点
   - Cover at least:
     - 文言修正
     - 新規セクション追加
     - 複数ファイルの機械的編集
     - 設計変更
     - バグ修正
     - テンプレート更新

5. `設計思想の蓄積`
   - Make it clear that not every task updates `AGENTS.md`.
   - Add "残す判断 / 残さない判断" examples.
   - Keep the decision log structure, but align labels with current `AGENTS.md`.

6. `実装ハンドオフ`
   - Make this the most practical page.
   - Include a complete handoff template matching `AGENTS.md` exactly:
     - Goal
     - Background
     - Files To Inspect
     - Files To Edit
     - Constraints
     - Non Goals
     - Verification
     - Expected Report
   - Add mini examples for:
     - content update
     - new section
     - template update
   - Use this repository's verification commands:
     - `git diff --check`
     - local server if section wiring changed

7. `Codex 実作業ループ`
   - Reframe as "実際の会話の往復".
   - Show the exact artifact flow:
     - user request -> Codex design/handoff -> Claude Code implementation report -> Codex review -> optional `AGENTS.md` decision.
   - Include report examples Claude Code should return.

8. `設計整合性レビュー`
   - Turn into a checklist page.
   - Lead with findings-oriented review criteria:
     - handoff外の変更
     - 不要なUI/構造パターン追加
     - 公開不可情報
     - 検証不足
     - `AGENTS.md`更新要否
   - Add a copy-ready review prompt.

9. `テンプレート集`
   - Add a short note explaining when each template is used.
   - Ensure loaded templates are aligned with updated handoff and role split.

10. Navigation
   - Keep existing section IDs if possible to minimize wiring risk.
   - Rename labels only where it improves scanning.
   - Suggested grouping:
     - Top
     - 作業フロー: 併用ワークフロー, テンプレート集
     - Codex: 基本運用, 作業判定, 設計記録, handoff, 実作業ループ, レビュー
     - Claude Code: keep current manual/reference groups as secondary material.

## Template Alignment
Update public templates so they teach the same workflow:

- `templates/codex/AGENTS.md`
  - Align with this repo's current `AGENTS.md` structure and wording.
  - Include the exact handoff block used in this repo where practical.
  - Keep project-specific placeholders generic.

- `templates/codex/plan.md`
  - Reframe as a Codex-side planning note that can become a Claude Code handoff.
  - Include fields for change type, design risk, Codex vs Claude Code decision, files, constraints, verification, and open questions.

- `templates/claude/CLAUDE.md`
  - Ensure it tells Claude Code to read the handoff, `AGENTS.md`, and `CLAUDE.md`; stay inside allowed files; report changed files, summary, verification, blocked checks, and design questions.

## Verification
- Run `git diff --check`.
- Run a local static server if available:
  - `python -m http.server 8787 --bind 127.0.0.1`
  - Check `http://127.0.0.1:8787/` returns HTTP 200.
- Manually check in the browser or via fetched HTML that:
  - Top loads.
  - Workflow loads.
  - Each edited Codex section loads.
  - Templates still load through `.template-loader`.
  - Navigation labels still open the intended sections.
- If a browser is unavailable, report that as a blocked check.

## Expected Report
- Changed files
- Summary
- Verification results
- Blocked checks
- Any files edited outside `Files To Edit` and why
- Design questions for Codex
