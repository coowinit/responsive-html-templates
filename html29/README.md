# Shop by Category · 圆形产品分类卡片

[在线预览](https://coowinit.github.io/responsive-html-templates/html29/)

此案例为独立的首页产品分类导航模块，可复制 `index.html` 中的 `<section class="shop-category">...</section>` 到 WordPress 模板中，并引入 `assets/css/shop-category.css`。

- 最大内容宽度 1400px，桌面四列、手机两列。
- 四张透明背景 WebP 产品图片放在 `images/` 目录，显示时水平、垂直居中。
- 图片使用 `object-fit: contain`，并留有 Hover 放大的安全余量，避免边缘裁切。
- 圆形为纯浅灰背景，不使用可见描边或阴影。
- Hover 时产品图片轻微放大，标题下划线从左向右展开；支持键盘焦点与减少动态效果设置。
- 组件样式使用独立的 `shop-category` 前缀，不需要 JavaScript。
- 集成真实网站时，将每个 `href="#"` 换成对应产品分类地址；分类名称和图片按实际站点修改。

注意：图片虽然完整显示，但如果源文件自身包含大量透明留白，视觉主体仍可能较小，需要先整理图片画布。
