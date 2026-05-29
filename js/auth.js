// ──────────────────────────────────────────────
// Auth Service — Paladin App
// ──────────────────────────────────────────────
import { auth, db, firebaseReady } from './firebase-config.js';

export const authService = {
  /** @returns {boolean} Whether Firebase auth is available */
  isAvailable() {
    return firebaseReady && auth !== null;
  },

  /** Sign up with email + password */
  async signUp(email, password) {
    if (!this.isAvailable()) return { success: false, error: 'Firebase not configured' };
    try {
      const cred = await auth.createUserWithEmailAndPassword(email, password);
      await db.collection('users').doc(cred.user.uid).set({
        email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        profile: { name: '', avatar: '' },
        progress: {
          level: 1, xp: 0, totalXp: 0,
          completedLessons: [],
          quizScores: {},
          streak: { current: 0, longest: 0, lastPlayedDate: null },
          unlockedEras: ['ancient'],
          achievements: [],
          dailyChallenge: { lastCompleted: null, bestScore: 0 }
        }
      });
      return { success: true, user: cred.user };
    } catch (error) {
      return { success: false, error: this._friendlyError(error.code) };
    }
  },

  /** Sign in with email + password */
  async signIn(email, password) {
    if (!this.isAvailable()) return { success: false, error: 'Firebase not configured' };
    try {
      const cred = await auth.signInWithEmailAndPassword(email, password);
      return { success: true, user: cred.user };
    } catch (error) {
      return { success: false, error: this._friendlyError(error.code) };
    }
  },

  /** Sign in with Google popup */
  async signInWithGoogle() {
    if (!this.isAvailable()) return { success: false, error: 'Firebase not configured' };
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const cred = await auth.signInWithPopup(provider);
      const doc = await db.collection('users').doc(cred.user.uid).get();
      if (!doc.exists) {
        await db.collection('users').doc(cred.user.uid).set({
          email: cred.user.email,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          profile: { name: cred.user.displayName || '', avatar: '🏛️' },
          progress: {
            level: 1, xp: 0, totalXp: 0,
            completedLessons: [],
            quizScores: {},
            streak: { current: 0, longest: 0, lastPlayedDate: null },
            unlockedEras: ['ancient'],
            achievements: [],
            dailyChallenge: { lastCompleted: null, bestScore: 0 }
          }
        });
      }
      return { success: true, user: cred.user, isNew: !doc.exists };
    } catch (error) {
      return { success: false, error: this._friendlyError(error.code) };
    }
  },

  /** Sign out */
  async signOut() {
    if (!this.isAvailable()) return { success: true };
    try {
      await auth.signOut();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  /** Get current Firebase user (or null) */
  getCurrentUser() {
    return auth ? auth.currentUser : null;
  },

  /** Listen for auth state changes */
  onAuthStateChanged(callback) {
    if (!auth) return () => {};
    return auth.onAuthStateChanged(callback);
  },

  /** Check if user has completed onboarding */
  async hasCompletedOnboarding(uid) {
    if (!db) return false;
    try {
      const doc = await db.collection('users').doc(uid).get();
      if (doc.exists) {
        const data = doc.data();
        return !!(data.profile && data.profile.name && data.profile.name.length > 0);
      }
      return false;
    } catch (e) {
      return false;
    }
  },

  /** Convert Firebase error codes to friendly messages */
  _friendlyError(code) {
    const map = {
      'auth/email-already-in-use': 'This email is already registered. Try signing in.',
      'auth/invalid-email': 'Please enter a valid email address.',
      'auth/user-not-found': 'No account found with this email.',
      'auth/wrong-password': 'Incorrect password. Please try again.',
      'auth/weak-password': 'Password must be at least 6 characters.',
      'auth/too-many-requests': 'Too many attempts. Please wait a moment.',
      'auth/popup-closed-by-user': 'Sign-in popup was closed.',
      'auth/network-request-failed': 'Network error. Check your connection.',
      'auth/invalid-credential': 'Invalid credentials. Please check and try again.'
    };
    return map[code] || 'An error occurred. Please try again.';
  }
};
