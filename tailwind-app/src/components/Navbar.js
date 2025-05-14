"use client";

import { useState, useEffect } from 'react';


function Navbar() {
  const [showCommitDetails, setShowCommitDetails] = useState(false);
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // GitHub仓库信息 - 请替换为您的仓库信息
  const owner = 'your-username';
  const repo = 'your-repo-name';
  // 如果是私有仓库，需要添加个人访问令牌
  const token = process.env.REACT_APP_GITHUB_TOKEN;
  
  useEffect(() => {
    // 只有当面板显示时才获取数据，避免不必要的API调用
    if (showCommitDetails) {
      fetchCommits();
    }
  }, [showCommitDetails]);
  
  useEffect(() => {
    // 检查系统主题偏好
    if (typeof window !== 'undefined') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
      
      // 监听主题变化
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e) => setIsDarkMode(e.matches);
      mediaQuery.addEventListener('change', handleChange);
      
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);
  
  // 切换暗黑模式
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };
  
  const fetchCommits = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // 使用axios发送请求到GitHub API
      const headers = token ? { Authorization: `token ${token}` } : {};
      const response = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/commits`,
        { headers }
      );
      
      // 处理响应数据
      const commitData = response.data.map(commit => ({
        id: commit.sha,
        date: new Date(commit.commit.author.date).toLocaleDateString('zh-CN'),
        message: commit.commit.message,
        author: commit.commit.author.name,
        avatar: commit.author?.avatar_url,
        url: commit.html_url,
        stats: {
          additions: commit.stats?.additions || 0,
          deletions: commit.stats?.deletions || 0,
          total: commit.stats?.total || 0
        },
        files: commit.files?.length || 0
      }));
      
      // 更新状态
      setCommits(commitData);
      
      // 缓存数据到本地存储
      localStorage.setItem('github_commits', JSON.stringify({
        data: commitData,
        timestamp: Date.now()
      }));
    } catch (err) {
      console.error('获取提交记录失败:', err);
      setError('获取提交记录失败，请稍后再试');
      
      // 尝试从缓存中获取数据
      const cachedData = localStorage.getItem('github_commits');
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        // 检查缓存是否过期（24小时）
        if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
          setCommits(data);
          setError('显示的是缓存数据');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="bg-slate-800 text-white p-4 shadow-md relative">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-xl font-bold hover:text-slate-300 transition-colors">
          作业平台
        </a>
        <div className="space-x-4">
          <a href="/" className="hover:text-slate-300 transition-colors">首页</a>
          <a href="/archive" className="hover:text-slate-300 transition-colors">归档</a>
          <a href="/github-commits" className="hover:text-slate-300 transition-colors">
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              提交记录
            </span>
          </a>
          <a href="/github-stats" className="hover:text-slate-300 transition-colors">
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"/>
              </svg>
              提交统计
            </span>
          </a>
          <button 
            onClick={() => setShowCommitDetails(!showCommitDetails)}
            className="hover:text-slate-300 transition-colors flex items-center"
          >
            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
            作业提交
          </button>
        </div>
      </div>
      
      {/* 提交详情弹出面板 */}
      {showCommitDetails && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-white text-gray-800 rounded-md shadow-lg z-10 p-4">
          <h3 className="text-lg font-semibold mb-3 border-b pb-2">最近提交作业</h3>
          
          {loading && (
            <div className="flex justify-center items-center py-4">
              <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="ml-2">加载中...</span>
            </div>
          )}
          
          {error && !loading && (
            <div className="text-red-500 text-center py-2 text-sm">
              {error}
            </div>
          )}
          
          {!loading && commits.length === 0 && !error && (
            <div className="text-center py-4 text-gray-500">
              暂无提交记录
            </div>
          )}
          
          <div className="max-h-80 overflow-y-auto">
            {!loading && commits.map(commit => (
              <div key={commit.id} className="mb-3 p-2 border-b hover:bg-gray-100 rounded">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-blue-600">{commit.message}</span>
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded">{commit.id.substring(0, 7)}</span>
                </div>
                <div className="text-sm text-gray-600 mt-1 flex items-center">
                  {commit.avatar && (
                    <img src={commit.avatar} alt={commit.author} className="w-6 h-6 rounded-full mr-2" />
                  )}
                  <div>
                    <div>提交者: {commit.author}</div>
                    <div>日期: {commit.date}</div>
                    <div>修改: +{commit.stats.additions} -{commit.stats.deletions}</div>
                  </div>
                </div>
                <a 
                  href={commit.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-2 text-xs text-blue-500 hover:underline inline-block"
                >
                  查看详情
                </a>
              </div>
            ))}
          </div>
          
          <div className="mt-3 text-center">
            <a href="/github-commits" className="text-blue-600 hover:underline text-sm">查看所有提交记录</a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

