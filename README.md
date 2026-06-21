# Arcade

A multi-game offline arcade served from GitHub Pages. Zero dependencies, no build step — plain HTML/CSS/JS, installable as a PWA.

**Play:** https://secredops.github.io/tube-sort/

## Games

| Game | Path | Description |
|------|------|-------------|
| Tube Sort | `/games/tube-sort/` | Pour matching colours to fill every tube. Easy / Classic / Hard difficulties, solver-verified solvable puzzles, hint system, undo. |

## How to play — Tube Sort

Tap a tube to pick it up, tap another to pour. Matching segments move together. Fill every tube with a single colour to win — fewer moves is better.

## Features

- **Hub launcher** — a dark-themed card grid linking to every game
- **Unlimited puzzles** — every board is randomly generated and verified solvable by a built-in DFS solver before it's shown
- **Three difficulties** — Easy (6 colours), Classic (10), Hard (12)
- **Hints** — the solver highlights the next move; degrades gracefully if the position exceeds the node budget
- **Undo and restart** — undo costs a move, to keep the move count honest
- **Best-score tracking** — per difficulty, stored in `localStorage` (fails silently if unavailable)
- **Fully offline / installable PWA** — service worker precaches the hub and all games; single manifest

## Architecture

```
/                        ← Hub launcher (index.html)
/shared/style.css        ← Common styles (dark cyan-accent theme)
/manifest.json           ← PWA manifest for the whole arcade
/sw.js                   ← Service worker — precaches hub + all games
/games/<slug>/           ← Each game, self-contained
/icon-192.png
/icon-512.png
```

### Service worker cache

Cache name is **`arcade-v1`** (defined prominently at the top of `sw.js`). Bump it whenever you change any cached file.

### Adding a game

1. Create `/games/<slug>/index.html` — link `../../shared/style.css`, register the root SW via `../../sw.js`, add a `← Back` link to `../../`.
2. Add the game's files to the `ASSETS` array in `sw.js` and bump `CACHE` to the next version.
3. Add a card to the hub's `<div class="grid">` in root `index.html`.

## Install on your phone

Open the URL above in Chrome (Android) or Safari (iOS) and choose **Install app** / **Add to Home Screen**.

## Local development

No build step required. Edit HTML/CSS/JS directly.

```bash
npx serve .   # or any static file server
```

Open `http://localhost:3000`. The SW will register and cache files on first visit.
