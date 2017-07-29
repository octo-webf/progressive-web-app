// Sera déclenché quand le service worker sera installé
self.addEventListener('install', (event) => {
  console.log('Le service worker est installé');

  const staticAssets = [
    '/',
    '/static/js/app.js',
    '/static/js/manifest.js',
    '/static/js/vendor.js',
    '/static/css/app.css',
    '/static/fonts/fontawesome-webfont.eot',
    '/static/fonts/fontawesome-webfont.ttf',
    '/static/fonts/fontawesome-webfont.woff',
    '/static/fonts/fontawesome-webfont.woff2',
    '/static/img/fontawesome-webfont.svg',
  ];

  //
  event.waitUntil(
    // Ouverture du cache ayant le namespace "assets"
    caches.open('assets').then(
      // Appel réseau de tous nos assets et mise en cache du résultat
      cache => cache.addAll(staticAssets),
    ),
  );
});

// Sera déclenché à chaque appel réseau de l'application
self.addEventListener('fetch', (event) => {
  console.log('appel : ', event.request.url);

  // Ouverture du cache ayant le namespace "assets"
  const response = caches.open('assets')
  // On regarde si on a, dans le cache, une entrée qui correspond à notre requête
    .then(cache => cache.match(event.request))
    .then((cacheResponse) => {
      // Si on a une entrée, on renvoit l'entrée de cache, sinon on effectue l'appel réseau
      return cacheResponse || fetch(event.request);
    });
  event.respondWith(response);
});

// Sera déclenché quand le SW recevra un évènement push depuis l'extérieur
self.addEventListener('push', (event) => {
  console.log(`Evènement push reçu avec le texte : "${event.data.text()}"`);

  // Configuration de la notification
  const title = 'Progressive Web App';
  const options = {
    body: 'Wizz.',
    icon: '/static/img/app_icon/app_icon_96.png',
    badge: '/static/img/app_icon/app_icon_96.png',
  };

  event.waitUntil(
    // Envoit de la notification à l'utilisateur
    self.registration.showNotification(title, options),
  );
});
