# Arcade

A multi-game offline arcade served from GitHub Pages. Zero dependencies, no build step — plain HTML/CSS/JS, installable as a PWA. Eight engaging puzzle and action games, fully playable offline after one visit.

**Play:** https://secredops.github.io/JDs-arcade/

## Games

| Game | Description |
|------|-------------|
| 🧪 **Tube Sort** | Pour matching colours to fill every tube. Three difficulties, solver-verified puzzles, hints, undo. |
| 🔢 **Sudoku** | Fill the 9×9 grid — every row, column and box holds 1–9. Four difficulty levels. |
| 🖼 **Nonogram** | Use row and column clues to reveal the hidden picture. Challenge your deduction skills. |
| ✨ **2048** | Slide tiles to merge matching numbers — reach 2048! Classic tile-merging arcade action. |
| 💡 **Lights Out** | Toggle the grid to turn every light off. Solve with math (GF(2) Gaussian elimination). |
| 🕳 **Chasm** | Swallow the city — grow your hole before time runs out. Multiplayer arcade action, 4 AI opponents. |
| 🏗 **Sky Stack** | Drop sliding blocks in rhythm — build the tallest tower. Timing-based stacker with regrows. |
| 🐍 **Neon Snake** | Eat, grow, speed up — just don't bite your own tail. Classic action with queued turns and gold stars. |

## Features

- **Hub launcher** — dark-themed card grid with 8 games, collapsible PWA install guide
- **Unlimited puzzles** — Tube Sort, Sudoku, Nonogram each generate unique solvable boards
- **Difficulty levels** — Tube Sort (3), Sudoku (4), Nonogram (1), Lights Out (5), others vary
- **Best-score tracking** — persistent per-game/per-difficulty via `localStorage`
- **Fully offline / installable PWA** — service worker precaches hub and all games; play with no internet connection after install
- **Zero dependencies** — pure HTML5, canvas, no frameworks, no build step
- **Touch-optimized** — swipe steering (snake), tap-to-drop (stack), full keyboard support
- **Responsive canvas rendering** — games scale to screen size with touch-action handling

## Install on your phone

The arcade is a Progressive Web App (PWA) — no app store needed.

### Android (Chrome)

1. Tap the **⋮ menu** in the top-right corner of the browser
2. Choose **"Add to Home screen"** (or **"Install app"** on some phones)
3. Confirm with **Add** (or **Install**) — the Arcade icon appears on your home screen

### iPhone/iPad (Safari)

1. Tap the **Share button** — the square with an arrow pointing up, at the bottom of the screen
2. Scroll down and choose **"Add to Home Screen"**
3. Tap **Add** in the top-right corner — the Arcade icon appears on your home screen

Once installed, the app plays full-screen. After the first load, **every game works with no internet connection** thanks to the service worker cache.

## Local development

No build step required. Edit HTML/CSS/JS directly.

```bash
npx serve .   # or any static file server (python -m http.server 8000, etc.)
```

Open `http://localhost:3000`. The service worker will register and cache files on first visit.

## Architecture

```
/                        ← Hub launcher (index.html) with 8 game cards
/index.html              ← Dark-themed grid, installs as PWA
/manifest.json           ← PWA manifest (name, icons, start URL, display mode)
/sw.js                   ← Service worker: cache-first + network fallback
/shared/style.css        ← Common styles (dark cyan-accent theme, buttons, overlays)
/games/
  ├─ tube-sort/          ← Puzzle game: tube sorting
  ├─ sudoku/             ← Puzzle game: number placement
  ├─ nonogram/           ← Puzzle game: picture nonogram
  ├─ 2048/               ← Action game: tile merging
  ├─ lights-out/         ← Puzzle game: grid toggling
  ├─ hole/               ← Action game: grow a hole, eat objects
  ├─ stack/              ← Action game: timing-based stacker
  └─ snake/              ← Action game: classic snake with bonus stars
/icon-192.png, /icon-512.png
/.nojekyll               ← Skip Jekyll processing on GitHub Pages
```

### Service worker cache versioning

Cache name is defined prominently at the top of `sw.js` (currently **`arcade-v6`**). Bump it whenever you change any cached file — the old cache auto-deletes on next visit.

### Adding a game

1. Create `/games/<slug>/index.html` — link `../../shared/style.css`, register the root SW at `../../sw.js`, add a `← Back` link to `../../`.
2. Add the game directory path to the `ASSETS` array in `sw.js` and bump `CACHE` to the next version.
3. Add a card to the hub's `<div class="grid">` in root `index.html`.

## Technical notes

- **Canvas rendering** — each game uses 2D canvas with device pixel ratio scaling for crisp graphics
- **Game loop** — `requestAnimationFrame` with capped delta-time to prevent physics tunneling
- **Collision detection** — spatial grids for O(1) lookups in action games (Chasm, Snake)
- **Persistence** — localStorage for best scores per game/difficulty (fails silently if disabled)
- **Touch input** — swipe detection, touch-action: none, passive event listeners
- **Puzzle generation** — DFS backtracking (Tube Sort), constraint propagation (Sudoku), random grids (Nonogram, Lights Out)
- **Responsive design** — all games scale to viewport with CSS flexbox and canvas resize on window events
