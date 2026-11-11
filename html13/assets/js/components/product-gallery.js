/* Product Gallery — independent Swiper instances, thumbnail navigation and accessible Lightbox. */
(() => {
  'use strict';
  const prefersLessMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = window.matchMedia('(max-width: 767px)');
  if (typeof window.Swiper !== 'function') {
    console.warn('Product Gallery: local Swiper script not loaded.');
    return;
  }
  const svg = {
    left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>',
    right:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>',
    close:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  };

  document.querySelectorAll('[data-product-gallery]').forEach((root) => {
    if (root.dataset.pgReady) return;
    const mainElement = root.querySelector('.pg-main.swiper');
    const thumbsElement = root.querySelector('.pg-thumbs.swiper');
    const stageElement = root.querySelector('.pg-stage');
    const buttons = [...root.querySelectorAll('.pg-thumb')];
    const images = [...root.querySelectorAll('.pg-main .swiper-slide img')];
    if (!mainElement || !images.length) return;
    root.dataset.pgReady = 'true';
    const count = images.length;
    const speed = prefersLessMotion.matches ? 0 : 320;
    root.classList.toggle('pg-single', count === 1);

    // 缩略图的尺寸、间距和最大显示张数统一从 CSS 变量读取。
    // 桌面和手机端都使用整数 slidesPerView，避免露出半张。
    // 桌面按主图高度计算数量；手机按真实可用宽度计算数量和方形尺寸。
    function thumbnailSettings() {
      const style = getComputedStyle(root);
      const px = name => parseFloat(style.getPropertyValue(name)) || 0;
      const thumb = px('--pg-thumb-size') || 80;
      const gap = px('--pg-thumb-gap') || 8;
      const nav = px('--pg-nav-height') || 34;
      const max = Math.max(1, Math.floor(px('--pg-max-visible') || 6));
      const stageHeight = stageElement?.getBoundingClientRect().height || 0;
      const usable = Math.max(thumb, stageHeight - 2 * nav - 2 * gap);
      const visible = Math.max(1, Math.min(count, max,
        Math.floor((usable + gap + 0.001) / (thumb + gap))));
      if (mobile.matches) {
        // 整数张数，按实际容器宽度计算；每张等宽正方形，绝不露半张。
        // 以 76px 为最小目标尺寸（窄屏 320px 可放 3 张）。
        const rail = root.querySelector('.pg-rail');
        const width = rail?.clientWidth || stageElement?.clientWidth || 320;
        const minSize = 76;
        const mobileVisible = Math.max(1, Math.min(count, 5, Math.floor((width + gap) / (minSize + gap))));
        const size = Math.max(1, (width - (mobileVisible - 1) * gap) / mobileVisible);
        return { gap, visible: mobileVisible, size };
      }
      return { gap, visible };
    }

    let settings = thumbnailSettings();
    if (!mobile.matches) root.style.setProperty('--pg-visible', settings.visible);
    else root.style.setProperty('--pg-mobile-thumb-size', `${settings.size}px`);
    let thumbsSwiper = null;
    if (count > 1 && thumbsElement) {
      thumbsSwiper = new Swiper(thumbsElement, {
        direction: mobile.matches ? 'horizontal' : 'vertical',
        slidesPerView: settings.visible,
        spaceBetween: settings.gap,
        slidesPerGroup: 1,
        speed,
        watchOverflow: true,
        observer: false,
        navigation: {
          prevEl: root.querySelector('.pg-thumb-prev'),
          nextEl: root.querySelector('.pg-thumb-next'),
        },
      });
    }

    const updateSelection = (index) => {
      buttons.forEach((button, i) => {
        const active = i === index;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      if (!thumbsSwiper) return;
      // 无论横向还是纵向，始终按完整可见的整数张数移动轨道。
      const first = thumbsSwiper.activeIndex;
      const last = first + settings.visible - 1;
      if (index < first) thumbsSwiper.slideTo(index);
      else if (index > last) thumbsSwiper.slideTo(index - settings.visible + 1);
    };

    const mainSwiper = new Swiper(mainElement, {
      slidesPerView: 1, spaceBetween: 0, speed,
      allowTouchMove: count > 1, watchOverflow: true,
      a11y: { enabled:true, containerMessage:'Product photos' },
      on: { slideChange(swiper) { updateSelection(swiper.activeIndex); } },
    });
    buttons.forEach((button, index) => {
      button.addEventListener('click', () => mainSwiper.slideTo(index));
      button.addEventListener('keydown', (event) => {
        const forward = event.key === 'ArrowDown' || event.key === 'ArrowRight';
        const backward = event.key === 'ArrowUp' || event.key === 'ArrowLeft';
        if (!forward && !backward) return;
        event.preventDefault();
        const next = (index + (forward ? 1 : -1) + count) % count;
        mainSwiper.slideTo(next);
        buttons[next]?.focus({ preventScroll: true });
      });
    });
    const syncRail = () => {
      if (!thumbsSwiper) return;
      const next = thumbnailSettings();
      const direction = mobile.matches ? 'horizontal' : 'vertical';
      const desiredSlides = next.visible;
      const changed = thumbsSwiper.params.direction !== direction ||
        thumbsSwiper.params.slidesPerView !== desiredSlides ||
        settings.gap !== next.gap;
      settings = next;
      if (mobile.matches) root.style.setProperty('--pg-mobile-thumb-size', `${settings.size}px`);
      else root.style.setProperty('--pg-visible', settings.visible);
      // 即使整数可见张数未变，容器宽度变化仍需让 Swiper 重新计算每张宽度。
      if (!changed) {
        thumbsSwiper.update();
        return;
      }
      thumbsSwiper.params.slidesPerView = desiredSlides;
      thumbsSwiper.params.spaceBetween = settings.gap;
      if (thumbsSwiper.params.direction !== direction) {
        thumbsSwiper.changeDirection(direction, false);
      }
      thumbsSwiper.update();
      thumbsSwiper.slideTo(Math.min(thumbsSwiper.activeIndex, Math.max(0, count - settings.visible)), 0);
      updateSelection(mainSwiper.activeIndex);
    };
    mobile.addEventListener?.('change', syncRail);
    if (typeof ResizeObserver !== 'undefined' && stageElement) {
      new ResizeObserver(syncRail).observe(stageElement);
    } else {
      window.addEventListener('resize', syncRail, { passive: true });
    }
    updateSelection(0);

    // The overlay is outside the gallery to avoid stage overflow clipping.
    const overlay = document.createElement('div');
    overlay.className = 'pg-lightbox';
    overlay.hidden = true;
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Image preview');
    overlay.innerHTML = `
      <button class="pg-lightbox__close" type="button" aria-label="Close image preview">${svg.close}</button>
      <button class="pg-lightbox__nav pg-lightbox__prev" type="button" aria-label="Previous image">${svg.left}</button>
      <div class="pg-lightbox__content"><img class="pg-lightbox__image" alt=""></div>
      <button class="pg-lightbox__nav pg-lightbox__next" type="button" aria-label="Next image">${svg.right}</button>
      <div class="pg-lightbox__counter" aria-live="polite"></div>`;
    document.body.appendChild(overlay);
    const preview = overlay.querySelector('.pg-lightbox__image');
    const counter = overlay.querySelector('.pg-lightbox__counter');
    const closeButton = overlay.querySelector('.pg-lightbox__close');
    const prev = overlay.querySelector('.pg-lightbox__prev');
    const next = overlay.querySelector('.pg-lightbox__next');
    let lightboxIndex = 0;
    let restoreFocus = null;
    let previousOverflow = '';
    let startX = null;
    function show(index) {
      lightboxIndex = (index + count) % count;
      const source = images[lightboxIndex];
      preview.src = source.currentSrc || source.src;
      preview.alt = source.alt || 'Product image';
      counter.textContent = `${lightboxIndex + 1} / ${count}`;
      prev.hidden = next.hidden = count <= 1;
    }
    function open() {
      if (!overlay.hidden) return;
      restoreFocus = document.activeElement;
      previousOverflow = document.body.style.overflow;
      show(mainSwiper.activeIndex);
      overlay.hidden = false;
      document.body.style.overflow = 'hidden';
      closeButton.focus();
    }
    function close() {
      if (overlay.hidden) return;
      overlay.hidden = true;
      document.body.style.overflow = previousOverflow;
      restoreFocus?.focus?.({ preventScroll:true });
    }
    root.querySelector('.pg-zoom')?.addEventListener('click', open);
    images.forEach(img => {
      img.addEventListener('click', () => { if (!mainSwiper.allowClick) return; open(); });
    });
    closeButton.addEventListener('click', close);
    prev.addEventListener('click', () => show(lightboxIndex - 1));
    next.addEventListener('click', () => show(lightboxIndex + 1));
    overlay.addEventListener('click', (event) => { if (event.target === overlay || event.target.classList.contains('pg-lightbox__content')) close(); });
    overlay.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') { event.preventDefault(); close(); }
      else if (event.key === 'ArrowLeft' && count > 1) { event.preventDefault(); show(lightboxIndex - 1); }
      else if (event.key === 'ArrowRight' && count > 1) { event.preventDefault(); show(lightboxIndex + 1); }
      else if (event.key === 'Tab') {
        const focusables = [closeButton, ...(count > 1 ? [prev, next] : [])];
        const index = focusables.indexOf(document.activeElement);
        if (event.shiftKey && index <= 0) { event.preventDefault(); focusables[focusables.length-1].focus(); }
        else if (!event.shiftKey && index === focusables.length-1) { event.preventDefault(); focusables[0].focus(); }
      }
    });
    overlay.addEventListener('touchstart', event => { startX = event.touches[0].clientX; }, { passive:true });
    overlay.addEventListener('touchend', event => {
      if (startX == null || count < 2) return;
      const delta = event.changedTouches[0].clientX - startX;
      if (Math.abs(delta) >= 45) show(lightboxIndex + (delta < 0 ? 1 : -1));
      startX = null;
    }, { passive:true });
  });
})();
