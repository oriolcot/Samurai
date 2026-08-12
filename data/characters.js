// GUIÓ DEL JOC — aquest és l'únic arxiu que has d'editar per canviar personatges i diàlegs.
// Textos entre cometes: els pots reescriure sense por. No toquis els noms abans dels dos punts.

const CHARACTERS = [
  {
    // Identitat i desbloqueig
    id: 'sofa',
    name: "L'Ombra del Sofà",
    answers: ['ferran'], // Respostes acceptades quan el jugador n'endevina el nom.
    image: FERRAN_AVATAR,
    icon: '🛋️',
    appearsAt: 35,
    role: 'companyia estable',

    // Textos que veu el jugador en cada moment de la trobada.
    copy: {
      encounter: 'Hi ha algú al sofà. No diu res, però em resulta familiar.',
      revealed: 'El Ferran et mira. Potser diu alguna cosa, potser només està pensant en el sopar.',
      recruit: 'El Ferran ja forma part de la teva història. Vols que et doni un cop de mà cada nit?'
    },

    // Les tres opcions de diàleg. Pots canviar només "label" sense afectar res del joc.
    dialogues: [
      { label: 'Abraçar-lo en silenci', effect: { xp: 40, stat: 'endurance', amount: 1, respect: 1 } },
      { label: 'Preguntar si tot va bé', effect: { cigs: 50, xp: 15, stat: 'charisma', amount: 1 } },
      { label: 'Demanar-li 10€ per comprar tabac', effect: { cigs: -25, xp: 8, stat: 'street', amount: -1, respect: -2 } }
    ],

    // Progrés. Aquest bloc no cal tocar-lo per canviar el guió.
    recruitCost: 20,
    passive: { name: 'Presència estable', cost: 25, rate: 0.5 },
    active: { name: 'Enviar missatge al Ferran', chance: 0.6, multiplier: 1.5, duration: 120, cooldown: 180, penalty: 1, penaltyDuration: 20 }
  },

  {
    id: 'seen',
    name: 'Sempre enfadada',
    answers: ['ivette'],
    image: IVETTE_AVATAR,
    icon: '📱',
    appearsAt: 140,
    role: 'contacte improbable',
    copy: {
      encounter: "Apareix amb les mans plenes de nata pastissera. Sembla de bon humor, però li preguntes que què tal, i s'enfada. Amb tu, amb el Muli, i amb el Cot.",
      revealed: "És la Ivette. Ha tingut un molt mal dia. Uns dels gossos lletjos s'ha de tornar a operar.",
      recruit: 'La Ivette pot convertir el seu mal humor en una petita ajuda permanent. La reclutes?'
    },
    dialogues: [
      { label: "Seguir-li el rotllo, no dir res que l'enfadi més", effect: { cigs: 30, xp: 20, stat: 'street', amount: 1 } },
      { label: 'Preguntar si sou més que amics', effect: { respect: 4, xp: 150, stat: 'charisma', amount: 3 } },
      { label: 'No contestar-li en dues setmanes, perque no saps què dir-li', effect: { cigs: -35, xp: 2, stat: 'endurance', amount: 3, respect: -2 } }
    ],
    recruitCost: 80,
    passive: { name: 'Comentari negatiu', cost: 90, rate: 1.6 }
  },

  {
    id: 'reina',
    name: 'El Pianista del Reina',
    answers: ['cristobal', 'cristóbal', 'Cristobal', 'Cristóbal'],
    icon: '🍸',
    image: CRISTOBAL_AVATAR,
    appearsAt: 360,
    role: 'font de rumors',
    copy: {
      encounter: 'Et parla dels seus problemes mentre es recolza a la barra del Reina, d’una nit de 1998 i d’algú que ja no és com abans.',
      revealed: 'És el Cristóbal. Ja ha començat la història abans que tu arribessis.',
      recruit: 'El Pianista del Reina té informació i temps de sobres. El vols reclutar?'
    },
    dialogues: [
      { label: 'Escoltar la turra fins al final', effect: { xp: 28, stat: 'endurance', amount: 2 } },
      { label: 'Convidar-lo a una cervesa', effect: { cigs: -30, respect: 3, xp: 20, stat: 'charisma', amount: 2 } },
      { label: 'Preguntar per aquella nit del 1998', effect: { cigs: 22, xp: 30, stat: 'street', amount: 3 } }
    ],
    recruitCost: 250,
    passive: { name: 'Demanar-li Hotel Califòrnia', cost: 300, rate: 6 }
  },

  {
    id: 'vampire',
    name: 'El Company del V Rising',
    answers: ['inigo', 'iñigo', 'íñigo', 'Iñigo', 'Íñigo'],
    icon: '⚔️',
    image: INIGO_AVATAR,
    appearsAt: 800,
    role: 'aliat de llegenda',
    copy: {
      encounter: 'Diu que ja hi ha jugat abans i vol farmejar. Sap el que es fa i és tan viciat com tu, però és calb.',
      revealed: 'És l’Íñigo. No parla català, però ja farmejeu junts.',
      recruit: 'El Company pot mantenir el farm nocturn mentre la resta mira vídeos. El reclutes?'
    },
    dialogues: [
      { label: 'Demanar-li una build', effect: { cigs: 80, xp: 25, stat: 'street', amount: 2 } },
      { label: 'Proposar-li un farm intens', effect: { respect: 4, xp: 30, stat: 'charisma', amount: 2 } },
      { label: 'Desconnectar-se del Discord perquè et fa mandra parlar castellà', effect: { xp: 22, stat: 'endurance', amount: -1, respect: -1 } }
    ],
    recruitCost: 700,
    passive: { name: 'Farm nocturn', cost: 1300, rate: 20 }
  }
,
  {
    id:'muli', name:'El Muli', answers:['marc','muli','moline','moliné','marc moline','marc moliné'],
    image:MARC_MOLINE_AVATAR, icon:'🧥', appearsAt:1800, role:'contacte de confiança',
    copy:{
      encounter:'Algú t’espera sota un fanal amb cara de saber massa coses.',
      revealed:'És el Marc Moliné. No queda clar si venia a ajudar o a supervisar.',
      recruit:'El Muli sempre té una opinió disponible. La vols convertir en producció?'
    },
    dialogues:[
      {label:'Demanar-li un veredicte sincer',effect:{cigs:90,xp:36,respect:2,stat:'charisma',amount:2}},
      {label:'Dir-li que tot està sota control',effect:{cigs:120,xp:30,stat:'street',amount:2}},
      {label:'Explicar-li el pla sencer sense que t’ho hagi demanat',effect:{cigs:-85,xp:16,respect:-2,stat:'endurance',amount:1}}
    ],
    recruitCost:1500, passive:{name:'Opinió amb criteri',cost:1900,rate:34}
  },
  {
    id:'gijon', name:'El Filòsof', answers:['marc','gijon','gijón','marc gijon','marc gijón','xixo','chicho','filosof','filòsof'],
    image:MARC_GIJON_AVATAR, icon:'🎙️', appearsAt:3800, role:'pensador nocturn',
    copy:{
      encounter:'Sents una frase molt ben construïda que ningú havia demanat.',
      revealed:'És el Marc Gijón. Ha vingut amb una teoria, una rèplica i el final encara per escriure.',
      recruit:'El Filòsof pot transformar qualsevol pausa incòmoda en una idea amb rendiment.'
    },
    dialogues:[
      {label:'Preguntar-li què en pensa de debò',effect:{cigs:180,xp:48,respect:3,stat:'charisma',amount:2}},
      {label:'Fer que la teoria serveixi per farmejar',effect:{cigs:240,xp:40,stat:'street',amount:3}},
      {label:'Dir «literalment» sis cops abans que acabi',effect:{cigs:-150,xp:20,respect:-3,stat:'endurance',amount:1}}
    ],
    recruitCost:3200, passive:{name:'Idea que dona voltes',cost:4100,rate:68}
  },
  {
    id:'berni', name:'El Berni', answers:['bernat','berni','bernat capdevila'],
    image:BERNAT_CAPDEVILA_AVATAR, icon:'🗂️', appearsAt:7600, role:'aliat metòdic',
    copy:{
      encounter:'Hi ha algú que sembla haver arribat amb el pla de la nit en tres versions.',
      revealed:'És el Bernat Capdevila. Té cara de saber quin és el següent pas, cosa que ja és sospitosa.',
      recruit:'El Berni pot posar ordre al caos. O almenys numerar-lo.'
    },
    dialogues:[
      {label:'Demanar-li que posi ordre a la ruta',effect:{cigs:420,xp:58,respect:4,stat:'street',amount:3}},
      {label:'Escoltar el pla fins al final',effect:{cigs:280,xp:52,stat:'endurance',amount:3}},
      {label:'Improvisar una reunió amb ordre del dia inventat',effect:{cigs:-260,xp:24,respect:-3,stat:'charisma',amount:1}}
    ],
    recruitCost:6500, passive:{name:'Full de ruta mental',cost:8200,rate:140}
  },
  {
    id:'marta', name:'La Drogueria', answers:['marta','droga','drogues'],
    image:MARTA_AVATAR, icon:'🧪', appearsAt:14500, role:'contacte de risc baix',
    copy:{
      encounter:'Veus unes ulleres enormes reflectint el neó. Algú ja ha detectat que aquesta nit s’allarga.',
      revealed:'És la Marta. Parla amb calma, que és exactament el que fa més sospitosa la situació.',
      recruit:'La Marta sap trobar solucions estranyament eficients quan la nit es complica.'
    },
    dialogues:[
      {label:'Preguntar si té un pla tranquil',effect:{cigs:760,xp:72,respect:5,stat:'charisma',amount:3}},
      {label:'Demanar-li una solució creativa',effect:{cigs:900,xp:65,stat:'street',amount:4}},
      {label:'Dir que tens una idea millor i no explicar quina',effect:{cigs:-520,xp:30,respect:-4,stat:'endurance',amount:1}}
    ],
    recruitCost:12500, passive:{name:'Solució inesperada',cost:15800,rate:285}
  }
];
