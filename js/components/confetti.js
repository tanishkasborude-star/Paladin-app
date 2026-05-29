export function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = 'block';
  
  const colors = [
    '#d4a533', // gold
    '#f59e0b', // amber  
    '#10b981', // emerald
    '#3b82f6', // blue
    '#8b5cf6', // purple
    '#ef4444'  // crimson
  ];
  
  const particleCount = 120 + Math.floor(Math.random() * 30);
  const particles = [];
  
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: canvas.width * 0.5 + (Math.random() - 0.5) * 100,
      y: canvas.height * 0.4,
      velocityX: (Math.random() - 0.5) * 12,
      velocityY: -(Math.random() * 12 + 4),
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 4 + Math.random() * 4,
      rotation: Math.random() * 360,
      spin: (Math.random() - 0.5) * 10,
      gravity: 0.15 + Math.random() * 0.05,
      friction: 0.99,
      opacity: 1,
      shape: Math.random() > 0.5 ? 'rect' : 'circle'
    });
  }
  
  const startTime = performance.now();
  const duration = 3000;
  
  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    if (elapsed > duration) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.style.display = 'none';
      return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
      p.velocityY += p.gravity;
      p.velocityX *= p.friction;
      p.x += p.velocityX;
      p.y += p.velocityY;
      p.rotation += p.spin;
      p.opacity = Math.max(0, 1 - (elapsed / duration) * 0.8);
      
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      
      if (p.shape === 'rect') {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.restore();
    });
    
    requestAnimationFrame(animate);
  }
  
  requestAnimationFrame(animate);
}
