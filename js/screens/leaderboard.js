// ──────────────────────────────────────────────
// Leaderboard Screen — Rankings with animated podium
// ──────────────────────────────────────────────
import { store } from '../store.js';
import { router } from '../router.js';
import { showNavbar, setActiveTab } from '../components/navbar.js';

let container = null;
let countUpIntervals = [];

// ── Lifecycle ────────────────────────────────

export function init() {
  container = document.getElementById('screen-leaderboard');
}

export function render() {
  if (!container) container = document.getElementById('screen-leaderboard');
  clearAllIntervals();

  const leaderboard = store.getLeaderboard();
  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  // Reorder podium: [2nd, 1st, 3rd]
  const podiumOrder = top3.length >= 3
    ? [top3[1], top3[0], top3[2]]
    : top3;

  container.innerHTML = `
    <div class="leaderboard-container fade-in">
      <div class="leaderboard-header">
        <h2 class="leaderboard-title">🏆 Rankings</h2>
        <p class="leaderboard-subtitle">Compete with history's greatest minds</p>
      </div>

      <!-- Podium -->
      <div class="podium-section">
        <div class="podium-row">
          ${podiumOrder.map((entry, i) => {
            const podiumClass = i === 1 ? 'podium-gold' : i === 0 ? 'podium-silver' : 'podium-bronze';
            const podiumRank = i === 1 ? 1 : i === 0 ? 2 : 3;
            const podiumHeight = i === 1 ? '140px' : i === 0 ? '100px' : '80px';
            const crown = podiumRank === 1 ? '<span class="podium-crown">👑</span>' : '';
            const isUser = entry.isUser ? 'podium-user' : '';
            return `
              <div class="podium-column ${podiumClass} ${isUser}" style="--podium-height: ${podiumHeight}">
                <div class="podium-avatar-wrap">
                  ${crown}
                  <span class="podium-avatar">${entry.avatar}</span>
                </div>
                <span class="podium-name">${entry.name}</span>
                <span class="podium-xp" data-target="${entry.totalXp}">0 XP</span>
                <div class="podium-pillar">
                  <span class="podium-rank">${podiumRank}</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Remaining ranks -->
      ${rest.length > 0 ? `
        <div class="leaderboard-list">
          ${rest.map(entry => `
            <div class="leaderboard-row ${entry.isUser ? 'leaderboard-user' : ''} slide-up">
              <span class="leaderboard-rank">${entry.rank}</span>
              <span class="leaderboard-avatar">${entry.avatar}</span>
              <div class="leaderboard-info">
                <span class="leaderboard-name">${entry.name}${entry.isUser ? ' <span class="leaderboard-you-badge">You</span>' : ''}</span>
                <span class="leaderboard-level">Level ${entry.level}</span>
              </div>
              <span class="leaderboard-xp-value" data-target="${entry.totalXp}">0 XP</span>
            </div>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `;

  // Animate XP count-up
  requestAnimationFrame(() => animateXPCountUp());
}

export function onEnter() {
  setActiveTab('leaderboard');
  showNavbar();
  render();
}

export function onLeave() {
  clearAllIntervals();
}

// ── Helpers ──────────────────────────────────

function clearAllIntervals() {
  countUpIntervals.forEach(id => clearInterval(id));
  countUpIntervals = [];
}

function animateXPCountUp() {
  const elements = container.querySelectorAll('[data-target]');
  const duration = 1000;
  const stepMs = 30;
  const steps = Math.ceil(duration / stepMs);

  elements.forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    let current = 0;
    const increment = target / steps;

    const intervalId = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(intervalId);
      }
      el.textContent = `${Math.round(current).toLocaleString()} XP`;
    }, stepMs);

    countUpIntervals.push(intervalId);
  });
}
