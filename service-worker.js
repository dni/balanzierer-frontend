const cacheName = 'site-cache-v1'
const assetsToCache = [
    '/assets/',
    '/',
]
self.addEventListener('install', ( event ) => {
    self.skipWaiting(); // skip waiting
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
              return cache.addAll(assetsToCache);
        })
      );
});
