# Design: Personal Works レイアウトのtype対応

## 実装アプローチ

`PersonalWork` 型に `type` フィールドを追加し、`PersonalWorkDetail` 内で画像コンテナの幅とアスペクト比を切り替える。レイアウト構造（2カラム）は変更しない。

### レイアウト構造（変更なし）

```
[デスクトップ - mobile / web 共通]
┌─────────────────────────────────────────────────────────┐
│  ┌────────────┐   ┌──────────────────────────────────┐  │
│  │            │   │  Overview                        │  │
│  │   Image    │   │  説明テキスト...                  │  │
│  │  Carousel  │   │                                  │  │
│  │            │   │  Status / Tech Stack / Links     │  │
│  └────────────┘   └──────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
     ↑ ここだけ type で切り替える
```

### 画像コンテナのサイズ

| type     | 幅               | アスペクト比    | 用途               |
|----------|------------------|-----------------|-------------------|
| `mobile` | `w-48 md:w-56`   | `aspect-[9/19]` | iOSアプリスクリーンショット |
| `web`    | `w-64 md:w-80`   | `aspect-video`  | PCブラウザスクリーンショット |

### 変更するファイル

#### 1. `types/personal-work.ts`

```ts
export interface PersonalWork {
  id: string;
  title: string;
  type: 'mobile' | 'web';  // 追加
  description: string;
  images: string[];
  tech: string[];
  url?: string;
  github?: string;
  status: string;
}
```

#### 2. `data/personal-works.json`

```json
{ "id": "personal-work-1", "type": "mobile", ... }
{ "id": "personal-work-2", "type": "web",    ... }
```

#### 3. `components/sections/PersonalWorkDetail.tsx`

`type` に応じて画像コンテナのクラスを切り替える。

```tsx
const imageContainerClass =
  work.type === 'mobile'
    ? 'w-48 md:w-56'
    : 'w-64 md:w-80';

const imageClass =
  work.type === 'mobile'
    ? 'relative w-full aspect-[9/19] rounded-2xl overflow-hidden bg-slate-100 shadow-lg'
    : 'relative w-full aspect-video rounded-xl overflow-hidden bg-slate-100 shadow-lg';
```

## 影響範囲の分析

| ファイル | 変更有無 | 理由 |
|---|---|---|
| `types/personal-work.ts` | あり | `type` フィールド追加 |
| `data/personal-works.json` | あり | 各エントリに `type` を付与 |
| `components/sections/PersonalWorkDetail.tsx` | あり | 画像コンテナのクラス切り替え |
| `components/ui/ImageCarousel.tsx` | なし | 変更不要 |
| `components/sections/PersonalWorksSection.tsx` | なし | 変更不要 |
