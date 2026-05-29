// ──────────────────────────────────────────────
// Service Worker — Paladin App (Offline PWA)
// ──────────────────────────────────────────────
const CACHE_NAME = 'paladin-v2';

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/css/index.css',
  '/js/app.js',
  '/js/store.js',
  '/js/router.js',
  '/js/firebase-config.js',
  '/js/auth.js',
  '/js/cloud-sync.js',
  '/js/components/navbar.js',
  '/js/components/toast.js',
  '/js/components/confetti.js',
  '/js/data/lessons.js',
  '/js/data/skillTree.js',
  '/js/data/dailyChallenges.js',
  '/js/screens/auth.js',
  '/js/screens/onboarding.js',
  '/js/screens/home.js',
  '/js/screens/lesson.js',
  '/js/screens/quiz.js',
  '/js/screens/skillTree.js',
  '/js/screens/daily.js',
  '/js/screens/leaderboard.js',
  '/js/screens/profile.js',
  '/assets/characters/caesar.png',
  '/assets/characters/pharaoh.png',
  '/assets/characters/crusader.png',
  '/assets/characters/viking.png',
  '/assets/characters/revolutionary.png',
  '/assets/characters/soldier.png',
  '/manifest.json'
];

// Install — cache all assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate — clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch — stale-while-revalidate for app assets, network-only for Firebase
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Skip Firebase / Google API calls — always network
  if (url.hostname.includes('googleapis.com') ||
      url.hostname.includes('firebaseio.com') ||
      url.hostname.includes('gstatic.com') ||
      url.hostname.includes('google.com') ||
      url.hostname.includes('firestore.googleapis.com')) {
    return;
  }

  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      const fetchPromise = fetch(event.request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => cached);

      return cached || fetchPromise;
    })
  );
});
