import { useEffect, useRef, memo } from 'react';

export const ParticleCanvas = memo(({ theme }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      radius: 180,
      active: false
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Generate particle nodes
    const particleCount = Math.min(85, Math.floor((width * height) / 13000));
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      color: Math.random() > 0.4 ? '#8b5cf6' : Math.random() > 0.5 ? '#6366f1' : '#06b6d4',
      alpha: Math.random() * 0.5 + 0.3,
      pulse: Math.random() * Math.PI * 2
    }));

    const render = () => {
      // Ease mouse tracking
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      ctx.clearRect(0, 0, width, height);

      // Draw mouse radial glow
      if (mouse.active) {
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius * 1.4
        );
        gradient.addColorStop(
          0,
          theme === 'dark' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.08)'
        );
        gradient.addColorStop(
          0.5,
          theme === 'dark' ? 'rgba(168, 85, 247, 0.06)' : 'rgba(168, 85, 247, 0.03)'
        );
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius * 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Update & render particles
      particles.forEach((p, i) => {
        p.pulse += 0.02;
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Magnetic attraction to mouse
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (1 - dist / mouse.radius) * 0.8;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        // Draw particle
        const currentAlpha = p.alpha + Math.sin(p.pulse) * 0.15;
        ctx.save();
        ctx.globalAlpha = Math.max(0.1, Math.min(1, currentAlpha));
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = theme === 'dark' ? 6 : 2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Connect nearby particles with lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.save();
            ctx.globalAlpha = (1 - dist / 110) * (theme === 'dark' ? 0.16 : 0.08);
            ctx.strokeStyle = p.color;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
});

ParticleCanvas.displayName = 'ParticleCanvas';
