import { store } from '../store.js';
import { router } from '../router.js';
import { showToast } from '../components/toast.js';
import { launchConfetti } from '../components/confetti.js';
import { hideNavbar, showNavbar } from '../components/navbar.js';
import { lessons } from '../data/lessons.js';
import { skillTreeData } from '../data/skillTree.js';
import { dailyChallenges } from '../data/dailyChallenges.js';

let container;

export function init() {
  container = document.getElementById('screen-home');
}

export function render() {
  const state = store.getState();
  const user = state.user;
  const progress = store.getLevelProgress();
  const streak = store.getStreak();

  // Format date
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  // Find first uncompleted lesson in unlocked eras
  let continueLesson = null;
  for (const era of skillTreeData.eras) {
    if (store.isEraUnlocked(era.id)) {
      for (const lessonRef of era.lessons) {
        const lesson = lessons.find(l => l.id === lessonRef.id || l.id === lessonRef);
        const lessonId = lesson ? lesson.id : (lessonRef.id || lessonRef);
        if (!store.isLessonCompleted(lessonId)) {
          continueLesson = lessons.find(l => l.id === lessonId);
          break;
        }
      }
    }
    if (continueLesson) break;
  }

  // Available lessons from unlocked eras
  const availableLessons = [];
  for (const era of skillTreeData.eras) {
    if (store.isEraUnlocked(era.id)) {
      for (const lessonRef of era.lessons) {
        const lessonId = lessonRef.id || lessonRef;
        const lesson = lessons.find(l => l.id === lessonId);
        if (lesson) availableLessons.push(lesson);
      }
    }
  }

  const isDailyDone = store.isDailyChallengeCompleted();

  container.innerHTML = `
    <div class="home-container fade-in">
      <!-- Header -->
      <div class="home-header slide-up">
        <div class="home-header-left">
          <div class="home-greeting">
            <span class="home-greeting-label">Welcome back,</span>
            <span class="home-greeting-name text-gold">${user.name}</span>
          </div>
          <div class="home-date">${dateStr}</div>
        </div>
        <div class="home-header-right">
          <div class="home-avatar">${user.avatar}</div>
          <div class="home-level-badge">
            <span class="home-level-number">${user.level}</span>
          </div>
        </div>
      </div>

      <!-- XP Progress -->
      <div class="home-xp-section slide-up" style="animation-delay: 0.05s">
        <div class="home-xp-label">Level ${user.level} • ${progress.current}/${progress.needed} XP</div>
        <div class="home-xp-bar-track">
          <div class="home-xp-bar-fill" style="width: ${progress.percentage}%"></div>
        </div>
      </div>

      <!-- Streak Card -->
      <div class="home-streak-card card slide-up" style="animation-delay: 0.1s">
        <div class="home-streak-fire">🔥</div>
        <div class="home-streak-info">
          <div class="home-streak-count">${streak.current}</div>
          <div class="home-streak-label">${streak.current > 0 ? 'Day Streak' : 'Start a streak today!'}</div>
        </div>
        ${streak.longest > 0 ? `<div class="home-streak-best">Best: ${streak.longest}</div>` : ''}
      </div>

      <!-- Continue Learning -->
      <div class="home-section slide-up" style="animation-delay: 0.15s">
        <div class="section-title">Continue Learning</div>
        ${continueLesson ? `
          <div class="home-continue-card card" data-nav="lesson" data-lesson-id="${continueLesson.id}">
            <div class="home-continue-icon">${continueLesson.icon}</div>
            <div class="home-continue-info">
              <div class="home-continue-title">${continueLesson.title}</div>
              <div class="home-continue-subtitle">${continueLesson.subtitle}</div>
            </div>
            <div class="home-continue-arrow">→</div>
          </div>
        ` : `
          <div class="home-continue-card card home-continue-complete">
            <div class="home-continue-icon">🌟</div>
            <div class="home-continue-info">
              <div class="home-continue-title">All caught up!</div>
              <div class="home-continue-subtitle">Explore the Skill Tree for more!</div>
            </div>
          </div>
        `}
      </div>

      <!-- Daily Challenge CTA -->
      <div class="home-section slide-up" style="animation-delay: 0.2s">
        ${!isDailyDone ? `
          <div class="home-daily-card card home-daily-active" data-nav="daily">
            <div class="home-daily-icon">⚔️</div>
            <div class="home-daily-text">
              <div class="home-daily-title text-gold">Daily Challenge Available!</div>
              <div class="home-daily-subtitle">Tap to compete</div>
            </div>
            <div class="home-daily-pulse"></div>
          </div>
        ` : `
          <div class="home-daily-card card home-daily-done">
            <div class="home-daily-icon">✅</div>
            <div class="home-daily-text">
              <div class="home-daily-title">Challenge Completed Today</div>
              <div class="home-daily-subtitle">Come back tomorrow!</div>
            </div>
          </div>
        `}
      </div>

      <!-- Available Lessons -->
      <div class="home-section slide-up" style="animation-delay: 0.25s">
        <div class="section-title">Available Lessons</div>
        <div class="home-lessons-list">
          ${availableLessons.map((lesson, i) => {
            const completed = store.isLessonCompleted(lesson.id);
            return `
              <div class="home-lesson-card card ${completed ? 'home-lesson-completed' : ''}"
                   data-nav="lesson" data-lesson-id="${lesson.id}"
                   style="animation-delay: ${0.3 + i * 0.05}s">
                <div class="home-lesson-icon">${lesson.icon}</div>
                <div class="home-lesson-info">
                  <div class="home-lesson-title">${lesson.title}</div>
                  <div class="home-lesson-subtitle">${lesson.subtitle}</div>
                </div>
                ${completed ? '<div class="home-lesson-badge">✅</div>' : '<div class="home-lesson-arrow">→</div>'}
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="home-bottom-spacer"></div>
    </div>
  `;

  // Attach event listeners
  container.querySelectorAll('[data-nav="lesson"]').forEach(card => {
    card.addEventListener('click', () => {
      const lessonId = card.dataset.lessonId;
      router.navigate('lesson', { lessonId });
    });
  });

  container.querySelectorAll('[data-nav="daily"]').forEach(card => {
    card.addEventListener('click', () => {
      router.navigate('daily');
    });
  });

  // Animate XP bar fill
  requestAnimationFrame(() => {
    const fill = container.querySelector('.home-xp-bar-fill');
    if (fill) {
      fill.style.transition = 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    }
  });
}

export function onEnter() {
  showNavbar();
  store.updateStreak();
  render();
}

export function onLeave() {
  // Cleanup if needed
}
