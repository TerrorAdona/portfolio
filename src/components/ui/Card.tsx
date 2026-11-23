import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

/**
 * Card components following design system specifications
 */

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Card variant */
  variant?: "default" | "elevated" | "glass" | "interactive";
  /** Internal padding */
  padding?: "none" | "sm" | "md" | "lg";
  /** Border radius */
  radius?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  /** Hover effect */
  hoverable?: boolean;
  /** Click handler (makes card interactive) */
  onClick?: () => void;
  /** ARIA label for interactive cards */
  ariaLabel?: string;
}

const variantStyles = {
  default:
    "bg-[var(--color-bg-secondary)] border border-[var(--color-border-primary)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)]",
  elevated:
    "bg-[var(--color-bg-tertiary)] border border-[var(--color-border-secondary)] shadow-[var(--shadow-lg)]",
  glass:
    "bg-[var(--glass-bg)] backdrop-blur-[20px] border border-[var(--glass-border)] shadow-[var(--shadow-xl)]",
  interactive:
    "bg-[var(--color-bg-secondary)] border border-[var(--color-border-primary)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-glow-md)] hover:border-[var(--color-border-secondary)] hover:-translate-y-1",
} as const;

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
} as const;

const radiusStyles = {
  none: "rounded-none",
  xs: "rounded-xs",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  full: "rounded-full",
} as const;

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "default",
      padding = "md",
      radius = "md",
      hoverable = false,
      onClick,
      ariaLabel,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isInteractive = variant === "interactive" || !!onClick;

    return (
      <div
        ref={ref}
        className={cn(
          "overflow-hidden transition-all duration-200 ease-out",
          variantStyles[variant],
          paddingStyles[padding],
          radiusStyles[radius],
          hoverable && "hover:-translate-y-1 hover:shadow-[var(--shadow-md)]",
          isInteractive && "cursor-pointer",
          className
        )}
        onClick={onClick}
        onKeyDown={(e) => {
          if (isInteractive && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            onClick?.();
          }
        }}
        role={isInteractive ? "button" : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        aria-label={ariaLabel}
        aria-pressed={isInteractive ? undefined : undefined}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

/**
 * Card Header
 */
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Title */
  title?: string;
  /** Subtitle */
  subtitle?: string;
  /** Action element (button, link) */
  action?: React.ReactNode;
  /** Avatar */
  avatar?: React.ReactNode;
  /** Divider below header */
  divider?: boolean;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ title, subtitle, action, avatar, divider = false, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-start justify-between gap-4 mb-4",
          divider && "pb-4 border-b border-[var(--color-border-primary)]",
          className
        )}
        {...props}
      >
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {avatar && <div className="flex-shrink-0">{avatar}</div>}
          <div className="min-w-0">
            {title && (
              <h3 className="font-display font-semibold text-[var(--color-text-primary)] truncate">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">
                {subtitle}
              </p>
            )}
            {children}
          </div>
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
    );
  }
);

CardHeader.displayName = "CardHeader";

/**
 * Card Content
 */
export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("text-[var(--color-text-secondary)]", className)} {...props}>
        {children}
      </div>
    );
  }
);

CardContent.displayName = "CardContent";

/**
 * Card Footer
 */
export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  /** Divider above footer */
  divider?: boolean;
  /** Align content */
  align?: "start" | "center" | "end" | "between";
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ divider = true, align = "start", className, children, ...props }, ref) => {
    const alignStyles = {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
    } as const;

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-3 mt-4",
          divider && "pt-4 border-t border-[var(--color-border-primary)]",
          alignStyles[align],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = "CardFooter";

/**
 * Compound component
 */
Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;