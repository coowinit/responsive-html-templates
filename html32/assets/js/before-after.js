/* html32 — 一个页面可放多个 [data-before-after]，实例互不影响。 */
(() => {
  'use strict';

  document.querySelectorAll('[data-before-after]').forEach((compare) => {
    const initial = Number(compare.dataset.start);
    let value = Number.isFinite(initial) ? Math.min(100, Math.max(0, initial)) : 50;
    let activePointerId = null;

    function update(next) {
      value = Math.min(100, Math.max(0, next));
      compare.style.setProperty('--s32-position', `${value}%`);
      compare.setAttribute('aria-valuenow', String(Math.round(value)));
      compare.setAttribute('aria-valuetext', `左侧改造后 ${Math.round(value)}%，右侧改造前 ${Math.round(100 - value)}%`);
    }

    function updateFromPointer(event) {
      const rect = compare.getBoundingClientRect();
      if (!rect.width) return;
      update((event.clientX - rect.left) / rect.width * 100);
    }

    compare.addEventListener('pointerdown', (event) => {
      if (event.button !== 0 || activePointerId !== null) return;
      activePointerId = event.pointerId;
      compare.setPointerCapture(event.pointerId);
      compare.focus({ preventScroll: true });
      updateFromPointer(event);
    });

    compare.addEventListener('pointermove', (event) => {
      if (activePointerId !== event.pointerId) return;
      updateFromPointer(event);
    });

    function finish(event) {
      if (activePointerId !== event.pointerId) return;
      activePointerId = null;
      if (compare.hasPointerCapture(event.pointerId)) compare.releasePointerCapture(event.pointerId);
    }
    compare.addEventListener('pointerup', finish);
    compare.addEventListener('pointercancel', finish);
    compare.addEventListener('lostpointercapture', (event) => {
      if (activePointerId === event.pointerId) activePointerId = null;
    });

    compare.addEventListener('keydown', (event) => {
      let next = value;
      const step = event.shiftKey ? 10 : 2;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') next -= step;
      else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') next += step;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = 100;
      else return;
      event.preventDefault();
      update(next);
    });

    update(value);
  });
})();
