// RONDA — combat lleuger i opcional. No modifica el guió ni els personatges.
game.ronda ||= 0;
game.combat ||= {wins:0,losses:0,nextAt:0,active:null};

function combatItems(){return game.owned.map(id=>ITEMS.find(x=>x.id===id)).filter(Boolean).filter(x=>game.equipped[x.slot]===x.id)}
function combatStat(name){return combatItems().reduce((sum,item)=>sum+(item.combat?.[name]||0),0)}
function combatPower(){return 2+game.stats.street+combatStat('attack')}
function combatArmor(){return Math.floor((game.stats.endurance-1)/3)+combatStat('armor')}
function combatCrit(){return Math.min(.55,.06+(game.stats.charisma-1)*.025+combatStat('crit'))}
function combatMaxHp(){return 7+game.stats.endurance*3+combatStat('health')}
function availableRivals(){return RIVALS.filter(x=>game.combat.wins>=x.wins)}
function chosenRival(){let list=availableRivals();return list[Math.floor(Math.random()*list.length)]||RIVALS[0]}
function combatCooldown(){return Math.max(0,Math.ceil((game.combat.nextAt-Date.now())/1000))}
function combatReady(){return !game.combat.active&&combatCooldown()===0}

function combatCard(){
  let active=game.combat.active;
  if(active){
    let rival=RIVALS.find(x=>x.id===active.id),enemyPct=Math.max(0,active.hp/rival.hp*100),youPct=Math.max(0,active.youHp/active.maxHp*100);
    return `<section class="combat-card"><span class="tag">RONDA ACTIVA</span><div class="combat-title"><span>${rival.icon}</span><div><h3>${rival.name}</h3><p>${rival.description}</p></div></div><div class="combat-bar"><small>ELL · ${Math.max(0,active.hp)}/${rival.hp}</small><i><em style="width:${enemyPct}%"></em></i></div><div class="combat-bar player"><small>TU · ${Math.max(0,active.youHp)}/${active.maxHp}</small><i><em style="width:${youPct}%"></em></i></div><div class="combat-actions"><button class="go" onclick="combatMove('push')">PLANTAR CARA<br><small>${combatPower()} de força</small></button><button class="go ghost" onclick="combatMove('calm')">RESPIRAR<br><small>protecció + recuperació</small></button></div></section>`;
  }
  let locked=game.combat.nextAt>Date.now(),next=availableRivals().at(-1);
  return `<section class="combat-card"><span class="tag">RONDA DE NIT · ${n(game.ronda)} FITXES</span><div class="combat-title"><span>⚔️</span><div><h3>La nit es complica</h3><p>Una ronda curta per guanyar fitxes, respecte i experiència.</p></div></div><div class="combat-summary"><span>Força <b>${combatPower()}</b></span><span>Defensa <b>${combatArmor()}</b></span><span>Crític <b>${Math.round(combatCrit()*100)}%</b></span></div><button class="go ${locked?'cooldown':''}" onclick="startCombat()">${locked?`TORNA EN ${combatCooldown()}s`:`FER FRONT · ${next.icon} ${next.name}`}</button><small class="combat-note">Calle fa més força, Carisma augmenta els crítics i Aguant et dona més resistència.</small></section>`;
}

function night(){
  let here=currentLocation();
  return `<span class="label">RUTA DE LA NIT</span><h2 class="headline">On vas ara?</h2><div class="drama-meter"><div><span>DRAMA SOCIAL</span><b>${game.drama}/100</b></div><i><em style="width:${game.drama}%"></em></i><small>${game.drama<30?'Nit civilitzada · +10% respecte':game.drama<70?'Tensió · la nit observa':game.drama<90?'La cosa es torça · recompenses més grosses':'Catàstrofe imminent'}</small></div>${combatCard()}<div class="people">${LOCATIONS.map(x=>{let open=x.unlock(game),selected=here.id===x.id;return `<article class="card location ${open?'':'locked'} ${selected?'selected':''}"><span class="icon">${open?x.icon:'?'}</span><div><span class="tag">${selected?'UBICACIÓ ACTUAL':open?'DESBLOQUEJADA':'DESCONEGUDA'}</span><h3>${open?x.name:'Un lloc encara no ha aparegut'}</h3><p>${open?x.description:'Segueix fent nit.'}</p></div>${open?`<button class="go" onclick="travel('${x.id}')">${selected?'HI ETS':'ANAR-HI'}</button>`:''}</article>`}).join('')}</div><div class="status" style="margin-top:14px">Cada minut, la ubicació modifica el drama. A 100, hi ha una crisi social.</div>`;
}

function startCombat(){
  if(!combatReady())return say(`Encara recuperes l’alè · ${combatCooldown()}s`);
  let rival=chosenRival(),maxHp=combatMaxHp();
  game.combat.active={id:rival.id,hp:rival.hp,youHp:maxHp,maxHp,guard:0};
  say(`${rival.name} · no pots fer veure que no ho has vist`);
  render();
}
function combatMove(move){
  let state=game.combat.active;if(!state)return;
  let rival=RIVALS.find(x=>x.id===state.id);
  if(move==='push'){
    let critical=Math.random()<combatCrit(),damage=combatPower()+(critical?Math.max(2,game.stats.charisma):0);
    state.hp-=damage;say(critical?`RÈPLICA CRÍTICA · ${damage} d’impacte`:`Aguantes el tipus · ${damage} d’impacte`);
  }else{
    state.guard=2+combatArmor();state.youHp=Math.min(state.maxHp,state.youHp+1+Math.floor(game.stats.endurance/4)+(has('tempo')?1:0));say(has('tempo')?'Sang freda · recuperes un punt extra.':'Respirar també és una tàctica.');
  }
  if(state.hp<=0)return combatWin(rival);
  let incoming=Math.max(1,rival.power-combatArmor()-state.guard);
  state.guard=0;state.youHp-=incoming;
  if(state.youHp<=0)return combatLose(rival);
  render();
}
function combatWin(rival){
  let reward=rival.rewards,locationBonus=currentLocation().bonus;
  game.cigs+=Math.round(reward.cigs*locationBonus);game.xp+=reward.xp;game.respect+=reward.respect;game.ronda+=reward.ronda;
  game.drama=Math.max(0,Math.min(100,game.drama+reward.drama));game.combat.wins++;game.combat.active=null;game.combat.nextAt=Date.now()+35000;
  if(game.drama>=100)game.dramaEventPending=true;
  say(`RONDA SUPERADA · +${reward.ronda} fitxes, +${reward.respect} respecte`);render();
}
function combatLose(rival){
  let loss=Math.max(4,Math.ceil(rival.power*4*(1-Math.min(.5,(game.stats.endurance-1)*.05))));
  game.cigs=Math.max(0,game.cigs-loss);game.drama=Math.min(100,game.drama+6);game.combat.losses++;game.combat.active=null;game.combat.nextAt=Date.now()+20000;
  if(game.drama>=100)game.dramaEventPending=true;
  say(`La nit guanya aquesta · -${loss} calades`);render();
}
function tabAlerts(){
  return {
    home:CHARACTERS.some(x=>game.cigs>=x.appearsAt&&!game.seen.includes(x.id))||game.dramaEventPending||finalReady(),
    people:CHARACTERS.some(x=>game.seen.includes(x.id)&&(!game.recruited.includes(x.id)?game.cigs>=x.recruitCost:game.cigs>=relationCost(x))),
    night:combatReady()||(unlockedLocations().length>1&&!game.nightSeen),
    rpg:PERKS.some(x=>level()>=x.level&&!game.perks.includes(x.id)),
    shop:ITEMS.some(x=>isItemVisible(x)&&!game.shopSeen.includes(x.id))
  };
}
Object.assign(window,{startCombat,combatMove});
render();