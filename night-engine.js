// MOTOR DE NIT — fa servir data/nights.js. Normalment no cal editar aquest arxiu.
game.location ||= 'sofa';
game.drama ??= 12;
game.dramaWins ||= 0;
game.dramaEventPending ||= false;
game.lastDramaTick ||= Date.now();
game.nightSeen ||= false;

function currentLocation(){ return LOCATIONS.find(x=>x.id===game.location)||LOCATIONS[0] }
function unlockedLocations(){ return LOCATIONS.filter(x=>x.unlock(game)) }
function finalReady(){ return game.cigs>=FINAL_NIGHT.cigs&&CHARACTERS.every(x=>game.recruited.includes(x.id))&&unlockedLocations().length===LOCATIONS.length&&game.dramaWins>0 }

function passiveRate(){
  let rate=CHARACTERS.filter(x=>game.recruited.includes(x.id)).reduce((total,x)=>total+relation(x).level*x.passive.rate,0),now=Date.now();
  CHARACTERS.filter(x=>game.recruited.includes(x.id)&&x.active).forEach(x=>{let buff=game.buffs[x.id]||{};if(buff.boostUntil>now)rate*=x.active.multiplier;if(buff.penaltyUntil>now)rate=Math.max(0,rate-x.active.penalty)});
  return rate*currentLocation().bonus;
}

function tabAlerts(){
  return {
    home:CHARACTERS.some(x=>game.cigs>=x.appearsAt&&!game.seen.includes(x.id))||game.dramaEventPending||finalReady(),
    people:CHARACTERS.some(x=>game.seen.includes(x.id)&&(!game.recruited.includes(x.id)?game.cigs>=x.recruitCost:game.cigs>=relationCost(x))),
    night:unlockedLocations().length>1&&!game.nightSeen,
    rpg:PERKS.some(x=>level()>=x.level&&!game.perks.includes(x.id)),
    shop:ITEMS.some(x=>isItemVisible(x)&&!game.shopSeen.includes(x.id))
  };
}

function nav(){
  let tabs={home:'Ara',people:'Gent',night:'Nit',rpg:'Ronin',shop:'Tenda'},alerts=tabAlerts();
  $('#dock').innerHTML=Object.entries(tabs).map(([id,name])=>`<button class="${tab===id?'active':''}" onclick="setTab('${id}')"><span>${name}</span>${alerts[id]?'<i class="tab-badge" aria-label="Acció nova"></i>':''}</button>`).join('');
}

function home(){
  let cards=CHARACTERS.filter(x=>game.cigs>=x.appearsAt&&!game.seen.includes(x.id)).map(x=>`<article class="card"><span class="tag">TROBALLA</span><h3>${x.icon} ${x.name}</h3><p>Una presència coneguda s’acosta.</p><button class="go" onclick="openEncounter('${x.id}')">VEURE QUÈ PASSA</button></article>`);
  if(game.dramaEventPending)cards.unshift(`<article class="card drama-card"><span class="tag">DRAMA MÀXIM</span><h3>💥 ${DRAMA_EVENT.title}</h3><p>${DRAMA_EVENT.text}</p><button class="go" onclick="openDrama()">FER-HI FRONT</button></article>`);
  if(finalReady()&&!game.finished)cards.unshift(`<article class="card final-card"><span class="tag">MISSIÓ FINAL</span><h3>🌙 ${FINAL_NIGHT.title}</h3><p>${FINAL_NIGHT.text}</p><button class="go" onclick="openFinal()">TRIAR COM ACABA</button></article>`);
  return `<span class="label">DIARI DE NIT · ${currentLocation().icon} ${currentLocation().name}</span><h2 class="headline">Què està passant?</h2>${cards.join('')||'<div class="status">Segueix fumant: la nit encara amaga nous reptes.</div>'}`;
}

function night(){
  let here=currentLocation();
  return `<span class="label">RUTA DE LA NIT</span><h2 class="headline">On vas ara?</h2><div class="drama-meter"><div><span>DRAMA SOCIAL</span><b>${game.drama}/100</b></div><i><em style="width:${game.drama}%"></em></i><small>${game.drama<30?'Nit civilitzada · +10% respecte':game.drama<70?'Tensió · la nit observa':game.drama<90?'La cosa es torça · recompenses més grosses':'Catàstrofe imminent'}</small></div><div class="people">${LOCATIONS.map(x=>{let open=x.unlock(game),selected=here.id===x.id;return `<article class="card location ${open?'':'locked'} ${selected?'selected':''}"><span class="icon">${open?x.icon:'?'}</span><div><span class="tag">${selected?'UBICACIÓ ACTUAL':open?'DESBLOQUEJADA':'DESCONEGUDA'}</span><h3>${open?x.name:'Un lloc encara no ha aparegut'}</h3><p>${open?x.description:'Segueix fent nit.'}</p></div>${open?`<button class="go" onclick="travel('${x.id}')">${selected?'HI ETS':'ANAR-HI'}</button>`:''}</article>`}).join('')}</div><div class="status" style="margin-top:14px">Cada minut, la ubicació modifica el drama. A 100, hi ha una crisi social.</div>`;
}

function render(){ save();$('#cigs').textContent=n(game.cigs);$('#titleLevel').textContent=`Nivell ${level()} · ${game.respect} respecte`;$('#rate').textContent=passiveRate()?`+${passiveRate().toFixed(2)} / s`:'+1 per acció';nav();$('#sheet').innerHTML=({home,people,night,rpg,shop})[tab](); }
function setTab(x){tab=x;if(x==='shop')ITEMS.filter(isItemVisible).forEach(item=>{if(!game.shopSeen.includes(item.id))game.shopSeen.push(item.id)});if(x==='night')game.nightSeen=true;render()}
function travel(id){let place=LOCATIONS.find(x=>x.id===id);if(!place||!place.unlock(game))return;game.location=id;say(`${place.name} · nova ruta de nit`);render()}

function applyNightOutcome(outcome){
  let loss=outcome.cigs||0;if(loss<0)loss=Math.ceil(loss*(1-Math.min(.5,(game.stats.endurance-1)*.05)));
  game.cigs=Math.max(0,game.cigs+loss);game.respect+=outcome.respect||0;game.xp+=outcome.xp||0;if(outcome.stat)game.stats[outcome.stat]+=outcome.amount||0;
  game.drama=Math.max(0,Math.min(100,game.drama+(outcome.drama||0)));
}
function openDrama(){$('#modal').innerHTML=`<article><button class="close" onclick="closeModal()">×</button><span class="tag">DRAMA MÀXIM</span><h2>💥 ${DRAMA_EVENT.title}</h2><p>${DRAMA_EVENT.text}</p>${DRAMA_EVENT.choices.map((c,i)=>`<button class="choice" onclick="resolveDrama(${i})">${c.label}</button>`).join('')}</article>`;$('#modal').classList.add('show')}
function resolveDrama(i){let choice=DRAMA_EVENT.choices[i];applyNightOutcome(choice);game.dramaEventPending=false;game.dramaWins++;closeModal();say(choice.result);render()}
function openFinal(){$('#modal').innerHTML=`<article><button class="close" onclick="closeModal()">×</button><span class="tag">MISSIÓ FINAL</span><h2>🌙 ${FINAL_NIGHT.title}</h2><p>${FINAL_NIGHT.text}</p>${unlockedLocations().map(x=>`<button class="choice" onclick="finishGame('${x.id}')">ACABAR A ${x.name.toUpperCase()}</button>`).join('')}</article>`;$('#modal').classList.add('show')}
function finishGame(id){let ending=FINAL_NIGHT.endings[id]||FINAL_NIGHT.endings.sofa;game.finished=true;$('#modal').innerHTML=`<article class="ending"><span class="tag">FINAL ACONSEGUIT</span><h2>🏆 ${ending.title}</h2><p>${ending.text}</p><button class="choice" onclick="closeModal();render()">TORNAR A LA NIT</button></article>`;render()}
function nightTick(){let now=Date.now(),mins=Math.floor((now-game.lastDramaTick)/60000);if(!mins)return;game.lastDramaTick+=mins*60000;game.drama=Math.max(0,Math.min(100,game.drama+currentLocation().dramaPerMinute*mins));if(game.drama>=100){game.dramaEventPending=true;say('DRAMA MÀXIM · hi ha una crisi pendent')}render()}

Object.assign(window,{setTab,travel,openDrama,resolveDrama,openFinal,finishGame});
setInterval(nightTick,1000);
render();
