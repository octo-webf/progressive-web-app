self.addEventListener('install', (e) => {
  console.log("install");
  e.waitUntil(caches.open('assets')
    .then(cache => cache.addAll([
      '/app.js',
      '/',
    ])));
});

self.addEventListener('fetch', (event) => {
  console.log(event.request.url);
  const response = caches.open('assets')
    .then(cache => cache.match(event.request))
    .then((cacheResponse) => {
      console.log(cacheResponse);
      return cacheResponse || fetch(event.request);
    });
  event.respondWith(response);
});
