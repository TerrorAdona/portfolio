import { useState, useEffect } from "react";

/**
 * Hook for scroll spy / active section detection
 */

const defaultScrollSpyThreshold = [0, 0.1, 0.5, 1];

export function useScrollSpy(sectionIds: string[], options?: IntersectionObserverInit): string {
  const [activeSection, setActiveSection] = useState<string>("");
  const rootMargin = options?.rootMargin ?? "-20% 0px -60% 0px";
  const threshold = options?.threshold ?? defaultScrollSpyThreshold;

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection((current) => current === entry.target.id ? current : entry.target.id);
        }
      });
    }, { root: null, rootMargin, threshold });

    const observedElements = new Set<Element>();
    const observeAvailableSections = () => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element && !observedElements.has(element)) {
          observer.observe(element);
          observedElements.add(element);
        }
      });
    };

    observeAvailableSections();
    // Sections may be rendered later by React.lazy/Suspense.
    const mutationObserver = new MutationObserver(observeAvailableSections);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, [sectionIds, rootMargin, threshold]);

  return activeSection;
}

/**
 * Hook for element intersection observer
 */
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options?: IntersectionObserverInit
): IntersectionObserverEntry | null {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setEntry(entry);
    }, options);

    observer.observe(element);
    return () => observer.disconnect();
  }, [elementRef.current, options?.rootMargin, options?.threshold]);

  return entry;
}

/**
 * Hook for scroll position
 */
export function useScrollPosition(): { x: number; y: number } {
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition({ x: window.scrollX, y: window.scrollY });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollPosition;
}

/**
 * Hook for scroll direction
 */
export function useScrollDirection(): "up" | "down" | null {
  const [direction, setDirection] = useState<"up" | "down" | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setDirection("down");
      } else if (currentScrollY < lastScrollY) {
        setDirection("up");
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return direction;
}

/**
 * Hook for scroll progress (0 to 1)
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(Math.min(Math.max(scrollProgress, 0), 1));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}

/**
 * Hook for scroll reveal animation
 * Returns true when element is in viewport
 */
export function useScrollReveal(
  elementRef: React.RefObject<Element>,
  options?: IntersectionObserverInit
): boolean {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Wait for the ref to be attached to the DOM element
    const checkElement = () => {
      const element = elementRef.current;
      if (!element) return false;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Optionally unobserve after first reveal
            // observer.unobserve(element);
          }
        },
        {
          root: null,
          rootMargin: "0px 0px -10% 0px", // Trigger slightly before element enters viewport
          threshold: 0.1,
          ...options,
        }
      );

      observer.observe(element);
      return () => observer.disconnect();
    };

    // Check immediately
    if (!checkElement()) {
      // If element not ready, wait for it to be attached
      const checkInterval = setInterval(() => {
        if (checkElement()) {
          clearInterval(checkInterval);
        }
      }, 50);

      return () => clearInterval(checkInterval);
    }

    return () => {};
  }, [elementRef, options?.rootMargin, options?.threshold]);

  return isVisible;
}

/**
 * Hook for parallax effect
 * Returns transform value based on scroll position
 */
export function useParallax(speed: number = 0.5): number {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setOffset(scrollY * speed);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return offset;
}

/**
 * Hook for element parallax based on viewport position
 */
export function useElementParallax(
  elementRef: React.RefObject<Element>,
  speed: number = 0.5
): number {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      const distance = (viewportCenter - elementCenter) / viewportCenter;
      setOffset(distance * speed * 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial

    return () => window.removeEventListener("scroll", handleScroll);
  }, [elementRef.current, speed]);

  return offset;
}
