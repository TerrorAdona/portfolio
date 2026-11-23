/**
 * Design System Type Definitions
 * Shared types for UI components, variants, and props
 */

import type { ReactNode, HTMLAttributes, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

// ============================================================
// BASE TYPES
// ============================================================

/** Standard component sizes */
export type Size = "sm" | "md" | "lg";

/** Semantic color variants */
export type Variant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive"
  | "success"
  | "warning"
  | "info";

/** Component-specific variants */
export type ButtonVariant = Variant;
export type CardVariant = "default" | "elevated" | "glass" | "interactive";
export type BadgeVariant = "default" | "accent" | "success" | "warning" | "error" | "outline";
export type InputVariant = "default" | "error" | "success";

/** Padding densities */
export type Padding = "none" | "sm" | "md" | "lg";

/** Border radius options */
export type Radius = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";

// ============================================================
// BUTTON
// ============================================================

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
  /** Button variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: Size;
  /** Show loading spinner */
  loading?: boolean;
  /** Left icon */
  leftIcon?: ReactNode;
  /** Right icon */
  rightIcon?: ReactNode;
  /** Full width */
  fullWidth?: boolean;
  /** Render as anchor tag */
  asAnchor?: boolean;
  /** Anchor href (when asAnchor=true) */
  href?: string;
  /** External link */
  external?: boolean;
}

export interface ButtonGroupProps {
  children: ReactNode;
  /** Group variant */
  variant?: ButtonVariant;
  /** Group size */
  size?: Size;
  /** Vertical stacking */
  vertical?: boolean;
}

// ============================================================
// CARD
// ============================================================

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Card variant */
  variant?: CardVariant;
  /** Internal padding */
  padding?: Padding;
  /** Border radius */
  radius?: Radius;
  /** Hover effect */
  hoverable?: boolean;
  /** Click handler (makes card interactive) */
  onClick?: () => void;
  /** ARIA label for interactive cards */
  ariaLabel?: string;
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Title */
  title?: string;
  /** Subtitle */
  subtitle?: string;
  /** Action element (button, link) */
  action?: ReactNode;
  /** Avatar */
  avatar?: ReactNode;
}

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  /** Divider above footer */
  divider?: boolean;
  /** Align content */
  align?: "start" | "center" | "end" | "between";
}

// ============================================================
// BADGE / TAG
// ============================================================

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Badge variant */
  variant?: BadgeVariant;
  /** Badge size */
  size?: Size;
  /** Removable badge */
  removable?: boolean;
  /** Remove handler */
  onRemove?: () => void;
  /** Icon before text */
  icon?: ReactNode;
  /** Dot indicator (for status) */
  dot?: boolean;
  /** Dot color */
  dotColor?: "success" | "warning" | "error" | "info";
}

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
}

// ============================================================
// INPUT
// ============================================================

export interface InputProps
  extends Omit<HTMLAttributes<HTMLInputElement>, "size"> {
  /** Label text */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Input variant */
  variant?: InputVariant;
  /** Input size */
  size?: Size;
  /** Left adornment */
  leftElement?: ReactNode;
  /** Right adornment */
  rightElement?: ReactNode;
  /** Full width */
  fullWidth?: boolean;
}

export interface TextareaProps
  extends Omit<HTMLAttributes<HTMLTextAreaElement>, "size"> {
  label?: string;
  helperText?: string;
  error?: string;
  variant?: InputVariant;
  size?: Size;
  rows?: number;
  fullWidth?: boolean;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: ReactNode;
}

export interface SelectProps
  extends Omit<HTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  helperText?: string;
  error?: string;
  variant?: InputVariant;
  size?: Size;
  options: SelectOption[];
  placeholder?: string;
  fullWidth?: boolean;
  multiple?: boolean;
}

// ============================================================
// MODAL / DIALOG
// ============================================================

export interface ModalProps {
  /** Open state */
  open: boolean;
  /** Close handler */
  onClose: () => void;
  /** Modal title */
  title?: string;
  /** Modal description */
  description?: string;
  /** Modal content */
  children: ReactNode;
  /** Size */
  size?: "sm" | "md" | "lg" | "xl" | "full";
  /** Show close button */
  showClose?: boolean;
  /** Close on overlay click */
  closeOnOverlayClick?: boolean;
  /** Close on Escape */
  closeOnEscape?: boolean;
  /** Prevent body scroll */
  preventScroll?: boolean;
}

export interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "destructive" | "primary";
  loading?: boolean;
}

// ============================================================
// TOOLTIP
// ============================================================

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
}

// ============================================================
// DROPDOWN / POPOVER
// ============================================================

export interface DropdownItem {
  label: string;
  onClick: () => void;
  icon?: ReactNode;
  disabled?: boolean;
  dangerous?: boolean;
  divider?: boolean;
  shortcut?: string;
}

export interface DropdownProps {
  /** Trigger button */
  trigger: ReactNode;
  /** Menu items */
  items: DropdownItem[];
  /** Alignment */
  align?: "start" | "end";
  /** Offset */
  offset?: number;
}

export interface PopoverProps {
  trigger: ReactNode;
  content: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  offset?: number;
}

// ============================================================
// TOAST / NOTIFICATION
// ============================================================

export type ToastType = "success" | "error" | "warning" | "info" | "default";

export interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
  onClose: (id: string) => void;
}

export interface ToastOptions {
  type?: ToastType;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
}

// ============================================================
// AVATAR
// ============================================================

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  /** Image source */
  src?: string;
  /** Fallback text (initials) */
  fallback?: string;
  /** Size */
  size?: Size | "xl" | "2xl";
  /** Shape */
  shape?: "circle" | "square";
  /** Status indicator */
  status?: "online" | "offline" | "busy" | "away";
  /** Status position */
  statusPosition?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}

// ============================================================
// SEPARATOR
// ============================================================

export interface SeparatorProps extends HTMLAttributes<HTMLHRElement> {
  /** Orientation */
  orientation?: "horizontal" | "vertical";
  /** Decorative */
  decorative?: boolean;
  /** Label in middle */
  label?: string;
}

// ============================================================
// SCROLL AREA
// ============================================================

export interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  /** Scroll direction */
  direction?: "vertical" | "horizontal" | "both";
  /** Hide scrollbar */
  hideScrollbar?: boolean;
  /** Custom scrollbar */
  customScrollbar?: boolean;
}

// ============================================================
// TABS
// ============================================================

export interface TabItem {
  value: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  badge?: string | number;
}

export interface TabsProps {
  items: TabItem[];
  activeTab: string;
  onChange: (value: string) => void;
  variant?: "line" | "enclosed" | "soft";
  orientation?: "horizontal" | "vertical";
  fullWidth?: boolean;
}

// ============================================================
// ACCORDION
// ============================================================

export interface AccordionItem {
  value: string;
  title: string;
  content: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;
  variant?: "bordered" | "separated" | "ghost";
}

// ============================================================
// LAYOUT COMPONENTS
// ============================================================

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Max width */
  size?: Container;
  /** Padding */
  padding?: Padding;
}

export interface SectionProps extends HTMLAttributes<HTMLSectionElement> {
  /** Vertical size */
  size?: "sm" | "md" | "lg";
  /** Background variant */
  background?: "none" | "secondary" | "gradient" | "mesh";
  /** Container size */
  container?: Container;
}

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
  gap?: Size | number;
  /** Auto-fit columns */
  autoFit?: boolean;
  /** Min column width */
  minColWidth?: string;
}

// ============================================================
// ICON WRAPPER
// ============================================================

export interface IconProps extends HTMLAttributes<SVGSVGElement> {
  /** Icon size */
  size?: IconSize;
  /** Color variant */
  color?: "primary" | "secondary" | "muted" | "accent" | "inherit";
  /** Animated */
  animated?: boolean;
  /** Animation type */
  animation?: "spin" | "pulse" | "bounce" | "shake";
}

// ============================================================
// IMAGE
// ============================================================

export interface ImageProps extends Omit<HTMLAttributes<HTMLImageElement>, "src"> {
  src: string;
  /** Alt text */
  alt: string;
  /** Width */
  width?: number;
  /** Height */
  height?: number;
  /** Priority loading */
  priority?: boolean;
  /** Placeholder */
  placeholder?: "blur" | "color" | "none";
  /** Blur data URL */
  blurDataURL?: string;
  /** Object fit */
  fit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  /** Border radius */
  radius?: Radius;
}

// ============================================================
// UTILITY TYPES
// ============================================================

/** Extract props from component */
export type ComponentProps<T> = T extends React.ComponentType<infer P> ? P : never;

/** Props without specific keys */
export type Without<T, K extends keyof T> = Omit<T, K>;

/** Props with required keys */
export type WithRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;

/** HTML element props with className and style */
export type HTMLProps<T extends HTMLElement> = HTMLAttributes<T> & {
  className?: string;
  style?: React.CSSProperties;
};

// ============================================================
// RE-EXPORTS
// ============================================================

export type {
  IconSize,
  AvatarSize,
  ButtonSize,
  CardPadding,
  BadgeSize,
  Container,
  Breakpoint,
  Transition,
  ZIndex,
  SkillCategory,
  ProjectStatus,
  ContactField,
} from "../lib/constants";