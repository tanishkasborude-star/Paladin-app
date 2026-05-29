// ──────────────────────────────────────────────
// Daily Challenge Screen — Timed quiz with streak multiplier
// ──────────────────────────────────────────────
import { store } from '../store.js';
import { router } from '../router.js';
import { showToast } from '../components/toast.js';
import { launchConfetti } from '../components/confetti.js';
import { hideNavbar, showNavbar, setActiveTab } from '../components/navbar.js';
import { dailyChallenges } from '../data/dailyChallenges.js';

let container = null;
let timerInterval = null;
let autoAdvanceTimeout = null;
let currentQuestion = 0;
let score = 0;
let consecutiveCorrect = 0;
let totalXpEarned = 0;
let answered = false;
let challenge = null;

// ── Lifecycle ────────────────────────────────

export function init() {
  container = document.getElementById('screen-daily');
}

export function render() {
  if (!container) container = document.getElementById('screen-daily');
  clearAllTimers();
  currentQuestion = 0;
  score = 0;
  consecutiveCorrect = 0;
  totalXpEarned = 0;
  answered = false;

  challenge = dailyChallenges[new Date().getDay()];

  if (store.isDailyChallengeCompleted()) {
    renderCompleted();
  } else {
    renderIntro();
  }
}

export function onEnter() {
  setActiveTab('daily');
  showNavbar();
  render();
}

export function onLeave() {
  clearAllTimers();
  if (container) {
    container.removeEventListener('click', handleClick);
  }
}

// ── Timer cleanup ────────────────────────────

function clearAllTimers() {
  if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
  if (autoAdvanceTimeout) { clearTimeout(autoAdvanceTimeout); autoAdvanceTimeout = null; }
}

// ── Render: Already Completed ────────────────

function renderCompleted() {
  const state = store.getState();
  const bestScore = state.dailyChallenge.bestScore;
  showNavbar();

  container.innerHTML = `
    <div class="daily-container fade-in">
      <div class="daily-completed-card glass-card">
        <div class="daily-completed-icon">✅</div>
        <h2 class="daily-completed-title">Challenge Complete!</h2>
        <div class="daily-completed-theme">
          <span class="daily-theme-icon">${challenge.icon}</span>
          <span>${challenge.title}</span>
        </div>
        <div class="daily-best-score">
          <span class="daily-score-label">Today's Best</span>
          <span class="daily-score-value">${bestScore}<span class="daily-score-max">/5</span></span>
        </div>
        <div class="daily-stars">
          ${Array.from({ length: 5 }, (_, i) =>
            `<span class="daily-star ${i < bestScore ? 'earned' : 'empty'}" style="animation-delay:${i * 0.1}s">${i < bestScore ? '⭐' : '☆'}</span>`
          ).join('')}
        </div>
        <p class="daily-comeback">Come back tomorrow for a new challenge!</p>
        <div class="daily-actions">
          <button class="btn btn-primary" id="daily-view-rankings">🏆 View Rankings</button>
          <button class="btn btn-ghost" id="daily-go-home">← Back Home</button>
        </div>
      </div>
    </div>
  `;

  container.addEventListener('click', handleClick);
}

// ── Render: Intro ────────────────────────────

function renderIntro() {
  showNavbar();

  container.innerHTML = `
    <div class="daily-container fade-in">
      <div class="daily-intro-card glass-card">
        <div class="daily-intro-badge">
          <span class="daily-badge-pulse"></span>
          <span class="daily-badge-icon">${challenge.icon}</span>
        </div>
        <h2 class="daily-intro-title">Daily Challenge</h2>
        <h3 class="daily-intro-theme">${challenge.title}</h3>
        <div class="daily-intro-meta">
          <div class="daily-meta-item">
            <span class="daily-meta-icon">❓</span>
            <span>5 Questions</span>
          </div>
          <div class="daily-meta-item">
            <span class="daily-meta-icon">⏱️</span>
            <span>15 seconds each</span>
          </div>
          <div class="daily-meta-item">
            <span class="daily-meta-icon">🔥</span>
            <span>Streak multiplier</span>
          </div>
        </div>
        <button class="btn btn-primary btn-lg daily-start-btn" id="daily-start">
          ⚡ Start Challenge
        </button>
      </div>
    </div>
  `;

  container.addEventListener('click', handleClick);
}

// ── Render: Question ─────────────────────────

function renderQuestion() {
  hideNavbar();
  answered = false;
  const q = challenge.questions[currentQuestion];
  const timeLimit = q.timeLimit || 15;
  let timeRemaining = timeLimit;

  container.innerHTML = `
    <div class="daily-container fade-in">
      <div class="daily-quiz-header">
        <span class="daily-question-count">${currentQuestion + 1} of ${challenge.questions.length}</span>
        ${consecutiveCorrect > 1 ? `<span class="daily-streak-badge slide-in">🔥 x${consecutiveCorrect}</span>` : ''}
        <span class="daily-timer-text" id="daily-timer-text">${timeLimit}s</span>
      </div>

      <div class="daily-timer-bar-track">
        <div class="daily-timer-bar" id="daily-timer-bar"></div>
      </div>

      <div class="daily-question-card glass-card">
        <p class="daily-question-text">${q.question}</p>
      </div>

      <div class="daily-options" id="daily-options">
        ${q.options.map((opt, i) => `
          <button class="daily-option-btn" data-option="${i}">
            <span class="daily-option-letter">${String.fromCharCode(65 + i)}</span>
            <span class="daily-option-text">${opt}</span>
          </button>
        `).join('')}
      </div>
    </div>
  `;

  container.removeEventListener('click', handleClick);
  container.addEventListener('click', handleClick);

  // Start timer
  const bar = document.getElementById('daily-timer-bar');
  const timerText = document.getElementById('daily-timer-text');
  const startTime = Date.now();
  const totalMs = timeLimit * 1000;

  if (bar) {
    bar.style.width = '100%';
    bar.className = 'daily-timer-bar timer-green';
  }

  timerInterval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, totalMs - elapsed);
    const percent = (remaining / totalMs) * 100;
    timeRemaining = Math.ceil(remaining / 1000);

    if (bar) {
      bar.style.width = `${percent}%`;
      if (timeRemaining > 10) {
        bar.className = 'daily-timer-bar timer-green';
      } else if (timeRemaining > 5) {
        bar.className = 'daily-timer-bar timer-amber';
      } else {
        bar.className = 'daily-timer-bar timer-red timer-pulse';
      }
    }
    if (timerText) {
      timerText.textContent = `${timeRemaining}s`;
    }

    if (remaining <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      handleTimeUp();
    }
  }, 100);
}

// ── Handle time running out ──────────────────

function handleTimeUp() {
  if (answered) return;
  answered = true;
  consecutiveCorrect = 0;

  const q = challenge.questions[currentQuestion];
  const options = container.querySelectorAll('.daily-option-btn');
  options.forEach((btn, i) => {
    btn.classList.add('daily-disabled');
    if (i === q.correct) btn.classList.add('daily-correct');
  });

  // Show timeout indicator
  const questionCard = container.querySelector('.daily-question-card');
  if (questionCard) {
    questionCard.insertAdjacentHTML('afterend', `
      <div class="daily-feedback daily-timeout slide-up">
        <span>⏰ Time's up!</span>
      </div>
    `);
  }

  autoAdvanceTimeout = setTimeout(() => advanceQuestion(), 1500);
}

// ── Handle option selection ──────────────────

function handleOptionSelect(optionIndex) {
  if (answered) return;
  answered = true;

  clearInterval(timerInterval);
  timerInterval = null;

  const q = challenge.questions[currentQuestion];
  const isCorrect = optionIndex === q.correct;
  const options = container.querySelectorAll('.daily-option-btn');

  options.forEach((btn, i) => {
    btn.classList.add('daily-disabled');
    if (i === q.correct) btn.classList.add('daily-correct');
    if (i === optionIndex && !isCorrect) btn.classList.add('daily-wrong');
  });

  if (isCorrect) {
    score++;
    consecutiveCorrect++;
  } else {
    consecutiveCorrect = 0;
  }

  // Show feedback
  const questionCard = container.querySelector('.daily-question-card');
  if (questionCard) {
    questionCard.insertAdjacentHTML('afterend', `
      <div class="daily-feedback ${isCorrect ? 'daily-correct-feedback' : 'daily-wrong-feedback'} slide-up">
        <span>${isCorrect ? '✅ Correct!' : '❌ Wrong!'}</span>
        ${consecutiveCorrect > 1 ? `<span class="daily-multiplier-pop">🔥 x${consecutiveCorrect} streak!</span>` : ''}
      </div>
    `);
  }

  autoAdvanceTimeout = setTimeout(() => advanceQuestion(), 1000);
}

// ── Advance to next question or results ──────

function advanceQuestion() {
  currentQuestion++;
  if (currentQuestion < challenge.questions.length) {
    renderQuestion();
  } else {
    renderResults();
  }
}

// ── Render: Results ──────────────────────────

function renderResults() {
  clearAllTimers();
  showNavbar();

  const isPerfect = score === challenge.questions.length;
  const result = store.completeDailyChallenge(score);
  totalXpEarned = 100 + score * 20;

  if (isPerfect) {
    setTimeout(() => launchConfetti(), 300);
  }

  const percentage = Math.round((score / challenge.questions.length) * 100);
  let gradeEmoji = '😐';
  let gradeText = 'Keep Practicing';
  if (percentage === 100) { gradeEmoji = '🏆'; gradeText = 'Perfect Score!'; }
  else if (percentage >= 80) { gradeEmoji = '🌟'; gradeText = 'Excellent!'; }
  else if (percentage >= 60) { gradeEmoji = '👍'; gradeText = 'Good Job!'; }
  else if (percentage >= 40) { gradeEmoji = '📖'; gradeText = 'Keep Learning'; }

  container.innerHTML = `
    <div class="daily-container fade-in">
      <div class="daily-results-card glass-card">
        <div class="daily-results-emoji">${gradeEmoji}</div>
        <h2 class="daily-results-title">${gradeText}</h2>
        <div class="daily-results-theme">
          <span>${challenge.icon}</span>
          <span>${challenge.title}</span>
        </div>

        <div class="daily-results-score-ring">
          <svg viewBox="0 0 120 120" class="daily-score-ring-svg">
            <circle cx="60" cy="60" r="52" class="daily-ring-bg"/>
            <circle cx="60" cy="60" r="52" class="daily-ring-fill"
              stroke-dasharray="${2 * Math.PI * 52}"
              stroke-dashoffset="${2 * Math.PI * 52 * (1 - score / challenge.questions.length)}"
            />
          </svg>
          <div class="daily-ring-score">
            <span class="daily-ring-number">${score}</span>
            <span class="daily-ring-divider">/</span>
            <span class="daily-ring-total">${challenge.questions.length}</span>
          </div>
        </div>

        <div class="daily-results-xp">
          <span class="daily-xp-icon">⚡</span>
          <span class="daily-xp-amount">+${totalXpEarned} XP</span>
        </div>

        <div class="daily-results-stars">
          ${Array.from({ length: 5 }, (_, i) =>
            `<span class="daily-star ${i < score ? 'earned' : 'empty'}" style="animation-delay:${i * 0.15}s">${i < score ? '⭐' : '☆'}</span>`
          ).join('')}
        </div>

        <div class="daily-actions">
          <button class="btn btn-primary" id="daily-view-rankings">🏆 View Rankings</button>
          <button class="btn btn-ghost" id="daily-go-home">← Back Home</button>
        </div>
      </div>
    </div>
  `;

  container.removeEventListener('click', handleClick);
  container.addEventListener('click', handleClick);
}

// ── Click handler ────────────────────────────

function handleClick(e) {
  const optionBtn = e.target.closest('.daily-option-btn');
  if (optionBtn && !optionBtn.classList.contains('daily-disabled')) {
    handleOptionSelect(parseInt(optionBtn.dataset.option));
    return;
  }

  if (e.target.closest('#daily-start')) {
    renderQuestion();
    return;
  }

  if (e.target.closest('#daily-view-rankings')) {
    router.navigate('leaderboard');
    return;
  }

  if (e.target.closest('#daily-go-home')) {
    router.navigate('home');
    return;
  }
}
