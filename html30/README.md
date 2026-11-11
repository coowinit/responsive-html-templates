# Shop by Category · 矩形产品分类卡片

[在线预览](https://coowinit.github.io/responsive-html-templates/html30/)

独立 HTML + CSS 分类导航模块，使用真实的透明背景 WebP 产品图片，位于 `images/` 目录。

- 最大内容宽度 1400px，桌面四列、手机两列。
- 浅灰圆角矩形背景，产品图片通过 `object-fit: contain` 水平、垂直居中，保留完整轮廓。
- Hover 或键盘聚焦：图片饱和度、亮度增强并轻微放大，橙色边框高亮，分类名称变色并显示从左向右展开的下划线。
- 样式以 `category-grid` 前缀隔离，纯 CSS，无 JavaScript 或外部依赖。
- 将 `href="#"` 替换为真实的产品分类 URL；需替换产品时修改 `images/` 图片和对应路径。
- 颜色可通过 `--cg-accent` 调整，图片颜色效果在 `.category-grid__media img` 的 `filter` 中配置。

复制 `index.html` 中的 `<section class="category-grid">...</section>` 到目标页面，并引入 `assets/css/category-grid.css` 即可使用。

注意：`object-fit: contain` 保证原始图片内容不被基础布局裁切，但 Hover 放大可能使过于贴边的产品触及容器边缘；建议源图片预留适当透明留白。
