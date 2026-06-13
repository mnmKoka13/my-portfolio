# 開発ガイドライン

## コーディング規約

### 基本方針

- TypeScript の `strict` モードに従う。`any` は使わない
- コンポーネントは `export default function` で定義する
- Props の型は同ファイル内に `interface` で定義する
- import パスは `@/` エイリアスを使う（相対パスは同ディレクトリ内の import のみ許容）
- 文字列は シングルクォート（`'`）を使う

### コンポーネント

```tsx
// ✅ 正しい例
interface SectionWrapperProps {
  id?: string;
  children: React.ReactNode;
}

export default function SectionWrapper({ id, children }: SectionWrapperProps) {
  return <section id={id}>{children}</section>;
}
```

- クライアントコンポーネント（useState・useRef 等を使う場合）は先頭に `"use client"` を記述する
- サーバーコンポーネントで済む場合は `"use client"` を付けない

### スタイリング

- スタイルは Tailwind CSS のユーティリティクラスで記述する。インラインスタイル・CSS Modules は使わない
- 条件付きクラスの結合には `cn()`（`lib/utils.ts`）を使う

```tsx
// ✅ 正しい例
className={cn(
  'rounded-xl transition-all',
  isActive && 'bg-primary text-white',
)}

// ❌ NG
className={`rounded-xl transition-all ${isActive ? 'bg-primary text-white' : ''}`}
```

- カラー・フォントサイズ・スペーシングは `app/globals.css` のカスタムプロパティ（`--primary`, `--font-size-hero` 等）を Tailwind クラス経由で使う

### データ取得

- コンテンツは `data/*.json` から直接 import する。fetch・サーバーアクションは使わない

```tsx
import worksData from '@/data/works.json';
import type { Work } from '@/types';
```

### 型定義

- `data/*.json` の各エントリに対応する TypeScript インターフェースを `types/` に定義し、`types/index.ts` から再エクスポートする
- 任意フィールドには `?` を付ける

## 命名規則

| 対象 | 形式 | 例 |
|---|---|---|
| コンポーネントファイル | PascalCase | `WorksSection.tsx` |
| コンポーネント関数 | PascalCase | `WorksSection` |
| Props インターフェース | PascalCase + `Props` | `WorksSectionProps` |
| 変数・関数 | camelCase | `activeProjectId`, `handleProjectClick` |
| JSON データファイル | kebab-case | `works.json`, `availability.json` |
| セクション `id` 属性 | kebab-case | `id="works"`, `id="about"` |
| CSS カスタムプロパティ | kebab-case | `--primary-light` |

## スタイリング規約

- **Mobile First**: 基本スタイルをモバイル向けに書き、`sm:` / `md:` / `lg:` で上書きする
- セクションの共通パディング・タイトルは `SectionWrapper` コンポーネントに任せる。各セクションで独自に `py-*` を設定しない
- カードスタイル（ボーダー・ホバー・シャドウ）は既存カードのクラスに揃える
- アニメーションが必要な箇所は `FadeIn` コンポーネントを使う。Framer Motion を直接セクションに書かない

## 品質チェック

実装後は必ず以下を実行する。エラー・警告がゼロであることを確認してから完了とする。

```bash
npm run lint    # ESLint（eslint-config-next）
npm run build   # TypeScript 型チェック + 静的エクスポート
```

テストスイートは未設定。

## Git 規約

### コミットメッセージ形式

[Conventional Commits](https://www.conventionalcommits.org/) に従い、日本語で記述する。

```
<type>(<scope>): <50文字以内の要約>

<変更内容の詳細（任意）>
```

#### タイプ一覧

| タイプ | 用途 |
|---|---|
| `feat` | 新機能追加 |
| `fix` | バグ修正 |
| `refactor` | 機能変更を伴わないリファクタリング |
| `style` | フォーマット・スタイルのみの変更（ロジック変更なし） |
| `docs` | ドキュメントのみの変更 |
| `test` | テストの追加・修正 |

#### スコープ例

`top` / `about` / `works` / `profile` / `skills` / `contact` / `availability` / `layout` / `ui` / `deps` / `metadata`

#### 良い例・悪い例

```bash
# ✅ 良い例
feat(works): 制作物カードにサムネイル画像を追加
fix(contact): メールリンクに mailto: プレフィックスを付与
docs(readme): セットアップ手順を追記

# ❌ 悪い例
update
fix typo
WIP
```

### ステージングルール

- `git add .` は使わない。対象ファイルを明示的に指定する
- 1コミット = 1つの目的（単一責任原則）。異なる目的の変更は分割する
- ロジック変更とフォーマット変更は別コミットにする

### ブランチ戦略

- `main` ブランチへの直接プッシュで本番（Vercel）に自動デプロイされる
- 規模の大きい変更はフィーチャーブランチ（`feature/[タイトル]`）で作業し、PR を経由してマージする
