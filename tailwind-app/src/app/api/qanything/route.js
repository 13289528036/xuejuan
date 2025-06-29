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
    const { kbName } = await request.json();

    const appKey = process.env.YOUDAO_APP_KEY || 'YOUR_APP_KEY'; // 替换为您的应用ID
    const appSecret = process.env.YOUDAO_APP_SECRET || 'YOUR_APP_SECRET'; // 替换为您的应用密钥
    const salt = crypto.randomUUID();
    const curtime = Math.floor(Date.now() / 1000).toString();
    const sign = generateSign(appKey, appSecret, kbName, salt, curtime);

    const params = {
      q: kbName,
      appKey,
      salt,
      curtime,
      sign,
      signType: 'v3',
    };

    const response = await fetch('https://openapi.youdao.com/q_anything/paas/create_kb', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    const data = await response.json();

    if (data.errorCode !== '0') {
      return NextResponse.json({ error: data.msg }, { status: 500 });
    }

    return NextResponse.json(data.result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}