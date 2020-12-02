var CACHE_NAME = "ATEC'Book-PWA";
var urlsToCache = [
    '/',
    '/index.html'
];


// Install SW
this.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    )
});

// Cache and requests returned
this.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(function (response) {
            if(response) {
                return response;
            }

            return fetch(event.request);
        })
    );
});

//Update SW
this.addEventListener('activate', event => {
    var cacheWhitelist = ['wms-pwa'];
    event.waitUntil(
        caches.keys().then(function(cacheNames)  {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});