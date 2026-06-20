# 機能設計書

## システム構成図

```
ブラウザ
  │
  └── Vercel（静的ホスティング）
        │
        └── Next.js App Router（静的エクスポート）
              │
              ├── app/page.tsx（ページ統合）
              │     ├── TopSection
              │     ├── AboutSection
              │     ├── WorksSection（Business Projects）
              │     ├── PersonalWorksSection
              │     ├── ProfileSection
              │     ├── SkillsSection
              │     ├── ContactSection
              │     └── AvailabilitySection
              │
              └── data/*.json（コンテンツストア）
```

## データモデル定義

### Top（`data/top.json` / `types/top.ts`）

| フィールド | 型 | 説明 |
|---|---|---|
| `name` | `string` | サイト名 |
| `copy` | `string` | メインキャッチコピー |
| `subcopy` | `string` | サブキャッチコピー |
| `techStack` | `string` | 使用技術の表示文字列 |
| `about` | `string[]` | About セクションの説明文（複数段落） |

### Profile（`data/profile.json` / `types/profile.ts`）

| フィールド | 型 | 説明 |
|---|---|---|
| `name` | `string` | 氏名 |
| `role` | `string` | 役割・肩書き |
| `image` | `string` | プロフィール画像パス |
| `description` | `string[]` | 自己紹介文（複数段落） |
| `hobbies` | `string` | 趣味 |

### PersonalWork（`data/personal-works.json` / `types/personal-work.ts`）

| フィールド | 型 | 説明 |
|---|---|---|
| `id` | `string` | 一意識別子（例: `pw-1`） |
| `title` | `string` | アプリ名 |
| `description` | `string` | 説明文 |
| `images` | `string[]` | 画面キャプチャ画像パスの配列（1枚以上） |
| `tech` | `string[]` | 使用技術タグ |
| `url` | `string?` | 公開 URL（任意） |
| `github` | `string?` | GitHub リンク（任意） |
| `status` | `string` | 稼働状況（例: `"公開中"` / `"開発中"`） |

### SkillCategory / Skill（`data/skills.json` / `types/skills.ts`）

```typescript
interface SkillCategory {
  category: string;   // カテゴリ名
  skills: Skill[];
}

interface Skill {
  name: string;       // スキル名
}
```

カテゴリ一覧：フロントエンド / バックエンド / データベース / インフラ・クラウド / ツール・その他

### ContactLink（`data/contact.json` / `types/contact.ts`）

| フィールド | 型 | 説明 |
|---|---|---|
| `platform` | `string` | プラットフォーム名（例: `GitHub`） |
| `url` | `string` | リンク先 URL またはメールアドレス |
| `icon` | `string` | アイコン識別子（`github` / `twitter` / `email`） |
| `label` | `string` | 表示ラベル |

### Availability（`data/availability.json` / `types/availability.ts`）

| フィールド | 型 | 説明 |
|---|---|---|
| `status` | `'available' \| 'limited' \| 'unavailable'` | 稼働状況 |
| `from` | `string?` | 受注開始可能時期（例: `2026/07`）（任意） |
| `message` | `string` | 画面に表示するメッセージ |

## コンポーネント設計

### コンポーネント階層

```
app/layout.tsx
  └── app/page.tsx
        ├── components/layout/Header.tsx
        │     └── components/layout/MobileMenu.tsx
        ├── components/sections/TopSection.tsx          ← data/top.json
        ├── components/sections/AboutSection.tsx        ← data/top.json (about フィールド)
        ├── components/sections/WorksSection.tsx        ← data/projects.json（Business Projects）
        │     ├── components/sections/ProjectCard.tsx
        │     └── components/sections/ProjectDetail.tsx
        ├── components/sections/PersonalWorksSection.tsx ← data/personal-works.json
        │     ├── components/sections/ProjectCard.tsx（再利用）
        │     ├── components/sections/PersonalWorkDetail.tsx
        │     │     └── components/ui/ImageCarousel.tsx
        ├── components/sections/ProfileSection.tsx      ← data/profile.json
        ├── components/sections/SkillsSection.tsx       ← data/skills.json
        ├── components/sections/ContactSection.tsx      ← data/contact.json
        └── components/sections/AvailabilitySection.tsx ← data/availability.json
```

共通ラッパー：`components/ui/SectionWrapper.tsx`（各セクションの共通パディング・タイトル）  
アニメーション：`components/animations/FadeIn.tsx`（Framer Motion によるスクロール連動フェードイン）

### 各セクションの責務

| コンポーネント | データソース | 主な表示内容 |
|---|---|---|
| `TopSection` | `top.json` | キャッチコピー・サブコピー・プロフィール画像 |
| `AboutSection` | `top.json` (about) | サイト・エンジニア紹介文 |
| `WorksSection` | `projects.json` | 企業案件カード一覧 + 詳細パネル（Business Projects） |
| `PersonalWorksSection` | `personal-works.json` | 個人制作カード一覧 + 詳細パネル（画像カルーセル） |
| `ProfileSection` | `profile.json` | 氏名・役割・自己紹介・趣味 |
| `SkillsSection` | `skills.json` | カテゴリ別スキルタグ一覧 |
| `ContactSection` | `contact.json` | GitHub・X・メールへの外部リンク |
| `AvailabilitySection` | `availability.json` | 稼働状況・受注開始可能時期 |

## 画面遷移図

シングルページ（SPA 的スクロール）のため、ページ遷移はなし。ナビゲーションはアンカーベースのスムーススクロールで実装。

```
Header ナビ
  ├── TOP               → #top
  ├── About             → #about
  ├── Business Projects → #business-projects
  ├── Personal Works    → #personal-works
  ├── Profile           → #profile
  ├── Skills            → #skills
  ├── Contact           → #contact
  └── Availability      → #availability
```

モバイルでは MobileMenu（全画面オーバーレイ）が同じナビゲーションを提供。

## ワイヤフレーム

### PC レイアウト

```
┌────────────────────────────────────────┐
│ Header: [TOP][About][Works]...[Contact] │  sticky
├────────────────────────────────────────┤
│                  TOP                   │
│        キャッチコピー ／ プロフィール画像     │
├────────────────────────────────────────┤
│                 About                  │
│            紹介文（複数段落）              │
├────────────────────────────────────────┤
│           Business Projects            │
│   [案件カードグリッド] + 詳細パネル          │
├────────────────────────────────────────┤
│             Personal Works             │
│   [個人制作カード] + 詳細（画像カルーセル）   │
├────────────────────────────────────────┤
│                Profile                 │
│        画像 ／ 氏名・役割・自己紹介          │
├────────────────────────────────────────┤
│                 Skills                 │
│   [FE タグ群]  [BE タグ群]  [DB タグ群]   │
├────────────────────────────────────────┤
│                Contact                 │
│        [GitHub] [X] [Email]            │
├────────────────────────────────────────┤
│              Availability              │
│            稼働状況・受注時期              │
└────────────────────────────────────────┘
```

### モバイルレイアウト（差分のみ）

- Header：ロゴ + ハンバーガーアイコン。タップで全画面 MobileMenu を表示
- Works：カルーセルを1カラム表示、スワイプ操作
- Skills：カテゴリを縦積みで表示

## デザインシステム

### カラーパレット

| 変数 | 値 | 用途 |
|---|---|---|
| `--background` | `#ffffff` | ページ背景 |
| `--foreground` | `#003B46` | メインテキスト |
| `--primary` | `#07575B` | プライマリカラー |
| `--primary-light` | `#66A5AD` | 明るい青緑・アクセント |
| `--primary-dark` | `#003B46` | 濃い青緑 |
| `--secondary` | `#C4DFE6` | カードボーダー・薄いアクセント |

### カードスタイル（共通）

```css
background: #ffffff;
border: 1px solid #C4DFE6;
border-radius: 0.75rem;
padding: 1.5rem;
transition: all 0.3s ease;
/* hover */
border-color: #66A5AD;
box-shadow: 0 4px 16px rgba(7, 87, 91, 0.08);
transform: translateY(-2px);
```

適用箇所：Works カルーセルカード / Skills カテゴリカード / Contact リンクカード

### アニメーション

`FadeIn.tsx`（Framer Motion）によりスクロール時にセクションをフェードイン。

```typescript
// useInView=true: スクロール時にアニメーション
// useInView=false: マウント時にアニメーション
hidden: { opacity: 0, y: 20 }
visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
```
