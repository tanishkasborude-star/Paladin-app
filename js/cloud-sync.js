// ──────────────────────────────────────────────
// Cloud Sync Service — Paladin App
// ──────────────────────────────────────────────
import { db, firebaseReady } from './firebase-config.js';
import { authService } from './auth.js';

export const cloudSync = {
  /** Push local state to Firestore */
  async syncToCloud(state) {
    if (!firebaseReady || !db) return;
    const user = authService.getCurrentUser();
    if (!user) return;

    try {
      const batch = db.batch();

      // User document
      const userRef = db.collection('users').doc(user.uid);
      batch.set(userRef, {
        profile: {
          name: state.user.name,
          avatar: state.user.avatar,
          email: user.email || ''
        },
        progress: {
          level: state.user.level,
          xp: state.user.xp,
          totalXp: state.user.totalXp,
          completedLessons: state.completedLessons || [],
          quizScores: state.quizScores || {},
          streak: state.streak || { current: 0, longest: 0, lastPlayedDate: null },
          unlockedEras: state.unlockedEras || ['ancient'],
          achievements: state.achievements || [],
          dailyChallenge: state.dailyChallenge || { lastCompleted: null, bestScore: 0 }
        },
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });

      // Leaderboard entry
      const lbRef = db.collection('leaderboard').doc(user.uid);
      batch.set(lbRef, {
        name: state.user.name,
        avatar: state.user.avatar,
        totalXp: state.user.totalXp,
        level: state.user.level,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });

      await batch.commit();
    } catch (e) {
      console.warn('[CloudSync] Sync to cloud failed:', e.message);
    }
  },

  /** Pull Firestore data to local */
  async syncFromCloud() {
    if (!firebaseReady || !db) return null;
    const user = authService.getCurrentUser();
    if (!user) return null;

    try {
      const doc = await db.collection('users').doc(user.uid).get();
      if (!doc.exists) return null;

      const d = doc.data();
      return {
        user: {
          name: d.profile?.name || '',
          avatar: d.profile?.avatar || '',
          level: d.progress?.level || 1,
          xp: d.progress?.xp || 0,
          totalXp: d.progress?.totalXp || 0
        },
        completedLessons: d.progress?.completedLessons || [],
        quizScores: d.progress?.quizScores || {},
        streak: d.progress?.streak || { current: 0, longest: 0, lastPlayedDate: null },
        unlockedEras: d.progress?.unlockedEras || ['ancient'],
        achievements: d.progress?.achievements || [],
        dailyChallenge: d.progress?.dailyChallenge || { lastCompleted: null, bestScore: 0 }
      };
    } catch (e) {
      console.warn('[CloudSync] Fetch from cloud failed:', e.message);
      return null;
    }
  },

  /** Get real leaderboard from Firestore (top N users) */
  async getRealLeaderboard(limit = 20) {
    if (!firebaseReady || !db) return null;
    try {
      const snapshot = await db.collection('leaderboard')
        .orderBy('totalXp', 'desc')
        .limit(limit)
        .get();

      const user = authService.getCurrentUser();
      return snapshot.docs.map((doc, i) => ({
        name: doc.data().name || 'Unknown',
        avatar: doc.data().avatar || '🏛️',
        totalXp: doc.data().totalXp || 0,
        level: doc.data().level || 1,
        isUser: user ? doc.id === user.uid : false,
        rank: i + 1
      }));
    } catch (e) {
      console.warn('[CloudSync] Leaderboard fetch failed:', e.message);
      return null; // Caller falls back to simulated leaderboard
    }
  }
};
