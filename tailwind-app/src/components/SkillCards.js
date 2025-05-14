"use client";

import { motion } from 'framer-motion'; // 导入 motion

export default function SkillCards() {
  const skills = [
    {
      title: "HTML5",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      color: "bg-orange-500",
      description: "结构化文档标记语言，定义网页的内容和结构"
    },
    {
      title: "CSS3",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      color: "bg-blue-500",
      description: "层叠样式表，负责网页的表现与布局"
    },
    {
      title: "JavaScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      color: "bg-yellow-500",
      description: "脚本语言，为网页添加交互功能和动态效果"
    },
    {
      title: "React",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      color: "bg-blue-400",
      description: "用于构建用户界面的JavaScript库"
    },
    {
      title: "Tailwind CSS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
      color: "bg-teal-500",
      description: "实用优先的CSS框架，快速构建现代网站"
    },
    {
      title: "Next.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      color: "bg-black",
      description: "React框架，用于生产环境的应用开发"
    },
    {
      title: "Git",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      color: "bg-red-500",
      description: "分布式版本控制系统，管理代码和协作开发"
    },
    {
      title: "Webpack",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg",
      color: "bg-blue-600",
      description: "静态模块打包工具，处理应用程序依赖"
    }
  ];
  
  return (
    <section className="py-12 md:py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">核心技能</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          掌握这些前端开发技能，让您能够构建现代、响应式和交互性强的Web应用程序。
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {skills.map((skill, index) => (
          <motion.div // 将 div 替换为 motion.div
            key={index}
            // 移除了 ref 和 style 中的 animationDelay, animationFillMode
            // 移除了 opacity-0 类名，framer-motion 会处理初始状态
            className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            initial={{ opacity: 0, y: 20 }} // 初始状态：不可见，略微向下偏移
            whileInView={{ opacity: 1, y: 0 }} // 进入视口后的状态：可见，回到原位
            viewport={{ once: true, amount: 0.1 }} // 动画触发条件：进入视口10%时触发，且只触发一次
            transition={{ duration: 0.5, delay: index * 0.1 }} // 动画过渡效果：持续0.5秒，每个卡片延迟0.1秒 * 索引
          >
            <div className={`h-2 ${skill.color}`}></div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <img src={skill.icon} alt={skill.title} className="w-10 h-10 mr-3" />
                <h3 className="text-xl font-bold">{skill.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{skill.description}</p>
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium flex items-center">
                  了解更多
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}