# Design: Personal Works セクション レイアウト改善

## 実装アプローチ

### レイアウト構造

```
[デスクトップ]
┌─────────────────────────────────────────────────────────┐
│  ┌────────────┐   ┌──────────────────────────────────┐  │
│  │            │   │  Overview                        │  │
│  │  📱 Phone  │   │  アプリの説明テキスト...          │  │
│  │  Screenshot│   │                                  │  │
│  │  Carousel  │   │  Status                          │  │
│  │            │   │  [In Development]                │  │
│  │  [● ○ ○]  │   │                                  │  │
│  └────────────┘   │  Tech Stack                      │  │
│                   │  [Next.js] [TypeScript] ...       │  │
│                   │                                  │  │
│                   │  Links                           │  │
│                   │  Website →  GitHub →             │  │
│                   └──────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘

[モバイル]
┌──────────────────┐
│  ┌────────────┐  │
│  │  Phone     │  │
│  │  Screenshot│  │
│  │  Carousel  │  │
│  └────────────┘  │
│  Overview        │
│  テキスト...     │
│  Status / Tech   │
│  Links           │
└──────────────────┘
```

### 変更するコンポーネント

#### 1. `components/ui/ImageCarousel.tsx`

`className` プロパティを追加し、呼び出し元がコンテナの大きさ・形状を制御できるようにする。

```tsx
// Before
interface ImageCarouselProps {
  images: string[];
  alt: string;
}
// コンテナ: "relative w-full h-64 md:h-80 rounded-xl overflow-hidden bg-slate-100"

// After
interface ImageCarouselProps {
  images: string[];
  alt: string;
  className?: string;  // 追加
}
// コンテナ: className ?? "relative w-full h-64 md:h-80 rounded-xl overflow-hidden bg-slate-100"
```

#### 2. `components/sections/PersonalWorkDetail.tsx`

全体を2カラムの flex レイアウトに変更する。

**左カラム（スクリーンショット）:**
- 幅: `w-48 md:w-56`（固定幅、縮まない）
- アスペクト比: `aspect-[9/19]`（スマホ画面比率）
- 角丸: `rounded-2xl`（スマホっぽい見た目）
- シャドウ: `shadow-lg`

**右カラム（情報）:**
- `flex-1` で残りの幅を占有
- Overview / Status / Tech Stack / Links を縦に並べる（現行と同じカード構成）

## データ構造の変更

なし。`PersonalWork` 型・JSON データに変更はない。

## 影響範囲の分析

| ファイル | 変更有無 | 理由 |
|---|---|---|
| `components/ui/ImageCarousel.tsx` | あり | `className` prop 追加 |
| `components/sections/PersonalWorkDetail.tsx` | あり | レイアウト変更 |
| `components/sections/PersonalWorksSection.tsx` | なし | レイアウト変更の影響なし |
| `components/ui/WorksCarousel.tsx` | なし | ImageCarousel を使っていない |
| `types/index.ts` | なし | 型変更なし |
| `data/personal-works.json` | なし | データ変更なし |

## 後方互換性

`ImageCarousel` の `className` はオプション（`className?: string`）で、未指定時は既存クラスをデフォルト値とするため、他の呼び出し箇所（`WorksCarousel` など）に影響しない。
