# ポートフォリオサイト 実装手順書

## 📋 プロジェクト概要
フリーランスエンジニア向けのポートフォリオサイトを構築します。
Next.js + TypeScript + Tailwind CSS でシングルページ構成、GitHub Pages で公開します。

---

## ✅ Phase 1: 基盤構築【完了】

### 完了項目
- [x] Next.js プロジェクト作成
- [x] 必要パッケージのインストール
  - [x] framer-motion
  - [x] embla-carousel-react
  - [x] clsx
  - [x] tailwind-merge
- [x] next.config.ts の GitHub Pages 設定
- [x] globals.css のカスタマイズ（カラー・スペーシング設定）
- [x] GitHub Actions ワークフロー作成
- [x] 開発サーバー起動確認

---

## 🚀 Phase 2: 型定義・データ構造作成

### タスク
- [ ] `types/` ディレクトリ作成
  - [ ] `types/profile.ts` - プロフィール型定義
  - [ ] `types/works.ts` - 制作物型定義
  - [ ] `types/skills.ts` - スキル型定義
  - [ ] `types/contact.ts` - コンタクト型定義
  - [ ] `types/availability.ts` - 稼働状況型定義
  - [ ] `types/index.ts` - 型エクスポート

- [ ] `data/` ディレクトリ作成
  - [ ] `data/profile.json` - ダミープロフィールデータ
  - [ ] `data/works.json` - ダミー制作物データ（3件程度）
  - [ ] `data/skills.json` - ダミースキルデータ
  - [ ] `data/contact.json` - コンタクトリンク情報
  - [ ] `data/availability.json` - 稼働可能状況

- [ ] `lib/utils.ts` 作成
  - [ ] `cn()` 関数（clsx + tailwind-merge）
  - [ ] `scrollToSection()` 関数（スムーススクロール用）

### 成果物
- 型定義ファイル 6個
- JSONデータファイル 5個
- ユーティリティファイル 1個

### 所要時間目安
30分

---

## 🎨 Phase 3: 共通コンポーネント作成

### タスク
- [ ] `components/animations/FadeIn.tsx` 作成
  - [ ] Framer Motion でフェードインアニメーション実装
  - [ ] Props: children, delay, direction

- [ ] `components/ui/SectionWrapper.tsx` 作成
  - [ ] セクション共通のラッパーコンポーネント
  - [ ] Props: id, title, children, className
  - [ ] padding/margin の統一
  - [ ] タイトル表示機能

### 成果物
- アニメーションコンポーネント 1個
- UIコンポーネント 1個

### 所要時間目安
30分

---

## 🧭 Phase 4: ヘッダー・ナビゲーション実装

### タスク
- [ ] `components/layout/Header.tsx` 作成
  - [ ] Sticky ヘッダー実装
  - [ ] メニュー項目配列（TOP, About, Works, Profile, Skills, Contact, Availability）
  - [ ] PC: 横並びメニュー表示
  - [ ] Mobile: ハンバーガーアイコン表示
  - [ ] スムーススクロール実装
  - [ ] アクティブセクションのハイライト（オプション）

- [ ] `components/layout/MobileMenu.tsx` 作成
  - [ ] 全画面オーバーレイメニュー
  - [ ] 開閉アニメーション（Framer Motion）
  - [ ] メニュークリックで閉じる

- [ ] `app/layout.tsx` 更新
  - [ ] Header コンポーネント配置
  - [ ] メタデータ設定（SEO）

### 成果物
- レイアウトコンポーネント 2個
- メタデータ設定完了

### 所要時間目安
1時間

---

## 📄 Phase 5: セクションコンポーネント実装

### 5-1: TopSection
- [ ] `components/sections/TopSection.tsx` 作成
  - [ ] プロフィール画像表示（円形）
  - [ ] 名前・ロール表示
  - [ ] シンプルなキャッチコピー
  - [ ] 中央揃えレイアウト
  - [ ] フェードインアニメーション

### 5-2: AboutSection
- [ ] `components/sections/AboutSection.tsx` 作成
  - [ ] profile.json から description 読み込み
  - [ ] 2カラムレイアウト（PC）/ 1カラム（Mobile）
  - [ ] フェードインアニメーション

### 5-3: WorksSection
- [ ] `components/ui/WorksCarousel.tsx` 作成
  - [ ] Embla Carousel 実装
  - [ ] 矢印ナビゲーション
  - [ ] ドラッグ/スワイプ対応
  - [ ] カード形式で表示（画像・タイトル・説明・タグ）

- [ ] `components/sections/WorksSection.tsx` 作成
  - [ ] works.json からデータ読み込み
  - [ ] WorksCarousel コンポーネント配置

### 5-4: ProfileSection
- [ ] `components/sections/ProfileSection.tsx` 作成
  - [ ] profile.json から詳細情報表示
  - [ ] 経歴・自己紹介文
  - [ ] シンプルなレイアウト

### 5-5: SkillsSection
- [ ] `components/ui/SkillCard.tsx` 作成（オプション）
  - [ ] スキル名表示
  - [ ] バッジ/タグ形式

- [ ] `components/sections/SkillsSection.tsx` 作成
  - [ ] skills.json からデータ読み込み
  - [ ] カテゴリ別グリッド表示
  - [ ] レスポンシブ対応（1/2/3カラム）

### 5-6: ContactSection
- [ ] `components/sections/ContactSection.tsx` 作成
  - [ ] contact.json からリンク情報読み込み
  - [ ] アイコン + テキストリンク
  - [ ] 外部リンク（GitHub, X, Email）
  - [ ] ホバーエフェクト

### 5-7: AvailabilitySection
- [ ] `components/sections/AvailabilitySection.tsx` 作成
  - [ ] availability.json からデータ読み込み
  - [ ] テキスト表示（初期実装）
  - [ ] シンプルなレイアウト

### 成果物
- セクションコンポーネント 7個
- UIコンポーネント 2個（Carousel, SkillCard）

### 所要時間目安
3時間

---

## 🔗 Phase 6: メインページ統合

### タスク
- [ ] `app/page.tsx` 更新
  - [ ] すべてのセクションコンポーネントをインポート
  - [ ] 順序通りに配置（TOP → About → Works → Profile → Skills → Contact → Availability）
  - [ ] 各セクションに id 属性設定
  - [ ] JSONデータ読み込み処理

### 成果物
- メインページ完成

### 所要時間目安
30分

---

## 🎭 Phase 7: アニメーション追加

### タスク
- [ ] FadeIn コンポーネントを各セクションに適用
- [ ] スクロールトリガーアニメーション実装（Framer Motion の `whileInView`）
- [ ] 控えめな遅延設定（stagger効果）
- [ ] パフォーマンス確認

### 成果物
- 全セクションにアニメーション適用

### 所要時間目安
1時間

---

## 🖼️ Phase 8: ダミー画像配置

### タスク
- [ ] `public/images/dummy/` にダミー画像配置
  - [ ] profile.jpg（プロフィール画像）
  - [ ] work1.jpg, work2.jpg, work3.jpg（制作物画像）
  - [ ] placeholder画像生成（https://placehold.co/ 等）

- [ ] 画像パス確認・表示確認

### 成果物
- ダミー画像 4個以上

### 所要時間目安
15分

---

## 🎨 Phase 9: デザインブラッシュアップ

### タスク
- [ ] 各セクションのスペーシング調整
- [ ] フォントサイズ・行間調整
- [ ] ホバーエフェクト追加
- [ ] カラーコントラスト確認
- [ ] レスポンシブ確認（Mobile / Tablet / PC）
- [ ] アクセシビリティチェック
  - [ ] alt属性確認
  - [ ] 見出しレベル確認
  - [ ] キーボードナビゲーション確認

### 成果物
- デザイン調整完了

### 所要時間目安
1時間

---

## 🚢 Phase 10: デプロイ準備・公開

### タスク
- [ ] ビルドテスト
  ```bash
  npm run build
  ```

- [ ] ビルド成果物確認（`out/` ディレクトリ）

- [ ] GitHub にプッシュ
  ```bash
  git add .
  git commit -m "Initial portfolio site"
  git push origin main
  ```

- [ ] GitHub Pages 設定
  - [ ] リポジトリ設定 → Pages → Source: GitHub Actions

- [ ] デプロイ確認
  - [ ] GitHub Actions ワークフロー実行確認
  - [ ] 公開URL確認

- [ ] OGP画像作成・設定（オプション）

### 成果物
- GitHub Pages で公開完了

### 所要時間目安
30分

---

## 🔄 Phase 11: データ差し替え（本番化）

### タスク
- [ ] `data/profile.json` を実際のデータに更新
- [ ] `data/works.json` を実際の制作物データに更新
- [ ] `data/skills.json` を実際のスキルに更新
- [ ] `data/contact.json` を実際のリンクに更新
- [ ] `data/availability.json` を実際の稼働状況に更新
- [ ] プロフィール画像差し替え
- [ ] 制作物画像差し替え
- [ ] 再ビルド・デプロイ

### 成果物
- 本番データでの公開完了

### 所要時間目安
1時間

---

## 📊 進捗管理

### 全体進捗
- [ ] Phase 1: 基盤構築 ✅
- [ ] Phase 2: 型定義・データ構造作成
- [ ] Phase 3: 共通コンポーネント作成
- [ ] Phase 4: ヘッダー・ナビゲーション実装
- [ ] Phase 5: セクションコンポーネント実装
- [ ] Phase 6: メインページ統合
- [ ] Phase 7: アニメーション追加
- [ ] Phase 8: ダミー画像配置
- [ ] Phase 9: デザインブラッシュアップ
- [ ] Phase 10: デプロイ準備・公開
- [ ] Phase 11: データ差し替え（本番化）

### 推定総所要時間
**約 9〜10時間**

---

## 🎯 次のアクション

**現在地: Phase 1 完了 → Phase 2 へ**

次は型定義とデータ構造を作成します。以下のコマンドで準備完了を確認してください：

```bash
npm run dev
```

開発サーバーが起動していることを確認したら、Phase 2 の作業を開始してください。

---

## 📝 メモ

- データはすべてJSON管理で差し替え容易
- コンポーネントは再利用性を重視
- アニメーションは控えめに（パフォーマンス優先）
- Mobile First 設計
- GitHub Pages の basePath に注意（ローカルと本番で挙動が異なる）

---

## 🔗 関連ドキュメント

- 設計書: `DESIGN.md`
- 要件定義: プロジェクトルートに配置予定
- Next.js ドキュメント: https://nextjs.org/docs
- Tailwind CSS ドキュメント: https://tailwindcss.com/docs
- Framer Motion ドキュメント: https://www.framer.com/motion/
- Embla Carousel ドキュメント: https://www.embla-carousel.com/
