"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CourseContent() {
  const [activeTab, setActiveTab] = useState('html');
  
  const courses = {
    html: {
      title: "HTML5 基础与进阶",
      description: "学习现代HTML5标记语言，掌握语义化标签、表单控件、多媒体元素等核心概念。",
      topics: ["HTML5文档结构", "语义化标签", "表单与验证", "音频与视频", "Canvas绘图", "Web存储"],
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5.72 5.72h12.56v12.56H5.72zm0 0" />
          <path d="M4.72 3.22c-1.1 0-2 .9-2 2v13.56c0 1.1.9 2 2 2h14.56c1.1 0 2-.9 2-2V5.22c0-1.1-.9-2-2-2zm0 2h14.56v13.56H4.72zm0 0" />
          <path d="M8.22 8.22v3h3v-3zm3 3v3h3v-3zm0-3h3v-3h-3zm-3 6h-3v3h3zm0 0" />
        </svg>
      )
    },
    css: {
      title: "CSS3 样式与布局",
      description: "深入学习CSS3，掌握Flexbox、Grid等现代布局技术，以及动画、过渡和媒体查询等高级特性。",
      topics: ["选择器与优先级", "Flexbox布局", "Grid网格布局", "响应式设计", "CSS变量", "动画与过渡"],
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5 3l-.65 3.34h13.59L17.5 8.5H3.92l-.66 3.33h13.59l-.76 3.81-5.48 1.81-4.75-1.81.33-1.64H2.85l-.79 4 7.85 3 9.05-3 1.2-6.03.24-1.21L21.94 3H5z" />
        </svg>
      )
    },
    js: {
      title: "JavaScript 编程",
      description: "掌握JavaScript核心概念，学习DOM操作、事件处理、异步编程和ES6+新特性。",
      topics: ["变量与数据类型", "函数与作用域", "DOM操作", "事件处理", "异步编程", "ES6+新特性"],
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 3h18v18H3V3zm16.525 13.707c-.131-.821-.666-1.511-2.252-2.155-.552-.259-1.165-.438-1.349-.854-.068-.248-.078-.382-.034-.529.113-.484.687-.629 1.137-.495.293.09.563.315.732.676.775-.507.775-.507 1.316-.844-.203-.314-.304-.451-.439-.586-.473-.528-1.103-.798-2.126-.775l-.528.067c-.507.124-.991.395-1.283.754-.855.968-.608 2.655.427 3.354 1.023.765 2.521.933 2.712 1.653.18.878-.652 1.159-1.475 1.058-.607-.136-.945-.439-1.316-1.002l-1.372.788c.157.359.337.517.607.832 1.305 1.316 4.568 1.249 5.153-.754.021-.067.18-.528.056-1.237l.034.049zm-6.737-5.434h-1.686c0 1.453-.007 2.898-.007 4.354 0 .924.047 1.772-.104 2.033-.247.517-.886.451-1.175.359-.297-.146-.448-.349-.623-.641-.047-.078-.082-.146-.095-.146l-1.368.844c.229.473.563.879.994 1.137.641.383 1.502.507 2.404.305.588-.17 1.095-.519 1.358-1.059.384-.697.302-1.553.299-2.509.008-1.541 0-3.083 0-4.635l.003-.042z" />
        </svg>
      )
    },
    react: {
      title: "React 框架开发",
      description: "学习React框架，掌握组件化开发、状态管理、路由和Hooks等现代前端开发技术。",
      topics: ["组件基础", "Props与State", "生命周期", "Hooks API", "路由管理", "状态管理"],
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 9.861a2.139 2.139 0 100 4.278 2.139 2.139 0 100-4.278zm-5.992 6.394l-.472-.12C2.018 15.246 0 13.737 0 11.996s2.018-3.25 5.536-4.139l.472-.119.133.468a23.53 23.53 0 001.363 3.578l.101.213-.101.213a23.307 23.307 0 00-1.363 3.578l-.133.467zM5.317 8.95c-2.674.751-4.315 1.9-4.315 3.046 0 1.145 1.641 2.294 4.315 3.046a24.95 24.95 0 011.182-3.046A24.752 24.752 0 015.317 8.95zm12.675 7.305l-.133-.469a23.357 23.357 0 00-1.364-3.577l-.101-.213.101-.213a23.42 23.42 0 001.364-3.578l.133-.468.473.119c3.517.889 5.535 2.398 5.535 4.14s-2.018 3.25-5.535 4.139l-.473.12zm-.491-4.259c.48 1.039.877 2.06 1.182 3.046 2.675-.752 4.315-1.901 4.315-3.046 0-1.146-1.641-2.294-4.315-3.046a24.788 24.788 0 01-1.182 3.046zM5.31 8.945l-.133-.467C4.188 4.992 4.488 2.494 6 1.622c1.483-.856 3.864.155 6.359 2.716l.34.349-.34.349a23.552 23.552 0 00-2.422 2.967l-.135.193-.235.02a23.657 23.657 0 00-3.785.61l-.472.119zm1.896-6.63c-.268 0-.505.058-.705.173-.994.573-1.17 2.565-.485 5.253a25.122 25.122 0 013.233-.501 24.847 24.847 0 012.052-2.544c-1.56-1.519-3.037-2.381-4.095-2.381zm9.589 20.362c-.001 0-.001 0 0 0-1.425 0-3.255-1.073-5.154-3.023l-.34-.349.34-.349a23.53 23.53 0 002.421-2.968l.135-.193.234-.02a23.63 23.63 0 003.787-.609l.472-.119.134.468c.987 3.484.688 5.983-.824 6.854a2.38 2.38 0 01-1.205.308zm-4.096-3.381c1.56 1.519 3.037 2.381 4.095 2.381h.001c.267 0 .505-.058.704-.173.994-.573 1.171-2.566.485-5.254a25.02 25.02 0 01-3.234.501 24.674 24.674 0 01-2.051 2.545zM18.69 8.945l-.472-.119a23.479 23.479 0 00-3.787-.61l-.234-.02-.135-.193a23.414 23.414 0 00-2.421-2.967l-.34-.349.34-.349C14.135 1.778 16.515.767 18 1.622c1.512.872 1.812 3.37.824 6.855l-.134.468zM14.75 7.24c1.142.104 2.227.273 3.234.501.686-2.688.509-4.68-.485-5.253-.988-.571-2.845.304-4.8 2.208A24.849 24.849 0 0114.75 7.24zM7.206 22.677A2.38 2.38 0 016 22.369c-1.512-.871-1.812-3.369-.823-6.854l.132-.468.472.119c1.155.291 2.429.496 3.785.609l.235.02.134.193a23.596 23.596 0 002.422 2.968l.34.349-.34.349c-1.898 1.95-3.728 3.023-5.151 3.023zm-1.19-6.427c-.686 2.688-.509 4.681.485 5.254.987.563 2.843-.305 4.8-2.208a24.998 24.998 0 01-2.052-2.545 24.976 24.976 0 01-3.233-.501zm5.984.628c-.823 0-1.669-.036-2.516-.106l-.235-.02-.135-.193a30.388 30.388 0 01-1.35-2.122 30.354 30.354 0 01-1.166-2.228l-.1-.213.1-.213a30.3 30.3 0 011.166-2.228c.414-.749.885-1.472 1.35-2.122l.135-.193.235-.02a29.785 29.785 0 015.033 0l.234.02.134.193a30.006 30.006 0 012.517 4.35l.101.213-.101.213a29.6 29.6 0 01-2.517 4.35l-.134.193-.234.02c-.847.07-1.694.106-2.517.106zm-2.197-1.084c1.48.111 2.914.111 4.395 0a29.006 29.006 0 002.196-3.798 28.585 28.585 0 00-2.197-3.798 29.031 29.031 0 00-4.394 0 28.477 28.477 0 00-2.197 3.798 29.114 29.114 0 002.197 3.798z" />
        </svg>
      )
    }
  };
  
  const activeContent = courses[activeTab];
  
  return (
    <section className="py-12 md:py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">课程内容</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          我们的课程涵盖Web前端开发的各个方面，从基础的HTML、CSS到高级的JavaScript框架和工具。
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        {/* 标签导航 */}
        <div className="flex flex-wrap justify-center mb-8 border-b dark:border-gray-700">
          {Object.keys(courses).map(key => (
            <button
              key={key}
              className={`px-6 py-3 font-medium text-sm md:text-base transition-colors relative ${
                activeTab === key 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
              onClick={() => setActiveTab(key)}
            >
              {courses[key].title}
              {activeTab === key && (
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                  layoutId="underline"
                />
              )}
            </button>
          ))}
        </div>
        
        {/* 内容区域 */}
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 md:p-8"
        >
          <div className="flex items-start mb-6">
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg text-blue-600 dark:text-blue-300 mr-4">
              {activeContent.icon}
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-2">{activeContent.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{activeContent.description}</p>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">主要内容：</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {activeContent.topics.map((topic, index) => (
                <li key={index} className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  {topic}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-8 flex justify-end">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              查看详情
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}