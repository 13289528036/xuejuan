// 输出格式化器 - 将知识点转换为指定的输出格式
export function formatOutput(knowledgePoints, format) {
  switch (format) {
    case 'outline':
      return formatAsOutline(knowledgePoints);
    case 'mindmap':
      return formatAsMindMap(knowledgePoints);
    case 'table':
      return formatAsTable(knowledgePoints);
    default:
      return formatAsOutline(knowledgePoints); // 默认使用大纲格式
  }
}

// 大纲格式
function formatAsOutline(knowledgePoints) {
  let result = '# 文档知识点梳理\n\n';
  
  // 添加摘要
  result += '## 摘要\n\n';
  result += knowledgePoints.summary.split('\n').map(line => `- ${line}`).join('\n');
  result += '\n\n';
  
  // 添加详细知识点
  for (const type in knowledgePoints.groups) {
    result += `## ${formatTypeName(type)}\n\n`;
    
    knowledgePoints.groups[type].forEach(point => {
      result += `### ${point.title}\n\n`;
      result += `${point.content}\n\n`;
      result += `重要性: ${point.importance}/10\n\n`;
    });
  }
  
  return result;
}

// 思维导图格式（简化的文本表示）
function formatAsMindMap(knowledgePoints) {
  let result = '# 文档知识点思维导图\n\n';
  
  for (const type in knowledgePoints.groups) {
    result += `## ${formatTypeName(type)}\n`;
    
    knowledgePoints.groups[type].forEach(point => {
      result += `### ${point.title}\n`;
      result += `- ${point.content.split('\n').join('\n  - ')}\n`;
    });
    
    result += '\n';
  }
  
  return result;
}

// 表格格式
function formatAsTable(knowledgePoints) {
  let result = '# 文档知识点表格\n\n';
  
  for (const type in knowledgePoints.groups) {
    result += `## ${formatTypeName(type)}\n\n`;
    result += '| 知识点 | 内容 | 重要性 |\n';
    result += '| ------ | ---- | ------ |\n';
    
    knowledgePoints.groups[type].forEach(point => {
      // 处理内容中的换行符，使其在表格中正确显示
      const content = point.content.replace(/\n/g, '<br>');
      result += `| ${point.title} | ${content} | ${point.importance}/10 |\n`;
    });
    
    result += '\n';
  }
  
  return result;
}

// 格式化类型名称
function formatTypeName(type) {
  switch (type) {
    case 'css_rule': return 'CSS规则';
    case 'css_variable': return 'CSS变量';
    case 'media_query': return '媒体查询';
    default: return type;
  }
}