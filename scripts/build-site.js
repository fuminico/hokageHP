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

/* Work Index Page */
.work-intro {
  text-align: center;
  margin-bottom: 60px;
}

.work-intro h2 {
  font-family: var(--font-serif);
  font-size: 2rem;
  color: var(--color-primary);
  margin-bottom: 30px;
  line-height: 1.6;
}

.work-intro p {
  margin-bottom: 15px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.service-card {
  background: var(--color-white);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s, box-shadow 0.3s;
  display: block;
  color: var(--color-text);
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  opacity: 1;
}

.service-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.service-card h3 {
  font-family: var(--font-serif);
  font-size: 1.3rem;
  color: var(--color-primary);
  padding: 20px 20px 10px;
  margin: 0;
}

.service-card p {
  padding: 0 20px 20px;
  font-size: 0.95rem;
  color: #666;
  margin: 0;
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

  // Workトップページ（一覧）の生成
  const workIndexContent = `
<div class="work-intro">
  <h2>「誰かがやってくれたらいいのに...」に、<br>私たちがお応えします。</h2>
  <p>みなさんの業務や活動における「手が足りない」「手間がかかる」「得意じゃない」をサポートします。</p>
  <p>NPOほかげは、平取町への移住者が持つ多様なスキルや経験を活かし、地域の皆さまの「困った」を解決する「しごとBANK」事業から始まりました。</p>
  <p>現在ではウェブ制作やシステム開発を主軸に、専門的な知識と技術で皆さまの事業を力強く後押しします。</p>
</div>

<div class="service-grid">
  <a href="/work/homepage.html" class="service-card">
    <img src="/images/services/homepage.jpg" alt="ホームページ制作">
    <h3>ホームページ制作</h3>
    <p>新規作成からリニューアル、日々の更新までサポートします。</p>
  </a>
  <a href="/work/design.html" class="service-card">
    <img src="/images/services/design.jpg" alt="デザイン制作">
    <h3>デザイン制作</h3>
    <p>チラシ、名刺、パンフレットなど、想いをカタチにします。</p>
  </a>
  <a href="/work/logo.html" class="service-card">
    <img src="/images/services/logo.jpg" alt="ロゴ・キャラクター">
    <h3>ロゴ・キャラクター</h3>
    <p>ブランドの顔となるロゴや親しみやすいキャラクターを制作。</p>
  </a>
  <a href="/work/webad.html" class="service-card">
    <img src="/images/services/webad.jpg" alt="Web広告運用">
    <h3>Web広告運用</h3>
    <p>効果的なWeb広告で、ターゲットに情報を届けます。</p>
  </a>
  <a href="/work/system.html" class="service-card">
    <img src="/images/services/system.jpg" alt="システム開発">
    <h3>システム開発</h3>
    <p>業務効率化のためのシステムやツールを開発します。</p>
  </a>
  <a href="/work/support.html" class="service-card">
    <img src="/images/services/support.jpg" alt="ITサポート">
    <h3>ITサポート</h3>
    <p>パソコンやソフトの操作など、ITに関するお困りごとを解決。</p>
  </a>
  <a href="/work/consulting.html" class="service-card">
    <img src="/images/services/consulting.jpg" alt="業務改善コンサル">
    <h3>業務改善コンサル</h3>
    <p>業務フローの見直しやデジタル化で、効率アップを支援。</p>
  </a>
</div>
  `;

  // テンプレートを使用してHTMLを生成
  // タイトル: Work, コンテンツ: workIndexContent, slug: work-index (画像用ダミー), activeNav: work, showSidebar: false
  const workIndexHtml = htmlTemplate('Work', workIndexContent, 'work-index', 'work', false).replace(
    'class="hero-bg"',
    'class="hero-bg" style="display:none"' // ヒーロー画像は非表示にするか、別途用意する
  ).replace(
    '<div class="hero-image">',
    '<div class="hero-image" style="height: 200px; background-color: var(--color-primary);">' // 高さを調整
  );

  await fs.writeFile(path.join(OUTPUT_DIR, 'work', 'index.html'), workIndexHtml);

  // ルートのindex.htmlはWorkトップへリダイレクト（またはトップページとして同じ内容を表示）
  const rootIndexHtml = `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NPOほかげ</title>
  <meta http-equiv="refresh" content="0;url=/work/">
</head>
<body>
  <p>Redirecting to <a href="/work/">Work page</a>...</p>
</body>
</html>
  `;
  await fs.writeFile(path.join(OUTPUT_DIR, 'index.html'), rootIndexHtml);

  console.log('\n=== 構築完了 ===');
  console.log(`出力先: ${OUTPUT_DIR}`);
}

buildSite().catch(console.error);
