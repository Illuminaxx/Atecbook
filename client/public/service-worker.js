/* eslint-disable no-restricted-globals */
var CACHE_NAME = "ATEC'Book-PWA";
var urlsToCache = [
    '/'
];


// Install SW
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    )
});

// Cache and requests returned
self.addEventListener('fetch', event => {
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
self.addEventListener('activate', event => {
    var cacheWhitelist = ['wms-pwa'];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map( cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});