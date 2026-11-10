/* Front-end interaction demo only. WordPress plugin will supply server-side state. */
(() => {
  'use strict';
  const products = {
    'cpd-03s': { name: 'Easy to Install Capped Composite Decking CPD-03S', image: 'assets/images/deck-grey.svg', url: '#' },
    'cpd-05': { name: 'Ultra Strong Core More Durable Composite Decking CPD-05', image: 'assets/images/deck-brown.svg', url: '#' },
    'wpc-12': { name: 'Wood Look WPC Exterior Wall Cladding WPC-12', image: 'assets/images/wall-cladding.svg', url: '#' }
  };
  const storageKey = 'wic-prototype-cart-v1';
  let cart = {};
  try {
    const saved = JSON.parse(sessionStorage.getItem(storageKey) || '{}');
    for (const [id, qty] of Object.entries(saved)) if (products[id] && Number.isInteger(qty) && qty > 0 && qty <= 99) cart[id] = qty;
  } catch (_) { cart = {}; }
  const itemList = document.getElementById('wic-cart-items');
  const empty = document.getElementById('wic-cart-empty');
  const count = document.getElementById('wic-floating-count');
  const floatButton = document.getElementById('wic-floating-button');
  const status = document.getElementById('wic-status');
  const buttonTimers = new WeakMap();
  const persist = () => { try { sessionStorage.setItem(storageKey, JSON.stringify(cart)); } catch (_) {} };
  const total = () => Object.values(cart).reduce((a, b) => a + b, 0);
  const announce = message => { status.textContent = ''; requestAnimationFrame(() => { status.textContent = message; }); };
  const resetButton = button => {
    if (!button) return;
    if (buttonTimers.has(button)) clearTimeout(buttonTimers.get(button));
    button.classList.remove('is-added');
    button.querySelector('.wic-add-button__text').textContent = 'Add to Cart';
    button.querySelector('.wic-add-button__icon img').src = 'assets/icons/cart-add.svg';
  };
  function render() {
    itemList.replaceChildren();
    for (const [id, qty] of Object.entries(cart)) {
      const product = products[id];
      if (!product) continue;
      const row = document.createElement('div');
      row.className = 'wic-cart__row';
      const imageLink = document.createElement('a'); imageLink.className = 'wic-cart__thumb-link'; imageLink.href = product.url; imageLink.setAttribute('aria-label', 'View ' + product.name);
      const image = document.createElement('img');
      image.className = 'wic-cart__thumb'; image.src = product.image; image.alt = ''; image.width = 70; image.height = 55;
      imageLink.append(image);
      const title = document.createElement('div'); title.className = 'wic-cart__title';
      const titleLink = document.createElement('a'); titleLink.className = 'wic-cart__title-link'; titleLink.href = product.url; titleLink.textContent = product.name; title.append(titleLink);
      const quantity = document.createElement('div'); quantity.className = 'wic-cart__qty';
      const label = document.createElement('label'); label.textContent = 'Quantity'; label.htmlFor = 'wic-qty-' + id;
      const input = document.createElement('input'); input.type = 'number'; input.min = '1'; input.max = '99'; input.step = '1'; input.value = String(qty); input.id = 'wic-qty-' + id; input.setAttribute('inputmode', 'numeric');
      quantity.append(label, input);
      const actions = document.createElement('div'); actions.className = 'wic-cart__actions';
      const update = document.createElement('button'); update.type = 'button'; update.textContent = 'Update'; update.dataset.update = id;
      const remove = document.createElement('button'); remove.type = 'button'; remove.textContent = 'Delete'; remove.dataset.remove = id;
      actions.append(update, remove);
      row.append(imageLink, title, quantity, actions); itemList.append(row);
    }
    empty.hidden = Object.keys(cart).length > 0;
    const n = total(); count.textContent = n > 99 ? '99+' : String(n); count.hidden = n === 0;
    floatButton.setAttribute('aria-label', 'Go to cart, ' + n + ' item' + (n === 1 ? '' : 's'));
    persist();
  }
  document.querySelector('.wic-cart-ui').addEventListener('click', event => {
    const anchor = event.target.closest('a[href="#"]');
    if (anchor) event.preventDefault();
  });
  document.getElementById('wic-products').addEventListener('click', event => {
    const button = event.target.closest('[data-add-product]');
    if (!button) return;
    const id = button.dataset.addProduct;
    if (!products[id]) return;
    if ((cart[id] || 0) >= 99) { announce('Maximum quantity is 99 per product.'); return; }
    cart[id] = (cart[id] || 0) + 1;
    render(); resetButton(button);
    button.classList.add('is-added');
    button.querySelector('.wic-add-button__text').textContent = 'Added to Cart';
    button.querySelector('.wic-add-button__icon img').src = 'assets/icons/cart-added.svg';
    buttonTimers.set(button, setTimeout(() => resetButton(button), 1800));
    announce(products[id].name + ' added. Cart has ' + total() + ' items.');
  });
  itemList.addEventListener('click', event => {
    const update = event.target.closest('[data-update]');
    const remove = event.target.closest('[data-remove]');
    if (!update && !remove) return;
    const id = (update || remove).dataset.update || remove.dataset.remove;
    if (!(id in cart)) return;
    if (remove) { delete cart[id]; render(); announce(products[id].name + ' removed.'); return; }
    const input = update.closest('.wic-cart__row').querySelector('input[type="number"]');
    const num = Number(input.value);
    if (!Number.isInteger(num) || num < 1 || num > 99) { input.setCustomValidity('Enter a whole number from 1 to 99.'); input.reportValidity(); input.setCustomValidity(''); return; }
    cart[id] = num; render(); announce('Quantity updated for ' + products[id].name + '.');
  });
  document.getElementById('wic-reset').addEventListener('click', () => { cart = {}; document.querySelectorAll('[data-add-product]').forEach(resetButton); render(); announce('Demo cart reset.'); });
  floatButton.addEventListener('click', () => document.getElementById('cart-preview').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }));
  render();
})();
