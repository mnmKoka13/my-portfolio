# Tasklist: Personal Works レイアウトのtype対応

## タスク一覧

### Task 1: `types/personal-work.ts` に `type` フィールドを追加
- `PersonalWork` インターフェースに `type: 'mobile' | 'web'` を追加
- 検証: TypeScript エラーが出ないこと（既存の呼び出し箇所で `type` が未指定ならビルドエラーになる）

### Task 2: `data/personal-works.json` に `type` を付与
- `personal-work-1`（運動リマインダー）に `"type": "mobile"` を追加
- `personal-work-2`（ポートフォリオサイト）に `"type": "web"` を追加

### Task 3: `PersonalWorkDetail.tsx` の画像コンテナをtype対応に変更
- `work.type` に応じて画像コンテナの幅・アスペクト比クラスを切り替える
- 検証: デスクトップで mobile は縦長、web は横長で表示されること

### Task 4: 動作確認
- dev サーバーを起動してブラウザで確認
- `personal-work-1` 選択時: 縦長（9:19）の画像カラム
- `personal-work-2` 選択時: 横長（16:9）の画像カラム
- どちらも「左：画像 / 右：説明」の2カラムレイアウトを維持
- モバイル幅: 縦積みへのフォールバックが維持されている

## 完了条件

- [ ] Task 1 完了
- [ ] Task 2 完了
- [ ] Task 3 完了
- [ ] Task 4 の目視確認すべて通過
