"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

/**
 * ScrollReveal component - reveals content when it enters viewport
 * Respects prefers-reduced-motion
 */

interface ScrollRevealProps extends Omit<HTMLMotionProps<"div">, "initial" | "animate" | "whileInView" | "viewport"> {
  /** Children to reveal */
  children: React.ReactNode;
  /** Animation variant to use */
  variant?: "fadeInUp" | "fadeInDown" | "fadeInLeft" | "fadeInRight" | "scaleIn";
  /** Delay before animation starts (ms) */
  delay?: number;
  /** Duration of animation (ms) */
  duration?: number;
  /** Whether to animate only once */
  once?: boolean;
  /** Root margin for intersection observer */
  rootMargin?: string;
  /** Custom className */
  className?: string;
}

const variantMap = {
  fadeInUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
} as const;

export const ScrollReveal = forwardRef<HTMLDivElement, ScrollRevealProps>(
  (
    {
      children,
      variant = "fadeInUp",
      delay = 0,
      duration = 600,
      once = true,
      rootMargin = "0px 0px -10% 0px",
      className,
      ...props
    },
    ref
  ) => {
    const reducedMotion = useReducedMotion();

    const variants = {
      hidden: variantMap[variant].hidden,
      visible: {
        ...variantMap[variant].visible,
        transition: {
          duration: duration / 1000,
          delay: delay / 1000,
          ease: [0.4, 0, 0.2, 1] as const,
        },
      },
    };

    return (
      <motion.div
        ref={ref}
        initial={reducedMotion ? false : "hidden"}
        whileInView={reducedMotion ? undefined : "visible"}
        animate={reducedMotion ? "visible" : undefined}
        viewport={{ once, amount: 0.12, margin: rootMargin }}
        variants={variants}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

ScrollReveal.displayName = "ScrollReveal";

/**
 * Staggered container for multiple children with staggered animations
 */
interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
  className?: string;
}

export function StaggerContainer({
  children,
  staggerDelay = 100,
  delayChildren = 100,
  className,
}: StaggerContainerProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay / 1000,
            delayChildren: delayChildren / 1000,
          },
        },
      }}
      initial={reducedMotion ? false : "hidden"}
      animate="visible"
      transition={reducedMotion ? { duration: 0 } : undefined}
    >
      {children}
    </motion.div>
  );
}

/**
 * Staggered item for use within StaggerContainer
 */
interface StaggerItemProps {
  children: React.ReactNode;
  variant?: "fadeInUp" | "fadeInDown" | "fadeInLeft" | "fadeInRight" | "scaleIn";
  className?: string;
}

export function StaggerItem({
  children,
  variant = "fadeInUp",
  className,
}: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: variantMap[variant].hidden,
        visible: {
          ...variantMap[variant].visible,
          transition: {
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1] as const,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
