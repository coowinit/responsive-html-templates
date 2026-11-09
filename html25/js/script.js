(() => {
  const root = document.querySelector('#s25-roofing-services');
  if (!root) return;

  const services = {
    commercial: {
      title: 'Commercial Roofing',
      description: 'Dependable roofing solutions for offices, business parks, and commercial properties, designed to protect your building and keep daily operations running smoothly.',
      main: 'images/commercial-main.svg',
      secondary: 'images/commercial-secondary.svg',
      altMain: 'Commercial roofing project placeholder',
      altSecondary: 'Commercial building roof placeholder'
    },
    industrial: {
      title: 'Industrial Roofing',
      description: 'We provide comprehensive flat and sloped roofing systems for office buildings, warehouses, and commercial complexes with minimal business interruption.',
      main: 'images/industrial-main.svg',
      secondary: 'images/industrial-secondary.svg',
      altMain: 'Industrial roofing project placeholder',
      altSecondary: 'Industrial roofing exterior placeholder'
    },
    residential: {
      title: 'Residential Roofing',
      description: 'Long-lasting roofing for homes and residential communities, combining reliable weather protection, practical performance, and a clean finished appearance.',
      main: 'images/residential-main.svg',
      secondary: 'images/residential-secondary.svg',
      altMain: 'Residential roofing project placeholder',
      altSecondary: 'Residential roof exterior placeholder'
    },
    retail: {
      title: 'Retail Roofing',
      description: 'Practical roofing systems for shops and retail spaces, planned to protect customers, staff, and inventory while minimizing disruption to business.',
      main: 'images/retail-main.svg',
      secondary: 'images/retail-secondary.svg',
      altMain: 'Retail roofing project placeholder',
      altSecondary: 'Retail property roof placeholder'
    }
  };

  const buttons = [...root.querySelectorAll('.s25-nav-item')];
  const title = root.querySelector('#s25-title');
  const description = root.querySelector('#s25-description');
  const mainImage = root.querySelector('#s25-image-main');
  const secondaryImage = root.querySelector('#s25-image-secondary');
  const link = root.querySelector('#s25-link');

  function selectService(key) {
    const item = services[key];
    if (!item) return;

    buttons.forEach((button) => {
      const active = button.dataset.service === key;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });

    title.textContent = item.title;
    description.textContent = item.description;
    mainImage.src = item.main;
    mainImage.alt = item.altMain;
    secondaryImage.src = item.secondary;
    secondaryImage.alt = item.altSecondary;
    link.setAttribute('aria-label', `View ${item.title}`);
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => selectService(button.dataset.service));
  });
})();
