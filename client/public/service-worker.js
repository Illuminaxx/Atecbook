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
    '/dist/js/dexie.js',
    'favicon.ico',
    'logo192.png',
    'logo256.png',
    'logo384.png',
    'logo512.png',
    'manifest.json',
    'service-worker.js',
    '/'
];

var CACHE_REQUEST = "atecbook-request-cache"
var DB_VERSION = 1

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

        if(event.request.method === "GET") {
            event.respondWith(
                caches.match(event.request).then(function(response) {
                    //console.log('Request event: ' + event.request.url)
                    return response || fetch(event.request)
                    
                })
            );
        }

        console.log(event.request.method);

        if(event.request.method === "POST") {
            
            var database = new Dexie(CACHE_REQUEST);
            database.version(DB_VERSION).stores({
                CACHE_REQUEST: 'key,response,timestamp'
            })

            event.respondWith(
                fetch(event.request.clone()).then(function(response) {
                    cachePut(event.request.clone(), response.clone(), database.atecbook_request_cache)
                    return response
                })
                .catch(function() {
                    return cacheMatch(event.request.clone(), database.atecbook_request_cache)
                })
            )

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
	return getPostId(request.clone())
	.then(function(id) {
		return store.get(id);
	}).then(function(data){
		if (data) {
			return deserializeResponse(data.response);
		} else {
			return new Response('', {status: 503, statusText: 'Service Unavailable'});
		}
	});
}

/**
* Returns a string identifier for our POST request.
* 
* @param request
* @return string
*/
async function getPostId(request) {
	return JSON.stringify(serializeRequest(request.clone()));
}