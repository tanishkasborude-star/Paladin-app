const TABS = [
  { 
    id: 'home', 
    icon: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10L10 3L17 10"/><path d="M5 8V17H15V8"/></svg>', 
    label: 'Home' 
  },
  { 
    id: 'skill-tree', 
    icon: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="4" r="2"/><circle cx="5" cy="12" r="2"/><circle cx="15" cy="12" r="2"/><line x1="10" y1="6" x2="5" y2="10"/><line x1="10" y1="6" x2="15" y2="10"/><line x1="5" y1="14" x2="5" y2="17"/><line x1="15" y1="14" x2="15" y2="17"/></svg>', 
    label: 'Skill Tree' 
  },
  { 
    id: 'daily', 
    icon: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2L12 8H18L13 12L15 18L10 14L5 18L7 12L2 8H8L10 2Z"/></svg>', 
    label: 'Daily' 
  },
  { 
    id: 'leaderboard', 
    icon: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 17V10H2V17H6Z"/><path d="M12 17V5H8V17H12Z"/><path d="M18 17V8H14V17H18Z"/></svg>', 
    label: 'Rankings' 
  },
  { 
    id: 'profile', 
    icon: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="7" r="3"/><path d="M3 17C3 13.5 6 11 10 11C14 11 17 13.5 17 17"/></svg>', 
    label: 'Profile' 
  }
];

export function initNavbar(onTabChange) {
  const navbar = document.getElementById('bottom-navbar');
  if (!navbar) return;
  
  navbar.innerHTML = TABS.map(tab => `
    <button class="nav-item${tab.id === 'home' ? ' active' : ''}" data-tab="${tab.id}">
      <span class="nav-icon">${tab.icon}</span>
      <span class="nav-label">${tab.label}</span>
    </button>
  `).join('');
  
  navbar.addEventListener('click', (e) => {
    const tabBtn = e.target.closest('.nav-item');
    if (!tabBtn) return;
    const tabId = tabBtn.dataset.tab;
    setActiveTab(tabId);
    if (onTabChange) onTabChange(tabId);
  });
}

export function setActiveTab(tabId) {
  const navbar = document.getElementById('bottom-navbar');
  if (!navbar) return;
  navbar.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });
}

export function showNavbar() {
  const navbar = document.getElementById('bottom-navbar');
  if (navbar) navbar.classList.remove('hidden');
}

export function hideNavbar() {
  const navbar = document.getElementById('bottom-navbar');
  if (navbar) navbar.classList.add('hidden');
}
