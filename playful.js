(() => {
  'use strict';
  const button = document.querySelector('#motion-toggle');
  if (!button) return;
  button.addEventListener('click', () => {
    const paused = document.body.classList.toggle('motion-paused');
    button.setAttribute('aria-pressed', String(paused));
    button.setAttribute('aria-label', paused ? 'Play decorative animations' : 'Pause decorative animations');
    button.innerHTML = paused ? '▶ <span>Play sparkles</span>' : 'Ⅱ <span>Pause sparkles</span>';
  });
})();
