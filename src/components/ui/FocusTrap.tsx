import { useEffect, useRef, type ReactNode } from "react";

/**
 * FocusTrap component - traps focus within a container
 * Used by Modal, Dropdown, and other overlay components
 */

export interface FocusTrapProps {
  /** Children to wrap */
  children: ReactNode;
  /** Enable/disable focus trap */
  enabled?: boolean;
  /** Callback when focus leaves container */
  onFocusLeave?: () => void;
  /** Auto-focus first element on mount */
  autoFocus?: boolean;
  /** Elements to exclude from focus trap */
  exclude?: HTMLElement[];
}

export function FocusTrap({
  children,
  enabled = true,
  autoFocus = true,
  onFocusLeave,
  exclude = [],
}: FocusTrapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const container = containerRef.current;
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Get all focusable elements
    const getFocusableElements = () => {
      const elements = container.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
      );
      return Array.from(elements).filter(
        (el) =>
          !el.hasAttribute("disabled") &&
          !el.hasAttribute("aria-hidden") &&
          el.offsetParent !== null && // visible
          !exclude.includes(el)
      );
    };

    const focusableElements = getFocusableElements();
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Auto focus first element
    if (autoFocus && firstElement) {
      firstElement.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const currentFocusable = getFocusableElements();
      if (currentFocusable.length === 0) return;

      const first = currentFocusable[0];
      const last = currentFocusable[currentFocusable.length - 1];

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        // Tab
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    const handleFocusOut = (e: FocusEvent) => {
      // Check if focus is leaving the container
      if (!container.contains(e.relatedTarget as Node)) {
        onFocusLeave?.();
        // Optionally refocus first element
        // firstElement?.focus();
      }
    };

    container.addEventListener("keydown", handleKeyDown);
    container.addEventListener("focusout", handleFocusOut);

    return () => {
      container.removeEventListener("keydown", handleKeyDown);
      container.removeEventListener("focusout", handleFocusOut);
    };
  }, [enabled, autoFocus, onFocusLeave, exclude]);

  return <div ref={containerRef} className="focus-trap">{children}</div>;
}

/**
 * Hook for managing focus trap programmatically
 */
export function useFocusTrap(enabled = true) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
    );

    const firstElement = focusableElements[0];
    if (autoFocus && firstElement) {
      firstElement.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const elements = Array.from(focusableElements).filter(
        (el) => !el.hasAttribute("disabled") && el.offsetParent !== null
      );
      if (elements.length === 0) return;

      const first = elements[0];
      const last = elements[elements.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    container.addEventListener("keydown", handleKeyDown);
    return () => container.removeEventListener("keydown", handleKeyDown);
  }, [enabled]);

  return containerRef;
}