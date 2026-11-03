# 🧩 Responsive HTML Templates

响应式 HTML 页面模板与前端交互案例合集，基于 HTML、CSS 和 JavaScript 构建，用于日常学习、效果预览、技术研究与项目复用。

**设计原则：简单、独立、响应式、易迁移。**

## 🌐 在线预览

- [打开模板导航首页（GitHub Pages）](https://coowinit.github.io/responsive-html-templates/)
- [查看仓库源代码](https://github.com/coowinit/responsive-html-templates)

所有案例由导航首页统一展示，无需在 README 中重复维护案例清单。GitHub Pages 需要在仓库的 **Settings → Pages** 中启用（部署源为 `main` 分支的 `/(root)` 目录）。

## 📁 项目结构

```text
responsive-html-templates/
├── index.html              # 总预览首页（内嵌 CSS、JS）
├── README.md               # 通用项目说明
├── html01/                 # 独立案例
│   ├── index.html
│   └── assets/             # 案例自身资源（按需）
├── html02/                 # 其他独立案例
│   ├── index.html
│   └── assets/             # 独立的样式、脚本、图片或库（按需）
└── ...                     # 后续按 htmlNN 顺序扩展
```

各案例目录互不依赖；资源放在所属案例目录。编号一经使用尽量保持稳定，防止旧链接失效。

## ➕ 如何新增案例

1. 新建 `htmlNN/` 目录，放入独立案例和其所需资源，入口文件统一为 `index.html`。
2. 打开根目录 `index.html`，在 `const examples = [...]` 数组添加一个对象：

   ```js
   {
     title: "Example Title",
     description: "A short description of this example.",
     date: "YYYY-MM-DD",
     link: "./htmlNN/index.html"
   }
   ```

3. 保存后首页自动展示标题、描述和底部日期，并按日期倒序排列；点击标题在新标签页打开。**无需同步维护 README 案例索引。**

## 🛠️ 开发与维护约定

- **独立运行**：优先使用原生 HTML、CSS、JavaScript；所需资源存放于对应案例目录。
- **响应式优先**：检查桌面与手机端，兼顾常见屏幕尺寸。
- **样式隔离**：自定义 CSS 优先使用局部作用域，避免跨组件污染。
- **按需引入依赖**：可使用 Swiper 等第三方库，但应将所需资源与示例一同保存；远程图像等外部依赖需要联网。
- **迁移友好**：直接复制完整 `htmlNN/` 目录即可迁移静态演示；涉及后端的功能需另外接入。
- **版本管理**：通过 Commits、Tags 和 Releases 追踪版本，本 README 不维护案例逐项更新历史。

## 📐 HTML / CSS 命名规范

参考 **[HTML / CSS Scope Naming Guide](https://github.com/coowinit/html-css-naming-guide)**，建议使用 `s01`、`s02` 等作用域类，以及 `s01-title`、`s01-img` 等短类名，方便样式隔离与批量迁移。

该指南是开发参考，不是运行依赖；已有案例不必强制重构。

## 📄 使用说明

案例主要用于学习与研究。投入生产前，应自行检查资源授权、浏览器兼容、无障碍性以及涉及表单或外部接口的真实处理逻辑。
