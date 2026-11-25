(() => {
  'use strict';
  function initShowcase(root) {
    const slides = [...root.querySelectorAll('[data-slide]')];
    const thumbs = [...root.querySelectorAll('[data-index]')];
    const controls = root.querySelector('.showcase-controls');
    if (!slides.length || !controls || thumbs.length !== slides.length) return;
    let activeIndex = 0;
    function show(index, animate = true) {
      const next = (index + slides.length) % slides.length;
      if (animate && next === activeIndex) return;
      activeIndex = next;
      slides.forEach((slide, i) => {
        const active = i === next;
        slide.classList.toggle('is-active', active);
        slide.classList.remove('is-entering');
        slide.inert = !active;
        slide.setAttribute('aria-hidden', String(!active));
      });
      thumbs.forEach((thumb, i) => thumb.setAttribute('aria-pressed', String(i === next)));
      if (animate) slides[next].classList.add('is-entering');
      const thumb = thumbs[next];
      const rail = thumb.parentElement;
      if (thumb.offsetLeft < rail.offsetLeft + rail.scrollLeft || thumb.offsetLeft + thumb.offsetWidth > rail.offsetLeft + rail.scrollLeft + rail.clientWidth) {
        rail.scrollLeft = thumb.offsetLeft - rail.offsetLeft - 4;
      }
    }
    thumbs.forEach((thumb, i) => thumb.addEventListener('click', () => show(i)));
    root.querySelector('[data-prev]')?.addEventListener('click', () => show(activeIndex - 1));
    root.querySelector('[data-next]')?.addEventListener('click', () => show(activeIndex + 1));
    controls.addEventListener('keydown', event => {
      if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
      event.preventDefault();
      show(event.key === 'Home' ? 0 : event.key === 'End' ? slides.length - 1 : activeIndex + (event.key === 'ArrowRight' ? 1 : -1));
      if (event.target.closest('.showcase-thumbs')) thumbs[activeIndex].focus({preventScroll:true});
    });
    root.classList.add('is-ready');
    controls.hidden = false;
    show(0, false);
  }
  document.querySelectorAll('[data-showcase]').forEach(initShowcase);
})();
