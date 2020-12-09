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
    '/',
    '/api/*'
    
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
/*self.addEventListener('fetch', event => {
    if(doCache) {
        event.respondWith(
            caches.match(event.request).then(function(response) {
                //console.log('Request event: ' + event.request.url)
                let requestUrl = new URL(event.request.url)
                console.log(event.request)

                return response || fetch(event.request)
                
            })
        );
    }
});*/
self.addEventListener('fetch', function(e) {
    /*e.respondWith(
        caches.match(e.request).then(function(response) {
            if(response) { return response }

            var fetchReq = e.request.clone();

            return fetch(fetchReq).then(
                function(response) {
                    if(!response || response.status !== 200) {
                        return response
                    }

                    var responseToCache = response.clone();
                    console.log(responseToCache)
                    caches.open(CACHE_NAME)
                    .then(function(cache) {
                        cache.put(e.request, responseToCache);         
                    });
                    return response;
                }
            )
        })
    )*/
    let requestUrl = new URL(e.request.url)
    if(requestUrl.origin == location.origin) {
        e.respondWith(
            fetch(e.request).catch(function() {
                return caches.match(e.request)
            })
        )
    } else {
        e.respondWith(
            caches.open(CACHE_NAME).then(function(cache) {
                return cache.match(e.request).then(function(response) {
                    let fetchPromise = fetch(e.request).then(function(networkResponse) {
                        cache.put(e.request, networkResponse.clone())
                    })
                    return response || fetchPromise
                })
            })
        )
    }
})
