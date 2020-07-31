//main source to file
require('./navigation/reloadApp');
require('./navigation/mainApp');

//service worker registration
if ("serviceWorker" in navigator) {
    //console.log(navigator);
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register("../../sw_cached_pages.js")
            .then(reg => {
                console.log(`Service worker registered: ${reg}`);
            })
            .catch(err => {
                //console.log(`ServiceWorker not registered: ${err}`);
            })
    });
}