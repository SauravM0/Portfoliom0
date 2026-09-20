"use client";

import { useRef, useState, useEffect } from "react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { projects } from "@/content/projects";
import type { Project } from "@/lib/types";

/* ─── Project accent config ─── */
const projectAccent: Record<string, { bar: string; iconBg: string; iconText: string; tag: string }> = {
  "interview-ai-agent":      { bar: "from-violet-500 to-purple-600",  iconBg: "bg-violet-500/10", iconText: "text-violet-400", tag: "AI" },
  "telematics-app":          { bar: "from-cyan-500 to-blue-600",      iconBg: "bg-cyan-500/10",   iconText: "text-cyan-400",   tag: "Mobile" },
  "usb-keylogger":           { bar: "from-rose-500 to-red-600",       iconBg: "bg-rose-500/10",   iconText: "text-rose-400",   tag: "Security" },
  "real-time-security-monitor":{ bar: "from-emerald-500 to-teal-600", iconBg: "bg-emerald-500/10",iconText: "text-emerald-400",tag: "Security" },
  "recruitment-ai-platform": { bar: "from-amber-500 to-orange-600",   iconBg: "bg-amber-500/10",  iconText: "text-amber-400",  tag: "AI" },
};

/* ─── Project icon ─── */
function ProjectIcon({ id }: { id: string }) {
  const props = { "aria-hidden": true as const, className: "size-5", fill: "none" as const, stroke: "currentColor" as const, viewBox: "0 0 24 24", strokeWidth: 1.5 };
  switch (id) {
    case "interview-ai-agent":
      return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" /></svg>;
    case "telematics-app":
      return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>;
    case "usb-keylogger":
      return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>;
    case "real-time-security-monitor":
      return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.912m3.288 6.36A10.933 10.933 0 0 1 12 21.75c2.445 0 4.717-.643 6.708-1.775m-2.962-3.362a4.454 4.454 0 0 1-1.497.737 4.5 4.5 0 1 1-4.497-4.497c.264 0 .527.02.785.06" /></svg>;
    default:
      return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" /></svg>;
  }
}

/* ─── Single Project Card ─── */
function ProjectCard({ project, index, visible }: { project: Project; index: number; visible: boolean }) {
  const accent = projectAccent[project.id] ?? projectAccent["recruitment-ai-platform"];

  return (
    <SpotlightCard
      className={`flex flex-col transition-all duration-600 ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Gradient accent bar */}
      <div className={`h-0.5 w-full shrink-0 rounded-t-xl bg-gradient-to-r ${accent.bar} transition-all duration-300 group-hover:h-1`} />

      <div className="relative z-10 flex flex-1 flex-col p-5 sm:p-6">
        {/* Header */}
        <div className="mb-4 flex items-start gap-3">
          <div className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${accent.iconBg} ${accent.iconText} transition-transform duration-300 hover:scale-110`}>
            <ProjectIcon id={project.id} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-base font-semibold leading-tight text-[var(--color-foreground)] transition-colors duration-300 hover:text-[rgb(var(--theme-primary))] sm:text-lg">
                {project.title}
              </h3>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest ${accent.iconBg} ${accent.iconText}`}>
                {accent.tag}
              </span>
            </div>
            <p className="mt-1 text-xs text-[var(--color-muted)] sm:text-sm">{project.description}</p>
          </div>
        </div>

        {/* Problem */}
        <div className="mb-3">
          <div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-muted)]/70">
            <svg aria-hidden="true" className="size-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>
            Problem
          </div>
          <p className="text-xs leading-relaxed text-[var(--color-muted)] sm:text-sm">{project.problem}</p>
        </div>

        {/* Solution */}
        <div className="mb-4">
          <div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[rgb(var(--theme-primary))]/70">
            <svg aria-hidden="true" className="size-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
            Solution
          </div>
          <p className="text-xs leading-relaxed text-[var(--color-muted)] sm:text-sm">{project.solution}</p>
        </div>

        <div className="flex-1" />

        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Badge key={tag} className="text-[10px] transition-all hover:border-[rgba(var(--theme-primary),0.4)] hover:text-[var(--color-foreground)] sm:text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-2 border-t border-[rgba(var(--theme-primary),0.1)] pt-4">
          {project.repoUrl && (
            <Button href={project.repoUrl} target="_blank" rel="noopener noreferrer" variant="ghost" size="sm" className="text-[var(--color-muted)] hover:text-[rgb(var(--theme-primary))]">
              <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              GitHub
            </Button>
          )}
          {project.liveUrl && (
            <Button href={project.liveUrl} target="_blank" rel="noopener noreferrer" variant="ghost" size="sm" className="text-[var(--color-muted)] hover:text-[rgb(var(--theme-primary))]">
              <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              Live Demo
            </Button>
          )}
        </div>
      </div>
    </SpotlightCard>
  );
}

/* ─── Filter tags ─── */
const ALL_TAGS = ["All", "AI", "Security", "Mobile", "Full-Stack"];

export function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const filtered = filter === "All"
    ? projects
    : projects.filter((p) => {
        const accent = projectAccent[p.id];
        return accent?.tag === filter;
      });

  return (
    <Section
      id="projects"
      title="Featured Projects"
      subtitle="Real-world problems I've solved with code — from AI agents to security tools."
    >
      {/* Filter bar */}
      <div className="mb-8 flex flex-wrap gap-2">
        {ALL_TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setFilter(tag)}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
              filter === tag
                ? "border-[rgb(var(--theme-primary))] bg-[rgba(var(--theme-primary),0.15)] text-[rgb(var(--theme-primary))]"
                : "border-[rgba(var(--theme-primary),0.15)] text-[var(--color-muted)] hover:border-[rgba(var(--theme-primary),0.35)] hover:text-[var(--color-foreground)]"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div ref={sectionRef}>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </Section>
  );
}
