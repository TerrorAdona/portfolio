import { forwardRef, type HTMLAttributes, type useState, type useRef } from "react";
import { cn } from "../../lib/utils";

/**
 * Badge/Tag component following design system specifications
 */

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Badge variant */
  variant?: "default" | "accent" | "success" | "warning" | "error" | "outline";
  /** Badge size */
  size?: "sm" | "md" | "lg";
  /** Removable badge */
  removable?: boolean;
  /** Remove handler */
  onRemove?: () => void;
  /** Icon before text */
  icon?: React.ReactNode;
  /** Dot indicator (for status) */
  dot?: boolean;
  /** Dot color */
  dotColor?: "success" | "warning" | "error" | "info";
  /** Disable animations */
  noAnimation?: boolean;
}

const variantStyles = {
  default:
    "bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] border border-[var(--color-border-primary)]",
  accent:
    "bg-[var(--color-accent-primary)]/15 text-[var(--color-accent-primary)] border border-[var(--color-accent-primary)]/30",
  success:
    "bg-[var(--color-success)]/15 text-[var(--color-success)] border border-[var(--color-success)]/30",
  warning:
    "bg-[var(--color-warning)]/15 text-[var(--color-warning)] border border-[var(--color-warning)]/30",
  error:
    "bg-[var(--color-error)]/15 text-[var(--color-error)] border border-[var(--color-error)]/30",
  outline:
    "bg-transparent text-[var(--color-text-secondary)] border border-[var(--color-border-secondary)]",
} as const;

const sizeStyles = {
  sm: "px-2 py-0.5 text-xs rounded-xs",
  md: "px-3 py-1 text-sm rounded-sm",
  lg: "px-4 py-1.5 text-base rounded-md",
} as const;

const baseStyles = "inline-flex items-center gap-1.5 font-medium whitespace-nowrap transition-all duration-120 ease-out";

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = "default",
      size = "md",
      removable = false,
      onRemove,
      icon,
      dot,
      dotColor = "success",
      noAnimation = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const dotColors = {
      success: "bg-[var(--color-success)]",
      warning: "bg-[var(--color-warning)]",
      error: "bg-[var(--color-error)]",
      info: "bg-[var(--color-info)]",
    } as const;

    return (
      <span
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          noAnimation && "transition-none",
          className
        )}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full flex-shrink-0",
              dotColors[dotColor]
            )}
            aria-hidden="true"
          />
        )}
        {icon && <span aria-hidden="true">{icon}</span>}
        {children}
        {removable && onRemove && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className={cn(
              "ml-1 flex items-center justify-center rounded-full transition-colors",
              "hover:bg-black/10 hover:text-[var(--color-text-primary)]",
              size === "sm" && "w-4 h-4",
              size === "md" && "w-5 h-5",
              size === "lg" && "w-6 h-6"
            )}
            aria-label="Supprimer"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </span>
    );
  }
);

Badge.displayName = "Badge";

/**
 * Tag Input - for editable tag lists
 */
export interface TagInputProps {
  /** Current tags */
  tags: string[];
  /** Tag change handler */
  onChange: (tags: string[]) => void;
  /** Max tags */
  maxTags?: number;
  /** Placeholder */
  placeholder?: string;
  /** Allowed tags (autocomplete) */
  allowedTags?: string[];
  /** Disabled */
  disabled?: boolean;
  /** Variant for tags */
  variant?: BadgeProps["variant"];
  /** Size for tags */
  size?: BadgeProps["size"];
  /** Label */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Error message */
  error?: string;
}

export function TagInput({
  tags,
  onChange,
  maxTags = 10,
  placeholder = "Ajouter un tag...",
  allowedTags = [],
  disabled = false,
  variant = "default",
  size = "md",
  label,
  helperText,
  error,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredSuggestions = allowedTags.filter(
    (tag) =>
      !tags.includes(tag) &&
      tag.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleAddTag = (tag: string) => {
    const trimmed = tag.trim();
    if (!trimmed) return;
    if (tags.includes(trimmed)) return;
    if (tags.length >= maxTags) return;
    onChange([...tags, trimmed]);
    setInputValue("");
    setShowSuggestions(false);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChange(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddTag(inputValue);
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      handleRemoveTag(tags[tags.length - 1]);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  const handleFocus = () => {
    if (inputValue || allowedTags.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">
          {label}
        </label>
      )}
      <div
        className={cn(
          "flex flex-wrap gap-2 p-3 bg-[var(--color-bg-tertiary)] border rounded-md transition-all",
          "focus-within:border-[var(--color-border-focus)] focus-within:shadow-[var(--shadow-focus)]",
          error && "border-[var(--color-error)]",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onClick={() => !disabled && inputRef.current?.focus()}
      >
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant={variant}
            size={size}
            removable
            onRemove={() => handleRemoveTag(tag)}
            className="flex-shrink-0"
          >
            {tag}
          </Badge>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowSuggestions(true);
          }}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={tags.length === 0 ? placeholder : ""}
          disabled={disabled || tags.length >= maxTags}
          className={cn(
            "flex-1 min-w-[120px] bg-transparent border-none outline-none text-[var(--color-text-primary)]",
            "placeholder:text-[var(--color-text-muted)]",
            "text-sm",
            disabled && "cursor-not-allowed"
          )}
          aria-label={label || "Tags"}
          aria-invalid={!!error}
          aria-describedby={error ? "tag-error" : helperText ? "tag-helper" : undefined}
        />
      </div>
      {showSuggestions && filteredSuggestions.length > 0 && !disabled && (
        <div className="mt-2 absolute z-10 w-full max-h-40 overflow-auto bg-[var(--color-bg-tertiary)] border border-[var(--color-border-primary)] rounded-md shadow-[var(--shadow-lg)]">
          {filteredSuggestions.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleAddTag(tag)}
              className="w-full px-3 py-2 text-left text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      )}
      {helperText && !error && (
        <p id="tag-helper" className="mt-1 text-xs text-[var(--color-text-muted)]">
          {helperText}
        </p>
      )}
      {error && (
        <p id="tag-error" className="mt-1 text-xs text-[var(--color-error)]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}