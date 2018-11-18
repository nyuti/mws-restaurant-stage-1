const staticCacheName = 'static-01';

// list of assets to cache on install
// cache each restaurant detail page as well
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCacheName)
    .then(cache => cache.addAll([
      '/index.html',
      '/css/styles.css',
      '/css/responsive.css',
      '/icons/icon.png',
      '/js/dbhelper.js',
      '/js/main.js',
      '/js/restaurant_info.js',
      '/data/restaurants.json',
      '/restaurant.html?id=1',
      '/restaurant.html?id=2',
      '/restaurant.html?id=3',
      '/restaurant.html?id=4',
      '/restaurant.html?id=5',
      '/restaurant.html?id=6',
      '/restaurant.html?id=7',
      '/restaurant.html?id=8',
      '/restaurant.html?id=9',
      '/restaurant.html?id=10'
    ]).catch(error => {
      console.log('Caches open failed: ' + error);
    }))
  );
});


// intercept all requests
// either return cached asset or fetch from network
self.addEventListener('fetch', event => {
  event.respondWith(
    // Add cache.put to cache images on each fetch
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(async fetchResponse => {
        const cache = await caches.open(staticCacheName);
        cache.put(event.request, fetchResponse.clone());
        return fetchResponse;
      });
    }).catch(error => {
      return new Response('Not connected to the internet', error);
    })
  );
});

// delete old/unused static caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName.startsWith('static-') && cacheName !== staticCacheName;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});