# html39 — Swiper 企业里程碑 + 卡片内图片轮播

在 `html38` 视觉设计基础上制作的 **Swiper 11.2.10 版本**。`html38` 保持原生 JavaScript + CSS Scroll Snap 实现，`html39` 独立存在。

## 功能

- 外层 Swiper：按年份排列卡片；左右箭头、动态年份范围、可拖动进度条同步。
- 内层 Swiper：每张卡片独立图片轮播；增加**左右箭头**和底部分页圆点，箭头仅作用于当前卡片。
- 自适应：桌面约 3.3 张、平板约 2.25 张、手机约 1.2 张，显示下一张卡片的一部分。
- 单图卡片自动隐藏内层箭头及圆点；外层数量不足时 `watchOverflow` 停止无意义滚动。
- 使用灰色背景 + 图片 ICON + `YYYY-NN` 编号 PNG 占位图；支持各年份图片数量不同。

## 预览与维护

默认 8 张卡片；可使用 `index.html?count=1`、`?count=2`、`?count=3`、`?count=7` 测试数量边界。正式维护请直接增删 `assets/js/main.js` 的 `allMilestones` 条目或各条目的 `images` 数组；`count` 仅用于演示测试。

**注意：本版使用在线 CDN 引入 Swiper 11.2.10，需要联网。** 引用地址：`https://cdn.jsdelivr.net/npm/swiper@11.2.10/swiper-bundle.min.css` 和对应的 `.js`。如果需要完全离线，可从该固定版本的官方包下载 CSS/JS 至 `assets/vendor/` 后修改 `index.html` 引用路径。

## 结构

```text
html39/
├── index.html
├── README.md
└── assets/
    ├── css/style.css
    ├── js/main.js
    └── images/YYYY-NN.png
```

## 交互设计说明

外层和内层都是水平方向的 Swiper。`nested: true` 可改善嵌套手势，但不同设备上的滑动接管仍可能有差异；当用户希望明确切换卡片内部图片时，优先使用每张卡片的箭头或圆点。箭头在首尾自动禁用，不使用 `loop`，避免少量图片时产生克隆问题。

该页面的年份仅用于 WordPress 技术主题示例，并不代表对应功能的首次发布日期。
