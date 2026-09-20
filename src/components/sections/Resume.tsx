"use client";

import { useRef, useState, useEffect } from "react";
import { Section } from "@/components/ui/Section";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Button } from "@/components/ui/Button";
import { HERO_CONTENT } from "@/lib/constants";

const stats = [
  { value: "8.16/10", label: "University CGPA",       icon: "academic" },
  { value: "2",       label: "Internships Completed",  icon: "briefcase" },
  { value: "10+",     label: "Projects Delivered",     icon: "code" },
  { value: "3rd",     label: "Hackathon Prize",        icon: "trophy" },
] as const;

function StatIcon({ icon }: { icon: string }) {
  const props = { "aria-hidden": true as const, className: "size-5", fill: "none" as const, stroke: "currentColor" as const, viewBox: "0 0 24 24", strokeWidth: 1.5 };
  switch (icon) {
    case "academic":  return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" /></svg>;
    case "briefcase": return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" /></svg>;
    case "code":      return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" /></svg>;
    case "trophy":    return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0 1 16.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 0 1-2.77.896m0 0a6.017 6.017 0 0 1-2.77-.896" /></svg>;
    default: return null;
  }
}

export function Resume() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Section
      id="resume"
      title="Resume"
      subtitle="A snapshot of my academic performance, professional experience, and key accomplishments."
    >
      <div ref={sectionRef}>
        {/* Stats grid */}
        <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
          {stats.map((stat, i) => (
            <SpotlightCard
              key={stat.label}
              className={`flex flex-col items-center justify-center p-5 text-center transition-all duration-700 sm:p-6 ${
                visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="relative z-10 mb-2 flex size-10 items-center justify-center rounded-xl bg-[rgba(var(--theme-primary),0.12)] text-[rgb(var(--theme-primary))]">
                <StatIcon icon={stat.icon} />
              </div>
              <div className="relative z-10 text-xl font-extrabold tracking-tight sm:text-2xl">
                <span className="gradient-text-animate">{stat.value}</span>
              </div>
              <div className="relative z-10 mt-1 text-[11px] font-medium text-[var(--color-muted)]">{stat.label}</div>
            </SpotlightCard>
          ))}
        </div>

        {/* CTA buttons */}
        <div className={`flex flex-wrap items-center justify-center gap-4 transition-all duration-700 delay-400 ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
          <Button href={HERO_CONTENT.resumeUrl} target="_blank" rel="noopener noreferrer" variant="primary" size="lg" className="group">
            <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
            View Resume
          </Button>
          <Button href={HERO_CONTENT.resumeUrl} download variant="outline" size="lg" className="group">
            <svg aria-hidden="true" className="size-4 transition-transform group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
            Download PDF
          </Button>
        </div>
      </div>
    </Section>
  );
}
