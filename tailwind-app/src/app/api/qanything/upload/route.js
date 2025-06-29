import { NextResponse } from 'next/server';
import crypto from 'crypto';

// Helper function to generate the signature
function generateSign(appKey, appSecret, q, salt, curtime) {
  const str = appKey + getInput(q) + salt + curtime + appSecret;
  return crypto.createHash('sha256').update(str).digest('hex');
}

function getInput(input) {
  if (!input) return '';
  const len = input.length;
  return len <= 20 ? input : input.substring(0, 10) + len + input.substring(len - 10, len);
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const kbId = formData.get('kbId');

    if (!file || !kbId) {
      return NextResponse.json({ error: 'Missing file or kbId' }, { status: 400 });
    }

    const appKey = process.env.YOUDAO_APP_KEY || 'YOUR_APP_KEY'; // 替换为您的应用ID
    const appSecret = process.env.YOUDAO_APP_SECRET || 'YOUR_APP_SECRET'; // 替换为您的应用密钥
    const salt = crypto.randomUUID();
    const curtime = Math.floor(Date.now() / 1000).toString();
    // The 'q' parameter for signing is the kbId for this endpoint
    const sign = generateSign(appKey, appSecret, kbId, salt, curtime);

    const uploadFormData = new FormData();
    uploadFormData.append('appKey', appKey);
    uploadFormData.append('salt', salt);
    uploadFormData.append('curtime', curtime);
    uploadFormData.append('sign', sign);
    uploadFormData.append('signType', 'v3');
    uploadFormData.append('q', kbId); // 'q' is the knowledge base ID
    uploadFormData.append('file', file, file.name);

    const response = await fetch('https://openapi.youdao.com/q_anything/paas/upload_file', {
      method: 'POST',
      body: uploadFormData,
    });

    const data = await response.json();

    if (data.errorCode !== '0') {
      return NextResponse.json({ error: data.msg || 'Upload failed' }, { status: 500 });
    }

    return NextResponse.json(data.result);
  } catch (error) {
    console.error('Upload API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}