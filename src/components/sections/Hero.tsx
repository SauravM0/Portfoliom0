"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { TechBackground } from "@/components/ui/TechBackground";
import { useTypingAnimation } from "@/hooks/useTypingAnimation";
import { BASE_PATH, SOCIAL_LINKS, HERO_CONTENT } from "@/lib/constants";

const typingTexts = [
  "Building AI-Powered, Production Grade Applications",
  "Full-Stack · Cloud · Linux & Systems",
  "Crafting Scalable & Robust Architectures",
  "Automating Everything with Code & AI",
];

/* ─── Terminal Commands ─── */
const TERMINAL_COMMANDS: Record<string, string[]> = {
  help: [
    "Available commands:",
    "  about       — About Saurav",
    "  skills      — Tech stack overview",
    "  projects    — Recent projects",
    "  experience  — Work history",
    "  contact     — Get in touch",
    "  clear       — Clear terminal",
  ],
  about: [
    "╔══ SAURAV MADAKE ══════════════════════╗",
    "  CS Engineering student @ MGM University",
    "  CGPA: 8.16/10 · Open to Work · Relocatable",
    "  Focus: Full-Stack, AI, Cloud, Linux",
    "  Status: Active · Seeking Opportunities",
    "╚═══════════════════════════════════════╝",
  ],
  skills: [
    "─── TECH STACK ─────────────────────────",
    " Frontend : React.js, Next.js, TypeScript",
    " Backend  : FastAPI, Node.js, PostgreSQL",
    " AI/ML    : LangChain, LLMs, RAG",
    " Cloud    : AWS, Docker, Linux",
    " Security : YARA, Network Monitoring",
    "────────────────────────────────────────",
  ],
  projects: [
    "─── FEATURED PROJECTS ──────────────────",
    " 1. Interview AI Agent  [Next.js + LLM]",
    " 2. Telematics App      [Flutter + IoT]",
    " 3. Security Monitor    [Python + YARA]",
    " 4. Recruitment AI      [FastAPI + RAG]",
    " 5. USB Keylogger       [C/C++ + Linux]",
    "  → Scroll to #projects for details",
    "────────────────────────────────────────",
  ],
  experience: [
    "─── EXPERIENCE ─────────────────────────",
    " Current: SageScale Solutions (Intern)",
    "   ↳ Browser automation · AI DOM mapping",
    " 2024-25: Naukri Safar / Spandan",
    "   ↳ Full-stack · FastAPI · Linux admin",
    "────────────────────────────────────────",
  ],
  contact: [
    "─── CONTACT ────────────────────────────",
    " Email  : sauravmadake890@gmail.com",
    " GitHub : github.com/SauravM0",
    " LinkedIn: linkedin.com/in/sauravmadake",
    " Status : 🟢 Available for hire",
    "────────────────────────────────────────",
  ],
};

const BOOT_SEQUENCE = [
  { text: "SYSTEM BOOT v2.0.1", delay: 0 },
  { text: "Loading kernel modules... OK", delay: 300 },
  { text: "Initializing AI subsystems... OK", delay: 600 },
  { text: "Mounting developer workspace... OK", delay: 900 },
  { text: "Starting portfolio daemon... OK", delay: 1200 },
  { text: "────────────────────────────────────────", delay: 1400 },
  { text: '✓ Welcome! Type "help" to get started.', delay: 1600 },
];

/* ─── Live Stats that cycle ─── */
const LIVE_STATS = [
  { label: "Uptime", value: "99.9%", color: "success" },
  { label: "Latency", value: "14ms", color: "primary" },
  { label: "Workers", value: "4 active", color: "secondary" },
  { label: "AI Agent", value: "Online", color: "accent" },
];

/* ─── Typing Terminal Component ─── */
function InteractiveTerminal() {
  const [lines, setLines] = useState<Array<{ text: string; type: "system" | "input" | "output" | "error" }>>([]);
  const [input, setInput] = useState("");
  const [booted, setBooted] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let t: number = 0;
    BOOT_SEQUENCE.forEach((line, i) => {
      t = window.setTimeout(() => {
        setLines((prev) => [...prev, { text: line.text, type: "system" }]);
        if (i === BOOT_SEQUENCE.length - 1) setBooted(true);
      }, line.delay) as unknown as number;
    });
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const runCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    setLines((prev) => [...prev, { text: `$ ${cmd}`, type: "input" }]);

    if (trimmed === "clear") {
      setLines([]);
      return;
    }

    const output = TERMINAL_COMMANDS[trimmed];
    if (output) {
      setLines((prev) => [...prev, ...output.map((t) => ({ text: t, type: "output" as const }))]);
    } else if (trimmed === "") {
      // do nothing
    } else {
      setLines((prev) => [...prev, { text: `bash: ${trimmed}: command not found. Type "help"`, type: "error" }]);
    }
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const cmd = input;
      runCommand(cmd);
      if (cmd.trim()) setHistory((h) => [cmd, ...h].slice(0, 20));
      setInput("");
      setHistoryIdx(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHistoryIdx((i) => {
        const next = Math.min(i + 1, history.length - 1);
        setInput(history[next] ?? "");
        return next;
      });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHistoryIdx((i) => {
        const next = Math.max(i - 1, -1);
        setInput(next === -1 ? "" : (history[next] ?? ""));
        return next;
      });
    }
  }, [input, history, runCommand]);

  const textColor = (type: string) => {
    switch (type) {
      case "system": return "text-[rgb(var(--theme-secondary))]";
      case "input": return "text-[rgb(var(--theme-primary))]";
      case "error": return "text-red-400";
      default: return "text-[#c0c0d0]";
    }
  };

  return (
    <div
      className="terminal-bg scanlines relative flex h-[340px] flex-col overflow-hidden rounded-2xl"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div className="flex shrink-0 items-center gap-2 border-b border-[rgba(var(--theme-primary),0.15)] bg-black/40 px-4 py-2.5">
        <span className="size-3 rounded-full bg-red-500/80" />
        <span className="size-3 rounded-full bg-yellow-500/80" />
        <span className="size-3 rounded-full bg-green-500/80" />
        <span className="ml-3 font-mono text-[10px] text-[var(--color-muted)]">saurav@portfolio:~</span>
      </div>

      {/* Output area */}
      <div className="terminal-text flex-1 overflow-y-auto p-4 pb-0">
        {lines.map((line, i) => (
          <div key={i} className={`${textColor(line.type)} leading-relaxed`}>
            {line.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Input */}
      {booted && (
        <div className="terminal-text flex shrink-0 items-center gap-2 px-4 py-3">
          <span className="text-[rgb(var(--theme-primary))]">$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-[var(--color-foreground)] outline-none placeholder:text-[var(--color-muted)]/40"
            placeholder='type "help"...'
            autoComplete="off"
            spellCheck={false}
            aria-label="Terminal input"
          />
          <span className="terminal-cursor" />
        </div>
      )}
    </div>
  );
}

/* ─── Live Stats Panel ─── */
function LiveStatsPanel() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2000);
    return () => clearInterval(id);
  }, []);

  const cpuVal = (60 + Math.sin(tick * 0.4) * 15).toFixed(1);
  const memVal = (72 + Math.cos(tick * 0.3) * 8).toFixed(1);

  return (
    <div className="grid grid-cols-2 gap-3">
      {LIVE_STATS.map((stat) => (
        <div
          key={stat.label}
          className="glow-border rounded-xl bg-[rgba(var(--theme-primary),0.04)] p-3 transition-all"
        >
          <div className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-muted)]">{stat.label}</div>
          <div className="mt-1 font-mono text-sm font-bold text-[rgb(var(--theme-primary))] glow-text-sm">{stat.value}</div>
        </div>
      ))}
      {/* CPU bar */}
      <div className="col-span-2 glow-border rounded-xl bg-[rgba(var(--theme-primary),0.04)] p-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-muted)]">CPU Usage</span>
          <span className="font-mono text-xs text-[rgb(var(--theme-primary))]">{cpuVal}%</span>
        </div>
        <div className="mt-2 h-1.5 rounded-full bg-[rgba(var(--theme-primary),0.1)]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[rgb(var(--theme-primary))] to-[rgb(var(--theme-secondary))] transition-all duration-1000"
            style={{ width: `${cpuVal}%`, boxShadow: `0 0 8px rgba(var(--theme-glow), 0.5)` }}
          />
        </div>
      </div>
      {/* MEM bar */}
      <div className="col-span-2 glow-border rounded-xl bg-[rgba(var(--theme-primary),0.04)] p-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-muted)]">Memory</span>
          <span className="font-mono text-xs text-[rgb(var(--theme-secondary))]">{memVal}%</span>
        </div>
        <div className="mt-2 h-1.5 rounded-full bg-[rgba(var(--theme-primary),0.1)]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[rgb(var(--theme-secondary))] to-[rgb(var(--theme-accent))] transition-all duration-1000"
            style={{ width: `${memVal}%`, boxShadow: `0 0 8px rgba(var(--theme-glow-secondary), 0.5)` }}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Avatar ─── */
function AvatarPhoto() {
  return (
    <div className="group relative mx-auto size-36 sm:size-44">
      {/* Animated glow rings */}
      <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-[rgb(var(--theme-primary))] via-[rgb(var(--theme-secondary))] to-[rgb(var(--theme-accent))] opacity-40 blur-lg transition-all duration-700 group-hover:opacity-80 group-hover:blur-xl animate-pulse-slow" />
      <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[rgb(var(--theme-primary))] via-[rgb(var(--theme-secondary))] to-[rgb(var(--theme-accent))] opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
      <div className="relative flex size-full items-center justify-center overflow-hidden rounded-full bg-[#0d0d14]">
        <Image
              src={`${BASE_PATH}/og-image.jpg`}
          alt="Saurav Madake"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}

/* ─── Main Hero ─── */
export function Hero() {
  const { displayedText, cursor } = useTypingAnimation({
    texts: typingTexts,
    typeSpeed: 55,
    deleteSpeed: 28,
    pauseAfterTyping: 2500,
    pauseAfterDeleting: 500,
  });

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="hero" className="relative flex min-h-dvh items-center overflow-hidden pt-20">
      <TechBackground />

      {/* Glowing orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 -top-40 size-[600px] animate-pulse-slow rounded-full blur-[160px]" style={{ background: "rgba(var(--theme-primary), 0.06)" }} />
        <div className="absolute -bottom-40 -right-20 size-[500px] animate-pulse-slower rounded-full blur-[140px]" style={{ background: "rgba(var(--theme-secondary), 0.05)" }} />
        <div className="absolute left-1/3 top-1/3 size-[400px] animate-pulse-slowest rounded-full blur-[120px]" style={{ background: "rgba(var(--theme-accent), 0.04)" }} />
      </div>

      {/* Subtle top border */}
      <div aria-hidden="true" className="absolute top-0 left-1/4 right-1/4 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(var(--theme-primary), 0.4), transparent)" }} />

      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* ── Left: Text Content ── */}
          <div className={`${mounted ? "animate-slide-up" : "opacity-0"}`}>
            {/* Status badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(var(--theme-primary),0.25)] bg-[rgba(var(--theme-primary),0.08)] px-4 py-1.5 text-xs font-semibold tracking-wide text-[rgb(var(--theme-primary))]">
              <span className="size-2 rounded-full bg-green-400 animate-pulse" style={{ boxShadow: "0 0 8px #4ade80" }} />
              Available for opportunities
            </div>

            {/* Avatar (mobile) */}
            <div className="mb-8 lg:hidden">
              <AvatarPhoto />
            </div>

            {/* Name */}
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl xl:text-6xl">
              Hi, I&apos;m{" "}
              <span className="gradient-text-animate glow-text">
                {HERO_CONTENT.name.split(" ")[0]}
              </span>
              <br />
              <span className="gradient-text">
                {HERO_CONTENT.name.split(" ")[1]}
              </span>
            </h1>

            {/* Title */}
            <p className="mt-3 text-base text-[var(--color-muted)] sm:text-lg">
              {HERO_CONTENT.title}
            </p>

            {/* Typing animation */}
            <div className="mt-5 flex min-h-[2rem] items-center" aria-live="polite" aria-label="Tagline">
              <span className="terminal-text text-sm text-[rgb(var(--theme-secondary))] sm:text-base glow-text-sm">
                &gt; {displayedText}
                <span className="terminal-cursor" aria-hidden="true" />
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href={`mailto:${SOCIAL_LINKS.email}`} variant="primary" size="lg" className="group">
                <svg className="size-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                Get in touch
              </Button>
              <Button href="#projects" variant="outline" size="lg" className="group">
                View Projects
                <svg className="size-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
              <Button href={HERO_CONTENT.resumeUrl} variant="ghost" size="lg" target="_blank" rel="noopener noreferrer" className="group">
                <svg className="size-4 transition-transform group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Resume
              </Button>
            </div>

            {/* Social links */}
            <div className="mt-8 flex items-center gap-4">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-muted)]">Find me on</span>
              <div className="h-px flex-1 bg-[rgba(var(--theme-primary),0.12)]" />
              <div className="flex items-center gap-2">
                {[
                  { href: SOCIAL_LINKS.github, label: "GitHub", icon: <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />, filled: true },
                  { href: SOCIAL_LINKS.linkedin, label: "LinkedIn", icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />, filled: true },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex size-9 items-center justify-center rounded-full border border-[rgba(var(--theme-primary),0.2)] bg-[rgba(var(--theme-primary),0.06)] text-[var(--color-muted)] transition-all duration-300 hover:scale-110 hover:border-[rgba(var(--theme-primary),0.5)] hover:text-[rgb(var(--theme-primary))]"
                    style={{ "--hover-shadow": "0 0 16px rgba(var(--theme-glow), 0.3)" } as React.CSSProperties}
                  >
                    <svg className="size-3.5" fill="currentColor" viewBox="0 0 24 24">{social.icon}</svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Terminal + Stats ── */}
          <div className={`space-y-4 ${mounted ? "animate-slide-in-right" : "opacity-0"}`} style={{ animationDelay: "150ms" }}>
            {/* Avatar (desktop) */}
            <div className="hidden justify-center lg:flex">
              <AvatarPhoto />
            </div>

            {/* Interactive Terminal */}
            <InteractiveTerminal />

            {/* Live Stats */}
            <LiveStatsPanel />
          </div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-muted)]">Scroll</span>
        <div className="flex h-8 w-5 items-start justify-center rounded-full border border-[rgba(var(--theme-primary),0.3)] p-1">
          <div className="h-2 w-1 animate-bounce rounded-full bg-[rgb(var(--theme-primary))]" />
        </div>
      </div>
    </section>
  );
}
