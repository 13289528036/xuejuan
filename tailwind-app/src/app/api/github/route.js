// src/app/api/github/route.js

import { NextResponse } from 'next/server';

export async function GET() {
    // 模拟 GitHub API 响应
    const mockGitHubData = {
        public_repos: 20, // 模拟的公共仓库数量
        followers: 150,   // 模拟的关注者数量
    };

    try {
        // 直接返回模拟数据
        return NextResponse.json(mockGitHubData);

    } catch (error) {
        return NextResponse.json(
            { message: 'Internal Server Error', error: error.message },
            { status: 500 }
        );
    }
}