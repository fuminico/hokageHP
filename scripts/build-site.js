import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.join(__dirname, '..');
const CONTENT_DIR = path.join(PROJECT_ROOT, 'website', 'content', 'services');
const PAGES_DIR = path.join(PROJECT_ROOT, 'website', 'content', 'pages');
const TEMPLATE_DIR = path.join(PROJECT_ROOT, 'website', 'src');
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'website', 'dist');
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'website', 'public');

// HTMLテンプレート
const htmlTemplate = (title, content, slug, activeNav = 'work', showSidebar = true) => `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | NPOほかげ</title>
  <link rel="stylesheet" href="/styles/main.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Shippori+Mincho:wght@400;600&display=swap" rel="stylesheet">
</head>
<body>
  <header class="site-header">
    <div class="container">
      <a href="/" class="logo">NPOほかげ</a>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about.html" class="${activeNav === 'about' ? 'active' : ''}">About</a></li>
          <li><a href="/work" class="${activeNav === 'work' ? 'active' : ''}">Work</a></li>
          <li><a href="/contact" class="${activeNav === 'contact' ? 'active' : ''}">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main>
    <article class="service-detail">
      <div class="hero-image">
        <img src="/images/${activeNav === 'work' ? 'services/' + slug : slug}.jpg" alt="${title}" class="hero-bg" onError="this.style.display='none';this.parentElement.style.backgroundColor='#8B5E3C'">
        <div class="container">
          <h1>${title}</h1>
        </div>
      </div>
      
      <div class="container content-wrapper${showSidebar ? '' : ' no-sidebar'}">
        <div class="content-body">
          ${content}
        </div>
        
        ${showSidebar ? `<aside class="sidebar">
          <div class="contact-box">
            <h3>お問い合わせ</h3>
            <p>このサービスに関するご相談・お見積もりはこちらから</p>
            <a href="/contact" class="btn btn-primary">お問い合わせフォーム</a>
          </div>
          
          <div class="service-list">
            <h3>その他の事業</h3>
            <ul>
              <li><a href="/work/homepage.html">ホームページ制作</a></li>
              <li><a href="/work/design.html">デザイン制作</a></li>
              <li><a href="/work/logo.html">ロゴ・キャラクター</a></li>
              <li><a href="/work/webad.html">Web広告運用</a></li>
              <li><a href="/work/system.html">システム開発</a></li>
              <li><a href="/work/support.html">ITサポート</a></li>
              <li><a href="/work/consulting.html">業務改善コンサル</a></li>
            </ul>
          </div>
        </aside>` : ''}
      </div>
    </article>
  </main>

  <footer class="site-footer">
    <div class="container">
      <p>&copy; 2024 NPO Hokage. All Rights Reserved.</p>
    </div>
  </footer>
</body>
</html>
`;

// CSSの生成
const cssContent = `
:root {
  --color-primary: #8B5E3C; /* 土のような茶色 */
  --color-secondary: #556B2F; /* 自然な緑 */
  --color-accent: #D2691E; /* 暖かみのあるオレンジ */
  --color-text: #333333;
  --color-bg: #FDFBF7; /* 生成り色 */
  --color-white: #FFFFFF;
  --font-main: 'Noto Sans JP', sans-serif;
  --font-serif: 'Shippori Mincho', serif;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-main);
  color: var(--color-text);
  background-color: var(--color-bg);
  line-height: 1.8;
  font-size: 16px;
}

a {
  color: var(--color-primary);
  text-decoration: none;
  transition: opacity 0.3s;
}

a:hover {
  opacity: 0.8;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header */
.site-header {
  background-color: var(--color-white);
  padding: 20px 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  position: sticky;
  top: 0;
  z-index: 100;
}

.site-header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text);
}

.site-header nav ul {
  display: flex;
  list-style: none;
  gap: 30px;
}

.site-header nav a {
  color: var(--color-text);
  font-weight: 500;
}

.site-header nav a.active {
  color: var(--color-primary);
  border-bottom: 2px solid var(--color-primary);
}

/* Hero */
.hero-image {
  height: 400px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: var(--color-primary);
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  z-index: 0;
}

.hero-image::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.3);
  z-index: 1;
}

.hero-image .container {
  position: relative;
  z-index: 2;
}

.hero-image h1 {
  color: var(--color-white);
  font-family: var(--font-serif);
  font-size: 2.5rem;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  text-align: center;
}

/* Content */
.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 60px;
  padding: 60px 20px;
}

.content-wrapper.no-sidebar {
  grid-template-columns: 1fr;
  max-width: 800px;
  margin: 0 auto;
}

.content-body h2 {
  font-family: var(--font-serif);
  font-size: 1.8rem;
  color: var(--color-primary);
  margin: 40px 0 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
}

.content-body h2:first-child {
  margin-top: 0;
}

.content-body h3 {
  font-size: 1.4rem;
  margin: 30px 0 15px;
  color: var(--color-secondary);
}

.content-body p {
  margin-bottom: 20px;
}

.content-body ul {
  margin-bottom: 20px;
  padding-left: 20px;
}

.content-body li {
  margin-bottom: 10px;
}

/* Sidebar */
.sidebar {
  position: sticky;
  top: 100px;
  align-self: start;
}

.contact-box {
  background-color: var(--color-white);
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  margin-bottom: 30px;
  text-align: center;
}

.contact-box h3 {
  margin-bottom: 15px;
  font-family: var(--font-serif);
}

.btn {
  display: inline-block;
  padding: 12px 30px;
  border-radius: 50px;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
}

.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.btn-primary:hover {
  background-color: #6d4a2f;
  opacity: 1;
}

.service-list {
  background-color: var(--color-white);
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
}

.service-list h3 {
  margin-bottom: 15px;
  font-family: var(--font-serif);
  font-size: 1.2rem;
}

.service-list ul {
  list-style: none;
}

.service-list li {
  margin-bottom: 12px;
  border-bottom: 1px dotted #eee;
  padding-bottom: 12px;
}

.service-list li:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

/* Footer */
.site-footer {
  background-color: #333;
  color: #fff;
  padding: 40px 0;
  text-align: center;
  margin-top: 60px;
}

/* Responsive */
@media (max-width: 768px) {
  .content-wrapper {
    grid-template-columns: 1fr;
  }
  
  .sidebar {
    position: static;
    margin-top: 40px;
  }
  
  .hero-image h1 {
    font-size: 1.8rem;
  }
}

/* Utility & Fixes */
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 5px;
  overflow-x: auto;
  margin-bottom: 20px;
}

code {
  font-family: monospace;
  background-color: #f5f5f5;
  padding: 2px 5px;
  border-radius: 3px;
}

img {
  max-width: 100%;
  height: auto;
}

/* Contact Form */
.contact-form {
  max-width: 900px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 35px;
}

.form-group label {
  display: block;
  margin-bottom: 12px;
  font-weight: 500;
  font-size: 1.1rem;
  color: var(--color-text);
}

.required-mark {
  color: #d32f2f;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 18px 22px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-family: var(--font-main);
  font-size: 1.1rem;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--color-primary);
}

.form-group textarea {
  resize: vertical;
  min-height: 220px;
}

.form-actions {
  text-align: center;
  margin-top: 45px;
}

.btn-large {
  padding: 20px 70px;
  font-size: 1.2rem;
}
`;

async function buildSite() {
  console.log('=== サイト構築開始 ===\n');

  // 出力ディレクトリの初期化
  try {
    await fs.rm(OUTPUT_DIR, { recursive: true, force: true });
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
    await fs.mkdir(path.join(OUTPUT_DIR, 'work'), { recursive: true });
    await fs.mkdir(path.join(OUTPUT_DIR, 'styles'), { recursive: true });
    await fs.mkdir(path.join(OUTPUT_DIR, 'images'), { recursive: true });
  } catch (err) {
    console.error('ディレクトリ作成エラー:', err);
  }

  // 静的ファイルのコピー
  try {
    // 画像フォルダのコピー
    await fs.cp(path.join(PUBLIC_DIR, 'images'), path.join(OUTPUT_DIR, 'images'), { recursive: true });
    console.log('✓ 画像ファイルをコピーしました');
  } catch (err) {
    console.warn('画像ファイルのコピーに失敗しました（まだ生成されていない可能性があります）', err.message);
  }

  // CSSファイルの生成
  await fs.writeFile(path.join(OUTPUT_DIR, 'styles', 'main.css'), cssContent);
  console.log('✓ CSSファイルを生成しました');

  // サービスページのビルド
  const files = await fs.readdir(CONTENT_DIR);

  for (const file of files) {
    if (!file.endsWith('.md')) continue;

    const content = await fs.readFile(path.join(CONTENT_DIR, file), 'utf-8');

    // メタデータの抽出（簡易的な実装）
    const titleMatch = content.match(/title: (.*)/);
    const slugMatch = content.match(/slug: (.*)/);
    const imagePositionMatch = content.match(/imagePosition: (.*)/);

    const title = titleMatch ? titleMatch[1] : 'Service';
    const slug = slugMatch ? slugMatch[1] : path.basename(file, '.md');
    const imagePosition = imagePositionMatch ? imagePositionMatch[1] : 'center center';

    // 本文の抽出（---で囲まれたメタデータを除去）
    const bodyContent = content.replace(/---[\s\S]*?---/, '');

    // MarkdownをHTMLに変換
    const htmlContent = marked.parse(bodyContent);

    // テンプレートに埋め込み
    // 画像位置をインラインスタイルで適用
    const finalHtml = htmlTemplate(title, htmlContent, slug, 'work', true).replace(
      'class="hero-bg"',
      `class="hero-bg" style="object-position: ${imagePosition}"`
    );

    // ファイル出力
    await fs.writeFile(path.join(OUTPUT_DIR, 'work', `${slug}.html`), finalHtml);
    console.log(`✓ work/${slug}.html を生成しました`);
  }

  // 固定ページのビルド (Aboutなど)
  try {
    const pageFiles = await fs.readdir(PAGES_DIR);
    for (const file of pageFiles) {
      if (!file.endsWith('.md')) continue;

      const content = await fs.readFile(path.join(PAGES_DIR, file), 'utf-8');

      const titleMatch = content.match(/title: (.*)/);
      const slugMatch = content.match(/slug: (.*)/);
      const imagePositionMatch = content.match(/imagePosition: (.*)/);

      const title = titleMatch ? titleMatch[1] : 'Page';
      const slug = slugMatch ? slugMatch[1] : path.basename(file, '.md');
      const imagePosition = imagePositionMatch ? imagePositionMatch[1] : 'center center';

      const bodyContent = content.replace(/---[\s\S]*?---/, '');
      const htmlContent = marked.parse(bodyContent);

      // 固定ページはサイドバーなし、ナビゲーションはslugと一致すればactive
      const finalHtml = htmlTemplate(title, htmlContent, slug, slug, false).replace(
        'class="hero-bg"',
        `class="hero-bg" style="object-position: ${imagePosition}"`
      );

      await fs.writeFile(path.join(OUTPUT_DIR, `${slug}.html`), finalHtml);
      console.log(`✓ ${slug}.html を生成しました`);
    }
  } catch (err) {
    console.log('固定ページディレクトリが見つからないか、エラーが発生しました:', err.message);
  }

  // Workトップページ（一覧）の生成（簡易版）
  const indexHtml = `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Work | NPOほかげ</title>
  <link rel="stylesheet" href="/styles/main.css">
  <meta http-equiv="refresh" content="0;url=/work/homepage.html">
</head>
<body>
  <p>Redirecting to <a href="/work/homepage.html">homepage service page</a>...</p>
</body>
</html>
  `;
  await fs.writeFile(path.join(OUTPUT_DIR, 'work', 'index.html'), indexHtml);

  // ルートのindex.htmlも生成（リダイレクト）
  await fs.writeFile(path.join(OUTPUT_DIR, 'index.html'), indexHtml);

  console.log('\n=== 構築完了 ===');
  console.log(`出力先: ${OUTPUT_DIR}`);
}

buildSite().catch(console.error);
