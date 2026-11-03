# 🧩 Responsive HTML Templates

响应式 HTML 页面模板与前端交互案例合集，基于 HTML、CSS 和 JavaScript 构建，用于日常学习、效果预览、技术研究与项目复用。

**设计原则：简单、独立、响应式、易迁移。**

## 🌐 在线预览

- [打开模板导航首页（GitHub Pages）](https://coowinit.github.io/responsive-html-templates/)
- [查看仓库源代码](https://github.com/coowinit/responsive-html-templates)

所有案例由导航首页统一展示，无需在 README 中重复维护案例清单。GitHub Pages 需要在仓库的 **Settings → Pages** 中启用（部署源为 `main` 分支的 `/(root)` 目录）；未启用或部署期间，在线预览可能暂不可用。

## 📁 项目结构

```text
responsive-html-templates/
├── index.html              # 总预览首页（内嵌 CSS、JS）
├── README.md               # 通用项目说明
├── html01/                 # 独立案例
│   ├── index.html          # 案例入口
│   └── assets/             # 案例自己的静态资源（按需）
├── html02/                 # 独立案例
│   ├── index.html
│   ├── css/                # 可选
│   ├── js/                 # 可选
│   └── images/             # 可选
└── ...                     # 后续按 htmlNN 顺序扩展
```

- 根目录 `index.html` 仅负责案例导航：CSS 和 JavaScript 内嵌，无需构建工具。
- 每个 `htmlNN/` 目录都是可独立打开、复制和迁移的完整案例，资源存放在自身目录中。
- 资源目录按实际需要创建，不强制使用同一种组织形式，也不创建空目录。
- 编号仅表示案例目录，不用于描述功能；已有编号与路径尽量保持不变，避免旧链接失效。

## ➕ 如何新增案例

**第一步：** 新建 `htmlNN/` 目录，将案例所需 HTML、CSS、JS、图片等资源放入其中，入口统一为 `index.html`。请使用案例目录内的相对路径引用资源。

**第二步：** 编辑根目录 `index.html`，在 `const examples = [...]` 中增加一条数据：

```js
{
  title: "Example Title",
  description: "A short description of this example.",
  date: "YYYY-MM-DD",
  link: "./htmlNN/index.html"
}
```

其中 `date` 请替换为真实日期，例如 `2026-11-03`；`htmlNN` 请替换为实际案例编号。

**第三步：** 保存并预览。首页会自动生成卡片，展示标题、描述和底部日期，按日期从新到旧排列；点击案例标题将在新标签页打开页面。

**以后增加案例，只需新增独立目录并维护首页 JS 数组，无需修改本 README。**

## 🛠️ 开发与维护约定

- **独立运行**：优先使用原生 HTML、CSS、JavaScript；案例所需资源尽量本地保存，不依赖其他案例或首页。
- **响应式优先**：尽量兼容桌面、平板和手机，并测试常见屏幕宽度。
- **样式隔离**：自定义 CSS 尽量限定作用域，避免不同模块之间的样式冲突。
- **按需引入依赖**：需要第三方库时，应明确其用途与加载方式；避免为简单功能增加复杂框架。
- **迁移友好**：复制完整 `htmlNN/` 目录后，应能在独立环境中正常使用；涉及后台接口、表单提交或外部服务的案例，需要另行配置相关功能。
- **保持精简**：导航页专注展示，不预先引入数据库、后台管理或复杂的分类系统。
- **版本管理**：具体功能迭代与版本信息通过 Git Commit、Tags 和 Releases 追踪，README 不记录逐项更新历史。

## 📐 HTML / CSS 命名规范

页面与组件开发可参考独立维护的命名规范仓库：

**[HTML / CSS Scope Naming Guide](https://github.com/coowinit/html-css-naming-guide)**

该规范推荐采用 `s01`、`s02` 等 Scope Class，以及 `s01-title`、`s01-img` 等简短的局部类名，方便样式隔离、批量替换和跨项目迁移。

该仓库是**参考规范**，不是本项目的运行依赖。已有案例无需为了统一命名而强制重构。

## 📄 使用说明

本仓库主要用于学习、研究和复用。将案例用于正式项目之前，请自行检查响应式表现、浏览器兼容性、无障碍体验、资源授权，以及表单或接口的实际处理逻辑。
