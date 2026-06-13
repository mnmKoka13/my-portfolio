# ユビキタス言語定義

本プロジェクトで使用するドメイン用語・技術用語の定義。ドキュメント・コード・会話で一貫して使用する。

## ドメイン用語

| 日本語 | 英語（コード上） | 定義 |
|---|---|---|
| 制作物 / プロジェクト | `Project` / `Work` | 過去に携わった開発案件・成果物の1件。`data/projects.json` で管理 |
| スキル | `Skill` | エンジニアが習得・使用した技術や手法の1項目 |
| スキルカテゴリ | `SkillCategory` | スキルを分類するグループ（フロントエンド・バックエンド等） |
| コンタクト | `ContactLink` | 外部プラットフォーム（GitHub・X・メール）への連絡先リンク |
| 稼働状況 | `Availability` | 現在の受注可否と受注開始可能時期 |
| プロフィール | `Profile` | エンジニア本人の氏名・役割・自己紹介・趣味 |

### Availability のステータス値

| 値 | 意味 |
|---|---|
| `available` | 受注可能 |
| `limited` | 条件付きで対応可能（稼働時間・期間に制約あり） |
| `unavailable` | 現在受注不可 |

### Project（制作物）のフィールド定義

| フィールド | 説明 |
|---|---|
| `id` | 一意識別子（例: `work-1`） |
| `title` | プロジェクト名 |
| `description` | 担当内容・概要 |
| `tech` | 使用技術タグの配列 |
| `role` | 担当役割と規模（例: `チームリーダー（全体30名）`） |
| `start` | 開始年月（`YYYY-MM-DD` 形式） |
| `end` | 終了年月（`YYYY-MM-DD` 形式）。現在進行中の場合は `null` |
| `result` | 成果・貢献の一文サマリー |

## UI・UX 用語

| 用語 | 定義 |
|---|---|
| セクション | ページを構成する各ブロック（TOP / About / Works 等）。`<section>` タグと `id` 属性で識別する |
| スムーススクロール | ナビゲーションリンクをクリックした際に対象セクションへ滑らかにスクロールする動作。`scrollToSection()` で実装 |
| フェードイン | スクロールで要素が画面内に入ったときに透明→不透明へアニメーションする演出。`FadeIn` コンポーネントで実装 |
| スタガー | 複数要素を少しずつ時間差でフェードインさせる演出。`delay` prop で制御 |
| カルーセル | 制作物カードを横スクロールで切り替えるUI。Works セクションで使用（Embla Carousel） |

## 英語・日本語対応表（コード命名用）

| 日本語 | コード上の英語 |
|---|---|
| 制作物 / 実績 | `project` / `work` |
| スキル | `skill` |
| カテゴリ | `category` |
| 連絡先 | `contact` |
| 稼働状況 | `availability` |
| プロフィール | `profile` |
| セクション | `section` |
| ナビゲーション | `nav` / `header` |
| モバイルメニュー | `mobileMenu` |
| 選択中の | `active` |
| 表示する/非表示にする | `show` / `hide` |
| 展開する/折り畳む | `expand` / `collapse` |
| クリックハンドラ | `handle[Target][Action]`（例: `handleProjectClick`） |

## コード上の命名規則まとめ

| 種別 | 規則 | 例 |
|---|---|---|
| コンポーネント | PascalCase + 役割サフィックス | `WorksSection`, `SectionWrapper`, `FadeIn` |
| Props 型 | PascalCase + `Props` | `SectionWrapperProps` |
| データ型（interface/type） | PascalCase | `Project`, `SkillCategory` |
| 変数・関数 | camelCase | `activeProjectId`, `scrollToSection` |
| イベントハンドラ | `handle` + 対象 + 動作 | `handleProjectClick` |
| JSON ファイル | kebab-case | `projects.json`, `availability.json` |
| セクション id | kebab-case | `works`, `about`, `availability` |
