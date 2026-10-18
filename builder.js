(() => {
  'use strict';
  const root = document.getElementById('build-your-plunge');
  if (!root) return;
  const parts = {
    tub: {name:'Your plunge tub',icon:'🛁',cost:150,query:'portable ice bath tub',note:'Check usable space, a secure cover and drainage. For a chiller, confirm compatible inlet and outlet ports.'},
    molds: {name:'Reusable ice molds',icon:'🧊',cost:30,query:'large reusable ice bath molds',note:'Match mold volume to your ice calculation and available freezer space. Freezing takes time.'},
    thermometer: {name:'Water thermometer',icon:'🌡️',cost:15,query:'cold plunge water thermometer',note:'Measure the actual water temperature before every plunge.'},
    chiller: {name:'The cooling engine',icon:'❄️',cost:700,query:'cold plunge chiller with pump filter',note:'Ask the supplier to size it for your water volume, climate and target temperature. Check what is included.'},
    pump: {name:'Circulation pump',icon:'↻',cost:80,query:'cold plunge external circulation pump',note:'Skip if included with your chiller. Flow, pressure, voltage and wet-use suitability must match the system.'},
    filter: {name:'Filter & housing',icon:'💧',cost:70,query:'cold plunge water filter housing',note:'Skip if included. Match flow and connections. Filtration does not replace water sanitation.'},
    hoses: {name:'Hoses & fittings',icon:'🔧',cost:50,query:'cold plunge insulated hoses fittings',note:'Skip if included. Match thread type, hose diameter, pressure and fittings before ordering.'},
    care: {name:'Water-care supplies',icon:'✨',cost:35,query:'cold plunge water care test strips',note:'Follow the tub supplier’s sanitation and testing instructions. Check material compatibility.'},
    freezer: {name:'Chest freezer',icon:'▣',cost:500,query:'chest freezer',note:'If you use a kit, pick a size it supports. Expect a conversion to void the freezer’s warranty.'},
    conversion: {name:'Conversion kit',icon:'⚙️',cost:330,url:'https://www.boxplunge.com/product-page/diy-boxplunge-conversion-kit',note:'Liner, temperature controller, pump and filter, GFCI. Or seal it yourself and add a plug-in temperature controller. Freezer sold separately.'},
    assessment: {name:'Electrician check',icon:'✓',cost:200,note:'Optional. If you are unsure about any electrical step, have an electrician check the setup. Get a local quote.'}
  };
  const paths = {
    ice: {title:'Keep it simple. Bring the ice.',image:'start-with-ice.webp',items:['tub','molds','thermometer','care'],text:'A tub, a way to make ice and the basics. Ice supply and water changes are ongoing costs.'},
    chiller: {title:'Less ice hauling. More chilling.',image:'build-your-own.webp',items:['tub','chiller','pump','filter','hoses','thermometer','care'],text:'Build a compatible system. Already included in your chiller bundle? Untick that part below.'},
    freezer: {title:'Freezer conversion. Cheap cold, strict rules.',image:'build-your-own.webp',items:['freezer','conversion','thermometer','care','assessment'],optional:['assessment'],text:'Often the cheapest way to cold water without daily ice. Water and mains power share one appliance, so unplug it before every plunge and use a GFCI/RCD outlet with no extension cord.'}
  };
  let mode='ice', budget=1500;
  const defaults = p => new Set(p.items.filter(k => !(p.optional||[]).includes(k)));
  const selections = Object.fromEntries(Object.entries(paths).map(([k,p])=>[k,defaults(p)]));
  const money = n => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n);
  const amazon = q => 'https://www.amazon.com/s?k='+encodeURIComponent(q)+'&tag=plungepicks-20';
  root.innerHTML = `<header class="builder-heading"><span class="eyebrow">YOUR SETUP. PIECE BY PIECE.</span><h2>Build your own brrr.</h2><p>Pick a path. Mix your parts. Find your budget.</p></header>
  <div class="build-modes" role="group" aria-label="Choose your cooling route">
  <button type="button" data-mode="ice" aria-pressed="true"><span aria-hidden="true">🧊</span><strong>Ice</strong><small>Start simple</small></button>
  <button type="button" data-mode="chiller" aria-pressed="false"><span aria-hidden="true">❄️</span><strong>Chiller</strong><small>Build your system</small></button>
  <button type="button" data-mode="freezer" aria-pressed="false"><span aria-hidden="true">💡</span><strong>Freezer conversion</strong><small>Explore the DIY route</small></button></div>
  <div class="builder-scene"><img src="/assets/home/start-with-ice.webp" width="1200" height="800" alt="Ice-based cold plunge setup illustration" loading="lazy"><div><h3 data-route-title></h3><p data-route-note></p><a href="/ice-bath-calculator">Work out your ice needs →</a></div></div>
  <div class="build-budget"><div><label for="build-budget-range">Your equipment budget</label><strong data-budget-label>$1,500</strong><input id="build-budget-range" type="range" min="100" max="5000" step="50" value="1500"><span>Slide to explore · USD</span></div><div class="build-total" aria-live="polite" aria-atomic="true"><span>Selected parts allowance</span><strong data-build-total></strong><span data-budget-status></span><small data-count></small></div></div>
  <p class="budget-disclaimer"><strong>Planning allowances, not Amazon prices.</strong> Edit each amount using quotes you find. Total excludes tax, delivery, installation unless selected, and ongoing ice, electricity and water care.</p>
  <p class="parts-instruction">✓ Keep the parts you need. Untick anything you own or that comes in a bundle.</p>
  <p class="builder-disclosure">Paid links. As an Amazon Associate I earn from qualifying purchases. Amazon buttons open category searches; parts are not a verified compatible kit.</p>
  <div class="parts-grid"></div><div class="builder-foot"><button type="button" data-reset>Reset selections</button><a href="/cost-calculator">Compare running costs →</a></div>
  <details class="builder-notes"><summary>Before you order</summary><p>Confirm tub dimensions, chiller performance at your conditions, matching hose connections, pump flow and package contents with the suppliers. Electrical equipment near water needs appropriate protection and installation. Follow the complete system’s water-care and safety instructions.</p><p>Freezer route: unplug the freezer, controller and any pump before every plunge. Plug into a GFCI/RCD-protected outlet directly, with no extension cord. Use an external temperature controller, seal or line the inside and leak-test it for a few days, and keep the electrics dry and off the ground. The conversion kit link goes to the manufacturer; it is not an Amazon link or a safety certification.</p></details>`;
  const grid=root.querySelector('.parts-grid');
  function totals() {
    const inputs=[...grid.querySelectorAll('input[data-cost]')];
    const invalid=inputs.some(i=> selections[mode].has(i.dataset.cost) && (i.value.trim()==='' || !i.validity.valid));
    const total=[...selections[mode]].reduce((n,k)=>n+parts[k].cost,0);
    root.querySelector('[data-build-total]').textContent=invalid?'Check amounts':money(total);
    root.querySelector('[data-budget-status]').textContent=invalid?'Enter an allowance for each selected part.':total>budget?money(total-budget)+' above your budget':money(budget-total)+' left in your budget';
    root.querySelector('[data-count]').textContent=selections[mode].size+' of '+paths[mode].items.length+' parts selected';
    root.querySelector('.build-total').classList.toggle('over-budget',!invalid && total>budget);
  }
  function render() {
    const path=paths[mode];
    root.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===mode)));
    root.querySelector('[data-route-title]').textContent=path.title;
    root.querySelector('[data-route-note]').textContent=path.text;
    const img=root.querySelector('.builder-scene img');img.src='/assets/home/'+path.image;
    img.alt=mode==='ice'?'Ice-based plunge setup illustration':'Tub and external chiller setup illustration';
    // Avoid showing a tub/chiller as a converted freezer.
    img.hidden=mode==='freezer';root.querySelector('.builder-scene').classList.toggle('freezer-scene',mode==='freezer');
    const routeLink=root.querySelector('.builder-scene a');routeLink.href=mode==='freezer'?'/diy-ice-bath-ideas#freezer-conversion':'/ice-bath-calculator';routeLink.textContent=mode==='freezer'?'Read the freezer safety rules →':'Work out your ice needs →';
    grid.innerHTML=path.items.map(k=>{const p=parts[k],checked=selections[mode].has(k);return `<article class="part-card ${checked?'is-selected':''}"><label class="part-select"><input type="checkbox" data-part="${k}" ${checked?'checked':''}><span>Include in my setup</span></label><div class="part-icon" aria-hidden="true">${p.icon}</div><h3>${p.name}</h3><p>${p.note}</p><label class="part-cost">My allowance (USD)<span>$ <input aria-label="${p.name} allowance in USD" data-cost="${k}" type="number" min="0" max="100000" step="1" value="${p.cost}" required></span></label>${p.query?`<a class="amazon-button clear-amazon" href="${amazon(p.query).replaceAll('&','&amp;')}" target="_blank" rel="sponsored nofollow noopener">Browse on Amazon ↗</a>`:p.url?`<a class="kit-link" href="${p.url}" target="_blank" rel="nofollow noopener">See the BoxPlunge kit ↗</a>`:'<span class="local-quote">Get a local quote</span>'}</article>`;}).join('');totals();
  }
  root.addEventListener('click', e=>{
    const btn=e.target.closest('[data-mode]');if(btn){mode=btn.dataset.mode;render();}
    if(e.target.closest('[data-reset]')){selections[mode]=defaults(paths[mode]);render();}
  });
  grid.addEventListener('change',e=>{const k=e.target.dataset.part;if(!k)return;if(e.target.checked)selections[mode].add(k);else selections[mode].delete(k);e.target.closest('.part-card').classList.toggle('is-selected',e.target.checked);totals();});
  grid.addEventListener('input',e=>{const k=e.target.dataset.cost;if(!k)return;if(e.target.value!=='' && e.target.validity.valid)parts[k].cost=Number(e.target.value);totals();});
  root.querySelector('#build-budget-range').addEventListener('input',e=>{budget=Number(e.target.value);root.querySelector('[data-budget-label]').textContent=money(budget);totals();});
  render();
})();
