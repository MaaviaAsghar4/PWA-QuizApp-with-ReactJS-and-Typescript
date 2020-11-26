const CACHE_NAME = 'v1';
const urlToCache = [ 
    '/static/js/main.chunk.js', 
    '/static/css/main.chunk.js', 
    '/static/js/1.chunk.js', 
    '/static/js/bundle.js', 
    '/static/js/0.bundle.js', 
    '/index.html',
    '/',
    '/manifest.json',
    '/logo.png'
]; //pages to save offline

const self = this

// Installing ServiceWorker
self.addEventListener('install',(e)=>{
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache)=>{
                console.log('Cache Opened')

                return cache.addAll(urlToCache)
            })
    )
});

// Listen for requests
self.addEventListener('fetch', (e) => {
    if(!navigator.onLine){
    e.respondWith(
        caches.match(e.request)
            .then( ()=> {
                return fetch(e.request)
                    .catch(()=>caches.match('index.html'))
            })
    )}
});

// Activate the ServiceWorker
self.addEventListener('activate', (e) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);

    e.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))
            
    )
});