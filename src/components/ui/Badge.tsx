import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-border bg-surface-elevated px-2.5 py-0.5 text-xs font-medium text-muted transition-colors hover:border-primary/40 hover:text-foreground ${className}`}
    >
      {children}
    </span>
  );
}
