(() => {
  'use strict';

  const kind = document.body.dataset.tool;
  const form = document.querySelector('#tool-form');
  const error = document.querySelector('#tool-error');
  const output = document.querySelector('#tool-result');
  if (!['cost', 'ice', 'power'].includes(kind) || !form || !error || !output) return;

  const number = (value, digits = 1) => new Intl.NumberFormat('en-US', {
    maximumFractionDigits: digits
  }).format(value);
  const money = value => new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', maximumFractionDigits: 2
  }).format(value);
  const field = name => form.elements.namedItem(name);
  const readNumber = name => {
    const value = field(name)?.value?.trim() ?? '';
    return value === '' ? NaN : Number(value);
  };
  const stat = (label, value, unit = '') => `<div class="result-stat"><span>${label}</span><strong class="metric-value">${value}</strong>${unit ? `<small class="metric-unit">${unit}</small>` : ''}</div>`;
  const toC = value => (value - 32) * 5 / 9;
  const toF = value => value * 9 / 5 + 32;
  const normalize = value => Math.round(value * 1e9) / 1e9;
  let currentUnits = kind === 'ice' && field('units')?.value === 'metric' ? 'metric' : 'us';

  function costInputs() {
    return Object.fromEntries([
      'sessions', 'bags', 'bagPrice', 'upfront', 'energy', 'rate', 'maintenance', 'months'
    ].map(name => [name, readNumber(name)]));
  }

  function iceInputs() {
    const us = currentUnits === 'us';
    const volume = readNumber('volume');
    const start = readNumber('start');
    const target = readNumber('target');
    const iceTemp = readNumber('iceTemp');
    const bagWeight = readNumber('bagWeight');
    return {
      liters: us ? normalize(volume * 3.785411784) : volume,
      start: us ? normalize(toC(start)) : start,
      target: us ? normalize(toC(target)) : target,
      iceTemp: us ? normalize(toC(iceTemp)) : iceTemp,
      bagKg: us ? normalize(bagWeight * .45359237) : bagWeight
    };
  }

  function showCost(result) {
    const saving = Math.abs(result.difference);
    const equal = saving < .005;
    const winner = result.difference > 0 ? 'a chiller' : 'bagged ice';
    shareText = equal ? 'Ice vs. chiller: my cold plunge costs come out even.'
      : `Ice vs. chiller: ${winner} saves me ${money(saving)} over ${number(result.months)} months.`;
    const payback = result.paybackMonths === null ? 'No operating-cost payback'
      : result.paybackMonths === 0 ? 'Immediately'
      : result.paybackMonths < .1 ? 'Less than 0.1 months'
      : `${number(result.paybackMonths)} months`;
    output.innerHTML = `<p class="result-kicker">Your cost estimate</p>
      <h2 class="result-title">${equal ? 'The estimated totals are equal.' : `${result.difference > 0 ? 'A chiller' : 'Bagged ice'} costs less over this period.`}</h2>
      <p class="result-lead">${equal ? 'Less than one cent separates the two options' : `${money(saving)} less with ${winner}`} over ${number(result.months)} months.</p>
      <div class="result-grid">
        ${stat('Bagged ice', money(result.iceAnnual / 12), 'USD / month')}
        ${stat('Chiller running costs', money(result.chillerAnnual / 12), 'USD / month, excluding setup')}
        ${stat(`Ice total · ${number(result.months)} months`, money(result.iceTotal), 'USD')}
        ${stat(`Chiller total · ${number(result.months)} months`, money(result.chillerTotal), 'USD, including setup')}
        ${stat('Chiller setup cost', money(result.upfront), 'USD once')}
        ${stat('Simple chiller payback', payback)}
      </div>
      <p class="result-note">Uses your inputs and assumes year-round use. Simple payback compares operating savings with the chiller setup cost. Common tub and water costs are excluded.</p>`;
  }

  function powerInputs() {
    return Object.fromEntries(['watts', 'hours', 'pump', 'rate', 'sessions'].map(name => [name, readNumber(name)]));
  }

  function showPower(result) {
    shareText = `My cold plunge chiller costs about ${money(result.costMonth)} a month in electricity.`;
    output.innerHTML = `<p class="result-kicker">Your electricity estimate</p>
      <h2 class="result-title">About ${money(result.costMonth)} a month.</h2>
      <p class="result-lead">${number(result.kwhDay)} kWh a day, or ${money(result.costYear)} a year at your electricity price.</p>
      <div class="result-grid">
        ${stat('Per day', money(result.costDay), 'USD')}
        ${stat('Per month', money(result.costMonth), 'USD')}
        ${stat('Per year', money(result.costYear), 'USD')}
        ${stat('Energy per year', number(result.kwhYear, 0), 'kWh')}
        ${result.perPlunge === null ? '' : stat('Electricity per plunge', money(result.perPlunge), `USD at ${number(result.sessions, 0)} plunges / week`)}
      </div>
      <p class="result-note">Running hours are the biggest unknown. A plug-in energy meter shows the real kWh per day within a week; enter that number in the ice vs. chiller calculator for a full comparison.</p>`;
  }

  function showIce(result) {
    const us = currentUnits === 'us';
    const mass = us ? result.kg / .45359237 : result.kg;
    const meltwater = us ? result.litersAdded / 3.785411784 : result.litersAdded;
    shareText = result.kg === 0 ? 'My ice bath needs no extra ice.'
      : `My ice bath needs about ${number(mass, 0)} ${us ? 'lb' : 'kg'} of ice (${number(result.bags, 0)} bags).`;
    output.innerHTML = `<p class="result-kicker">Your ice estimate</p>
      <h2 class="result-title">${result.kg === 0 ? 'No extra cooling is needed for these inputs.' : 'Here is your theoretical ice requirement.'}</h2>
      <div class="result-grid">
        ${stat('Loose ice', number(mass), us ? 'lb' : 'kg')}
        ${stat('Whole bags', number(result.bags, 0), result.bags === 1 ? 'bag, rounded up' : 'bags, rounded up')}
        ${stat('Meltwater added', `+${number(meltwater)}`, us ? 'US gal at calculated ice mass' : 'L at calculated ice mass')}
      </div>
      <p class="result-note">${result.kg === 0 ? 'Check the actual water temperature with a thermometer.' : 'Add ice gradually, stir and check with a thermometer. Leave room for meltwater and your body.'}</p>
      <p class="result-note">Full rounded bags add more water and may cool below your target. The meltwater estimate uses the calculated ice mass, not the rounded bags.</p>
      <p class="result-note">Ideal heat balance only: warmth from the tub, air and sunlight can increase actual ice needs. This does not estimate cooling time or apply to sealed ice packs.</p>`;
  }

  const FIELDS = kind === 'cost'
    ? ['sessions', 'bags', 'bagPrice', 'upfront', 'energy', 'rate', 'maintenance', 'months']
    : kind === 'power' ? ['watts', 'hours', 'pump', 'rate', 'sessions']
    : ['volume', 'start', 'target', 'bagWeight', 'iceTemp'];
  let shareText = '';
  let touched = location.hash.length > 1;

  // Shareable links keep the inputs in the URL fragment (#volume=53&start=77…).
  // A fragment is never sent to the server, so it creates no duplicate URLs for search engines.
  function stateHash() {
    const params = new URLSearchParams();
    if (kind === 'ice') params.set('units', currentUnits);
    for (const name of FIELDS) {
      const value = field(name)?.value?.trim();
      if (value) params.set(name, value);
    }
    return '#' + params.toString();
  }

  function restoreFromHash() {
    if (location.hash.length < 2) return;
    const params = new URLSearchParams(location.hash.slice(1));
    if (kind === 'ice' && ['us', 'metric'].includes(params.get('units'))) {
      currentUnits = params.get('units');
      const radio = form.querySelector(`input[name="units"][value="${currentUnits}"]`);
      if (radio) radio.checked = true;
    }
    for (const name of FIELDS) {
      const raw = params.get(name);
      if (raw !== null && raw.trim() !== '' && Number.isFinite(Number(raw))) field(name).value = raw;
    }
  }

  function shareBar() {
    return `<div class="share-row"><button type="button" class="share-button" data-share>Share this result</button><span class="share-status" role="status"></span></div>`;
  }

  output.addEventListener('click', async event => {
    if (!event.target.closest('[data-share]')) return;
    const status = output.querySelector('.share-status');
    const url = location.origin + location.pathname + stateHash();
    try {
      if (navigator.share) {
        await navigator.share({ title: document.title, text: shareText, url });
        return;
      }
      await navigator.clipboard.writeText(`${shareText} ${url}`);
      if (status) status.textContent = 'Link copied. Anyone who opens it sees your numbers.';
    } catch (problem) {
      if (problem && problem.name === 'AbortError') return;
      if (status) status.textContent = 'Copy this page address to share your numbers.';
    }
  });

  function render() {
    try {
      if (typeof window.PlungeMath?.[kind] !== 'function') {
        throw new Error('The calculator could not load. Please refresh this page.');
      }
      const result = window.PlungeMath[kind](kind === 'cost' ? costInputs() : kind === 'power' ? powerInputs() : iceInputs());
      error.textContent = '';
      if (kind === 'cost') showCost(result);
      else if (kind === 'power') showPower(result);
      else showIce(result);
      const grid = output.querySelector('.result-grid');
      (grid || output).insertAdjacentHTML(grid ? 'afterend' : 'beforeend', shareBar());
      if (touched && location.hash !== stateHash()) history.replaceState(null, '', stateHash());
    } catch (problem) {
      error.textContent = problem.message;
      output.innerHTML = '<p class="result-kicker">One little fix</p><h2 class="result-title">Check your inputs.</h2><p class="result-lead">See the message below the form. Enter every number to see your estimate.</p>';
    }
  }

  function updateUnitLabels() {
    const us = currentUnits === 'us';
    for (const name of ['start', 'target']) {
      field(name).min = us ? '32.018' : '.01';
      field(name).max = us ? '212' : '100';
    }
    field('iceTemp').min = us ? '-58' : '-50';
    field('iceTemp').max = us ? '32' : '0';
    field('volume').min = String(us ? .01 / 3.785411784 : .01);
    field('volume').max = String(us ? 12000 / 3.785411784 : 12000);
    field('bagWeight').min = String(us ? .01 / .45359237 : .01);
    field('bagWeight').max = String(us ? 200 / .45359237 : 200);
    document.querySelectorAll('[data-unit]').forEach(label => {
      label.textContent = label.dataset.unit === 'volume' ? (us ? 'US gal' : 'L')
        : label.dataset.unit === 'weight' ? (us ? 'lb' : 'kg') : (us ? '°F' : '°C');
    });
  }

  function convertUnits(next) {
    if (!['us', 'metric'].includes(next) || next === currentUnits) return;
    const previous = iceInputs();
    currentUnits = next;
    const us = next === 'us';
    // Preserve missing or unparsable fields as blank. Never turn them into zero.
    const set = (name, value) => { field(name).value = Number.isFinite(value) ? String(value) : ''; };
    set('volume', us ? previous.liters / 3.785411784 : previous.liters);
    set('start', us ? toF(previous.start) : previous.start);
    set('target', us ? toF(previous.target) : previous.target);
    set('iceTemp', us ? toF(previous.iceTemp) : previous.iceTemp);
    set('bagWeight', us ? previous.bagKg / .45359237 : previous.bagKg);
    updateUnitLabels();
  }

  form.addEventListener('input', event => {
    touched = true;
    if (kind === 'ice' && event.target.name === 'units') convertUnits(event.target.value);
    render();
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    render();
    if (!error.textContent) {
      output.focus({preventScroll: true});
      output.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start'});
    }
  });
  restoreFromHash();
  if (kind === 'ice') updateUnitLabels();
  render();
})();
