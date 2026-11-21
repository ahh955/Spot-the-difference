// Input: mouse clicks mapped from either panel into scene coordinates,
// plus the keyboard shortcuts (H hint, P pause, Enter next).

export function panelPoint(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * canvas.width,
    y: ((event.clientY - rect.top) / rect.height) * canvas.height,
  };
}

export function wireInput(canvases, game) {
  for (const c of [canvases.left, canvases.right]) {
    c.addEventListener('click', (e) => {
      const p = panelPoint(c, e);
      game.clickAt(p.x, p.y);
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'h' || e.key === 'H') game.useHint();
    if (e.key === 'p' || e.key === 'P') game.togglePause();
    if (e.key === 'Enter' && game.state.screen === 'complete') game.next();
    if (e.key === 'Enter' && game.state.screen === 'title') game.startScene(0);
  });
}
