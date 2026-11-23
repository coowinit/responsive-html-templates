"use strict";
// All content is maintained in one data array. Add/remove records without changing layout code.
const allMilestones = [
  {
    "year": "2017",
    "title": "WordPress 网站基础架构",
    "description": "确立内容类型、主题模板与导航体系，构建便于维护的企业网站基础。",
    "images": [
      "2017-01.png",
      "2017-02.png"
    ]
  },
  {
    "year": "2018",
    "title": "响应式主题与移动端适配",
    "description": "使用 CSS Grid 与媒体查询优化内容呈现，兼顾桌面与移动设备体验。",
    "images": [
      "2018-01.png",
      "2018-02.png"
    ]
  },
  {
    "year": "2019",
    "title": "Gutenberg 区块编辑器",
    "description": "探索可复用内容区块与编辑规范，让日常页面更新更加直观。",
    "images": [
      "2019-01.png"
    ]
  },
  {
    "year": "2020",
    "title": "WooCommerce 产品展示",
    "description": "规划产品目录、分类层级及询盘路径，满足企业产品展示需求。",
    "images": [
      "2020-01.png",
      "2020-02.png"
    ]
  },
  {
    "year": "2021",
    "title": "网站性能与核心体验指标",
    "description": "通过图像优化、缓存与脚本加载策略持续提升页面体验。",
    "images": [
      "2021-01.png",
      "2021-02.png",
      "2021-03.png"
    ]
  },
  {
    "year": "2022",
    "title": "WordPress 全站编辑",
    "description": "梳理模板与全站样式的可视化管理思路，提高设计一致性。",
    "images": [
      "2022-01.png",
      "2022-02.png"
    ]
  },
  {
    "year": "2023",
    "title": "自定义内容与插件模块化",
    "description": "将常用字段、询盘和展示功能拆分为可维护的独立模块。",
    "images": [
      "2023-01.png",
      "2023-02.png"
    ]
  },
  {
    "year": "2024",
    "title": "AI 辅助内容与网站运营",
    "description": "探索 AI 辅助编辑、内容检查和重复性运维任务，提高工作效率。",
    "images": [
      "2024-01.png",
      "2024-02.png"
    ]
  }
];
const query = new URLSearchParams(location.search);
// Preview helper: ?count=1, ?count=2, ?count=3, ?count=8. Without a query, show all entries.
const requested = Number.parseInt(query.get("count"),10);
const milestones = Number.isInteger(requested) && requested >= 1
    ? allMilestones.slice(0, requested)
    : allMilestones;
const track = document.getElementById("timeline-track");
const prev = document.getElementById("timeline-prev");
const next = document.getElementById("timeline-next");
const range = document.getElementById("year-range");
const progress = document.getElementById("timeline-progress");
const thumb = document.getElementById("timeline-progress-thumb");
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
const scrollBehavior = () => reduceMotion.matches ? "instant" : "smooth";

function createCard(item,index){
  const wrapper=document.createElement("div");wrapper.className="timeline-item";
  wrapper.dataset.year=item.year;
  const article=document.createElement("article");article.className="milestone-card";
  const gallery=document.createElement("div");gallery.className="gallery";
  gallery.setAttribute("aria-label",`${item.year} 年图片画廊`);
  const galleryTrack=document.createElement("div");galleryTrack.className="gallery-track";
  const dots=document.createElement("div");dots.className="gallery-dots";
  item.images.forEach((src,i)=>{
    const slide=document.createElement("div");slide.className="gallery-slide";
    const img=document.createElement("img");img.src=`assets/images/${src}`;
    img.alt=`${item.year} 年 ${item.title} · 图片 ${i+1}`;img.width=1200;img.height=750;
    img.loading=index<3 && i===0?"eager":"lazy";
    slide.append(img);galleryTrack.append(slide);
    const dot=document.createElement("button");dot.type="button";
    dot.className=`gallery-dot${i===0?" is-active":""}`;
    dot.setAttribute("aria-label",`查看 ${item.year} 年第 ${i+1} 张图片`);
    dot.setAttribute("aria-pressed",String(i===0));
    dot.addEventListener("click",()=>galleryTrack.scrollTo({left:i*galleryTrack.clientWidth,behavior:scrollBehavior()}));
    dots.append(dot);
  });
  if(item.images.length<=1)dots.hidden=true;
  galleryTrack.addEventListener("scroll",()=>{
    const i=Math.min(item.images.length-1,Math.round(galleryTrack.scrollLeft/Math.max(galleryTrack.clientWidth,1)));
    [...dots.children].forEach((dot,j)=>{
      dot.classList.toggle("is-active",i===j);
      dot.setAttribute("aria-pressed",String(i===j));
    });
  },{passive:true});
  gallery.append(galleryTrack,dots);
  const details=document.createElement("div");details.className="card-details";
  const meta=document.createElement("div");meta.className="card-meta";
  const year=document.createElement("span");year.className="card-year";year.textContent=item.year;
  const line=document.createElement("span");line.className="card-rule";line.setAttribute("aria-hidden","true");
  const tag=document.createElement("span");tag.className="card-tag";tag.textContent="里程碑";
  meta.append(year,line,tag);
  const heading=document.createElement("h2");heading.className="card-title";heading.textContent=item.title;
  const description=document.createElement("p");description.className="card-description";description.textContent=item.description;
  details.append(meta,heading,description);article.append(gallery,details);wrapper.append(article);
  return wrapper;
}
milestones.forEach((item,index)=>track.append(createCard(item,index)));
const cards=[...track.children];
let ticking=false;
function getMetrics(){
  const first=cards[0];
  const step=cards.length>1?cards[1].offsetLeft-first.offsetLeft:first.offsetWidth;
  const total=Math.max(0,track.scrollWidth-track.clientWidth);
  return {step:Math.max(1,step),total};
}
function update(){
  if(!cards.length)return;
  const {step,total}=getMetrics();
  const start=Math.min(cards.length-1,Math.max(0,Math.round(track.scrollLeft/step)));
  // Desktop: 3 fully visible cards; mobile: first card and partially visible next card.
  const visibleCount=Math.max(1,Math.floor((track.clientWidth + 1)/(cards[0].offsetWidth + parseFloat(getComputedStyle(track).gap||0))));
  const end=Math.min(cards.length-1,start+Math.max(1,visibleCount)-1+(visibleCount===1&&cards.length>1?1:0));
  range.textContent=start===end?cards[start].dataset.year:`${cards[start].dataset.year} ~ ${cards[end].dataset.year}`;
  prev.disabled=start===0 || total<2;
  next.disabled=track.scrollLeft>=total-2 || total<2;
  // The thumb represents the currently visible fraction and moves along the entire track.
  const fraction=Math.min(1,track.clientWidth/Math.max(track.scrollWidth,1));
  const width=Math.max(8,fraction*100);
  const ratio=total>0?Math.min(1,Math.max(0,track.scrollLeft/total)):0;
  thumb.style.width=`${width}%`;
  thumb.style.left=`${ratio*(100-width)}%`;
  thumb.style.transform="none";
  const percentage=Math.round(ratio*100);
  progress.setAttribute("aria-valuenow",String(percentage));
  progress.setAttribute("aria-valuetext",`${percentage}%`);
}
function scheduleUpdate(){if(!ticking){ticking=true;requestAnimationFrame(()=>{ticking=false;update()})}}
track.addEventListener("scroll",scheduleUpdate,{passive:true});
window.addEventListener("resize",scheduleUpdate,{passive:true});
function move(direction){
  const {step}=getMetrics();
  const current=Math.round(track.scrollLeft/step);
  track.scrollTo({left:(current+direction)*step,behavior:scrollBehavior()});
}
prev.addEventListener("click",()=>move(-1));next.addEventListener("click",()=>move(1));
track.addEventListener("keydown",event=>{
  if(event.target!==track)return;
  if(event.key==="ArrowRight"){event.preventDefault();move(1)}
  else if(event.key==="ArrowLeft"){event.preventDefault();move(-1)}
});
update();
window.addEventListener("load",update,{once:true});
