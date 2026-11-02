/* About-page image enhancement. Missing files never become visible broken images. */
(() => {
  'use strict';
  const slots = [...document.querySelectorAll('[data-about-image]')];
  const dialog = document.querySelector('#au-lightbox');
  if (!slots.length || !dialog) return;
  let registry = {}, assetBase = '/assets/about/', returnFocus = null;
  function ready(slot, image, metadata) {
    slot.classList.add('has-image');
    slot.querySelector('.au-placeholder').setAttribute('aria-hidden', 'true');
    if (slot.tagName === 'BUTTON') slot.disabled = false;
    slot._aboutMetadata = metadata;
    slot._aboutImage = image;
  }
  function reset(slot, image) {
    slot.classList.remove('has-image');
    slot.querySelector('.au-placeholder').removeAttribute('aria-hidden');
    if (slot.tagName === 'BUTTON') slot.disabled = true;
    image.remove();
    slot._aboutImage = null;
  }
  function hydrate(slot) {
    const metadata = registry[slot.dataset.aboutImage];
    let image = slot.querySelector('img');
    if (image) {
      const fallback = metadata || { label:image.alt, alt:image.alt, file:image.getAttribute('src').split('/').pop() };
      image.addEventListener('load', () => ready(slot, image, fallback));
      image.addEventListener('error', () => reset(slot, image));
      if (image.complete) image.naturalWidth ? ready(slot, image, fallback) : reset(slot, image);
      return;
    }
    if (!metadata) return;
    // Probe in a detached image. An unavailable source leaves the designed placeholder intact.
    image = new Image();
    image.alt = metadata.alt;
    image.decoding = 'async';
    image.addEventListener('load', () => { slot.append(image); ready(slot, image, metadata); });
    image.addEventListener('error', () => { /* Placeholder is already visible. */ });
    image.src = assetBase + metadata.file;
  }
  slots.forEach(slot => {
    if (slot.querySelector('img')) hydrate(slot);
    if (slot.tagName !== 'BUTTON') return;
    slot.addEventListener('click', () => {
      if (!slot._aboutImage) return;
      const metadata = slot._aboutMetadata;
      returnFocus = slot;
      const image = new Image();
      image.alt = metadata.alt;
      image.src = assetBase + metadata.file;
      dialog.querySelector('.au-lightbox-body').replaceChildren(image);
      dialog.querySelector('#au-lightbox-title').textContent = metadata.label;
      dialog.querySelector('.au-lightbox-caption').textContent = metadata.caption || metadata.scope || metadata.description || '';
      dialog.querySelector('.au-original-link').href = image.src;
      dialog.showModal();
      dialog.querySelector('[data-au-close]').focus();
    });
  });
  dialog.querySelector('[data-au-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const rect=dialog.getBoundingClientRect(); if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => { dialog.querySelector('.au-lightbox-body').replaceChildren(); returnFocus?.focus(); });
  fetch('/assets/about/about-images.json').then(response => { if (!response.ok) throw Error('Image metadata unavailable'); return response.json(); }).then(data => {
    registry = data.images; assetBase = data.assetBase;
    const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => { entries.forEach(entry => { if(entry.isIntersecting){hydrate(entry.target);observer.unobserve(entry.target);} }); }, { rootMargin:'250px' }) : null;
    slots.forEach(slot => {
      const metadata=registry[slot.dataset.aboutImage];
      if (metadata && slot._aboutImage) slot._aboutMetadata=metadata;
      if (slot.querySelector('img')) return;
      observer ? observer.observe(slot) : hydrate(slot);
    });
  }).catch(() => { /* Supplied photographs and designed placeholders remain usable. */ });
})();
