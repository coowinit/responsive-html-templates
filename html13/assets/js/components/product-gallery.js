/* Product Gallery v0.4 — Swiper 14.3.0 thumbnail/main coordination.
 * Source-agnostic: CPT and WooCommerce supply rendered slide/thumbnail HTML.
 * One main Swiper, one thumbnail Swiper, synchronized via activeIndex.
 */
(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  document.querySelectorAll('[data-product-gallery]').forEach((root) => {
    if (root.dataset.pgReady === 'true' || typeof window.Swiper !== 'function') return;

    const mainElement = root.querySelector('.pg-main.swiper');
    const thumbsElement = root.querySelector('.pg-thumbs.swiper');
    const thumbnails = [...root.querySelectorAll('.pg-thumb')];
    const slides = [...root.querySelectorAll('.pg-main .swiper-slide')];
    if (!mainElement || !thumbsElement || !slides.length) return;

    root.dataset.pgReady = 'true';
    const count = slides.length;
    const narrow = window.matchMedia('(max-width: 767px)');

    const thumbsSwiper = new Swiper(thumbsElement, {
      direction: narrow.matches ? 'horizontal' : 'vertical',
      slidesPerView: 'auto',
      slidesPerGroup: 1,
      spaceBetween: narrow.matches ? 8 : 6,
      speed: reducedMotion.matches ? 0 : 300,
      watchOverflow: true,
      navigation: {
        prevEl: root.querySelector('.pg-thumb-prev'),
        nextEl: root.querySelector('.pg-thumb-next'),
      },
    });

    function syncGallery(index) {
      thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('is-active', i === index);
        thumb.setAttribute('aria-pressed', String(i === index));
      });
      thumbsSwiper.slideTo(index, reducedMotion.matches ? 0 : 250);
    }

    const mainSwiper = new Swiper(mainElement, {
      slidesPerView: 1,
      spaceBetween: 0,
      speed: reducedMotion.matches ? 0 : 350,
      allowTouchMove: true,
      on: {
        slideChange(swiper) {
          syncGallery(swiper.activeIndex);
        },
      },
    });

    thumbnails.forEach((thumb, index) => {
      thumb.addEventListener('click', () => mainSwiper.slideTo(index));
      thumb.addEventListener('keydown', (event) => {
        const forward = event.key === 'ArrowRight' || event.key === 'ArrowDown';
        const backward = event.key === 'ArrowLeft' || event.key === 'ArrowUp';
        if (!forward && !backward) return;
        event.preventDefault();
        const next = (index + (forward ? 1 : -1) + count) % count;
        mainSwiper.slideTo(next);
        thumbnails[next].focus({ preventScroll: true });
      });
    });

    function updateDirection() {
      const direction = narrow.matches ? 'horizontal' : 'vertical';
      if (thumbsSwiper.params.direction !== direction) {
        thumbsSwiper.changeDirection(direction, true);
      }
      thumbsSwiper.update();
      thumbsSwiper.slideTo(mainSwiper.activeIndex, 0);
    }
    narrow.addEventListener?.('change', updateDirection);
    if (count <= 1) root.classList.add('pg-single');
    syncGallery(0);
  });
})();
