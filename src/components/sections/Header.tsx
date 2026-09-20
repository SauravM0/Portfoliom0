"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { NAV_LINKS, SITE } from "@/lib/constants";

const THEMES = [
  { id: "cyberpunk", label: "◉ Cyber", color: "#3b82f6" },
  { id: "matrix", label: "◉ Matrix", color: "#22c55e" },
  { id: "aurora", label: "◉ Aurora", color: "#14b8a6" },
  { id: "sunset", label: "◉ Sunset", color: "#f97316" },
  { id: "neon", label: "◉ Neon", color: "#e879f9" },
] as const;

type ThemeId = typeof THEMES[number]["id"];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState<ThemeId>("cyberpunk");
  const [showThemePicker, setShowThemePicker] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function applyTheme(themeId: ThemeId) {
    setActiveTheme(themeId);
    document.documentElement.setAttribute("data-theme", themeId === "cyberpunk" ? "" : themeId);
    setShowThemePicker(false);
  }

  const currentTheme = THEMES.find((t) => t.id === activeTheme)!;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass border-b border-[rgba(var(--theme-primary),0.15)] shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between sm:h-20" aria-label="Main navigation">
          {/* ── Logo ── */}
          <a
            href="#hero"
            className="group flex items-center gap-2 text-lg font-bold tracking-tight"
            aria-label="Home"
          >
            <span className="flex size-7 items-center justify-center rounded-md border border-[rgba(var(--theme-primary),0.3)] bg-[rgba(var(--theme-primary),0.1)] text-xs font-mono text-[rgb(var(--theme-primary))]">
              {"</>"}
            </span>
            <span className="gradient-text-animate">{SITE.name.split(" ")[0]}</span>
            <span className="text-[var(--color-muted)]">{SITE.name.split(" ")[1]}</span>
          </a>

          {/* ── Desktop nav ── */}
          <div className="hidden items-center gap-1 md:flex">
            <ul className="flex items-center gap-1" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="relative rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-muted)] transition-all duration-200 hover:bg-[rgba(var(--theme-primary),0.08)] hover:text-[var(--color-foreground)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* ── Theme switcher ── */}
            <div className="relative ml-3">
              <button
                type="button"
                id="theme-toggle-btn"
                onClick={() => setShowThemePicker(!showThemePicker)}
                className="flex items-center gap-2 rounded-lg border border-[rgba(var(--theme-primary),0.25)] bg-[rgba(var(--theme-primary),0.08)] px-3 py-1.5 text-xs font-medium text-[rgb(var(--theme-primary))] transition-all hover:bg-[rgba(var(--theme-primary),0.15)]"
                aria-expanded={showThemePicker}
                aria-label="Toggle theme picker"
              >
                <span
                  className="size-2 rounded-full"
                  style={{ background: currentTheme.color, boxShadow: `0 0 6px ${currentTheme.color}` }}
                />
                {currentTheme.label}
                <svg className={`size-3 transition-transform ${showThemePicker ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
                </svg>
              </button>

              {showThemePicker && (
                <div className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-[rgba(var(--theme-primary),0.2)] bg-[#0d0d14] p-1.5 shadow-2xl shadow-black/50 backdrop-blur-xl">
                  {THEMES.map((theme) => (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => applyTheme(theme.id)}
                      className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-medium transition-all ${
                        activeTheme === theme.id
                          ? "bg-[rgba(var(--theme-primary),0.15)] text-[var(--color-foreground)]"
                          : "text-[var(--color-muted)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--color-foreground)]"
                      }`}
                    >
                      <span
                        className="size-2.5 rounded-full"
                        style={{ background: theme.color, boxShadow: `0 0 6px ${theme.color}80` }}
                      />
                      {theme.label}
                      {activeTheme === theme.id && (
                        <svg className="ml-auto size-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Mobile toggle ── */}
          <button
            type="button"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="inline-flex items-center justify-center rounded-lg border border-[rgba(var(--theme-primary),0.2)] bg-[rgba(var(--theme-primary),0.08)] p-2 text-[var(--color-muted)] transition-all hover:text-[var(--color-foreground)] md:hidden"
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
          >
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              {isMobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* ── Mobile menu ── */}
        {isMobileOpen && (
          <div className="border-t border-[rgba(var(--theme-primary),0.15)] pb-4 md:hidden">
            <ul className="mt-2 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-muted)] transition-all hover:bg-[rgba(var(--theme-primary),0.08)] hover:text-[var(--color-foreground)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            {/* Mobile theme switcher */}
            <div className="mt-3 border-t border-[rgba(255,255,255,0.05)] pt-3">
              <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-[var(--color-muted)]">Theme</p>
              <div className="flex flex-wrap gap-2 px-3">
                {THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => { applyTheme(theme.id); setIsMobileOpen(false); }}
                    className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium transition-all ${
                      activeTheme === theme.id
                        ? "border-current text-[rgb(var(--theme-primary))]"
                        : "border-[rgba(255,255,255,0.1)] text-[var(--color-muted)]"
                    }`}
                  >
                    <span className="size-1.5 rounded-full" style={{ background: theme.color }} />
                    {theme.label.replace("◉ ", "")}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
