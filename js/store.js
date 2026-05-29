import { lessons } from './data/lessons.js';
import { skillTreeData } from './data/skillTree.js';
import { cloudSync } from './cloud-sync.js';

const STORAGE_KEY = 'paladin_app_state';

const DEFAULT_STATE = {
  user: { name: '', avatar: '', level: 1, xp: 0, totalXp: 0 },
  completedLessons: [],
  quizScores: {},
  streak: { current: 0, longest: 0, lastPlayedDate: null },
  unlockedEras: ['ancient'],
  dailyChallenge: { lastCompleted: null, bestScore: 0 },
  achievements: []
};

export const store = {
  _state: null,
  _listeners: [],
  _syncTimeout: null,

  _debouncedSync() {
    if (this._syncTimeout) clearTimeout(this._syncTimeout);
    this._syncTimeout = setTimeout(() => {
      cloudSync.syncToCloud(this._state).catch(() => {});
    }, 500);
  },

  _load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // Deep merge with defaults to handle schema migrations gracefully
        this._state = {
          ...JSON.parse(JSON.stringify(DEFAULT_STATE)),
          ...parsed,
          user: { ...DEFAULT_STATE.user, ...(parsed.user || {}) },
          streak: { ...DEFAULT_STATE.streak, ...(parsed.streak || {}) },
          dailyChallenge: { ...DEFAULT_STATE.dailyChallenge, ...(parsed.dailyChallenge || {}) }
        };
      } else {
        this._state = JSON.parse(JSON.stringify(DEFAULT_STATE));
      }
    } catch (e) {
      console.warn('[Store] Failed to load state, resetting to defaults:', e);
      this._state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    }
  },

  _save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this._state));
    } catch (e) {
      console.error('[Store] Failed to save state:', e);
    }
    // Debounced cloud sync
    this._debouncedSync();
  },

  subscribe(callback) {
    this._listeners.push(callback);
    return () => {
      this._listeners = this._listeners.filter(cb => cb !== callback);
    };
  },

  _notify() {
    const state = this._state;
    this._listeners.forEach(cb => {
      try {
        cb(state);
      } catch (e) {
        console.error('[Store] Listener error:', e);
      }
    });
  },

  getState() {
    if (this._state === null) {
      this._load();
    }
    return this._state;
  },

  setState(partial) {
    if (this._state === null) {
      this._load();
    }
    for (const key of Object.keys(partial)) {
      if (
        partial[key] !== null &&
        typeof partial[key] === 'object' &&
        !Array.isArray(partial[key]) &&
        typeof this._state[key] === 'object' &&
        this._state[key] !== null &&
        !Array.isArray(this._state[key])
      ) {
        Object.assign(this._state[key], partial[key]);
      } else {
        this._state[key] = partial[key];
      }
    }
    this._save();
    this._notify();
  },

  isNewUser() {
    return localStorage.getItem(STORAGE_KEY) === null;
  },

  initUser(name, avatar) {
    const state = this.getState();
    state.user.name = name;
    state.user.avatar = avatar;
    this._save();
  },

  addXP(amount) {
    const state = this.getState();
    state.user.xp += amount;
    state.user.totalXp += amount;
    const newLevel = Math.max(1, Math.floor(Math.sqrt(state.user.totalXp / 50)) + 1);
    const leveledUp = newLevel > state.user.level;
    state.user.level = newLevel;
    this._save();
    this._notify();
    return { newXP: state.user.xp, leveledUp, newLevel };
  },

  getLevel() {
    return this.getState().user.level;
  },

  getLevelProgress() {
    const state = this.getState();
    const level = state.user.level;
    const xpForCurrentLevel = Math.pow(level - 1, 2) * 50;
    const xpForNextLevel = Math.pow(level, 2) * 50;
    const xpIntoLevel = state.user.totalXp - xpForCurrentLevel;
    const xpNeeded = xpForNextLevel - xpForCurrentLevel;
    return {
      current: xpIntoLevel,
      needed: xpNeeded,
      percentage: Math.min(100, Math.floor((xpIntoLevel / xpNeeded) * 100))
    };
  },

  completeLesson(lessonId, score, maxScore) {
    const state = this.getState();
    if (!state.completedLessons.includes(lessonId)) {
      state.completedLessons.push(lessonId);
    }
    state.quizScores[lessonId] = { score, maxScore };

    let xpEarned = 50 + Math.round((score / maxScore) * 50);

    const streakMultiplier = 1 + Math.min(state.streak.current, 5) * 0.2;
    xpEarned = Math.round(xpEarned * streakMultiplier);

    const result = this.addXP(xpEarned);
    this.checkAndUnlockEras();
    this.updateStreak();

    return { xpEarned, leveledUp: result.leveledUp, newLevel: result.newLevel };
  },

  isLessonCompleted(id) {
    return this.getState().completedLessons.includes(id);
  },

  getCompletedLessonsInEra(era) {
    const state = this.getState();
    const eraLessonIds = lessons.filter(l => l.era === era).map(l => l.id);
    return state.completedLessons.filter(id => eraLessonIds.includes(id)).length;
  },

  isEraUnlocked(era) {
    return this.getState().unlockedEras.includes(era);
  },

  unlockEra(era) {
    const state = this.getState();
    if (!state.unlockedEras.includes(era)) {
      state.unlockedEras.push(era);
      this._save();
      this._notify();
    }
  },

  checkAndUnlockEras() {
    const prereqs = skillTreeData.prerequisites;
    for (const [eraId, req] of Object.entries(prereqs)) {
      const completed = this.getCompletedLessonsInEra(req.era);
      if (completed >= req.requiredLessons) {
        this.unlockEra(eraId);
      }
    }
  },

  updateStreak() {
    const state = this.getState();
    const today = new Date().toISOString().split('T')[0];

    if (state.streak.lastPlayedDate === today) return;

    if (state.streak.lastPlayedDate) {
      const lastDate = new Date(state.streak.lastPlayedDate);
      const todayDate = new Date(today);
      const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        state.streak.current += 1;
      } else {
        state.streak.current = 1;
      }
    } else {
      state.streak.current = 1;
    }

    if (state.streak.current > state.streak.longest) {
      state.streak.longest = state.streak.current;
    }
    state.streak.lastPlayedDate = today;
    this._save();
    this._notify();
  },

  getStreak() {
    return this.getState().streak;
  },

  completeDailyChallenge(score) {
    const state = this.getState();
    const today = new Date().toISOString().split('T')[0];
    state.dailyChallenge.lastCompleted = today;
    if (score > state.dailyChallenge.bestScore) {
      state.dailyChallenge.bestScore = score;
    }
    const xpEarned = 100 + score * 20;
    this._save();
    this._notify();
    return this.addXP(xpEarned);
  },

  isDailyChallengeCompleted() {
    const today = new Date().toISOString().split('T')[0];
    return this.getState().dailyChallenge.lastCompleted === today;
  },

  getLeaderboard() {
    const state = this.getState();
    const npcs = [
      { name: 'Alexander', avatar: '🏛️', totalXp: 4200, level: 10 },
      { name: 'Cleopatra', avatar: '👑', totalXp: 3800, level: 9 },
      { name: 'Leonidas', avatar: '⚔️', totalXp: 3200, level: 8 },
      { name: 'Boudicca', avatar: '🛡️', totalXp: 2900, level: 8 },
      { name: 'Genghis', avatar: '🏹', totalXp: 2500, level: 7 },
      { name: 'Athena', avatar: '🦉', totalXp: 2100, level: 7 },
      { name: 'Hannibal', avatar: '🐘', totalXp: 1800, level: 6 },
      { name: 'Spartacus', avatar: '💪', totalXp: 1400, level: 5 },
      { name: 'Nefertiti', avatar: '✨', totalXp: 900, level: 4 },
      { name: 'Achilles', avatar: '🗡️', totalXp: 500, level: 3 }
    ];

    const userEntry = {
      name: state.user.name || 'You',
      avatar: state.user.avatar || '🎮',
      totalXp: state.user.totalXp,
      level: state.user.level,
      isUser: true
    };

    const leaderboard = [...npcs, userEntry];
    leaderboard.sort((a, b) => b.totalXp - a.totalXp);
    return leaderboard.map((entry, i) => ({ ...entry, rank: i + 1 }));
  },

  getAchievements() {
    const state = this.getState();
    const achievements = [
      { id: 'first-lesson', name: 'Scholar Initiate', icon: '📜', description: 'Complete your first lesson', earned: state.completedLessons.length >= 1 },
      { id: 'five-lessons', name: 'Knowledge Seeker', icon: '📚', description: 'Complete 5 lessons', earned: state.completedLessons.length >= 5 },
      { id: 'perfect-quiz', name: 'Perfect Mind', icon: '🧠', description: 'Get 100% on any quiz', earned: Object.values(state.quizScores).some(s => s.score === s.maxScore) },
      { id: 'streak-3', name: 'Consistent', icon: '🔥', description: '3-day streak', earned: state.streak.current >= 3 || state.streak.longest >= 3 },
      { id: 'streak-7', name: 'Dedicated', icon: '💎', description: '7-day streak', earned: state.streak.longest >= 7 },
      { id: 'daily-first', name: 'Challenger', icon: '⚔️', description: 'Complete a daily challenge', earned: state.dailyChallenge.lastCompleted !== null },
      { id: 'era-unlock', name: 'Era Explorer', icon: '🗺️', description: 'Unlock a new era', earned: state.unlockedEras.length >= 2 },
      { id: 'level-5', name: 'Veteran', icon: '👑', description: 'Reach level 5', earned: state.user.level >= 5 }
    ];
    return achievements;
  },

  resetProgress() {
    localStorage.removeItem(STORAGE_KEY);
    this._state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    this._notify();
  },

  /** Load state from Firestore cloud */
  async loadFromCloud() {
    const cloudState = await cloudSync.syncFromCloud();
    if (cloudState) {
      this._state = {
        ...this._state,
        ...cloudState,
        user: { ...this._state.user, ...cloudState.user },
        streak: { ...this._state.streak, ...cloudState.streak },
        dailyChallenge: { ...this._state.dailyChallenge, ...cloudState.dailyChallenge }
      };
      // Save to localStorage without triggering cloud sync
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this._state));
      } catch (e) { /* ignore */ }
      this._notify();
    }
  },

  /** Fetch real leaderboard from Firestore */
  async getCloudLeaderboard() {
    return await cloudSync.getRealLeaderboard();
  }
};

// Initialize on load
store._load();
