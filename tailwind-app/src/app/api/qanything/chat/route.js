import { NextResponse } from 'next/server';
import crypto from 'crypto';

function truncate(q) {
    if (!q) return null;
    const len = q.length;
    return len <= 20 ? q : q.substring(0, 10) + len + q.substring(len - 10, len);
}

export async function POST(request) {
    const { question, kbId } = await request.json();

    if (!question || !kbId) {
        return NextResponse.json({ error: '问题和知识库ID不能为空' }, { status: 400 });
    }

    const appKey = process.env.QANYTHING_APP_KEY || 'qanything-bSrYLeQ9xRwcFv2whpKzNTO8zedgH7in';
    const appSecret = process.env.QANYTHING_APP_SECRET || 'YOUR_APP_SECRET'; // 请务必替换为您的真实 App Secret
    const salt = crypto.randomUUID();
    const curtime = Math.floor(Date.now() / 1000).toString();
    const q = truncate(question);
    const str = appKey + q + salt + curtime + appSecret;
    const sign = crypto.createHash('sha256').update(str).digest('hex');

    const body = {
        q: question,
        kbId: kbId,
        userId: 'user123', // 您可以根据需要为每个用户设置唯一的ID
        history: [], // 您可以根据需要传递历史记录
        streaming: false // 为了简化，我们先使用非流式响应
    };

    try {
        const response = await fetch('https://openapi.youdao.com/q_anything/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'appKey': appKey,
                'salt': salt,
                'curtime': curtime,
                'sign': sign,
                'signType': 'v4'
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if (data.errorCode !== '0') {
            console.error('有道 API 错误:', data);
            throw new Error(`API Error: ${data.errorCode} - ${data.msg}`);
        }

        // 假设返回的数据结构中，答案在 `data.result.response`
        // 请根据实际API文档调整
        return NextResponse.json({ answer: data.result.response });

    } catch (error) {
        console.error('调用有道 API 失败:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}