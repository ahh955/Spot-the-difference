// Rendering: draws both panels, the found-markers on each, the hint ring
// and the little pulse animations that make a find feel good.

import { MARKER_COLOR, MARKER_WRONG_COLOR, HINT_COLOR } from './config.js';

export function drawPanels(canvases, scene) {
  scene.draw(canvases.left.getContext('2d'), 0);
  scene.draw(canvases.right.getContext('2d'), 1);
}

export function drawMarker(ctx, d, pulse) {
  const r = d.r + pulse * 10;
  ctx.strokeStyle = MARKER_COLOR;
  ctx.lineWidth = 3.5;
  ctx.globalAlpha = 1 - pulse * 0.5;
  ctx.beginPath();
  ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.globalAlpha = 1;
  ctx.fillStyle = MARKER_COLOR;
  ctx.beginPath();
  ctx.arc(d.x + d.r * 0.7, d.y - d.r * 0.7, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#0d2b22';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(d.x + d.r * 0.7 - 3.5, d.y - d.r * 0.7);
  ctx.lineTo(d.x + d.r * 0.7 - 1, d.y - d.r * 0.7 + 2.5);
  ctx.lineTo(d.x + d.r * 0.7 + 4, d.y - d.r * 0.7 - 3);
  ctx.stroke();
}

export function drawHintRing(ctx, d, t) {
  const pulse = 0.5 + 0.5 * Math.sin(t / 160);
  ctx.strokeStyle = HINT_COLOR;
  ctx.lineWidth = 4;
  ctx.globalAlpha = 0.55 + 0.45 * pulse;
  ctx.setLineDash([10, 6]);
  ctx.beginPath();
  ctx.arc(d.x, d.y, d.r + 4 + pulse * 4, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.globalAlpha = 1;
}

export function drawWrongMark(ctx, x, y, t) {
  ctx.strokeStyle = MARKER_WRONG_COLOR;
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.globalAlpha = Math.max(0, 1 - t / 700);
  ctx.beginPath();
  ctx.moveTo(x - 9, y - 9);
  ctx.lineTo(x + 9, y + 9);
  ctx.moveTo(x + 9, y - 9);
  ctx.lineTo(x - 9, y + 9);
  ctx.stroke();
  ctx.globalAlpha = 1;
}

export function renderAll(canvases, scene, state, now) {
  drawPanels(canvases, scene);
  for (const ctx of [canvases.left.getContext('2d'), canvases.right.getContext('2d')]) {
    for (const f of state.found) {
      const d = scene.diffs[f.index];
      const age = now - f.at;
      drawMarker(ctx, d, age < 500 ? age / 500 : 0);
    }
    if (state.hint && now - state.hint.at < state.hint.until - state.hint.at) {
      drawHintRing(ctx, scene.diffs[state.hint.index], now);
    }
    for (const w of state.wrongs) {
      if (now - w.at < 700) drawWrongMark(ctx, w.x, w.y, now - w.at);
    }
  }
}
