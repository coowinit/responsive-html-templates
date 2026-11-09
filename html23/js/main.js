/* Independent FAQ accordions and scroll-aware category navigation */
(() => {
  // Each category controls its own accordion items independently.
  document.querySelectorAll(".faq-list").forEach((list) => {
    list.querySelectorAll(".faq-item__trigger").forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const item = trigger.closest(".faq-item");
        const panel = document.getElementById(trigger.getAttribute("aria-controls"));
        const willOpen = trigger.getAttribute("aria-expanded") !== "true";

        item.classList.toggle("is-open", willOpen);
        trigger.setAttribute("aria-expanded", String(willOpen));
        panel.hidden = !willOpen;
      });
    });
  });

  const nav = document.querySelector(".faq-nav");
  const links = nav ? Array.from(nav.querySelectorAll(".faq-nav__link")) : [];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!nav || !links.length || !sections.length) return;

  const setActive = (sectionId) => {
    links.forEach((link) => {
      const active = link.getAttribute("href") === `#${sectionId}`;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");

      // Keep the active category visible inside the horizontal mobile navigation.
      if (active && window.matchMedia("(max-width: 680px)").matches) {
        link.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
      }
    });
  };

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      setActive(target.id);
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${target.id}`);
    });
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible.length) setActive(visible[0].target.id);
    }, {
      root: null,
      rootMargin: "-18% 0px -62% 0px",
      threshold: [0, 0.1, 0.25, 0.5, 0.75]
    });

    sections.forEach((section) => observer.observe(section));
  } else {
    // Fallback for older browsers.
    const updateActive = () => {
      const marker = window.scrollY + window.innerHeight * 0.32;
      let current = sections[0];
      sections.forEach((section) => {
        if (section.offsetTop <= marker) current = section;
      });
      setActive(current.id);
    };
    window.addEventListener("scroll", updateActive, { passive: true });
    updateActive();
  }

  const initialTarget = sections.find((section) => `#${section.id}` === window.location.hash);
  if (initialTarget) setActive(initialTarget.id);
})();