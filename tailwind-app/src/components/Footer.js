import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Web前端技术</h3>
            <p className="text-slate-300">
              探索现代前端开发的奥秘，掌握核心技术，成为优秀的Web开发者。
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">学习资源</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">教程文档</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">视频课程</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">实战项目</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">常见问题</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">技术栈</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">HTML & CSS</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">JavaScript</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">React</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Next.js</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">联系我们</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a href="mailto:contact@example.com" className="text-slate-300 hover:text-white transition-colors">
                  contact@example.com
                </a>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0110 4.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                </svg>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="text-center pt-8 border-t border-slate-700 text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} Web前端技术课程. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;