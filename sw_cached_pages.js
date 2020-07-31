const cacheName = 'v1'

//install the service worker

self.addEventListener('install', () => {
    console.log('service worker installed')
})

//activate the service worker

self.addEventListener('activate', (e) => {
    //console.log('Activated');
    //remove unwanted cache
    e.waitUntil(
        caches.keys()
        .then(cachesName => {
            return Promise.all(
                cachesName.map(cache => {
                    if (cache !== cacheName) {
                        //console.log("service worker cleared old cache")
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

//fetch the request files from cache storage

self.addEventListener('fetch', e => {
    //console.log('service worker is fetching');

    e.respondWith(
        fetch(e.request)
        .then(res => {
            //make clone of res
            let resClone = res.clone();
            //open caches
            caches.open(cacheName)
                .then(cache => {
                    //add response to cache
                    cache.put(e.request, resClone);
                });
            return res;
        })
        .catch(err => {
            caches.match(e.request)
                .then(res => res);
        })
    );
});