# Tasklist: Personal Works セクション レイアウト改善

## タスク一覧

### Task 1: `ImageCarousel.tsx` に `className` prop を追加
- `ImageCarouselProps` に `className?: string` を追加
- コンテナ div のクラスを `className ?? "relative w-full h-64 md:h-80 rounded-xl overflow-hidden bg-slate-100"` に変更
- 検証: 既存の呼び出し箇所で見た目が変わらないこと

### Task 2: `PersonalWorkDetail.tsx` のレイアウトを2カラムに変更
- 全体を `flex flex-col md:flex-row gap-8 items-start` のコンテナに変更
- 左カラム: 幅 `w-48 md:w-56`、`ImageCarousel` を `aspect-[9/19] rounded-2xl shadow-lg` で表示
- 右カラム: `flex-1` で Overview / Status / Tech Stack / Links を縦に並べる
- 検証: デスクトップで2カラム、モバイルで縦積みになること

### Task 3: 動作確認
- dev サーバーを起動してブラウザで確認
- デスクトップ: 左画像・右情報の2カラム表示
- モバイル幅: 縦積みへのフォールバック
- カルーセルの前後ナビゲーションが動作する
- 全情報（Overview / Status / Tech Stack / Links）が表示される

## 完了条件

- [x] Task 1 完了
- [x] Task 2 完了
- [x] Task 3 の目視確認すべて通過
- [x] `npm run build` がエラーなし
