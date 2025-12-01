# Gemini API 画像生成ツール

Gemini API（gemini-3-pro-image-previewモデル）を使用して画像を生成するNode.jsツールです。

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. APIキーの設定

`.env`ファイルにGemini APIキーが設定されています。必要に応じて更新してください。

```
GEMINI_API_KEY=your_api_key_here
```

## 使用方法

### API接続テスト

まず、APIが正しく動作するかテストします:

```bash
npm run test
```

このコマンドは以下を実行します:
- テキスト生成APIの接続確認
- 利用可能なモデル一覧の取得

### 画像生成

プロンプトを指定して画像を生成します:

```bash
npm run generate "A beautiful sunset over mountains"
```

または直接実行:

```bash
node generate-image.js "A beautiful sunset over mountains"
```

生成された画像は`generated-images/`フォルダに保存されます。

## ファイル構成

```
hokage-hp/
├── package.json          # プロジェクト設定
├── .env                  # APIキー設定（Gitで管理しない）
├── .gitignore           # Git除外設定
├── generate-image.js    # 画像生成メインスクリプト
├── test-api.js          # API接続テストスクリプト
├── generated-images/    # 生成画像の保存先（自動作成）
└── README.md            # このファイル
```

## 使用モデル

- **画像生成**: `gemini-3-pro-image-preview` (Gemini 3 Pro Image Preview)
- **テキスト生成**: `gemini-2.0-flash` (テスト用)

## パラメータ

`generate-image.js`内で以下のパラメータを調整できます:

- `sampleCount`: 生成する画像の数（デフォルト: 1）
- `aspectRatio`: アスペクト比（例: "1:1", "16:9", "9:16"）
- `safetyFilterLevel`: 安全フィルターレベル
- `personGeneration`: 人物生成の許可設定

## 注意事項

- APIキーは`.env`ファイルで管理し、Gitにコミットしないでください
- 生成された画像は`output/`フォルダに保存されます
- Imagen 3モデルは画像生成専用です。テキスト生成には別のモデルを使用してください

## トラブルシューティング

### APIエラーが発生する場合

1. `.env`ファイルのAPIキーが正しいか確認
2. `npm run test`でAPI接続を確認
3. 利用可能なモデルを確認し、必要に応じてモデル名を変更

### モデルが見つからない場合

Imagen 3モデルへのアクセスが有効になっていない可能性があります。Google AI Studioで以下を確認してください:
- APIキーの権限
- Imagen 3モデルへのアクセス権限
