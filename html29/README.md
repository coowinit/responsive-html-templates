# Shop by Category 分类模块

本目录仅包含首页产品分类区域。打开 [在线预览](https://coowinit.github.io/responsive-html-templates/html29/)；`index.html` 可独立预览，其中 `<section class="shop-category">...</section>` 是可复制进 WordPress 首页模板的模块。

- 最大内容宽度 1400px；电脑端四列、手机端两列。
- 将 `assets/css/shop-category.css` 加载到页面，样式使用 `shop-category` 前缀，避免影响其他模块。
- 将四个 `href="#"` 替换为真实产品分类链接。
- 将每个 `svg.shop-category__placeholder` 替换为 `<img class="shop-category__product" src="产品抠图路径.webp" alt="" loading="lazy">`，建议使用透明背景的产品图片。
- 圆形使用纯浅灰背景，无边框、无阴影；Hover 时圆形不动，仅图标或透明产品图片轻微放大（1.06 倍），分类文字下划线从左向右展开。
- 不依赖 JavaScript；支持 Hover、键盘焦点和减少动态效果偏好。

案例图片仅为 SVG 占位符，名称和链接请按实际站点修改。

## 图片完整显示

本案例使用透明背景的 600×600 WebP 抠图。图片通过 `object-fit: contain` 与居中定位完整显示，不会被圆形或矩形容器裁切。鼠标悬停时保留原有动效。真实分类链接仍需替换 `href="#"`。
