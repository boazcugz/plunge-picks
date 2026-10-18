(() => {
  'use strict';
  function upgradeForm(form, primary, label, max, step = 1) {
    if (!form) return;
    const input = form.querySelector(`[name="${primary}"]`);
    if (!input) return;
    const field = input.closest('label');
    if (!field) return;
    const group = field.parentElement;
    const advanced = document.createElement('details');
    advanced.className = 'simple-settings';
    advanced.innerHTML = '<summary>Fine-tune your numbers <span aria-hidden="true">＋</span></summary><p class="settings-hint">These example inputs drive your result. Change them to match your setup.</p>';
    group.before(advanced);
    const main = document.createElement('div');
    main.className = 'main-slider';
    main.innerHTML = `<span class="slider-kicker">${label}</span><input type="range" aria-label="${label}" min="${Math.max(0, Number(input.min))}" max="${max}" step="${step}"><div class="slider-extents"><span>Less</span><span>More</span></div>`;
    advanced.before(main);
    main.append(field);
    advanced.append(group);
    // Keep all remaining parameters accessible without making the first view a form wall.
    [...form.querySelectorAll('details.more')].forEach(d => advanced.append(d));
    const slider = main.querySelector('input[type="range"]');
    const sync = () => {
      const value = Number(input.value);
      slider.min = primary === 'volume' ? '1' : input.min || '0';
      // Litres need a bigger range than US gallons.
      const metric = primary === 'volume' && form.querySelector('[name="units"]:checked')?.value === 'metric';
      const top = metric ? Math.round(max * 3.785411784) : max;
      slider.max = String(Math.max(top, Number.isFinite(value) ? value : top));
      slider.value = input.value;
      const unit = field.querySelector('[data-unit], [data-shower-unit]')?.textContent || '';
      slider.setAttribute('aria-valuetext', input.value + (unit ? ' ' + unit : ''));
      slider.style.setProperty('--fill', `${100 * (Number(slider.value) - Number(slider.min)) / (Number(slider.max) - Number(slider.min))}%`);
    };
    slider.addEventListener('input', event => {
      event.stopPropagation();
      input.value = slider.value;
      input.dispatchEvent(new Event('input', {bubbles: true}));
    });
    form.addEventListener('input', sync);
    form.addEventListener('change', sync);
    sync();
    form.querySelector('.see-result, .calculate')?.classList.add('compact-result-button');
    if (primary === 'volume' || primary === 'hours' || primary === 'minutes') {
      const note = document.createElement('p'); note.className = 'assumption-preview'; main.after(note);
      const describe = () => {
        const v = n => { const x = form.elements.namedItem(n)?.value; if (!x) return '—'; const num = Number(x); return Number.isFinite(num) ? String(Math.round(num * 100) / 100) : x; };
        const unit = form.querySelector('[data-unit=temperature], [data-shower-unit=temperature]')?.textContent || '';
        note.textContent = primary === 'volume' ? `Water ${v('start')}${unit} → ${v('target')}${unit} · ice bag ${v('bagWeight')} ${form.querySelector('[data-unit=weight]')?.textContent || ''}. Edit below.`
          : primary === 'hours' ? `${v('watts')} W chiller · ${v('pump')} W pump running 24 h · $${v('rate')}/kWh. Edit below.`
          : `Flow ${v('flow')} ${form.querySelector('[data-shower-unit=flow]')?.textContent || ''} · tap ${v('inlet')}${unit} → ${v('target')}${unit}. Edit below.`;
      };
      form.addEventListener('input', describe); form.addEventListener('change', describe); describe();
    }
    if (form.id === 'cost-form' || document.body.dataset.tool === 'cost') {
      const note = document.createElement('p'); note.className = 'assumption-preview';
      main.after(note);
      const describe = () => { const v = n => form.elements.namedItem(n).value;
        note.textContent = `${v('bags')} bags × $${v('bagPrice')} per plunge · $${v('upfront')} chiller setup · ${v('months')} months. Edit below.`;
      };
      form.addEventListener('input', describe); describe();
    }
  }
  upgradeForm(document.querySelector('#cost-form'), 'sessions', 'How often will you plunge?', 14);
  upgradeForm(document.querySelector('#ice-form'), 'volume', 'How much water is in your tub?', 200);
  upgradeForm(document.querySelector('#shower-form'), 'minutes', 'How long does your water run?', 10, .1);
  const setup = document.querySelector('#setup-form');
  if (setup) {
    const details = document.createElement('details'); details.className = 'simple-settings';
    details.innerHTML = '<summary>DIY preference &amp; location ＋</summary>';
    const fields = [...setup.querySelectorAll('.choices')].slice(2);
    if (fields.length) { fields[0].before(details); fields.forEach(f => details.append(f)); }
  }
  const kind = document.body.dataset.tool;
  if (kind) upgradeForm(document.querySelector('#tool-form'), kind === 'cost' ? 'sessions' : kind === 'power' ? 'hours' : 'volume', kind === 'cost' ? 'How often will you plunge?' : kind === 'power' ? 'Chiller running hours per day' : 'How much water is in your tub?', kind === 'cost' ? 14 : kind === 'power' ? 24 : 200, kind === 'power' ? .5 : 1);
  function markAmazon(root) {
    root.querySelectorAll('a[href]').forEach(a => {
      let url; try { url = new URL(a.href); } catch { return; }
      if (!/(^|\.)amazon\.com$/.test(url.hostname) && url.hostname !== 'amzn.to') return;
      a.classList.add('clear-amazon');
      a.rel = 'sponsored nofollow noopener';
      if (!/amazon/i.test(a.textContent)) a.setAttribute('aria-label', a.textContent.trim() + ' on Amazon (paid link)');
    });
  }
  markAmazon(document);
  // Result cards are regenerated as inputs change.
  ['cost-result','ice-result','setup-result','shower-result','tool-result','results','build-your-plunge'].forEach(id => {
    const node = document.getElementById(id);
    if (node) new MutationObserver(() => markAmazon(node)).observe(node,{childList:true,subtree:true});
  });
})();
