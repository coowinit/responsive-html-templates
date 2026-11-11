# html31 - Hot Products Slider

响应式热门产品轮播示例，适用于建材、家居、板材、饰面材料等产品展示场景。

## 文件说明

```text
html31/
├── index.html
├── assets/
│   ├── css/
│   │   └── hot-products.css
│   └── js/
│       ├── hot-products.js
│       └── swiper-bundle.min.js
├── images/
│   ├── product-01.png
│   ├── product-02.png
│   ├── product-03.png
│   ├── icon-model.svg
│   └── icon-size.svg
└── README.md
```

## 特点

- 电脑端：左右分栏，大图展示，左右箭头切换
- 手机端：上下结构，支持手势滑动，底部分页圆点切换
- 资源本地化：Swiper 11.2.10 文件已本地化，无需 CDN，可以离线预览
- 独立作用域：使用 `.s31` 前缀，便于迁移到其他项目

## 使用建议

1. 替换 `images/` 中的占位图为正式产品图
2. 修改 `index.html` 中的标题、型号、尺寸、描述和链接
3. 若嵌入现有站点，优先整体复制该目录，避免路径错乱

## 备注

本示例中的产品图片为 `900x600` PNG 灰底图片图标占位图，仅用于布局演示。

- 图片在桌面和手机端使用 `object-fit: cover`，可能裁切边缘，换成正式图片时可微调 `object-position`。
- 演示按钮的 `href="#"` 不会跳转；正式上线请替换为真实产品详情 URL。
- 轮播交互使用本地 Swiper 11.2.10；`hot-products.js` 只负责初始化与按钮、分页圆点关联。

## 轮播技术说明

Swiper 11.2.10 已包含于 `assets/js/swiper-bundle.min.js` 并由页面相对路径加载。CSS 使用组件内必要的 Swiper 轨道布局规则，因此无需额外引用 Swiper CDN 样式。不要同时引入旧版 Swiper 或其它轮播脚本。
