import Navbar from "@/components/Navbar";
import ExerciseCard from "@/components/ExerciseCard"; // 导入练习卡片组件
import exercises from "@/data/exercises.json"; // 从 JSON 文件导入练习数据

// 示例练习数据
// const exercises = [
//   {
//     id: 1,
//     title: "HTML 基础结构练习",
//     description: "学习并实践HTML5的基本文档结构，包括头部、主体和常用标签。",
//     imageUrl: "https://images.unsplash.com/photo-1600695268275-1a6468700bd5", // 关键词: html, web
//     link: "/exercises/html-basics", // 假设的练习链接
//     tags: ["HTML", "基础"],
//   },
//   {
//     id: 2,
//     title: "CSS 盒模型与布局",
//     description: "深入理解CSS盒模型，并使用Flexbox和Grid进行响应式页面布局。",
//     imageUrl: "https://source.unsplash.com/random/600x400?css,layout", // 关键词: css, layout
//     link: "/exercises/css-layout",
//     tags: ["CSS", "Flexbox", "Grid", "响应式"],
//   },
//   {
//     id: 3,
//     title: "JavaScript DOM 操作",
//     description: "通过JavaScript动态操作DOM元素，实现交互式网页功能。",
//     imageUrl: "https://source.unsplash.com/random/600x400?javascript,dom", // 关键词: javascript, dom
//     link: "/exercises/js-dom",
//     tags: ["JavaScript", "DOM", "交互"],
//   },
//   {
//     id: 4,
//     title: "React 组件化开发",
//     description: "学习使用React构建可复用的UI组件，理解状态和属性。",
//     imageUrl: "https://source.unsplash.com/random/600x400?react,components", // 关键词: react, components
//     // link: "/exercises/react-components", // 示例：无链接
//     tags: ["React", "组件", "SPA"],
//   },
// ];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            《Web前端开发》课程练习
          </h1>
          <p className="text-lg text-slate-600">
            欢迎来到课程练习展示平台，这里汇集了各个阶段的学习成果。
          </p>
          {/* 新增的欢迎语 */}
          <p className="mt-4 text-3xl font-extrabold ">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-pulse">
              欢迎来到雪娟页面
            </span>
          </p>
        </header>

        {/* 练习卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              title={exercise.title}
              description={exercise.description}
              imageUrl={exercise.imageUrl}
              link={exercise.link}
              tags={exercise.tags}
            />
          ))}
        </div>
      </main>
      {/* Footer 组件将在 layout.js 中添加 */}
    </div>
  );
}
