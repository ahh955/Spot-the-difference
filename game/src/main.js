// Bootstrap: wires the canvases, HUD and buttons, then starts the loop.
// URL helpers for play-testing and screenshots (the game itself renders
// the state; nothing here edits a pixel):
//   ?scene=0&found=0,1,3&time=92&hints=2  — jump into a scene mid-game
//   ?screen=complete&scene=0&stars=3     — the scene-complete screen
//   ?screen=results                      — the final results screen

import { createGame } from './game.js';
import { wireInput } from './input.js';
import { SCENES } from './scenes.js';

const $ = (id) => document.getElementById(id);

const canvases = { left: $('panel-left'), right: $('panel-right') };
const ui = {
  sceneName: $('scene-name'), sceneTag: $('scene-tag'), dots: $('scene-dots'),
  counter: $('counter'), timer: $('timer'), timerBar: $('timer-bar'),
  hints: $('hint-btn'), strikes: $('strikes'), score: $('score'),
  completeTitle: $('complete-title'), completeStars: $('complete-stars'),
  completeDetail: $('complete-detail'), completeBonus: $('complete-bonus'),
  nextBtn: $('next-btn'),
  timeupDetail: $('timeup-detail'),
  resultsStars: $('results-stars'), resultsScore: $('results-score'),
  resultsRows: $('results-rows'),
};

const game = createGame(canvases, ui);
wireInput(canvases, game);

$('play-btn').addEventListener('click', () => game.startScene(0));
$('hint-btn').addEventListener('click', () => game.useHint());
$('pause-btn').addEventListener('click', () => game.togglePause());
$('resume-btn').addEventListener('click', () => game.togglePause());
$('next-btn').addEventListener('click', () => game.next());
$('retry-btn').addEventListener('click', () => game.retry());
$('again-btn').addEventListener('click', () => game.restart());
$('title-btn').addEventListener('click', () => game.toTitle());

const params = new URLSearchParams(location.search);
game.start();

if (params.get('screen') === 'results') {
  game.state.sceneScores = [1240, 1080, 960];
  game.state.stars = [3, 2, 3];
  game.state.score = 3280;
  game.showResults();
} else if (params.get('screen') === 'complete') {
  const i = Math.min(SCENES.length - 1, parseInt(params.get('scene') || '0', 10));
  game.state.sceneIndex = i;
  game.state.found = SCENES[i].diffs.map((d, idx) => ({ index: idx, at: performance.now() - 2000 }));
  game.state.timeLeft = 68;
  game.state.strikes = 1;
  game.state.score = 700;
  game.state.screen = 'complete';
  const stars = parseInt(params.get('stars') || '3', 10);
  ui.completeTitle.textContent = `${SCENES[i].name} — cleared!`;
  ui.completeStars.textContent = '★'.repeat(stars) + '☆'.repeat(3 - stars);
  ui.completeDetail.textContent = `7 finds · 1:22 played · 1 strike`;
  ui.completeBonus.textContent = `Time bonus +136 · Clean bonus +200 · Scene 1036 pts`;
  ui.nextBtn.textContent = i + 1 < SCENES.length ? 'Next scene →' : 'See results →';
  document.getElementById('complete-screen').classList.remove('hidden');
  document.getElementById('title-screen').classList.add('hidden');
  game.updateHud();
} else if (params.has('scene') || params.has('found')) {
  const i = Math.min(SCENES.length - 1, parseInt(params.get('scene') || '0', 10));
  const found = (params.get('found') || '').split(',').filter(Boolean).map(Number);
  const preset = {
    found,
    time: params.has('time') ? parseInt(params.get('time'), 10) : undefined,
    hints: params.has('hints') ? parseInt(params.get('hints'), 10) : undefined,
  };
  game.startScene(i, preset);
}
