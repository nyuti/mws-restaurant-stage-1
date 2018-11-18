if (navigator.serviceWorker) {
    navigator.serviceWorker.register('restaurant-worker.js')
        .then(() => console.log('service worker installed'))
        .catch(err => console.log('error', err));
}