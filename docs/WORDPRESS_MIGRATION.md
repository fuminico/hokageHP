# WordPress化マニュアル

このドキュメントでは、現在の静的HTMLサイトをWordPressで運用する方法を説明します。

## 目次

1. [概要](#概要)
2. [方法1: 静的HTMLをそのまま使用（推奨）](#方法1-静的htmlをそのまま使用推奨)
3. [方法2: WordPressテーマに変換](#方法2-wordpressテーマに変換)
4. [方法3: ページビルダープラグインを使用](#方法3-ページビルダープラグインを使用)

---

## 概要

現在のサイトは静的HTML（HTML + CSS + 画像）で構築されています。WordPressで運用する場合、以下の3つの方法があります：

| 方法 | 難易度 | 更新の容易さ | おすすめ度 |
|------|--------|-------------|-----------|
| 方法1: 静的HTMLプラグイン | ★☆☆ | ★☆☆ | ★★★ |
| 方法2: カスタムテーマ化 | ★★★ | ★★★ | ★★☆ |
| 方法3: ページビルダー | ★★☆ | ★★☆ | ★☆☆ |

---

## 方法1: 静的HTMLをそのまま使用（推奨）

WordPressのプラグインを使って、現在の静的HTMLをそのまま表示する方法です。

### メリット
- 設定が簡単
- 現在のデザインをそのまま維持
- 技術的な知識が少なくても可能

### デメリット
- WordPressの管理画面からコンテンツを直接編集できない
- 更新時は静的HTMLファイルを編集してアップロードする必要がある

### 手順

#### ステップ1: WordPressのインストール

1. レンタルサーバーの管理画面からWordPressをインストール
2. 基本設定を完了

#### ステップ2: プラグインのインストール

**Option A: Insert HTML Snippetプラグイン**

1. WordPress管理画面にログイン
2. 「プラグイン」→「新規追加」
3. 「Insert HTML Snippet」を検索してインストール・有効化

**Option B: Custom HTML Widgetプラグイン**

1. 「プラグイン」→「新規追加」
2. 「Custom HTML Widget」を検索してインストール・有効化

#### ステップ3: 静的ファイルのアップロード

1. FTPクライアントでWordPressがインストールされているサーバーに接続
2. `/wp-content/uploads/hokage-static/` フォルダを作成
3. 納品された `docs` フォルダの全ファイルをアップロード

```
wp-content/
└── uploads/
    └── hokage-static/
        ├── index.html
        ├── about.html
        ├── contact/
        ├── work/
        ├── styles/
        └── images/
```

#### ステップ4: ページの作成

1. WordPress管理画面で「固定ページ」→「新規追加」
2. タイトルを入力（例: "トップページ"）
3. エディタを「コードエディタ」モードに切り替え
4. 以下のコードを貼り付け：

```html
<iframe src="/wp-content/uploads/hokage-static/index.html"
        style="width:100%; height:100vh; border:none;"
        scrolling="yes">
</iframe>
```

5. 各ページ（About, Contact, Work等）について同様に作成

#### ステップ5: メニューの設定

1. 「外観」→「メニュー」
2. 作成したページをメニューに追加
3. 保存

### パスの修正

静的HTMLファイル内のパスを修正する必要があります：

```bash
# 全HTMLファイルで以下を置換
置換前: /hokageHP/
置換後: /wp-content/uploads/hokage-static/
```

---

## 方法2: WordPressテーマに変換

静的HTMLをWordPressテーマとして変換する方法です。

### メリット
- WordPressの管理画面から直接コンテンツを編集可能
- プラグインでSEO対策や機能拡張が容易
- WordPress本来の使い方

### デメリット
- 技術的な知識が必要（PHP, WordPress開発の知識）
- 変換作業に時間がかかる
- 外部委託が必要な場合がある

### 必要なファイル構成

WordPressテーマには以下のファイルが最低限必要です：

```
hokage-theme/
├── style.css          # テーマ情報（必須）
├── index.php          # メインテンプレート（必須）
├── functions.php      # テーマ機能
├── header.php         # ヘッダーテンプレート
├── footer.php         # フッターテンプレート
├── page.php           # 固定ページテンプレート
├── single.php         # 投稿ページテンプレート
├── screenshot.png     # テーマのスクリーンショット
├── assets/
│   ├── css/
│   │   └── main.css
│   └── images/
└── template-parts/
```

### テーマ変換の手順（概要）

#### 1. style.css の作成

```css
/*
Theme Name: NPO Hokage
Theme URI: https://hokage.or.jp
Author: NPO Hokage
Author URI: https://hokage.or.jp
Description: NPO法人ほかげの公式サイトテーマ
Version: 1.0.0
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Text Domain: hokage
*/

/* 既存のmain.cssの内容をここに含める */
```

#### 2. header.php の作成

現在の `index.html` の `<head>` から `<header>` までを抽出：

```php
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php wp_title('|', true, 'right'); bloginfo('name'); ?></title>
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
  <header class="site-header">
    <div class="container">
      <a href="<?php echo home_url('/'); ?>" class="logo">NPOほかげ</a>
      <nav>
        <?php
        wp_nav_menu(array(
          'theme_location' => 'primary',
          'container' => false,
        ));
        ?>
      </nav>
    </div>
  </header>
```

#### 3. footer.php の作成

```php
  <footer class="site-footer">
    <div class="container">
      <p>&copy; <?php echo date('Y'); ?> NPO Hokage. All Rights Reserved.</p>
    </div>
  </footer>
  <?php wp_footer(); ?>
</body>
</html>
```

#### 4. index.php の作成

```php
<?php get_header(); ?>

<main>
  <?php
  if (have_posts()) :
    while (have_posts()) : the_post();
      the_content();
    endwhile;
  endif;
  ?>
</main>

<?php get_footer(); ?>
```

#### 5. functions.php の作成

```php
<?php
function hokage_setup() {
  // テーマサポート
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');

  // メニューの登録
  register_nav_menus(array(
    'primary' => 'プライマリーメニュー',
  ));
}
add_action('after_setup_theme', 'hokage_setup');

// スタイルとスクリプトの読み込み
function hokage_scripts() {
  wp_enqueue_style('hokage-style', get_stylesheet_uri());
  wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Shippori+Mincho:wght@400;600&display=swap');
}
add_action('wp_enqueue_scripts', 'hokage_scripts');
?>
```

### テーマのインストール

1. 上記ファイルを `hokage-theme` フォルダにまとめる
2. ZIPファイルに圧縮
3. WordPress管理画面→「外観」→「テーマ」→「新規追加」→「テーマのアップロード」
4. ZIPファイルをアップロードして有効化

### 注意事項

この方法は技術的な知識が必要です。自信がない場合は、Web制作会社に依頼することをおすすめします。

**推定作業時間**: 8〜16時間
**推定費用（外部委託）**: 10万円〜30万円

---

## 方法3: ページビルダープラグインを使用

ElementorやDiviなどのページビルダーを使用する方法です。

### 推奨プラグイン

- **Elementor** (無料版あり)
- **Divi Builder** (有料)
- **Beaver Builder** (無料版あり)

### 手順（Elementorの場合）

#### 1. プラグインのインストール

1. WordPress管理画面→「プラグイン」→「新規追加」
2. 「Elementor」を検索
3. インストールして有効化

#### 2. ページの作成

1. 「固定ページ」→「新規追加」
2. 「Elementorで編集」をクリック
3. 左側のウィジェットから「HTML」をドラッグ
4. 現在のHTMLコードを貼り付け

#### 3. CSSの追加

1. Elementor編集画面→左下の歯車アイコン
2. 「カスタムCSS」タブ
3. `main.css` の内容を貼り付け

### デメリット

- ページビルダーに依存する
- サイトが重くなる可能性
- 現在のデザインを完全再現するのが難しい

---

## おすすめの運用方法

### 初期段階（方法1）

まずは**方法1**で静的HTMLをそのまま使用することをおすすめします。

- 費用がかからない
- 現在のデザインを維持
- すぐに運用開始できる

### 将来的な拡張（方法2）

サイトの更新頻度が高くなったら、**方法2**でWordPressテーマ化を検討：

- ブログ機能の追加
- お問い合わせフォームの管理
- SEO対策プラグインの活用

---

## 技術サポート

### WordPress化の外部委託先

テーマ変換を外部に依頼する場合の参考先：

1. **クラウドワークス / ランサーズ**
   - 個人のフリーランスに依頼
   - 費用: 5万円〜15万円程度

2. **地域のWeb制作会社**
   - しっかりしたサポート
   - 費用: 15万円〜30万円程度

### 相談窓口

技術的な質問は、GitHubリポジトリのIssuesまでお願いします。

---

## 参考資料

- [WordPress公式ドキュメント](https://ja.wordpress.org/support/)
- [WordPress Codex 日本語版](https://wpdocs.osdn.jp/)
- [Elementor公式サイト](https://elementor.com/)

---

**作成日**: 2024年12月1日
**バージョン**: 1.0.0
