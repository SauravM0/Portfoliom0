"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Section } from "@/components/ui/Section";
import { SOCIAL_LINKS } from "@/lib/constants";

/* ─── CLI Contact Wizard ─── */
const WIZARD_STEPS = [
  { key: "greeting", prompt: null, question: 'Hi! I\'m Saurav\'s AI assistant.\nType "start" to send a message, or pick a quick action:', quickActions: ["start", "github", "linkedin", "email"] },
  { key: "name",     prompt: "What's your name?",    question: null, quickActions: [] },
  { key: "email",    prompt: "Your email address?",  question: null, quickActions: [] },
  { key: "message",  prompt: "Your message:",        question: null, quickActions: [] },
  { key: "confirm",  prompt: null, question: null,   quickActions: ["send", "restart"] },
];

type WizardData = { name: string; email: string; message: string };

export function Contact() {
  const [lines, setLines] = useState<Array<{ text: string; type: "system" | "input" | "output" | "success" | "link" }>>([]);
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [wizardData, setWizardData] = useState<WizardData>({ name: "", email: "", message: "" });
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Boot greeting
    const msgs = [
      { text: "╔══════════════════════════════════════╗", type: "system" as const },
      { text: "  CONTACT INTERFACE v1.0", type: "system" as const },
      { text: "╚══════════════════════════════════════╝", type: "system" as const },
      { text: 'Type "start" to send a message, or try: github / linkedin / email', type: "output" as const },
    ];
    msgs.forEach((m, i) => {
      setTimeout(() => setLines((prev) => [...prev, m]), i * 200);
    });
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const addLine = useCallback((text: string, type: typeof lines[number]["type"]) => {
    setLines((prev) => [...prev, { text, type }]);
  }, []);

  const handleCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    addLine(`> ${cmd}`, "input");

    // Quick actions
    if (trimmed === "github") {
      addLine("→ Opening GitHub profile...", "output");
      addLine("  https://github.com/SauravM0", "link");
      window.open(SOCIAL_LINKS.github, "_blank");
      return;
    }
    if (trimmed === "linkedin") {
      addLine("→ Opening LinkedIn profile...", "output");
      addLine("  https://linkedin.com/in/sauravmadake", "link");
      window.open(SOCIAL_LINKS.linkedin, "_blank");
      return;
    }
    if (trimmed === "email") {
      addLine("→ Opening email client...", "output");
      addLine(`  sauravmadake890@gmail.com`, "link");
      window.location.href = `mailto:${SOCIAL_LINKS.email}`;
      return;
    }
    if (trimmed === "clear") {
      setLines([]);
      return;
    }
    if (trimmed === "restart") {
      setStep(0);
      setWizardData({ name: "", email: "", message: "" });
      addLine("─── Session restarted. Type \"start\" to begin. ───", "system");
      return;
    }

    // Wizard flow
    if (step === 0) {
      if (trimmed === "start") {
        setStep(1);
        addLine("", "output");
        addLine("What's your name?", "system");
      } else {
        addLine('Unknown command. Try "start", "github", "linkedin", or "email".', "output");
      }
      return;
    }
    if (step === 1) {
      if (!trimmed) { addLine("Name cannot be empty.", "output"); return; }
      setWizardData((d) => ({ ...d, name: cmd.trim() }));
      setStep(2);
      addLine(`Hello, ${cmd.trim()}! 👋`, "success");
      addLine("Your email address?", "system");
      return;
    }
    if (step === 2) {
      if (!trimmed.includes("@")) { addLine("Please enter a valid email address.", "output"); return; }
      setWizardData((d) => ({ ...d, email: cmd.trim() }));
      setStep(3);
      addLine("Great! Your message:", "system");
      return;
    }
    if (step === 3) {
      if (!trimmed) { addLine("Message cannot be empty.", "output"); return; }
      const msg = cmd.trim();
      setWizardData((d) => ({ ...d, message: msg }));
      setStep(4);
      addLine("", "output");
      addLine("─── MESSAGE PREVIEW ────────────────────", "system");
      addLine(`  Name   : ${wizardData.name}`, "output");
      addLine(`  Email  : ${wizardData.email}`, "output");
      addLine(`  Message: ${msg}`, "output");
      addLine("────────────────────────────────────────", "system");
      addLine('Type "send" to confirm, or "restart" to start over.', "output");
      return;
    }
    if (step === 4) {
      if (trimmed === "send") {
        const subject = encodeURIComponent(`Portfolio Contact from ${wizardData.name}`);
        const body = encodeURIComponent(`Name: ${wizardData.name}\nEmail: ${wizardData.email}\n\nMessage:\n${wizardData.message}`);
        window.location.href = `mailto:${SOCIAL_LINKS.email}?subject=${subject}&body=${body}`;
        addLine("", "output");
        addLine("✓ Message sent! Opening your email client...", "success");
        addLine("✓ Saurav will respond within 24 hours.", "success");
        setStep(0);
      } else {
        addLine('Type "send" to confirm or "restart" to start over.', "output");
      }
      return;
    }
  }, [step, wizardData, addLine]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleCommand(input);
    setInput("");
  };

  const textColor = (type: string) => {
    switch (type) {
      case "system":  return "text-[rgb(var(--theme-secondary))]";
      case "input":   return "text-[rgb(var(--theme-primary))] font-semibold";
      case "success": return "text-green-400";
      case "link":    return "text-[rgb(var(--theme-accent))] underline underline-offset-2";
      default:        return "text-[#c0c0d0]";
    }
  };

  return (
    <Section
      id="contact"
      title="Let's Connect"
      subtitle="Use the CLI below to reach out, or jump straight to GitHub / LinkedIn."
      className="bg-[rgba(var(--theme-primary),0.01)]"
    >
      <div
        ref={sectionRef}
        className={`mx-auto max-w-2xl transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      >
        {/* Social quick links */}
        <div className="mb-6 flex flex-wrap justify-center gap-3">
          {[
            { label: "sauravmadake890@gmail.com", href: `mailto:${SOCIAL_LINKS.email}`, icon: "✉" },
            { label: "GitHub",   href: SOCIAL_LINKS.github,   icon: "⌥" },
            { label: "LinkedIn", href: SOCIAL_LINKS.linkedin, icon: "⚲" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="glow-border flex items-center gap-2 rounded-xl bg-[rgba(var(--theme-primary),0.06)] px-4 py-2.5 text-sm font-medium text-[var(--color-muted)] transition-all duration-200 hover:bg-[rgba(var(--theme-primary),0.12)] hover:text-[rgb(var(--theme-primary))]"
            >
              <span className="text-[rgb(var(--theme-primary))]">{link.icon}</span>
              {link.label}
            </a>
          ))}
        </div>

        {/* CLI Terminal */}
        <div
          className="terminal-bg scanlines relative flex h-[380px] flex-col overflow-hidden rounded-2xl"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Title bar */}
          <div className="flex shrink-0 items-center gap-2 border-b border-[rgba(var(--theme-primary),0.15)] bg-black/50 px-4 py-2.5">
            <span className="size-3 rounded-full bg-red-500/80" />
            <span className="size-3 rounded-full bg-yellow-500/80" />
            <span className="size-3 rounded-full bg-green-500/80" />
            <span className="ml-3 font-mono text-[10px] text-[var(--color-muted)]">contact-cli — saurav@portfolio</span>
          </div>

          {/* Output */}
          <div className="terminal-text flex-1 overflow-y-auto p-4 pb-2">
            {lines.map((line, i) => (
              <div key={i} className={`${textColor(line.type)} leading-relaxed`}>
                {line.text || <br />}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <form onSubmit={onSubmit} className="terminal-text flex shrink-0 items-center gap-2 border-t border-[rgba(var(--theme-primary),0.12)] px-4 py-3">
            <span className="text-[rgb(var(--theme-primary))]">{">"}</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent text-[var(--color-foreground)] outline-none placeholder:text-[var(--color-muted)]/40"
              placeholder='type a command...'
              autoComplete="off"
              spellCheck={false}
              aria-label="Contact terminal input"
            />
            <span className="terminal-cursor" />
          </form>
        </div>

        {/* Status badge */}
        <div className="mt-5 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-green-500/25 bg-green-500/8 px-4 py-1.5 text-xs font-medium text-green-400">
            <span className="relative size-1.5 rounded-full bg-green-400">
              <span className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-60" />
            </span>
            Open for internships, full-time roles &amp; collaborations
          </div>
        </div>
      </div>
    </Section>
  );
}
