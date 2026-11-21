// Shared flat-illustration helpers: every scene is drawn from these pieces,
// so one style carries both panels and all three scenes.

export function sky(ctx, w, h, top, bottom) {
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, top);
  g.addColorStop(1, bottom);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

export function sun(ctx, x, y, r, rays) {
  ctx.fillStyle = '#ffd23e';
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  if (rays) {
    ctx.strokeStyle = '#ffd23e';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(x + Math.cos(a) * (r + 6), y + Math.sin(a) * (r + 6));
      ctx.lineTo(x + Math.cos(a) * (r + 16), y + Math.sin(a) * (r + 16));
      ctx.stroke();
    }
  }
}

export function moon(ctx, x, y, r, crescent) {
  ctx.fillStyle = '#f4f1de';
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  if (crescent) {
    ctx.fillStyle = '#1b2340';
    ctx.beginPath();
    ctx.arc(x + r * 0.55, y - r * 0.2, r * 0.85, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function cloud(ctx, x, y, s, color = '#ffffff') {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, 16 * s, 0, Math.PI * 2);
  ctx.arc(x + 18 * s, y - 6 * s, 20 * s, 0, Math.PI * 2);
  ctx.arc(x + 38 * s, y, 15 * s, 0, Math.PI * 2);
  ctx.arc(x + 18 * s, y + 6 * s, 16 * s, 0, Math.PI * 2);
  ctx.fill();
}

export function bird(ctx, x, y, s = 1, color = '#2b2b3a') {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5 * s;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x - 10 * s, y);
  ctx.quadraticCurveTo(x - 5 * s, y - 7 * s, x, y);
  ctx.quadraticCurveTo(x + 5 * s, y - 7 * s, x + 10 * s, y);
  ctx.stroke();
}

export function star(ctx, x, y, r, color = '#fff8c9') {
  ctx.fillStyle = color;
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
    const rr = i % 2 === 0 ? r : r * 0.45;
    ctx[i === 0 ? 'moveTo' : 'lineTo'](x + Math.cos(a) * rr, y + Math.sin(a) * rr);
  }
  ctx.closePath();
  ctx.fill();
}

export function sea(ctx, w, y, h, color = '#3aa7c9') {
  ctx.fillStyle = color;
  ctx.fillRect(0, y, w, h - y);
  ctx.strokeStyle = 'rgba(255,255,255,0.5)';
  ctx.lineWidth = 2;
  for (let i = 0; i < 6; i++) {
    const wy = y + 14 + i * 16;
    ctx.beginPath();
    ctx.moveTo(20 + (i % 2) * 40, wy);
    ctx.quadraticCurveTo(60 + (i % 2) * 40, wy - 5, 100 + (i % 2) * 40, wy);
    ctx.stroke();
  }
}

export function house(ctx, x, y, w, h, wall, roof, lit) {
  ctx.fillStyle = wall;
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = roof;
  ctx.beginPath();
  ctx.moveTo(x - 6, y);
  ctx.lineTo(x + w / 2, y - 22);
  ctx.lineTo(x + w + 6, y);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = lit ? '#ffe66d' : '#5b6b7a';
  ctx.fillRect(x + 8, y + 12, 14, 14);
  ctx.fillRect(x + w - 22, y + 12, 14, 14);
  ctx.fillStyle = '#6b4a2f';
  ctx.fillRect(x + w / 2 - 7, y + h - 24, 14, 24);
}

export function lighthouse(ctx, x, y, h, lampOn) {
  const w = 34;
  for (let i = 0; i < 4; i++) {
    ctx.fillStyle = i % 2 === 0 ? '#e4572e' : '#f6f1e7';
    ctx.fillRect(x, y + (h / 4) * i, w, h / 4);
  }
  ctx.fillStyle = '#2b2b3a';
  ctx.fillRect(x - 4, y - 14, w + 8, 14);
  ctx.fillStyle = lampOn ? '#ffe66d' : '#8a94a6';
  ctx.beginPath();
  ctx.arc(x + w / 2, y - 7, 6, 0, Math.PI * 2);
  ctx.fill();
  if (lampOn) {
    ctx.fillStyle = 'rgba(255,230,109,0.25)';
    ctx.beginPath();
    ctx.moveTo(x + w, y - 7);
    ctx.lineTo(x + w + 70, y - 26);
    ctx.lineTo(x + w + 70, y + 12);
    ctx.closePath();
    ctx.fill();
  }
}

export function sailboat(ctx, x, y, s, sailColor) {
  ctx.fillStyle = '#6b4a2f';
  ctx.beginPath();
  ctx.moveTo(x - 26 * s, y);
  ctx.lineTo(x + 26 * s, y);
  ctx.lineTo(x + 16 * s, y + 12 * s);
  ctx.lineTo(x - 16 * s, y + 12 * s);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#4a3220';
  ctx.lineWidth = 2 * s;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, y - 34 * s);
  ctx.stroke();
  ctx.fillStyle = sailColor;
  ctx.beginPath();
  ctx.moveTo(x, y - 34 * s);
  ctx.lineTo(x, y - 2 * s);
  ctx.lineTo(x + 20 * s, y - 2 * s);
  ctx.closePath();
  ctx.fill();
}

export function fish(ctx, x, y, s, color = '#ff8c42') {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(x, y, 10 * s, 6 * s, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x - 9 * s, y);
  ctx.lineTo(x - 16 * s, y - 6 * s);
  ctx.lineTo(x - 16 * s, y + 6 * s);
  ctx.closePath();
  ctx.fill();
}

export function buoy(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#2b2b3a';
  ctx.fillRect(x - 2, y - 16, 4, 8);
}

export function pine(ctx, x, y, s, color = '#1f7a4d') {
  ctx.fillStyle = '#6b4a2f';
  ctx.fillRect(x - 3 * s, y - 12 * s, 6 * s, 12 * s);
  ctx.fillStyle = color;
  for (let i = 0; i < 3; i++) {
    const w = (34 - i * 8) * s;
    const ty = y - 12 * s - i * 16 * s;
    ctx.beginPath();
    ctx.moveTo(x - w / 2, ty);
    ctx.lineTo(x, ty - 22 * s);
    ctx.lineTo(x + w / 2, ty);
    ctx.closePath();
    ctx.fill();
  }
}

export function tent(ctx, x, y, s, flag) {
  ctx.fillStyle = '#e4572e';
  ctx.beginPath();
  ctx.moveTo(x - 52 * s, y);
  ctx.lineTo(x, y - 58 * s);
  ctx.lineTo(x + 52 * s, y);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#f6f1e7';
  ctx.beginPath();
  ctx.moveTo(x - 16 * s, y);
  ctx.lineTo(x, y - 34 * s);
  ctx.lineTo(x + 16 * s, y);
  ctx.closePath();
  ctx.fill();
  if (flag) {
    ctx.strokeStyle = '#4a3220';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y - 58 * s);
    ctx.lineTo(x, y - 74 * s);
    ctx.stroke();
    ctx.fillStyle = '#ffd23e';
    ctx.beginPath();
    ctx.moveTo(x, y - 74 * s);
    ctx.lineTo(x + 16 * s, y - 70 * s);
    ctx.lineTo(x, y - 66 * s);
    ctx.closePath();
    ctx.fill();
  }
}

export function campfire(ctx, x, y, s, big) {
  ctx.fillStyle = '#6b6f76';
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.arc(x - 16 + i * 8, y + 8, 5, 0, Math.PI * 2);
    ctx.fill();
  }
  const fs = big ? 1.35 : 1;
  ctx.fillStyle = '#ff8c42';
  ctx.beginPath();
  ctx.moveTo(x - 14 * s * fs, y + 6);
  ctx.quadraticCurveTo(x - 10 * s * fs, y - 22 * s * fs, x, y - 26 * s * fs);
  ctx.quadraticCurveTo(x + 10 * s * fs, y - 22 * s * fs, x + 14 * s * fs, y + 6);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#ffd23e';
  ctx.beginPath();
  ctx.moveTo(x - 7 * s * fs, y + 6);
  ctx.quadraticCurveTo(x - 5 * s * fs, y - 12 * s * fs, x, y - 14 * s * fs);
  ctx.quadraticCurveTo(x + 5 * s * fs, y - 12 * s * fs, x + 7 * s * fs, y + 6);
  ctx.closePath();
  ctx.fill();
}

export function mushroom(ctx, x, y, s) {
  ctx.fillStyle = '#f6f1e7';
  ctx.fillRect(x - 3 * s, y - 8 * s, 6 * s, 8 * s);
  ctx.fillStyle = '#e4572e';
  ctx.beginPath();
  ctx.arc(x, y - 8 * s, 9 * s, Math.PI, 0);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(x - 3 * s, y - 11 * s, 1.8 * s, 0, Math.PI * 2);
  ctx.arc(x + 3 * s, y - 13 * s, 1.5 * s, 0, Math.PI * 2);
  ctx.fill();
}

export function owl(ctx, x, y, s, eyesOpen) {
  ctx.fillStyle = '#7a5c3e';
  ctx.beginPath();
  ctx.ellipse(x, y, 14 * s, 18 * s, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(x - 6 * s, y - 6 * s, 5 * s, 0, Math.PI * 2);
  ctx.arc(x + 6 * s, y - 6 * s, 5 * s, 0, Math.PI * 2);
  ctx.fill();
  if (eyesOpen) {
    ctx.fillStyle = '#1b1b22';
    ctx.beginPath();
    ctx.arc(x - 6 * s, y - 6 * s, 2.5 * s, 0, Math.PI * 2);
    ctx.arc(x + 6 * s, y - 6 * s, 2.5 * s, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.strokeStyle = '#1b1b22';
    ctx.lineWidth = 1.6 * s;
    ctx.beginPath();
    ctx.moveTo(x - 9 * s, y - 6 * s);
    ctx.lineTo(x - 3 * s, y - 6 * s);
    ctx.moveTo(x + 3 * s, y - 6 * s);
    ctx.lineTo(x + 9 * s, y - 6 * s);
    ctx.stroke();
  }
  ctx.fillStyle = '#ffb347';
  ctx.beginPath();
  ctx.moveTo(x - 3 * s, y);
  ctx.lineTo(x + 3 * s, y);
  ctx.lineTo(x, y + 4 * s);
  ctx.closePath();
  ctx.fill();
}

export function lantern(ctx, x, y, s, color = '#ff5d5d') {
  ctx.strokeStyle = '#2b2b3a';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x, y - 14 * s);
  ctx.lineTo(x, y - 8 * s);
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(x, y, 9 * s, 11 * s, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffd23e';
  ctx.beginPath();
  ctx.ellipse(x, y, 4 * s, 6 * s, 0, 0, Math.PI * 2);
  ctx.fill();
}

export function stall(ctx, x, y, w, awningA, awningB) {
  ctx.fillStyle = '#8a5a33';
  ctx.fillRect(x, y + 34, w, 44);
  ctx.fillStyle = '#a9743f';
  ctx.fillRect(x, y + 34, w, 8);
  for (let i = 0; i < 5; i++) {
    ctx.fillStyle = i % 2 === 0 ? awningA : awningB;
    ctx.fillRect(x + (w / 5) * i, y, w / 5, 26);
  }
  ctx.fillStyle = '#ffd23e';
  ctx.beginPath();
  ctx.arc(x + w * 0.3, y + 52, 6, 0, Math.PI * 2);
  ctx.arc(x + w * 0.55, y + 52, 6, 0, Math.PI * 2);
  ctx.arc(x + w * 0.78, y + 52, 6, 0, Math.PI * 2);
  ctx.fill();
}

export function cat(ctx, x, y, s) {
  ctx.fillStyle = '#2b2b3a';
  ctx.beginPath();
  ctx.ellipse(x, y, 14 * s, 9 * s, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x + 12 * s, y - 8 * s, 7 * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x + 7 * s, y - 13 * s);
  ctx.lineTo(x + 9 * s, y - 19 * s);
  ctx.lineTo(x + 12 * s, y - 13 * s);
  ctx.moveTo(x + 13 * s, y - 14 * s);
  ctx.lineTo(x + 16 * s, y - 19 * s);
  ctx.lineTo(x + 18 * s, y - 13 * s);
  ctx.fill();
  ctx.strokeStyle = '#2b2b3a';
  ctx.lineWidth = 3 * s;
  ctx.beginPath();
  ctx.moveTo(x - 13 * s, y - 2 * s);
  ctx.quadraticCurveTo(x - 22 * s, y - 8 * s, x - 18 * s, y - 16 * s);
  ctx.stroke();
}

export function crate(ctx, x, y, s) {
  ctx.fillStyle = '#a9743f';
  ctx.fillRect(x, y, 26 * s, 26 * s);
  ctx.strokeStyle = '#6b4a2f';
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, 26 * s, 26 * s);
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + 26 * s, y + 26 * s);
  ctx.moveTo(x + 26 * s, y);
  ctx.lineTo(x, y + 26 * s);
  ctx.stroke();
}

export function backpack(ctx, x, y, s, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, 16 * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(x - 16 * s, y, 32 * s, 14 * s);
  ctx.fillStyle = '#2b2b3a';
  ctx.fillRect(x - 16 * s, y + 4 * s, 32 * s, 4 * s);
  ctx.fillStyle = '#ffd23e';
  ctx.fillRect(x - 5 * s, y - 8 * s, 10 * s, 8 * s);
}
