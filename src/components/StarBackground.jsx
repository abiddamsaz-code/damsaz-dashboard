import { memo, useState } from 'react';

const Star = memo(({ size, left, top, animationDelay, animationDuration, opacity, theme }) => (
  <div
    className={`absolute rounded-full ${theme === 'dark' ? 'bg-white' : 'bg-slate-800'}`}
    style={{
      width: size,
      height: size,
      left,
      top,
      opacity,
      animation: `twinkle ${animationDuration} infinite`,
      animationDelay,
      willChange: 'transform, opacity',
    }}
  />
));

Star.displayName = 'Star';

export const StarBackground = memo(({ theme }) => {
  const [stars] = useState(() =>
    Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 4}s`,
      animationDuration: `${3 + Math.random() * 2}s`,
      opacity: Math.random() * 0.5 + 0.3,
    }))
  );

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {stars.map((star) => (
        <Star
          key={star.id}
          size={star.size}
          left={star.left}
          top={star.top}
          animationDelay={star.animationDelay}
          animationDuration={star.animationDuration}
          opacity={star.opacity}
          theme={theme}
        />
      ))}
    </div>
  );
});

StarBackground.displayName = 'StarBackground';
