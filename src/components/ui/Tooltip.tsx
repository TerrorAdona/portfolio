import { useState, useRef, useEffect, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/utils";

/**
 * Tooltip component following design system specifications
 */

export interface TooltipProps {
  /** Tooltip content */
  content: ReactNode;
  /** Trigger element */
  children: ReactNode;
  /** Position */
  position?: "top" | "bottom" | "left" | "right";
  /** Delay show (ms) */
  delay?: number;
  /** Offset from trigger */
  offset?: number;
  /** Open state (controlled) */
  open?: boolean;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Open change handler */
  onOpenChange?: (open: boolean) => void;
}

const positionStyles = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
} as const;

const arrowStyles = {
  top: "top-full left-1/2 -translate-x-1/2 border-t-[var(--color-border-primary)]",
  bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-[var(--color-border-primary)]",
  left: "right-full top-1/2 -translate-y-1/2 border-l-[var(--color-border-primary)]",
  right: "left-full top-1/2 -translate-y-1/2 border-r-[var(--color-border-primary)]",
} as const;

export function Tooltip({
  content,
  children,
  position = "top",
  delay = 200,
  offset = 8,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
}: TooltipProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const triggerRef = useRef<HTMLElement>(null);
  const isControlled = controlledOpen !== undefined;

  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setUncontrolledOpen(true);
      onOpenChange?.(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setUncontrolledOpen(false);
    onOpenChange?.(false);
  };

  const handleMouseEnter = () => {
    if (!isControlled) showTooltip();
  };

  const handleMouseLeave = () => {
    if (!isControlled) hideTooltip();
  };

  const handleFocus = () => {
    if (!isControlled) showTooltip();
  };

  const handleBlur = () => {
    if (!isControlled) hideTooltip();
  };

  // Animate in/out
  useEffect(() => {
    if (open) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [open]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Clone child to add event handlers
  const child = React.Children.only(children);
  const childProps = child.props as HTMLAttributes<HTMLElement>;

  const enhancedChild = React.cloneElement(child, {
    ref: triggerRef,
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      childProps.onMouseEnter?.(e);
      handleMouseEnter();
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      childProps.onMouseLeave?.(e);
      handleMouseLeave();
    },
    onFocus: (e: React.FocusEvent<HTMLElement>) => {
      childProps.onFocus?.(e);
      handleFocus();
    },
    onBlur: (e: React.FocusEvent<HTMLElement>) => {
      childProps.onBlur?.(e);
      handleBlur();
    },
    "aria-describedby": open ? "tooltip-content" : undefined,
  });

  if (!open && !isVisible) return <>{enhancedChild}</>;

  return (
    <div className="relative inline-flex" role="tooltip">
      {enhancedChild}
      <div
        id="tooltip-content"
        className={cn(
          "absolute z-[700] px-3 py-2 text-sm text-[var(--color-text-primary)]",
          "bg-[var(--color-bg-tertiary)] border border-[var(--color-border-primary)] rounded-sm shadow-[var(--shadow-lg)]",
          "whitespace-nowrap pointer-events-none",
          "transition-opacity duration-120 ease-out",
          positionStyles[position],
          isVisible ? "opacity-100 translate-y-0" : "opacity-0"
        )}
        style={{
          transformOrigin: position === "top" ? "bottom" : position === "bottom" ? "top" : position === "left" ? "right" : "left",
        }}
      >
        {content}
        <div
          className={cn(
            "absolute w-0 h-0 border-4 border-transparent",
            arrowStyles[position]
          )}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

/**
 * Tooltip Trigger - for more complex trigger scenarios
 */
export interface TooltipTriggerProps extends HTMLAttributes<HTMLDivElement> {
  /** Tooltip content */
  content: ReactNode;
  /** Position */
  position?: "top" | "bottom" | "left" | "right";
  /** Delay */
  delay?: number;
  /** Children (trigger content) */
  children: ReactNode;
}

export function TooltipTrigger({
  content,
  position = "top",
  delay = 200,
  children,
  className,
  ...props
}: TooltipTriggerProps) {
  return (
    <Tooltip content={content} position={position} delay={delay} className={cn("inline-flex", className)} {...props}>
      {children}
    </Tooltip>
  );
}