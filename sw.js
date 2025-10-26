const CACHE_NAME = 'terminal-portfolio-v1';
const DEBUG = false;
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/scripts.js',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        if (DEBUG) console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        // Special handling for GitHub API requests
        if (event.request.url.includes('api.github.com')) {
          return fetch(event.request)
            .then(response => {
              // Don't cache API responses, let the app handle caching
              return response;
            })
            .catch(() => {
              // Return cached offline response for GitHub API
              return new Response(JSON.stringify([
                {
                  name: "terminal-portfolio",
                  html_url: "https://github.com/renancavalcantercb/renancavalcantercb.github.io",
                  description: "Interactive terminal-style portfolio (Offline)"
                }
              ]), {
                headers: { 'Content-Type': 'application/json' }
              });
            });
        }
        
        return fetch(event.request);
      })
  );
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            if (DEBUG) console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});