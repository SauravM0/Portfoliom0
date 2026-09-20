import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export function Section({
  id,
  title,
  subtitle,
  children,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 py-20 sm:py-24 lg:py-28 ${className}`}
    >
      <Container>
        {(title || subtitle) && (
          <div className="mb-14 sm:mb-18">
            {title && (
              <h2 className="section-title-underline text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                <span className="gradient-text">{title}</span>
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 max-w-2xl text-base text-[var(--color-muted)] sm:text-lg leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
