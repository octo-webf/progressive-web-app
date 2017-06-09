self.addEventListener('install', (e) => {
  e.waitUntil(caches.open('assets')
    .then(cache => cache.addAll([
      '/progressive-web-app',
    ])));
});

self.addEventListener('fetch', (event) => {
  console.log(event.request.url);
});
