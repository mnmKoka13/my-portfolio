# 要求内容

## 概要

既存の Works セクション（企業案件）と個人制作アプリを分離し、それぞれ独立したセクションとして掲載する。

## 変更・追加する機能

### 1. 既存 Works セクションのリネーム

- 表示名：`Works` → `Business Projects`
- セクション id：`works` → `business-projects`
- ナビゲーションラベルも同様に変更

### 2. Personal Works セクションの新規追加

- 個人制作アプリ・サービスを掲載する新セクション
- 表示名：`Personal Works`
- セクション id：`personal-works`
- ページ上の配置：Business Projects の直後

### 3. Personal Works のコンテンツ仕様

- データは新規 JSON ファイル（`data/personal-works.json`）で管理
- 1プロジェクトにつき複数の画像（画面キャプチャ）を掲載可能
- 複数画像はスライドショー形式（カルーセル）で表示する

## ユーザーストーリー

- 訪問者として、企業案件と個人制作を区別して閲覧したい。そうすれば活動の幅と性質を正確に把握できる。
- エンジニア本人として、個人制作アプリの画面を複数枚見せたい。そうすれば UI や機能の具体的なイメージを伝えられる。

## 受け入れ条件

- ナビゲーションに `Business Projects` と `Personal Works` の両方が表示される
- 既存の企業案件データ（`data/projects.json`）は Business Projects セクションに引き続き表示される
- Personal Works セクションが Business Projects の直後に表示される
- Personal Works の各プロジェクトで、画像を複数枚登録でき、カルーセル操作（スワイプ・矢印）で切り替えられる
- 画像が1枚のプロジェクトではカルーセルのナビゲーション（矢印・ページ送り）を非表示にする
- `npm run build` がエラーなく完了する

## 制約事項

- 既存の Business Projects セクションの表示ロジック・UIは変更しない（セクション id とラベルのリネームのみ）
- コンテンツ追加は JSON 編集のみで完結する設計を維持する
- 現時点では Personal Works のデータは空（プレースホルダー）でよい
