"use client";

import { useRef, useState, useEffect } from "react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { experiences } from "@/content/experience";

/* ─── Timeline dot + animated line ─── */
function TimelineDot({ visible }: { visible: boolean }) {
  return (
    <div className="relative flex shrink-0 flex-col items-center">
      <div
        className={`relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-[rgb(var(--theme-primary))] bg-[var(--color-background)] transition-all duration-700 sm:size-8 ${
          visible ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
        style={{ boxShadow: visible ? "0 0 12px rgba(var(--theme-glow), 0.5)" : "none" }}
      >
        <div className="size-2 rounded-full bg-[rgb(var(--theme-primary))] sm:size-2.5" style={{ boxShadow: "0 0 6px rgba(var(--theme-glow), 0.8)" }} />
      </div>
    </div>
  );
}

/* ─── Company initial avatar ─── */
function CompanyAvatar({ company }: { company: string }) {
  return (
    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[rgba(var(--theme-primary),0.12)] font-bold text-[rgb(var(--theme-primary))] transition-all duration-300 group-hover:bg-[rgba(var(--theme-primary),0.2)] group-hover:scale-110" style={{ fontSize: "1.1rem", textShadow: "0 0 8px rgba(var(--theme-glow),0.5)" }}>
      {company.charAt(0)}
    </div>
  );
}

/* ─── Single experience card ─── */
function ExperienceCard({ company, role, period, description, highlights, tags, index, visible }: {
  company: string; role: string; period: string; description: string;
  highlights: string[]; tags: string[]; index: number; visible: boolean;
}) {
  return (
    <div className="group relative flex gap-5 sm:gap-8">
      {/* Timeline rail */}
      <div className="relative flex shrink-0 flex-col items-center">
        <TimelineDot visible={visible} />
        {index < experiences.length - 1 && (
          <div
            className="mt-2 w-px flex-1 transition-all duration-1000"
            style={{
              height: visible ? "100%" : "0%",
              background: "linear-gradient(to bottom, rgba(var(--theme-primary), 0.5), rgba(var(--theme-primary), 0.05))",
              transitionDelay: "400ms",
            }}
          />
        )}
      </div>

      {/* Card */}
      <div
        className={`spotlight-card glow-card mb-10 min-w-0 flex-1 rounded-2xl border border-[rgba(var(--theme-primary),0.1)] bg-[#0d0d14] p-6 transition-all duration-700 hover:border-[rgba(var(--theme-primary),0.3)] ${
          visible ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
        }`}
        style={{ transitionDelay: `${index * 180}ms` }}
      >
        {/* Accent bar */}
        <div className="absolute left-0 top-0 h-full w-0.5 rounded-l-2xl bg-gradient-to-b from-[rgb(var(--theme-primary))] via-[rgb(var(--theme-secondary))] to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Header */}
        <div className="mb-4 flex items-start gap-3">
          <CompanyAvatar company={company} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-[var(--color-foreground)] transition-colors duration-300 group-hover:text-[rgb(var(--theme-primary))]">
                  {company}
                </h3>
                <p className="text-sm font-medium text-[rgb(var(--theme-primary))]">{role}</p>
              </div>
              <span className="shrink-0 rounded-full border border-[rgba(var(--theme-primary),0.2)] bg-[rgba(var(--theme-primary),0.07)] px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[rgb(var(--theme-secondary))]">
                {period}
              </span>
            </div>
          </div>
        </div>

        <p className="mb-4 text-sm leading-relaxed text-[var(--color-muted)]">{description}</p>

        {/* Highlights */}
        <ul className="mb-4 space-y-2">
          {highlights.map((h) => (
            <li key={h} className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--color-muted)]">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[rgb(var(--theme-primary))]" style={{ boxShadow: "0 0 4px rgba(var(--theme-glow),0.6)" }} />
              {h}
            </li>
          ))}
        </ul>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Badge key={tag} className="border-[rgba(var(--theme-primary),0.2)] bg-[rgba(var(--theme-primary),0.06)] text-[10px] text-[rgb(var(--theme-primary))]">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Experience() {
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
      id="experience"
      title="Experience"
      subtitle="Where I've worked and what I've built."
      className="bg-[rgba(var(--theme-primary),0.01)]"
    >
      <div ref={sectionRef} className="max-w-3xl">
        {experiences.map((exp, i) => (
          <ExperienceCard
            key={exp.id}
            company={exp.company}
            role={exp.role}
            period={exp.period}
            description={exp.description}
            highlights={exp.highlights}
            tags={exp.tags}
            index={i}
            visible={visible}
          />
        ))}
      </div>
    </Section>
  );
}
