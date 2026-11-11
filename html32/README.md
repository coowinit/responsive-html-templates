# html32 · 图片改造前后对比（Before / After）

一个无第三方依赖的响应式图片比较组件，适合展示材料替换、建筑改造、装修和产品效果差异。

## 目录

```text
html32/
├── index.html
├── assets/
│   ├── css/before-after.css
│   └── js/before-after.js
├── images/
│   ├── before.jpg
│   └── after.jpg
└── README.md
```

## 使用方法

- 浏览器直接打开 `index.html` 即可运行；无需 CDN、npm、服务器或 Swiper。
- 页面两张实景图片均为原始 `1260×720` 文件。请尽量让对比的前后两张图片使用**相同尺寸、拍摄角度和画面构图**。
- **左边是 after（改造后），右边是 before（改造前）**，与截图一致。替换图片时保留对应文件名即可，或者修改 HTML 路径。
- 原生 Pointer Events 支持鼠标、触摸及手写笔；键盘方向键每次移动 2%，按住 Shift 为 10%，Home/End 可跳到两端。

### 调整宽度和比例

在 `assets/css/before-after.css` 修改顶部的参数：

```css
.s32 {
  --s32-max-width: 1000px; /* 页面最大宽度：可改为 1200px、900px 等 */
  --s32-ratio: 7 / 4;      /* 桌面图片宽高比 */
  --s32-mobile-ratio: 6 / 5; /* 手机图片宽高比 */
}
```

容器采用 `width: 100%; max-width: var(--s32-max-width);`，因此在窄屏会自动收缩。图片使用 `object-fit: cover`，当桌面/手机比例不同于图片原始比例时，会裁切边缘以保证两张图严密对齐。要完整显示 1260×720 原图，可将对应比例都设为 `7 / 4`。

### 在同一页面增加多个对比组件

复制 `index.html` 中完整的 `<section class="s32-example"> ... </section>`，替换两张图片路径、标签文字和 `aria-label` 即可。JavaScript 会自动识别全部 `[data-before-after]` 元素，各实例独立运行，无需增加新的 JS 文件或逐个初始化。

每个组件可以通过 `data-start="50"` 独立调整初始分割位置（0–100）。仅需确保页面已包含 `before-after.css` 和 `before-after.js`。

### 嵌入 WordPress / 其他网页

组件样式均限定在 `.s32` 下，避免污染现有页面。迁移时复制对应 HTML 区块、CSS、JS 和图片，并修正相对资源路径。外部页面如果已有 `body` 样式，可按需移除本示例 CSS 中的 `body { margin: 0; }`，以及 `.s32` 上用于完整演示页面的背景、内边距。

## 可访问性与兼容性

组件使用 `role="slider"`、键盘操作与 `aria-valuenow` / `aria-valuetext`，无需额外按钮即可操作。支持现代 Chrome、Edge、Firefox 和 Safari 的 Pointer Events、CSS `clip-path` 与 `aspect-ratio`。不承诺 IE11 等旧浏览器兼容。
