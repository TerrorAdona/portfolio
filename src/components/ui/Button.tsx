import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

/**
 * Button component variants and sizes
 * Following the design system specifications
 */

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size">,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "size"> {
  /** Button variant */
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "success" | "warning";
  /** Button size */
  size?: "sm" | "md" | "lg";
  /** Show loading spinner */
  loading?: boolean;
  /** Left icon */
  leftIcon?: React.ReactNode;
  /** Right icon */
  rightIcon?: React.ReactNode;
  /** Full width */
  fullWidth?: boolean;
  /** Render as anchor tag */
  asAnchor?: boolean;
  /** Anchor href (when asAnchor=true) */
  href?: string;
  /** External link */
  external?: boolean;
  /** Disable animations */
  noAnimation?: boolean;
}

const variantStyles = {
  primary:
    "bg-[var(--color-accent-primary)] text-[var(--color-text-inverse)] border-transparent hover:bg-[var(--color-accent-primary)]/90 hover:shadow-[var(--shadow-glow-sm)] active:bg-[var(--color-accent-primary)]",
  secondary:
    "bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] border-[var(--color-border-primary)] hover:bg-[var(--color-bg-hover)] active:bg-[var(--color-bg-active)]",
  outline:
    "bg-transparent text-[var(--color-text-primary)] border-[var(--color-border-secondary)] hover:bg-[var(--color-bg-hover)] active:bg-[var(--color-bg-active)]",
  ghost:
    "bg-transparent text-[var(--color-text-secondary)] border-transparent hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-text-primary)] active:bg-[var(--color-bg-active)]",
  destructive:
    "bg-[var(--color-error)] text-[var(--color-text-inverse)] border-transparent hover:bg-[var(--color-error)]/90 hover:shadow-[var(--shadow-glow-sm)] active:bg-[var(--color-error)]",
  success:
    "bg-[var(--color-success)] text-[var(--color-text-inverse)] border-transparent hover:bg-[var(--color-success)]/90 active:bg-[var(--color-success)]",
  warning:
    "bg-[var(--color-warning)] text-[var(--color-text-inverse)] border-transparent hover:bg-[var(--color-warning)]/90 active:bg-[var(--color-warning)]",
} as const;

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm gap-1",
  md: "px-4 py-2 text-base gap-2",
  lg: "px-5 py-3 text-lg gap-2",
} as const;

const baseStyles =
  "inline-flex items-center justify-center font-medium rounded-sm transition-all duration-120 ease-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-bg-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-border-focus)] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      asAnchor = false,
      href,
      external = false,
      noAnimation = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const Component = asAnchor && href ? "a" : "button";

    const anchorProps = asAnchor && href
      ? {
          href,
          target: external ? "_blank" : undefined,
          rel: external ? "noopener noreferrer" : undefined,
        }
      : {};

    return (
      <Component
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          noAnimation && "transition-none",
          className
        )}
        disabled={isDisabled}
        aria-busy={loading}
        aria-disabled={isDisabled}
        {...anchorProps}
        {...props}
      >
        {loading ? (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : leftIcon ? (
          <span aria-hidden="true">{leftIcon}</span>
        ) : null}
        {children}
        {!loading && rightIcon && <span aria-hidden="true">{rightIcon}</span>}
      </Component>
    );
  }
);

Button.displayName = "Button";

/**
 * Button Group - for grouping related actions
 */
export interface ButtonGroupProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  vertical?: boolean;
  className?: string;
}

export function ButtonGroup({
  children,
  variant,
  size,
  vertical = false,
  className,
}: ButtonGroupProps) {
  return (
    <div
      className={cn(
        "inline-flex",
        vertical ? "flex-col" : "flex-row",
        "gap-0",
        className
      )}
      role="group"
      aria-label="Button group"
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;

        const isFirst = index === 0;
        const isLast = index === React.Children.count(children) - 1;

        const radiusClasses = vertical
          ? isFirst
            ? "rounded-t-sm rounded-b-none"
            : isLast
            ? "rounded-b-sm rounded-t-none"
            : "rounded-none"
          : isFirst
          ? "rounded-l-sm rounded-r-none"
          : isLast
          ? "rounded-r-sm rounded-l-none"
          : "rounded-none";

        const borderClasses = vertical
          ? isLast
            ? ""
            : "border-b-0"
          : isLast
          ? ""
            : "border-r-0 border-l";

        return React.cloneElement(child as React.ReactElement<any>, {
          className: cn(
            (child.props as any).className,
            radiusClasses,
            borderClasses,
            variant && `btn-${variant}`,
            size && `btn-${size}`
          ),
        });
      })}
    </div>
  );
}