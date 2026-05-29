// ──────────────────────────────────────────────
// Onboarding Screen — First-launch avatar & name
// ──────────────────────────────────────────────
import { store } from '../store.js';
import { router } from '../router.js';
import { showToast } from '../components/toast.js';
import { hideNavbar } from '../components/navbar.js';

let container = null;
let selectedAvatar = null;
let enteredName = '';

const AVATARS = ['🏛️', '⚔️', '👑', '🗡️', '🛡️', '🏰', '📜', '🌍'];

// ── Lifecycle ────────────────────────────────

export function init() {
  container = document.getElementById('screen-onboarding');
}

export function render() {
  if (!container) container = document.getElementById('screen-onboarding');
  selectedAvatar = null;
  enteredName = '';

  container.innerHTML = `
    <div class="onboarding-container fade-in">
      <!-- Logo / Hero -->
      <div class="onboarding-logo">
        <span class="onboarding-logo-icon">⚜️</span>
      </div>

      <h1 class="onboarding-title">Paladin</h1>
      <p class="onboarding-subtitle">Begin Your Journey Through History</p>

      <!-- Step 1 — Avatar -->
      <div class="onboarding-step slide-up">
        <h3 class="section-title text-center">Choose Your Avatar</h3>
        <div class="avatar-grid">
          ${AVATARS.map(a => `
            <button class="avatar-option" data-avatar="${a}" aria-label="Avatar ${a}">
              ${a}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Step 2 — Name -->
      <div class="onboarding-step slide-up">
        <h3 class="section-title text-center">What's Your Name?</h3>
        <div class="name-input-group">
          <input
            type="text"
            class="name-input"
            id="onboarding-name"
            placeholder="Enter your name, explorer..."
            maxlength="20"
            autocomplete="off"
          />
        </div>
      </div>

      <!-- CTA -->
      <button class="btn btn-primary btn-lg onboarding-cta btn-disabled" id="onboarding-start" disabled>
        Start Your Adventure
      </button>
    </div>
  `;

  // ── Event delegation ──
  container.addEventListener('click', handleClick);
  const nameInput = container.querySelector('#onboarding-name');
  if (nameInput) {
    nameInput.addEventListener('input', handleNameInput);
  }
}

export function onEnter() {
  hideNavbar();
  render();
}

export function onLeave() {
  // Clean up listeners
  if (container) {
    container.removeEventListener('click', handleClick);
    const nameInput = container.querySelector('#onboarding-name');
    if (nameInput) nameInput.removeEventListener('input', handleNameInput);
  }
}

// ── Handlers ─────────────────────────────────

function handleClick(e) {
  const target = e.target.closest('[data-avatar]');
  if (target) {
    selectAvatar(target);
    return;
  }

  if (e.target.closest('#onboarding-start')) {
    startAdventure();
    return;
  }
}

function selectAvatar(el) {
  // Deselect previous
  container.querySelectorAll('.avatar-option').forEach(opt => opt.classList.remove('selected'));
  // Select new
  el.classList.add('selected');
  selectedAvatar = el.dataset.avatar;
  updateCTA();
}

function handleNameInput(e) {
  enteredName = e.target.value.trim();
  updateCTA();
}

function updateCTA() {
  const btn = container.querySelector('#onboarding-start');
  if (!btn) return;
  const ready = selectedAvatar && enteredName.length > 0;
  btn.disabled = !ready;
  btn.classList.toggle('btn-disabled', !ready);
}

function startAdventure() {
  if (!selectedAvatar || !enteredName) return;

  // Initialise user & streak
  store.initUser(enteredName, selectedAvatar);
  store.updateStreak();

  // Quick celebration
  showToast(`Welcome, ${enteredName}! Your journey begins now.`, 'success');

  // Navigate to home
  router.navigate('home');
}
