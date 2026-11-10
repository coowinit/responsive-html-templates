# Footer Quick Links — 网站底部快捷入口组件

响应式 HTML + CSS 组件，无第三方依赖、无 JavaScript。

- 电脑端四列卡片，手机端（≤767px）两列。
- 鼠标每次进入卡片，图标周围向外扩散**一次**光晕；停留不循环，离开再次进入可以重新播放。
- 触摸屏默认不播放 Hover 动画，键盘焦点清晰可见，支持减少动态效果偏好。
- 使用内联 SVG 图标，可离线使用。

## 文件

- `index.html`：完整独立预览页面。
- `css/footer-quick-links.css`：可复用组件样式，不包含全局 body 重置。

## 接入网站

复制 `index.html` 中的 `<section class="fql"> ... </section>` 到页面所需位置，并引入 CSS：

```html
<link rel="stylesheet" href="/path/to/footer-quick-links.css">
```

将四个示例 `href="#..."` 替换成真实页面地址。保留 `fql` 类名前缀，减少与 WordPress 主题或其他组件的 CSS 冲突。

## 自定义

- 颜色：修改 `.fql` 中的 `--fql-bg`、`--fql-line`、`--fql-icon-bg`、`--fql-halo` 等变量。
- 光晕范围：修改 `@keyframes fql-halo-pulse` 的 `scale(1.55)`。
- 动画时间：修改 `.65s`。
- 断点：默认 `767px`，可按实际项目调整。

**提示：** 演示页使用的 `html, body { margin: 0; }` 放在 `index.html` 的页面内样式中，不会随组件 CSS 影响其他页面。
