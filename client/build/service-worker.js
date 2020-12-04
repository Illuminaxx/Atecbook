var doCache = true;

var CACHE_NAME = "atec-book-cache";

var urlsToCache = [
    '/static/css/main.5d019410.chunk.css',
    '/static/js/2.c734d9ec.chunk.js',
    '/static/js/main.87706e13.chunk.js',
    '/static/js/runtime-main.c012fedc.js',
    '/static/media/logo.5e3be87f.svg',
    '/static/media/showcase.36c4bd33.jpg',
    'favicon.ico',
    'logo192.png',
    'logo256.png',
    'logo384.png',
    'logo512.png',
    'manifest.json',
    '/'
    
];


// Install SW
self.addEventListener('install', (event) => {
    if(doCache) {
        event.waitUntil(
            caches.open(CACHE_NAME)
            .then(function (cache) {
                cache.addAll(urlsToCache)
            })
        );
    }
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys()
            .then(keyList => 
                Promise.all(keyList.map(key => {
                        if(!cacheWhitelist.includes(key)) {
                            console.log('Deleting cache: ' + key)
                            return caches.delete(key)
                        }
                }))
            )
    );
});

// Cache and requests returned
self.addEventListener('fetch', event => {
    if(doCache) {
        event.respondWith(
            caches.match(event.request).then(function(response) {
                return response || fetch(event.request)
            })
        );
    }
});


