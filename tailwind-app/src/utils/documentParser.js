import { PDFExtract } from 'pdf.js-extract';
import { JSDOM } from 'jsdom';

// 文档解析器 - 从不同格式的文档中提取文本
export async function extractTextFromDocument(file) {
  const fileType = file.name.split('.').pop().toLowerCase();
  
  switch (fileType) {
    case 'txt':
      return extractFromTxt(file);
    case 'pdf':
      return extractFromPdf(file);
    case 'html':
      return extractFromHtml(file);
    case 'css':
      return extractFromCss(file);
    case 'js':
      return file.text(); // 直接返回JavaScript文件内容
    case 'md':
      return file.text(); // 直接返回Markdown文件内容
    default:
      throw new Error(`不支持的文件类型: ${fileType}`);
  }
}

async function extractFromTxt(file) {
  return await file.text();
}

async function extractFromPdf(file) {
  const pdfExtract = new PDFExtract();
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  
  const data = await pdfExtract.extract({ data: buffer });
  
  // 合并所有页面的文本
  return data.pages
    .map(page => page.content.map(item => item.str).join(' '))
    .join('\n');
}

async function extractFromHtml(file) {
  const text = await file.text();
  const dom = new JSDOM(text);
  return dom.window.document.body.textContent;
}

async function extractFromCss(file) {
  // CSS文件直接返回原始内容，因为我们需要分析CSS规则
  return await file.text();
}