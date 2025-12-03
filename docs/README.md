# NPO法人ほかげ 公式Webサイト - 納品ファイル

このフォルダには、NPO法人ほかげの公式Webサイトの完成版ファイルが含まれています。

## 納品物の内容

```
docs/
├── index.html              # トップページ
├── about.html              # 私たちについて
├── contact/                # お問い合わせ
│   └── index.html
├── work/                   # サービス一覧・詳細
│   ├── index.html          # サービス一覧
│   ├── homepage.html       # ホームページ制作・運用
│   ├── design.html         # デザイン・印刷物制作
│   ├── logo.html           # ロゴ・キャラクターデザイン
│   ├── webad.html          # Web広告運用サポート
│   ├── system.html         # 業務システム構築・ツール開発
│   ├── support.html        # パソコン・ITサポート
│   └── consulting.html     # 業務改善コンサルティング
├── styles/                 # スタイルシート
│   └── main.css
└── images/                 # 画像ファイル
    ├── home.jpg            # トップページヒーロー画像
    ├── about.jpg           # Aboutページヒーロー画像
    ├── contact.jpg         # Contactページヒーロー画像
    ├── work-index.jpg      # Workページヒーロー画像
    └── services/           # サービス詳細ページの画像
        ├── homepage.jpg
        ├── design.jpg
        ├── logo.jpg
        ├── webad.jpg
        ├── system.jpg
        ├── support.jpg
        ├── consulting.jpg
        └── work-index.jpg
```

## デモサイト

現在、以下のURLで公開中です：
**https://fuminico.github.io/hokageHP/**

## サーバーへの設置方法

### 方法1: レンタルサーバー（推奨）

1. **FTPクライアントの準備**
   - FileZilla、WinSCP、Cyberduckなどをインストール

2. **ファイルのアップロード**
   - このフォルダ内の全ファイルをサーバーの公開ディレクトリ（`public_html/`など）にアップロード
   - または、サブディレクトリ（例: `public_html/hokage/`）にアップロード

3. **パスの調整（サブディレクトリに設置する場合）**
   - 全HTMLファイルの以下のパスを変更：
     - `/hokageHP/` → `/` （ルートに設置）
     - `/hokageHP/` → `/hokage/` （サブディレクトリに設置）

4. **動作確認**
   - ブラウザでアクセスして表示を確認
   - 全ページのリンクが正常に動作するか確認
   - 画像が正しく表示されるか確認

### 方法2: GitHub Pages（現在の設定）

既にGitHub Pagesで公開されています。
- リポジトリ: https://github.com/fuminico/hokageHP
- 公開URL: https://fuminico.github.io/hokageHP/

### 方法3: Netlify / Vercelなどの無料ホスティング

1. **Netlifyの場合**
   - Netlifyにサインアップ
   - 「New site from Git」を選択
   - GitHubリポジトリを連携
   - ビルド設定不要（静的ファイルのみ）
   - デプロイ完了

2. **Vercelの場合**
   - Vercelにサインアップ
   - 「New Project」を選択
   - GitHubリポジトリをインポート
   - Framework Preset: `Other`
   - デプロイ完了

## 推奨サーバー環境

- **Webサーバー**: Apache 2.4以上 または Nginx 1.18以上
- **PHP**: 不要（静的HTMLのみ）
- **データベース**: 不要
- **SSL/HTTPS**: 推奨（Let's Encryptなどで無料取得可能）

## パスの設定について

このサイトは現在、GitHub Pagesの仕様に合わせて `/hokageHP/` というパスプレフィックスを使用しています。

### ルートドメインに設置する場合（例: https://hokage.or.jp/）

全HTMLファイル内の以下のパスを一括置換してください：

- **置換前**: `/hokageHP/`
- **置換後**: `/`

例:
```html
<!-- 変更前 -->
<link rel="stylesheet" href="/hokageHP/styles/main.css">
<a href="/hokageHP/">Home</a>

<!-- 変更後 -->
<link rel="stylesheet" href="/styles/main.css">
<a href="/">Home</a>
```

### サブディレクトリに設置する場合（例: https://example.com/hokage/）

全HTMLファイル内の以下のパスを一括置換してください：

- **置換前**: `/hokageHP/`
- **置換後**: `/hokage/`

## カスタマイズ方法

### 1. テキストの変更

各HTMLファイルをテキストエディタで開いて直接編集してください。

### 2. 画像の変更

`images/` フォルダ内の画像を差し替えてください。
- ファイル名は同じにする
- 推奨サイズ:
  - ヒーロー画像: 1920×600px
  - サービス画像: 800×600px

### 3. スタイルの変更

`styles/main.css` を編集してください。

主な色の設定:
```css
:root {
  --color-primary: #8B5E3C;      /* メインカラー（茶色） */
  --color-primary-dark: #6B4423; /* 濃い茶色 */
  --color-bg: #FFF8F0;           /* 背景色（クリーム） */
  --color-text: #333333;         /* テキスト色 */
}
```

## 更新・保守について

### コンテンツの更新

1. HTMLファイルを直接編集
2. FTPでサーバーにアップロード
3. ブラウザで確認

### バックアップ

定期的に全ファイルをバックアップすることを推奨します。

## WordPress化について

将来的にWordPressでの運用を検討される場合は、以下の方法があります：

1. **HTMLインポートプラグインを使用**
   - 「Simply Static」などのプラグインで静的HTMLをインポート

2. **カスタムテーマを作成**
   - このHTMLをベースにWordPressテーマを開発

詳細は別途ご相談ください。

## 技術サポート

### よくある質問

**Q: 画像が表示されません**
A: パスの設定を確認してください。サーバーのルートに設置した場合は `/hokageHP/` を `/` に置換する必要があります。

**Q: リンクが動作しません**
A: パスの設定を確認してください。相対パスと絶対パスが正しく設定されているか確認してください。

**Q: スマートフォンで表示が崩れます**
A: レスポンシブ対応済みですが、ブラウザのキャッシュをクリアしてください。

### お問い合わせ

技術的な質問やカスタマイズのご相談は、GitHubリポジトリのIssuesまでお願いします。

## ライセンス

このWebサイトの著作権はNPO法人ほかげに帰属します。

## 制作情報

- **制作日**: 2024年12月
- **技術**: HTML5, CSS3, JavaScript
- **対応ブラウザ**: Chrome, Firefox, Safari, Edge（最新版）
- **レスポンシブ対応**: スマートフォン、タブレット、PC
- **画像生成**: Gemini API (AI生成)

---

**納品日**: 2024年12月1日
**バージョン**: 1.0.0
