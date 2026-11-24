import { forwardRef, type HTMLAttributes } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../../lib/utils";
import { Container } from "./Container";

/**
 * Section component - semantic section wrapper
 */

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Vertical size */
  size?: "sm" | "md" | "lg";
  /** Background variant */
  background?: "none" | "secondary" | "gradient" | "mesh" | "glass";
  /** Container size */
  container?: "sm" | "md" | "lg" | "xl" | "2xl";
  /** Container padding */
  containerPadding?: "none" | "sm" | "md" | "lg";
  /** Content alignment */
  align?: "start" | "center" | "end";
  /** Full width (no container) */
  fullWidth?: boolean;
  /** ID for anchor links */
  id?: string;
}

const sizeStyles = {
  sm: "py-14 lg:py-20",
  md: "py-20 lg:py-28",
  lg: "py-24 lg:py-32",
} as const;

const backgroundStyles = {
  none: "",
  secondary: "bg-[var(--color-bg-secondary)]",
  gradient: "bg-gradient-radial",
  mesh: "bg-mesh relative",
  glass: "bg-[var(--glass-bg)] backdrop-blur-[20px]",
} as const;

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      size = "md",
      background = "none",
      container = "xl",
      containerPadding = "none",
      align = "start",
      fullWidth = false,
      id,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const reducedMotion = useReducedMotion();
    const revealProps = id === "hero" || reducedMotion
      ? { initial: false as const }
      : {
          initial: "hidden" as const,
          whileInView: "visible" as const,
          viewport: { once: true, amount: 0.08 },
          variants: {
            hidden: { opacity: 0, y: 14 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
            },
          },
        };

    const alignStyles = {
      start: "items-start text-left",
      center: "items-center text-center",
      end: "items-end text-right",
    } as const;

    const content = (
      <motion.div
        className={cn(
          "w-full flex flex-col",
          alignStyles[align]
        )}
        {...revealProps}
      >
        {children}
      </motion.div>
    );

    if (fullWidth) {
      return (
        <section
          ref={ref}
          id={id}
          className={cn(
            "relative w-full",
            sizeStyles[size],
            backgroundStyles[background],
            className
          )}
          {...props}
        >
          {content}
        </section>
      );
    }

    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          "relative w-full",
          sizeStyles[size],
          backgroundStyles[background],
          className
        )}
        {...props}
      >
        <motion.div className="relative z-10 w-full" {...revealProps}>
          <Container size={container} padding={containerPadding} center={false}>
            <motion.div className={cn("w-full flex flex-col", alignStyles[align])}>
              {children}
            </motion.div>
          </Container>
        </motion.div>
      </section>
    );
  }
);

Section.displayName = "Section";

/**
 * Section Header - standardized section title area
 */
export interface SectionHeaderProps {
  /** Section title */
  title: string;
  /** Section subtitle/description */
  subtitle?: string;
  /** Action element (link, button) */
  action?: React.ReactNode;
  /** Alignment */
  align?: "start" | "center" | "end";
  /** Divider below */
  divider?: boolean;
  /** Custom className */
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  action,
  align = "start",
  divider = false,
  className,
}: SectionHeaderProps) {
  const alignStyles = {
    start: "items-start text-left",
    center: "items-center text-center",
    end: "items-end text-right",
  } as const;

  return (
    <header className={cn("w-full mb-12 flex flex-col gap-3", alignStyles[align], className)}>
      <div className="flex flex-col gap-1">
        <h2 className="font-display font-bold text-[var(--color-text-primary)] tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="mt-2">{action}</div>}
      {divider && (
        <div className="w-full h-px bg-[var(--color-border-primary)] mt-4" aria-hidden="true" />
      )}
    </header>
  );
}

/**
 * Grid component for responsive layouts
 */
export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /** Columns at different breakpoints */
  cols?: {
    base?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  /** Gap */
  gap?: "sm" | "md" | "lg" | number;
  /** Auto-fit columns */
  autoFit?: boolean;
  /** Min column width (for autoFit) */
  minColWidth?: string;
  /** Alignment */
  align?: "start" | "center" | "end" | "stretch";
}

const gapStyles = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
} as const satisfies Record<"sm" | "md" | "lg", string>;

export function Grid({
  cols,
  gap = "md",
  autoFit = false,
  minColWidth = "280px",
  align = "stretch",
  className,
  children,
  ...props
}: GridProps) {
  const gapClass = typeof gap === "number" ? `gap-[${gap}px]` : gapStyles[gap];
  const colStyles = autoFit
    ? `grid-cols-[repeat(auto-fit,minmax(${minColWidth},1fr))]`
    : cols
    ? `grid-cols-1 ${cols.sm ? `sm:grid-cols-${cols.sm}` : ""} ${cols.md ? `md:grid-cols-${cols.md}` : ""} ${cols.lg ? `lg:grid-cols-${cols.lg}` : ""} ${cols.xl ? `xl:grid-cols-${cols.xl}` : ""}`
    : "grid-cols-1";

  const alignStyles = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
  } as const;

  return (
    <div
      className={cn(
        "grid",
        colStyles,
        gapClass,
        alignStyles[align],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Stack component - vertical/horizontal spacing
 */
export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  /** Direction */
  direction?: "vertical" | "horizontal";
  /** Gap */
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | number;
  /** Alignment (cross-axis) */
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  /** Justification (main-axis) */
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  /** Wrap */
  wrap?: boolean;
}

const gapValues = {
  none: "gap-0",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
} as const;

export function Stack({
  direction = "vertical",
  gap = "md",
  align = "stretch",
  justify = "start",
  wrap = false,
  className,
  children,
  ...props
}: StackProps) {
  const isNumber = typeof gap === "number";
  const gapClass = isNumber ? `gap-[${gap}px]` : gapValues[gap];

  const directionClass = direction === "vertical" ? "flex-col" : "flex-row";
  const wrapClass = wrap ? "flex-wrap" : "flex-nowrap";

  const alignStyles = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
    baseline: "items-baseline",
  } as const;

  const justifyStyles = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
  } as const;

  return (
    <div
      className={cn(
        "flex",
        directionClass,
        wrapClass,
        gapClass,
        alignStyles[align],
        justifyStyles[justify],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
