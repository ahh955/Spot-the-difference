// MIRROR ISLES — configuration: canvas size, timing, scoring, hints.
// One place for every number the game balances on.

export const PANEL_W = 560;
export const PANEL_H = 360;

export const HINTS_PER_SCENE = 3;
export const HINT_FLASH_MS = 2200;
export const WRONG_CLICK_PENALTY_S = 5;
export const MAX_STRIKES = 5;

export const POINTS_PER_FIND = 100;
export const TIME_BONUS_PER_SECOND = 2;
export const CLEAN_BONUS_PER_STRIKE_LEFT = 50;

// Stars: 3 needs a fast, clean clear; 2 a solid clear; 1 any clear.
export const STAR3_TIME_FRAC = 0.4;
export const STAR3_MAX_STRIKES = 1;
export const STAR2_TIME_FRAC = 0.15;

export const MARKER_COLOR = '#22d3a5';
export const MARKER_WRONG_COLOR = '#ff5d5d';
export const HINT_COLOR = '#ffd23e';
