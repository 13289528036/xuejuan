import "./globals.css";
import Footer from "@/components/Footer"; // 导入 Footer 组件

export const metadata = {
  title: "Web前端开发练习平台", // 更新标题
  description: "《Web前端开发》课程练习成果展示", // 更新描述
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <head>
        {/* Next.js 会自动注入必要的 <head> 内容 */}
        {/* 您也可以在这里添加自定义的 <meta> 或 <link> 标签 */}
      </head>
      <body>
        <div className="flex flex-col min-h-screen"> {/* 添加 flex 容器使 footer 保持在底部 */}
          <main className="flex-grow"> {/* 主要内容区域 */}
            {children}
          </main>
          <Footer /> {/* 在主要内容之后添加 Footer 组件 */}
        </div>
      </body>
    </html>
  );
}
