import React, { useEffect, useRef } from 'react';

/**
 * NeuralBackground
 * Renders a full-screen canvas with animated, interconnected glowing nodes
 * that simulate a 3D neural network. Designed to sit behind all page content.
 *
 * Props:
 *   nodeCount   - number of nodes (default 90)
 *   connectDist - max px distance to draw a connection (default 190)
 *   speed       - movement multiplier (default 1)
 *   opacity     - overall canvas opacity (default 1)
 */
const NeuralBackground = ({
  nodeCount = 90,
  connectDist = 190,
  speed = 1,
  opacity = 1,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let nodes = [];

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      // Re-scatter nodes when resized so they fill the new dimensions
      nodes = buildNodes(canvas.width, canvas.height);
    };

    const buildNodes = (w, h) =>
      Array.from({ length: nodeCount }, () => ({
        x:     Math.random() * w,
        y:     Math.random() * h,
        z:     Math.random(),           // depth  0..1 (simulates 3D)
        vx:    (Math.random() - 0.5) * 0.45 * speed,
        vy:    (Math.random() - 0.5) * 0.45 * speed,
        vz:    (Math.random() - 0.5) * 0.002 * speed,
        r:     Math.random() * 2.2 + 0.8,
        pulse: Math.random() * Math.PI * 2,
      }));

    resize();
    window.addEventListener('resize', resize);

    const COLORS = {
      nodeA: [99,  102, 241],   // indigo
      nodeB: [168,  85, 247],   // purple
      lineA: [99,  102, 241],
      lineB: [14,  165, 233],   // sky
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        n.z  = Math.max(0, Math.min(1, n.z + n.vz));
        n.pulse += 0.018;

        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      }

      // ── Connections ──────────────────────────────────────────────
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > connectDist) continue;

          // depth-weighted alpha: far nodes (z≈0) are dimmer
          const depthAlpha = 0.4 + 0.6 * ((a.z + b.z) / 2);
          const baseAlpha  = (1 - dist / connectDist) * 0.38 * depthAlpha;

          const g = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          g.addColorStop(0,   `rgba(${COLORS.lineA.join(',')},${baseAlpha})`);
          g.addColorStop(0.5, `rgba(${COLORS.nodeB.join(',')},${baseAlpha * 0.65})`);
          g.addColorStop(1,   `rgba(${COLORS.lineB.join(',')},${baseAlpha})`);

          // line thickness grows with depth
          const lw = lerp(0.5, 1.5, (a.z + b.z) / 2);

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = g;
          ctx.lineWidth   = lw;
          ctx.stroke();
        }
      }

      // ── Nodes ────────────────────────────────────────────────────
      for (const n of nodes) {
        const glow   = Math.sin(n.pulse) * 0.5 + 0.5;
        const depth  = 0.3 + 0.7 * n.z;          // closer → brighter
        const radius = n.r * (1 + n.z * 1.5);    // closer → bigger

        // outer glow
        const ng = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, radius * 5);
        ng.addColorStop(0, `rgba(${COLORS.nodeB.join(',')},${depth * (0.7 + glow * 0.3)})`);
        ng.addColorStop(0.35, `rgba(${COLORS.nodeA.join(',')},${depth * glow * 0.45})`);
        ng.addColorStop(1,   'rgba(99,102,241,0)');

        ctx.beginPath();
        ctx.arc(n.x, n.y, radius * (1 + glow * 0.35), 0, Math.PI * 2);
        ctx.fillStyle = ng;
        ctx.fill();

        // bright centre dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius * 0.55, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230,210,255,${depth * (0.75 + glow * 0.25)})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [nodeCount, connectDist, speed]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity,
      }}
    />
  );
};

export default NeuralBackground;
