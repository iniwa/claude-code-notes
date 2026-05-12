# Project Rules And Structure

このディレクトリは、サイト本文ではなく、リポジトリ運用・設計判断・Codex から Claude Code への作業指示を置く場所です。

公開リポジトリ内の文書なので、`docs/` 配下にも秘密情報、API キー、個人トークン、未公開の運用情報は置きません。

## Repository Rules

- このプロジェクトは静的 HTML SPA として維持する。ビルドツール、フレームワーク、パッケージマネージャは明示依頼がない限り追加しない。
- サイトに表示する本文は `sections/`、公開テンプレートは `templates/`、運用・設計・作業指示は `docs/` に置く。
- Codex と Claude Code の役割分担、将来セッションにも効く短いルールは `AGENTS.md` に置く。
- Claude Code が実装時に従う実行ルールは `CLAUDE.md` に置く。
- 長い背景、判断理由、却下案などは `AGENTS.md` に膨らませず、`docs/decisions/` に置く。
- Codex から Claude Code への実装指示は `docs/handoffs/` に置く。
- `.claude/settings.local.json` はローカル権限状態なので、ユーザーが明示しない限り編集しない。
- コミットはユーザーが明示依頼した場合だけ行う。

## Directory Tree

```text
.
|-- AGENTS.md
|   `-- Codex 側の作業合意、役割分担、短い永続ルール
|-- CLAUDE.md
|   `-- Claude Code 側の実装ルール、検証、報告形式
|-- index.html
|   `-- SPA のシェル、ナビゲーション、section プレースホルダ
|-- css/
|   `-- style.css
|       `-- サイト全体の共通スタイル
|-- js/
|   `-- app.js
|       `-- section 読み込み、検索、template/md loader
|-- sections/
|   |-- *.html
|   |-- codex/
|   `-- claude/
|       `-- サイトに表示する各ページ本文
|-- templates/
|   |-- codex/
|   `-- claude/
|       `-- サイトで公開する再利用テンプレート
|-- docs/
|   |-- README.md
|   |   `-- このファイル。リポジトリ構成と docs 配下の置き場所ルール
|   |-- decisions/
|   |   `-- 長めの設計判断、背景、却下案、運用上の理由
|   `-- handoffs/
|       `-- Codex から Claude Code への scoped implementation handoff
|-- tools/
|   `-- メンテナンス用スクリプトや補助ツール
|-- .claude/
|   `-- Claude Code のローカル設定。原則として settings.local.json は触らない
|-- .claudeignore
|   `-- Claude Code に読ませないファイル指定
|-- .gitignore
|   `-- Git 管理対象外の指定
`-- wrangler.toml
    `-- Cloudflare Workers/Pages assets 用のデプロイ設定
```

## Docs Placement Rules

### `docs/handoffs/`

Codex が Claude Code に実装を渡すための scoped handoff を置く。

- ファイル名は `YYYY-MM-DD-<short-task>.md`。
- 1 ファイル 1 実装タスクにする。
- Goal, Background, Files To Inspect, Files To Edit, Constraints, Non Goals, Verification, Expected Report を含める。
- 実装後に内容が古くなっても、作業履歴として残してよい。

### `docs/decisions/`

`AGENTS.md` に入れるには長すぎる設計判断や背景を置く。

- ファイル名は `YYYY-MM-DD-<short-topic>.md`。
- 未来の作業者が判断を再利用できる粒度にする。
- `AGENTS.md` には結論と制約だけを短く残し、詳しい背景はここに置く。
- 単なる作業メモや一時ログは置かない。

### Future Docs

新しい `docs/` サブディレクトリは、既存の `handoffs/` や `decisions/` に入らない文書が継続的に増える場合だけ作る。

候補:

- `docs/runbooks/`: 手順として繰り返し使う運用作業。
- `docs/references/`: サイト本文には載せないが、作業時に参照する補足資料。

一度きりの実装指示は `docs/handoffs/`、長期的な判断理由は `docs/decisions/` を優先する。

## Adding A Site Section

サイトに新しい section を追加するときは、次を必ず揃える。

- `sections/<area>/<name>.html` または `sections/<name>.html` を追加する。
- `js/app.js` の `SECTIONS` に id とパスを追加する。
- `index.html` のナビゲーションに `show('<id>')` を追加する。
- `index.html` の `<main>` に `<div id="<id>" class="section"></div>` を追加する。

## Verification Baseline

内容や docs だけの変更でも、最低限次を確認する。

```powershell
git diff --check
```

section wiring を変更した場合は、ローカル静的サーバーで affected URL を確認する。

```powershell
python -m http.server 8787 --bind 127.0.0.1
```
