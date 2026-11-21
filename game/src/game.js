// Game state: scenes, timer, hints, strikes, scoring and the screens.
// The loop is one requestAnimationFrame that redraws the panels and the HUD.

import { SCENES } from './scenes.js';
import { renderAll } from './render.js';
import {
  HINTS_PER_SCENE, HINT_FLASH_MS, WRONG_CLICK_PENALTY_S, MAX_STRIKES,
  POINTS_PER_FIND, TIME_BONUS_PER_SECOND, CLEAN_BONUS_PER_STRIKE_LEFT,
  STAR3_TIME_FRAC, STAR3_MAX_STRIKES, STAR2_TIME_FRAC,
} from './config.js';

function beep(freq, ms, type = 'sine', gain = 0.08) {
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    const ac = beep.ctx || (beep.ctx = new AC());
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.value = gain;
    o.connect(g).connect(ac.destination);
    o.start();
    o.stop(ac.currentTime + ms / 1000);
  } catch (e) { /* audio is a garnish, never a blocker */ }
}

const fanfare = () => { [523, 659, 784].forEach((f, i) => setTimeout(() => beep(f, 160, 'triangle'), i * 110)); };

export function createGame(canvases, ui) {
  const state = {
    screen: 'title', // title | play | paused | complete | timeup | results
    sceneIndex: 0,
    found: [], // {index, at}
    wrongs: [], // {x, y, at}
    hint: null, // {index, at, until}
    hintsLeft: HINTS_PER_SCENE,
    strikes: 0,
    timeLeft: 0,
    lastTick: 0,
    score: 0,
    sceneScores: [],
    stars: [],
    paused: false,
  };

  const scene = () => SCENES[state.sceneIndex];
  const remaining = () => scene().diffs.length - state.found.length;

  function fmt(s) {
    const m = Math.floor(s / 60);
    const r = Math.floor(s % 60);
    return `${m}:${String(r).padStart(2, '0')}`;
  }

  function starsFor(timeLeft, strikes, par) {
    if (timeLeft >= par * STAR3_TIME_FRAC && strikes <= STAR3_MAX_STRIKES) return 3;
    if (timeLeft >= par * STAR2_TIME_FRAC) return 2;
    return 1;
  }

  function show(id) {
    for (const el of document.querySelectorAll('.overlay')) el.classList.add('hidden');
    const el = document.getElementById(id);
    if (el) el.classList.remove('hidden');
  }

  function updateHud() {
    const s = scene();
    ui.sceneName.textContent = s.name;
    ui.sceneTag.textContent = s.tagline;
    ui.counter.textContent = `${remaining()} to find`;
    ui.counter.classList.toggle('done', remaining() === 0);
    ui.timer.textContent = fmt(Math.max(0, state.timeLeft));
    ui.timerBar.style.width = `${Math.max(0, (state.timeLeft / s.par) * 100)}%`;
    ui.timerBar.classList.toggle('low', state.timeLeft <= 30);
    ui.hints.textContent = `Hint (${state.hintsLeft})`;
    ui.hints.disabled = state.hintsLeft <= 0 || state.screen !== 'play';
    ui.strikes.textContent = `Strikes: ${state.strikes}`;
    ui.score.textContent = `Score ${state.score}`;
    ui.dots.innerHTML = SCENES.map((sc, i) =>
      `<span class="dot${i === state.sceneIndex ? ' current' : ''}${i < state.sceneIndex ? ' passed' : ''}">${i + 1}</span>`).join('');
  }

  function startScene(i, preset) {
    state.sceneIndex = i;
    state.found = preset?.found?.map((index) => ({ index, at: performance.now() - 1000 })) || [];
    if (preset?.found?.length) state.score += preset.found.length * POINTS_PER_FIND;
    state.wrongs = [];
    state.hint = null;
    state.hintsLeft = preset?.hints ?? HINTS_PER_SCENE;
    state.strikes = 0;
    state.timeLeft = preset?.time ?? scene().par;
    state.screen = 'play';
    state.paused = false;
    show('none');
    updateHud();
  }

  function completeScene() {
    const s = scene();
    const timeBonus = Math.round(state.timeLeft) * TIME_BONUS_PER_SECOND;
    const cleanBonus = (MAX_STRIKES - state.strikes) * CLEAN_BONUS_PER_STRIKE_LEFT;
    const stars = starsFor(state.timeLeft, state.strikes, s.par);
    const sceneScore = state.found.length * POINTS_PER_FIND + timeBonus + cleanBonus;
    state.score += sceneScore;
    state.sceneScores.push(sceneScore);
    state.stars.push(stars);
    state.screen = 'complete';
    fanfare();
    ui.completeTitle.textContent = `${s.name} — cleared!`;
    ui.completeStars.textContent = '★'.repeat(stars) + '☆'.repeat(3 - stars);
    ui.completeDetail.textContent =
      `${state.found.length} finds · ${fmt(s.par - state.timeLeft)} played · ${state.strikes} strikes`;
    ui.completeBonus.textContent = `Time bonus +${timeBonus} · Clean bonus +${cleanBonus} · Scene ${sceneScore} pts`;
    ui.nextBtn.textContent = state.sceneIndex + 1 < SCENES.length ? 'Next scene →' : 'See results →';
    show('complete-screen');
    updateHud();
  }

  function timeUp() {
    state.screen = 'timeup';
    beep(180, 300, 'sawtooth', 0.06);
    ui.timeupDetail.textContent =
      `${state.found.length} of ${scene().diffs.length} found in ${scene().name}.`;
    show('timeup-screen');
    updateHud();
  }

  function showResults() {
    state.screen = 'results';
    const totalStars = state.stars.reduce((a, b) => a + b, 0);
    ui.resultsStars.textContent = '★'.repeat(totalStars) + '☆'.repeat(9 - totalStars);
    ui.resultsScore.textContent = `${state.score} points`;
    ui.resultsRows.innerHTML = SCENES.map((s, i) =>
      `<div class="result-row"><span>${s.name}</span><span>${'★'.repeat(state.stars[i] || 0)}${'☆'.repeat(3 - (state.stars[i] || 0))}</span><span>${state.sceneScores[i] || 0} pts</span></div>`).join('');
    show('results-screen');
    updateHud();
  }

  function clickAt(x, y) {
    if (state.screen !== 'play' || state.paused) return;
    const s = scene();
    const hit = s.diffs.findIndex((d, i) =>
      !state.found.some((f) => f.index === i) &&
      Math.hypot(d.x - x, d.y - y) <= d.r + 6);
    if (hit >= 0) {
      state.found.push({ index: hit, at: performance.now() });
      state.score += POINTS_PER_FIND;
      beep(880, 120, 'triangle');
      setTimeout(() => beep(1174, 140, 'triangle'), 70);
      if (remaining() === 0) setTimeout(completeScene, 650);
    } else {
      state.wrongs.push({ x, y, at: performance.now() });
      state.strikes += 1;
      state.timeLeft = Math.max(0, state.timeLeft - WRONG_CLICK_PENALTY_S);
      beep(160, 160, 'sawtooth', 0.05);
      if (state.strikes >= MAX_STRIKES) timeUp();
    }
    updateHud();
  }

  function useHint() {
    if (state.screen !== 'play' || state.paused || state.hintsLeft <= 0) return;
    const s = scene();
    const open = s.diffs.map((d, i) => i).filter((i) => !state.found.some((f) => f.index === i));
    if (!open.length) return;
    const pick = open[Math.floor(Math.random() * open.length)];
    state.hintsLeft -= 1;
    state.hint = { index: pick, at: performance.now(), until: performance.now() + HINT_FLASH_MS };
    beep(660, 120, 'sine');
    updateHud();
  }

  function togglePause() {
    if (state.screen !== 'play' && state.screen !== 'paused') return;
    state.paused = !state.paused;
    state.screen = state.paused ? 'paused' : 'play';
    show(state.paused ? 'pause-screen' : 'none');
    updateHud();
  }

  function tick(now) {
    if (state.screen === 'play' && !state.paused) {
      if (state.lastTick) state.timeLeft -= (now - state.lastTick) / 1000;
      if (state.timeLeft <= 0) {
        state.timeLeft = 0;
        updateHud();
        timeUp();
      } else {
        updateHud();
      }
    }
    state.lastTick = now;
    if (state.screen === 'play' || state.screen === 'paused' || state.screen === 'complete') {
      renderAll(canvases, scene(), state, now);
    }
    requestAnimationFrame(tick);
  }

  // Public controls, wired by main.js.
  return {
    state,
    startScene,
    clickAt,
    useHint,
    togglePause,
    showResults,
    next() {
      if (state.sceneIndex + 1 < SCENES.length) startScene(state.sceneIndex + 1);
      else showResults();
    },
    retry() { startScene(state.sceneIndex); },
    restart() {
      state.score = 0;
      state.sceneScores = [];
      state.stars = [];
      startScene(0);
    },
    toTitle() {
      state.screen = 'title';
      show('title-screen');
    },
    updateHud,
    start() {
      show('title-screen');
      renderAll(canvases, scene(), state, performance.now());
      requestAnimationFrame(tick);
    },
  };
}
