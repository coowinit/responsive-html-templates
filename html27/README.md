# WEM Inquiry Cart · HTML 组件示例（v3）

**用途：** 保存和复用产品询盘购物车的前端布局。包含加入购物车按钮、成功反馈、产品列表及右侧悬浮图标。

**边界：** 这是可离线打开的 **HTML/CSS/JS 交互演示**，不是 WordPress 插件，不会发送邮件，不含真实询盘表单。`cart-demo.js` 使用 `sessionStorage` 模拟购物车，**正式网站不能直接用它处理询盘数据**。

## 30 秒快速预览

1. 解压 ZIP，双击根目录 `index.html`。
2. 点击紫色 **Add to Cart**：按钮短暂变绿，角标数字增加。
3. 在 **Your Cart** 中测试数量更新、删除、空购物车，点击悬浮图标可定位购物车区域。
4. `href="#"` 是占位链接；当前演示会阻止其默认跳转，正式使用时必须替换成产品地址。

## 文件与用途

| 路径 | 作用 | 生产环境直接复制？ |
| --- | --- | --- |
| `assets/css/cart-components.css` | 组件专用、响应式样式 | **是** |
| `assets/icons/cart-add.svg` | 添加按钮图标 | **是** |
| `assets/icons/cart-added.svg` | 已添加状态图标 | **是** |
| `assets/icons/cart-floating.svg` | 悬浮购物车图标 | **是** |
| `components/add-button.html` | 单个添加按钮 HTML 参考 | **可复制后改数据** |
| `components/product-card.html` | 产品卡片 HTML 参考 | **可复制后改数据** |
| `components/cart-list.html` | 购物车清单 HTML 参考 | **可复制后改数据** |
| `components/floating-cart.html` | 悬浮按钮 HTML 参考 | **可复制后改路径** |
| `assets/css/demo.css` | 演示页基础布局、表单占位 | **否** |
| `assets/js/cart-demo.js` | 浏览器本地演示逻辑 | **否：WP 版须重写数据交互** |
| `assets/images/*.svg` | 产品图片占位 | 否，替换为真实产品图片 |
| `index.html` | 完整可操作预览页 | 否，可做视觉参考 |

## WordPress / 现有网站如何复用（推荐）

1. 将 `cart-components.css` 放入插件的 `assets/css/` 并通过 `wp_enqueue_style()` 加载；**不要加载 `demo.css`**。
2. 复制实际需要的 `components/*.html` 结构，由插件 PHP 输出对应商品 ID、名称、图片、永久链接和数量。
3. 保留 `.wic-cart-ui` 根容器。**如果按钮、购物车列表、悬浮按钮分散在不同位置，每处分别包一层**：

```html
<div class="wic-cart-ui">
  <!-- paste a component fragment here -->
</div>
```

4. 将三个图标 SVG 放入可访问的 `assets/icons/`，更新 HTML 的 `src` 路径。**注意：`src="assets/icons/..."` 只适合本地根目录预览，不适合直接粘贴到 WordPress 子页面。** 应当用插件 URL 生成完整路径。
5. 将 `href="#"` 替换为每件产品的真实永久链接；图片和产品名称应链接到**同一个产品**。
6. 用 WordPress AJAX / 服务端购物车替换 `cart-demo.js`：服务器验证产品 ID 和数量，更新后返回新数量与状态。不要依赖前端 `sessionStorage` 作为真实数据来源。
7. 现有客户联系表单继续由各站点自行处理。插件负责提供购物车产品清单接口，不接管字段和邮件发送。

## CSS 隔离和主题兼容

- 可复用样式限定在 `.wic-cart-ui`，组件内部采用 `wic-` 前缀；颜色变量也限定在容器内。
- v3 将通用 `button`、`input` 字体设置进一步收窄到购物车控件；不会为了购物车而整体重置主题按钮。
- **不能承诺与所有 WordPress 主题完全无冲突**：主题已有的高优先级选择器、`!important`、字体继承和缓存仍需在目标站测试。
- 组件采用固定位置的悬浮按钮，需检查是否与站点的返回顶部、聊天窗、Cookie 提示重叠。
- 更换颜色可修改 `--wic-brand`、`--wic-success` 等变量；更换图标可直接替换 SVG 文件，注意保持名称或更新路径。
- `cart-components.css` 的产品卡片属于可选组件。如果已有网站的产品卡片不想换样式，只复制 `add-button.html` 和必要的图标、CSS 即可。

## 上线前检查清单

- [ ] 确认所有 `#` 产品链接已换成真实地址。
- [ ] 手机端 375px / 768px 与桌面端显示正常，不卡边、不横向溢出。
- [ ] 按钮成功状态、重复添加、数量变更、删除、空购物车正确。
- [ ] 各位置 SVG 正常显示，路径不依赖当前页面目录。
- [ ] 未在生产网站加载 `demo.css` 和 `cart-demo.js`。
- [ ] 实际 WordPress AJAX 数据与当前访客对应；缓存环境不共享购物车状态。
- [ ] 购物车与原网站表单能独立工作，提交失败后仍保留购物车数据。

## 后续插件化

未来插件依旧推荐三个短代码：`[add_to_cart]`、`[cart]`、`[mini_cart]`。该仓库只保留前端 UI 作为长期参考，不在这里增加 WooCommerce、支付、订单和邮件表单功能。
