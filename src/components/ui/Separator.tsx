import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

/**
 * Separator component following design system specifications
 */

export interface SeparatorProps extends HTMLAttributes<HTMLHRElement> {
  /** Orientation */
  orientation?: "horizontal" | "vertical";
  /** Decorative (no semantic meaning) */
  decorative?: boolean;
  /** Label in middle (for horizontal) */
  label?: string;
  /** Label position */
  labelPosition?: "start" | "center" | "end";
}

export const Separator = forwardRef<HTMLHRElement, SeparatorProps>(
  (
    {
      orientation = "horizontal",
      decorative = true,
      label,
      labelPosition = "center",
      className,
      ...props
    },
    ref
  ) => {
    if (label && orientation === "horizontal") {
      return (
        <div
          className={cn(
            "flex items-center gap-4",
            className
          )}
          role={decorative ? "none" : "separator"}
          aria-orientation={orientation}
          {...props}
        >
          <hr
            className={cn(
              "flex-1 border-0 h-px bg-[var(--color-border-primary)]",
              labelPosition === "start" && "w-1/4",
              labelPosition === "end" && "w-1/4"
            )}
            aria-hidden="true"
          />
          <span className={cn(
            "text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider whitespace-nowrap flex-shrink-0",
            labelPosition === "start" && "order-first",
            labelPosition === "end" && "order-last"
          )}>
            {label}
          </span>
          <hr
            className={cn(
              "flex-1 border-0 h-px bg-[var(--color-border-primary)]",
              labelPosition === "center" && "flex-1",
              labelPosition === "start" && "w-3/4",
              labelPosition === "end" && "w-3/4"
            )}
            aria-hidden="true"
          />
        </div>
      );
    }

    return (
      <hr
        ref={ref}
        className={cn(
          "border-0 bg-[var(--color-border-primary)]",
          orientation === "horizontal" ? "h-px w-full" : "w-px h-full",
          className
        )}
        role={decorative ? "none" : "separator"}
        aria-orientation={orientation}
        {...props}
      />
    );
  }
);

Separator.displayName = "Separator";

/**
 * Section divider with more visual weight
 */
export interface SectionDividerProps extends HTMLAttributes<HTMLDivElement> {
  /** Text to display */
  text?: string;
  /** Variant */
  variant?: "default" | "gradient" | "dots";
}

export function SectionDivider({ text, variant = "default", className, ...props }: SectionDividerProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "flex-1 h-px",
          variant === "default" && "bg-[var(--color-border-primary)]",
          variant === "gradient" && "bg-gradient-to-r from-transparent via-[var(--color-border-secondary)] to-transparent",
          variant === "dots" && "bg-[radial-gradient(circle_at_1px_1px,var(--color-border-primary)_1px,transparent_0)] bg-[size:8px_8px]"
        )}
      />
      {text && (
        <span className="text-sm font-medium text-[var(--color-text-muted)] uppercase tracking-wider flex-shrink-0 whitespace-nowrap">
          {text}
        </span>
      )}
      <div
        className={cn(
          "flex-1 h-px",
          variant === "default" && "bg-[var(--color-border-primary)]",
          variant === "gradient" && "bg-gradient-to-r from-transparent via-[var(--color-border-secondary)] to-transparent",
          variant === "dots" && "bg-[radial-gradient(circle_at_1px_1px,var(--color-border-primary)_1px,transparent_0)] bg-[size:8px_8px]"
        )}
      />
    </div>
  );
}