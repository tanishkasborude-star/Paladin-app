import { store } from '../store.js';
import { router } from '../router.js';
import { showToast } from '../components/toast.js';
import { launchConfetti } from '../components/confetti.js';
import { hideNavbar, showNavbar } from '../components/navbar.js';
import { lessons } from '../data/lessons.js';
import { skillTreeData } from '../data/skillTree.js';
import { dailyChallenges } from '../data/dailyChallenges.js';

let container;

function getEraStatus(era) {
  const eraId = era.id;
  const isUnlocked = store.isEraUnlocked(eraId);

  if (!isUnlocked) return 'locked';

  const eraLessons = era.lessons || [];
  const completedCount = eraLessons.filter(ref => {
    const lessonId = ref.id || ref;
    return store.isLessonCompleted(lessonId);
  }).length;

  if (completedCount >= eraLessons.length && eraLessons.length > 0) return 'completed';
  return 'unlocked';
}

function getStatusBadge(status) {
  switch (status) {
    case 'locked':
      return `<span class="skilltree-era-badge skilltree-badge-locked">🔒 Locked</span>`;
    case 'unlocked':
      return `<span class="skilltree-era-badge skilltree-badge-unlocked">🔓 Unlocked</span>`;
    case 'completed':
      return `<span class="skilltree-era-badge skilltree-badge-completed">✅ Completed</span>`;
    default:
      return '';
  }
}

function getLessonStatus(lessonId, eraUnlocked) {
  if (!eraUnlocked) return 'locked';
  if (store.isLessonCompleted(lessonId)) return 'completed';
  return 'available';
}

export function init() {
  container = document.getElementById('screen-skill-tree');
}

export function render() {
  const eras = skillTreeData.eras;

  container.innerHTML = `
    <div class="skilltree-container fade-in">
      <!-- Header -->
      <div class="skilltree-header slide-up">
        <div class="skilltree-title section-title">Skill Tree</div>
        <div class="skilltree-subtitle">Unlock new eras by completing lessons</div>
      </div>

      <!-- Tree -->
      <div class="skilltree-tree">
        ${eras.map((era, eraIdx) => {
          const status = getEraStatus(era);
          const isUnlocked = status !== 'locked';
          const eraLessons = era.lessons || [];
          const completedCount = eraLessons.filter(ref => {
            const lessonId = ref.id || ref;
            return store.isLessonCompleted(lessonId);
          }).length;
          const totalLessons = eraLessons.length;
          const isLast = eraIdx === eras.length - 1;

          return `
            <!-- Era Section -->
            <div class="skilltree-era-section slide-up" style="animation-delay: ${eraIdx * 0.12}s">
              <!-- Connector line (except last) -->
              ${!isLast ? '<div class="skilltree-connector-line"></div>' : ''}

              <!-- Era Header Card -->
              <div class="skilltree-era-card card skilltree-era-${status}" style="border-left: 4px solid ${era.color || '#d4a533'}">
                <div class="skilltree-era-top">
                  <div class="skilltree-era-icon">${era.icon}</div>
                  <div class="skilltree-era-info">
                    <div class="skilltree-era-label">${era.label}</div>
                    <div class="skilltree-era-desc">${era.description}</div>
                  </div>
                  ${getStatusBadge(status)}
                </div>
                <div class="skilltree-era-progress">
                  <div class="skilltree-era-progress-text">${completedCount}/${totalLessons} lessons</div>
                  <div class="skilltree-era-progress-track">
                    <div class="skilltree-era-progress-fill" style="width: ${totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0}%; background: ${era.color || '#d4a533'}"></div>
                  </div>
                </div>
              </div>

              <!-- Lesson Nodes -->
              <div class="skilltree-lessons">
                ${eraLessons.map((lessonRef, li) => {
                  const lessonId = lessonRef.id || lessonRef;
                  const lesson = lessons.find(l => l.id === lessonId);
                  const lessonStatus = getLessonStatus(lessonId, isUnlocked);
                  const title = lesson ? lesson.title : lessonId;
                  const subtitle = lesson ? lesson.subtitle : '';
                  const icon = lesson ? lesson.icon : '📖';

                  return `
                    <div class="skilltree-lesson-node skilltree-lesson-${lessonStatus}"
                         data-lesson-id="${lessonId}" data-era-status="${status}"
                         style="animation-delay: ${(eraIdx * 0.12) + (li * 0.06) + 0.15}s; border-left-color: ${era.color || '#d4a533'}">
                      <div class="skilltree-lesson-connector"></div>
                      <div class="skilltree-lesson-icon">${icon}</div>
                      <div class="skilltree-lesson-info">
                        <div class="skilltree-lesson-title">${title}</div>
                        ${subtitle ? `<div class="skilltree-lesson-subtitle">${subtitle}</div>` : ''}
                      </div>
                      <div class="skilltree-lesson-status">
                        ${lessonStatus === 'completed' ? '✅' :
                          lessonStatus === 'locked' ? '🔒' : '→'}
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <div class="skilltree-bottom-spacer"></div>
    </div>
  `;

  // Event listeners for lesson nodes
  container.querySelectorAll('.skilltree-lesson-node').forEach(node => {
    node.addEventListener('click', () => {
      const lessonId = node.dataset.lessonId;
      const eraStatus = node.dataset.eraStatus;

      if (eraStatus === 'locked') {
        showToast('🔒 Complete more lessons to unlock this era!');
        // Add quick shake feedback
        node.classList.add('quiz-shake');
        setTimeout(() => node.classList.remove('quiz-shake'), 500);
        return;
      }

      router.navigate('lesson', { lessonId });
    });
  });
}

export function onEnter() {
  showNavbar();
  render();
}

export function onLeave() {
  // Cleanup if needed
}
