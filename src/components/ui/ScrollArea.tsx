import { forwardRef, useRef, useEffect, type HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

/**
 * ScrollArea component - custom styled scrollbar
 * Following design system specifications
 */

export interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  /** Scroll direction */
  direction?: "vertical" | "horizontal" | "both";
  /** Hide scrollbar */
  hideScrollbar?: boolean;
  /** Custom scrollbar styling */
  customScrollbar?: boolean;
  /** Scroll container className */
  scrollContainerClassName?: string;
}

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  (
    {
      direction = "vertical",
      hideScrollbar = false,
      customScrollbar = true,
      scrollContainerClassName,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Sync scroll position for horizontal scroll with mouse wheel
    useEffect(() => {
      const element = scrollRef.current;
      if (!element || direction !== "horizontal") return;

      const handleWheel = (e: WheelEvent) => {
        if (e.deltaY !== 0 && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault();
          element.scrollLeft += e.deltaY;
        }
      };

      element.addEventListener("wheel", handleWheel, { passive: false });
      return () => element.removeEventListener("wheel", handleWheel);
    }, [direction]);

    const scrollbarStyles = hideScrollbar
      ? "scrollbar-hide"
      : customScrollbar
      ? "scrollbar-thin scrollbar-track-[var(--color-bg-primary)] scrollbar-thumb-[var(--color-border-secondary)] hover:scrollbar-thumb-[var(--color-text-muted)]"
      : "";

    const directionStyles = {
      vertical: "overflow-y-auto overflow-x-hidden",
      horizontal: "overflow-x-auto overflow-y-hidden",
      both: "overflow-auto",
    } as const;

    return (
      <div
        ref={ref}
        className={cn(
          "relative",
          directionStyles[direction],
          scrollbarStyles,
          className
        )}
        {...props}
      >
        <div
          ref={scrollRef}
          className={cn(
            "min-h-0 min-w-0", // Prevent flex overflow issues
            scrollContainerClassName
          )}
        >
          {children}
        </div>
      </div>
    );
  }
);

ScrollArea.displayName = "ScrollArea";

/**
 * ScrollArea with viewport and scrollbar components (more advanced)
 */
export interface ScrollAreaViewportProps extends HTMLAttributes<HTMLDivElement> {}

export const ScrollAreaViewport = forwardRef<HTMLDivElement, ScrollAreaViewportProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("h-full w-full", className)} {...props}>
        {children}
      </div>
    );
  }
);

ScrollAreaViewport.displayName = "ScrollAreaViewport";

/**
 * ScrollBar component (for custom scrollbar)
 */
export interface ScrollBarProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: "vertical" | "horizontal";
  thumbClassName?: string;
  trackClassName?: string;
}

export function ScrollBar({
  orientation = "vertical",
  thumbClassName,
  trackClassName,
  className,
  ...props
}: ScrollBarProps) {
  return (
    <div
      className={cn(
        "flex touch-none select-none transition-opacity",
        orientation === "vertical" ? "w-2 h-full" : "h-2 w-full",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "relative flex-1 rounded-full bg-[var(--color-bg-primary)]",
          trackClassName
        )}
      >
        <div
          className={cn(
            "absolute rounded-full bg-[var(--color-border-secondary)] hover:bg-[var(--color-text-muted)] transition-colors",
            orientation === "vertical"
              ? "w-full left-0"
              : "h-full bottom-0"
          )}
          style={{
            // These would be controlled by JS for actual scroll position
          }}
        />
      </div>
    </div>
  );
}

/**
 * ScrollAreaCorner - fills the corner where vertical/horizontal scrollbars meet
 */
export const ScrollAreaCorner = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("bg-[var(--color-bg-primary)]", className)}
        {...props}
      />
    );
  }
);

ScrollAreaCorner.displayName = "ScrollAreaCorner";