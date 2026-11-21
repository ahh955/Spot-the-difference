// The three scenes. Each one draws itself twice: side 0 is the original,
// side 1 is the changed twin. Seven differences per scene, each with a
// hotspot the player must click. Difficulty ramps: dawn is generous,
// the market hides things in clutter, the camp's differences are small.

import * as A from './art.js';

const harbour = {
  id: 'harbour',
  name: 'Harbour at Dawn',
  tagline: 'Scene 1 of 3 · Par 2:30',
  par: 150,
  diffs: [
    { x: 472, y: 54, r: 26, label: 'sun rays' },
    { x: 62, y: 140, r: 20, label: 'lighthouse lamp' },
    { x: 237, y: 219, r: 18, label: 'lit window' },
    { x: 342, y: 250, r: 24, label: 'sail colour' },
    { x: 302, y: 72, r: 18, label: 'extra bird' },
    { x: 210, y: 322, r: 20, label: 'missing fish' },
    { x: 430, y: 300, r: 18, label: 'buoy colour' },
  ],
  draw(ctx, side) {
    const W = 560, H = 360;
    A.sky(ctx, W, H, '#ffd9a0', '#ffeecf');
    A.sun(ctx, 472, 54, 26, side === 0);
    A.cloud(ctx, 120, 52, 1);
    A.cloud(ctx, 330, 34, 0.7);
    A.cloud(ctx, 60, 110, 0.6);
    A.bird(ctx, 200, 66);
    A.bird(ctx, 250, 84, 0.8);
    if (side === 1) A.bird(ctx, 302, 72, 0.9);
    // Shore
    ctx.fillStyle = '#e8d9a8';
    ctx.fillRect(0, 236, W, 26);
    // Lighthouse + houses
    A.lighthouse(ctx, 44, 150, 88, side === 0);
    A.house(ctx, 110, 196, 62, 44, '#f6f1e7', '#e4572e', true);
    A.house(ctx, 190, 200, 62, 40, '#dceef5', '#3a6ea5', side === 0);
    A.house(ctx, 268, 198, 58, 42, '#f6e3c5', '#7a5c3e', true);
    A.sea(ctx, W, 262, H);
    A.sailboat(ctx, 332, 268, 1, side === 0 ? '#e4572e' : '#f6f1e7');
    A.sailboat(ctx, 120, 292, 0.7, '#3a6ea5');
    A.fish(ctx, 182, 306, 1);
    if (side === 0) A.fish(ctx, 210, 322, 0.8, '#3aa7c9');
    A.fish(ctx, 380, 330, 0.9, '#ffb347');
    A.buoy(ctx, 430, 300, side === 0 ? '#ff7b2e' : '#ffd23e');
    A.crate(ctx, 500, 232, 0.9);
  },
};

const market = {
  id: 'market',
  name: 'Night Market',
  tagline: 'Scene 2 of 3 · Par 2:00',
  par: 120,
  diffs: [
    { x: 482, y: 52, r: 26, label: 'moon phase' },
    { x: 152, y: 122, r: 18, label: 'lantern row' },
    { x: 352, y: 292, r: 22, label: 'market cat' },
    { x: 285, y: 143, r: 22, label: 'awning stripes' },
    { x: 122, y: 62, r: 16, label: 'extra star' },
    { x: 434, y: 188, r: 20, label: 'banner flag' },
    { x: 105, y: 295, r: 22, label: 'crate stack' },
  ],
  draw(ctx, side) {
    const W = 560, H = 360;
    A.sky(ctx, W, H, '#141a33', '#2b3a67');
    A.moon(ctx, 482, 52, 24, side === 1);
    A.star(ctx, 60, 44, 7);
    A.star(ctx, 200, 30, 5);
    A.star(ctx, 330, 56, 6);
    A.star(ctx, 420, 90, 4);
    if (side === 1) A.star(ctx, 122, 62, 6);
    // Ground
    ctx.fillStyle = '#3d2f23';
    ctx.fillRect(0, 300, W, 60);
    // Stalls
    A.stall(ctx, 60, 130, 130, '#e4572e', '#f6f1e7');
    A.stall(ctx, 220, 130, 130, side === 0 ? '#2a9d8f' : '#e9c46a', '#f6f1e7');
    A.stall(ctx, 380, 130, 130, '#6d597a', '#f6f1e7');
    // Lantern strings
    ctx.strokeStyle = '#0d0d17';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(40, 108);
    ctx.lineTo(520, 108);
    ctx.stroke();
    A.lantern(ctx, 100, 122, 1);
    if (side === 0) A.lantern(ctx, 152, 122, 1, '#ffd23e');
    A.lantern(ctx, 204, 122, 1);
    A.lantern(ctx, 300, 122, 1, '#ffd23e');
    A.lantern(ctx, 400, 122, 1);
    A.lantern(ctx, 470, 122, 1, '#2a9d8f');
    // Banner flag on the right stall
    if (side === 1) {
      ctx.fillStyle = '#ffd23e';
      ctx.beginPath();
      ctx.moveTo(422, 182);
      ctx.lineTo(446, 188);
      ctx.lineTo(422, 194);
      ctx.closePath();
      ctx.fill();
    }
    // Crates
    A.crate(ctx, 66, 282, 1);
    A.crate(ctx, 66, 256, 1);
    if (side === 0) A.crate(ctx, 92, 282, 1);
    A.crate(ctx, 470, 282, 1);
    // Cat on a crate (left only)
    if (side === 0) A.cat(ctx, 352, 292, 1);
    A.crate(ctx, 330, 300, 1);
  },
};

const camp = {
  id: 'camp',
  name: 'Forest Camp',
  tagline: 'Scene 3 of 3 · Par 1:30',
  par: 90,
  diffs: [
    { x: 92, y: 112, r: 20, label: 'owl eyes' },
    { x: 282, y: 288, r: 24, label: 'fire size' },
    { x: 424, y: 318, r: 18, label: 'mushrooms' },
    { x: 208, y: 192, r: 18, label: 'tent flag' },
    { x: 382, y: 302, r: 20, label: 'pack colour' },
    { x: 522, y: 170, r: 20, label: 'extra pine' },
    { x: 302, y: 42, r: 16, label: 'missing star' },
  ],
  draw(ctx, side) {
    const W = 560, H = 360;
    A.sky(ctx, W, H, '#0f1d33', '#274b73');
    A.moon(ctx, 60, 48, 20, false);
    A.star(ctx, 150, 36, 5);
    A.star(ctx, 230, 60, 6);
    if (side === 0) A.star(ctx, 302, 42, 6);
    A.star(ctx, 400, 30, 5);
    A.star(ctx, 480, 70, 4);
    // Ground
    ctx.fillStyle = '#23402a';
    ctx.fillRect(0, 280, W, 80);
    ctx.fillStyle = '#2c4f33';
    ctx.fillRect(0, 280, W, 10);
    // Back trees
    A.pine(ctx, 40, 240, 1.4, '#17452e');
    A.pine(ctx, 140, 230, 1.1, '#17452e');
    A.pine(ctx, 470, 235, 1.3, '#17452e');
    if (side === 1) A.pine(ctx, 522, 200, 0.9, '#1f7a4d');
    // Branch + owl
    ctx.strokeStyle = '#4a3220';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(60, 150);
    ctx.lineTo(130, 138);
    ctx.stroke();
    A.owl(ctx, 92, 112, 1, side === 0);
    // Tent
    A.tent(ctx, 202, 262, 1, side === 1);
    // Campfire
    A.campfire(ctx, 282, 288, 1, side === 1);
    // Backpack
    A.backpack(ctx, 382, 302, 1, side === 0 ? '#e4572e' : '#2a9d8f');
    // Mushrooms
    A.mushroom(ctx, 452, 312, 1);
    A.mushroom(ctx, 480, 322, 0.7);
    if (side === 0) A.mushroom(ctx, 424, 322, 0.8);
    // Logs
    ctx.fillStyle = '#6b4a2f';
    ctx.beginPath();
    ctx.ellipse(330, 330, 26, 8, 0, 0, Math.PI * 2);
    ctx.fill();
  },
};

export const SCENES = [harbour, market, camp];
