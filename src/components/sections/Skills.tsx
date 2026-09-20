"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { skills, SKILL_CATEGORIES } from "@/content/skills";
import type { Skill } from "@/lib/types";

/* ─── Color mapping ─── */
const categoryColor: Record<string, { ring: string; text: string; bg: string; border: string }> = {
  primary:   { ring: "border-[rgba(var(--theme-primary),0.3)]",   text: "text-[rgb(var(--theme-primary))]",   bg: "bg-[rgba(var(--theme-primary),0.08)]",   border: "border-[rgba(var(--theme-primary),0.2)]" },
  secondary: { ring: "border-cyan-500/30",   text: "text-cyan-400",   bg: "bg-cyan-500/10",   border: "border-cyan-500/20" },
  accent:    { ring: "border-purple-500/30", text: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
  orange:    { ring: "border-orange-500/30", text: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
  rose:      { ring: "border-rose-500/30",   text: "text-rose-400",   bg: "bg-rose-500/10",   border: "border-rose-500/20" },
  amber:     { ring: "border-amber-500/30",  text: "text-amber-400",  bg: "bg-amber-500/10",  border: "border-amber-500/20" },
  teal:      { ring: "border-teal-500/30",   text: "text-teal-400",   bg: "bg-teal-500/10",   border: "border-teal-500/20" },
};

/* ─── 3D Rotating Skill Sphere (canvas) ─── */
interface SpherePoint {
  label: string;
  theta: number;
  phi: number;
  color: number; // 0-2
}

function SkillSphere({ onHover }: { onHover: (skill: string | null) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    rotX: 0.3,
    rotY: 0,
    velX: 0,
    velY: 0.004,
    dragging: false,
    lastX: 0,
    lastY: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SIZE = canvas.offsetWidth;
    canvas.width = SIZE;
    canvas.height = SIZE;
    const R = SIZE * 0.38;
    const cx = SIZE / 2;
    const cy = SIZE / 2;

    // Build sphere points
    const labels = skills.map((s) => s.name);
    const golden = Math.PI * (3 - Math.sqrt(5));
    const points: SpherePoint[] = labels.map((label, i) => {
      const y = 1 - (i / (labels.length - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      return {
        label,
        theta,
        phi: Math.asin(Math.max(-1, Math.min(1, y))),
        color: i % 3,
      };
    });

    let animId: number;

    function project(theta: number, phi: number, rX: number, rY: number) {
      const cosRY = Math.cos(rY), sinRY = Math.sin(rY);
      const cosRX = Math.cos(rX), sinRX = Math.sin(rX);

      const x0 = Math.cos(phi) * Math.cos(theta);
      const y0 = Math.sin(phi);
      const z0 = Math.cos(phi) * Math.sin(theta);

      const x1 = cosRY * x0 + sinRY * z0;
      const z1 = -sinRY * x0 + cosRY * z0;
      const y1 = cosRX * y0 - sinRX * z1;
      const z2 = sinRX * y0 + cosRX * z1;

      const scale = (z2 + 2) / 3;
      return { sx: cx + x1 * R * scale, sy: cy - y1 * R * scale, z: z2, scale };
    }

    function getThemeColors(): [string, string, string] {
      const style = getComputedStyle(document.documentElement);
      const p = style.getPropertyValue("--theme-primary").trim() || "59 130 246";
      const s = style.getPropertyValue("--theme-secondary").trim() || "6 182 212";
      const a = style.getPropertyValue("--theme-accent").trim() || "167 139 250";
      return [`rgb(${p})`, `rgb(${s})`, `rgb(${a})`];
    }

    function draw() {
      if (!ctx || !canvas) return;
      const st = stateRef.current;
      if (!st.dragging) {
        st.rotY += st.velY;
        st.rotX += st.velX;
        st.velX *= 0.98;
        st.velY *= 0.998;
        if (Math.abs(st.velY) < 0.003) st.velY = 0.003;
      }

      ctx.clearRect(0, 0, SIZE, SIZE);

      // Equator guide ring
      ctx.beginPath();
      ctx.ellipse(cx, cy, R, R * 0.12, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,255,255,0.03)";
      ctx.lineWidth = 1;
      ctx.stroke();

      const colors = getThemeColors();
      const projected = points.map((p) => ({ ...p, ...project(p.theta, p.phi, st.rotX, st.rotY) }));
      projected.sort((a, b) => a.z - b.z);

      projected.forEach((p) => {
        const alpha = (p.z + 1) / 2;
        const fs = Math.max(9, 10 * p.scale);
        const col = colors[p.color];

        ctx.save();
        ctx.globalAlpha = 0.15 + alpha * 0.7;
        ctx.font = `${fs}px var(--font-mono, monospace)`;
        ctx.textAlign = "center";
        ctx.fillStyle = col;
        if (alpha > 0.7) {
          ctx.shadowColor = col;
          ctx.shadowBlur = 6 * alpha;
        }
        ctx.fillText(p.label, p.sx, p.sy);
        ctx.restore();
      });

      animId = requestAnimationFrame(draw);
    }

    draw();

    function onMouseDown(e: MouseEvent) {
      stateRef.current.dragging = true;
      stateRef.current.lastX = e.clientX;
      stateRef.current.lastY = e.clientY;
    }
    function onMouseMove(e: MouseEvent) {
      const st = stateRef.current;
      if (!st.dragging) return;
      const dx = e.clientX - st.lastX;
      const dy = e.clientY - st.lastY;
      st.rotY += dx * 0.008;
      st.rotX += dy * 0.008;
      st.velY = dx * 0.008;
      st.velX = dy * 0.008;
      st.lastX = e.clientX;
      st.lastY = e.clientY;
    }
    function onMouseUp() { stateRef.current.dragging = false; }

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[400px]">
      {/* Glow ring */}
      <div
        className="absolute inset-[15%] rounded-full animate-pulse-slow blur-xl"
        style={{ background: "radial-gradient(ellipse, rgba(var(--theme-primary),0.12), transparent 70%)" }}
      />
      <div className="absolute inset-[5%] rounded-full border border-[rgba(var(--theme-primary),0.08)]" />
      <canvas
        ref={canvasRef}
        className="relative cursor-grab select-none active:cursor-grabbing"
        style={{ width: "100%", height: "100%" }}
        aria-label="3D rotating skills sphere — drag to rotate"
      />
      <p className="absolute bottom-1 left-0 right-0 text-center text-[10px] text-[var(--color-muted)]">
        ↔ drag to rotate
      </p>
    </div>
  );
}

/* ─── Category icon ─── */
function CategoryIcon({ category }: { category: string }) {
  const props = { "aria-hidden": true as const, className: "size-4", fill: "none" as const, stroke: "currentColor" as const, viewBox: "0 0 24 24", strokeWidth: 1.5 };
  switch (category) {
    case "fullstack":   return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" /></svg>;
    case "backend":     return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.75L7.5 3.75h9l3.15 4.5A4.5 4.5 0 0 1 20.25 11" /></svg>;
    case "ai-rag":      return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" /></svg>;
    case "cloud-devops": return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" /></svg>;
    case "linux-systems": return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>;
    case "security":    return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>;
    case "mobile":      return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>;
    default: return null;
  }
}

/* ─── Category Card ─── */
function CategoryCard({ category, items, index, visible }: {
  category: typeof SKILL_CATEGORIES[number];
  items: Skill[];
  index: number;
  visible: boolean;
}) {
  const colors = categoryColor[category.color] ?? categoryColor.primary;

  return (
    <SpotlightCard
      className={`flex flex-col gap-4 p-5 transition-all duration-700 sm:p-6 ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <div className="relative z-10 flex items-center gap-3">
        <div className={`flex size-9 items-center justify-center rounded-xl ${colors.bg} ${colors.text} transition-transform duration-300 group-hover:scale-110`}>
          <CategoryIcon category={category.id} />
        </div>
        <div>
          <h3 className="text-sm font-semibold">{category.label}</h3>
          <p className="text-xs text-[var(--color-muted)]">{category.description}</p>
        </div>
      </div>
      <div className="relative z-10 flex flex-wrap gap-1.5">
        {items.map((skill) => (
          <Badge
            key={skill.name}
            className={`border ${colors.border} ${colors.text} ${colors.bg} text-[11px]`}
          >
            {skill.name}
          </Badge>
        ))}
      </div>
    </SpotlightCard>
  );
}

/* ─── Main Export ─── */
export function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Section
      id="skills"
      title="Skills & Expertise"
      subtitle="Technologies and tools I work with — from front-end to infrastructure."
      className="bg-[rgba(var(--theme-primary),0.01)]"
    >
      <div ref={sectionRef}>
        {/* 3D Sphere */}
        <div className={`mx-auto mb-16 max-w-md transition-all duration-1000 ${visible ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}>
          <SkillSphere onHover={setHoveredSkill} />
        </div>

        {/* Category cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SKILL_CATEGORIES.map((cat, i) => {
            const items = skills.filter((s) => s.category === cat.id);
            return (
              <CategoryCard key={cat.id} category={cat} items={items} index={i} visible={visible} />
            );
          })}
        </div>
      </div>
    </Section>
  );
}
