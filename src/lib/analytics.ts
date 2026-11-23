/**
 * Analytics utilities
 * Privacy-first analytics wrapper (Plausible, Umami, or custom)
 */

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string | number | boolean> }) => void;
    umami?: (event: string, data?: Record<string, unknown>) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Track page view
 */
export function trackPageView(url?: string): void {
  const path = url || window.location.pathname;

  // Plausible
  if (window.plausible) {
    window.plausible("pageview", { u: path });
  }

  // Umami
  if (window.umami) {
    window.umami("pageview", { url: path });
  }

  // Google Analytics (gtag)
  if (window.gtag) {
    window.gtag("event", "page_view", {
      page_path: path,
      page_title: document.title,
    });
  }
}

/**
 * Track custom event
 */
export function trackEvent(
  eventName: string,
  properties?: Record<string, string | number | boolean>
): void {
  // Plausible
  if (window.plausible) {
    window.plausible(eventName, { props: properties });
  }

  // Umami
  if (window.umami) {
    window.umami(eventName, properties);
  }

  // Google Analytics
  if (window.gtag) {
    window.gtag("event", eventName, properties);
  }
}

/**
 * Track outbound link click
 */
export function trackOutboundLink(url: string, label?: string): void {
  trackEvent("outbound_link_click", {
    url,
    label: label || url,
  });
}

/**
 * Track file download
 */
export function trackDownload(fileName: string, fileType: string): void {
  trackEvent("file_download", {
    file_name: fileName,
    file_type: fileType,
  });
}

/**
 * Track form submission
 */
export function trackFormSubmit(formName: string, success: boolean): void {
  trackEvent("form_submit", {
    form_name: formName,
    success,
  });
}

/**
 * Track project view
 */
export function trackProjectView(projectSlug: string, projectName: string): void {
  trackEvent("project_view", {
    project_slug: projectSlug,
    project_name: projectName,
  });
}

/**
 * Track CTA click
 */
export function trackCtaClick(ctaName: string, location: string): void {
  trackEvent("cta_click", {
    cta_name: ctaName,
    location,
  });
}

/**
 * Initialize analytics (call in layout/app root)
 */
export function initAnalytics(): void {
  // Track initial page view
  if (typeof window !== "undefined") {
    // Wait for hydration
    requestIdleCallback(() => {
      trackPageView();
    });
  }
}

/**
 * Track scroll depth
 */
export function trackScrollDepth(): void {
  if (typeof window === "undefined") return;

  const depths = [25, 50, 75, 100];
  const tracked = new Set<number>();

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

    depths.forEach((depth) => {
      if (scrollPercent >= depth && !tracked.has(depth)) {
        tracked.add(depth);
        trackEvent("scroll_depth", { depth });
      }
    });
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}

/**
 * Track time on page
 */
export function trackTimeOnPage(): void {
  if (typeof window === "undefined") return;

  const startTime = Date.now();
  const intervals = [10, 30, 60, 120, 300]; // seconds
  const tracked = new Set<number>();

  const interval = setInterval(() => {
    const elapsed = Math.round((Date.now() - startTime) / 1000);
    intervals.forEach((threshold) => {
      if (elapsed >= threshold && !tracked.has(threshold)) {
        tracked.add(threshold);
        trackEvent("time_on_page", { seconds: threshold });
      }
    });
  }, 5000);

  return () => clearInterval(interval);
}