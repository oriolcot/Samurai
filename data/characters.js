// PERSONATGES — per afegir-ne un, copia una entrada i canvia les dades.
const CHARACTERS = [
  {id:'sofa',name:"L'Ombra del Sofà",icon:'🛋️',appearsAt:35,role:'companyia estable',text:"Hi ha algú al sofà. No diu res, però la nit sembla menys llarga.",choices:[['Respectar el silenci',{xp:14,stat:'endurance',amount:1,respect:1}],['Preguntar si tot va bé',{cigs:16,xp:10,stat:'charisma',amount:1}]]},
  {id:'seen',name:'La Filòsofa del Vist',icon:'📱',appearsAt:140,role:'contacte improbable',text:"Deixa una idea brillant a l’aire i, abans que puguis respondre, ja mira el mòbil.",choices:[['Seguir-li el rotllo',{cigs:28,xp:16,stat:'street',amount:1}],['Fer una pregunta honesta',{respect:2,xp:15,stat:'charisma',amount:1}]]},
  {id:'reina',name:'El Cronista del Reina',icon:'🍸',appearsAt:360,role:'font de rumors',text:"Et parla del gel artesanal, d’una nit de 2018 i d’algú que ja no és com abans.",choices:[['Escoltar fins al final',{xp:28,stat:'endurance',amount:2}],['Convidar-lo a una cervesa',{cigs:-30,respect:3,xp:20,stat:'charisma',amount:1}]]},
  {id:'vampire',name:'El Ronin de V Rising',icon:'⚔️',appearsAt:800,role:'aliat de llegenda',text:"Diu que té una build perfecta. No concreta per a què, però és convincent.",choices:[['Demanar-li la build',{cigs:80,xp:25,stat:'street',amount:2}],['Proposar una aventura',{respect:4,xp:30,stat:'charisma',amount:2}]]}
];
