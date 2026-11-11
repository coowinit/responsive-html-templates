# html35 — 响应式企业简介双图叠加组件

适用于企业简介、产品系列介绍、品牌优势、建筑材料与解决方案展示。采用纯 HTML + CSS，无 JavaScript 和第三方依赖。

## 布局

- 桌面（大于 900px）：左侧双图叠加，右侧标题、描述、两列优势列表及按钮。
- 平板及手机（900px 及以下）：文字内容在上，图片在下，双图仍然显示。
- 手机（600px 及以下）：优势列表改为单列，图片自动适配容器，避免水平溢出。

## 目录

```text
html35/
├── index.html
├── assets/css/company-intro.css
├── images/decking-scene.svg
├── images/interior-scene.svg
└── README.md
```

## 使用和修改

1. 编辑 `index.html`，替换企业介绍、六项优势和按钮链接。
2. 替换 `images/` 目录中的两张图片，并更新 `<img src>`，推荐保持图像内容有合理的裁切空间。
3. 在 `company-intro.css` 的 `.s35` 变量中调整 `--s35-max-width`（整体最大宽度，默认 1320px）、`--s35-gap`（图文间距）、`--s35-accent`（主题紫色）以及图片比例。
4. 样式使用 `.s35` 作用域，复制到 WordPress 时可只复制该 Section 并按实际项目更换图片路径。

演示图为本地 SVG 场景占位图，文案仅用于布局展示。按钮默认链接到本页标题以避免虚构的外部页面，实际使用时请替换为真实链接。
