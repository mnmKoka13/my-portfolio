# リポジトリ構造定義書

## ディレクトリ構成

```
my-portfolio/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # ルートレイアウト（メタデータ・フォント設定）
│   ├── page.tsx                # メインページ（全セクションを順番に組み立て）
│   ├── globals.css             # グローバルスタイル・CSS カスタムプロパティ
│   └── icon.png                # ファビコン
│
├── components/
│   ├── animations/
│   │   └── FadeIn.tsx          # Framer Motion フェードインラッパー
│   ├── layout/
│   │   ├── Header.tsx          # スティッキーナビゲーション（PC 用）
│   │   └── MobileMenu.tsx      # 全画面オーバーレイメニュー（モバイル用）
│   ├── sections/               # セクションコンポーネント（1セクション = 1ファイル）
│   │   ├── TopSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── WorksSection.tsx
│   │   ├── PersonalWorksSection.tsx
│   │   ├── ProfileSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── AvailabilitySection.tsx
│   │   ├── ProjectCard.tsx         # 案件カード（Business Projects・Personal Works 共用）
│   │   ├── ProjectDetail.tsx       # Business Projects の詳細表示
│   │   └── PersonalWorkDetail.tsx  # Personal Works の詳細表示（ImageCarousel を含む）
│   └── ui/
│       ├── SectionWrapper.tsx  # 共通パディング・セクションタイトル
│       └── ImageCarousel.tsx   # 画像配列を受け取る汎用カルーセル（Personal Works で使用）
│
├── data/                       # コンテンツストア（JSON）
│   ├── top.json                # TOP・About セクションのコンテンツ
│   ├── profile.json            # Profile セクションのコンテンツ
│   ├── projects.json           # Business Projects セクションの企業案件一覧
│   ├── personal-works.json     # Personal Works セクションの個人制作一覧
│   ├── skills.json             # Skills セクションのスキル一覧
│   ├── contact.json            # Contact セクションのリンク一覧
│   └── availability.json       # Availability セクションの稼働状況
│
├── docs/                       # 永続的ドキュメント
│   ├── product-requirements.md
│   ├── functional-design.md
│   ├── architecture.md
│   ├── repository-structure.md （本ファイル）
│   ├── development-guidelines.md
│   └── glossary.md
│
├── lib/
│   └── utils.ts                # cn()（clsx + tailwind-merge）・scrollToSection()
│
├── public/
│   └── images/
│       ├── dummy/              # 開発用ダミー画像
│       ├── icon/               # サイトアイコン
│       ├── profile/            # プロフィール画像
│       └── works/              # 制作物サムネイル
│
├── types/                      # TypeScript 型定義
│   ├── index.ts                # 全型の再エクスポート
│   ├── top.ts
│   ├── profile.ts
│   ├── project.ts
│   ├── personal-work.ts
│   ├── skills.ts
│   ├── contact.ts
│   └── availability.ts
│
├── .steering/                  # 作業単位のドキュメント（開発履歴）
├── CLAUDE.md                   # Claude Code 向け開発プロセス定義
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── postcss.config.mjs
└── package.json
```

## ディレクトリの役割

| ディレクトリ | 役割 |
|---|---|
| `app/` | Next.js App Router のエントリポイント。ページとグローバルスタイルのみ配置 |
| `components/sections/` | セクション単位のコンポーネント。対応する JSON を直接 import する |
| `components/layout/` | Header・MobileMenu など全セクションに跨るレイアウト |
| `components/ui/` | 複数セクションから使われる汎用 UI コンポーネント |
| `components/animations/` | Framer Motion ラッパー |
| `data/` | コンテンツの唯一のデータソース。コード変更なしに編集可能 |
| `types/` | `data/*.json` に対応する TypeScript インターフェース |
| `lib/` | ユーティリティ関数 |
| `public/images/` | 静的画像アセット |
| `docs/` | プロジェクト全体の永続的ドキュメント |
| `.steering/` | 作業単位の一時ドキュメント（要件・設計・タスク） |

## ファイル配置ルール

- **コンポーネント**: 1ファイル1コンポーネント。`components/sections/` のファイルは対応するセクション名を冠する（例: `WorksSection.tsx`）
- **データ**: コンテンツは必ず `data/*.json` に配置。コンポーネント内にコンテンツをハードコードしない
- **型定義**: `data/*.json` のデータ構造に対応する型を `types/` に定義し、`types/index.ts` から再エクスポートする
- **画像**: `public/images/` 以下にカテゴリ別サブディレクトリを作成して配置する
- **ドキュメント**: プロジェクト全体の設計は `docs/`、作業単位のドキュメントは `.steering/[YYYYMMDD]-[タイトル]/` に配置する
