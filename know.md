## 网页设计基础

### HTML结构
- 文档类型声明
  - 示例：`<!DOCTYPE html>`
  - 用途：指定HTML文档的类型和版本
- 元数据设置
  - 示例：`<meta charset="UTF-8">`, `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
  - 用途：设置字符编码、视口配置等页面基本信息
- 外部资源链接
  - 示例：`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">`
  - 用途：引入外部CSS、字体、图标库等资源

### CSS样式设计
- CSS变量（自定义属性）
  - 示例：`--primary-color: #6c5ce7;`, `--shadow: 0 10px 30px rgba(0, 0, 0, 0.1);`
  - 用途：集中管理颜色、阴影等样式值，便于统一修改
- 选择器使用
  - 元素选择器：`body`, `a`, `ul`等
  - 类选择器：`.container`, `.sidebar`, `.hero`等
  - 伪类选择器：`:hover`, `:focus`, `:active`等
  - 伪元素选择器：`::after`, `::before`等
- 盒模型设置
  - 示例：`box-sizing: border-box;`, `margin: 0; padding: 0;`
  - 用途：统一盒模型计算方式，重置默认边距

### 布局技术
- Flexbox布局
  - 示例：`display: flex;`, `justify-content: center;`, `align-items: center;`
  - 用途：创建灵活的一维布局，控制元素对齐和分布
- Grid布局
  - 示例：`display: grid;`, `grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));`
  - 用途：创建二维网格布局，适合复杂页面结构
- 定位方法
  - 相对定位：`position: relative;`
  - 固定定位：`position: fixed;`
  - 绝对定位：`position: absolute;`
  - 用途：控制元素在页面中的精确位置

### 视觉效果
- 渐变背景
  - 示例：`background: linear-gradient(135deg, #6c5ce7, #a29bfe);`
  - 用途：创建平滑的颜色过渡效果
- 阴影效果
  - 示例：`box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);`
  - 用途：增加元素立体感，提升视觉层次
- 过渡动画
  - 示例：`transition: all 0.3s ease;`
  - 用途：使元素状态变化更加平滑自然
- 关键帧动画
  - 示例：`@keyframes fadeIn { from {...} to {...} }`
  - 用途：创建复杂的自定义动画效果

### 组件设计
- 导航栏组件
  - 结构：固定侧边栏，包含个人信息、导航链接和社交媒体图标
  - 样式：渐变背景、阴影效果、悬停交互
- 卡片组件
  - 结构：图片区域、信息区域、标签和按钮
  - 样式：圆角边框、阴影效果、悬停变换
- 按钮组件
  - 类型：主按钮（`.btn`）和小型按钮（`.btn-small`）
  - 样式：渐变背景、圆角、悬停效果
- 进度条组件
  - 结构：外层容器和内部进度指示器
  - 样式：圆角、渐变填充、动画过渡

### 响应式设计
- 媒体查询
  - 示例：`@media (max-width: 992px) {...}`, `@media (max-width: 768px) {...}`
  - 用途：根据屏幕尺寸调整布局和样式
- 弹性单位
  - 相对长度：`rem`, `em`, `%`
  - 视口单位：`vh`, `vw`
  - 用途：创建可缩放的界面元素
- 响应式布局策略
  - 桌面优先：从大屏幕设计开始，使用媒体查询适配小屏幕
  - 布局转换：在小屏幕上将多列布局转为单列
  - 元素重排：调整元素大小、位置和显示方式

### 交互设计
- 悬停效果
  - 示例：`.nav-links li:hover`, `.project-card:hover`
  - 用途：提供视觉反馈，增强用户体验
- 状态指示
  - 示例：`.nav-links li.active`
  - 用途：标识当前活动状态的元素
- 过渡动效
  - 示例：`transform: translateY(-10px);`, `transform: scale(1.05);`
  - 用途：创建平滑的元素变换效果

### 图标与字体
- 图标库集成
  - 示例：Font Awesome图标（`<i class="fas fa-home"></i>`）
  - 用途：添加视觉元素，提升界面可用性
- Web字体应用
  - 示例：Google Fonts（Noto Sans SC）
  - 用途：确保跨平台字体一致性
- 字体样式设置
  - 字重变化：`font-weight: 300;`, `font-weight: 700;`
  - 字体大小：响应式调整不同元素的字体大小
  - 行高控制：`line-height: 1.6;`