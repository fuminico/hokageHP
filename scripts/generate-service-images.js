import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

// 環境変数の読み込み
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = 'gemini-3-pro-image-preview'; // 画像生成用モデル

// サービスごとの画像プロンプト定義
const services = [
  {
    slug: 'homepage',
    prompt: 'A warm and natural photo of a young Japanese web designer showing a website on a laptop to an elderly Japanese farmer in a rustic wooden house in Hokkaido. Natural light coming through the window, soft focus, film photography style, genuine smiles, connection between generations.'
  },
  {
    slug: 'design',
    prompt: 'A cozy cafe scene in Hokkaido with wooden furniture. A young Japanese designer and a local Japanese shop owner are looking at colorful printed flyers and pamphlets on a table. Natural sunlight, warm atmosphere, focus on the paper textures and their engaged expressions, film grain.'
  },
  {
    slug: 'logo',
    prompt: 'Close-up shot of a sketchbook on a wooden table with hand-drawn logo sketches and color swatches. A Japanese person\'s hand holding a pencil is visible. Natural light, artistic atmosphere, creative process, soft depth of field, Hokkaido countryside vibe.'
  },
  {
    slug: 'webad',
    prompt: 'A young Japanese marketing professional showing a tablet with colorful graphs and charts to a Japanese client in a greenhouse full of vegetables. Bright natural light, green plants in background, positive and forward-looking atmosphere, high quality photography.'
  },
  {
    slug: 'system',
    prompt: 'A practical scene in a warehouse or farm office. A Japanese person using a tablet to check inventory or data, with a laptop open nearby. Clean and organized workspace but with a rustic touch, efficient workflow, natural lighting, professional yet approachable.'
  },
  {
    slug: 'support',
    prompt: 'A friendly IT support scene. A young Japanese person kindly explaining something on a computer screen to a senior Japanese person. Both are sitting at a desk in a comfortable home office. Warm lighting, reassuring atmosphere, focus on the helpful interaction.'
  },
  {
    slug: 'consulting',
    prompt: 'A collaborative meeting scene in a community center with a whiteboard in the background. A small group of Japanese people (mixed ages) discussing enthusiastically. Natural light, sense of community and progress, authentic expressions, documentary style.'
  }
];

async function generateImage(prompt, outputPath) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

  const requestBody = {
    contents: [
      {
        parts: [
          { text: prompt }
        ]
      }
    ]
  };

  try {
    console.log(`Generating image for prompt: "${prompt.substring(0, 50)}..."`);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    // レスポンスから画像データを抽出
    // gemini-3-pro-image-previewのレスポンス構造に対応
    let base64Image = null;

    if (data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content &&
      data.candidates[0].content.parts) {

      for (const part of data.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.mimeType.startsWith('image/')) {
          base64Image = part.inlineData.data;
          break;
        }
      }
    }

    if (!base64Image) {
      console.error('Unexpected response structure:', JSON.stringify(data, null, 2));
      throw new Error('No image data found in the response');
    }

    // 画像を保存
    const buffer = Buffer.from(base64Image, 'base64');
    await fs.writeFile(outputPath, buffer);
    console.log(`✓ Saved image to ${outputPath}`);

  } catch (error) {
    console.error(`Error generating image:`, error.message);
  }
}

async function main() {
  const outputDir = path.join(__dirname, '..', 'website', 'public', 'images', 'services');

  // 出力ディレクトリの作成
  try {
    await fs.mkdir(outputDir, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }

  console.log('=== サービス画像生成開始 ===\n');

  for (const service of services) {
    const outputPath = path.join(outputDir, `${service.slug}.jpg`);

    // 既に存在する場合はスキップ（再生成したい場合は手動で削除）
    try {
      await fs.access(outputPath);
      console.log(`Skipping ${service.slug} (already exists)`);
      continue;
    } catch (err) {
      // ファイルが存在しない場合は続行
    }

    await generateImage(service.prompt, outputPath);

    // レート制限回避のための待機
    console.log('Waiting 5 seconds...');
    await new Promise(resolve => setTimeout(resolve, 5000));
  }

  console.log('\n=== 生成完了 ===');
}

main().catch(console.error);
