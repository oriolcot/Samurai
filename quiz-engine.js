// MOTOR DE MINIJOCS — les preguntes i respostes s'editen a data/questions.js.
game.quizClicks ||= 0;
game.quizNextAt ||= 25;
game.quizAnswered ||= [];
game.quizPending ||= false;

function normaliseAnswer(value){
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()
    .replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
}
function availableQuiz(){
  let choices=QUIZZES.filter(quiz=>!game.quizAnswered.includes(quiz.id));
  return choices[Math.floor(Math.random()*choices.length)];
}
function maybeOpenQuiz(){
  let quiz=availableQuiz();
  if(!quiz)return;
  if(game.quizPending || game.quizClicks>=game.quizNextAt){
    game.quizPending=true;
    if(!$('#modal').classList.contains('show'))openQuiz();
  }
}
function openQuiz(){
  let quiz=availableQuiz();
  if(!quiz){game.quizPending=false;return;}
  $('#modal').innerHTML=`<article class="quiz-modal"><span class="tag">MINIJOC · ${quiz.title}</span><h2>🧠 ${quiz.question}</h2><p>${quiz.hint}</p><input id="quizAnswer" class="quiz-answer" placeholder="Escriu la resposta…" autocomplete="off" autocapitalize="words"><p id="quizError" class="quiz-error"></p><button class="choice quiz-submit" onclick="answerQuiz('${quiz.id}')">COMPROVAR RESPOSTA</button><button class="quiz-later" onclick="postponeQuiz()">MÉS TARD</button></article>`;
  $('#modal').classList.add('show');
  setTimeout(()=>$('#quizAnswer')?.focus(),80);
}
function answerQuiz(id){
  let quiz=QUIZZES.find(x=>x.id===id), answer=normaliseAnswer($('#quizAnswer').value);
  if(!answer)return $('#quizError').textContent='Escriu alguna cosa, encara que sigui amb convicció.';
  let correct=quiz.answers.map(normaliseAnswer).includes(answer);
  game.quizAnswered.push(id);
  game.quizPending=false;
  game.quizNextAt=game.quizClicks+30;
  if(correct){
    game.cigs+=quiz.reward.cigs||0;
    game.xp+=quiz.reward.xp||0;
    game.respect+=quiz.reward.respect||0;
    say(`MINIJOC SUPERAT · +${quiz.reward.cigs} calades, +${quiz.reward.respect} respecte`);
  }else say('Minijoc fallat · cap penalització');
  $('#modal').innerHTML=`<article class="quiz-modal quiz-result"><span class="tag">${correct?'RESPOSTA CORRECTA':'NO ERA AQUESTA'}</span><h2>${correct?'🎉 Ben jugat':'🤷 Gairebé'}</h2><p>${correct?quiz.success:quiz.failure}</p><button class="choice" onclick="closeModal();render()">TORNAR A LA NIT</button></article>`;
  render();
}
function postponeQuiz(){
  game.quizPending=false;
  game.quizNextAt=game.quizClicks+10;
  closeModal();
  say('La pregunta espera a la barra.');
  render();
}
const originalSmokeForQuiz=smoke;
$('#smoke').onclick=()=>{
  originalSmokeForQuiz();
  game.quizClicks++;
  maybeOpenQuiz();
};
Object.assign(window,{openQuiz,answerQuiz,postponeQuiz});
