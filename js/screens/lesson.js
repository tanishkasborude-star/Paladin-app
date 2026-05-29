// ──────────────────────────────────────────────
// Cinematic Lesson Screen — Characters Tell History
// ──────────────────────────────────────────────
import { store } from '../store.js';
import { router } from '../router.js';
import { showToast } from '../components/toast.js';
import { hideNavbar, showNavbar } from '../components/navbar.js';
import { lessons } from '../data/lessons.js';

let container = null;
let currentLesson = null;
let currentPageIndex = 0;
let typewriterTimeout = null;
let typewriterInterval = null;
let isTyping = false;
let particleAnimFrame = null;

// ── Lifecycle ────────────────────────────────

export function init() {
  container = document.getElementById('screen-lesson');
}

export function render(params) {
  if (!container) container = document.getElementById('screen-lesson');
  if (!params?.lessonId) { router.navigate('home'); return; }

  currentLesson = lessons.find(l => l.id === params.lessonId);
  if (!currentLesson) { router.navigate('home'); return; }

  currentPageIndex = 0;
  renderCinematicShell();
  renderPage();
}

export function onEnter(params) {
  hideNavbar();
  if (params?.lessonId) render(params);
}

export function onLeave() {
  clearTypewriter();
  cancelAnimationFrame(particleAnimFrame);
}

// ── Shell ────────────────────────────────────

function renderCinematicShell() {
  const lesson = currentLesson;
  const narrator = lesson.narrator || {};
  const eraColors = {
    ancient: { primary: '#d4a533', secondary: '#8b6914', bg: 'rgba(212,165,51,0.06)' },
    medieval: { primary: '#8b5cf6', secondary: '#6d28d9', bg: 'rgba(139,92,246,0.06)' },
    modern: { primary: '#3b82f6', secondary: '#1d4ed8', bg: 'rgba(59,130,246,0.06)' }
  };
  const colors = eraColors[lesson.era] || eraColors.ancient;

  container.innerHTML = `
    <div class="cinema-container" data-era="${lesson.era}">
      <!-- Atmospheric particles canvas -->
      <canvas class="cinema-particles" id="cinema-particles"></canvas>

      <!-- Vignette overlay -->
      <div class="cinema-vignette"></div>

      <!-- Top bar -->
      <div class="cinema-topbar">
        <button class="cinema-back" id="cinema-back" aria-label="Back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <div class="cinema-progress-wrapper">
          <div class="cinema-progress-bar">
            <div class="cinema-progress-fill" id="cinema-progress-fill" style="width:0%"></div>
          </div>
          <span class="cinema-progress-text" id="cinema-progress-text">1 / ${lesson.pages.length}</span>
        </div>
        <div class="cinema-era-pill" style="--era-color:${colors.primary}">${lesson.icon} ${lesson.era.charAt(0).toUpperCase() + lesson.era.slice(1)}</div>
      </div>

      <!-- Character Portrait Area -->
      <div class="cinema-portrait-area" id="cinema-portrait-area">
        ${narrator.portrait ? `
          <div class="cinema-portrait-frame">
            <img src="${narrator.portrait}" alt="${narrator.name}" class="cinema-portrait-img" id="cinema-portrait-img" />
            <div class="cinema-portrait-glow" style="--glow-color:${colors.primary}"></div>
          </div>
        ` : `
          <div class="cinema-portrait-frame cinema-portrait-emoji">
            <span class="cinema-portrait-icon">${lesson.icon}</span>
            <div class="cinema-portrait-glow" style="--glow-color:${colors.primary}"></div>
          </div>
        `}
        <div class="cinema-narrator-name" style="color:${colors.primary}" id="cinema-narrator-name">
          ${narrator.name || lesson.title}
        </div>
        ${narrator.title ? `<div class="cinema-narrator-title">${narrator.title}</div>` : ''}
      </div>

      <!-- Speech / Text Area -->
      <div class="cinema-speech-area" id="cinema-speech-area">
        <div class="cinema-speech-bubble" id="cinema-speech-bubble">
          <div class="cinema-speech-indicator" style="--indicator-color:${colors.primary}">
            <span class="cinema-speaking-dot"></span>
            <span class="cinema-speaking-dot"></span>
            <span class="cinema-speaking-dot"></span>
          </div>
          <div class="cinema-text" id="cinema-text"></div>
        </div>
      </div>

      <!-- Choices Area (appears when page has choices) -->
      <div class="cinema-choices" id="cinema-choices"></div>

      <!-- Bottom Nav -->
      <div class="cinema-bottom" id="cinema-bottom">
        <button class="cinema-nav-btn cinema-prev" id="cinema-prev" style="visibility:hidden">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Previous
        </button>
        <button class="cinema-nav-btn cinema-next btn-primary" id="cinema-next">
          Next
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  `;

  // Bind events
  container.querySelector('#cinema-back').addEventListener('click', () => router.navigate('home'));
  container.querySelector('#cinema-prev').addEventListener('click', prevPage);
  container.querySelector('#cinema-next').addEventListener('click', nextPage);
  container.querySelector('#cinema-choices').addEventListener('click', handleChoiceClick);

  // Start atmospheric particles
  initParticles();
}

// ── Page Rendering ───────────────────────────

function renderPage() {
  const lesson = currentLesson;
  const pages = lesson.pages;
  const page = pages[currentPageIndex];
  if (!page) return;

  const total = pages.length;
  const progress = ((currentPageIndex + 1) / total) * 100;

  // Update progress
  const fill = container.querySelector('#cinema-progress-fill');
  const text = container.querySelector('#cinema-progress-text');
  if (fill) fill.style.width = `${progress}%`;
  if (text) text.textContent = `${currentPageIndex + 1} / ${total}`;

  // Update navigation
  const prevBtn = container.querySelector('#cinema-prev');
  const nextBtn = container.querySelector('#cinema-next');
  if (prevBtn) prevBtn.style.visibility = currentPageIndex === 0 ? 'hidden' : 'visible';

  const isLastPage = currentPageIndex === total - 1;
  const hasChoices = page.choices && page.choices.length > 0;

  if (nextBtn) {
    if (hasChoices) {
      nextBtn.style.display = 'none';
    } else {
      nextBtn.style.display = 'inline-flex';
      nextBtn.innerHTML = isLastPage
        ? 'Start Quiz <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>'
        : 'Next <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
    }
  }

  // Render choices
  const choicesEl = container.querySelector('#cinema-choices');
  if (choicesEl) {
    if (hasChoices) {
      choicesEl.innerHTML = page.choices.map((c, i) => `
        <button class="cinema-choice-btn" data-next="${c.nextPageId || ''}" data-idx="${i}">
          <span class="cinema-choice-marker">${String.fromCharCode(65 + i)}</span>
          <span class="cinema-choice-text">${c.text}</span>
        </button>
      `).join('');
      choicesEl.classList.add('visible');
    } else {
      choicesEl.innerHTML = '';
      choicesEl.classList.remove('visible');
    }
  }

  // Animate portrait entrance
  const portraitArea = container.querySelector('#cinema-portrait-area');
  if (portraitArea) {
    portraitArea.classList.remove('cinema-enter');
    void portraitArea.offsetWidth; // force reflow
    portraitArea.classList.add('cinema-enter');
  }

  // Typewriter effect for text
  typewriteText(page.text);
}

// ── Typewriter Effect ────────────────────────

function typewriteText(fullText) {
  clearTypewriter();
  const textEl = container.querySelector('#cinema-text');
  const indicator = container.querySelector('.cinema-speech-indicator');
  if (!textEl) return;

  textEl.textContent = '';
  isTyping = true;

  // Show speaking indicator
  if (indicator) indicator.classList.add('active');

  let charIndex = 0;
  const speed = 25; // ms per character

  typewriterInterval = setInterval(() => {
    if (charIndex < fullText.length) {
      textEl.textContent += fullText[charIndex];
      charIndex++;

      // Auto-scroll if text overflows
      const speechBubble = container.querySelector('#cinema-speech-bubble');
      if (speechBubble) speechBubble.scrollTop = speechBubble.scrollHeight;
    } else {
      clearTypewriter();
      isTyping = false;
      if (indicator) indicator.classList.remove('active');
    }
  }, speed);
}

function skipTypewriter() {
  const textEl = container.querySelector('#cinema-text');
  const indicator = container.querySelector('.cinema-speech-indicator');
  const page = currentLesson.pages[currentPageIndex];
  if (textEl && page) {
    clearTypewriter();
    textEl.textContent = page.text;
    isTyping = false;
    if (indicator) indicator.classList.remove('active');
  }
}

function clearTypewriter() {
  if (typewriterInterval) { clearInterval(typewriterInterval); typewriterInterval = null; }
  if (typewriterTimeout) { clearTimeout(typewriterTimeout); typewriterTimeout = null; }
}

// ── Navigation ───────────────────────────────

function nextPage() {
  if (isTyping) { skipTypewriter(); return; }

  const lesson = currentLesson;
  if (currentPageIndex >= lesson.pages.length - 1) {
    // Go to quiz
    router.navigate('quiz', { lessonId: lesson.id });
    return;
  }
  currentPageIndex++;
  renderPage();
}

function prevPage() {
  if (isTyping) { skipTypewriter(); return; }
  if (currentPageIndex > 0) {
    currentPageIndex--;
    renderPage();
  }
}

function handleChoiceClick(e) {
  const btn = e.target.closest('.cinema-choice-btn');
  if (!btn) return;
  if (isTyping) { skipTypewriter(); return; }

  // Highlight selected choice
  container.querySelectorAll('.cinema-choice-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');

  const nextPageId = btn.dataset.next;

  setTimeout(() => {
    if (nextPageId) {
      const idx = currentLesson.pages.findIndex(p => p.id === nextPageId);
      if (idx !== -1) {
        currentPageIndex = idx;
      } else {
        currentPageIndex++;
      }
    } else {
      currentPageIndex++;
    }
    renderPage();
  }, 400);
}

// ── Atmospheric Particles ────────────────────

function initParticles() {
  const canvas = container.querySelector('#cinema-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() {
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
  resize();
  window.addEventListener('resize', resize);

  const eraParticleColors = {
    ancient: ['rgba(212,165,51,0.3)', 'rgba(232,160,32,0.2)', 'rgba(255,215,0,0.15)'],
    medieval: ['rgba(139,92,246,0.3)', 'rgba(109,40,217,0.2)', 'rgba(167,139,250,0.15)'],
    modern: ['rgba(59,130,246,0.3)', 'rgba(29,78,216,0.2)', 'rgba(96,165,250,0.15)']
  };
  const colors = eraParticleColors[currentLesson?.era] || eraParticleColors.ancient;

  // Create floating dust motes
  for (let i = 0; i < 40; i++) {
    particles.push({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -(Math.random() * 0.2 + 0.1),
      opacity: Math.random() * 0.5 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.02 + 0.005
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

    particles.forEach(p => {
      p.wobble += p.wobbleSpeed;
      p.x += p.speedX + Math.sin(p.wobble) * 0.3;
      p.y += p.speedY;

      // Wrap around
      if (p.y < -10) { p.y = canvas.offsetHeight + 10; p.x = Math.random() * canvas.offsetWidth; }
      if (p.x < -10) p.x = canvas.offsetWidth + 10;
      if (p.x > canvas.offsetWidth + 10) p.x = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });

    particleAnimFrame = requestAnimationFrame(animate);
  }
  animate();
}
