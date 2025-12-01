import fetch from 'node-fetch';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 環境変数から APIキーを読み込む
async function loadEnv() {
  try {
    const envContent = await fs.readFile(path.join(__dirname, '.env'), 'utf-8');
    const lines = envContent.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        const value = valueParts.join('=');
        process.env[key.trim()] = value.trim();
      }
    }
  } catch (error) {
    console.error('.envファイルの読み込みに失敗しました:', error.message);
  }
}

// Gemini 3 Pro Image Preview モデルで画像を生成
async function generateImage(prompt, apiKey) {
  // 公式ドキュメントに基づいた正しいエンドポイント
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent`;

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: prompt
          }
        ]
      }
    ]
  };

  try {
    console.log('画像生成リクエストを送信中...');
    console.log('モデル: gemini-3-pro-image-preview');
    console.log('プロンプト:', prompt);
    console.log('');

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API エラー (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('画像生成エラー:', error.message);
    throw error;
  }
}

// Base64画像をファイルに保存
async function saveImage(base64Data, filename) {
  const outputDir = path.join(__dirname, 'generated-images');

  // generated-imagesディレクトリが存在しない場合は作成
  try {
    await fs.access(outputDir);
  } catch {
    await fs.mkdir(outputDir, { recursive: true });
    console.log(`✓ フォルダを作成しました: ${outputDir}\n`);
  }

  const filepath = path.join(outputDir, filename);

  // Base64データをバッファに変換して保存
  const buffer = Buffer.from(base64Data, 'base64');
  await fs.writeFile(filepath, buffer);

  console.log(`✓ 画像を保存しました: ${filename}`);
  return filepath;
}

// メイン処理
async function main() {
  await loadEnv();

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('エラー: GEMINI_API_KEY が設定されていません');
    console.error('.env ファイルにAPIキーを設定してください');
    process.exit(1);
  }

  // コマンドライン引数からプロンプトを取得
  const prompt = process.argv.slice(2).join(' ') || 'A beautiful sunset over mountains';

  try {
    const result = await generateImage(prompt, apiKey);

    let savedCount = 0;

    // Gemini APIのレスポンス形式: candidates[].content.parts[].inlineData
    if (result.candidates && result.candidates.length > 0) {
      for (const candidate of result.candidates) {
        if (candidate.content && candidate.content.parts) {
          for (let i = 0; i < candidate.content.parts.length; i++) {
            const part = candidate.content.parts[i];

            // テキスト部分があれば表示
            if (part.text) {
              console.log('生成された説明:', part.text);
              console.log('');
            }

            // 画像データがあれば保存
            if (part.inlineData && part.inlineData.data) {
              const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
              const mimeType = part.inlineData.mimeType || 'image/jpeg';
              const extension = mimeType.split('/')[1] || 'jpg';
              const filename = `generated_${timestamp}_${savedCount}.${extension}`;
              await saveImage(part.inlineData.data, filename);
              savedCount++;
            }
          }
        }
      }
    }

    if (savedCount > 0) {
      console.log(`\n✓ ${savedCount}枚の画像生成が完了しました!`);
      console.log(`保存先: ${path.join(__dirname, 'generated-images')}`);
    } else {
      console.error('\n✗ 画像データが見つかりませんでした');
      console.error('レスポンス:', JSON.stringify(result, null, 2));
    }
  } catch (error) {
    console.error('\n✗ 処理中にエラーが発生しました:', error.message);

    // レート制限エラーの場合は待機時間を表示
    if (error.message.includes('429')) {
      console.error('\nレート制限に達しました。しばらく待ってから再試行してください。');
    }

    process.exit(1);
  }
}

main();
