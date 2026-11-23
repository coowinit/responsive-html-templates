"use strict";

(() => {
  const timeline = document.querySelector(".adv__timeline");
  if (!timeline || !("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const items = [...timeline.querySelectorAll(".adv__item")];
  if (!items.length) return;

  // CSS only hides items after the script confirms that animation is available.
  timeline.classList.add("adv--motion");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target); // Animate once, do not hide on scroll-up.
    });
  }, { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

  items.forEach((item) => observer.observe(item));
})();
