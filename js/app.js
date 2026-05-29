// ──────────────────────────────────────────────
// App Entry Point — Paladin
// ──────────────────────────────────────────────
import { store } from './store.js';
import { router } from './router.js';
import { initNavbar, setActiveTab, showNavbar, hideNavbar } from './components/navbar.js';
import { authService } from './auth.js';
import { firebaseReady } from './firebase-config.js';

// Import all screens
import * as authScreen from './screens/auth.js';
import * as onboardingScreen from './screens/onboarding.js';
import * as homeScreen from './screens/home.js';
import * as lessonScreen from './screens/lesson.js';
import * as quizScreen from './screens/quiz.js';
import * as skillTreeScreen from './screens/skillTree.js';
import * as dailyScreen from './screens/daily.js';
import * as leaderboardScreen from './screens/leaderboard.js';
import * as profileScreen from './screens/profile.js';

const routes = {
  'auth': authScreen,
  'onboarding': onboardingScreen,
  'home': homeScreen,
  'lesson': lessonScreen,
  'quiz': quizScreen,
  'skill-tree': skillTreeScreen,
  'daily': dailyScreen,
  'leaderboard': leaderboardScreen,
  'profile': profileScreen,
};

async function initApp() {
  // Initialize router and screens
  router.init(routes);

  initNavbar((tabId) => {
    router.navigate(tabId);
    setActiveTab(tabId);
  });

  Object.values(routes).forEach(screen => {
    if (screen.init) screen.init();
  });

  // ── Auth Flow ──────────────────────────────
  if (firebaseReady && authService.isAvailable()) {
    // Firebase is configured — check auth state
    const user = authService.getCurrentUser();

    if (user) {
      // Signed in — load cloud data and go to app
      try { await store.loadFromCloud(); } catch (e) { /* use local */ }
      await routeAuthenticatedUser();
    } else {
      // Not signed in — show auth screen
      hideNavbar();
      router.navigate('auth');
    }

    // Listen for future auth changes
    authService.onAuthStateChanged(async (u) => {
      if (!u && router.getCurrentScreen() !== 'auth') {
        hideNavbar();
        router.navigate('auth');
      }
    });

  } else {
    // Firebase NOT configured — run in local-only mode
    console.info('[App] Running in local-only mode (no Firebase)');
    if (store.isNewUser()) {
      hideNavbar();
      router.navigate('onboarding');
    } else {
      store.updateStreak();
      showNavbar();
      setActiveTab('home');
      router.navigate('home');
    }
  }
}

/** Route to the right screen for an authenticated user */
async function routeAuthenticatedUser() {
  const state = store.getState();
  if (!state.user.name) {
    // Needs onboarding
    hideNavbar();
    router.navigate('onboarding');
  } else {
    store.updateStreak();
    showNavbar();
    setActiveTab('home');
    router.navigate('home');
  }
}

// ── Bootstrap ────────────────────────────────
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
