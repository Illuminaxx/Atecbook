self.importScripts('./dist/js/dexie.js')

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
        
        /*event.respondWith(
            caches.match(event.request).then(function(response) {
                // console.log('Request event: ' + event)
                let reqUrl = new URL(event.request.url)
                console.log(reqUrl);
                return response || fetch(event.request)
                
            })
        );

        if(event.request.method === "POST") {
            
            var database = new Dexie("req_cache");
            database.version(1).stores({
                req_cache: 'key,response,timestamp'
            })

            event.respondWith(
                fetch(event.request.clone()).then(function(response) {
                    cachePut(event.request.clone(), response.clone(), database.req_cache)
                    return response
                })
                .catch(function() {
                    return cacheMatch(event.request.clone(), database.req_cache)
                })
            )

        }*/

        if(event.request.method === "POST"){
		
            // Init the cache. We use Dexie here to simplify the code. You can use any other
            // way to access IndexedDB of course.
            var db = new Dexie("post_cache");
            db.version(1).stores({
                post_cache: 'key,response,timestamp'
            })
        
            event.respondWith(
                // First try to fetch the request from the server
                fetch(event.request.clone())
                .then(function(response) {
                    // If it works, put the response into IndexedDB
                    cachePut(event.request.clone(), response.clone(), db.post_cache);
                    return response;
                })
                .catch(function() {
                    // If it does not work, return the cached response. If the cache does not
                    // contain a response for our request, it will give us a 503-response
                    return cacheMatch(event.request.clone(), db.post_cache);
                })
            );
        }

    }
});

/**
 * Serializes a Request into a plain JS object
 *
 *
 * @param request
 * @returns Promise
 */
function serializeRequest(request) {
    var serialized = {
        url: request.url,
        headers: serializeHeaders(request.headers),
        method: request.method,
        mode: request.mode,
        credentials: request.credentials,
        cache: request.cache,
        redirect: request.redirect,
        referrer: request.referrer
    }

    if(request.method !== 'GET' && request.method !== 'HEAD') {
        return request.clone().text().then(function(body) {
            serialized.body = body
            return Promise.resolve(serialized)
        })
    }
    return Promise.resolve(serialized)
}

/**
* Serializes a Response into a plain JS object
*
* @param response
* @returns Promise
*/
function serializeResponse(response) {
    var serialized = {
        headers: serializeHeaders(response.headers),
        status: response.status,
        statusText: response.statusText
    }

    return response.clone().text().then(function(body) {
        serialized.body = body
        return Promise.resolve(serialized)
    })
}

/**
* Serializes headers into a plain JS object
* 
* @param headers
* @returns object
*/
function serializeHeaders(headers) {
    var serialized = {}
    for(var entry of headers.entries()) {
        serialized[entry[0]] = entry[1]
    }
    return serialized
} 

/**
* Creates a Response from it's serialized version
* 
* @param data
* @returns Promise
*/
function deserializeResponse(data) {
   return Promise.resolve(new Response(data.body, data))
}

/**
* Saves the response for the given request eventually overriding the previous version
* 
* @param data
* @returns Promise
*/
function cachePut(request, response, store) {
    var key, data;
    getPostId(request.clone()).then(function(id) {
        key = id;
        return serializeResponse(response.clone())
    }).then(function(serializedResponse) {
        data = serializedResponse;
        var entry = {
            key: key,
            response: data,
            timestamp: Date.now()
        }
        store
            .add(entry)
            .catch(function(error) {
                store.update(entry.key, entry)
            })
    })
}

/**
* Returns the cached response for the given request or an empty 503-response  for a cache miss.
* 
* @param request
* @return Promise
*/
function cacheMatch(request, store) {
    getPostId(request.clone())
    .then(function(id) {
        return store.get(id)
    }).then(function(data) {
        if (data) {
			return deserializeResponse(data.response);
		} else {
			return new Response('', {status: 503, statusText: 'Service Unavailable'});
		}
    })
}

/**
* Returns a string identifier for our POST request.
* 
* @param request
* @return string
*/
function getPostId(request)  {
	return JSON.stringify(serializeRequest(request.clone()));
}