const CACHE_NAME = 'v1';
const urlToCache = [ 
    '/',
    '/index.html',
    '/static/css/main.6b7b0057.chunk.css',
    '/static/css/main.6b7b0057.chunk.css.map',
    '/static/js/2.014436ef.chunk.js',
    '/static/js/2.014436ef.chunk.js.LICENSE.txt',
    '/static/js/2.014436ef.chunk.js.map',
    '/static/js/main.61ce4430.chunk.js',
    '/static/js/main.61ce4430.chunk.js.map',
    '/static/js/runtime-main.2ef50ac3.js',
    '/static/js/runtime-main.2ef50ac3.js.map',
    '/logo.png',
    '/manifest.json',
    '/asset-manifest.json'
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