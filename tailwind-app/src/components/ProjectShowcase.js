"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectShowcase() {
  const [activeProject, setActiveProject] = useState(null);
  
  const projects = [
    {
      id: 1,
      title: "响应式个人作品集",
      category: "HTML/CSS",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
      description: "使用HTML5和CSS3构建的响应式个人作品集网站，展示了媒体查询和Flexbox布局技术。",
      tags: ["HTML5", "CSS3", "响应式设计", "Flexbox"],
      link: "#"
    },
    {
      id: 2,
      title: "待办事项应用",
      category: "JavaScript",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
      description: "使用原生JavaScript开发的待办事项应用，实现了任务的添加、编辑、删除和状态管理功能。",
      tags: ["JavaScript", "LocalStorage", "DOM操作", "事件处理"],
      link: "#"
    },
    {
      id: 3,
      title: "电影信息查询系统",
      category: "React",
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728",
      description: "基于React框架开发的电影信息查询系统，使",
      tags: ["HTML5", "CSS3", "响应式设计", "Flexbox"],
      link: "#"
    },
    {
      id: 2,
      title: '响应式个人网站',
      description: '使用HTML、CSS和JavaScript构建的个人作品集网站，完全响应式设计',
      image: 'https://via.placeholder.com/600x400/4F46E5/FFFFFF?text=个人网站',
      tags: ['HTML', 'CSS', 'JavaScript', '响应式设计'],
      features: [
        '响应式布局，适配各种设备',
        '深色/浅色模式切换',
        '作品集展示区域',
        '联系表单与验证'
      ]
    },
    {
      id: 2,
      title: 'React任务管理应用',
      description: '使用React和Context API构建的任务管理应用，支持任务的增删改查',
      image: 'https://via.placeholder.com/600x400/2563EB/FFFFFF?text=任务管理',
      tags: ['React', 'Context API', 'Hooks', 'LocalStorage'],
      features: [
        '任务创建与编辑',
        '拖拽排序功能',
        '任务分类与筛选',
        '本地存储保存数据'
      ]
    },
    {
      id: 3,
      title: '电商网站前端',
      description: '模拟电商网站的前端界面，包含商品展示、购物车和结账流程',
      image: 'https://via.placeholder.com/600x400/0891B2/FFFFFF?text=电商网站',
      tags: ['React', 'Redux', 'Tailwind CSS', 'API集成'],
      features: [
        '商品列表与详情页',
        '购物车功能',
        '用户认证流程',
        '响应式商品卡片'
      ]
    }
  ];
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">项目案例</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            通过实战项目巩固所学知识，构建真实世界的Web应用
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => (
            <div 
              key={project.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setActiveProject(activeProject === project.id ? null : project.id)}
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                  {activeProject === project.id ? '收起详情' : '查看详情'}
                  <svg 
                    className={`ml-1 w-4 h-4 transition-transform ${activeProject === project.id ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {activeProject === project.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-semibold mb-2">主要功能：</h4>
                    <ul className="space-y-1">
                      {project.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-4 h-4 text-green-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};