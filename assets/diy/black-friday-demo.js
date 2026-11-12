(() => {
  'use strict';
  const section = document.getElementById('boxplunge-black-friday');
  if (!section) return;
  // End of Nov 27 in America/New_York (BoxPlunge's US market).
  const expiresAt = Date.parse(section.dataset.offerExpires);
  // Enabled for all hosts; the offer expiry still controls visibility.
  const demo = true;
  const previewNodes = document.querySelectorAll('.bf-ribbon, .bf-preview-note');
  let expiryTimer;
  function updateVisibility() {
    clearTimeout(expiryTimer);
    const remaining = expiresAt - Date.now();
    const visible = demo && Number.isFinite(expiresAt) && remaining > 0;
    section.hidden = !visible;
    document.querySelector('.box-route')?.classList.toggle('has-black-friday', visible);
    document.querySelectorAll('[data-boxplunge-promo]').forEach(el => { el.hidden = !visible; });
    previewNodes.forEach(el => { el.hidden = true; });
    // Also hide in a tab left open across the deadline. Cap browser timer range.
    if (visible) expiryTimer = setTimeout(updateVisibility, Math.min(remaining, 2147483647));
  }
  updateVisibility();
  document.addEventListener('visibilitychange', updateVisibility);
  window.addEventListener('pageshow', updateVisibility);
  const button = document.getElementById('bf-copy-code');
  const status = document.getElementById('bf-copy-status');
  if (!button || !status) return;
  button.addEventListener('click', async () => {
    updateVisibility();
    if (section.hidden) return;
    try {
      await navigator.clipboard.writeText('PLUNGEWISE');
      button.title = 'Code copied';
      status.textContent = 'Code copied. Paste it at checkout.';
    } catch {
      status.textContent = 'Select and copy the code PLUNGEWISE above.';
    }
  });
})();
