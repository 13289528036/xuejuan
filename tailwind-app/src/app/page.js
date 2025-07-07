"use client";
import { useState, useEffect } from 'react';
import GameBoard from '../components/GameBoard';
import ScorePanel from '../components/ScorePanel';
import GameControls from '../components/GameControls';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [moves, setMoves] = useState(20);
  const [gameStatus, setGameStatus] = useState('ready'); // ready, playing, paused, over
  const [activeTab, setActiveTab] = useState('home'); // home, game, works, homework-detail, favorites
  const [selectedHomework, setSelectedHomework] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [wakaTimeStats, setWakaTimeStats] = useState({
    today: '4小时32分钟',
    week: '23小时45分钟',
    month: '98小时12分钟',
    languages: [
      { name: 'JavaScript', percent: 45 },
      { name: 'HTML', percent: 30 },
      { name: 'CSS', percent: 25 }
    ]
  });

  // 初始化收藏列表
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // 保存收藏到本地存储
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // 图片轮播效果
  useEffect(() => {
    if (activeTab === 'homework-detail' && selectedHomework?.gallery) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === selectedHomework.gallery.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [activeTab, selectedHomework]);

  const startGame = () => {
    setGameStatus('playing');
    setScore(0);
    setMoves(20);
  };

  const pauseGame = () => {
    setGameStatus(gameStatus === 'paused' ? 'playing' : 'paused');
  };

  const handleScoreUpdate = (points) => {
    setScore(prev => prev + points);
    setMoves(prev => prev - 1);
  };

  useEffect(() => {
    if (moves <= 0) {
      setGameStatus('over');
    }
  }, [moves]);

  // 查看作业详情
  const viewHomeworkDetail = (homework) => {
    setSelectedHomework(homework);
    setActiveTab('homework-detail');
    setCurrentImageIndex(0);
    // 模拟页面滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 返回作业列表
  const backToWorks = () => {
    setActiveTab('works');
    setSelectedHomework(null);
  };

  // 收藏/取消收藏作业
  const toggleFavorite = (homework) => {
    const isFavorited = favorites.some(fav => fav.id === homework.id);

    if (isFavorited) {
      setFavorites(favorites.filter(fav => fav.id !== homework.id));
      showToastMessage(`已取消收藏 "${homework.title}"`);
    } else {
      setFavorites([...favorites, homework]);
      showToastMessage(`已收藏 "${homework.title}"`);
    }
  };

  // 显示提示消息
  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // 切换暗黑模式
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // 作业列表
  const homeworks = [
    {
      id: 1,
      title: "HTML基础结构设计",
      description: "使用HTML5标签创建语义化网页结构",
      date: "2023-09-15",
      content: "在这个作业中，我学习了HTML5的语义化标签，包括header、nav、main、section、article、aside和footer等。通过使用这些标签，我创建了一个结构清晰、符合Web标准的网页框架。这种语义化的结构不仅有利于搜索引擎优化，还能提高网页的可访问性。",
      skills: ["HTML5", "语义化标签", "Web标准"],
      image: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?q=80&w=1932&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=1770&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1770&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1770&auto=format&fit=crop"
      ]
    },
    {
      id: 2,
      title: "CSS样式与布局",
      description: "使用Flexbox和Grid实现响应式布局",
      date: "2023-09-22",
      content: "这个作业中，我深入学习了CSS的Flexbox和Grid布局系统。我使用Flexbox实现了导航栏和卡片组件的灵活布局，并使用Grid创建了一个响应式的图片画廊。通过媒体查询，我确保网页在不同屏幕尺寸下都能保持良好的用户体验。",
      skills: ["CSS3", "Flexbox", "Grid", "响应式设计", "媒体查询"],
      image: "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?q=80&w=1771&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=1770&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?q=80&w=1771&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=1770&auto=format&fit=crop"
      ]
    },
    {
      id: 3,
      title: "JavaScript交互功能",
      description: "实现表单验证和动态内容加载",
      date: "2023-09-29",
      content: "在这个JavaScript项目中，我实现了一个具有实时验证功能的表单。用户在输入过程中就能收到反馈，而不必等到提交表单后才知道错误。此外，我还使用Fetch API实现了动态内容加载，使网页能够无需刷新就能更新内容。",
      skills: ["JavaScript", "DOM操作", "表单验证", "Fetch API", "异步编程"],
      image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=1770&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1770&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=1770&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=1974&auto=format&fit=crop"
      ]
    },
    {
      id: 4,
      title: "React组件开发",
      description: "创建可复用的React组件和状态管理",
      date: "2023-10-06",
      content: "这个作业中，我学习了React的核心概念，包括组件、props和state。我创建了一系列可复用的UI组件，如按钮、输入框、模态框等。同时，我使用React的Context API和useReducer钩子实现了简单的状态管理，使组件之间能够共享数据。",
      skills: ["React", "组件化开发", "Hooks", "状态管理", "Context API"],
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1770&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1770&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=1770&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931&auto=format&fit=crop"
      ]
    },
    {
      id: 5,
      title: "开心消消乐游戏",
      description: "使用React和Tailwind CSS实现消除类游戏",
      date: "2023-10-13",
      content: "在这个项目中，我结合React和Tailwind CSS开发了一个开心消消乐游戏。游戏包含完整的游戏逻辑，如消除匹配、计分系统、关卡进度等。我使用React的状态管理来处理游戏状态，并使用Tailwind CSS创建了美观的用户界面。",
      skills: ["React", "Tailwind CSS", "游戏开发", "状态管理", "动画效果"],
      image: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=1974&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1771&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=1770&auto=format&fit=crop"
      ]
    },
  ];

  // 页面过渡动画配置
  const pageTransition = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <main className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-purple-900 via-purple-700 to-indigo-800'} transition-colors duration-500`}>
      {/* 导航栏 */}
      <nav className="sticky top-0 z-50 bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <motion.span
                className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-500"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                雪娟的个人空间
              </motion.span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setActiveTab('home')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${activeTab === 'home' ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
              >
                首页
              </button>
              <button
                onClick={() => setActiveTab('works')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${activeTab === 'works' || activeTab === 'homework-detail' ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
              >
                作业展示
              </button>
              <button
                onClick={() => setActiveTab('favorites')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${activeTab === 'favorites' ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
              >
                我的收藏
              </button>
              <button
                onClick={() => setActiveTab('game')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${activeTab === 'game' ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
              >
                开心消消乐
              </button>
              <button
                onClick={toggleDarkMode}
                className="ml-2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
                aria-label="切换暗黑模式"
              >
                {darkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 提示消息 */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            className="fixed top-20 right-4 z-50 bg-white/20 backdrop-blur-lg text-white px-4 py-2 rounded-lg shadow-lg border border-white/30"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 首页内容 */}
      {activeTab === 'home' && (
        <motion.div
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={pageTransition}
        >
          {/* 首页内容 - 个人介绍 */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20 hover:border-white/30 transition-all duration-500">
            <div className="md:flex">
              <div className="md:w-1/3 bg-gradient-to-br from-purple-800 to-indigo-900 p-8 flex flex-col justify-center items-center">
                <motion.div
                  className="w-40 h-40 rounded-full bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-500 mb-6 flex items-center justify-center text-4xl font-bold text-white shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  雪娟
                </motion.div>
                <motion.h2
                  className="text-2xl font-bold text-white mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  雪娟
                </motion.h2>
                <motion.p
                  className="text-white/80 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Web前端开发学习者
                </motion.p>
              </div>
              <div className="md:w-2/3 p-8">
                <motion.h1
                  className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-500 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  欢迎来到我的个人空间
                </motion.h1>
                <div className="text-white/90 space-y-4">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    你好！我是雪娟，一名热爱Web前端开发的学习者。这个网站是我学习和实践的作品集，展示了我在前端开发领域的成长历程。
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    在这里，你可以浏览我完成的各种作业和项目，包括HTML结构设计、CSS样式与布局、JavaScript交互功能以及React组件开发等。
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    我还开发了一个有趣的"开心消消乐"游戏，欢迎体验！你可以收藏喜欢的作业，方便以后查看。
                  </motion.p>
                  <motion.div
                    className="pt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <button
                      onClick={() => setActiveTab('works')}
                      className="px-6 py-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full text-white font-medium shadow-lg hover:shadow-amber-500/50 transition-all mr-4 hover:scale-105"
                    >
                      查看作业
                    </button>
                    <button
                      onClick={() => setActiveTab('game')}
                      className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-full text-white font-medium transition-all hover:scale-105"
                    >
                      玩游戏
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* 技能展示 */}
          <div className="mt-12">
            <motion.h2
              className="text-2xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              我的技能
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-white/40 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mb-4 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">HTML & CSS</h3>
                <p className="text-white/70">熟悉HTML5语义化标签和CSS3新特性，能够创建响应式布局和美观的用户界面。</p>
                <div className="mt-4 w-full bg-white/10 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '85%' }}
                    transition={{ delay: 0.6, duration: 1 }}
                  ></motion.div>
                </div>
              </motion.div>

              <motion.div
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-white/40 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center mb-4 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">JavaScript</h3>
                <p className="text-white/70">掌握JavaScript基础和ES6+新特性，能够实现交互功能和动态内容更新。</p>
                <div className="mt-4 w-full bg-white/10 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '75%' }}
                    transition={{ delay: 0.7, duration: 1 }}
                  ></motion.div>
                </div>
              </motion.div>

              <motion.div
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-white/40 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center mb-4 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">React & Tailwind</h3>
                <p className="text-white/70">学习使用React构建组件化应用，结合Tailwind CSS创建现代化的用户界面。</p>
                <div className="mt-4 w-full bg-white/10 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-cyan-400 to-cyan-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '65%' }}
                    transition={{ delay: 0.8, duration: 1 }}
                  ></motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* 学习进度 */}
          <div className="mt-12">
            <motion.h2
              className="text-2xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              学习进度
            </motion.h2>
            <motion.div
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex flex-col md:flex-row justify-between">
                <div className="mb-6 md:mb-0">
                  <h3 className="text-lg font-semibold text-white mb-4">最近完成的课程</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center text-white/80">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Tailwind CSS 高级应用
                    </li>
                    <li className="flex items-center text-white/80">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Next.js 基础入门
                    </li>
                  </ul>
                </div>
                <div className="md:border-l md:border-white/20 md:pl-6">
                  <h3 className="text-lg font-semibold text-white mb-4">编程时间统计</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-white/80 mb-1">
                        <span>今日</span>
                        <span>{codingTime.today}</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: '60%' }}
                          transition={{ delay: 0.9, duration: 1 }}
                        ></motion.div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-white/80 mb-1">
                        <span>本周</span>
                        <span>{codingTime.week}</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: '75%' }}
                          transition={{ delay: 1, duration: 1 }}
                        ></motion.div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-white/80 mb-1">
                        <span>本月</span>
                        <span>{codingTime.month}</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: '85%' }}
                          transition={{ delay: 1.1, duration: 1 }}
                        ></motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* 作业展示 */}
      {activeTab === 'works' && (
        <motion.div
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={pageTransition}
        >
          <h1 className="text-3xl font-bold text-white mb-8">作业展示</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {homeworks.map((homework) => (
              <motion.div
                key={homework.id}
                className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300 shadow-lg"
                whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={homework.image}
                    alt={homework.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(homework);
                      }}
                      className="p-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-colors duration-300"
                    >
                      {favorites.some(fav => fav.id === homework.id) ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-white mb-2">{homework.title}</h3>
                  <p className="text-white/70 mb-3">{homework.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {homework.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80"
                      >
                        {skill}
                      </span>
                    ))}
                    {homework.skills.length > 3 && (
                      <span className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80">
                        +{homework.skills.length - 3}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60 text-sm">{homework.date}</span>
                    <button
                      onClick={() => viewHomeworkDetail(homework)}
                      className="px-4 py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full text-white text-sm font-medium shadow-lg hover:shadow-amber-500/50 transition-all hover:scale-105"
                    >
                      查看详情
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* 作业详情 */}
      {activeTab === 'homework-detail' && selectedHomework && (
        <motion.div
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={pageTransition}
        >
          <div className="flex items-center mb-6">
            <button
              onClick={backToWorks}
              className="flex items-center text-white/80 hover:text-white transition-colors mr-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              返回作业列表
            </button>
            <h1 className="text-3xl font-bold text-white">{selectedHomework.title}</h1>
            <button
              onClick={() => toggleFavorite(selectedHomework)}
              className="ml-auto p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
            >
              {favorites.some(fav => fav.id === selectedHomework.id) ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-white/20 mb-8">
                <div className="relative h-80">
                  {selectedHomework.gallery && selectedHomework.gallery.map((img, index) => (
                    <motion.img
                      key={index}
                      src={img}
                      alt={`${selectedHomework.title} 图片 ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: index === 0 ? 1 : 0 }}
                      transition={{ duration: 0.5 }}
                      style={{ display: index === 0 ? 'block' : 'none' }}
                    />
                  ))}
                  {/* 图片导航指示器 */}
                  {selectedHomework.gallery && selectedHomework.gallery.length > 1 && (
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                      {selectedHomework.gallery.map((_, index) => (
                        <button
                          key={index}
                          className={`w-2.5 h-2.5 rounded-full ${index === 0 ? 'bg-white' : 'bg-white/40'}`}
                          onClick={() => { }}
                        ></button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-4">项目描述</h2>
                <p className="text-white/80 mb-6 leading-relaxed">{selectedHomework.content}</p>

                <h3 className="text-xl font-bold text-white mb-3">使用的技术</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedHomework.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-sm text-white/90 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-4 mt-4">
                  <p className="text-white/60 text-sm">提交日期: {selectedHomework.date}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 sticky top-24">
                <h3 className="text-xl font-bold text-white mb-4">相关作业</h3>
                <div className="space-y-4">
                  {homeworks
                    .filter(hw => hw.id !== selectedHomework.id)
                    .slice(0, 3)
                    .map(homework => (
                      <div
                        key={homework.id}
                        className="flex items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                        onClick={() => viewHomeworkDetail(homework)}
                      >
                        <img
                          src={homework.image}
                          alt={homework.title}
                          className="w-16 h-16 rounded-lg object-cover mr-4"
                        />
                        <div>
                          <h4 className="text-white font-medium">{homework.title}</h4>
                          <p className="text-white/60 text-sm">{homework.date}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* 收藏列表 */}
      {activeTab === 'favorites' && (
        <motion.div
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={pageTransition}
        >
          <h1 className="text-3xl font-bold text-white mb-8">我的收藏</h1>

          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((homework) => (
                <motion.div
                  key={homework.id}
                  className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300 shadow-lg"
                  whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={homework.image}
                      alt={homework.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(homework);
                        }}
                        className="p-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-colors duration-300"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-white mb-2">{homework.title}</h3>
                    <p className="text-white/70 mb-3">{homework.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {homework.skills.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80"
                        >
                          {skill}
                        </span>
                      ))}
                      {homework.skills.length > 3 && (
                        <span className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80">
                          +{homework.skills.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/60 text-sm">{homework.date}</span>
                      <button
                        onClick={() => viewHomeworkDetail(homework)}
                        className="px-4 py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full text-white text-sm font-medium shadow-lg hover:shadow-amber-500/50 transition-all hover:scale-105"
                      >
                        查看详情
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-12 border border-white/20 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-white/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <h2 className="text-2xl font-bold text-white mb-2">暂无收藏</h2>
              <p className="text-white/70 mb-6">你还没有收藏任何作业，可以在作业列表中点击星标收藏喜欢的作业。</p>
              <button
                onClick={() => setActiveTab('works')}
                className="px-6 py-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full text-white font-medium shadow-lg hover:shadow-amber-500/50 transition-all hover:scale-105"
              >
                浏览作业
              </button>
            </div>
          )}
        </motion.div>
      )}

      {/* 游戏内容 */}
      {activeTab === 'game' && (
        <motion.div
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={pageTransition}
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
            <div className="p-6 md:p-8">
              <h1 className="text-3xl font-bold text-white mb-6">开心消消乐</h1>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20">
                    {gameStatus === 'ready' && (
                      <div className="flex flex-col items-center justify-center p-8 h-96">
                        <h2 className="text-2xl font-bold text-white mb-6">准备开始游戏</h2>
                        <p className="text-white/70 mb-8 text-center">
                          消除相邻的相同颜色方块，获得高分！<br />
                          每次移动会消耗一步，步数用完游戏结束。
                        </p>
                        <button
                          onClick={startGame}
                          className="px-8 py-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full text-white font-medium shadow-lg hover:shadow-amber-500/50 transition-all hover:scale-105"
                        >
                          开始游戏
                        </button>
                      </div>
                    )}

                    {gameStatus === 'playing' && (
                      <div className="p-4">
                        <GameBoard onScoreUpdate={handleScoreUpdate} gameStatus={gameStatus} />
                      </div>
                    )}

                    {gameStatus === 'paused' && (
                      <div className="flex flex-col items-center justify-center p-8 h-96 bg-black/50">
                        <h2 className="text-2xl font-bold text-white mb-6">游戏暂停</h2>
                        <button
                          onClick={pauseGame}
                          className="px-8 py-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full text-white font-medium shadow-lg hover:shadow-amber-500/50 transition-all hover:scale-105"
                        >
                          继续游戏
                        </button>
                      </div>
                    )}

                    {gameStatus === 'over' && (
                      <div className="flex flex-col items-center justify-center p-8 h-96">
                        <h2 className="text-2xl font-bold text-white mb-2">游戏结束</h2>
                        <p className="text-white/70 mb-4">你的最终得分：{score}</p>
                        <button
                          onClick={startGame}
                          className="px-8 py-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full text-white font-medium shadow-lg hover:shadow-amber-500/50 transition-all hover:scale-105 mb-4"
                        >
                          再玩一次
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 p-6 mb-6">
                    <ScorePanel score={score} level={level} moves={moves} />
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 p-6">
                    <GameControls
                      onStart={startGame}
                      onPause={pauseGame}
                      gameStatus={gameStatus}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* 页脚 */}
      <footer className="bg-white/5 border-t border-white/10 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">关于我</h3>
              <p className="text-white/60">
                我们致力于探索全球投资机遇，专注于主权财富基金的策略分析与资产配置。本网站旨在分享我们对全球经济趋势的洞察和投资组合的深度研究。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">联系方式</h3>
              <ul className="space-y-2 text-white/60">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      {gameStatus === 'paused' && (
                        <div className="flex flex-col items-center justify-center p-8 h-96 bg-black/50">
                          <h2 className="text-2xl font-bold text-white mb-6">游戏暂停</h2>
                          <button
                            onClick={resumeGame}
                            className="px-8 py-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full text-white font-medium shadow-lg hover:shadow-amber-500/50 transition-all hover:scale-105"
                          >
                            继续游戏
                          </button>
                        </div>
                      )}

                      {gameStatus === 'over' && (
                        <div className="flex flex-col items-center justify-center p-8 h-96">
                          <h2 className="text-2xl font-bold text-white mb-2">游戏结束</h2>
                          <p className="text-white/70 mb-4">你的最终得分：{score}</p>
                          <button
                            onClick={startGame}
                            className="px-8 py-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full text-white font-medium shadow-lg hover:shadow-amber-500/50 transition-all hover:scale-105 mb-4"
                          >
                            再玩一次
                          </button>
                        </div>
                      )}
                                      </div>
                </div>

                <div>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 p-6 mb-6">
                    <ScorePanel score={score} level={level} moves={moves} />
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 p-6">
                    <GameControls
                      onStart={startGame}
                      onPause={pauseGame}
                      onResume={resumeGame}
                      gameStatus={gameStatus}
                    />
                  </div>
                </div>
            </div>
          </div>
        </div>
      </motion.div>
                          )}

      {/* 页脚 */}
      <footer className="bg-white/5 border-t border-white/10 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">关于我</h3>
              <p className="text-white/60">
                我是雪娟，一名热爱Web前端开发的学习者。这个网站展示了我的学习成果和项目作品。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">联系方式</h3>
              <ul className="space-y-2 text-white/60">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  xuejuan@example.com
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  +86 123 4567 8901
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  北京市海淀区
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">快速链接</h3>
              <ul className="space-y-2 text-white/60">
                <li>
                  <button
                    onClick={() => setActiveTab('home')}
                    className="hover:text-white transition-colors"
                  >
                    首页
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('works')}
                    className="hover:text-white transition-colors"
                  >
                    作业展示
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('favorites')}
                    className="hover:text-white transition-colors"
                  >
                    我的收藏
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('game')}
                    className="hover:text-white transition-colors"
                  >
                    开心消消乐
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/40 text-sm">
            <p>© {new Date().getFullYear()} 雪娟的个人空间. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

// 游戏组件
const GameBoard = ({ onScoreUpdate, gameStatus }) => {
  const [board, setBoard] = useState([]);
  const [selectedTiles, setSelectedTiles] = useState([]);
  const boardSize = 8;
  const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];

  // 初始化游戏板
  useEffect(() => {
    if (gameStatus === 'playing') {
      initializeBoard();
    }
  }, [gameStatus]);

  const initializeBoard = () => {
    const newBoard = [];
    for (let i = 0; i < boardSize; i++) {
      const row = [];
      for (let j = 0; j < boardSize; j++) {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        row.push({
          id: `${i}-${j}`,
          color: randomColor,
          row: i,
          col: j
        });
      }
      newBoard.push(row);
    }
    setBoard(newBoard);
  };

  const handleTileClick = (tile) => {
    if (gameStatus !== 'playing') return;

    // 如果已经选中了这个方块，取消选择
    if (selectedTiles.some(t => t.id === tile.id)) {
      setSelectedTiles([]);
      return;
    }

    // 如果没有选中任何方块，选择这个方块
    if (selectedTiles.length === 0) {
      setSelectedTiles([tile]);
      return;
    }

    // 如果已经选中了一个方块，检查是否相邻
    const lastTile = selectedTiles[selectedTiles.length - 1];
    const isAdjacent =
      (Math.abs(tile.row - lastTile.row) === 1 && tile.col === lastTile.col) ||
      (Math.abs(tile.col - lastTile.col) === 1 && tile.row === lastTile.row);

    // 如果相邻且颜色相同，添加到选中列表
    if (isAdjacent && tile.color === lastTile.color) {
      setSelectedTiles([...selectedTiles, tile]);
    } else {
      // 否则，重新选择
      setSelectedTiles([tile]);
    }
  };

  const handleRemoveSelected = () => {
    if (selectedTiles.length < 2) return;

    // 计算得分
    const score = selectedTiles.length * 10;
    onScoreUpdate(score);

    // 创建新的游戏板，移除选中的方块
    const newBoard = [...board];

    // 移除选中的方块并让上面的方块下落
    selectedTiles.forEach(tile => {
      // 从下往上移动方块
      for (let row = tile.row; row > 0; row--) {
        newBoard[row][tile.col] = {
          ...newBoard[row - 1][tile.col],
          row: row
        };
      }

      // 在顶部生成新方块
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      newBoard[0][tile.col] = {
        id: `0-${tile.col}-${Date.now()}`, // 确保ID唯一
        color: randomColor,
        row: 0,
        col: tile.col
      };
    });

    setBoard(newBoard);
    setSelectedTiles([]);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-8 gap-1 mb-4">
        {board.map((row, rowIndex) => (
          row.map((tile, colIndex) => (
            <motion.div
              key={tile.id}
              className={`w-10 h-10 rounded-md cursor-pointer ${tile.color} ${selectedTiles.some(t => t.id === tile.id) ? 'ring-2 ring-white' : ''
                }`}
              onClick={() => handleTileClick(tile)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              layout
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          ))
        ))}
      </div>

      {selectedTiles.length >= 2 && (
        <button
          onClick={handleRemoveSelected}
          className="px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full text-white font-medium shadow-lg hover:shadow-amber-500/50 transition-all hover:scale-105"
        >
          消除 ({selectedTiles.length} 块)
        </button>
      )}
    </div>
  );
};

const ScorePanel = ({ score, level, moves }) => {
  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-4">游戏数据</h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/80">得分</span>
            <span className="text-xl font-bold text-amber-400">{score}</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-amber-400 to-orange-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, score / 10)}%` }}
              transition={{ duration: 0.5 }}
            ></motion.div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/80">等级</span>
            <span className="text-xl font-bold text-green-400">{level}</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(level / 10) * 100}%` }}
              transition={{ duration: 0.5 }}
            ></motion.div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/80">剩余步数</span>
            <span className="text-xl font-bold text-blue-400">{moves}</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full"
              initial={{ width: '100%' }}
              animate={{ width: `${(moves / 30) * 100}%` }}
              transition={{ duration: 0.5 }}
            ></motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GameControls = ({ onStart, onPause, onResume, gameStatus }) => {
  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-4">游戏控制</h3>
      <div className="space-y-3">
        {gameStatus === 'ready' && (
          <button
            onClick={onStart}
            className="w-full py-2 bg-gradient-to-r from-green-400 to-green-600 rounded-lg text-white font-medium shadow-lg hover:shadow-green-500/50 transition-all hover:scale-105 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            开始游戏
          </button>
        )}

        {gameStatus === 'playing' && (
          <button
            onClick={onPause}
            className="w-full py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg text-white font-medium shadow-lg hover:shadow-yellow-500/50 transition-all hover:scale-105 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            暂停游戏
          </button>
        )}

        {gameStatus === 'paused' && (
          <button
            onClick={onResume}
            className="w-full py-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg text-white font-medium shadow-lg hover:shadow-blue-500/50 transition-all hover:scale-105 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            继续游戏
          </button>
        )}

        {gameStatus === 'over' && (
          <button
            onClick={onStart}
            className="w-full py-2 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg text-white font-medium shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            重新开始
          </button>
        )}

        <div className="mt-6 text-white/60 text-sm">
          <p className="mb-2">游戏规则:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>点击相邻的相同颜色方块进行选择</li>
            <li>选择两个或更多方块后点击消除</li>
            <li>消除的方块越多，得分越高</li>
            <li>每次消除会消耗一步，步数用完游戏结束</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
