/* Shared mobile navigation. No analytics, cookies or consent banner. */
(() => {
  'use strict';
  const burger = document.getElementById('burger');
  const links = document.getElementById('navlinks');
  if (!burger || !links) return;
  function setOpen(open) {
    links.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  document.addEventListener('click', event => {
    if (event.target.closest('#burger')) setOpen(!links.classList.contains('open'));
    else if (!event.target.closest('#navlinks')) setOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && links.classList.contains('open')) {
      setOpen(false);
      burger.focus();
    }
  });
})();
