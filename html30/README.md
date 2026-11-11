# 产品分类卡片 · 矩形图片版

- 单独的 HTML + CSS，无 JavaScript、无外部依赖。
- 最大宽度 1400px；PC 四列，手机两列。
- 鼠标 Hover 或键盘聚焦：图片饱和度、亮度略增强，轻微放大；边框和标题变为橙色，标题下划线从左向右展开。
- 使用原创 SVG 插画作为可见占位图，正式网站请替换为真实产品分类图片（建议统一尺寸、场景和色调）。
- CSS 样式全部以 `category-grid` 开头，方便单独迁移至 WordPress。
- 将所有 `href="#"` 替换为对应分类的真实链接。

直接打开 `index.html` 查看效果。移植时复制 `<section class="category-grid">` 及其内部内容，并加载 `assets/css/category-grid.css`。

色彩变化位于 `.category-grid__media img` 的 `filter`，橙色可修改 `--cg-accent`。

## 图片完整显示

本案例使用透明背景的 600×600 WebP 抠图。图片通过 `object-fit: contain` 与居中定位完整显示，不会被圆形或矩形容器裁切。鼠标悬停时保留原有动效。真实分类链接仍需替换 `href="#"`。
