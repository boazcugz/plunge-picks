(() => {
  'use strict';

  const kind = document.body.dataset.tool;
  const form = document.querySelector('#tool-form');
  const error = document.querySelector('#tool-error');
  const output = document.querySelector('#tool-result');
  if (!['cost', 'ice'].includes(kind) || !form || !error || !output) return;

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

  function showIce(result) {
    const us = currentUnits === 'us';
    const mass = us ? result.kg / .45359237 : result.kg;
    const meltwater = us ? result.litersAdded / 3.785411784 : result.litersAdded;
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

  function render() {
    try {
      if (typeof window.PlungeMath?.[kind] !== 'function') {
        throw new Error('The calculator could not load. Please refresh this page.');
      }
      const result = window.PlungeMath[kind](kind === 'cost' ? costInputs() : iceInputs());
      error.textContent = '';
      if (kind === 'cost') showCost(result);
      else showIce(result);
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
    if (kind === 'ice' && event.target.name === 'units') convertUnits(event.target.value);
    render();
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    render();
  });
  if (kind === 'ice') updateUnitLabels();
  render();
})();
