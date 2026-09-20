"use client";

import { useRef, useState, useEffect } from "react";
import { Section } from "@/components/ui/Section";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { achievements } from "@/content/achievements";
import type { Achievement } from "@/lib/types";
import type React from "react";

/* ─── Icons ─── */
function TrophyIcon() {
  return <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0 1 16.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 0 1-2.77.896m0 0a6.017 6.017 0 0 1-2.77-.896" /></svg>;
}
function CertificateIcon() {
  return <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" /></svg>;
}
function StarIcon() {
  return <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>;
}
function FlagIcon() {
  return <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" /></svg>;
}
function ShieldIcon() {
  return <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>;
}

const achievementIcons: Record<string, () => React.ReactNode> = {
  "hackathon-3rd": TrophyIcon,
  "infosys-team-week": StarIcon,
  "tech-lead": FlagIcon,
  "mentor-50": TrophyIcon,
  "saviynt-cert": ShieldIcon,
  "opswat-cert": CertificateIcon,
};

const categoryStyle = {
  achievement: {
    bar: "from-amber-500 to-orange-500",
    iconBg: "bg-amber-500/10",
    iconText: "text-amber-400",
    badgeBg: "bg-amber-500/10",
    badgeText: "text-amber-400",
    badgeBorder: "border-amber-500/30",
    dot: "bg-amber-500",
    label: "Achievement",
  },
  certification: {
    bar: "from-violet-500 to-purple-600",
    iconBg: "bg-violet-500/10",
    iconText: "text-violet-400",
    badgeBg: "bg-violet-500/10",
    badgeText: "text-violet-400",
    badgeBorder: "border-violet-500/30",
    dot: "bg-violet-500",
    label: "Certification",
  },
} as const;

function AchievementCard({ item, index, visible }: { item: Achievement; index: number; visible: boolean }) {
  const Icon = achievementIcons[item.id] ?? TrophyIcon;
  const style = categoryStyle[item.category];

  return (
    <SpotlightCard
      className={`flex flex-col overflow-hidden transition-all duration-600 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Top accent bar */}
      <div className={`h-0.5 w-full shrink-0 bg-gradient-to-r ${style.bar} transition-all duration-300 group-hover:h-1`} />

      <div className="relative z-10 flex flex-1 flex-col p-5 sm:p-6">
        {/* Header */}
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${style.iconBg} ${style.iconText} transition-transform duration-300 hover:scale-110`}>
            <Icon />
          </div>
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${style.badgeBg} ${style.badgeText} ${style.badgeBorder}`}>
            <span className={`size-1.5 rounded-full ${style.dot}`} />
            {style.label}
          </span>
        </div>

        <h3 className="mb-2 text-sm font-semibold leading-snug text-[var(--color-foreground)] transition-colors duration-300 group-hover:text-[rgb(var(--theme-primary))] sm:text-base">
          {item.title}
        </h3>
        <p className="text-xs leading-relaxed text-[var(--color-muted)] sm:text-sm">{item.description}</p>
      </div>
    </SpotlightCard>
  );
}

export function Achievements() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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
      id="achievements"
      title="Achievements & Certifications"
      subtitle="Milestones, recognition, and credentials earned along the journey."
      className="bg-[rgba(var(--theme-primary),0.01)]"
    >
      <div ref={sectionRef}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((item, i) => (
            <AchievementCard key={item.id} item={item} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </Section>
  );
}
