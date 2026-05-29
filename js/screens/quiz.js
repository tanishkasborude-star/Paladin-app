import { store } from '../store.js';
import { router } from '../router.js';
import { showToast } from '../components/toast.js';
import { launchConfetti } from '../components/confetti.js';
import { hideNavbar, showNavbar } from '../components/navbar.js';
import { lessons } from '../data/lessons.js';
import { skillTreeData } from '../data/skillTree.js';
import { dailyChallenges } from '../data/dailyChallenges.js';

let container;
let currentLesson = null;
let quizQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let answers = []; // 'correct' | 'wrong' | null
let isAnswering = false;

function renderDots() {
  return quizQuestions.map((_, i) => {
    let dotClass = 'quiz-dot';
    if (i === currentQuestionIndex) dotClass += ' quiz-dot-current';
    if (answers[i] === 'correct') dotClass += ' quiz-dot-correct';
    if (answers[i] === 'wrong') dotClass += ' quiz-dot-wrong';
    return `<div class="${dotClass}"></div>`;
  }).join('');
}

function renderQuestion() {
  const q = quizQuestions[currentQuestionIndex];
  const total = quizQuestions.length;

  container.innerHTML = `
    <div class="quiz-screen fade-in">
      <!-- Header -->
      <div class="quiz-header">
        <div class="quiz-header-title">Quiz Time!</div>
        <div class="quiz-header-count">${currentQuestionIndex + 1} of ${total}</div>
      </div>

      <!-- Progress Dots -->
      <div class="quiz-dots">
        ${renderDots()}
      </div>

      <!-- Question -->
      <div class="quiz-question-area slide-up">
        <div class="quiz-question-text">${q.question}</div>

        <!-- Options -->
        <div class="quiz-options">
          ${q.options.map((opt, i) => `
            <button class="quiz-option card" data-index="${i}" style="animation-delay: ${i * 0.08}s">
              <span class="quiz-option-letter">${String.fromCharCode(65 + i)}</span>
              <span class="quiz-option-text">${opt}</span>
            </button>
          `).join('')}
        </div>

        <!-- Explanation (hidden initially) -->
        <div class="quiz-explanation" id="quiz-explanation" style="display:none;"></div>

        <!-- Next Button (hidden initially) -->
        <div class="quiz-next-wrap" id="quiz-next-wrap" style="display:none;">
          <button class="btn btn-primary btn-lg quiz-next-btn" id="quiz-next-btn">
            ${currentQuestionIndex < total - 1 ? 'Next Question' : 'See Results'}
          </button>
        </div>
      </div>
    </div>
  `;

  // Attach option click handlers
  container.querySelectorAll('.quiz-option').forEach(opt => {
    opt.addEventListener('click', () => handleAnswer(parseInt(opt.dataset.index)));
  });

  // Attach next button handler
  const nextBtn = container.querySelector('#quiz-next-btn');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
      } else {
        renderResults();
      }
    });
  }
}

function handleAnswer(selectedIndex) {
  if (isAnswering) return;
  isAnswering = true;

  const q = quizQuestions[currentQuestionIndex];
  const isCorrect = selectedIndex === q.correct;

  // Disable all options
  const options = container.querySelectorAll('.quiz-option');
  options.forEach(opt => {
    opt.style.pointerEvents = 'none';
  });

  // Brief delay before showing result
  setTimeout(() => {
    options.forEach((opt, i) => {
      if (i === q.correct) {
        opt.classList.add('quiz-option-correct');
      }
      if (i === selectedIndex && !isCorrect) {
        opt.classList.add('quiz-option-wrong');
        opt.classList.add('quiz-shake');
      }
    });

    if (isCorrect) {
      score++;
      answers[currentQuestionIndex] = 'correct';
    } else {
      answers[currentQuestionIndex] = 'wrong';
    }

    // Update dots
    const dots = container.querySelector('.quiz-dots');
    if (dots) dots.innerHTML = renderDots();

    // Show explanation
    const explEl = container.querySelector('#quiz-explanation');
    if (explEl && q.explanation) {
      explEl.innerHTML = `
        <div class="quiz-explanation-icon">${isCorrect ? '✅' : '💡'}</div>
        <div class="quiz-explanation-text">${q.explanation}</div>
      `;
      explEl.style.display = 'flex';
      explEl.classList.add('fade-in');
    }

    // Show next button
    const nextWrap = container.querySelector('#quiz-next-wrap');
    if (nextWrap) {
      nextWrap.style.display = 'flex';
      nextWrap.classList.add('fade-in');
    }

    isAnswering = false;
  }, 300);
}

function renderResults() {
  const total = quizQuestions.length;
  const pct = total > 0 ? (score / total) : 0;

  let emoji, heading;
  if (pct === 1) {
    emoji = '🎉';
    heading = 'Perfect Score!';
  } else if (pct >= 0.7) {
    emoji = '🌟';
    heading = 'Great Job!';
  } else {
    emoji = '📚';
    heading = 'Keep Learning!';
  }

  // Calculate XP (10 per correct answer)
  const xpEarned = score * 10;

  container.innerHTML = `
    <div class="quiz-screen fade-in">
      <div class="quiz-results">
        <div class="quiz-results-emoji">${emoji}</div>
        <div class="quiz-results-heading">${heading}</div>
        <div class="quiz-results-score">
          <span class="quiz-results-correct">${score}</span>
          <span class="quiz-results-divider">/</span>
          <span class="quiz-results-total">${total}</span>
        </div>
        <div class="quiz-results-label">Questions Correct</div>

        <div class="quiz-results-xp">
          <span class="text-gold">+${xpEarned} XP</span>
        </div>

        <!-- Dots review -->
        <div class="quiz-dots quiz-dots-results">
          ${renderDots()}
        </div>

        <button class="btn btn-primary btn-lg quiz-continue-btn" id="quiz-continue">
          Continue
        </button>
      </div>
    </div>
  `;

  // Confetti for perfect score
  if (pct === 1) {
    setTimeout(() => launchConfetti(), 400);
  }

  // Continue button
  const continueBtn = container.querySelector('#quiz-continue');
  if (continueBtn) {
    continueBtn.addEventListener('click', () => {
      const result = store.completeLesson(currentLesson.id, score, total);
      if (result && result.leveledUp) {
        showToast(`🎉 Level Up! You're now Level ${result.newLevel}!`);
      } else {
        showToast(`+${result ? result.xpEarned : xpEarned} XP earned!`);
      }
      router.navigate('home');
    });
  }
}

export function init() {
  container = document.getElementById('screen-quiz');
}

export function render(params) {
  if (!params || !params.lessonId) {
    container.innerHTML = `
      <div class="quiz-screen fade-in text-center" style="padding-top:100px;">
        <div style="font-size:3rem;">❓</div>
        <p>Quiz not found</p>
        <button class="btn btn-primary" id="quiz-go-home">Go Home</button>
      </div>
    `;
    const btn = container.querySelector('#quiz-go-home');
    if (btn) btn.addEventListener('click', () => router.navigate('home'));
    return;
  }

  currentLesson = lessons.find(l => l.id === params.lessonId);
  if (!currentLesson || !currentLesson.quiz || currentLesson.quiz.length === 0) {
    container.innerHTML = `
      <div class="quiz-screen fade-in text-center" style="padding-top:100px;">
        <div style="font-size:3rem;">📝</div>
        <p>No quiz available for this lesson</p>
        <button class="btn btn-primary" id="quiz-go-home">Go Home</button>
      </div>
    `;
    const btn = container.querySelector('#quiz-go-home');
    if (btn) btn.addEventListener('click', () => router.navigate('home'));
    return;
  }

  quizQuestions = currentLesson.quiz;
  currentQuestionIndex = 0;
  score = 0;
  answers = new Array(quizQuestions.length).fill(null);
  isAnswering = false;

  renderQuestion();
}

export function onEnter(params) {
  hideNavbar();
  render(params);
}

export function onLeave() {
  currentLesson = null;
  quizQuestions = [];
  currentQuestionIndex = 0;
  score = 0;
  answers = [];
  isAnswering = false;
}
