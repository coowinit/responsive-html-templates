# html13 · 产品图片画廊（左侧缩略图）

这是一套可独立运行、可迁移的产品展示画廊示例，保留原版的本地 **Swiper 14.3.0**。电脑端缩略图位于左侧，移动端自动切换为底部横向缩略图。

## 功能

- 点击缩略图切换主图；主图支持手势滑动。
- 左侧缩略图轨道支持上下滚动和导航按钮；到达起点或终点时导航自动禁用。
- 点击主图或放大按钮进入 Lightbox：支持上一张、下一张、ESC 关闭、点击遮罩关闭、触摸滑动和键盘操作。
- 只有一张图片时自动隐藏缩略图轨道和无意义的预览导航。
- 支持同一页放置多个独立画廊实例（使用 `data-product-gallery` 标识）；每个实例分别初始化。
- 不依赖 CDN、后台、数据库或构建工具。

## 文件结构

```text
html13/
├── index.html
├── assets/
│   ├── css/components/product-gallery.css
│   ├── js/components/product-gallery.js
│   ├── images/*.svg
│   └── vendor/swiper/14.3.0/
│       ├── swiper-bundle.min.css
│       └── swiper-bundle.min.js
└── README.md
```

## 修改尺寸和样式

在 `assets/css/components/product-gallery.css` 中的 `.product-gallery` 修改：

```css
--pg-max-width: 786px; /* 组件宽度上限 */
--pg-main-size: 640px; /* 主图最大宽度 */
--pg-thumb-size: 86px; /* 缩略图大小 */
--pg-gap: 14px;        /* 主图与缩略图间距 */
--pg-radius: 12px;     /* 主图圆角 */
--pg-accent: #20323f; /* 选中边框颜色 */
```

主图默认 `object-fit: contain`，优先完整展示产品。希望场景照片铺满时，可将 `.pg-main .swiper-slide img` 的 `object-fit` 改为 `cover`。

## 替换图片、增减数量

编辑 `index.html` 中 `.pg-main .swiper-wrapper` 和 `.pg-thumbs .swiper-wrapper`：

1. 每一张主图对应一张缩略图，保持**相同顺序和数量**。
2. 修改对应的 `src`、`alt`、缩略图按钮 `aria-label`。
3. 可以删除或新增 `.swiper-slide`，无需为每张图编写新的 JavaScript。
4. 推荐使用已优化大小的本地图片，避免传入未经压缩的数十 MB 原图。

## 复用与维护

将整个 `assets` 目录及对应组件 HTML 复制到目标项目，确保路径正确。在 WordPress 中可由 PHP 循环输出成对的主图和缩略图。样式局限于 `.product-gallery`，Lightbox 使用 `.pg-lightbox` 独立命名，降低冲突风险。

此版本仅包含「左侧缩略图」布局；后续可以在其基础上另做「底部缩略图」独立案例，不建议在一个实例里引入复杂布局切换设置。


## 左侧缩略图完整显示规则

- 桌面端默认**最多完整显示 6 张**缩略图，固定 `86×86px`，间距 `8px`。
- 当图片有 7 张或更多时，第 7 张不会露出半张，使用上下箭头浏览。
- 只有 6 张时整齐显示 6 张，不出现半张裁切。
- 当桌面端主图随容器缩小时，`ResizeObserver` 自动调整 Swiper 的 `slidesPerView`（整数），避免内容溢出。
- 手机端采用主图下方的横向滑动模式，根据真实可用宽度决定完整展示的张数和缩略图尺寸。
- 调整尺寸请修改 `product-gallery.css` 中的 `--pg-thumb-size`、`--pg-thumb-gap`，所有尺寸均在 CSS 中设置，JavaScript 会自动读取，无需重复修改。

## Swiper 控制说明（精修版）

- 桌面端采用 `slidesPerView: 6`（空间不足时动态降为 5、4……）和 `spaceBetween: 8`，由 Swiper 控制轨道和导航。
- 左侧可见张数一定是整数，轨道高度与张数对应，确保末尾不露出半张。
- 手机端使用动态整数 `slidesPerView`，依据组件实际宽度完整排列 2～5 张缩略图，支持触摸滑动，不出现半张裁切。
- 修改 `--pg-thumb-size`、`--pg-thumb-gap`、`--pg-max-visible`、`--pg-nav-height` 时，JS 自动读取 CSS 变量。
- **注意**：当主图太矮，无法完整容纳 6 张 86px 缩略图与导航时，会自动减少数量。这比强行显示 6 张更稳定。
- 本方案不使用额外的缩略图滚动算法；只保留当前选中项的可见性同步。

## 左右底部对齐说明

桌面端左侧缩略图栏与右侧正方形主图保持等高；顶部向上按钮和底部向下按钮分别贴齐主图上下边缘。缩略图仍为固定 86×86px、间距 8px，不通过拉伸缩略图来填满剩余高度。多余空间只分配到导航与缩略图轨道之间，以确保 6 张完整显示且不会出现最后一张裁切。缩放窗口后由 Swiper 的整数 `slidesPerView` 同步可见张数。

### 导航间距微调

桌面主图为 640px 时，6 张 86px 缩略图、5 个 8px 缩略图间距、2 个 34px 导航按钮和上下各 8px 导航间距，总高度为 `6 × 86 + 5 × 8 + 2 × 34 + 2 × 8 = 640px`，从而让上下两个导航按钮与主图边缘保持对齐，且没有额外的空白。较窄桌面端由原有 Swiper 可见数量计算自适应；手机端保持横向布局。

## 手机端完整缩略图自适应（本次优化）

- 适配 320px、360px、375px、390px、414px、430px 及其他屏幕尺寸，不依赖指定机型断点。
- 使用容器实际宽度而不是整个屏幕宽度，适合带侧边距或嵌入 WordPress 栏目的页面。
- 以约 76px 为最小缩略图目标宽度，每行最多显示 5 张；按可用宽度与 8px 间距计算整数 `slidesPerView`。
- Swiper 自动等分缩略图宽度；缩略图保持正方形；行末不会出现半张图片。其余图片可通过横向滑动查看。
- `ResizeObserver` 在窗口或容器变化时更新数量和尺寸，手机、平板无需单独配置多个固定断点。
- 如果未来需要修改最小缩略图宽度，可调整 `product-gallery.js` 中的 `minSize` 值。
