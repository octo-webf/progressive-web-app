self.addEventListener('install', (e) => {
  console.log('install');
  e.waitUntil(caches.open('assets')
    .then(cache => cache.addAll([
      '/static/js/app.js',
      '/static/js/vendor.js',
      '/static/css/app.css',
      '/static/fonts/fontawesome-webfont.eot',
      '/static/fonts/fontawesome-webfont.ttf',
      '/static/fonts/fontawesome-webfont.woff',
      '/static/fonts/fontawesome-webfont.woff2',
      '/static/img/fontawesome-webfont.svg',
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
