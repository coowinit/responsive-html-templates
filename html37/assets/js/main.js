(() => {
  'use strict';
  const root = document.querySelector('.cases');
  if (!root) return;
  const allSlides = [...root.querySelectorAll('.case-slide')];
  const allTabs = [...root.querySelectorAll('.logo-tab')];
  const count = root.querySelector('#case-count');
  const stage = root.querySelector('.case-stage');
  const nav = root.querySelector('.logo-track');
  const prev = root.querySelector('#case-prev');
  const next = root.querySelector('#case-next');

  // Demo scenarios: ?count=2, ?count=6 (default), ?count=7.
  // In production, remove this demo filter; the module automatically uses the actual number of matched slides/tabs.
  const requested = new URLSearchParams(location.search).get('count');
  const demoCount = ['2','6','7'].includes(requested) ? Number(requested) : 6;
  allSlides.forEach((slide, i) => { if (i >= demoCount) slide.remove(); });
  allTabs.forEach((tab, i) => { if (i >= demoCount) tab.remove(); });

  const slides = [...root.querySelectorAll('.case-slide')];
  const tabs = [...root.querySelectorAll('.logo-tab')];
  const total = Math.min(slides.length, tabs.length);
  if (!total) return;
  nav.style.setProperty('--visible-count', Math.min(total, 7));
  nav.dataset.navigation = total <= 2 ? 'short' : total >= 7 ? 'many' : 'normal';
  slides.forEach((slide, i) => slide.setAttribute('aria-label', `${i + 1} / ${total}`));
  const hasMultiple = total > 1;
  prev.hidden = next.hidden = !hasMultiple;
  let active = 0;

  function goTo(index, focusTab = false) {
    const selectedIndex = (index + total) % total;
    slides.forEach((slide, i) => {
      const selected = i === selectedIndex;
      slide.classList.toggle('is-active', selected);
      slide.setAttribute('aria-hidden', String(!selected));
      slide.inert = !selected;
    });
    tabs.forEach((tab, i) => {
      const selected = i === selectedIndex;
      tab.classList.toggle('is-active', selected);
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    active = selectedIndex;
    count.textContent = `${String(active + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
    const tab = tabs[active];
    // Only scroll when necessary: do not jitter on a fully visible desktop strip.
    const leftEdge = tab.offsetLeft - nav.offsetLeft;
    const rightEdge = leftEdge + tab.offsetWidth;
    const target = leftEdge < nav.scrollLeft ? leftEdge : rightEdge > nav.scrollLeft + nav.clientWidth ? rightEdge - nav.clientWidth : nav.scrollLeft;
    nav.scrollTo({left: Math.max(0, target), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
    if (focusTab) tab.focus({preventScroll: true});
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => goTo(index));
    tab.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        goTo(active + (event.key === 'ArrowRight' ? 1 : -1), true);
      } else if (event.key === 'Home' || event.key === 'End') {
        event.preventDefault();
        goTo(event.key === 'Home' ? 0 : total - 1, true);
      }
    });
  });
  prev.addEventListener('click', () => goTo(active - 1));
  next.addEventListener('click', () => goTo(active + 1));
  let startX = null;
  stage.addEventListener('touchstart', event => { startX = event.touches[0].clientX; }, {passive:true});
  stage.addEventListener('touchend', event => {
    if (startX === null || !event.changedTouches.length) return;
    const distance = event.changedTouches[0].clientX - startX;
    if (Math.abs(distance) > 55 && hasMultiple) goTo(active + (distance < 0 ? 1 : -1));
    startX = null;
  }, {passive:true});
  goTo(0);
})();
