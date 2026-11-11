(function () {
  'use strict';

  const slider = document.querySelector('[data-slider]');
  if (!slider || typeof window.Swiper !== 'function') return;

  const dots = Array.from(slider.querySelectorAll('[data-dot]'));
  const slides = Array.from(slider.querySelectorAll('.s31-slide'));

  // Keep the pagination and focusable product links in sync with the active slide.
  function sync(activeIndex) {
    dots.forEach((dot, index) => {
      const active = index === activeIndex;
      dot.classList.toggle('is-active', active);
      if (active) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });

    slides.forEach((slide, index) => {
      const active = index === activeIndex;
      slide.setAttribute('aria-hidden', String(!active));
      slide.inert = !active;
    });
  }

  // The three demo links are placeholders, not real product pages.
  slider.querySelectorAll('.s31-btn[href="#"]').forEach((link) => {
    link.addEventListener('click', (event) => event.preventDefault());
  });

  const swiper = new window.Swiper(slider.querySelector('.s31-viewport'), {
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 450,
    loop: true,
    allowTouchMove: true,
    keyboard: { enabled: true, onlyInViewport: true },
    on: {
      init() { sync(this.realIndex); },
      slideChange() { sync(this.realIndex); }
    }
  });

  slider.querySelector('[data-prev]').addEventListener('click', () => swiper.slidePrev());
  slider.querySelector('[data-next]').addEventListener('click', () => swiper.slideNext());
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => swiper.slideToLoop(index));
  });
})();
