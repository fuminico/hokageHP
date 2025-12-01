# Hokage HP - Webサイト

このプロジェクトは[Next.js](https://nextjs.org)を使用して構築されたWebサイトです。[`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app)でブートストラップされています。

## 技術スタック

- **フレームワーク**: Next.js 16.0.5 (App Router)
- **言語**: TypeScript
- **UIライブラリ**: React 19.2.0
- **スタイリング**: Tailwind CSS v4
- **リンター**: ESLint

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 開発サーバーの起動

開発サーバーを起動します:

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて結果を確認できます。

`src/app/page.tsx`を編集することでページの内容を変更できます。ファイルを編集すると、ページは自動的に更新されます。

## プロジェクト構成

```
website/
├── src/                  # ソースコード
│   ├── app/             # Next.js App Router
│   ├── components/      # Reactコンポーネント
│   └── ...
├── public/              # 静的ファイル
├── content/             # コンテンツデータ
├── dist/                # ビルド出力（静的サイト）
├── package.json         # プロジェクト設定
├── tsconfig.json        # TypeScript設定
├── next.config.ts       # Next.js設定
└── README.md           # このファイル
```

## 利用可能なコマンド

### 開発

```bash
npm run dev
```

開発サーバーを起動します（ホットリロード有効）。

### ビルド

```bash
npm run build
```

本番用にアプリケーションをビルドします。

### 本番サーバー起動

```bash
npm run start
```

ビルド後のアプリケーションを本番モードで起動します。

### リント

```bash
npm run lint
```

ESLintを実行してコードの品質をチェックします。

## フォント最適化

このプロジェクトは[`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)を使用して、Vercelの新しいフォントファミリーである[Geist](https://vercel.com/font)を自動的に最適化して読み込みます。

## 詳しく学ぶ

Next.jsについて詳しく学ぶには、以下のリソースをご覧ください:

- [Next.js ドキュメント](https://nextjs.org/docs) - Next.jsの機能とAPIについて学ぶ
- [Next.js チュートリアル](https://nextjs.org/learn) - インタラクティブなNext.jsチュートリアル
- [Next.js GitHubリポジトリ](https://github.com/vercel/next.js) - フィードバックと貢献を歓迎します！

## デプロイ

### Vercelへのデプロイ

Next.jsアプリをデプロイする最も簡単な方法は、Next.jsの開発元である[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)を使用することです。

詳細については、[Next.jsデプロイメントドキュメント](https://nextjs.org/docs/app/building-your-application/deploying)をご覧ください。

### 静的サイトとしてのデプロイ

このプロジェクトは静的サイトとしてもビルド可能です。`dist/`フォルダに出力された静的ファイルを任意のWebサーバーにデプロイできます。

## トラブルシューティング

### ポート3000が既に使用されている場合

別のポートで開発サーバーを起動します:

```bash
npm run dev -- -p 3001
```

### ビルドエラーが発生する場合

1. `node_modules`を削除して再インストール:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. Next.jsのキャッシュをクリア:
   ```bash
   rm -rf .next
   npm run build
   ```

## ライセンス

このプロジェクトは非公開プロジェクトです。
