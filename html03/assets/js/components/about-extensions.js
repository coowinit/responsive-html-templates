/* About components: optional Swiper carousels + shared native image preview. */
(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initializeSlider(sectionId, selector, prev, next, pagination, desktopSlides) {
    const root = document.getElementById(sectionId);

    if (!root || root.dataset.abxReady || typeof window.Swiper !== 'function') {
      return;
    }

    const slider = root.querySelector(selector);
    if (!slider) {
      return;
    }

    new window.Swiper(slider, {
      slidesPerView: 1.12,
      spaceBetween: 16,
      speed: reducedMotion ? 0 : 450,
      watchOverflow: true,
      navigation: {
        prevEl: root.querySelector(prev),
        nextEl: root.querySelector(next)
      },
      pagination: {
        el: root.querySelector(pagination),
        clickable: true
      },
      breakpoints: {
        640: { slidesPerView: 2, spaceBetween: 18 },
        1024: { slidesPerView: desktopSlides, spaceBetween: 24 }
      }
    });

    root.dataset.abxReady = '1';
  }

  initializeSlider(
    's08-history', '.abx-history-swiper',
    '.abx-history-prev', '.abx-history-next', '.abx-history-pagination', 3
  );
  initializeSlider(
    's09-credentials', '.abx-cert-swiper',
    '.abx-cert-prev', '.abx-cert-next', '.abx-cert-pagination', 4
  );

  for (const sectionId of ['s09-credentials', 's10-factory']) {
    const root = document.getElementById(sectionId);
    const dialog = root?.querySelector('.abx-preview-dialog');

    if (!dialog || typeof dialog.showModal !== 'function') {
      continue;
    }

    let lastTrigger = null;
    let lastPointerOpen = false;
    const preview = dialog.querySelector('.abx-preview-image');
    const title = dialog.querySelector('.abx-preview-title');
    const close = dialog.querySelector('.abx-preview-close');

    root.querySelectorAll('.abx-cert-open, .abx-factory-open').forEach((button) => {
      button.addEventListener('blur', () => button.classList.remove('abx-pointer-focus'));
      button.addEventListener('click', (event) => {
        const pointerOpen = event.detail > 0;
        lastPointerOpen = pointerOpen;
        button.classList.toggle('abx-pointer-focus', pointerOpen);
        dialog.classList.toggle('abx-pointer-open', pointerOpen);
        const image = button.querySelector('img');
        if (!image) {
          return;
        }

        lastTrigger = button;
        preview.src = image.currentSrc || image.src;
        preview.alt = image.alt;
        title.textContent = button.dataset.title || image.alt;
        dialog.showModal();
        close?.focus();
      });
    });

    close?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) {
        dialog.close();
      }
    });
    dialog.addEventListener('close', () => {
      preview.removeAttribute('src');
      dialog.classList.remove('abx-pointer-open');
      lastTrigger?.classList.toggle('abx-pointer-focus', lastPointerOpen);
      lastTrigger?.focus({ preventScroll: true });
    });
  }
})();
