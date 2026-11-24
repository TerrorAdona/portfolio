import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

/**
 * Avatar component following design system specifications
 */

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  /** Image source */
  src?: string;
  /** Fallback text (initials) */
  fallback?: string;
  /** Size */
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  /** Shape */
  shape?: "circle" | "square";
  /** Status indicator */
  status?: "online" | "offline" | "busy" | "away";
  /** Status position */
  statusPosition?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  /** Alt text for image */
  alt?: string;
}

const sizeStyles = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-14 h-14 text-base",
  xl: "w-20 h-20 text-lg",
  "2xl": "w-32 h-32 text-xl",
} as const;

const statusStyles = {
  online: "bg-[var(--color-success)]",
  offline: "bg-[var(--color-text-muted)]",
  busy: "bg-[var(--color-error)]",
  away: "bg-[var(--color-warning)]",
} as const;

const statusPositions = {
  "bottom-right": "bottom-0 right-0",
  "bottom-left": "bottom-0 left-0",
  "top-right": "top-0 right-0",
  "top-left": "top-0 left-0",
} as const;

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      fallback,
      size = "md",
      shape = "circle",
      status,
      statusPosition = "bottom-right",
      alt,
      className,
      ...props
    },
    ref
  ) => {
    const radiusClass = shape === "circle" ? "rounded-full" : "rounded-lg";
    const statusDot = status && (
      <span
        className={cn(
          "absolute w-3 h-3 rounded-full border-2 border-[var(--color-bg-primary)]",
          statusStyles[status],
          statusPositions[statusPosition]
        )}
        aria-label={`Statut : ${status}`}
      />
    );

    const getInitials = (name: string) => {
      return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    };

    const initials = fallback || (src ? undefined : "?");

    return (
      <div
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center overflow-hidden bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] font-semibold select-none",
          sizeStyles[size],
          radiusClass,
          className
        )}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt || fallback || "Avatar"}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : initials ? (
          <span>{getInitials(initials)}</span>
        ) : (
          <svg
            className="w-1/2 h-1/2 text-[var(--color-text-muted)]"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )}
        {statusDot}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

/**
 * Avatar Group - for stacking multiple avatars
 */
export interface AvatarGroupProps {
  /** Avatars to display */
  children: React.ReactNode;
  /** Max avatars to show before +N */
  max?: number;
  /** Size for all avatars */
  size?: AvatarProps["size"];
  /** Spacing between avatars */
  spacing?: "none" | "sm" | "md";
  /** ClassName */
  className?: string;
}

export function AvatarGroup({
  children,
  max = 5,
  size = "md",
  spacing = "sm",
  className,
}: AvatarGroupProps) {
  const avatars = React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement[];
  const visibleAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  const spacingStyles = {
    none: "space-x-0",
    sm: "-space-x-2",
    md: "-space-x-3",
  } as const;

  return (
    <div className={cn("flex items-center", spacingStyles[spacing], className)} aria-label="Groupe d'avatars">
      {visibleAvatars.map((avatar, index) => (
        <span
          key={avatar.key || index}
          className={cn(
            "relative z-[auto] ring-2 ring-[var(--color-bg-primary)]",
            index > 0 && "ring-2 ring-[var(--color-bg-primary)]"
          )}
        >
          {React.cloneElement(avatar as React.ReactElement<AvatarProps>, { size })}
        </span>
      ))}
      {remainingCount > 0 && (
        <span
          className={cn(
            "flex items-center justify-center bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] font-medium border-2 border-[var(--color-bg-primary)]",
            sizeStyles[size],
            "rounded-full"
          )}
          aria-label={`${remainingCount} autres personnes`}
        >
          +{remainingCount}
        </span>
      )}
    </div>
  );
}