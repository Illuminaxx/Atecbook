var doCache = true;

var CACHE_NAME = "atec-book-cache";

var urlsToCache = [
    '/static/css/main.5d019410.chunk.css',
    '/static/js/2.86c0399e.chunk.js',
    '/static/js/main.43aedba5.chunk.js',
    '/static/js/runtime-main.c012fedc.js',
    '/static/media/logo.5e3be87f.svg',
    '/static/media/showcase.36c4bd33.jpg',
    'https://kit.fontawesome.com/4276cb84f0.js',
    'favicon.ico',
    'logo192.png',
    'logo256.png',
    'logo384.png',
    'logo512.png',
    'manifest.json',
    'service-worker.js',
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
        caches.keys().then(keyList => 
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
                //console.log('Request event: ' + event.request.url)
                let requestUrl = new URL(event.request.url)
                console.log(requestUrl)
                console.log(requestUrl.origin)
                console.log(location.origin)

                return response || fetch(event.request)
                
            })
        );
    }
});

