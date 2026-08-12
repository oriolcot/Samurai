// NITS I DRAMA — edita aquests textos i xifres per crear noves ubicacions o crisis.
const LOCATIONS = [
  { id:'sofa', name:"Sofà de Ca N'Aurell", icon:'🛋️', unlock:()=>true, bonus:1.10, dramaPerMinute:-3, description:'Tot baixa de revolucions. Producció +10% i el drama es refreda.' },
  { id:'reina', name:'El Reina', icon:'🍸', unlock:game=>game.recruited.includes('reina'), bonus:1, dramaPerMinute:5, description:'Hi ha més històries, però també més decisions que no havies de prendre.' }
];

const DRAMA_EVENT = {
  title:'La conversa que no havies de començar',
  text:'El drama ha arribat al màxim. Algú ha dit «jo només ho dic» i ja no hi ha marxa enrere.',
  choices:[
    { label:'Escoltar i respirar abans de respondre', drama:-55, respect:5, xp:30, stat:'endurance', amount:1, result:'La conversa no millora, però almenys no acaba al grup de WhatsApp.' },
    { label:'Fer una broma tan dolenta que canviï el tema', drama:-40, cigs:60, xp:30, stat:'charisma', amount:1, result:'Ningú riu gaire, però la tensió es desfà una mica.' },
    { label:'Doblar l’aposta i explicar la teva versió', drama:-70, cigs:-80, xp:45, stat:'street', amount:1, result:'Guanyes la discussió. Perds la pau mental.' }
  ]
};

const FINAL_NIGHT = {
  cigs:100000,
  title:"L'Última Nit",
  text:'No queda ningú per descobrir. Només queda decidir com s’acaba aquesta nit.',
  endings:{
    sofa:{ title:'L’amic que encara respon', text:'Has acabat al sofà. No s’ha resolt res, però hi ha algú al costat. I per avui, ja està bé.' },
    reina:{ title:'Emperador d’Igualada, per accident', text:'La nit s’ha fet eterna al Reina. Ningú sap qui va pagar l’última ronda, però la llegenda ja corre.' }
  }
};
