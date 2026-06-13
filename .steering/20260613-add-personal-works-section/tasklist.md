# タスクリスト

## 完了条件
- ナビゲーションに `Business Projects` と `Personal Works` が表示される
- 既存の企業案件が Business Projects セクションに表示される
- Personal Works セクションが Business Projects の直後に表示される（データ空のときは「準備中」表示）
- Personal Works の画像カルーセルが複数枚対応・1枚のときはナビ非表示
- `npm run lint` と `npm run build` がエラーなく完了する

---

## タスク

### 1. Business Projects へのリネーム ✅

- [x] `components/layout/Header.tsx`：`menuItems` の `Works` エントリを `{ label: 'Business Projects', href: 'business-projects' }` に変更し、直後に `{ label: 'Personal Works', href: 'personal-works' }` を追加する
- [x] `components/sections/WorksSection.tsx`：`SectionWrapper` の `id` を `"business-projects"`、`title` を `"Business Projects"` に変更する

---

### 2. 型定義・データファイルの追加 ✅

- [x] `types/personal-work.ts` を新規作成（`PersonalWork` インターフェース）
- [x] `types/index.ts` に `PersonalWork` の再エクスポートを追加
- [x] `data/personal-works.json` を新規作成（初期値：空配列 `[]`）

---

### 3. `ImageCarousel` コンポーネントの作成 ✅

- [x] `components/ui/ImageCarousel.tsx` を新規作成
  - Props: `images: string[]`
  - Embla Carousel で横スライド
  - 画像が1枚のときは矢印・ドットインジケーターを非表示
  - 画像が複数のときは矢印ボタン + ドットインジケーターを表示

---

### 4. `PersonalWorkDetail` コンポーネントの作成 ✅

- [x] `components/sections/PersonalWorkDetail.tsx` を新規作成
  - 上部：`ImageCarousel`（画面キャプチャ）
  - 下部2カラム：Overview（説明文）／ Tech Stack + URL/GitHub + Status

---

### 5. `PersonalWorksSection` コンポーネントの作成 ✅

- [x] `components/sections/PersonalWorksSection.tsx` を新規作成
  - `data/personal-works.json` をインポート
  - データが空のときは「準備中」メッセージを表示
  - データがあるときは `ProjectCard` のグリッド + `PersonalWorkDetail` の詳細パネルを表示

---

### 6. ページへの組み込みと最終確認 ✅

- [x] `app/page.tsx` に `PersonalWorksSection` を `WorksSection` の直後に追加
- [x] dev サーバーで全セクションの表示・ナビゲーション動作を確認
- [x] `npm run lint` を実行しエラーがないことを確認（既存エラー2件は本作業前から存在）
- [x] `npm run build` を実行しエラーがないことを確認

## 備考

- `ImageCarousel` の `next/image` に `sizes` prop 未指定。実データ登録時に画像が表示されない場合は `sizes="100vw"` を追加する
- PR: `feature/add-personal-works-section` → `main`
