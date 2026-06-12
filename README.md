# Tube Sort

A colour tube-sorting puzzle as an installable, offline-capable PWA. Built because once a day wasn't enough.

**Play:** https://secredops.github.io/tube-sort/

## How to play

Tap a tube to pick it up, tap another to pour. You can pour onto an empty tube or onto a matching colour, and matching segments move together. Fill every tube with a single colour to win — fewer moves is better.

## Features

- **Unlimited puzzles** — every board is randomly generated and verified solvable by a built-in DFS solver before it's shown
- **Three difficulties** — Easy (6 colours), Classic (10), Hard (12)
- **Hints** — the solver highlights the next move, and tells you outright if you've reached a dead end
- **Undo and restart** — undo costs a move, to keep the move count honest
- **Fully offline** — zero external dependencies; a service worker caches everything on first load

## Install on your phone

Open the link above in Chrome (Android) or Safari (iOS) and choose **Install app** / **Add to Home Screen**.

## Stack

Single-file vanilla JS — no framework, no build step. `index.html` is the entire game; `sw.js` + `manifest.json` make it a PWA.

## Updating

If you change `index.html`, bump the cache name in `sw.js` (e.g. `tube-sort-v1` → `v2`) or installed clients will keep serving the old version.
