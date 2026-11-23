import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

/**
 * Layout components following design system specifications
 */

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Max width */
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  /** Padding */
  padding?: "none" | "sm" | "md" | "lg";
  /** Center content */
  center?: boolean;
}

const sizeStyles = {
  sm: "max-w-[640px]",
  md: "max-w-[768px]",
  lg: "max-w-[1024px]",
  xl: "max-w-[1280px]",
  "2xl": "max-w-[1440px]",
} as const;

const paddingStyles = {
  none: "px-0",
  sm: "px-4",
  md: "px-6 lg:px-8",
  lg: "px-8 lg:px-12 xl:px-16",
} as const;

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ size = "xl", padding = "md", center = true, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto w-full",
          sizeStyles[size],
          paddingStyles[padding],
          center && "flex flex-col items-center",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";