// ──────────────────────────────────────────────
// Auth Screen — Login / Sign Up
// ──────────────────────────────────────────────
import { authService } from '../auth.js';
import { router } from '../router.js';
import { showToast } from '../components/toast.js';
import { hideNavbar } from '../components/navbar.js';
import { store } from '../store.js';

let container = null;
let mode = 'signin'; // 'signin' | 'signup'
let isLoading = false;

export function init() {
  container = document.getElementById('screen-auth');
}

export function render() {
  if (!container) container = document.getElementById('screen-auth');

  container.innerHTML = `
    <div class="auth-container fade-in">
      <!-- Logo -->
      <div class="onboarding-logo">
        <span class="onboarding-logo-icon">⚜️</span>
      </div>
      <h1 class="auth-title">Paladin</h1>
      <p class="auth-subtitle">Your gateway to history</p>

      <!-- Mode Tabs -->
      <div class="auth-tabs">
        <button class="auth-tab ${mode === 'signin' ? 'active' : ''}" data-mode="signin">Sign In</button>
        <button class="auth-tab ${mode === 'signup' ? 'active' : ''}" data-mode="signup">Sign Up</button>
      </div>

      <!-- Form -->
      <form class="auth-form" id="auth-form">
        <div class="auth-input-group">
          <label class="auth-label" for="auth-email">Email</label>
          <input type="email" class="name-input" id="auth-email"
                 placeholder="you@example.com" autocomplete="email" required />
        </div>

        <div class="auth-input-group">
          <label class="auth-label" for="auth-password">Password</label>
          <input type="password" class="name-input" id="auth-password"
                 placeholder="At least 6 characters" autocomplete="${mode === 'signup' ? 'new-password' : 'current-password'}"
                 minlength="6" required />
        </div>

        ${mode === 'signup' ? `
        <div class="auth-input-group slide-up">
          <label class="auth-label" for="auth-confirm">Confirm Password</label>
          <input type="password" class="name-input" id="auth-confirm"
                 placeholder="Repeat your password" autocomplete="new-password"
                 minlength="6" required />
        </div>
        ` : ''}

        <!-- Error Display -->
        <div class="auth-error hidden" id="auth-error"></div>

        <!-- Submit -->
        <button type="submit" class="btn btn-primary btn-lg auth-submit" id="auth-submit"
                ${isLoading ? 'disabled' : ''}>
          ${isLoading
            ? (mode === 'signup' ? 'Creating Account...' : 'Signing In...')
            : (mode === 'signup' ? 'Create Account' : 'Sign In')}
        </button>
      </form>

      <!-- Divider -->
      <div class="auth-divider">
        <span>or</span>
      </div>

      <!-- Google Sign In -->
      <button class="auth-google-btn" id="auth-google" ${isLoading ? 'disabled' : ''}>
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path fill="#4285F4" d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/>
          <path fill="#34A853" d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.565 24 12.255 24z"/>
          <path fill="#FBBC05" d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 000 10.76l3.98-3.09z"/>
          <path fill="#EA4335" d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/>
        </svg>
        Continue with Google
      </button>

      <!-- Skip for local mode -->
      <button class="auth-skip" id="auth-skip">
        Skip — use without account
      </button>
    </div>
  `;

  bindEvents();
}

export function onEnter() {
  hideNavbar();
  mode = 'signin';
  isLoading = false;
  render();
}

export function onLeave() {
  if (container) {
    container.removeEventListener('click', handleClick);
    const form = container.querySelector('#auth-form');
    if (form) form.removeEventListener('submit', handleSubmit);
  }
}

// ── Private ──────────────────────────────────

function bindEvents() {
  container.addEventListener('click', handleClick);
  const form = container.querySelector('#auth-form');
  if (form) form.addEventListener('submit', handleSubmit);
}

function handleClick(e) {
  // Tab toggle
  const tab = e.target.closest('.auth-tab');
  if (tab) {
    const newMode = tab.dataset.mode;
    if (newMode !== mode) {
      mode = newMode;
      render();
    }
    return;
  }

  // Google Sign In
  if (e.target.closest('#auth-google')) {
    handleGoogle();
    return;
  }

  // Skip (local mode)
  if (e.target.closest('#auth-skip')) {
    handleSkip();
    return;
  }
}

async function handleSubmit(e) {
  e.preventDefault();
  if (isLoading) return;

  const email = container.querySelector('#auth-email')?.value?.trim();
  const password = container.querySelector('#auth-password')?.value;
  const confirm = container.querySelector('#auth-confirm')?.value;

  // Validate
  if (!email || !password) {
    showError('Please fill in all fields.');
    return;
  }
  if (!email.includes('@') || !email.includes('.')) {
    showError('Please enter a valid email address.');
    return;
  }
  if (password.length < 6) {
    showError('Password must be at least 6 characters.');
    return;
  }
  if (mode === 'signup' && password !== confirm) {
    showError('Passwords do not match.');
    return;
  }

  setLoading(true);
  hideError();

  let result;
  if (mode === 'signup') {
    result = await authService.signUp(email, password);
  } else {
    result = await authService.signIn(email, password);
  }

  setLoading(false);

  if (result.success) {
    showToast(mode === 'signup' ? 'Account created! 🎉' : 'Welcome back! 👋', 'success');
    // Auth state listener in app.js handles navigation
    if (mode === 'signup') {
      router.navigate('onboarding');
    } else {
      // Load cloud data, then route
      try { await store.loadFromCloud(); } catch(e) { /* use local */ }
      const state = store.getState();
      if (state.user.name) {
        store.updateStreak();
        const { showNavbar, setActiveTab } = await import('../components/navbar.js');
        showNavbar();
        setActiveTab('home');
        router.navigate('home');
      } else {
        router.navigate('onboarding');
      }
    }
  } else {
    showError(result.error);
  }
}

async function handleGoogle() {
  if (isLoading) return;
  setLoading(true);
  hideError();

  const result = await authService.signInWithGoogle();
  setLoading(false);

  if (result.success) {
    showToast('Signed in with Google! 🎉', 'success');
    if (result.isNew) {
      router.navigate('onboarding');
    } else {
      try { await store.loadFromCloud(); } catch(e) {}
      const state = store.getState();
      if (state.user.name) {
        store.updateStreak();
        const { showNavbar, setActiveTab } = await import('../components/navbar.js');
        showNavbar();
        setActiveTab('home');
        router.navigate('home');
      } else {
        router.navigate('onboarding');
      }
    }
  } else {
    showError(result.error);
  }
}

function handleSkip() {
  // Skip auth, use localStorage only
  if (store.isNewUser()) {
    hideNavbar();
    router.navigate('onboarding');
  } else {
    store.updateStreak();
    import('../components/navbar.js').then(({ showNavbar, setActiveTab }) => {
      showNavbar();
      setActiveTab('home');
      router.navigate('home');
    });
  }
}

function showError(msg) {
  const el = container.querySelector('#auth-error');
  if (el) {
    el.textContent = msg;
    el.classList.remove('hidden');
  }
}

function hideError() {
  const el = container.querySelector('#auth-error');
  if (el) el.classList.add('hidden');
}

function setLoading(val) {
  isLoading = val;
  const btn = container.querySelector('#auth-submit');
  const google = container.querySelector('#auth-google');
  if (btn) {
    btn.disabled = val;
    btn.textContent = val
      ? (mode === 'signup' ? 'Creating Account...' : 'Signing In...')
      : (mode === 'signup' ? 'Create Account' : 'Sign In');
  }
  if (google) google.disabled = val;
}
