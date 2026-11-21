# MIRROR ISLES — Spot the Difference

[![competition](https://make.fun/badge/best-spot-the-difference-game-20261121-0451.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451)
[![rank](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/ahh955/Spot-the-difference/rank.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451)
[![reward](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/ahh955/Spot-the-difference/reward.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451)

A spot-the-difference voyage in three original scenes, built for the
[make.fun bounty](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451).
Two pictures, seven differences, one tide running out.

## The game

- **3 scenes, 7 differences each** — Harbour at Dawn, Night Market,
  Forest Camp — all art drawn in code, no assets, no network.
- **Side-by-side panels**: click a difference on either picture; a green
  ring with a check mark lands on both panels.
- **Countdown timer with par times** (2:30 / 2:00 / 1:30) — the bar turns
  red and pulses under 30 seconds.
- **3 hints per scene** (H key): a dashed gold ring flashes on one
  difference you haven't found yet.
- **Strikes**: a wrong click costs 5 seconds and a strike; 5 strikes ends
  the scene.
- **Stars & scoring**: 100 points per find, time bonus, clean bonus;
  1–3 stars per scene, results screen with per-scene rows.
- **Keyboard**: H hint, P pause, Enter to continue.

## Play it

Serve `game/` from any static server and open `game/index.html`
(`python3 -m http.server` in `game/`, then http://127.0.0.1:8000).

## Layout

- `game/index.html` — shell, HUD, panels, overlays
- `game/styles.css` — dark navy theme, timer bar, cards
- `game/src/config.js` — timing, scoring, hint constants
- `game/src/art.js` — shared flat-illustration drawing helpers
- `game/src/scenes.js` — the three scenes and their 21 differences
- `game/src/render.js` — panels, markers, hint ring, pulses
- `game/src/game.js` — state, timer, scoring, screens
- `game/src/input.js` — click mapping, keyboard shortcuts
- `game/src/main.js` — bootstrap (+ `?scene=&found=&time=` test helper)
- `main.ts` — copies `game/` + `screenshots/` to `/output`, writes the dossier
- `screenshots/` — 4 real browser renders of the game
