// MIRROR ISLES — hand-in program (Node 22, standard library only).
//
// The game lives in game/ as plain static files: index.html plus its ES
// modules and stylesheet, no build step and no network request. This program
// copies game/ and screenshots/ beside it into the output directory and
// writes dossier.json with the kit's vendored library, so the judge reads
// the same summary the gate rebuilds.
//
// Run locally with:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// In the grader MAKEFUN_OUTPUT_DIR is unset and /output is used.

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-game.ts';

const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outDir, { recursive: true });
cpSync(join(repoRoot, 'game'), join(outDir, 'game'), { recursive: true });
mkdirSync(join(outDir, 'screenshots'), { recursive: true });
if (existsSync(join(repoRoot, 'screenshots'))) {
  cpSync(join(repoRoot, 'screenshots'), join(outDir, 'screenshots'), { recursive: true });
}

// Caps mirror the gate's own limits, so a local run refuses what the
// scorer would refuse: at most 4 screenshots of 256 KiB each, at most
// 993 entries and 48 MiB under game/, paths under 1000 bytes. The dossier
// itself is capped at 160 KiB of source text.
writeFileSync(
  join(outDir, 'dossier.json'),
  buildDossier(outDir, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    game_max_files: 993,
    game_max_bytes: 50331648,
    game_path_max_bytes: 1000,
  }),
);
