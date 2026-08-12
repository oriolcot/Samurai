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
      encounter: 'Hi ha algú al sofà. No diu res, però la nit sembla menys llarga.',
      revealed: 'El Ferran et mira. Potser diu alguna cosa, potser només està processant la vida.',
      recruit: 'El Ferran ja forma part de la història. Vols que et doni un cop de mà cada nit?'
    },

    // Les tres opcions de diàleg. Pots canviar només "label" sense afectar res del joc.
    dialogues: [
      { label: 'Respectar el silenci', effect: { xp: 14, stat: 'endurance', amount: 1, respect: 1 } },
      { label: 'Preguntar si tot va bé', effect: { cigs: 16, xp: 10, stat: 'charisma', amount: 1 } },
      { label: 'Demanar-li 20€ sense context', effect: { cigs: -25, xp: 8, stat: 'street', amount: 1, respect: -2 } }
    ],

    // Progrés. Aquest bloc no cal tocar-lo per canviar el guió.
    recruitCost: 20,
    passive: { name: 'Presència estable', cost: 25, rate: 0.5 },
    active: { name: 'Enviar missatge al Ferran', chance: 0.6, multiplier: 1.5, duration: 120, cooldown: 180, penalty: 1, penaltyDuration: 20 }
  },

  {
    id: 'seen',
    name: 'La Filòsofa del Vist',
    answers: ['ivette'],
    image: IVETTE_AVATAR,
    icon: '📱',
    appearsAt: 140,
    role: 'contacte improbable',
    copy: {
      encounter: 'Deixa una idea brillant a l’aire i, abans que puguis respondre, ja mira el mòbil.',
      revealed: 'És la Ivette. Té una teoria preparada i trenta pestanyes obertes.',
      recruit: 'La Ivette pot convertir les seves idees en una petita ajuda permanent. La reclutes?'
    },
    dialogues: [
      { label: 'Seguir-li el rotllo', effect: { cigs: 28, xp: 16, stat: 'street', amount: 1 } },
      { label: 'Fer una pregunta honesta', effect: { respect: 2, xp: 15, stat: 'charisma', amount: 1 } },
      { label: 'Enviar-li un àudio de 4 minuts a les 03:17', effect: { cigs: -35, xp: 8, stat: 'endurance', amount: 1, respect: -2 } }
    ],
    recruitCost: 80,
    passive: { name: 'Idees a mitges', cost: 90, rate: 1.6 }
  },

  {
    id: 'reina',
    name: 'El Cronista del Reina',
    answers: ['cristobal', 'cristóbal'],
    icon: '🍸',
    appearsAt: 360,
    role: 'font de rumors',
    copy: {
      encounter: 'Et parla del gel artesanal, d’una nit de 2018 i d’algú que ja no és com abans.',
      revealed: 'És el Cristóbal. Ja ha començat la història abans que tu arribessis.',
      recruit: 'El Cronista té informació i temps de sobres. El vols reclutar?'
    },
    dialogues: [
      { label: 'Escoltar fins al final', effect: { xp: 28, stat: 'endurance', amount: 2 } },
      { label: 'Convidar-lo a una cervesa', effect: { cigs: -30, respect: 3, xp: 20, stat: 'charisma', amount: 1 } },
      { label: 'Preguntar pel gel artesanal', effect: { cigs: 22, xp: 22, stat: 'street', amount: 2 } }
    ],
    recruitCost: 250,
    passive: { name: 'Rumors de barra', cost: 300, rate: 6 }
  },

  {
    id: 'vampire',
    name: 'El Ronin de V Rising',
    answers: ['oriol'],
    icon: '⚔️',
    appearsAt: 800,
    role: 'aliat de llegenda',
    copy: {
      encounter: 'Diu que té una build perfecta. No concreta per a què, però és convincent.',
      revealed: 'És l’Oriol. No t’ha dit encara el pla, però ja t’hi ha apuntat.',
      recruit: 'El Ronin pot mantenir el farm nocturn mentre la resta mira vídeos. El reclutes?'
    },
    dialogues: [
      { label: 'Demanar-li la build', effect: { cigs: 80, xp: 25, stat: 'street', amount: 2 } },
      { label: 'Proposar una aventura', effect: { respect: 4, xp: 30, stat: 'charisma', amount: 2 } },
      { label: 'Demanar-li si ha dormit', effect: { xp: 22, stat: 'endurance', amount: 2, respect: 1 } }
    ],
    recruitCost: 700,
    passive: { name: 'Farm nocturn', cost: 1300, rate: 20 }
  }
];
