"use strict";
// HTML39: Swiper 11 nested galleries. Update records here; add/remove years and images freely.
const allMilestones = [
  {
    "year": "2017",
    "title": "WordPress 网站基础架构",
    "description": "规划内容类型、主题模板与导航体系，搭建清晰可维护的网站基础。",
    "images": [
      "2017-01.png",
      "2017-02.png"
    ]
  },
  {
    "year": "2018",
    "title": "响应式主题与移动端适配",
    "description": "通过 CSS Grid 与媒体查询优化桌面、平板及手机端的阅读体验。",
    "images": [
      "2018-01.png",
      "2018-02.png"
    ]
  },
  {
    "year": "2019",
    "title": "Gutenberg 区块编辑器",
    "description": "探索可复用区块与内容编辑规范，提升网站页面更新效率。",
    "images": [
      "2019-01.png"
    ]
  },
  {
    "year": "2020",
    "title": "WooCommerce 产品展示",
    "description": "搭建产品目录、分类结构与询盘入口，满足 B2B 企业网站需求。",
    "images": [
      "2020-01.png",
      "2020-02.png",
      "2020-03.png"
    ]
  },
  {
    "year": "2021",
    "title": "网站性能与核心体验指标",
    "description": "通过图片优化、缓存与脚本加载策略，持续改善用户体验。",
    "images": [
      "2021-01.png",
      "2021-02.png",
      "2021-03.png"
    ]
  },
  {
    "year": "2022",
    "title": "WordPress 全站编辑",
    "description": "统一模板、样式与页面组件，形成更易维护的网站设计系统。",
    "images": [
      "2022-01.png",
      "2022-02.png"
    ]
  },
  {
    "year": "2023",
    "title": "自定义内容与插件模块化",
    "description": "将字段、询盘及展示功能拆分为独立模块，降低维护成本。",
    "images": [
      "2023-01.png",
      "2023-02.png"
    ]
  },
  {
    "year": "2024",
    "title": "AI 辅助内容与网站运营",
    "description": "探索 AI 辅助编辑、内容检查与重复任务自动化，提升运营效率。",
    "images": [
      "2024-01.png",
      "2024-02.png"
    ]
  }
];
const queryCount = Number.parseInt(new URLSearchParams(location.search).get("count"), 10);
const milestones = Number.isInteger(queryCount) && queryCount >= 1 ? allMilestones.slice(0, queryCount) : allMilestones;
const container = document.getElementById("timeline-items");
const range = document.getElementById("year-range");
const yearSpan = document.getElementById("timeline-years");
const prev = document.getElementById("timeline-prev");
const next = document.getElementById("timeline-next");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const speed = reduceMotion ? 0 : 420;
const svgLeft = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5m7-7-7 7 7 7"/></svg>';
const svgRight = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>';
function createCard(item, index) {
  const slide = document.createElement("div"); slide.className = "swiper-slide";
  slide.dataset.year = item.year;
  const card = document.createElement("article"); card.className = "milestone-card";
  const gallery = document.createElement("div"); gallery.className = "swiper gallery-swiper";
  gallery.setAttribute("aria-label", `${item.year} 年图片轮播`);
  const imgWrap = document.createElement("div"); imgWrap.className = "swiper-wrapper";
  item.images.forEach((name, i) => {
    const s = document.createElement("div"); s.className = "swiper-slide";
    const img = document.createElement("img"); img.src = `assets/images/${name}`;
    img.alt = `${item.year} 年${item.title}，第 ${i + 1} 张图片`;
    img.width = 1200; img.height = 750; img.loading = index < 3 && i === 0 ? "eager" : "lazy";
    s.append(img); imgWrap.append(s);
  });
  const bPrev = document.createElement("button"); bPrev.type = "button"; bPrev.className = "gallery-arrow gallery-prev";
  bPrev.setAttribute("aria-label", `${item.year} 年上一张图片`); bPrev.innerHTML = svgLeft;
  const bNext = document.createElement("button"); bNext.type = "button"; bNext.className = "gallery-arrow gallery-next";
  bNext.setAttribute("aria-label", `${item.year} 年下一张图片`); bNext.innerHTML = svgRight;
  const dots = document.createElement("div"); dots.className = "gallery-pagination swiper-pagination";
  if (item.images.length <= 1) gallery.classList.add("is-single");
  gallery.append(imgWrap, bPrev, bNext, dots);
  const details = document.createElement("div"); details.className = "card-details";
  const meta = document.createElement("div"); meta.className = "card-meta";
  const year = document.createElement("span"); year.className = "card-year"; year.textContent = item.year;
  const rule = document.createElement("span"); rule.className = "card-rule"; rule.setAttribute("aria-hidden", "true");
  const tag = document.createElement("span"); tag.className = "card-tag"; tag.textContent = "里程碑";
  meta.append(year, rule, tag);
  const h = document.createElement("h2"); h.className = "card-title"; h.textContent = item.title;
  const p = document.createElement("p"); p.className = "card-description"; p.textContent = item.description;
  details.append(meta, h, p); card.append(gallery, details); slide.append(card);
  return slide;
}
milestones.forEach((item, index) => container.append(createCard(item, index)));
if (milestones.length) yearSpan.textContent = `${milestones[0].year} – ${milestones[milestones.length - 1].year}`;
if (typeof Swiper === "undefined") {
  document.getElementById("swiper-error").hidden = false;
  prev.disabled = next.disabled = true;
} else {
  // Each gallery is scoped to its own DOM nodes: arrows never move the outer timeline.
  document.querySelectorAll(".gallery-swiper").forEach((gallery) => {
    const total = gallery.querySelectorAll(".swiper-slide").length;
    new Swiper(gallery, {
      slidesPerView: 1, spaceBetween: 0, speed, nested: true,
      allowTouchMove: total > 1, watchOverflow: true,
      // Favor outer timeline swipe gestures; inner images use their own arrows/dots.
      // Inner galleries still support touch: nested:true stops propagation after an inner gesture is handled.
      touchStartPreventDefault: false,
      navigation: { prevEl: gallery.querySelector(".gallery-prev"), nextEl: gallery.querySelector(".gallery-next") },
      pagination: { el: gallery.querySelector(".gallery-pagination"), clickable: true, dynamicBullets: false },
      a11y: { enabled: true }
    });
    // Explicitly stop pointer/touch-start propagation on arrows, so outer drag cannot start on button presses.
    gallery.querySelectorAll(".gallery-arrow,.gallery-pagination").forEach(control => {
      control.addEventListener("pointerdown", e => e.stopPropagation());
      control.addEventListener("touchstart", e => e.stopPropagation(), { passive: true });
    });
  });
  const timeline = new Swiper(".timeline-swiper", {
    speed, watchOverflow: true, nested: true,
    slidesPerView: 1.2, spaceBetween: 16, slidesPerGroup: 1,
    navigation: { prevEl: prev, nextEl: next },
    scrollbar: { el: ".timeline-scrollbar", draggable: true, hide: false },
    breakpoints: {
      768: { slidesPerView: 2.25, spaceBetween: 20 },
      1200: { slidesPerView: 3.3, spaceBetween: 24 }
    },
    on: {
      init(swiper) { updateRange(swiper); },
      slideChange(swiper) { updateRange(swiper); },
      progress(swiper) { updateRange(swiper); },
      resize(swiper) { updateRange(swiper); }
    }
  });
  function updateRange(swiper) {
    if (!milestones.length) return;
    const first = Math.min(milestones.length - 1, Math.max(0, swiper.activeIndex || 0));
    const visible = Math.max(1, swiper.params.slidesPerView === 'auto' ? 1 : Math.ceil(Number(swiper.params.slidesPerView) || 1));
    const end = Math.min(milestones.length - 1, first + visible - 1);
    range.textContent = first === end ? milestones[first].year : `${milestones[first].year} ~ ${milestones[end].year}`;
  }
}
