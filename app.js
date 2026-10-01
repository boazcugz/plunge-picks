(() => {
  'use strict';
  const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
  const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n);
  const number=(n,d=1)=>new Intl.NumberFormat('en-US',{maximumFractionDigits:d}).format(n);
  let currentUnits='us';
  const formValues=form=>Object.fromEntries([...new FormData(form)].map(([k,v])=>[k,v===''?NaN:Number(v)]));
  // One checked product example; remaining links are clearly labelled category searches.
  const shopCategories={
    tubs:['portable ice bath tub','Cold Pod bundle on Amazon','https://www.amazon.com/dp/B0F8W817GD'],
    molds:['large reusable ice bath molds','Ice molds on Amazon'],
    thermometer:['cold plunge water thermometer','Thermometers on Amazon'],
    chillers:['cold plunge water chiller','Chillers on Amazon'],
    shower:['low flow showerhead','Showerheads on Amazon']
  };
  function amazonLink(category,position,secondary=false){
    const [query,label,productUrl]=shopCategories[category];
    const url=new URL(productUrl||'https://www.amazon.com/s');
    if(!productUrl)url.searchParams.set('k',query);
    url.searchParams.set('tag','plungepicks-20');
    return `<a class="amazon-button${secondary?' amazon-button-secondary':''}" href="${url.href.replaceAll('&','&amp;')}" target="_blank" rel="sponsored noopener" data-pos="result_${position}" aria-label="${label} (paid link, opens a new tab)"><span>${label}</span><span aria-hidden="true">↗</span></a>`;
  }
  const resultDetails=(summary,content)=>`<details class="result-details"><summary>${summary}</summary>${content}</details>`;
  function resultShop(kind,{title,description,categories,brands=false}){
    const hasTub=categories.includes('tubs');
    const productDetails=hasTub?'<p>The Cold Pod 85-gallon tub includes a full-wrap thermal cover, with no chiller. Listed outer size: 29.5 × 29.5 × 29.5 in. Leave room for your body and ice. Listing checked September 30, 2026; not hands-on tested.</p>':'';
    const linkDetails=hasTub?'The tub link opens the named bundle. Other Amazon links, if shown, open searches.':'Amazon links open searches.';
    return `<section class="result-shop" aria-labelledby="${kind}-shop-title"><h4 id="${kind}-shop-title">${title}</h4><div class="shop-actions">${categories.map((c,i)=>amazonLink(c,kind,i>0)).join('')}${brands?'<a class="shop-brand-link" href="#brands">Explore complete systems <span aria-hidden="true">↓</span></a>':''}</div><p class="shop-disclosure">Paid links. As an Amazon Associate I earn from qualifying purchases.</p>${resultDetails('Before you shop',`<p>${description}</p>${productDetails}<p>${linkDetails} Check the model, seller, price, size and compatibility before buying.</p>`)}</section>`;
  }
  const cubeQuotes=['New here? Dip a toe.<br><b>I’ll do the math.</b>','I have zero chill.<br><b>Okay, that’s a lie.</b>','Good things come<br><b>to those who calculate.</b>','Sunglasses on.<br><b>Guesswork off.</b>'];
  let quoteIndex=0;
  const cubeButton=$('#cube-button'),cubeQuote=$('#cube-quote');
  cubeButton?.addEventListener('click',()=>{
    quoteIndex=(quoteIndex+1)%cubeQuotes.length;
    if(cubeQuote)cubeQuote.innerHTML=cubeQuotes[quoteIndex];
    cubeButton.classList.remove('bop');void cubeButton.offsetWidth;cubeButton.classList.add('bop');
  });
  const panelIds={cost:'panel-cost',ice:'panel-ice',setup:'panel-setup',shower:'experience-shower'};
  const tabs=$$('.tabs .tab[data-tab]');
  let activeCalculator='cost';
  const scrollBehavior=()=>matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth';
  function selectTab(name,focus=false){
    if(!Object.hasOwn(panelIds,name))throw new Error('Unknown calculator.');
    const changed=activeCalculator!==name;
    tabs.forEach(button=>{const active=button.dataset.tab===name;button.classList.toggle('active',active);button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;if(active&&focus)button.focus({preventScroll:true});});
    Object.entries(panelIds).forEach(([key,id])=>{const panel=$('#'+id);panel.hidden=key!==name;panel.classList.remove('tool-enter');});
    const panel=$('#'+panelIds[name]);
    if(changed&&!matchMedia('(prefers-reduced-motion: reduce)').matches){void panel.offsetWidth;panel.classList.add('tool-enter');}
    activeCalculator=name;
    if(cubeQuote)cubeQuote.innerHTML=name==='shower'?'No tub? No problem.<br><b>Let’s make a little splash.</b>':cubeQuotes[quoteIndex];
  }
  tabs.forEach((button,index)=>{button.addEventListener('click',()=>selectTab(button.dataset.tab));button.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(index+1)%tabs.length;if(e.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();selectTab(tabs[next].dataset.tab,true);}});});
  function failed(kind,error){$('#'+kind+'-error').textContent=error.message;$('#'+kind+'-result').innerHTML='<span class="result-label">ONE LITTLE FIX</span><h3>Check that number.</h3><p class="lede">See the message below your inputs.</p>';}
  function renderCost(){
    try{
      const r=PlungeMath.cost(formValues($('#cost-form')));$('#cost-error').textContent='';
      const equal=Math.abs(r.difference)<.005,winner=r.difference>0?'chiller':'ice',saving=Math.abs(r.difference),max=Math.max(r.iceTotal,r.chillerTotal,1);
      const payback=r.paybackMonths===null?'No operating-cost payback':r.paybackMonths===0?'Immediately':r.paybackMonths<.1?'Less than 0.1 months':number(r.paybackMonths)+' months';
      const roundedTie=!equal&&saving<.5;
      $('#cost-result').innerHTML=`<div class="result-top"><span class="result-label">YOUR COST ESTIMATE</span><span class="result-stamp">MATH, NOT MAGIC</span></div><h3>${equal?'It’s a tie.':winner==='chiller'?'Team Chiller.':'Team Ice.'}</h3><div class="big-number">${roundedTie?'&lt; $1':money(saving)}</div><p class="result-caption">${equal?'difference':`less with ${winner==='chiller'?'a chiller':'bagged ice'}`} over ${number(r.months,0)} months</p><div class="cost-bars"><div><div class="cost-row"><span>Bagged ice</span><b>${money(r.iceTotal)}</b></div><div class="bar-track"><div class="bar-fill ${winner==='ice'?'winner':''}" style="width:${r.iceTotal/max*100}%"></div></div></div><div><div class="cost-row"><span>Chiller + running costs</span><b>${money(r.chillerTotal)}</b></div><div class="bar-track"><div class="bar-fill ${winner==='chiller'?'winner':''}" style="width:${r.chillerTotal/max*100}%"></div></div></div></div><div class="payback"><span>Chiller payback</span><b>${payback}</b></div>${resultDetails('What’s in the estimate?',`<p>Chiller running costs: about ${money(r.chillerAnnual/12)}/month, plus ${money(r.upfront)} once.</p><p>Uses your inputs and assumes year-round use. Simple payback compares operating savings with the chiller setup cost. Common tub and water costs are excluded.</p>`)}<p class="result-joke">${equal?'Your freezer demands a recount.':winner==='chiller'?'Your freezer can take a day off.':'Your wallet likes a little ice.'}</p>`;
      $('#cost-result').insertAdjacentHTML('beforeend',resultShop('cost',equal?{title:'Compare your options',description:'Compare an ice tub with a complete system. This is a cost estimate, not a product recommendation.',categories:['tubs'],brands:true}:winner==='chiller'?{title:'Explore chillers',description:'Your inputs favor a chiller over this period. Check its capacity for your tub and climate.',categories:['chillers'],brands:true}:{title:'Build your ice setup',description:'An ice-based setup leads on your numbers. Check the tub fit and plan your ice supply.',categories:['tubs','molds']}));
      return r;
    }catch(e){failed('cost',e);return null;}
  }
  const toC=f=>(f-32)*5/9,toF=c=>c*9/5+32;
  function iceInputs(){const f=formValues($('#ice-form')),us=currentUnits==='us';const normalize=n=>Math.round(n*1e9)/1e9;return {liters:us?normalize(f.volume*3.785411784):f.volume,start:us?normalize(toC(f.start)):f.start,target:us?normalize(toC(f.target)):f.target,iceTemp:us?normalize(toC(f.iceTemp)):f.iceTemp,bagKg:us?normalize(f.bagWeight*.45359237):f.bagWeight};}
  function renderIce(){
    try{
      const v=iceInputs(),r=PlungeMath.ice(v);$('#ice-error').textContent='';const us=currentUnits==='us',mass=us?r.kg/.45359237:r.kg,extra=us?r.litersAdded/3.785411784:r.litersAdded;
      $('#ice-result').innerHTML=`<div class="result-top"><span class="result-label">YOUR ICE ESTIMATE</span><span class="result-stamp">COOL SCIENCE</span></div><h3>${r.kg===0?'You’re already there.':'Here’s your ice number.'}</h3><div class="big-number">${number(mass)} <small>${us?'lb':'kg'}</small></div><p class="result-caption">theoretical loose-ice requirement</p><div class="ice-detail"><div><b>${number(r.bags,0)} ${r.bags===1?'bag':'bags'}</b><span>rounded up</span></div><div><b>+${number(extra)} ${us?'gal':'L'}</b><span>meltwater at calculated mass</span></div></div><p class="result-fine">${r.kg===0?'No extra cooling needed for these inputs. Check the water with a thermometer.':'Add gradually, stir and check with a thermometer. Leave room for meltwater and your body.'}</p>${resultDetails('Ice & water details','<p>Full rounded bags add more water and may cool below your target. The meltwater number uses the calculated ice mass, not rounded bags.</p><p>This ideal heat balance excludes warmth from the tub, air and sunlight. Actual ice needs may be higher. It does not estimate cooling time or apply to sealed ice packs.</p>')}<p class="result-joke">${r.kg===0?'Zero bags. Maximum smugness.':r.bags>8?'A workout before the plunge.':'Ice run, sorted.'}</p><button class="result-button" type="button" data-use-ice>Price these ${number(r.bags,0)} bags <span aria-hidden="true">→</span></button>`;
      $('#ice-result').insertAdjacentHTML('beforeend',resultShop('ice',r.kg===0?{title:'Check your water',description:'A water thermometer helps you check the actual temperature.',categories:['thermometer']}:{title:'Plan your ice supply',description:'Compare mold capacity with your ice estimate and freezer space. This calculation is for loose ice, not sealed packs.',categories:['molds','thermometer']}));
      return r;
    }catch(e){failed('ice',e);return null;}
  }
  function convertUnits(next){
    if(next===currentUnits)return;const f=$('#ice-form'),v=iceInputs();currentUnits=next;const us=next==='us';
    const set=(n,val)=>f.elements[n].value=Number.isFinite(val)?String(val):'';
    set('volume',us?v.liters/3.785411784:v.liters);set('start',us?toF(v.start):v.start);set('target',us?toF(v.target):v.target);set('iceTemp',us?toF(v.iceTemp):v.iceTemp);set('bagWeight',us?v.bagKg/.45359237:v.bagKg);
    for(const n of ['start','target']){f.elements[n].min=us?'32.018':'.01';f.elements[n].max=us?'212':'100';}
    f.elements.iceTemp.min=us?'-58':'-50';f.elements.iceTemp.max=us?'32':'0';
    f.elements.volume.min=String(us?.01/3.785411784:.01);f.elements.volume.max=String(us?12000/3.785411784:12000);
    f.elements.bagWeight.min=String(us?.01/.45359237:.01);f.elements.bagWeight.max=String(us?200/.45359237:200);
    $$('[data-unit]').forEach(el=>el.textContent=el.dataset.unit==='volume'?(us?'US gal':'L'):el.dataset.unit==='weight'?(us?'lb':'kg'):(us?'°F':'°C'));
    renderIce();
  }
  let showerUnits='metric';
  function showerInputs(){
    const f=formValues($('#shower-form')),us=showerUnits==='us';
    const normalize=n=>Math.round(n*1e9)/1e9;
    return {flow:us?normalize(f.flow*3.785411784):f.flow,minutes:f.minutes,inlet:us?normalize(toC(f.inlet)):f.inlet,target:us?normalize(toC(f.target)):f.target};
  }
  function renderShower(){
    try{
      const v=showerInputs(),r=PlungeMath.shower(v),us=showerUnits==='us';
      $('#shower-error').textContent='';
      const volume=us?r.liters/3.785411784:r.liters,unit=us?'US gal':'L',drop=us?r.drop*9/5:r.drop;
      $('#shower-result').innerHTML=`<div class="result-top"><span class="result-label">YOUR SHOWER ESTIMATE</span><span class="result-stamp">SHOWER POWER</span></div><h3>${r.drop===0?'Your tap hits the target.':'Your shower, by the numbers.'}</h3><div class="big-number">${number(volume,2)} <small>${unit}</small></div><p class="result-caption">of water over ${number(v.minutes,2)} ${v.minutes===1?'minute':'minutes'}</p><div class="ice-detail"><div><b>${number(r.coolingKW,2)} kW</b><span>cooling power, not electricity use</span></div><div><b>${number(drop,2)}${us?'°F':'°C'}</b><span>below your cold tap</span></div></div><p class="result-fine">${r.drop===0?'No extra cooling needed for these inputs. ':''}A showerhead cannot cool water below its tap temperature.</p>${resultDetails('What does the cooling number mean?','<p>It is the heat a cooling source would need to remove continuously while water flows, not its electrical consumption.</p><p>This is an ideal estimate. Tap temperature changes with the season; confirm equipment performance for your flow and temperatures.</p>')}<p class="result-joke">${r.drop===0?'Your tap understood the assignment.':'Small splash. Cool math.'}</p>`;
      $('#shower-result').insertAdjacentHTML('beforeend',resultShop('shower',{title:'Shower basics',description:'Measure your tap temperature and choose a flow that suits you. These accessories do not cool water.',categories:['thermometer','shower']}));
      return r;
    }catch(e){failed('shower',e);return null;}
  }
  function convertShowerUnits(next){
    if(next===showerUnits)return;
    const v=showerInputs(),f=$('#shower-form'),us=next==='us';showerUnits=next;
    const set=(n,value)=>f.elements[n].value=Number.isFinite(value)?String(value):'';
    set('flow',us?v.flow/3.785411784:v.flow);set('inlet',us?toF(v.inlet):v.inlet);set('target',us?toF(v.target):v.target);
    f.elements.flow.min=us?'0.02642':'0.1';f.elements.flow.max=us?'13.2086':'50';
    for(const name of ['inlet','target']){f.elements[name].min=us?'33.8':'1';f.elements[name].max=us?'140':'60';}
    $$('[data-shower-unit]').forEach(el=>el.textContent=el.dataset.showerUnit==='flow'?(us?'gal / min':'L / min'):(us?'°F':'°C'));
    renderShower();
  }
  $('#shower-form').addEventListener('input',e=>{if(e.target.name==='showerUnits')convertShowerUnits(e.target.value);else renderShower();});
  function renderSetup(){
    const r=PlungeMath.setup(Object.fromEntries(new FormData($('#setup-form'))));
    $('#setup-result').innerHTML=`<div class="result-top"><span class="result-label">YOUR STARTING POINT</span><span class="result-stamp">A COOL MATCH</span></div><h3 class="match-type">${r.title}</h3><p class="lede">${r.reason}</p>${resultDetails('Why this setup?',`<ul class="match-list">${r.points.map(p=>'<li>'+p+'</li>').join('')}</ul><p>${r.locationNote}</p><p>A starting point, not a product rating or an exact chiller size.</p>`)}<p class="result-joke">${r.chiller?'Less hauling. More chilling.':'Start small. Make a splash.'}</p><button class="result-button" type="button" data-open-cost>Check my running costs <span aria-hidden="true">→</span></button>`;
    $('#setup-result').insertAdjacentHTML('beforeend',resultShop('setup',r.chiller?{title:'Explore your setup',description:'Check cooling capacity for your volume and conditions, connection compatibility and package contents.',categories:['chillers'],brands:true}:{title:'Find your starting tub',description:'Check usable dimensions, cover and drainage. Add ice separately; a tub alone does not cool the water.',categories:['tubs','thermometer']}));
    return r;
  }
  for(const kind of ['cost','ice','setup','shower'])$('#'+kind+'-form').addEventListener('submit',e=>e.preventDefault());
  $('#cost-form').addEventListener('input',renderCost);
  $('#ice-form').addEventListener('input',e=>{if(e.target.name==='units')convertUnits(e.target.value);else renderIce();});
  $('#setup-form').addEventListener('change',renderSetup);
  document.addEventListener('click',e=>{if(e.target.closest('[data-use-ice]')){const r=renderIce();if(r&&r.bags<=100){$('#cost-form').elements.bags.value=r.bags;renderCost();selectTab('cost',true);$('#calculators').scrollIntoView({behavior:scrollBehavior()});}else if(r){$('#ice-error').textContent='This estimate exceeds the cost calculator’s 100-bag limit. Check the volume and bag weight.';}}if(e.target.closest('[data-open-cost]')){const freq=$('#setup-form').elements.frequency.value;$('#cost-form').elements.sessions.value=({occasional:2,regular:4,daily:7})[freq];renderCost();selectTab('cost',true);$('#calculators').scrollIntoView({behavior:scrollBehavior()});}});
  document.addEventListener('click',e=>{const button=e.target.closest('[data-show-result]');if(!button)return;const result=$('#'+button.dataset.showResult+'-result');result.focus({preventScroll:true});result.scrollIntoView({behavior:scrollBehavior(),block:'start'});});
  renderCost();renderIce();renderSetup();renderShower();
  // Keep every calculator reachable from the homepage and older guides.
  const calculatorHashes={'#panel-cost':'cost','#panel-ice':'ice','#panel-setup':'setup','#experience-shower':'shower'};
  function openCalculator(name,focus=false){
    selectTab(name);
    if(focus){const form=$('#'+name+'-form');(form.querySelector('input:not([type="radio"])')||form.querySelector('input:checked'))?.focus({preventScroll:true});}
    $('#calculators').scrollIntoView({behavior:scrollBehavior(),block:'start'});
  }
  document.addEventListener('click',event=>{
    const link=event.target.closest('[data-open-calculator]');
    if(!link||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
    event.preventDefault();
    if(location.hash!==link.getAttribute('href'))history.pushState(null,'',link.getAttribute('href'));
    openCalculator(link.dataset.openCalculator,true);
  });
  window.addEventListener('hashchange',()=>{const name=calculatorHashes[location.hash];if(name)openCalculator(name);});
  if(calculatorHashes[location.hash])openCalculator(calculatorHashes[location.hash]);else selectTab('cost');
  if(document.modelContext?.registerTool){
    const lifecycle=new AbortController();
    const tool={name:'calculate_cold_plunge_cost',title:'Compare ice and chiller costs',description:'Update the visible cost calculator using USD inputs and show the ice versus chiller comparison.',annotations:{readOnlyHint:false,untrustedContentHint:false},inputSchema:{type:'object',properties:{sessions:{type:'number',minimum:0,maximum:21},bags:{type:'number',minimum:0,maximum:100},bagPrice:{type:'number',minimum:0,maximum:1000},upfront:{type:'number',minimum:0,maximum:100000},energy:{type:'number',minimum:0,maximum:200},rate:{type:'number',minimum:0,maximum:10},maintenance:{type:'number',minimum:0,maximum:10000},months:{type:'number',minimum:1,maximum:120}},required:['sessions','bags','bagPrice','upfront','energy','rate','maintenance','months'],additionalProperties:false},execute(input){if(!input||typeof input!=='object'||Array.isArray(input)||Object.keys(input).some(k=>!Object.hasOwn(tool.inputSchema.properties,k)))throw new Error('Invalid cost inputs.');const result=PlungeMath.cost(input);for(const [key,value]of Object.entries(input))$('#cost-form').elements[key].value=value;selectTab('cost');renderCost();return result;}};
    try{Promise.resolve(document.modelContext.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{});}catch{}
    window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
  }
})();
