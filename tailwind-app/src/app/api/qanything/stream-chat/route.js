import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// QAnything API要求对长查询进行截断处理
function truncate(q) {
    if (!q) return null;
    const len = q.length;
    return len <= 20 ? q : q.substring(0, 10) + len + q.substring(len - 10, len);
}

// 将Node.js的ReadableStream转换为Web API的ReadableStream
function iteratorToStream(iterator) {
    return new ReadableStream({
        async pull(controller) {
            const { value, done } = await iterator.next();
            if (done) {
                controller.close();
            } else {
                controller.enqueue(value);
            }
        },
    });
}

export async function POST(req) {
    const { question, kbId, history } = await req.json();

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
        userId: 'user123',
        history: history || [],
        streaming: true // 开启流式响应
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
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('有道 API 错误:', errorData);
            throw new Error(`API Error: ${errorData.errorCode} - ${errorData.msg}`);
        }

        // 将fetch返回的响应体（ReadableStream）直接作为响应返回
        const stream = response.body;
        return new Response(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });

    } catch (error) {
        console.error('调用有道 API 失败:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// 告诉Next.js这是一个动态路由
export const dynamic = 'force-dynamic';