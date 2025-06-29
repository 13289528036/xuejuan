// src/app/api/wakatime/route.js

import { NextResponse } from 'next/server';

export async function GET() {
  // 模拟 WakaTime API 响应
  const mockWakaTimeData = {
    data: {
      text: "156 hrs 43 mins", // 将时间硬编码为 156.71 小时
      total_seconds: 564180.0, // 156.71 * 3600
    },
  };

  try {
    // 直接返回模拟数据
    return NextResponse.json(mockWakaTimeData);

  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}