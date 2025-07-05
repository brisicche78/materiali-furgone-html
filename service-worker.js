const CACHE_NAME = 'materiali-furgone-cache-v1'; // Nome della cache, cambia la versione per aggiornamenti
const urlsToCache = [
  '/',
  '/index.html',
  '/static/js/bundle.js', // O il percorso del tuo bundle JS di React
  '/static/css/main.css', // O il percorso del tuo CSS di React
  '/manifest.json',
  '/ducatotpc.png?raw=true', // Il tuo logo
  // Aggiungi qui tutti gli altri asset che vuoi mettere in cache (es. altre immagini, font)
];

// Evento di installazione: mette in cache gli asset essenziali
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento di fetch: intercetta le richieste e serve dalla cache se disponibile
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - restituisce la risposta dalla cache
        if (response) {
          return response;
        }
        // Nessun match nella cache - effettua la richiesta di rete
        return fetch(event.request);
      })
  );
});

// Evento di attivazione: pulisce le vecchie cache
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Elimina le cache che non sono nella whitelist
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
