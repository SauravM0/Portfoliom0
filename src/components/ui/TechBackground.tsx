"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: number; // 0=primary,1=secondary,2=accent
}

export function TechBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    const gridSize = 50;
    let mouseX = -1000;
    let mouseY = -1000;

    /* ─── Read computed CSS theme vars ─── */
    function getThemeColors() {
      const style = getComputedStyle(document.documentElement);
      const p = style.getPropertyValue("--theme-primary").trim() || "59 130 246";
      const s = style.getPropertyValue("--theme-secondary").trim() || "6 182 212";
      const a = style.getPropertyValue("--theme-accent").trim() || "167 139 250";
      return [`rgba(${p},`, `rgba(${s},`, `rgba(${a},`] as [string, string, string];
    }

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    }

    function initParticles() {
      if (!canvas) return;
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 80);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: Math.floor(Math.random() * 3),
      }));
    }

    function drawGrid(colors: [string, string, string]) {
      if (!canvas || !ctx) return;
      const cols = Math.ceil(canvas.width / gridSize);
      const rows = Math.ceil(canvas.height / gridSize);

      // Horizontal
      for (let i = 0; i <= rows; i++) {
        const y = i * gridSize;
        const distY = Math.abs(mouseY - y);
        const glow = Math.max(0, 1 - distY / 200);
        const baseAlpha = 0.025;
        const alpha = baseAlpha + glow * 0.06;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.strokeStyle = `${colors[0]}${alpha})`;
        ctx.lineWidth = glow > 0.3 ? 0.8 : 0.5;
        ctx.stroke();
      }
      // Vertical
      for (let i = 0; i <= cols; i++) {
        const x = i * gridSize;
        const distX = Math.abs(mouseX - x);
        const glow = Math.max(0, 1 - distX / 200);
        const baseAlpha = 0.025;
        const alpha = baseAlpha + glow * 0.06;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.strokeStyle = `${colors[0]}${alpha})`;
        ctx.lineWidth = glow > 0.3 ? 0.8 : 0.5;
        ctx.stroke();
      }
    }

    function drawParticles(colors: [string, string, string]) {
      if (!canvas || !ctx) return;

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas!.width;
        if (p.x > canvas!.width) p.x = 0;
        if (p.y < 0) p.y = canvas!.height;
        if (p.y > canvas!.height) p.y = 0;

        // Mouse interaction
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          const force = (180 - dist) / 180;
          p.vx += (dx / dist) * force * 0.025;
          p.vy += (dy / dist) * force * 0.025;
        }

        p.vx *= 0.99;
        p.vy *= 0.99;
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.2) {
          p.vx = (p.vx / speed) * 1.2;
          p.vy = (p.vy / speed) * 1.2;
        }

        const colorStr = colors[p.color];

        // Glow halo
        if (dist < 150) {
          const glowAlpha = (1 - dist / 150) * 0.15;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
          ctx.fillStyle = `${colorStr}${glowAlpha})`;
          ctx.fill();
        }

        // Core particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${colorStr}${p.opacity})`;
        ctx.fill();

        // Connections
        for (let j = i + 1; j < particles.length; j++) {
          const dx2 = p.x - particles[j].x;
          const dy2 = p.y - particles[j].y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          if (dist2 < 140) {
            const alpha = (1 - dist2 / 140) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `${colorStr}${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const colors = getThemeColors();
      drawGrid(colors);
      drawParticles(colors);
      animationId = requestAnimationFrame(animate);
    }

    function handleMouse(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }

    function handleMouseLeave() {
      mouseX = -1000;
      mouseY = -1000;
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("mouseleave", handleMouseLeave);
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
