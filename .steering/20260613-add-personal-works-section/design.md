# 設計

## 実装アプローチ

Business Projects へのリネームは最小限の文字列変更のみ。
Personal Works は Business Projects（WorksSection）の実装パターンを踏襲し、
詳細ビューの画像部分だけを画像カルーセルに差し替える。

## 変更するファイル

### 変更（修正のみ）

| ファイル | 変更内容 |
|---|---|
| `components/layout/Header.tsx` | `menuItems` の `Works` エントリを `Business Projects` / `business-projects` に変更。`Personal Works` / `personal-works` を Works の次に追加 |
| `components/sections/WorksSection.tsx` | `SectionWrapper` の `id` を `"works"` → `"business-projects"`、`title` を `"Works"` → `"Business Projects"` に変更 |
| `app/page.tsx` | `WorksSection` の直後に `PersonalWorksSection` を追加 |
| `types/index.ts` | `PersonalWork` 型を再エクスポートに追加 |

### 新規作成

| ファイル | 役割 |
|---|---|
| `data/personal-works.json` | 個人制作データ（初期値：空配列） |
| `types/personal-work.ts` | `PersonalWork` インターフェース |
| `components/ui/ImageCarousel.tsx` | 画像 URL の配列を受け取るシンプルな画像カルーセル（Embla 使用） |
| `components/sections/PersonalWorkDetail.tsx` | 選択中の個人制作プロジェクトの詳細表示（ImageCarousel を含む） |
| `components/sections/PersonalWorksSection.tsx` | Personal Works セクション本体 |

## データ設計

### `types/personal-work.ts`

```typescript
export interface PersonalWork {
  id: string;
  title: string;
  description: string;
  images: string[];      // 画面キャプチャ（1枚以上、順番通りに表示）
  tech: string[];
  url?: string;
  github?: string;
  status: string;        // 例: "公開中" / "開発中"
}
```

### `data/personal-works.json`（初期値）

```json
[]
```

## コンポーネント設計

### `components/ui/ImageCarousel.tsx`

- Props: `images: string[]`
- Embla Carousel でスライド
- 画像が1枚のときは矢印・ページインジケーターを非表示
- 画像が複数のときは矢印ボタン + ドットインジケーターを表示

### `components/sections/PersonalWorkDetail.tsx`

Business Projects の `ProjectDetail` と同じ2カラム構成をベースに、
ヒーローエリアを `ImageCarousel` に差し替える。

```
┌──────────────────────────────────────┐
│  ImageCarousel（画面キャプチャ複数枚）  │  ← 差し替え箇所
└──────────────────────────────────────┘
┌─────────────────┐ ┌──────────────────┐
│   Overview      │ │  Tech Stack      │
│   （説明文）     │ │  URL / GitHub    │
│                 │ │  Status          │
└─────────────────┘ └──────────────────┘
```

### `components/sections/PersonalWorksSection.tsx`

`WorksSection` と同じ構成（カードグリッド + 詳細パネル）を踏襲する。
データが空のときは「準備中」のメッセージを表示する。

- カードグリッド：`ProjectCard` を再利用
- 詳細パネル：`PersonalWorkDetail` を使用
- データ件数が少ない場合は「もっと見る」ボタンを表示しない

## 影響範囲の分析

| 影響 | 詳細 |
|---|---|
| SEO・アンカーリンク | `#works` が `#business-projects` に変わる。外部からの直リンクは想定していないため影響なし |
| `works.json` / `Work` 型 / `WorksCarousel.tsx` | 現在未使用。本作業では触れない |
| `data/projects.json` | Business Projects のデータソース。変更なし |
