import { useState, useEffect } from "react";

/**
 * Hook to detect prefers-reduced-motion preference
 */

export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return reducedMotion;
}

/**
 * Hook to get reduced motion safe animation props
 */
export function useMotionSafe<T extends Record<string, unknown>>(
  motionProps: T,
  reducedProps: T
): T {
  const reducedMotion = useReducedMotion();
  return reducedMotion ? reducedProps : motionProps;
}
