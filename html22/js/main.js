/* FAQ accordion and accessible video modal */
(() => {
  const accordion = document.querySelector("[data-accordion]");

  if (accordion) {
    const triggers = accordion.querySelectorAll(".faq-item__trigger");

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const currentItem = trigger.closest(".faq-item");
        const currentPanel = document.getElementById(trigger.getAttribute("aria-controls"));
        const shouldOpen = trigger.getAttribute("aria-expanded") !== "true";

        // Keep one answer open at a time, matching the reference interaction.
        accordion.querySelectorAll(".faq-item").forEach((item) => {
          const itemTrigger = item.querySelector(".faq-item__trigger");
          const itemPanel = document.getElementById(itemTrigger.getAttribute("aria-controls"));
          item.classList.remove("is-open");
          itemTrigger.setAttribute("aria-expanded", "false");
          itemPanel.hidden = true;
        });

        if (shouldOpen) {
          currentItem.classList.add("is-open");
          trigger.setAttribute("aria-expanded", "true");
          currentPanel.hidden = false;
        }
      });
    });
  }

  const modal = document.querySelector("[data-video-modal]");
  const openButton = document.querySelector("[data-video-open]");
  if (!modal || !openButton) return;

  const frame = modal.querySelector("[data-video-frame]");
  const notice = modal.querySelector("[data-video-notice]");
  const closeButtons = modal.querySelectorAll("[data-video-close]");
  const closeButton = modal.querySelector(".video-modal__close");
  let previousFocus = null;

  const openModal = () => {
    const videoUrl = (openButton.dataset.videoUrl || "").trim();
    previousFocus = document.activeElement;
    modal.classList.add("is-visible");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("video-modal-open");
    closeButton.focus();

    if (videoUrl) {
      frame.src = videoUrl;
      frame.hidden = false;
      notice.hidden = true;
    } else {
      frame.src = "about:blank";
      frame.hidden = true;
      notice.hidden = false;
    }
  };

  const closeModal = () => {
    modal.classList.remove("is-visible");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("video-modal-open");
    frame.src = "about:blank";
    if (previousFocus) previousFocus.focus();
  };

  openButton.addEventListener("click", openModal);
  closeButtons.forEach((button) => button.addEventListener("click", closeModal));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-visible")) closeModal();
  });
})();