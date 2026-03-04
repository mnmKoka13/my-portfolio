# ポートフォリオサイト 設計書

## 1. アーキテクチャ設計

### 1.1 技術スタック
```
- Framework: Next.js 16.1.6 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS 4
- Animation: Framer Motion
- Carousel: Embla Carousel React
- Deployment: GitHub Pages (Static Export)
- CI/CD: GitHub Actions
```

### 1.2 ディレクトリ構造
```
my-portfolio/
├── app/
│   ├── layout.tsx          # ルートレイアウト
│   ├── page.tsx            # メインページ（全セクション統合）
│   ├── globals.css         # グローバルスタイル
│   └── fonts/              # フォントファイル（必要に応じて）
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # ヘッダー（ナビゲーション）
│   │   └── MobileMenu.tsx      # ハンバーガーメニュー
│   ├── sections/
│   │   ├── TopSection.tsx      # TOPセクション
│   │   ├── AboutSection.tsx    # About Meセクション
│   │   ├── WorksSection.tsx    # Worksセクション
│   │   ├── ProfileSection.tsx  # Profileセクション
│   │   ├── SkillsSection.tsx   # Skillsセクション
│   │   ├── ContactSection.tsx  # Contactセクション
│   │   └── AvailabilitySection.tsx # Availabilityセクション
│   ├── ui/
│   │   ├── WorksCarousel.tsx   # カルーセルコンポーネント
│   │   ├── SkillCard.tsx       # スキルカード
│   │   ├── SectionWrapper.tsx  # セクション共通ラッパー
│   │   └── SmoothScroll.tsx    # スムーススクロール処理
│   └── animations/
│       └── FadeIn.tsx          # フェードインアニメーション
├── data/
│   ├── profile.json        # プロフィールデータ
│   ├── works.json          # 制作物データ
│   ├── skills.json         # スキルデータ
│   ├── contact.json        # コンタクト情報
│   └── availability.json   # 稼働可能状況
├── public/
│   ├── images/
│   │   ├── profile/        # プロフィール画像
│   │   ├── works/          # 制作物画像
│   │   └── dummy/          # ダミー画像
│   └── favicon.ico
├── types/
│   ├── profile.ts          # プロフィール型定義
│   ├── works.ts            # 制作物型定義
│   ├── skills.ts           # スキル型定義
│   ├── contact.ts          # コンタクト型定義
│   ├── availability.ts     # 稼働状況型定義
│   └── index.ts            # 型エクスポート
├── lib/
│   └── utils.ts            # ユーティリティ関数
└── .github/
    └── workflows/
        └── deploy.yml      # GitHub Actions設定
```

---

## 2. データ設計

### 2.1 型定義

#### types/profile.ts
```typescript
export interface Profile {
  name: string;
  role: string;
  bio: string;
  image: string;
  description: string[];
}
```

#### types/works.ts
```typescript
export interface Work {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  url?: string;
  github?: string;
  period?: string;
}
```

#### types/skills.ts
```typescript
export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level?: number; // 1-5 (将来的な拡張用)
  icon?: string;
}
```

#### types/contact.ts
```typescript
export interface ContactLink {
  platform: string;
  url: string;
  icon: string;
  label: string;
}
```

#### types/availability.ts
```typescript
export interface Availability {
  status: 'available' | 'limited' | 'unavailable';
  from?: string; // YYYY/MM
  message: string;
}
```

### 2.2 JSONデータ構造例

#### data/profile.json
```json
{
  "name": "山田 太郎",
  "role": "フリーランスエンジニア",
  "bio": "フルスタックエンジニアとして活動中",
  "image": "/images/dummy/profile.jpg",
  "description": [
    "Web開発を中心に、フロントエンドからバックエンドまで幅広く対応",
    "ユーザー体験を重視した設計・実装を得意としています"
  ]
}
```

#### data/works.json
```json
[
  {
    "id": "work-1",
    "title": "ECサイト構築",
    "description": "Next.jsを使用したモダンなECサイト",
    "image": "/images/works/work1.jpg",
    "tags": ["Next.js", "TypeScript", "Stripe"],
    "url": "https://example.com",
    "period": "2024/10 - 2024/12"
  }
]
```

#### data/skills.json
```json
[
  {
    "category": "フロントエンド",
    "skills": [
      { "name": "React" },
      { "name": "Next.js" },
      { "name": "TypeScript" }
    ]
  }
]
```

#### data/contact.json
```json
[
  {
    "platform": "GitHub",
    "url": "https://github.com/yourusername",
    "icon": "github",
    "label": "GitHub"
  }
]
```

#### data/availability.json
```json
{
  "status": "available",
  "from": "2025/07",
  "message": "2025/07〜受注可能"
}
```

---

## 3. コンポーネント設計

### 3.1 レイアウトコンポーネント

#### Header.tsx
**責務:**
- ナビゲーションメニュー表示
- スムーススクロール実装
- スクロール位置に応じたアクティブ状態管理

**Props:**
```typescript
interface HeaderProps {
  menuItems: { label: string; href: string }[];
}
```

**機能:**
- PC: 横並びメニュー表示
- Mobile: ハンバーガーメニュー表示
- Sticky positioning

#### MobileMenu.tsx
**責務:**
- モバイル用メニューの開閉
- メニュー項目のクリックでスムーススクロール

**Props:**
```typescript
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: { label: string; href: string }[];
}
```

### 3.2 セクションコンポーネント

#### TopSection.tsx
**表示内容:**
- 名前
- ロール/肩書き
- サイト説明
- プロフィール画像（円形）

**デザイン:**
- 中央揃え
- シンプル・ミニマル
- ヒーローエリアとして視覚的インパクト

#### WorksSection.tsx
**表示内容:**
- 制作物のカルーセル
- 各作品の画像・タイトル・説明・タグ

**機能:**
- 横スライド（Embla Carousel）
- 矢印ナビゲーション
- ドラッグ/スワイプ対応
- レスポンシブ対応

**Props:**
```typescript
interface WorksSectionProps {
  works: Work[];
}
```

#### SkillsSection.tsx
**表示内容:**
- カテゴリ別スキル一覧
- グリッドレイアウト

**デザイン:**
- カテゴリごとにグループ化
- タグ/バッジ形式で表示

#### ContactSection.tsx
**表示内容:**
- 外部リンク（GitHub, X, Email）
- アイコン + テキストリンク

**デザイン:**
- 横並び/縦並び（レスポンシブ対応）
- ホバーエフェクト

#### AvailabilitySection.tsx
**表示内容:**
- 稼働可能時期
- ステータス表示

**デザイン:**
- テキストベース（初期）
- 将来的にバッジ化検討

### 3.3 UIコンポーネント

#### WorksCarousel.tsx
**技術選択: embla-carousel-react**
- 軽量
- カスタマイズ性高
- TypeScript対応

**Props:**
```typescript
interface WorksCarouselProps {
  works: Work[];
  autoPlay?: boolean;
  interval?: number;
}
```

#### SectionWrapper.tsx
**責務:**
- 各セクションの共通スタイリング
- padding/margin統一
- アニメーション適用

**Props:**
```typescript
interface SectionWrapperProps {
  id: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}
```

#### FadeIn.tsx (Framer Motion)
**責務:**
- フェードインアニメーション
- スクロール時の出現演出

**Props:**
```typescript
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}
```

---

## 4. デザインシステム

### 4.1 カラーパレット
```css
:root {
  /* Base colors */
  --background: #ffffff;     /* 白背景 */
  --foreground: #003B46;     /* 濃い青緑（メインテキスト） */
  
  /* Primary palette - 青緑系グラデーション */
  --primary: #07575B;        /* 青緑（プライマリカラー） */
  --primary-light: #66A5AD;  /* 明るい青緑 */
  --primary-dark: #003B46;   /* 濃い青緑 */
  
  /* Secondary/Accent colors */
  --secondary: #C4DFE6;      /* 淡い青緑 */
  --accent: #66A5AD;         /* アクセント */
  
  /* Semantic colors */
  --card-bg: #ffffff;        /* カード背景 */
  --card-border: #C4DFE6;    /* カードボーダー */
  --hover: #07575B;          /* ホバー状態 */
  --hover-light: #66A5AD;    /* ホバー（薄め） */
}
```

#### 配色コンセプト
- **ベース**: 白背景に濃い青緑のテキストで読みやすさ重視
- **アクセント**: 青緑系のグラデーションで統一感
- **カード**: 白背景に薄い青緑のボーダーで清潔感
- **インタラクション**: ホバー時に色が変化して視覚的フィードバック

### 4.2 タイポグラフィ
```css
--font-size-hero: 3rem;      /* 48px */
--font-size-section: 2rem;   /* 32px */
--font-size-heading: 1.5rem; /* 24px */
--font-size-body: 1rem;      /* 16px */
--font-size-small: 0.875rem; /* 14px */
```

### 4.3 スペーシング
```css
--spacing-section: 6rem;        /* セクション間（PC） */
--spacing-section-mobile: 4rem; /* セクション間（Mobile） */
--spacing-container: 1.5rem;    /* コンテナpadding */
```

### 4.4 ブレークポイント
```javascript
screens: {
  'sm': '640px',  // タブレット縦
  'md': '768px',  // タブレット横
  'lg': '1024px', // 小型PC
  'xl': '1280px', // 大型PC
}
```

### 4.5 カードスタイル
```css
.card {
  background-color: #ffffff;
  border: 1px solid #C4DFE6;
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.card:hover {
  border-color: #66A5AD;
  box-shadow: 0 4px 16px rgba(7, 87, 91, 0.08);
  transform: translateY(-2px);
}
```

**適用箇所:**
- Works カルーセルの制作物カード
- Skills のスキルカテゴリカード
- Contact のリンクカード

---

## 5. アニメーション設計

### 5.1 Framer Motion設定

#### フェードイン (共通)
```typescript
const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};
```

#### スライドイン (Works)
```typescript
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};
```

### 5.2 パフォーマンス考慮
- `will-change` 属性の適切な使用
- アニメーション要素の最小化
- `transform` / `opacity` のみ使用（reflow回避）

---

## 6. ルーティング・ナビゲーション設計

### 6.1 シングルページ実装
すべてのセクションを `app/page.tsx` に配置。セクションごとに `id` 属性を付与。

```typescript
// app/page.tsx
export default function Home() {
  return (
    <>
      <TopSection id="top" />
      <AboutSection id="about" />
      <WorksSection id="works" />
      <ProfileSection id="profile" />
      <SkillsSection id="skills" />
      <ContactSection id="contact" />
      <AvailabilitySection id="availability" />
    </>
  );
}
```

### 6.2 スムーススクロール実装
```typescript
// lib/utils.ts
export const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};
```

---

## 7. GitHub Pages デプロイ設計

### 7.1 next.config.ts 設定
```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/my-portfolio' : '',
  images: {
    unoptimized: true, // Static Export用
  },
  trailingSlash: true,
};

export default nextConfig;
```

### 7.2 GitHub Actions ワークフロー
`.github/workflows/deploy.yml` に配置済み

### 7.3 package.json スクリプト
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  }
}
```

---

## 8. SEO・メタデータ設計

### 8.1 app/layout.tsx
```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '山田太郎 | フリーランスエンジニア ポートフォリオ',
  description: 'フルスタックエンジニアのポートフォリオサイト。Web開発の実績・スキルをご紹介します。',
  keywords: ['フリーランス', 'エンジニア', 'Next.js', 'React'],
  authors: [{ name: '山田太郎' }],
  openGraph: {
    title: '山田太郎 | ポートフォリオ',
    description: 'フリーランスエンジニアのポートフォリオ',
    type: 'website',
    locale: 'ja_JP',
    images: ['/images/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '山田太郎 | ポートフォリオ',
    description: 'フリーランスエンジニアのポートフォリオ',
    images: ['/images/og-image.jpg'],
  },
};
```

---

## 9. レスポンシブ設計

### 9.1 ブレークポイント戦略
- **Mobile First**: 基本スタイルはモバイル向け
- **Breakpoints**:
  - `sm`: 640px (タブレット縦)
  - `md`: 768px (タブレット横)
  - `lg`: 1024px (小型PC)
  - `xl`: 1280px (大型PC)

### 9.2 レイアウトパターン

#### Header
- Mobile: ハンバーガー + 全画面メニュー
- PC: 横並びメニュー

#### Works
- Mobile: 1カラム
- Tablet: 1カラム (カード大きめ)
- PC: カルーセル幅調整

#### Skills
- Mobile: 1カラム
- Tablet: 2カラム
- PC: 3-4カラムgrid

---

## 10. アクセシビリティ設計

### 10.1 対応項目
- セマンティックHTML使用
  - `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- 適切な見出しレベル (`h1` → `h2` → `h3`)
- `alt` 属性の必須化
- フォーカス可視化 (outline)
- キーボードナビゲーション対応
- ARIAラベル (必要箇所のみ)

### 10.2 カラーコントラスト
- テキスト: 最低AA基準 (4.5:1)
- アクセントカラー使用時も視認性確保

---

## 11. パフォーマンス最適化

### 11.1 画像最適化
- WebP形式使用
- レスポンシブ画像 (`srcset`)
- Lazy loading
- サイズ最適化 (TinyPNG等で圧縮)

### 11.2 コード最適化
- Tree shaking (自動)
- コード分割 (必要に応じて dynamic import)
- 未使用ライブラリの削減

### 11.3 読み込み最適化
- フォントプリロード
- Critical CSS inline化 (Next.js自動)

---

## 12. 今後の拡張性考慮

### 将来的に追加検討
- ブログ機能 (`/blog` ルート)
- お問い合わせフォーム (FormspreeやNewt連携)
- Availability のステータスバッジUI
- ダークモード対応
- 多言語対応 (i18n)
- アクセス解析 (Google Analytics)

---

## 13. 参照

- 要件定義書: プロジェクトルートに配置
- アクションプラン: `INSTRUCTIONS.md`
