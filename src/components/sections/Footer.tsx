import { Container } from "@/components/ui/Container";
import { SITE, SOCIAL_LINKS } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[rgba(var(--theme-primary),0.12)] bg-[rgba(0,0,0,0.4)] backdrop-blur-sm">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(var(--theme-primary),0.4), transparent)" }} />

      <Container>
        <div className="flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-md border border-[rgba(var(--theme-primary),0.3)] bg-[rgba(var(--theme-primary),0.1)] text-[9px] font-mono text-[rgb(var(--theme-primary))]">
                {"</>"}
              </span>
              <span className="gradient-text font-bold">{SITE.name}</span>
            </div>
            <p className="mt-1 text-xs text-[var(--color-muted)]">{SITE.tagline}</p>
          </div>

          {/* Status */}
          <div className="flex items-center gap-1.5 rounded-full border border-green-500/20 bg-green-500/5 px-3 py-1 text-xs text-green-400">
            <span className="size-1.5 rounded-full bg-green-400 animate-pulse" />
            Available for work
          </div>

          {/* Links */}
          <div className="flex items-center gap-5 text-sm text-[var(--color-muted)]">
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[rgb(var(--theme-primary))]">GitHub</a>
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[rgb(var(--theme-primary))]">LinkedIn</a>
            <a href={`mailto:${SOCIAL_LINKS.email}`} className="transition-colors hover:text-[rgb(var(--theme-primary))]">Email</a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[rgba(var(--theme-primary),0.08)] py-4 text-center">
          <p className="font-mono text-[10px] text-[var(--color-muted)]">
            © {currentYear} {SITE.name} · Built with Next.js · Designed in the dark
          </p>
        </div>
      </Container>
    </footer>
  );
}
