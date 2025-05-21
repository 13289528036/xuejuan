import Navbar from '../components/Navbar';


// 页面主组件
export default function HomePage() {
  // 示例练习数据
  const exercises = [
    {
      id: 1,
      title: "HTML基础与实践",
      description: "学习HTML标签、结构和语义化，完成第一个静态网页。",
      link: "#", // 替换为实际链接
      imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" // 示例图片
    },
    {
      id: 2,
      title: "CSS样式与布局",
      description: "掌握CSS选择器、盒模型、Flexbox和Grid布局，美化页面。",
      link: "#",
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    },
    {
      id: 3,
      title: "JavaScript交互特效",
      description: "学习JavaScript基础语法、DOM操作和事件处理，实现动态效果。",
      link: "#",
      imageUrl: "https://images.unsplash.com/photo-1550645612-83f5d594b671?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    },
    {
      id: 4,
      title: "React组件化开发",
      description: "入门React框架，学习组件化编程思想，构建单页应用。",
      link: "#",
      imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    },
    {
      id: 5,
      title: "Tailwind CSS实战",
      description: "学习使用Tailwind CSS快速构建现代化用户界面。",
      link: "#",
      imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    },
    {
      id: 6,
      title: "综合项目：作品集网站",
      description: "运用所学知识，独立设计并完成一个个人作品集网站。",
      link: "#",
      imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    }
  ];

  return (
    // 1. 更新背景为更美观的渐变色
    // 2. 添加 bg-[length:200%_200%] 来扩大背景图尺寸，以便动画时有移动空间
    // 3. 添加 animate-gradient-flow 来应用我们定义的动画
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-sky-100 via-indigo-100 to-pink-100 bg-[length:200%_200%] animate-gradient-flow">
      <Navbar />
      {/* 移除了临时的 Hello 标题 */}
      <main className="flex-grow container mx-auto px-4 py-12">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            《Web前端开发》课程作业展示
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            欢迎来到课程作业展示平台。这里汇集了各个阶段的学习成果与练习项目。
          </p>
          {/* 新增的欢迎语 */}
          <p className="text-xl md:text-2xl text-pink-600 font-semibold mt-4">
            欢迎来到雪娟的页面
          </p>
        </header>

        {/* 课程练习列表区域 */}
        <section>
          <h2 className="text-3xl font-semibold text-slate-800 mb-10 text-center">
            课程练习列表
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 示例卡片开始 */}
            {exercises.map((exercise) => (
              <div 
                key={exercise.id} 
                // 2. 增强卡片交互：增加 hover:shadow-2xl 并使用 transition-all
                className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out flex flex-col"
              >
                <img 
                  className="w-full h-48 object-cover" // 固定图片高度，防止卡片高度不一
                  src={exercise.imageUrl} 
                  alt={exercise.title} 
                />
                <div className="p-6 flex flex-col flex-grow"> {/* flex-grow 确保内容区占满剩余空间 */}
                  <h3 className="text-xl font-semibold text-slate-700 mb-2">{exercise.title}</h3>
                  <p className="text-slate-600 text-sm mb-4 flex-grow">{exercise.description}</p> {/* flex-grow 使描述区域可伸展 */}
                  <a 
                    href={exercise.link} 
                    // 3. 增强按钮交互：增加 transform hover:scale-105 并使用 transition-all
                    className="mt-auto inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 text-center transform hover:scale-105"
                  >
                    查看详情
                  </a>
                </div>
              </div>
            ))}
            {/* 示例卡片结束 */}
          </div>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="bg-slate-800 text-slate-300 text-center p-8 mt-auto"> {/* 增加内边距 */}
        <p>&copy; {new Date().getFullYear()} Web前端开发课程. 版权所有.</p>
        <p className="text-sm mt-1">专业设计，用心呈现</p>
      </footer>
    </div>
    // 移除了一个多余的 );
  );
}