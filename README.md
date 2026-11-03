# 🧩 Responsive HTML Templates

响应式 HTML 页面模板与前端交互案例合集，基于 HTML、CSS 和 JavaScript 构建。每个案例独立运行，方便学习、预览和复制复用。

**当前版本：v0.1.0**（初始版本；用于准备发布的版本标识，发布 GitHub Release 后以对应 Tag 为准）

## 项目结构

```text
responsive-html-templates/
├── index.html             # 总预览首页（CSS、JS 均内嵌）
├── README.md              # 项目说明与案例索引
└── html01/                # 第一个独立案例：表单跳转与聚焦
    ├── index.html
    └── assets/            # 当前案例所需的本地图片
```

后续案例依次使用 `html02/`、`html03/` 等编号目录。每个案例按需在自己的目录下放置 `css/`、`js/`、`images/` 或 `assets/`，不要求创建空目录，也不共用其他案例的资源。

## 案例索引

| 编号 | 案例 | 功能 | 日期 | 预览 |
| --- | --- | --- | --- | --- |
| HTML01 | Form Focus on Navigation | 点击 Become a Dealer 跳转到申请表单，并聚焦第一个输入框 | 2026-11-03 | [打开案例](html01/index.html) |

## 新增案例

1. 新建 `html02/` 目录，并放入该案例完整的 HTML、CSS、JavaScript 和图片。入口建议统一为 `html02/index.html`，所有资源路径应指向该案例目录内部。
2. 打开根目录 `index.html`，找到 `<script>` 中的 `const examples = [...]`。在数组中添加一条：

   ```js
   {
     title: "Example Title",
     description: "A short description of this example.",
     date: "2026-11-04",
     link: "./html02/index.html"
   }
   ```

3. 保存即可。首页自动生成响应式卡片，**只展示标题、描述和最后一行日期**；点击标题进入对应案例。案例按日期从新到旧排列，日期相同时保留数组中的先后顺序。
4. 同步更新上方 README 案例索引。编号创建后不要随意更改，以免已有链接失效。

## 使用与维护原则

- **首页单文件**：根目录 `index.html` 内嵌 CSS 和 JS；无需构建工具、外部框架或额外数据文件。
- **数据驱动**：以后只需修改首页 `examples` 数组的 `title`、`description`、`date`、`link` 四个字段，无需复制卡片 HTML。
- **案例独立**：每个 `htmlNN/` 是可单独打开、打包和迁移的案例；不依赖根目录首页或其他案例的 CSS、JS、图片。
- **响应式优先**：案例尽量同时适配电脑和手机；首页默认大屏三列、中屏两列、小屏一列。
- **保持轻量**：暂不增加搜索、分类、截图、后台或数据库；未来确有需要再扩展。
- **预览方式**：直接用浏览器打开根目录 `index.html`，或使用 GitHub Pages 部署。首页卡片由 JavaScript 渲染，需要浏览器启用 JS。
- **外部依赖**：新增案例若使用 CDN 或第三方库，应在案例中明确标注；优先考虑可离线迁移的本地资源。

## 版本记录

### v0.1.0 — Initial Release（2026-11-03）

- 建立响应式 HTML 模板案例库和单文件预览首页。
- 使用 JavaScript 数组集中维护案例标题、描述、日期及链接，并自动生成卡片。
- 首次收录 `html01`：Become a Dealer 表单跳转并聚焦首个输入框。

> 注：`html01` 是前端交互演示，表单提交不包含真实后端处理，不能直接作为生产环境收集数据的完整表单系统。
