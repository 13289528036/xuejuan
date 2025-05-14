import { NextResponse } from 'next/server';
import { extractTextFromDocument } from '../../../utils/documentParser';
import { analyzeContent } from '../../../utils/knowledgeExtractor';
import { formatOutput } from '../../../utils/outputFormatter';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const document = formData.get('document');
    const outputFormat = formData.get('outputFormat');
    
    if (!document) {
      return NextResponse.json(
        { error: '未提供文档' },
        { status: 400 }
      );
    }
    
    // 1. 从文档中提取文本
    const text = await extractTextFromDocument(document);
    
    // 2. 分析文本内容，提取知识点
    const knowledgePoints = await analyzeContent(text);
    
    // 3. 根据指定格式输出结果
    const formattedResult = formatOutput(knowledgePoints, outputFormat);
    
    return NextResponse.json({ result: formattedResult });
  } catch (error) {
    console.error('文档分析错误:', error);
    return NextResponse.json(
      { error: '文档分析失败' },
      { status: 500 }
    );
  }
}