var CACHE_NAME = "ATEC'Book-PWA";
var urlsToCache = [
    '/static/js/main.chunk.js',
    '/static/js/0.chunk.js',
    '/static/js/bundle.js',
    '/',
    '/index.html'
];


// Install SW
this.addEventListener('install', (event) => {
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

            //return fetch(event.request);
        })
    );
});

//Update SW
this.addEventListener('activate', (event) => {
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