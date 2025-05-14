"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 opacity-75"></div>
        <div className="absolute inset-0 bg-grid-white/[0.2] bg-grid-8"></div>
        <div className="absolute -bottom-48 left-0 right-0 h-96 bg-gradient-to-t from-white dark:from-slate-900 to-transparent"></div>
      </div>
      
      <div className="relative container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
        {/* 左侧文本内容 */}
        <motion.div 
          className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="block">Web前端技术</span>
            <span className="block text-yellow-300">探索与实践</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            从基础到高级，掌握现代Web开发的核心技能
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <button className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              开始学习
            </button>
            <button className="px-8 py-3 bg-transparent hover:bg-white/10 border-2 border-white rounded-lg transition-all">
              查看课程
            </button>
          </div>
        </motion.div>
        
        {/* 右侧图形/代码展示 */}
        <motion.div 
          className="md:w-1/2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="bg-slate-800/80 p-4 rounded-lg shadow-2xl border border-slate-700/50 backdrop-blur-sm">
            <div className="flex items-center mb-3">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="ml-2 text-xs text-slate-400">index.html</div>
            </div>
            <pre className="text-sm md:text-base overflow-x-auto text-blue-300">
              <code>
{`<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Web前端技术</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div id="app"></div>
  <script src="main.js"></script>
</body>
</html>`}
              </code>
            </pre>
          </div>
        </motion.div>
      </div>
      
      {/* 波浪底部 */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
}