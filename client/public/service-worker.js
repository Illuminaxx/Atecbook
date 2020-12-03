var CACHE_NAME = "ATEC-Book-PWA";
var urlsToCache = [
    '/static/js/2.c734d9ec.chunk.js',
    '/static/js/main.87706e13.chunk.js',
    '/static/js/runtime-main.c012fedc.js',
    'favicon.ico',
    'logo192.png',
    'logo256.png',
    'logo384.png',
    'logo512.png',
    'https://atecbook.herokuapp.com/'
    
];


// Install SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    )
});

self.addEventListener('activate', (event) => {
    var cacheWhitelist = ['wms-pwa'];
    event.waitUntil(
        caches.keys().then(function(cacheNames)  {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Cache and requests returned
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then((response) => {
            if(response) {
                return response;
            }

            return fetch(event.request);
        })
    );
});

//Update SW
