(() => {
  'use strict';
  const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
  const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n);
  const number=(n,d=1)=>new Intl.NumberFormat('en-US',{maximumFractionDigits:d}).format(n);
  let currentUnits='us';
  const formValues=form=>Object.fromEntries([...new FormData(form)].map(([k,v])=>[k,v===''?NaN:Number(v)]));
  // Category links keep the shopping suggestion useful without inventing a product rating or price.
  const shopCategories={
    tubs:['portable ice bath tub','Browse budget tubs on Amazon'],
    molds:['large reusable ice bath molds','Shop ice molds on Amazon'],
    thermometer:['cold plunge water thermometer','Shop thermometers on Amazon'],
    chillers:['cold plunge water chiller','Compare chillers on Amazon'],
    shower:['low flow showerhead','Browse showerheads on Amazon']
  };
  function amazonLink(category,position,secondary=false){
    const [query,label]=shopCategories[category];
    const url=new URL('https://www.amazon.com/s');
    url.searchParams.set('k',query);url.searchParams.set('tag','plungepicks-20');
    return `<a class="amazon-button${secondary?' amazon-button-secondary':''}" href="${url.href.replaceAll('&','&amp;')}" target="_blank" rel="sponsored noopener" data-pos="result_${position}" aria-label="${label} (paid link, opens a new tab)"><span>${label}</span><span aria-hidden="true">↗</span></a>`;
  }
  function resultShop(kind,{title,description,categories,brands=false}){
    return `<section class="result-shop" aria-labelledby="${kind}-shop-title"><span class="shop-eyebrow">YOUR NEXT STEP · PAID LINKS</span><h4 id="${kind}-shop-title">${title}</h4><p class="shop-description">${description}</p><div class="shop-actions">${categories.map((c,i)=>amazonLink(c,kind,i>0)).join('')}${brands?'<a class="shop-brand-link" href="#brands">Explore complete systems &amp; brands <span aria-hidden="true">↓</span></a>':''}</div><p class="shop-disclosure">As an Amazon Associate I earn from qualifying purchases. Links open Amazon searches in a new tab; check price, size and compatibility before buying.</p></section>`;
  }
  const cubeQuotes=['New here? Dip a toe.<br><b>I’ll do the math.</b>','I have zero chill.<br><b>Okay, that’s a lie.</b>','Good things come<br><b>to those who calculate.</b>','Sunglasses on.<br><b>Guesswork off.</b>'];
  let quoteIndex=0;
  $('#cube-button').addEventListener('click',()=>{
    quoteIndex=(quoteIndex+1)%cubeQuotes.length;
    $('#cube-quote').innerHTML=cubeQuotes[quoteIndex];
    const button=$('#cube-button');button.classList.remove('bop');void button.offsetWidth;button.classList.add('bop');
  });
  function selectMode(name,focus=false){
    if(!['bath','shower'].includes(name))throw new Error('Unknown experience.');
    $$('.experience-tab').forEach(b=>{const active=b.dataset.mode===name;b.classList.toggle('active',active);b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;if(active&&focus)b.focus();});
    $('#experience-bath').hidden=name!=='bath';$('#experience-shower').hidden=name!=='shower';
    $('#cube-quote').innerHTML=name==='shower'?'No tub? No problem.<br><b>Let’s make a little splash.</b>':cubeQuotes[quoteIndex];
  }
  $$('.experience-tab').forEach((b,index)=>{
    b.addEventListener('click',()=>selectMode(b.dataset.mode));
    b.addEventListener('keydown',e=>{let next;if(['ArrowLeft','ArrowRight'].includes(e.key))next=1-index;if(e.key==='Home')next=0;if(e.key==='End')next=1;if(next!==undefined){e.preventDefault();selectMode($$('.experience-tab')[next].dataset.mode,true);}});
  });
  function selectTab(name,focus=false){
    if(!['cost','ice','setup'].includes(name))throw new Error('Unknown calculator.');
    selectMode('bath');
    $$('.tab').forEach(b=>{const active=b.dataset.tab===name;b.classList.toggle('active',active);b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;if(active&&focus)b.focus();});
    $$('#experience-bath .calculator-panel').forEach(p=>p.hidden=p.id!=='panel-'+name);
  }
  $$('.tab').forEach((button,index)=>{button.addEventListener('click',()=>selectTab(button.dataset.tab));button.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(index+1)%3;if(e.key==='ArrowLeft')next=(index+2)%3;if(e.key==='Home')next=0;if(e.key==='End')next=2;if(next!==undefined){e.preventDefault();selectTab($$('.tab')[next].dataset.tab,true);}});});
  function failed(kind,error){$('#'+kind+'-error').textContent=error.message;$('#'+kind+'-result').innerHTML='<span class="result-label">LET’S FIX THAT NUMBER</span><h3>Even cool math<br>needs good inputs.</h3><p class="lede">Check the message below the inputs. Your result will return as soon as the numbers make sense.</p>';}
  function renderCost(){
    try{
      const r=PlungeMath.cost(formValues($('#cost-form')));$('#cost-error').textContent='';
      const equal=Math.abs(r.difference)<.005,winner=r.difference>0?'chiller':'ice',saving=Math.abs(r.difference),max=Math.max(r.iceTotal,r.chillerTotal,1);
      const payback=r.paybackMonths===null?'No operating-cost payback':r.paybackMonths===0?'Immediately':r.paybackMonths<.1?'Less than 0.1 months':number(r.paybackMonths)+' months';
      const roundedTie=!equal&&saving<.5;
      $('#cost-result').innerHTML=`<div class="result-top"><span class="result-label">YOUR COLD, HARD NUMBERS</span><span class="result-stamp">MATH, NOT MAGIC</span></div><h3>${equal?'A financial tie.':winner==='chiller'?'The chiller has a case.':'Ice keeps the lead.'}</h3><div class="big-number">${roundedTie?'&lt; $1':money(saving)}</div><p class="result-caption">${equal?'difference':`less with ${winner==='chiller'?'a chiller':'bagged ice'}`} over ${number(r.months,0)} months</p><div class="cost-bars"><div><div class="cost-row"><span>Bagged ice</span><b>${money(r.iceTotal)}</b></div><div class="bar-track"><div class="bar-fill ${winner==='ice'?'winner':''}" style="width:${r.iceTotal/max*100}%"></div></div></div><div><div class="cost-row"><span>Chiller + running costs</span><b>${money(r.chillerTotal)}</b></div><div class="bar-track"><div class="bar-fill ${winner==='chiller'?'winner':''}" style="width:${r.chillerTotal/max*100}%"></div></div></div></div><div class="payback"><span>Simple chiller payback</span><b>${payback}</b></div><p class="result-fine">Chiller running costs: about ${money(r.chillerAnnual/12)}/month, plus ${money(r.upfront)} once. This estimate uses your inputs and assumes year-round use.</p><p class="result-joke">${equal?'A tie. Your freezer demands a recount.':winner==='chiller'?'Your freezer just handed in its notice.':'Your wallet is on Team Ice. For now.'}</p>`;
      $('#cost-result').insertAdjacentHTML('beforeend',resultShop('cost',equal?{title:'Choose your starting point.',description:'Compare a simple ice tub with a complete system. Your result is a cost estimate, not a product recommendation.',categories:['tubs'],brands:true}:winner==='chiller'?{title:'A chiller next? Compare the options.',description:'Your inputs favor a chiller over this period. Check its capacity for your tub and climate before choosing.',categories:['chillers'],brands:true}:{title:'Start simple. Find your ice tub.',description:'An ice-based setup leads on your numbers. Browse portable tubs, then plan your ice supply.',categories:['tubs','molds']}));
      return r;
    }catch(e){failed('cost',e);return null;}
  }
  const toC=f=>(f-32)*5/9,toF=c=>c*9/5+32;
  function iceInputs(){const f=formValues($('#ice-form')),us=currentUnits==='us';const normalize=n=>Math.round(n*1e9)/1e9;return {liters:us?normalize(f.volume*3.785411784):f.volume,start:us?normalize(toC(f.start)):f.start,target:us?normalize(toC(f.target)):f.target,iceTemp:us?normalize(toC(f.iceTemp)):f.iceTemp,bagKg:us?normalize(f.bagWeight*.45359237):f.bagWeight};}
  function renderIce(){
    try{
      const v=iceInputs(),r=PlungeMath.ice(v);$('#ice-error').textContent='';const us=currentUnits==='us',mass=us?r.kg/.45359237:r.kg,extra=us?r.litersAdded/3.785411784:r.litersAdded;
      $('#ice-result').innerHTML=`<div class="result-top"><span class="result-label">YOUR ICE ESTIMATE</span><span class="result-stamp">COOL SCIENCE</span></div><h3>${r.kg===0?'You’re already there.':'Meet your ice number.'}</h3><div class="big-number">${number(mass)} <small>${us?'lb':'kg'}</small></div><p class="result-caption">theoretical loose-ice requirement</p><div class="ice-detail"><div><b>${number(r.bags,0)} ${r.bags===1?'bag':'bags'}</b><span>rounded up to whole bags</span></div><div><b>+${number(extra)} ${us?'gal':'L'}</b><span>meltwater at the calculated mass</span></div></div><p class="result-fine">${r.kg===0?'No cooling is needed for the temperatures you entered.':'Full rounded bags add more water and can cool below the target. Add gradually, stir and check with a thermometer. Leave space for meltwater and displacement.'}</p><p class="result-fine">Ideal heat balance only. A warm tub, sunlight and the surrounding air can increase the ice needed. This does not estimate cooling time.</p><p class="result-joke">${r.kg===0?'Zero bags. Maximum smugness.':r.bags>8?'That’s a workout before the plunge.':'Your ice run now has a shopping list.'}</p><button class="result-button" type="button" data-use-ice>Use ${number(r.bags,0)} bags in cost comparison <span aria-hidden="true">→</span></button>`;
      $('#ice-result').insertAdjacentHTML('beforeend',resultShop('ice',r.kg===0?{title:'Check the water, skip the ice.',description:'Your inputs need no extra cooling. A water thermometer can help you check the actual temperature.',categories:['thermometer']}:{title:'Turn your ice number into a plan.',description:'Making loose ice at home? Compare mold capacity with this estimate and your freezer space. The calculation does not apply to sealed ice packs.',categories:['molds','thermometer']}));
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
      $('#shower-result').innerHTML=`<div class="result-top"><span class="result-label">YOUR LITTLE SPLASH</span><span class="result-stamp">SHOWER POWER</span></div><h3>${r.drop===0?'Your tap hits the target.':'Here’s your shower forecast.'}</h3><div class="big-number">${number(volume,2)} <small>${unit}</small></div><p class="result-caption">of water over ${number(v.minutes,2)} ${v.minutes===1?'minute':'minutes'}</p><div class="ice-detail"><div><b>${number(r.coolingKW,2)} kW</b><span>continuous cooling needed</span></div><div><b>${number(drop,2)}${us?'°F':'°C'}</b><span>below your cold tap</span></div></div><p class="result-fine">${r.drop===0?'No additional cooling is needed for the temperatures entered. Your tap temperature can change with the season.':'A regular showerhead cannot provide this cooling on its own. A suitable cooling source would need to remove this heat while the water flows.'}</p><p class="result-fine">kW here means cooling capacity, not electricity use. This is an ideal estimate; confirm performance at your conditions with the equipment supplier.</p><p class="result-joke">${r.drop===0?'Your tap understood the assignment.':'Tiny footprint. Big brrr energy.'}</p>`;
      $('#shower-result').insertAdjacentHTML('beforeend',resultShop('shower',{title:'Start with the shower basics.',description:'Measure your tap temperature and choose a flow that suits you. These accessories do not cool water below its incoming temperature.',categories:['thermometer','shower']}));
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
  function renderSetup(){const r=PlungeMath.setup(Object.fromEntries(new FormData($('#setup-form'))));$('#setup-result').innerHTML=`<div class="result-top"><span class="result-label">YOUR STARTING POINT</span><span class="result-stamp">A COOL MATCH</span></div><h3 class="match-type">${r.title}</h3><p class="lede">${r.reason}</p><ul class="match-list">${r.points.map(p=>'<li>'+p+'</li>').join('')}</ul><p class="result-fine">${r.locationNote}</p><p class="result-joke">${r.chiller?'Less hauling. More chilling.':'Start small. Make a splash.'}</p><button class="result-button" type="button" data-open-cost>Check the costs for your routine <span aria-hidden="true">→</span></button>`;$('#setup-result').insertAdjacentHTML('beforeend',resultShop('setup',r.chiller?{title:'Bring your chiller setup together.',description:'Compare cooling options for your water volume and conditions. Confirm every connection and what the package includes.',categories:['chillers'],brands:true}:{title:'Your first plunge starts with a tub.',description:'Browse ice-based tubs and check the usable dimensions, cover and drainage. Add ice separately; a tub alone does not cool the water.',categories:['tubs','thermometer']}));return r;}
  for(const kind of ['cost','ice','setup','shower'])$('#'+kind+'-form').addEventListener('submit',e=>e.preventDefault());
  $('#cost-form').addEventListener('input',renderCost);
  $('#ice-form').addEventListener('input',e=>{if(e.target.name==='units')convertUnits(e.target.value);else renderIce();});
  $('#setup-form').addEventListener('change',renderSetup);
  document.addEventListener('click',e=>{if(e.target.closest('[data-use-ice]')){const r=renderIce();if(r&&r.bags<=100){$('#cost-form').elements.bags.value=r.bags;renderCost();selectTab('cost',true);$('#calculators').scrollIntoView({behavior:'smooth'});}else if(r){$('#ice-error').textContent='This estimate exceeds the cost calculator’s 100-bag limit. Check the volume and bag weight.';}}if(e.target.closest('[data-open-cost]')){const freq=$('#setup-form').elements.frequency.value;$('#cost-form').elements.sessions.value=({occasional:2,regular:4,daily:7})[freq];renderCost();selectTab('cost',true);$('#calculators').scrollIntoView({behavior:'smooth'});}});
  document.addEventListener('click',e=>{const button=e.target.closest('[data-show-result]');if(!button)return;const result=$('#'+button.dataset.showResult+'-result');result.focus({preventScroll:true});result.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});});
  renderCost();renderIce();renderSetup();renderShower();
  if(document.modelContext?.registerTool){
    const lifecycle=new AbortController();
    const tool={name:'calculate_cold_plunge_cost',title:'Compare ice and chiller costs',description:'Update the visible cost calculator using USD inputs and show the ice versus chiller comparison.',annotations:{readOnlyHint:false,untrustedContentHint:false},inputSchema:{type:'object',properties:{sessions:{type:'number',minimum:0,maximum:21},bags:{type:'number',minimum:0,maximum:100},bagPrice:{type:'number',minimum:0,maximum:1000},upfront:{type:'number',minimum:0,maximum:100000},energy:{type:'number',minimum:0,maximum:200},rate:{type:'number',minimum:0,maximum:10},maintenance:{type:'number',minimum:0,maximum:10000},months:{type:'number',minimum:1,maximum:120}},required:['sessions','bags','bagPrice','upfront','energy','rate','maintenance','months'],additionalProperties:false},execute(input){if(!input||typeof input!=='object'||Array.isArray(input)||Object.keys(input).some(k=>!Object.hasOwn(tool.inputSchema.properties,k)))throw new Error('Invalid cost inputs.');const result=PlungeMath.cost(input);for(const [key,value]of Object.entries(input))$('#cost-form').elements[key].value=value;selectTab('cost');renderCost();return result;}};
    try{Promise.resolve(document.modelContext.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{});}catch{}
    window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
  }
})();
