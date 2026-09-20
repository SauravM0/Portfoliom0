"use client";

import { useRef, useCallback, type ReactNode, type CSSProperties } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  glowColor?: string; /* CSS color string, default uses --theme-primary */
}

export function SpotlightCard({ children, className = "", style }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`spotlight-card glow-card rounded-xl border border-[#1e1e2e] bg-[#0d0d14] transition-all duration-300 hover:border-[rgba(var(--theme-primary),0.3)] ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
