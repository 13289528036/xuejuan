import React, { useState } from 'react';
import { Button, FileInput, Select, Textarea } from './ui/components';

const DocumentAnalyzer = () => {
  const [document, setDocument] = useState(null);
  const [outputFormat, setOutputFormat] = useState('outline');
  const [result, setResult] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setDocument(file);
  };

  const handleAnalyze = async () => {
    if (!document) return;
    
    setIsProcessing(true);
    
    // 这里将调用后端API进行文档分析
    try {
      const formData = new FormData();
      formData.append('document', document);
      formData.append('outputFormat', outputFormat);
      
      const response = await fetch('/api/analyze-document', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error('文档分析失败:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">文档知识点梳理工具</h1>
      
      <div className="mb-4">
        <FileInput 
          label="上传文档" 
          onChange={handleFileUpload} 
          accept=".txt,.pdf,.html,.css,.js,.md"
        />
      </div>
      
      <div className="mb-4">
        <Select
          label="输出格式"
          value={outputFormat}
          onChange={(e) => setOutputFormat(e.target.value)}
          options={[
            { value: 'outline', label: '大纲形式' },
            { value: 'mindmap', label: '思维导图' },
            { value: 'table', label: '表格形式' },
          ]}
        />
      </div>
      
      <Button 
        onClick={handleAnalyze} 
        disabled={!document || isProcessing}
        isLoading={isProcessing}
      >
        {isProcessing ? '分析中...' : '开始分析'}
      </Button>
      
      {result && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">分析结果</h2>
          <Textarea
            value={result}
            readOnly
            rows={15}
            className="w-full p-3 border rounded"
          />
        </div>
      )}
    </div>
  );
};

export default DocumentAnalyzer;