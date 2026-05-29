// ──────────────────────────────────────────────
// Firebase Configuration — Paladin App
// ──────────────────────────────────────────────
// Firebase SDK is loaded via CDN script tags in index.html
// This module initializes the app and exports auth/db instances.

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID'
};

let app = null;
let auth = null;
let db = null;
let firebaseReady = false;

try {
  if (typeof firebase !== 'undefined') {
    if (!firebase.apps.length) {
      app = firebase.initializeApp(firebaseConfig);
    } else {
      app = firebase.apps[0];
    }
    auth = firebase.auth();
    db = firebase.firestore();

    // Enable offline persistence
    db.enablePersistence({ synchronizeTabs: true }).catch(err => {
      if (err.code === 'failed-precondition') {
        console.warn('[Firebase] Multiple tabs open, persistence only in one.');
      } else if (err.code === 'unimplemented') {
        console.warn('[Firebase] Browser does not support persistence.');
      }
    });

    // Check if config is placeholder
    firebaseReady = firebaseConfig.apiKey !== 'YOUR_API_KEY';
    if (!firebaseReady) {
      console.info('[Firebase] Using placeholder config — running in local-only mode.');
    }
  } else {
    console.info('[Firebase] SDK not loaded — running in local-only mode.');
  }
} catch (e) {
  console.warn('[Firebase] Init failed:', e.message);
}

export { auth, db, firebaseReady };
