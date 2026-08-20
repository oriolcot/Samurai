// TENDA — l'ordre, appearsAt i requiresWins defineixen quan es mostra cada objecte.
const ITEMS = [
  {id:'clipper',name:'Clipper Jamaica',icon:'🇯🇲',slot:'accessory',cost:20,currency:'cigs',appearsAt:0,perk:'10% de calada crítica ×5',description:'El primer i únic objecte de la tenda al començament.'},
  {id:'cap',name:'Gorra de festa',icon:'🧢',slot:'head',cost:90,currency:'cigs',appearsAt:180,perk:'+1 Carisma en trobades · +5% crític a la ronda',combat:{crit:.05},description:'Va sobreviure a nits que no haurien d’haver passat.'},
  {id:'coat',name:'Jaqueta del Reina',icon:'🧥',slot:'body',cost:5,currency:'respect',appearsAt:430,perk:'Les sortides costen menys · +1 defensa a la ronda',combat:{armor:1},description:'El personal et deixa passar sense preguntar res.'},
  {id:'ring',name:'Anell sospitós',icon:'💍',slot:'accessory',cost:9,currency:'respect',appearsAt:900,perk:'Un reintentar per sessió · +1 resistència a la ronda',combat:{health:1},description:'Ningú recorda d’on va sortir.'},
  {id:'keyring',name:'Clauer pesat',icon:'🔑',slot:'weapon',cost:10,currency:'ronda',appearsAt:300,requiresWins:1,perk:'+2 força a la ronda',combat:{attack:2},description:'No és una arma. Però pesa més del que hauria.'},
  {id:'shoes',name:'Botes de tornar tard',icon:'🥾',slot:'feet',cost:26,currency:'ronda',appearsAt:650,requiresWins:3,perk:'+1 defensa a la ronda',combat:{armor:1},description:'No et porten a casa, però almenys aguanten la ruta.'},
  {id:'wallet',name:'Cartera primíssima',icon:'👛',slot:'trinket',cost:42,currency:'ronda',appearsAt:1200,requiresWins:6,perk:'+3 resistència a la ronda',combat:{health:3},description:'Hi ha coses que no haurien de cabre en una cartera.'},
  {id:'chain',name:'Cadena discreta',icon:'⛓️',slot:'weapon',cost:72,currency:'ronda',appearsAt:2400,requiresWins:10,perk:'+4 força · +4% crític a la ronda',combat:{attack:4,crit:.04},description:'Discreta només des de lluny.'}
];