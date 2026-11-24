/**
 * Animation Utilities & Framer Motion Variants
 * Centralized animation definitions for consistent motion design
 * Respects prefers-reduced-motion
 */

import { type Variants } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

/**
 * Check if reduced motion is preferred (client-side)
 */
export function getReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Safe animation variants that respect reduced motion
 */
export function createSafeVariants<T extends Variants>(
  variants: T,
  reducedVariants?: T
): T {
  if (getReducedMotion()) {
    return (reducedVariants ?? {}) as T;
  }
  return variants;
}

/**
 * Hook to get motion-safe variants
 */
export function useMotionVariants<T extends Variants>(
  variants: T,
  reducedVariants?: T
): T {
  const reducedMotion = useReducedMotion();
  if (reducedMotion) {
    return (reducedVariants || {}) as T;
  }
  return variants;
}

// ============================================================
// ENTRANCE ANIMATIONS
// ============================================================

/**
 * Fade in from bottom - for section content
 */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

/**
 * Fade in from top - for headers/navigation
 */
export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

/**
 * Fade in from left - for side content
 */
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

/**
 * Fade in from right - for sidebars
 */
export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

/**
 * Scale in - for cards, modals
 */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.34, 1.56, 0.64, 1] as const,
    },
  },
};

/**
 * Staggered container for children
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

/**
 * Staggered item
 */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

// ============================================================
// SCROLL REVEAL ANIMATIONS
// ============================================================

/**
 * Scroll reveal variants - use with useScroll hook
 */
export const scrollReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

/**
 * Scroll reveal with scale
 */
export const scrollRevealScale: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1] as const,
    },
  },
};

/**
 * Scroll reveal from left
 */
export const scrollRevealLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

/**
 * Scroll reveal from right
 */
export const scrollRevealRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

// ============================================================
// HOVER & INTERACTION ANIMATIONS
// ============================================================

/**
 * Card hover - subtle lift and glow
 */
export const cardHover = {
  whileHover: {
    y: -6,
    boxShadow: "0 20px 40px -10px rgba(139, 92, 246, 0.15), 0 10px 20px -5px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
  whileTap: {
    scale: 0.99,
    transition: { duration: 0.1 },
  },
};

/**
 * Button hover - scale and glow
 */
export const buttonHover = {
  whileHover: {
    scale: 1.02,
    boxShadow: "0 10px 30px -5px rgba(139, 92, 246, 0.3)",
    transition: { duration: 0.2, ease: "easeOut" },
  },
  whileTap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

/**
 * Link hover - subtle underline animation
 */
export const linkHover = {
  whileHover: {
    x: 4,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

/**
 * Image hover - subtle zoom
 */
export const imageHover = {
  whileHover: {
    scale: 1.03,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

/**
 * Social icon hover - bounce and scale
 */
export const iconHover = {
  whileHover: {
    scale: 1.15,
    rotate: 6,
    transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] as const },
  },
  whileTap: {
    scale: 0.9,
    transition: { duration: 0.1 },
  },
};

/**
 * Badge hover - subtle scale
 */
export const badgeHover = {
  whileHover: {
    scale: 1.05,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

// ============================================================
// BUTTON ANIMATIONS
// ============================================================

/**
 * Primary button variants
 */
export const primaryButtonVariants: Variants = {
  initial: { opacity: 1 },
  hover: {
    scale: 1.02,
    boxShadow: "0 10px 30px -5px rgba(139, 92, 246, 0.4)",
    transition: { duration: 0.2, ease: "easeOut" },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
  loading: {
    opacity: 0.8,
    transition: { duration: 0.2 },
  },
};

/**
 * Ghost/Outline button variants
 */
export const ghostButtonVariants: Variants = {
  initial: { opacity: 1 },
  hover: {
    backgroundColor: "rgba(139, 92, 246, 0.1)",
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

/**
 * Loading spinner
 */
export const spinnerVariants: Variants = {
  initial: { opacity: 0, rotate: 0 },
  animate: {
    opacity: 1,
    rotate: 360,
    transition: { duration: 0.6, ease: "linear", repeat: Infinity },
  },
  exit: { opacity: 0, rotate: -180, transition: { duration: 0.2 } },
};

// ============================================================
// PAGE TRANSITIONS
// ============================================================

/**
 * Page fade in/out
 */
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.18, ease: [0.4, 0, 1, 1] as const },
  },
};

/**
 * Slide page transition
 */
export const slidePageVariants: Variants = {
  initial: { opacity: 0, x: 50 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const },
  },
  exit: {
    opacity: 0,
    x: -50,
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] as const },
  },
};

/**
 * Route transition with AnimatePresence
 */
export const routeTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] as const },
};

// ============================================================
// FILTER TRANSITIONS
// ============================================================

/**
 * Filter button variants
 */
export const filterButtonVariants: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] as const },
  },
  active: {
    backgroundColor: "var(--color-accent-primary)",
    color: "white",
    boxShadow: "0 4px 20px -5px rgba(139, 92, 246, 0.4)",
    transition: { duration: 0.2 },
  },
};

/**
 * Grid layout animation for filtered items
 */
export const layoutVariants: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

// ============================================================
// NAVIGATION ANIMATIONS
// ============================================================

/**
 * Nav link hover
 */
export const navLinkVariants: Variants = {
  initial: { opacity: 0, y: -10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const },
  },
  hover: {
    color: "var(--color-accent-primary)",
    x: 4,
    transition: { duration: 0.2 },
  },
};

/**
 * Mobile menu slide
 */
export const mobileMenuVariants: Variants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  open: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const },
  },
};

/**
 * Logo animation
 */
export const logoVariants: Variants = {
  initial: { opacity: 0, scale: 0.8, rotate: -5 },
  animate: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] as const },
  },
  hover: {
    scale: 1.05,
    rotate: 2,
    transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] as const },
  },
};

// ============================================================
// DECORATIVE ANIMATIONS
// ============================================================

/**
 * Floating animation for decorative elements
 */
export const floatVariants: Variants = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/**
 * Pulse glow for accent elements
 */
export const pulseGlowVariants: Variants = {
  animate: {
    boxShadow: [
      "0 0 20px -5px rgba(139, 92, 246, 0.15)",
      "0 0 40px -5px rgba(139, 92, 246, 0.3)",
      "0 0 20px -5px rgba(139, 92, 246, 0.15)",
    ],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
};

/**
 * Rotate animation
 */
export const rotateVariants: Variants = {
  animate: {
    rotate: 360,
    transition: { duration: 20, repeat: Infinity, ease: "linear" },
  },
};

/**
 * Shimmer effect for loading states
 */
export const shimmerVariants: Variants = {
  animate: {
    backgroundPosition: ["-200% 0", "200% 0"],
    transition: { duration: 1.5, repeat: Infinity, ease: "linear" },
  },
};

/**
 * Wave animation for decorative lines
 */
export const waveVariants: Variants = {
  animate: {
    pathLength: [0, 1, 0],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
};

// ============================================================
// TYPOGRAPHY ANIMATIONS
// ============================================================

/**
 * Text reveal - character by character
 */
export const textRevealVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
};

/**
 * Character reveal
 */
export const charVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

/**
 * Word reveal
 */
export const wordVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

/**
 * Line reveal - for multi-line text
 */
export const lineRevealVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

// ============================================================
// SCROLL PROGRESS & PARALLAX
// ============================================================

/**
 * Parallax variants - use with useTransform
 */
export const parallaxVariants = {
  slow: { y: [0, -100] },
  medium: { y: [0, -200] },
  fast: { y: [0, -300] },
};

/**
 * Scroll progress indicator
 */
export const progressBarVariants: Variants = {
  initial: { scaleX: 0, opacity: 0 },
  animate: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

/**
 * Back to top button
 */
export const backToTopVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] as const },
  },
  hover: {
    scale: 1.1,
    rotate: 180,
    transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] as const },
  },
};

// ============================================================
// CUSTOM CURSOR
// ============================================================

/**
 * Custom cursor variants
 */
export const cursorVariants: Variants = {
  initial: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  hover: {
    scale: 2,
    borderColor: "var(--color-accent-primary)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
  click: {
    scale: 0.8,
    transition: { duration: 0.1 },
  },
};

/**
 * Cursor follower
 */
export const cursorFollowerVariants: Variants = {
  initial: { opacity: 0, scale: 0.3 },
  visible: {
    opacity: 0.5,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  hover: {
    scale: 1.5,
    backgroundColor: "var(--color-accent-primary)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// ============================================================
// TOAST & NOTIFICATION ANIMATIONS
// ============================================================

/**
 * Toast variants
 */
export const toastVariants: Variants = {
  initial: { opacity: 0, x: 50, scale: 0.9 },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] as const },
  },
  exit: {
    opacity: 0,
    x: -50,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

/**
 * Modal/Dialog variants
 */
export const modalVariants: Variants = {
  initial: { opacity: 0, scale: 0.9, y: 20 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] as const },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -20,
    transition: { duration: 0.2 },
  },
};

// ============================================================
// REDUCED MOTION FALLBACKS
// ============================================================

/**
 * Reduced motion variants - minimal/no animation
 */
export const reducedMotionVariants = {
  // Entrance
  fadeInUp: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0 } } },
  fadeInDown: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0 } } },
  fadeInLeft: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0 } } },
  fadeInRight: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0 } } },
  scaleIn: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0 } } },
  staggerContainer: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  staggerItem: { hidden: { opacity: 0 }, visible: { opacity: 1 } },

  // Scroll
  scrollReveal: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  scrollRevealScale: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  scrollRevealLeft: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  scrollRevealRight: { hidden: { opacity: 0 }, visible: { opacity: 1 } },

  // Hover
  cardHover: {},
  buttonHover: {},
  linkHover: {},
  imageHover: {},
  iconHover: {},
  badgeHover: {},

  // Buttons
  primaryButtonVariants: { initial: {}, hover: {}, tap: {} },
  ghostButtonVariants: { initial: {}, hover: {}, tap: {} },

  // Pages
  pageVariants: { initial: {}, animate: {}, exit: {} },
  slidePageVariants: { initial: {}, animate: {}, exit: {} },
  routeTransition: { initial: {}, animate: {}, exit: {} },

  // Filters
  filterButtonVariants: { initial: {}, animate: {}, active: {} },
  layoutVariants: { initial: {}, animate: {}, exit: {} },

  // Navigation
  navLinkVariants: { initial: {}, animate: {}, hover: {} },
  mobileMenuVariants: { closed: {}, open: {} },
  logoVariants: { initial: {}, animate: {}, hover: {} },

  // Decorative
  floatVariants: {},
  pulseGlowVariants: {},
  rotateVariants: {},
  shimmerVariants: {},

  // Typography
  textRevealVariants: { hidden: {}, visible: {} },
  charVariants: { hidden: {}, visible: {} },
  wordVariants: { hidden: {}, visible: {} },
  lineRevealVariants: { hidden: {}, visible: {} },

  // Scroll/Parallax
  parallaxVariants: {},
  progressBarVariants: { initial: {}, animate: {} },
  backToTopVariants: { hidden: {}, visible: {}, hover: {} },

  // Cursor
  cursorVariants: { initial: {}, visible: {}, hover: {}, click: {} },
  cursorFollowerVariants: { initial: {}, visible: {}, hover: {} },

  // Toast/Modal
  toastVariants: { initial: {}, animate: {}, exit: {} },
  modalVariants: { initial: {}, animate: {}, exit: {} },
};

/**
 * Get variants based on reduced motion preference
 */
export function getVariants<T extends Variants>(
  normal: T,
  reduced: T = {} as T
): T {
  return getReducedMotion() ? reduced : normal;
}
