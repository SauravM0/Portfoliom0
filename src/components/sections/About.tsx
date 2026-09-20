"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Section } from "@/components/ui/Section";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ABOUT_CONTENT } from "@/lib/constants";

/* ─── Icons ─── */
function AcademicCapIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
    </svg>
  );
}
function CodeBracketIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
    </svg>
  );
}
function CpuChipIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm0 0h1.5m-1.5 0h-1.5" />
    </svg>
  );
}
function SparklesIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
    </svg>
  );
}

const highlightIcons = {
  academic: AcademicCapIcon,
  code: CodeBracketIcon,
  stack: CpuChipIcon,
  opportunity: SparklesIcon,
} as const;

/* ─── IDE-style tab component ─── */
type Tab = "bio" | "focus" | "stats";

const tabContent: Record<Tab, React.ReactNode> = {
  bio: null, // rendered inline
  focus: null,
  stats: null,
};

export function About() {
  const [activeTab, setActiveTab] = useState<Tab>("bio");
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "bio", label: "Bio.ts", icon: "📄" },
    { id: "focus", label: "Focus.json", icon: "🎯" },
    { id: "stats", label: "Stats.yaml", icon: "📊" },
  ];

  return (
    <Section
      id="about"
      title="About Me"
      subtitle="Computer Science Engineering student building production-grade software."
    >
      <div ref={sectionRef} className="grid gap-10 lg:grid-cols-5 lg:gap-14">
        {/* ─── IDE Panel ─── */}
        <div className={`lg:col-span-3 transition-all duration-700 ${visible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}`}>
          <div className="overflow-hidden rounded-2xl border border-[rgba(var(--theme-primary),0.2)] bg-[#0a0a10]">
            {/* File tabs */}
            <div className="flex items-center gap-0 overflow-x-auto border-b border-[rgba(var(--theme-primary),0.1)] bg-[#06060c]">
              <div className="flex shrink-0 items-center gap-1.5 px-4 py-3">
                <span className="size-2.5 rounded-full bg-red-500/70" />
                <span className="size-2.5 rounded-full bg-yellow-500/70" />
                <span className="size-2.5 rounded-full bg-green-500/70" />
              </div>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex shrink-0 items-center gap-1.5 border-r border-[rgba(var(--theme-primary),0.1)] px-4 py-3 text-xs font-mono transition-all ${
                    activeTab === tab.id
                      ? "bg-[rgba(var(--theme-primary),0.1)] text-[rgb(var(--theme-primary))] border-b-2 border-b-[rgb(var(--theme-primary))]"
                      : "text-[var(--color-muted)] hover:bg-[rgba(255,255,255,0.03)] hover:text-[var(--color-foreground)]"
                  }`}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content area */}
            <div className="terminal-text p-6 text-sm leading-relaxed">
              {activeTab === "bio" && (
                <div className="space-y-3">
                  <div className="text-[var(--color-muted)]">
                    <span className="text-[rgb(var(--theme-accent))]">const </span>
                    <span className="text-[rgb(var(--theme-primary))]">developer </span>
                    <span className="text-white">= </span>
                    <span className="text-[rgb(var(--theme-accent))]">{"{"}</span>
                  </div>
                  {ABOUT_CONTENT.bio.map((para, i) => (
                    <div key={i} className="ml-4">
                      <span className="text-[rgb(var(--theme-secondary))]">bio_{i + 1}: </span>
                      <span className="text-[#c0c0d0]">&quot;{para}&quot;</span>
                    </div>
                  ))}
                  <div className="text-[rgb(var(--theme-accent))]">{"}"}</div>
                </div>
              )}

              {activeTab === "focus" && (
                <div className="space-y-1">
                  <div className="text-[var(--color-muted)] mb-3">
                    <span className="text-[rgb(var(--theme-accent))]">{"{"}</span>
                  </div>
                  {ABOUT_CONTENT.focusAreas.map((area, i) => (
                    <div key={area} className="ml-4 flex items-center gap-2">
                      <span className="text-[var(--color-muted)]">&quot;</span>
                      <span className="text-[rgb(var(--theme-secondary))]">{i}</span>
                      <span className="text-[var(--color-muted)]">&quot;: &quot;</span>
                      <span className="text-[rgb(var(--theme-primary))]">{area}</span>
                      <span className="text-[var(--color-muted)]">&quot;{i < ABOUT_CONTENT.focusAreas.length - 1 ? "," : ""}</span>
                    </div>
                  ))}
                  <div className="text-[rgb(var(--theme-accent))]">{"}"}</div>
                </div>
              )}

              {activeTab === "stats" && (
                <div className="space-y-2">
                  {ABOUT_CONTENT.highlights.map((stat) => (
                    <div key={stat.label} className="flex items-center gap-2">
                      <span className="text-[rgb(var(--theme-secondary))]">{stat.label.toLowerCase().replace(/ /g, "_")}:</span>
                      <span className="text-[rgb(var(--theme-primary))] font-bold">{stat.value}</span>
                    </div>
                  ))}
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[rgb(var(--theme-secondary))]">status:</span>
                    <span className="flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-green-400 font-bold">active · open_to_work</span>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Focus areas tag cloud */}
          <div className={`mt-6 transition-all duration-700 delay-200 ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-[var(--color-muted)]">Focus areas</p>
            <div className="flex flex-wrap gap-2">
              {ABOUT_CONTENT.focusAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-lg border border-[rgba(var(--theme-primary),0.2)] bg-[rgba(var(--theme-primary),0.05)] px-3 py-1.5 text-xs font-medium text-[var(--color-muted)] transition-all duration-200 hover:border-[rgba(var(--theme-primary),0.5)] hover:bg-[rgba(var(--theme-primary),0.1)] hover:text-[rgb(var(--theme-primary))]"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Stats column ─── */}
        <div className={`lg:col-span-2 transition-all duration-700 delay-150 ${visible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}>
          <div className="grid grid-cols-2 gap-3">
            {ABOUT_CONTENT.highlights.map((stat) => {
              const Icon = highlightIcons[stat.icon as keyof typeof highlightIcons];
              return (
                <SpotlightCard
                  key={stat.label}
                  className="flex flex-col items-center justify-center p-5 text-center"
                >
                  <div className="relative z-10 mb-2 flex size-10 items-center justify-center rounded-xl bg-[rgba(var(--theme-primary),0.12)] text-[rgb(var(--theme-primary))] transition-transform duration-300 group-hover:scale-110">
                    <Icon />
                  </div>
                  <div className="relative z-10 text-xl font-extrabold tracking-tight sm:text-2xl">
                    <span className="gradient-text-animate">{stat.value}</span>
                  </div>
                  <div className="relative z-10 mt-1 text-[11px] font-medium text-[var(--color-muted)]">{stat.label}</div>
                </SpotlightCard>
              );
            })}
          </div>

          {/* Availability banner */}
          <div className="mt-4 rounded-2xl border border-green-500/25 bg-green-500/5 p-5 text-center transition-all duration-300 hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/10">
            <div className="mb-2 flex items-center justify-center gap-2">
              <span className="relative size-3 rounded-full bg-green-400">
                <span className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-60" />
              </span>
              <span className="text-sm font-bold text-green-400">Open for Opportunities</span>
            </div>
            <p className="text-xs text-[var(--color-muted)]">
              Seeking internships &amp; full-time roles · Willing to relocate
            </p>
          </div>

          {/* Quick headline */}
          <div className="mt-4 rounded-xl border border-[rgba(var(--theme-primary),0.15)] bg-[rgba(var(--theme-primary),0.04)] p-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-muted)]">Current role</p>
            <p className="mt-1 text-sm font-medium text-[var(--color-foreground)]">{ABOUT_CONTENT.headline}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
