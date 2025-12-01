# NPO法人ほかげ Webサイト生成プロジェクト

NPO法人ほかげの公式Webサイトを構築するためのプロジェクトです。Gemini APIを活用してコンテンツと画像を生成し、静的サイトとして出力します。

## プロジェクト構成

```
hokage-hp/
├── scripts/                    # ビルドスクリプト
│   ├── generate-content.js     # コンテンツ生成（Gemini API）
│   ├── generate-service-images.js  # サービス画像生成
│   ├── build-site.js          # 静的サイトビルド
│   ├── content-data-1.js      # コンテンツデータ（前半）
│   ├── content-data-2.js      # コンテンツデータ（後半）
│   └── count_chars.py         # 文字数カウントユーティリティ
├── website/                   # Webサイトソース
│   ├── src/                   # ソースコード（Next.js）
│   ├── content/               # 生成されたMarkdownコンテンツ
│   │   ├── services/          # サービス紹介ページ
│   │   └── pages/             # 固定ページ
│   ├── public/                # 静的アセット
│   │   └── images/            # 画像ファイル
│   └── dist/                  # ビルド出力（静的HTML）
├── generated-images/          # AI生成画像の保存先
├── generate-image.js          # 単体画像生成ツール
├── test-api.js                # Gemini API接続テスト
├── package.json               # プロジェクト設定
├── .env                       # APIキー設定（非公開）
└── README.md                  # このファイル
```

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
cd website && npm install
```

### 2. APIキーの設定

`.env`ファイルにGemini APIキーを設定してください。

```env
GEMINI_API_KEY=your_api_key_here
```

## 使用方法

### ビルドワークフロー（推奨）

Webサイト全体をビルドする場合:

```bash
npm run build
```

このコマンドは以下を順次実行します:
1. `build:content` - Gemini APIでコンテンツ生成
2. `build:images` - サービス画像の生成
3. `build:site` - 静的HTMLサイトのビルド

### 個別タスク

各ステップを個別に実行する場合:

```bash
# 1. コンテンツ生成のみ
npm run build:content

# 2. 画像生成のみ
npm run build:images

# 3. サイトビルドのみ
npm run build:site
```

### ローカルプレビュー

生成されたサイトをローカルで確認:

```bash
npm run serve
```

ブラウザで `http://localhost:3333` にアクセスしてください。

### 開発用ツール

#### API接続テスト

Gemini APIが正しく動作するか確認:

```bash
npm run test
```

#### 単体画像生成

個別のプロンプトで画像を生成:

```bash
npm run generate "A beautiful sunset over mountains"
```

生成された画像は `generated-images/` フォルダに保存されます。

## 技術スタック

### コンテンツ生成
- **Gemini API**: AIによるコンテンツと画像の自動生成
  - テキスト生成: `gemini-2.0-flash`
  - 画像生成: `gemini-3-pro-image-preview`
- **Marked**: Markdown → HTML変換

### Webサイト
- **Next.js**: Reactベースのフレームワーク
- **TypeScript**: 型安全な開発
- **Tailwind CSS**: ユーティリティファーストCSS
- **ESLint**: コード品質管理

### 配信
- 静的HTML生成（`website/dist/`）
- GitHub Pagesや各種ホスティングサービスで配信可能

## サービス内容

以下のサービスページが自動生成されます:

1. **ホームページ作成** (`homepage.md`) - Webサイト制作サービス
2. **ロゴ作成** (`logo.md`) - ブランディングデザイン
3. **制作物デザイン** (`design.md`) - 各種印刷物・DTPデザイン
4. **Web広告運用** (`webad.md`) - デジタルマーケティング支援
5. **システム開発** (`system.md`) - 業務システム・Webアプリ開発
6. **ITコンサルティング** (`consulting.md`) - IT戦略支援
7. **サポート業務** (`support.md`) - 運用保守サービス

## 画像生成パラメータ

`generate-image.js`および`scripts/generate-service-images.js`では以下のパラメータが設定可能:

- `sampleCount`: 生成画像数（デフォルト: 1）
- `aspectRatio`: アスペクト比（例: "1:1", "16:9", "9:16"）
- `safetyFilterLevel`: 安全フィルターレベル
- `personGeneration`: 人物生成の許可設定

## トラブルシューティング

### APIエラーが発生する場合

1. `.env`ファイルのAPIキーを確認
2. `npm run test`でAPI接続を確認
3. Gemini APIの利用状況・クォータを確認

### モデルが見つからない場合

Google AI Studioで以下を確認:
- APIキーの権限設定
- Imagen 3モデルへのアクセス権限

### ビルドエラーが発生する場合

```bash
# node_modulesをクリーンインストール
rm -rf node_modules package-lock.json
npm install

cd website
rm -rf node_modules package-lock.json
npm install
```

## ライセンス

ISC

## 開発者向け情報

### コンテンツデータの編集

コンテンツの内容を変更する場合は以下のファイルを編集:
- `scripts/content-data-1.js`
- `scripts/content-data-2.js`

### サイトデザインのカスタマイズ

- テンプレート: `scripts/build-site.js`
- スタイル: `website/src/` 内のCSSファイル
- Next.jsコンポーネント: `website/src/` ディレクトリ

### デプロイ

`website/dist/` フォルダの内容を任意のホスティングサービスにアップロードしてください。

GitHub Pagesの場合:
```bash
git subtree push --prefix website/dist origin gh-pages
```
