// ╔══════════════════════════════════════════╗
// ║  CACHE VERSION — bump this on any change ║
// ║  Current: arcade-v4                      ║
// ╚══════════════════════════════════════════╝
const CACHE = "arcade-v4";

const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./shared/style.css",
  "./games/tube-sort/",
  "./games/tube-sort/index.html",
  "./games/sudoku/",
  "./games/sudoku/index.html",
  "./games/nonogram/",
  "./games/nonogram/index.html",
  "./games/2048/",
  "./games/2048/index.html",
  "./games/lights-out/",
  "./games/lights-out/index.html",
  "./games/hole/",
  "./games/hole/index.html",
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Cache-first, fall back to network and cache the result.
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(hit =>
      hit ||
      fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return res;
      })
    )
  );
});
