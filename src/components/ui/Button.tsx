import type {
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  ReactNode,
} from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "glow";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

type ButtonAsLink = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-[rgb(var(--theme-primary))] text-white shadow-[0_0_16px_rgba(var(--theme-glow),0.35)] hover:shadow-[0_0_24px_rgba(var(--theme-glow),0.55)] hover:brightness-110 active:brightness-90",
  secondary:
    "bg-[rgb(var(--theme-secondary))] text-white hover:brightness-110 active:brightness-90",
  ghost:
    "bg-transparent text-[var(--color-foreground)] hover:bg-[rgba(var(--theme-primary),0.08)] hover:text-[rgb(var(--theme-primary))] active:bg-[rgba(var(--theme-primary),0.12)]",
  outline:
    "border border-[rgba(var(--theme-primary),0.3)] bg-transparent text-[var(--color-foreground)] hover:border-[rgba(var(--theme-primary),0.6)] hover:bg-[rgba(var(--theme-primary),0.08)] hover:text-[rgb(var(--theme-primary))] active:bg-[rgba(var(--theme-primary),0.12)]",
  glow:
    "border border-[rgba(var(--theme-primary),0.4)] bg-[rgba(var(--theme-primary),0.1)] text-[rgb(var(--theme-primary))] shadow-[0_0_12px_rgba(var(--theme-glow),0.2)] hover:bg-[rgba(var(--theme-primary),0.18)] hover:shadow-[0_0_24px_rgba(var(--theme-glow),0.4)] active:bg-[rgba(var(--theme-primary),0.22)]",
};

const sizeStyles: Record<Size, string> = {
  sm: "gap-1.5 rounded-lg px-3 py-1.5 text-xs",
  md: "gap-2 rounded-lg px-5 py-2.5 text-sm",
  lg: "gap-2.5 rounded-xl px-7 py-3.5 text-sm",
};

const BUTTON_BASE =
  "inline-flex items-center justify-center font-semibold tracking-wide transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--theme-primary))] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)] disabled:pointer-events-none disabled:opacity-40";

function isLink(props: ButtonProps): props is ButtonAsLink {
  return "href" in props && props.href !== undefined;
}

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", children, className = "" } = props;
  const classes = `${BUTTON_BASE} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (isLink(props)) {
    const { variant: _v, size: _s, children: _c, className: _cl, ...linkProps } = props;
    return (
      <a className={classes} {...linkProps}>
        {children}
      </a>
    );
  }

  const { variant: _v, size: _s, children: _c, className: _cl, ...buttonProps } = props;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
