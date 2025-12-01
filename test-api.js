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

// Gemini 2.0 Flash でテキスト生成をテスト
async function testTextGeneration(apiKey) {
  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: "Explain how AI works in a few words"
          }
        ]
      }
    ]
  };

  try {
    console.log('テキスト生成APIをテスト中...');

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': apiKey
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API エラー (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    console.log('✓ テキスト生成API接続成功');
    console.log('レスポンス:', JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('✗ テキスト生成APIエラー:', error.message);
    return false;
  }
}

// 利用可能なモデル一覧を取得
async function listModels(apiKey) {
  const url = 'https://generativelanguage.googleapis.com/v1beta/models';

  try {
    console.log('\n利用可能なモデルを取得中...');

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-goog-api-key': apiKey
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API エラー (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    console.log('✓ モデル一覧取得成功');

    if (data.models) {
      console.log('\n画像生成関連モデル:');
      const imageModels = data.models.filter(m =>
        m.name.includes('imagen') || m.displayName?.toLowerCase().includes('image')
      );
      imageModels.forEach(model => {
        console.log(`  - ${model.name}`);
        console.log(`    表示名: ${model.displayName || 'N/A'}`);
        console.log(`    説明: ${model.description || 'N/A'}`);
      });
    }

    return true;
  } catch (error) {
    console.error('✗ モデル一覧取得エラー:', error.message);
    return false;
  }
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

  console.log('=== Gemini API 接続テスト ===\n');

  // テキスト生成APIのテスト
  await testTextGeneration(apiKey);

  // モデル一覧の取得
  await listModels(apiKey);

  console.log('\n=== テスト完了 ===');
}

main();
