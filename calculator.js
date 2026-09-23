(function(root){
  'use strict';
  function bounded(value,min,max,name){if(typeof value!=='number'||!Number.isFinite(value)||value<min||value>max)throw new Error(name+' must be between '+min+' and '+max+'.');return value;}
  function cost(x){
    const sessions=bounded(x.sessions,0,21,'Plunges per week'),bags=bounded(x.bags,0,100,'Ice bags per plunge'),bagPrice=bounded(x.bagPrice,0,1000,'Bag price'),upfront=bounded(x.upfront,0,100000,'Setup cost'),energy=bounded(x.energy,0,200,'Daily energy'),rate=bounded(x.rate,0,10,'Electricity price'),maintenance=bounded(x.maintenance,0,10000,'Monthly upkeep'),months=bounded(x.months,1,120,'Months');
    const iceAnnual=sessions*52*bags*bagPrice,chillerAnnual=energy*365*rate+12*maintenance,iceTotal=iceAnnual*months/12,chillerTotal=upfront+chillerAnnual*months/12,annualSaving=iceAnnual-chillerAnnual;
    return {iceAnnual,chillerAnnual,iceTotal,chillerTotal,annualSaving,difference:iceTotal-chillerTotal,paybackMonths:annualSaving>0?upfront/(annualSaving/12):null,months,upfront};
  }
  function ice(x){
    const liters=bounded(x.liters,.01,12000,'Water volume'),start=bounded(x.start,.01,100,'Starting temperature'),target=bounded(x.target,.01,100,'Target temperature'),iceTemp=bounded(x.iceTemp,-50,0,'Ice temperature'),bagKg=bounded(x.bagKg,.01,200,'Bag weight');
    if(target>start)throw new Error('Your target is warmer than the water. Ice cannot heat it up.');
    const kg=liters*4.186*(start-target)/(2.09*(-iceTemp)+334+4.186*target);
    return {kg,bags:Math.ceil(kg/bagKg-1e-10),litersAdded:kg,finalLiters:liters+kg};
  }
  function setup(x){
    const choices={frequency:['occasional','regular','daily'],priority:['upfront','ease'],diy:['yes','no'],location:['sheltered','hot']};
    for(const [k,values] of Object.entries(choices))if(!values.includes(x[k]))throw new Error('Choose a valid '+k+'.');
    const chiller=x.priority==='ease'&&x.frequency!=='occasional';
    const title=chiller?(x.diy==='yes'?'A chiller-ready setup.':'An all-in-one system.'):(x.diy==='yes'?'A simple ice setup.':'A ready-made tub + ice.');
    const reason=chiller?'Frequent plunges and less daily effort matter to you. A chiller is worth comparing.':'Keeping the initial commitment low is a sensible place to start with your choices.';
    const points=chiller?['An insulated tub and cover reduce the heat load.',x.diy==='yes'?'Check hose, pump and filter compatibility before buying.':'Compare complete systems with clear servicing and warranty terms.','Check rated cooling capacity for your volume and climate.']:['Start with a suitable tub, cover and thermometer.','Calculate the ice needed before planning freezer space.','A countertop ice maker’s daily output is not its stored ice capacity.'];
    const locationNote=x.location==='hot'?'A sunny spot adds heat. Find shade and insulate before comparing equipment.':'Even in shade, insulation and a cover help limit heat gain.';
    return {title,reason,points,locationNote,chiller};
  }
  function shower(x){
    const flow=bounded(x.flow,.1,50,'Water flow'),minutes=bounded(x.minutes,.1,60,'Water run time'),inlet=bounded(x.inlet,1,60,'Tap temperature'),target=bounded(x.target,1,60,'Target temperature');
    if(target>inlet)throw new Error('Your target is warmer than your tap water. Lower the target to estimate cooling.');
    const liters=flow*minutes,drop=inlet-target,coolingKW=flow/60*4.186*drop,heatKJ=liters*4.186*drop;
    return {liters,drop,coolingKW,heatKJ,thermalKWh:heatKJ/3600};
  }
  root.PlungeMath={cost,ice,setup,shower};
  if(typeof module!=='undefined'&&module.exports)module.exports=root.PlungeMath;
})(typeof window!=='undefined'?window:globalThis);
