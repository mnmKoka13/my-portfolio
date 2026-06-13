# 技術仕様書

## テクノロジースタック

### コア

| 技術 | バージョン | 用途 |
|---|---|---|
| Next.js | 16.1.6 | フレームワーク（App Router） |
| React | 19.2.3 | UI ライブラリ |
| TypeScript | ^5 | 静的型付け |

### スタイリング

| 技術 | バージョン | 用途 |
|---|---|---|
| Tailwind CSS | ^4 | ユーティリティ CSS |
| @tailwindcss/postcss | ^4 | PostCSS プラグイン |
| clsx | ^2.1.1 | 条件付きクラス構築 |
| tailwind-merge | ^3.5.0 | Tailwind クラスの競合解決 |

### アニメーション・UI

| 技術 | バージョン | 用途 |
|---|---|---|
| Framer Motion | ^12.34.4 | スクロール連動フェードイン |
| Embla Carousel React | ^8.6.0 | Works カルーセル |

### 開発ツール

| 技術 | バージョン | 用途 |
|---|---|---|
| ESLint | ^9 | 静的解析 |
| eslint-config-next | 16.1.6 | Next.js 向け ESLint 設定 |

### インフラ

| 技術 | 用途 |
|---|---|
| Vercel | ホスティング・デプロイ（Hobby プラン、GitHub 連携による自動デプロイ） |

## アーキテクチャ概要

Next.js App Router を使用した静的サイト。`npm run build` で `out/` に静的ファイルを生成し、Vercel にデプロイする。

**データフロー：**
```
data/*.json
  └──（直接 import）──▶ 各セクションコンポーネント ──▶ app/page.tsx ──▶ ブラウザ
```

サーバーサイドレンダリング・API 呼び出しなし。コンテンツの追加・変更は `data/*.json` の編集のみで完結する。

## next.config.ts

```typescript
const nextConfig: NextConfig = {
  images: {
    unoptimized: true,  // 静的エクスポート用（Vercel の Image Optimization は未使用）
  },
  trailingSlash: true,
};
```

## TypeScript 設定

| オプション | 値 | 意図 |
|---|---|---|
| `target` | `ES2017` | モダンブラウザ向け出力 |
| `strict` | `true` | 厳格な型チェック |
| `moduleResolution` | `bundler` | Next.js のバンドラーに最適化 |
| `resolveJsonModule` | `true` | `data/*.json` を直接 import 可能に |
| `paths` | `"@/*": ["./*"]` | プロジェクトルートからの絶対パスエイリアス |

## スタイリング設計

Tailwind CSS v4 を使用。カスタムデザイントークンは `app/globals.css` の `@theme inline` ブロックで定義し、Tailwind のユーティリティクラスとして利用可能にする。

```css
/* app/globals.css */
@theme inline {
  --color-primary: var(--primary);        /* bg-primary, text-primary 等で使用可 */
  --font-size-hero: 3rem;                 /* text-hero で使用可 */
  --spacing-section: 6rem;               /* p-section 等で使用可 */
}
```

条件付きクラスのマージは `lib/utils.ts` の `cn()` で行う（`clsx` + `tailwind-merge` の組み合わせ）。

## パフォーマンス要件

| 指標 | 目標値 |
|---|---|
| Lighthouse Performance | 90 以上 |
| Lighthouse Accessibility | 90 以上 |
| Lighthouse SEO | 90 以上 |
| Lighthouse Best Practices | 90 以上 |

### パフォーマンス施策

- アニメーションは `transform` / `opacity` のみ使用（reflow 回避）
- 画像は WebP 形式・サイズ最適化（TinyPNG 等で圧縮）
- 未使用ライブラリを持ち込まない
- Tree shaking は Next.js ビルドが自動適用

## ブラウザ対応

| ブラウザ | バージョン |
|---|---|
| Chrome | 最新版 |
| Safari | 最新版 |
| Firefox | 最新版 |

## 技術的制約

- サーバーサイド処理なし（静的サイトのため）
- データベース・外部 API 連携なし（`data/*.json` が唯一のデータソース）
- 画像の動的最適化なし（`images.unoptimized: true`）
- フォーム送信機能なし（Contact は外部リンクのみ）
