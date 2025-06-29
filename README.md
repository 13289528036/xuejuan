# Web前端开发课程练习平台

## 1. 项目简介

本项目是一个基于 Next.js 和 Tailwind CSS 构建的Web前端开发课程练习平台。它旨在整合和展示课程中的各项练习作业，并集成第三方服务如 QAnything 和 WakaTime API，以实现更丰富的功能和数据展示。

## 2. QAnything 集成路径与实现细节

### 2.1 集成路径选择

为了将现有的HTML页面（如 `cha.html`）集成到 Next.js 项目中，我们选择了**通过 `iframe` 嵌入**的方式。原因如下：

*   **快速集成**：直接嵌入现有页面，无需重写大量静态HTML、CSS和原生JavaScript代码，可以快速完成集成。
*   **样式隔离**：`iframe` 可以有效隔离父页面和子页面的CSS样式，避免了将旧有CSS迁移到Tailwind CSS中可能产生的样式冲突问题。
*   **保留原有功能**：旧作业中的原生JavaScript交互（如图表、轮播图等）可以不经修改直接运行。

### 2.2 实现细节

我们在 Next.js 应用中创建了一个新的页面（例如 `/pages/cha.js`），在该页面组件中，使用 `iframe` 标签指向静态的 `cha.html` 文件。为了让 Next.js 应用能够访问到这个静态文件，我们将 `cha.html` 以及其依赖的 `script.js`, `style.css` 和图片资源放在了 `public` 目录下。

```javascript
// pages/cha.js
export default function ChaPage() {
  return (
    <div>
      <h1>中国茶文化</h1>
      <iframe src="/cha.html" width="100%" height="800px" style={{ border: 'none' }} />
    </div>
  );
}