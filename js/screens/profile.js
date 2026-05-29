// ──────────────────────────────────────────────
// Profile Screen — Stats, achievements, and settings
// ──────────────────────────────────────────────
import { store } from '../store.js';
import { router } from '../router.js';
import { showToast } from '../components/toast.js';
import { showNavbar, setActiveTab } from '../components/navbar.js';

let container = null;

// ── Lifecycle ────────────────────────────────

export function init() {
  container = document.getElementById('screen-profile');
}

export function render() {
  if (!container) container = document.getElementById('screen-profile');

  const state = store.getState();
  const progress = store.getLevelProgress();
  const streak = store.getStreak();
  const achievements = store.getAchievements();

  // Count quizzes aced (score === maxScore)
  const quizzesAced = Object.values(state.quizScores).filter(s => s.score === s.maxScore).length;

  container.innerHTML = `
    <div class="profile-container fade-in">

      <!-- Header -->
      <div class="profile-header glass-card">
        <div class="profile-avatar-ring">
          <span class="profile-avatar">${state.user.avatar || '🎮'}</span>
        </div>
        <h2 class="profile-name">${state.user.name || 'Explorer'}</h2>
        <div class="profile-level-badge">
          <span class="profile-level-icon">⚜️</span>
          <span>Level ${state.user.level}</span>
        </div>
      </div>

      <!-- XP Progress -->
      <div class="profile-xp-section glass-card">
        <div class="profile-xp-header">
          <span class="profile-xp-label">Experience Points</span>
          <span class="profile-xp-numbers">${progress.current} / ${progress.needed} XP</span>
        </div>
        <div class="profile-xp-track">
          <div class="profile-xp-fill" style="width: ${progress.percentage}%">
            <span class="profile-xp-glow"></span>
          </div>
        </div>
        <div class="profile-xp-footer">
          <span>Level ${state.user.level}</span>
          <span>${progress.percentage}%</span>
          <span>Level ${state.user.level + 1}</span>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="profile-stats-grid">
        <div class="profile-stat-card glass-card">
          <span class="profile-stat-icon">📚</span>
          <span class="profile-stat-value">${state.completedLessons.length}</span>
          <span class="profile-stat-label">Lessons Done</span>
        </div>
        <div class="profile-stat-card glass-card">
          <span class="profile-stat-icon">🧠</span>
          <span class="profile-stat-value">${quizzesAced}</span>
          <span class="profile-stat-label">Quizzes Aced</span>
        </div>
        <div class="profile-stat-card glass-card">
          <span class="profile-stat-icon">🔥</span>
          <span class="profile-stat-value">${streak.current}</span>
          <span class="profile-stat-label">Day Streak</span>
        </div>
        <div class="profile-stat-card glass-card">
          <span class="profile-stat-icon">💎</span>
          <span class="profile-stat-value">${streak.longest}</span>
          <span class="profile-stat-label">Best Streak</span>
        </div>
      </div>

      <!-- Achievements -->
      <div class="profile-achievements-section">
        <h3 class="section-title">
          <span>🏅</span>
          <span>Achievements</span>
          <span class="profile-earned-count">${achievements.filter(a => a.earned).length}/${achievements.length}</span>
        </h3>
        <div class="profile-achievements-grid">
          ${achievements.map((ach, i) => `
            <div class="profile-achievement ${ach.earned ? 'earned' : 'locked'}" style="animation-delay: ${i * 0.05}s">
              <span class="profile-achievement-icon">${ach.icon}</span>
              <span class="profile-achievement-name">${ach.name}</span>
              <span class="profile-achievement-desc">${ach.description}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Actions -->
      <div class="profile-actions">
        <button class="btn btn-secondary" id="profile-edit-name">
          ✏️ Edit Name
        </button>
        <button class="btn btn-danger" id="profile-reset">
          🗑️ Reset Progress
        </button>
      </div>

      <div class="profile-footer">
        <span class="profile-total-xp">Total XP: ${state.user.totalXp.toLocaleString()}</span>
      </div>
    </div>
  `;

  container.removeEventListener('click', handleClick);
  container.addEventListener('click', handleClick);
}

export function onEnter() {
  setActiveTab('profile');
  showNavbar();
  render();
}

export function onLeave() {
  if (container) {
    container.removeEventListener('click', handleClick);
  }
}

// ── Handlers ─────────────────────────────────

function handleClick(e) {
  if (e.target.closest('#profile-edit-name')) {
    editName();
    return;
  }

  if (e.target.closest('#profile-reset')) {
    resetProgress();
    return;
  }
}

function editName() {
  const state = store.getState();
  const newName = prompt('Enter your new name:', state.user.name);
  if (newName && newName.trim().length > 0) {
    state.user.name = newName.trim();
    store._save();
    showToast(`Name updated to ${newName.trim()}!`, 'success');
    render();
  }
}

function resetProgress() {
  const confirmed = confirm('⚠️ This will erase ALL your progress, XP, and achievements. Are you sure?');
  if (confirmed) {
    store.resetProgress();
    showToast('Progress has been reset.', 'info');
    router.navigate('onboarding');
  }
}
