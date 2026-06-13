# タスクリスト

## 完了条件
- ナビゲーションに `Business Projects` と `Personal Works` が表示される
- 既存の企業案件が Business Projects セクションに表示される
- Personal Works セクションが Business Projects の直後に表示される（データ空のときは「準備中」表示）
- Personal Works の画像カルーセルが複数枚対応・1枚のときはナビ非表示
- `npm run lint` と `npm run build` がエラーなく完了する

---

## タスク

### 1. Business Projects へのリネーム

- [ ] `components/layout/Header.tsx`：`menuItems` の `Works` エントリを `{ label: 'Business Projects', href: 'business-projects' }` に変更し、直後に `{ label: 'Personal Works', href: 'personal-works' }` を追加する
- [ ] `components/sections/WorksSection.tsx`：`SectionWrapper` の `id` を `"business-projects"`、`title` を `"Business Projects"` に変更する

**検証：** dev サーバーでナビに `Business Projects` が表示され、クリックで正しいセクションへスクロールすること

---

### 2. 型定義・データファイルの追加

- [ ] `types/personal-work.ts` を新規作成（`PersonalWork` インターフェース）
- [ ] `types/index.ts` に `PersonalWork` の再エクスポートを追加
- [ ] `data/personal-works.json` を新規作成（初期値：空配列 `[]`）

**検証：** `npm run build` で型エラーがないこと

---

### 3. `ImageCarousel` コンポーネントの作成

- [ ] `components/ui/ImageCarousel.tsx` を新規作成
  - Props: `images: string[]`
  - Embla Carousel で横スライド
  - 画像が1枚のときは矢印・ドットインジケーターを非表示
  - 画像が複数のときは矢印ボタン + ドットインジケーターを表示

**検証：** 後続タスクの動作確認で一括検証

---

### 4. `PersonalWorkDetail` コンポーネントの作成

- [ ] `components/sections/PersonalWorkDetail.tsx` を新規作成
  - 上部：`ImageCarousel`（画面キャプチャ）
  - 下部2カラム：Overview（説明文）／ Tech Stack + URL/GitHub + Status

**検証：** 後続タスクの動作確認で一括検証

---

### 5. `PersonalWorksSection` コンポーネントの作成

- [ ] `components/sections/PersonalWorksSection.tsx` を新規作成
  - `data/personal-works.json` をインポート
  - データが空のときは「準備中」メッセージを表示
  - データがあるときは `ProjectCard` のグリッド + `PersonalWorkDetail` の詳細パネルを表示

**検証：** 後続タスクの動作確認で一括検証

---

### 6. ページへの組み込みと最終確認

- [ ] `app/page.tsx` に `PersonalWorksSection` を `WorksSection` の直後に追加
- [ ] dev サーバーで全セクションの表示・ナビゲーション動作を確認
- [ ] `npm run lint` を実行しエラーがないことを確認
- [ ] `npm run build` を実行しエラーがないことを確認
