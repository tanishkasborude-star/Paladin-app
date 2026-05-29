export function showToast(message, type = 'info', duration = 3000) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  
  const icons = {
    success: '✅',
    info: 'ℹ️',
    warning: '⚠️',
    xp: '⭐',
    levelup: '🎉',
    streak: '🔥'
  };
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || icons.info}</span>
    <span class="toast-message">${message}</span>
  `;
  
  container.appendChild(toast);
  
  // Trigger entrance animation
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });
  });
  
  // Remove after duration
  setTimeout(() => {
    toast.classList.remove('show');
    toast.addEventListener('transitionend', () => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, { once: true });
    // Fallback removal
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 500);
  }, duration);
}
