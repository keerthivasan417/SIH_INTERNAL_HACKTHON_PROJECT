import React, { useEffect, useState, useRef } from 'react';

export const FloatingMovableOrbs = () => {
  // 6 colorful background floating circles with initial positions and velocities
  const [orbs, setOrbs] = useState([
    { id: 1, x: 100, y: 150, vx: 0.6, vy: 0.4, size: 140, color: 'radial-gradient(circle, rgba(56, 189, 248, 0.4) 0%, rgba(2, 132, 199, 0.05) 70%)', emoji: '⭐' },
    { id: 2, x: 400, y: 300, vx: -0.5, vy: 0.5, size: 180, color: 'radial-gradient(circle, rgba(192, 132, 252, 0.4) 0%, rgba(147, 51, 234, 0.05) 70%)', emoji: '🔮' },
    { id: 3, x: 850, y: 180, vx: 0.4, vy: -0.6, size: 130, color: 'radial-gradient(circle, rgba(244, 114, 182, 0.4) 0%, rgba(219, 39, 119, 0.05) 70%)', emoji: '🎈' },
    { id: 4, x: 1100, y: 380, vx: -0.6, vy: -0.3, size: 160, color: 'radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, rgba(217, 119, 6, 0.05) 70%)', emoji: '💎' },
    { id: 5, x: 600, y: 500, vx: 0.5, vy: -0.5, size: 150, color: 'radial-gradient(circle, rgba(52, 211, 153, 0.4) 0%, rgba(5, 150, 105, 0.05) 70%)', emoji: '🧪' },
    { id: 6, x: 200, y: 550, vx: -0.4, vy: 0.6, size: 120, color: 'radial-gradient(circle, rgba(167, 139, 250, 0.4) 0%, rgba(124, 58, 237, 0.05) 70%)', emoji: '🚀' }
  ]);

  const requestRef = useRef();

  useEffect(() => {
    const animate = () => {
      setOrbs(prevOrbs =>
        prevOrbs.map(orb => {
          let nextX = orb.x + orb.vx;
          let nextY = orb.y + orb.vy;
          let nextVx = orb.vx;
          let nextVy = orb.vy;

          // Bounce off screen boundaries
          const maxX = window.innerWidth - orb.size - 20;
          const maxY = document.body.scrollHeight - orb.size - 20;

          if (nextX <= 10 || nextX >= maxX) nextVx = -nextVx;
          if (nextY <= 10 || nextY >= maxY) nextVy = -nextVy;

          return {
            ...orb,
            x: Math.max(10, Math.min(maxX, nextX)),
            y: Math.max(10, Math.min(maxY, nextY)),
            vx: nextVx,
            vy: nextVy
          };
        })
      );
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden'
      }}
    >
      {orbs.map(orb => (
        <div
          key={orb.id}
          style={{
            position: 'absolute',
            left: `${orb.x}px`,
            top: `${orb.y}px`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            borderRadius: '50%',
            background: orb.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: `${orb.size * 0.35}px`,
            filter: 'blur(2px)',
            opacity: 0.85,
            willChange: 'transform',
            transform: 'translateZ(0)',
            transition: 'left 0.1s linear, top 0.1s linear',
            border: '2px solid rgba(255, 255, 255, 0.4)',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)'
          }}
        >
          <span style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))' }}>
            {orb.emoji}
          </span>
        </div>
      ))}
    </div>
  );
};

export default FloatingMovableOrbs;
