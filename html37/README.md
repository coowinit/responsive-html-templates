# WordPress 技术案例卡片 · 响应式 HTML 原型（优化版）

直接打开 `index.html` 即可预览。无需联网，无需构建。

## 数量适配测试

- `index.html?count=2`：2 个案例，桌面端 Logo 不被过度拉伸。
- `index.html` 或 `index.html?count=6`：默认 6 个案例。
- `index.html?count=7`：7 个案例，自动压缩 Logo 卡片宽度；手机端依旧横向滑动。

## 文件

- `assets/images/01.png` 到 `07.png`：灰底 + 图标 + 数字编号，占位图。
- `assets/images/LOGO01.svg` 到 `LOGO07.svg`：Logo 占位图。
- `assets/css/style.css`：响应式布局、短圆角选中指示条、数量适配。
- `assets/js/main.js`：案例切换、键盘控制、移动端滑动、数量适配。

## 上线建议

正式使用时按实际数量增删对应的 `.case-slide` 与 `.logo-tab`（两者顺序一致），然后移除 `main.js` 中 `demoCount` 和删除多余节点的演示代码。保留之后的自动计数、宽度适配和切换逻辑。当前 `?count=` 仅用于本地快速验收。

本版修复选中状态蓝线与圆角边框贴得太近的问题：指示条向内缩进 5px，宽度为卡片的 44%，并使用全圆角。
