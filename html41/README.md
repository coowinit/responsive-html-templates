# 3D SVG Animated Responsive 404 Page

在 html40 静态页面基础上新增独立入场动画。纯 HTML、CSS 与内联 SVG，无 JavaScript 或第三方依赖。

- 三个数字由独立嵌套 SVG 组成，外层 viewBox 保证整体等比例缩放。
- 左右数字从两侧向中间靠拢，中间数字从下向上淡入。
- 动画仅在页面加载时播放一次；刷新可重播。
- 动画时长 850ms，中间数字延迟 120ms，位移 48 个 SVG 用户坐标单位。
- 在 assets/css/style.css 的 :root 中统一修改配色、尺寸与动画参数。
- 尊重 prefers-reduced-motion 系统设置；减少动画模式下直接显示静态图形。
- 返回按钮指向仓库预览首页；正式部署时按实际首页路径调整并确保 HTTP 404 状态。
- SVG 路径沿用 html40（用户提供的 Atomik 商业主题参考代码），公开再分发或生产复用前请确认授权。

打开 index.html 即可预览。
