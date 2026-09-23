(() => {
  'use strict';
  const shop = document.querySelector('#diy-gear');
  const track = document.querySelector('#diy-products');
  const toggle = document.querySelector('#diy-toggle');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = motion.matches;
  let hovered = false;
  let visible = false;
  let timer;

  function updateButton() {
    toggle.querySelector('[data-diy-play-icon]').textContent = paused ? '▶' : 'Ⅱ';
    toggle.querySelector('[data-diy-play-label]').textContent = paused ? 'Play' : 'Pause';
    toggle.setAttribute('aria-label', (paused ? 'Start' : 'Pause') + ' automatic product scrolling');
  }

  function move(direction) {
    const first = track.firstElementChild;
    const step = first.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap);
    const end = track.scrollWidth - track.clientWidth;
    let target = Math.round(track.scrollLeft / step) * step + direction * step;
    if (direction > 0 && track.scrollLeft >= end - 2) target = 0;
    if (direction < 0 && track.scrollLeft <= 2) target = end;
    track.scrollTo({left: Math.max(0, Math.min(target, end)), behavior: motion.matches ? 'instant' : 'smooth'});
  }

  function schedule() {
    clearTimeout(timer);
    if (paused || hovered || !visible || document.hidden) return;
    timer = setTimeout(() => {
      move(1);
      schedule();
    }, 5500);
  }

  function pause() {
    paused = true;
    updateButton();
    schedule();
  }

  toggle.addEventListener('click', () => {
    paused = !paused;
    updateButton();
    schedule();
  });
  for (const [id, direction] of [['#diy-prev', -1], ['#diy-next', 1]]) {
    document.querySelector(id).addEventListener('click', () => { pause(); move(direction); });
  }
  shop.addEventListener('pointerenter', event => {
    if (event.pointerType === 'mouse') { hovered = true; schedule(); }
  });
  shop.addEventListener('pointerleave', () => { hovered = false; schedule(); });
  track.addEventListener('focusin', pause);
  track.addEventListener('pointerdown', pause, {passive: true});
  track.addEventListener('wheel', pause, {passive: true});
  track.addEventListener('keydown', event => {
    if (event.target !== track || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    pause();
    if (event.key === 'Home' || event.key === 'End') {
      track.scrollTo({left: event.key === 'Home' ? 0 : track.scrollWidth, behavior: motion.matches ? 'instant' : 'smooth'});
    } else move(event.key === 'ArrowRight' ? 1 : -1);
  });
  document.addEventListener('visibilitychange', schedule);
  motion.addEventListener('change', () => { if (motion.matches) pause(); });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      schedule();
    }, {threshold: 0.15});
    observer.observe(track);
  } else visible = true;
  document.querySelector('.diy-controls').hidden = false;
  updateButton();
  schedule();
})();
