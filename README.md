# 🧩 Responsive HTML Templates

响应式 HTML 页面模板与前端交互案例合集，基于 HTML、CSS 和 JavaScript 构建，用于学习研究、效果预览与实际项目复用。

**核心原则：简单、独立、响应式、易迁移。**

## 🌐 在线预览

- **[打开模板预览首页](https://coowinit.github.io/responsive-html-templates/)**
- [查看 GitHub 仓库](https://github.com/coowinit/responsive-html-templates)

案例由预览首页统一展示，不在 README 中重复维护清单。点击首页的案例标题，会在新标签页打开对应的演示页面。

> GitHub 仓库中的 `index.html` 文件链接用于**查看源码**；如需浏览器直接渲染 HTML，请使用 GitHub Pages。若预览暂不可用，请检查仓库 `Settings → Pages` 是否设置为从 `main` 分支的 `/(root)` 目录部署。

## 📁 目录结构

```text
responsive-html-templates/
├── index.html          # 预览导航首页（CSS、JS 内嵌）
├── README.md           # 通用项目说明
├── html01/
│   ├── index.html      # 独立案例入口
│   └── assets/         # 案例资源（示意）
├── html02/
│   ├── index.html
│   └── ...             # 按需存放 CSS、JS、图片等
└── htmlNN/             # 后续案例依次编号
```

- **首页统一导航**：根目录 `index.html` 负责展示案例卡片，不依赖构建工具和数据库。
- **案例独立保存**：每个 `htmlNN/` 目录包含自己的页面与所需资源，可整体复制、迁移。
- **资源按需组织**：每个案例可使用 `css/`、`js/`、`images/`、`assets/` 等目录，不强制统一，也不需要创建空目录。
- **编号保持稳定**：已有目录尽量不改名，避免 GitHub Pages 和外部引用链接失效。

## ➕ 新增案例

**1. 新建案例目录**

按顺序创建 `htmlNN/`，将完整页面及资源放入其中，入口使用 `index.html`。优先使用相对路径引用本案例内的文件。

**2. 更新首页数组**

编辑根目录 `index.html` 中的 `const examples = [...]`，添加一条数据：

```js
{
  title: "Example Title",
  description: "A short description of this example.",
  date: "2026-11-03",
  link: "./htmlNN/index.html"
}
```

其中 `date` 使用 `YYYY-MM-DD` 日期格式，`link` 指向真实存在的案例页面。首页会自动生成卡片，显示标题、描述和底部日期，并按日期倒序排列；相同日期按数组中的原有顺序显示。

**3. 检查预览**

提交前确认：案例能独立打开、CSS/JS/图片路径正确、桌面和手机布局正常、首页卡片能够在新标签页进入对应案例。提交到 `main` 后，再通过 GitHub Pages 检查线上效果。

**日常新增案例只需增加目录并更新首页 JS 数组，无需修改 README。**

## 🛠️ 开发与维护原则

- **保持轻量**：优先采用原生 HTML、CSS、JavaScript；不为了管理案例而引入后台、数据库或复杂框架。
- **响应式设计**：兼顾桌面、平板和手机端，确保不同尺寸下内容可用。
- **避免样式冲突**：自定义 CSS 尽量采用局部作用域，方便日后迁移到其他网站或 WordPress 主题。
- **尽量本地化资源**：必要的图片、CSS、JS 和第三方库尽量与案例一同保存；远程图片或 CDN 资源可能需要联网。
- **明确演示边界**：涉及表单提交、外部 API、后台处理或其他服务时，示例前端不代表具备完整生产功能。
- **版本管理**：具体改动通过 Commit、Tags 和 Releases 记录；README 保持通用，不维护案例数量或版本更新流水账。

## 📐 HTML / CSS 命名规范

制作和迁移页面时，可参考配套研究仓库：

**[HTML / CSS Scope Naming Guide](https://github.com/coowinit/html-css-naming-guide)**

其中推荐使用 `s01`、`s02` 等 Scope Class 和 `s01-title`、`s01-img` 等简短局部类名，让样式更容易隔离、维护和批量替换。

该规范用于**开发参考**，不是运行依赖；已有案例不需要为了统一命名而强制重构。

## 📄 使用说明

本项目主要用于学习、研究和复用。将示例投入正式项目之前，请自行确认浏览器兼容性、无障碍体验、资源授权、外部依赖及后台功能的适配情况。
